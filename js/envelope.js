const createcalamnsielement = function(){
	let p = playlist[cpi];
	$("#calamansiplaycontroler").empty();
	$("#calamansiplaycontroler").html('<span class="calamansi" data-skin="//i.asepnabila.link/calamansi/skins/in-text" data-source="music/'+p.file+'"></span>');
	$("#player-title").html((p.explicit ? '<i class="bi bi-explicit"></i>' : '')+' <span class="marquee">'+p.artis+' - '+p.title+'</span>');
	
	if ($(".marquee").width() >= $("nav").width()/100*65) {
		$('.marquee').css('width', $("nav").width() - ( $("#calamansiplaycontroler").width() + $("#nextsongs").width() ) - 100);
		$('.marquee').marquee({duration: 15000, startVisible: true, duplicated: true});
	}
}

const nextsongs = function(){
	cpi = cpi+1;
	if(cpi >= playlist.length ) cpi = 0;
	let p = playlist[cpi];
	players.audio.load('music/'+p.file);
	$("#player-title").html((p.explicit ? '<i class="bi bi-explicit"></i>' : '')+' <span class="marquee">'+p.artis+' - '+p.title+'</span>');
	players.audio.play();
	
	if ($(".marquee").width() >= $("nav").width()/100*65) {
		$('.marquee').css('width', $("nav").width() - ( $("#calamansiplaycontroler").width() + $("#nextsongs").width() ) - 100);
		$('.marquee').marquee({duration: 15000, startVisible: true, duplicated: true});
	}
}

const startCountdown = function(){
	const second = 1000,
		minute = second * 60,
		hour = minute * 60,
		day = hour * 24;
		
	const countDown = new Date(config.events.date).getTime(),
	x = setInterval(function() {    

		const now = new Date().getTime(),
			distance = countDown - now;
		if($("#cdd").text() == '00'){
			animeteCount($("#cdd"), Math.floor(distance / (day)));
			animeteCount($("#cdh"), Math.floor((distance % (day)) / (hour)));
			animeteCount($("#cdm"), Math.floor((distance % (hour)) / (minute)));
			animeteCount($("#cds"), Math.floor((distance % (minute)) / (second)));
		}else{
			$("#cdd").text(Math.floor(distance / (day))),
			$("#cdh").text(Math.floor((distance % (day)) / (hour))),
			$("#cdm").text(Math.floor((distance % (hour)) / (minute))),
			$("#cds").text(Math.floor((distance % (minute)) / second));
		}
		
		
		$("#progress-bar-thedate").css("width", `${ Math.floor((((day * 360) - (countDown - now)) / (day * 360)) * 100) }%`);
		
		//do something later when date is reached
		if (distance < 0) {
			clearInterval(x);
		}
		//seconds
	}, 0);
}

const animeteCount = function(el, to){
	el.prop('counter',0).animate({
        counter: `+=${to}`
    }, {
        step: function (now) {
            el.text(Math.ceil(now))
        }
    });
}

const generateQrBukuTamu = function(){
	if($('#qr-kepada').text() !== ""){
		kepada = $('#qr-kepada').text().toUpperCase();
	}
	if($('#qr-dari').text() !== ""){
		dari = $('#qr-dari').text().toUpperCase();
	}
	
	$("#messagesfromvisitor-name").val(capitalizing(kepada));
	
	localStorage.kepada = kepada;
	localStorage.dari = dari;
	
	let bukutamudata = {
		"A": kepada,
		"D": dari,
		"V": visitorId,
	};
	
	let qrstrbukutamu = JSON.stringify(bukutamudata);
	
	$('#qrbukutamu').empty();
	
	$('#qrbukutamu').kjua({
		text: `BUKUTAMU-${config.groom.firstname}&${config.bride.firstname} : ${qrstrbukutamu}`,
		size: 200,
		render: 'svg',
		crisp: true,
		minVersion: 4,
		quiet: 1,
		ecLevel: 'H',
		back: 'rgba(255,255,255, 1)'
	});
	
	$('#qr-kepada').text(kepada.toUpperCase());
	$('#qr-dari').text(dari.toUpperCase());
}

let getNewestMessagesRunning;
const getNewestMessages = function({gotnewmessages = false} = {}){
	$messages = getSavedMessages();
	if(gotnewmessages){
		 currentmessage = $("#messagesfromvisitor>.messagesfromvisitor-container").children();
		 if($(currentmessage[0]).data("timestamp") < parseInt($messages[Object.keys($messages)[0]]["timestamp"])){
			 $(".messagesfromvisitor-gotnew").removeClass("d-none");
		 }
	}else{
		let latestmessages=$messages[Object.keys($messages)[0]];
		if(typeof latestmessages !== "undefined"){
			loadNewMessages(Object.assign({}, {"functionrepeat":10000,"sort":"newest"}, latestmessages), getNewestMessages);
		}
		
		getNewestMessagesRunning = "Running...";
	}
}

let loadNewMessagesXhr, loadNewMessagesRetry=0, loadNewMessagesXhrErrors = [];
const loadNewMessages = function(params = {}, functionCallbak) {
	limitget = 5;
	
	if(typeof loadNewMessagesXhr == "undefined" || typeof params.functionrepeat !== "undefined"){
		if(typeof params.functionrepeat == "undefined") loadNewMessagesXhr = "on going get message";
		
		if(typeof grecaptcha !== "undefined"){
			
			if(typeof params.sort == "undefined") $messagesLoader.removeClass("d-none");
			
			grecaptcha.ready(() => {
				if(typeof params.functionrepeat == "undefined") loadNewMessagesXhr = "waiting grespon";
				grecaptcha.execute(config.grecaptchasitekey, {action: 'submit'}).then((token) => {
					getCommentsParams = new getData(params, {"action":"getComments","limit":limitget,"grespon":token});
					commentsUrl = `${config.appscript.baseurl}${config.appscript.deploymentid}/exec?${getCommentsParams.params()}`;
					$.getJSON( commentsUrl ).done((response) => {
						if(response.statusCode == 1){
							$messages = getSavedMessages();
							response.newlisttimestamp = [];
							
							Object.keys(response.data).forEach(function(key) {
								response.newlisttimestamp.push(key);
								saveMessages(response.data[key]);
							});
							
							if(typeof params.sort == "undefined" && response.totalreturn<limitget){
								$("#messagesfromvisitor").off('touchmove scroll');
								$("#messagesfromvisitor>.messagesfromvisitor-last").removeClass("d-none");
							}
							
							if(typeof params.functionrepeat !== "undefined"){
								if(response.newlisttimestamp.some((timestamp) => {return !Object.keys($messages).includes(timestamp);})){
									functionCallbak({gotnewmessages : true});
								}
							}else{
								functionCallbak();
							}
							
						}else{
							if(response.statusText == "Tidak ada pesan"){
								if(typeof params.sort == "undefined"){
									$("#messagesfromvisitor").off('touchmove scroll');
									if($messagesPanel.children().length>0){
										$("#messagesfromvisitor>.messagesfromvisitor-last").removeClass("d-none");
									}else{
										$("#messagesfromvisitor>.messagesfromvisitor-empty").removeClass("d-none");
									}
								}
							}else{
								loadNewMessagesXhrErrors.push(response.statusText);
							}
						}
						
						if(typeof params.functionrepeat !== "undefined"){
							setTimeout(functionCallbak, params.functionrepeat);
						}
						if(typeof getNewestMessagesRunning == "undefined"){
							if(response.statusText == "Tidak ada pesan" || response.statusCode == 1){
								getNewestMessages();
							}else{
								$("#messagesfromvisitor").off('touchmove scroll');
							}
						}
					}).fail((jqXHR, textStatus) => {
						$("#messagesfromvisitor").off('touchmove scroll');
						
						if(loadNewMessagesRetry<=3){
							setTimeout(() => {
								loadNewMessagesRetry++;
								loadNewMessages(params);
							}, 1000);
						}else{
							loadNewMessagesXhrErrors.push(`${textStatus}: Tidak dapat terhubung, pastikan perangkat terhubung dan Internet stabil.`);
						}
					}).always(() => {
						if(loadNewMessagesXhrErrors.length>0){
							$("#messagesfromvisitor").off('touchmove scroll');
							$("#messagesfromvisitor>.messagesfromvisitor-error").removeClass("d-none");
							$("#messagesfromvisitor>.messagesfromvisitor-error").append(`<br/><small>${loadNewMessagesXhrErrors.join()}</small>`);
						}
						loadNewMessagesXhr = undefined;
						$messagesLoader.addClass("d-none");
					});
				});
			});
		}else{
			$("#messagesfromvisitor").off('touchmove scroll');
			$("#messagesfromvisitor>.messagesfromvisitor-error").removeClass("d-none");
			$("#messagesfromvisitor>.messagesfromvisitor-error").append(`<br/><small>Error: Tidak dapat terhubung ke Google, pastikan perangkat terhubung dan Internet stabil.</small>`);
		}
	}
}

const drawMessages = function({ sort = "oldest", loadnew = true} = {}){
	$messagesPanel = $("#messagesfromvisitor>.messagesfromvisitor-container");
	$messagesLoader = $($("#messagesfromvisitor>.messagesfromvisitor-loader")[0]);
	
	$messagesElement = $messagesPanel.children();
	$messages = getSavedMessages();
	if(Object.keys($messages).length<=0){
		if(loadnew) loadNewMessages({}, drawMessages);
	}else{
		$("#messagesfromvisitor>.messagesfromvisitor-empty").addClass("d-none");
		
		if(sort == "newest") loadNewMessages(Object.assign({}, {"sort":"newest"}, $messages[Object.keys($messages)[0]]), drawMessages);
		if($messagesPanel.children(":not(.d-none)").length == Object.keys($messages).length){
			if(loadnew) loadNewMessages($messages[Object.keys($messages)[Object.keys($messages).length - 1]], drawMessages);
		}
	}
	
	let maxMessagesDraw = 5, messagesCount = 0;
	
	if($messagesPanel.children().length <= 0){
		for (var i in $messages) {
			if(messagesCount>=maxMessagesDraw) break;
			if ($messages.hasOwnProperty(i)) {
				$messagesPanel.append(isMessagesVisitorGetItemHTML($messages[i]));
				messagesCount++;
			}
		}
	}else{
		$("#messagesfromvisitor>.messagesfromvisitor-empty").addClass("d-none");
		
		if(
			parseInt($messages[Object.keys($messages)[Object.keys($messages).length - 1]]["timestamp"]) !== $($messagesElement[$messagesElement.length -1]).data("timestamp")
			||
			parseInt($messages[Object.keys($messages)[0]]["timestamp"]) !== $($messagesElement[0]).data("timestamp")
		){
			for (var i in $messages) {
				if ($messages.hasOwnProperty(i)) {
					if($messages[i]["timestamp"] < $($messagesElement[$messagesElement.length -1]).data("timestamp") || $messages[i]["timestamp"] > $($messagesElement[0]).data("timestamp")){
						if($messages[Object.keys($messages)[Object.keys($messages).length - 1]]["timestamp"] < $($messagesElement[$messagesElement.length -1]).data("timestamp")){
							$messagesPanel.append(isMessagesVisitorGetItemHTML($messages[i]));
						}
						if($messages[Object.keys($messages)[0]]["timestamp"] > $($messagesElement[0]).data("timestamp")){
							$messagesPanel.prepend(isMessagesVisitorGetItemHTML($messages[i]));
						}
					}
				}
			}
		}
		
		if(typeof refreshDateTimeout == "undefined"){
			refreshDate({repeat : true});
		}
	}
	
	
	let time = 0;
	$messagesPanel.children(".d-none").each(function(){
		$(this).removeClass("d-none");
	});
	
	refreshDate();
}

let refreshDateTimeout;
const refreshDate = function({repeat = false} = {}) {
	theElemMsg = $("#messagesfromvisitor>.messagesfromvisitor-container");
	theElemMsgChild = (repeat ? theElemMsg.children("[data-timetype='detik'],[data-timetype='menit']") : theElemMsg.children(":not([data-timetype='detik']),:not([data-timetype='menit'])"))
    theElemMsgChild.each(function(){
		atimeago = timeDifference(+ new Date(), $(this).data("timestamp"));
		$(this).find(".time").text(atimeago);
	})
	
	if(repeat){
		refreshDateTimeout = setTimeout(refreshDate, 1000);
	}
}

function isMessagesVisitorGetItemHTML({ timestamp, name, message, colleague, attend }) {
	name = encodeHTML(name);
	message = encodeHTML(message).replace(/(?:\r\n|\r|\n)/g, '<br>');
	colleague = parseInt(colleague);
	attend =  parseInt(attend);
	
	let atimeago = timeDifference(+ new Date(), timestamp);
	let attender = (attend === 1 ? '<i class="bi bi-check-circle-fill"></i>&nbsp;&nbsp;akan hadir' : (attend === 2 ? '<i class="bi bi-question-circle-fill"></i>&nbsp;&nbsp;mungkin hadir' : '<i class="bi bi-x-circle-fill"></i>&nbsp;&nbsp;tidak hadir'));
	let colleaguecolor = (colleague == 2 ? 'ae199c50' : (colleague == 3 ? 'ffd7004f' : (colleague == 4 ? 'f2374950' : '01ff8850')));
	let iscoleagueof = (colleague == 2 ? 'mempelai wanita' : (colleague == 3 ? 'orang tua mempelai pria' : (colleague == 4 ? 'orang tua mempelai wanita' : 'mempelai pria')));
	return `<div data-timetype="${atimeago.replace(/[^a-z]/gi, '')}"data-timestamp="${timestamp}" class="card p-2 d-none animate__animated animate__fadeInDown">
			<h6>${name} <small class="fw-lighter"><span class="badge text-bg-secondary">${attender}</span></small></h6>
				<small class="fw-lighter date-message"><i class="bi bi-alarm"></i> <span class="time">${atimeago}</span></small>
				<p class="fw-light text-justify">${message}</p>
				<div class="is-coleague-of fw-lighter p2 text-end lh-1" style="color:#${colleaguecolor}; white-space: nowrap;" title="kenalan ${iscoleagueof}"><small class="is-coleague-of-text animate__animated animate__fadeInLeft">kenalan ${iscoleagueof}</small> &bullet;</div>
		</div>`;
}


let visitorMessages = {};
const getSavedMessages = function(){
	visitorMessages = Object.keys(visitorMessages).sort(function ( a, b ) { return b - a; }).reduce(
	  (obj, key) => { 
		obj[key] = visitorMessages[key]; 
		return obj;
	  }, 
	  {}
	);
	
	return visitorMessages;
}

const saveMessages = function(messagesData){
	let storedMessages = getSavedMessages();
	
	storedMessages[messagesData['timestamp']] = messagesData;
	
	visitorMessages = Object.keys(storedMessages).sort(function ( a, b ) { return b - a; }).reduce(
	  (obj, key) => { 
		obj[key] = storedMessages[key]; 
		return obj;
	  }, 
	  {}
	);
}
$(".clipboard[data-clipboard-var]").each(function(i, obj){
	let clipboardVar = $(this).data("clipboard-var").split("-");
	$(this).attr("data-clipboard-text", config[clipboardVar[0]][clipboardVar[1]]);
});

$('.nav-link, .navigate-link').each(function() {
	$(this).on('click', function(event) {
		event.preventDefault();
		$('html,body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500);
	});
});

$("#nextsongs").on('click', function(event) {
	nextsongs();
});

if($("body").width()>1024){
	$("#qr-kepada, #qr-dari").each(function(){
		$(this).on("click focus", function(){
			$(this).css("visibility", "hidden");
			
			let totalWidth = $(this).parents("div").width();
			totalWidth += parseInt($(this).parents("div").css("padding-left"), 10) + parseInt($(this).parents("div").css("padding-right"), 10); //Total Padding Width
			totalWidth += parseInt($(this).parents("div").css("margin-left"), 10) + parseInt($(this).parents("div").css("margin-right"), 10); //Total Margin Width
			totalWidth += parseInt($(this).parents("div").css("borderLeftWidth"), 10) + parseInt($(this).parents("div").css("borderRightWidth"), 10); //Total Border Width
			
			let totalHeight = $(this).height()+10;
			totalHeight += parseInt($(this).css("padding-top"), 10) + parseInt($(this).css("padding-bottom"), 10); //Total Padding Width
			totalHeight += parseInt($(this).css("margin-top"), 10) + parseInt($(this).css("margin-bottom"), 10); //Total Margin Width
			totalHeight += parseInt($(this).css("borderTopWidth"), 10) + parseInt($(this).css("borderBottomWidth"), 10); //Total Border Width
			
			let inlinedit = $('<input></input>').css({
				"top" : $(this).parents("div").offset().top-$(window).scrollTop(),
				"left" : $(this).parents("div").offset().left,
				"height" : totalHeight-5,
				"width" : totalWidth-1,
				"position" : "fixed",
				"text-align" : "center"
			})
			.val($(this).text().toUpperCase())
			.data("elemid", $(this).attr("id"))
			.css('font-size', $(this).parent().css('font-size'))
			.addClass("inlineinput");
			
			inlinedit.keyup(function(e){
				if(e.keyCode === 27){
					$("#"+$(this).data("elemid")).css("visibility", "visible");
					$(this).remove();
				}
			});
	
			inlinedit.focusout(function() {
				$("#"+$(this).data("elemid")).text($(this).val().toUpperCase());
				generateQrBukuTamu();
				$("#"+$(this).data("elemid")).css("visibility", "visible");
				$(this).remove();
			});
			
			inlinedit.keypress(function(e){
				if(e.which == 13 || e.which == 27){
					$("#"+$(this).data("elemid")).text($(this).val().toUpperCase());
					generateQrBukuTamu();
					$("#"+$(this).data("elemid")).css("visibility", "visible");
					$(this).remove();
				}
			});
			
			$("body").append(inlinedit);
			
			inlinedit.focus();
			
			$(window).scroll(function(){
				$("#"+$(this).data("elemid")).css("visibility", "visible");
				inlinedit.remove();
			});
		});
	});
}

$("#reset-attenderdata").click(function(){
	Swal.fire({
		html: '<h1><i class="bi bi-arrow-clockwise"></i></h1>Reset data kamu?',
		confirmButtonColor: '#991188', //Warna kesukaan Nabila
		showCancelButton: true,
		confirmButtonText: 'Ya, reset',
		cancelButtonText: 'Tidak',
		reverseButtons: true,
	}).then((result) => {
		if (result.isConfirmed) {
			["kepada", "dari", "backsound"].forEach(
				k => localStorage.removeItem(k)
			);
			location.reload();
		}
	})
});

$("#edit-attenderdata").click(function(){
	Swal.fire({
		html:
			'<div style="max-width:25rem;">' +
			'<h1><i class="bi bi-person-bounding-box"></i></h1>Ubah data tamu?' +
			'<div class="mt-2 text-start row">' +
			'<label for="attenderdata-kepada" class="col-sm-4 col-form-label">Nama</label>' +
			'<div class="col-sm-8">' +
			'<input id="attenderdata-kepada" type="text" aria-label="Nama" class="form-control text-uppercase">' +
			'</div>' +
			'</div>' +
			'<div class="mb-1 text-start row">' +
			'<label for="attenderdata-dari" class="col-sm-4 col-form-label">Domisili</label>' +
			'<div class="col-sm-8">' +
			'<input id="attenderdata-dari" type="text" aria-label="Domisili" class="form-control text-uppercase">' +
			'</div>' +
			'</div>' +
			'</div>',
		showCancelButton: true,
		width: '25rem',
		confirmButtonColor: '#991188', //Warna kesukaan Nabila
		reverseButtons: true,
		preConfirm: function () {
			return new Promise(function (resolve) {
				// Validate input
				if ($('#attenderdata-kepada').val() == '' || $('#attenderdata-dari').val() == '') {
					swal.showValidationMessage("isikan Nama dan Domisili"); // Show error when validation fails.
					swal.enableConfirmButton(); // Enable the confirm button again.
				} else {
					swal.resetValidationMessage(); // Reset the validation message.
					resolve([
						$('#attenderdata-kepada').val(),
						$('#attenderdata-dari').val()
					]);
				}
			})
		},
		didOpen: (popupedit) => {
			console.log($(popupedit));
			console.log($(popupedit).children(".swal2-html-container")[0]);
			$($(popupedit).children(".swal2-html-container")[0]).css("overflow-x","hidden");
			$('#attenderdata-kepada').val($('#qr-kepada').text().toUpperCase());
			$('#attenderdata-dari').val($('#qr-dari').text().toUpperCase());
			$('#attenderdata-kepada').focus()
		}
	}).then(function (result) {
		if (result.isConfirmed) {
			$("#qr-kepada").text($('#attenderdata-kepada').val());
			$("#qr-dari").text($('#attenderdata-dari').val());
			generateQrBukuTamu();
		}
	}).catch(swal.noop)
});

let clipboard = new ClipboardJS('.clipboard');
clipboard.on('success', function (e) {
	let $elem = $(e.trigger);
	let elemprehtml = $elem.html();
	let elempreclass = $elem.attr("class");
	let copytext = e.text;
	$elem.html("Berhasil disalin");
	$elem.attr("class", elempreclass.replace(/primary/g, 'warning'));
	setTimeout(function(){
		$elem.html(elemprehtml);
		$elem.attr("class", elempreclass);
	},1000);

	e.clearSelection();
});

let playercontrolertimeout;
$("#player-control-panel").on("click touchend", function(){
	if(typeof playercontrolertimeout !== "undefined") window.clearTimeout(playercontrolertimeout);
	
	$playsbutton = $(this);
	$playsbutton.css('opacity', '1');
	$("#player-elem>#player-title-panel>small").removeClass('d-none');
	playercontrolertimeout = setTimeout(function(){
		$playsbutton.css('opacity', '0.5');
		$playsbutton.blur();
		$("#player-elem>#player-title-panel>small").addClass('d-none');
		playercontrolertimeout = undefined;
	}, 5000);
});

$("#messagesfromvisitor-submit-form").on("submit", function(e){
	e.preventDefault();
	submitedform = $(this);
	$(this).validate({
		highlight: function(element, errorClass, validClass) {
			$(element).addClass("is-invalid");
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass("is-invalid");
		},
		errorClass: "invalid-feedback visible",
		errorElement: "div",
		rules: {
			name: "required",
			message: {
				required: true,
				minlength: 10
			}
		},
		messages: {
			name: '<i class="bi bi-exclamation-circle"></i> Silahkan isikan nama',
			message: {
				required: '<i class="bi bi-exclamation-circle"></i> Silahkan isikan ucapan & doa',
				minlength: '<i class="bi bi-exclamation-circle"></i> Isikan minimal 10 karakter'
			}
		}
	});
	if($(this).valid()) {
		if(typeof grecaptcha !== "undefined"){
			submitVisitorMessagesError = [];
		
			submitmessageform = $(this);
			submitmessagebtn = submitmessageform.find("button[type=submit]");
			submitmessagebtn.html('<span class="d-none spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> loading...');
			submitmessagebtn.prop('disabled', true);
		
			grecaptcha.ready(() => {
				grecaptcha.execute(config.grecaptchasitekey, {action: 'submit'}).then(function(token) {
					
					getInsertMessageParams = new getData({}, {"action":"insertComments", "grespon":token});
					
					var settings = {
						"url": `${config.appscript.baseurl}${config.appscript.deploymentid}/exec?${getInsertMessageParams.params()}`,
						"method": "POST",
						"timeout": 0,
						"headers": {
							"Content-Type": "application/x-www-form-urlencoded",
						},
						"redirect": "follow",
						"data": submitedform.serialize() + "&visitorId=" + visitorId
					};

					$.ajax(settings).done((response) => {
						if(response.statusCode == 1){
							submitmessageform.trigger("reset");
							submitmessageform.find("input[name=name]").val(capitalizing(kepada));
							saveMessages(response.data);
							drawMessages({loadnew : false});
						}else{
							submitVisitorMessagesError.push(response.statusText);
						}
					}).fail((jqXHR, textStatus) => {
						submitVisitorMessagesError.push(`${textStatus}: Tidak dapat terhubung, pastikan perangkat terhubung dan Internet stabil.`);
					}).always(() => {
						if(submitVisitorMessagesError.length>0){
							Swal.fire({
								icon: 'error',
								text: submitVisitorMessagesError.join(),
								confirmButtonColor: '#991188', //Warna kesukaan Nabila
							});
						}
						
						submitmessagebtn.html('Kirim');
						submitmessagebtn.prop('disabled', false);
					});
				});
			});
		}else{
			Swal.fire({
				icon: 'error',
				text: `Error: Tidak dapat terhubung ke Google, pastikan perangkat terhubung dan Internet stabil.`,
				confirmButtonColor: '#991188', //Warna kesukaan Nabila
			});
		}
	}
});

$(".messagesfromvisitor-gotnew").find("button").on("click", function(){
	$(this).parent().addClass("d-none");
	drawMessages({loadnew : false});
});

window.history.pushState('', '', window.location.pathname);

$("body").css("background-image", 'url('+$("body").data("background")+')');
$("iframe").each(function() {
	$(this).attr("src", $(this).data("src"));  
});

$('.xhidden').each(function() {
	$(this).addClass('animate__animated animate__slideInUp');
	$(this).css('visibility', 'visible');
});

$("#player-title-panel").css("margin-left", $("#navigation-link").offset().left);
$("#player-control-panel").css("margin-right", $("#navigation-link").offset().left);
$(window).on('resize', () => {
	$("#player-title-panel").css("margin-left", $("#navigation-link").offset().left);
	$("#player-control-panel").css("margin-right", $("#navigation-link").offset().left);
});

$(window).on('resize scroll', () => {
	if ($('#messagesfromvisitor').isInViewport()) {
		if($("#messagesfromvisitor>.messagesfromvisitor-container").children().length < 1 && $("#messagesfromvisitor").find(".messagesfromvisitor-error.d-none").length == 1) drawMessages();
	}
	if ($('#detail-acara').isInViewport()) {
		startCountdown();
	}
	
	$(".lazyload:not([src])").each((i,obj) => {
		lazyimg = $(obj);
		if(lazyimg.isInViewport()){
			lazyimg.one("load", () => {
				$('.grid').masonry({
					// set itemSelector so .grid-sizer is not used in layout
					itemSelector: '.grid-item',
					// use element for option
					columnWidth: '.grid-sizer',
					percentPosition: true
				});
			});
			
			lazyimg.addClass("animate__animated animate__fadeInDown");
			lazyimg.attr("src", lazyimg.data("src"));
		}
	});
	
	$("body>div.xhidden").each((i,obj) => {
		$container = $(obj);
		if($container.isInViewport()){
			$plyrElem = $("#player-elem>#player-control-panel");
			var elementTop = parseInt($plyrElem.offset().top);
			var elementBottom = parseInt(elementTop + $plyrElem.outerHeight());

			var viewContainerTop = parseInt($container.offset().top);
			var viewContainerBottom = parseInt(viewContainerTop + parseInt($container.css('margin-top'), 10) + parseInt($container.css('margin-bottom'), 10) + $container.outerHeight());
			
			if(viewContainerTop+$plyrElem.height()/2 > elementTop || elementBottom-$plyrElem.height()/2 < viewContainerBottom){					
				$plyrElem.find("a[class*=btn-outline-]").each((i,obj) => {
					var containerColor = $container.css("background-color");
					if(containerColor == 'rgba(0, 0, 0, 0)'){
						containerColor = $("body").css("background-color");
					}

					$(obj).removeClass(isDark(containerColor) ? 'btn-outline-dark' : 'btn-outline-light');
					$(obj).addClass(isDark(containerColor) ? 'btn-outline-light' : 'btn-outline-dark');
					$(obj).css("color", isDark(containerColor) ? '' : 'white inherit');
					$("#player-elem").css("color", isDark(containerColor) ? 'white' : 'black');
				});
				
				return false;
			}
		}
	});
});

function drawMessagesOnScroll(){
   if($("#messagesfromvisitor").scrollTop() > $("#messagesfromvisitor>.messagesfromvisitor-container").height() - $("#messagesfromvisitor").height()-100) {
		drawMessages();
   }
}
$("#messagesfromvisitor").on('touchmove scroll', function(){drawMessagesOnScroll();});

setTimeout(function() {
	if ($('#messagesfromvisitor').isInViewport()) {
		drawMessages();
	}
}, 1000);

$('head')
.append(`<link href="${gfonts}/css2?family=Tangerine:wght@400;700&display=swap" rel="stylesheet">`)
.append(`<link href="${cdnjsdlvr}/npm/kfgqpc-uthmanic-script-hafs-regular@1.0.0/index.css" rel="stylesheet">`)
.append('<link rel="stylesheet" href="//asepnabila.link/calamansi-js/dist/calamansi.min.css">')
.append('<link rel="stylesheet" href="//asepnabila.link/qrcode-reader/dist/css/qrcode-reader.min.css">')
.append(`<link rel="stylesheet" href="${cdnjsbaseurl}/font-awesome/6.1.1/css/fontawesome.min.css" integrity="sha512-xX2rYBFJSj86W54Fyv1de80DWBq7zYLn2z0I9bIhQG+rxIF6XVJUpdGnsNHWRa6AvP89vtFupEPDP8eZAtu9qA==" crossorigin="anonymous" referrerpolicy="no-referrer" />`)
.append(`<link rel="stylesheet" href="${cdnjsbaseurl}/font-awesome/6.1.1/css/solid.min.css" integrity="sha512-qzgHTQ60z8RJitD5a28/c47in6WlHGuyRvMusdnuWWBB6fZ0DWG/KyfchGSBlLVeqAz+1LzNq+gGZkCSHnSd3g==" crossorigin="anonymous" referrerpolicy="no-referrer" />`)
.append(`<link rel="stylesheet" href="${cdnjsbaseurl}/font-awesome/6.1.1/css/regular.min.css" integrity="sha512-YoxvmIzlVlt4nYJ6QwBqDzFc+2aXL7yQwkAuscf2ZAg7daNQxlgQHV+LLRHnRXFWPHRvXhJuBBjQqHAqRFkcVw==" crossorigin="anonymous" referrerpolicy="no-referrer" />`)
.append(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css"/>`);

getVisitorIP();

let calamansiScript = document.createElement('script');
calamansiScript.src = '//asepnabila.link/calamansi-js/dist/calamansi.min.js';
calamansiScript.defer = true;
document.body.appendChild(calamansiScript);

calamansiScript.onload = function() {
	createcalamnsielement();

	Calamansi.autoload();
					
	CalamansiEvents.on('initialized', function (player) {
		players = player;
	});
	
	CalamansiEvents.on('trackEnded', function (player) {
		nextsongs();
	});
	
	CalamansiEvents.on('play', function (player) {
		$("#playindicator").addClass("rotating-spin");
	});
	
	CalamansiEvents.on('pause', function (player) {
		$("a.clmns--control-resume").css("padding", "0.35rem 0.5rem");
		$("#playindicator").removeClass("rotating-spin");
	});
};


let recaptchaScript = document.createElement('script');
recaptchaScript.src = 'https://www.google.com/recaptcha/api.js?render=6LfhB5wgAAAAAE2vZtWH91E7daPM-KMjdem0uptU';
recaptchaScript.defer = true;
document.body.appendChild(recaptchaScript);
recaptchaScript.onload = function(){
	drawMessages();
}

let bootstrapBundleScript = document.createElement('script');
bootstrapBundleScript.src = `${cdnjsdlvr}/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js`;
bootstrapBundleScript.defer = true;
document.body.appendChild(bootstrapBundleScript);

let qrcodeReaderScript = document.createElement('script');
qrcodeReaderScript.src = '//asepnabila.link/qrcode-reader/dist/js/qrcode-reader.min.js';
qrcodeReaderScript.defer = true;
document.body.appendChild(qrcodeReaderScript);

qrcodeReaderScript.onload = function() {
	$.qrCodeReader.jsQRpath = "//asepnabila.link/qrcode-reader/dist/js/jsQR/jsQR.min.js";
	$.qrCodeReader.beepPath = "//asepnabila.link/sound/meizu_barcode_recognize.ogg";
	
	$("#scan-attenderqrcode").qrCodeReader({
		qrcodeRegexp: /BUKUTAMU-Asep&Nabila\|{"[a-zA-Z]+":"[a-zA-Z]+","[a-zA-Z]+":"\w+"}/,
		audioFeedback: true,
		callback: function(code) {
			alert(code);
		}
	});
}

let fancyboxScript = document.createElement('script');
fancyboxScript.src = 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js';
fancyboxScript.defer = true;
document.body.appendChild(fancyboxScript);

fancyboxScript.onload = function() {
	Fancybox.bind("#gallery-prewed > div.grid-item > a", {
		groupAll : true, // Group all items
		on : {
			ready : (fancybox) => {
				console.log(`fancybox #${fancybox.id} is ready!`);
			}
		}
	});
}

$(".lazyload:not([src])").each((i,obj) => {
	lazyimg = $(obj),
	obj = $(document.createElement("img")),
	img = new Image();
	
	obj.addClass("d-none");
	
	img.onload = function(){
		obj.attr("src",this.src);
		obj.appendTo("body");
	} 
	
	img.src = lazyimg.data("src");
});
$(".lazyload-n-anime:not([src])").each((i,obj) => {
	lazyimg = $(obj),
	lazyimg.attr("src", lazyimg.data("src"));
});