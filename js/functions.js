const queryParams = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const shuffle = function(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const encodeHTML = function(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}


const removeURLParameter = function(url, parameter) {
	//prefer to use l.search if you have a location/link object
	var urlparts = url.split('?');
	if (urlparts.length >= 2) {

		var prefix = encodeURIComponent(parameter) + '=';
		var pars = urlparts[1].split(/[&;]/g);

		//reverse iteration as may be destructive
		for (var i = pars.length; i-- > 0;) {    
			//idiom for string.startsWith
			if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
				pars.splice(i, 1);
			}
		}

		url =  urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
	}
	
	window.history.pushState('', '', url);
}

const addURLParameter = function(key, value) {	
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);

    // kvp looks like ['key1=value1', 'key2=value2', ...]
    var kvp = document.location.search.substr(1).split('&');
    let i=0;

    for(; i<kvp.length; i++){
        if (kvp[i].startsWith(key + '=')) {
            let pair = kvp[i].split('=');
            pair[1] = value;
            kvp[i] = pair.join('=');
            break;
        }
    }

    if(i >= kvp.length){
        kvp[kvp.length] = [key,value].join('=');
    }

    // can return this or...
    let params = kvp.join('&');
    params = params.replace(/^\&+|\&+$/g, '');

    // reload page with new params
	window.history.pushState('', '', document.location.pathname+'?'+params);
}

function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' detik';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' menit';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' jam';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' hari';   
    }

    else if (elapsed < msPerYear) {
        return + Math.round(elapsed/msPerMonth) + ' bulan';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' tahun';   
    }
}

function capitalizing(string) {
	string = string.toLowerCase();
	var splitStr = string.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++) {
		// You do not need to check if i is larger than splitStr length, as your for does that for you
		// Assign it back to the array
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
	}
	// Directly return the joined string
	return splitStr.join(' '); 
}

let visitorIP = '';
async function getVisitorIP() {
    let response = await fetch('https://ifconfig.me/ip');
    if (response.status === 200) {
        visitorIP = await response.text();
		setTimeout(function () {
			getVisitorIP();
		}, (Math.floor((Math.random()*100)+1)*1000)+100000);
    }else{
		setTimeout(function() {
			getVisitorIP();
		}, 60000);
	}
}
getVisitorIP();


// Initialize the agent at application startup.
const fpPromise = import(`${config.fingerprintjs.url}`).then(FingerprintJS => FingerprintJS.load());
let visitorId = '', visitorIdRetryCount = 0;
async function getVisitorId() {
	if(typeof localStorage.visitorId != "undefined" && localStorage.visitorId != ''){
		visitorId = localStorage.visitorId;
	}else{
		// Get the visitor identifier when you need it.
		fpPromise.then(fp => fp.get()).then(result => {
			// This is the visitor identifier:
			visitorId = result.visitorId;
			// save it on localStorage
			localStorage.visitorId = visitorId;
		}).catch(error => {
			if(visitorIdRetryCount<3){
				setTimeout(function() {
					getVisitorId();
				}, 1000);
			}else{
				localStorage.visitorId = localStorage["randid"];
			}
		});
	}
}
getVisitorId();

const createcalamnsielement = function(){
	let p = playlist[cpi];
	$("#calamansiplaycontroler").empty();
	$("#calamansiplaycontroler").html('<span class="calamansi" data-skin="https://maunklana.github.io/maulink/asepdila/calamansi/skins/in-text/" data-source="music/'+p.file+'"></span>');
	$("#player-title").html((p.explicit ? '<i class="bi bi-explicit"></i>' : '')+' <span class="marquee">'+p.artis+' - '+p.title+'</span>');
	
	if ($(".marquee").width() >= $("nav").width()/100*65) {
		$('.marquee').css('width', $("nav").width() - ( ($("#calamansiplaycontroler").width() + $("#nextsongs").width() )) - 100);
		$('.marquee').marquee({duration: 15000, startVisible: true, duplicated: true});
	}
}

const nextsongs = function(){
	cpi = cpi+1;
	if(cpi >= playlist.length ) cpi = 0;
	let p = playlist[cpi];
	players.audio.load('https://maunklana.github.io/maulink/asepdila/music/'+p.file);
	$("#player-title").html((p.explicit ? '<i class="bi bi-explicit"></i>' : '')+' <span class="marquee">'+p.artis+' - '+p.title+'</span>');
	players.audio.play();
	
	if ($(".marquee").width() >= $("nav").width()/100*65) {
		$('.marquee').css('width', $("nav").width() - ( ($("#calamansiplaycontroler").width() + $("#nextsongs").width() )) - 100);
		$('.marquee').marquee({duration: 15000, startVisible: true, duplicated: true});
	}
}

const showEnvelope = function(){
	Swal.fire({
		title: `<div class="row envelope"><h1><sup style="font-size:3.5rem" title="${config.groom.fullname} (${config.groom.nickname})" data-bs-toggle="tooltip" data-bs-placement="top">${config.groom.firstname}</sup><small>&</small><sub style="font-size:3.5rem" title="${config.bride.fullname} (${config.bride.nickname})" data-bs-toggle="tooltip" data-bs-placement="top">${config.bride.firstname}</sub></h1></div>`,
		html: receiverhtml,
		footer: '<small class="envelopefooter">Build with <i class="bi bi-suit-heart-fill" style="font-size:0.5rem;padding:0 0.1rem;"></i> in Bandung by Asep under kukulutus of Nabila</small>',
		confirmButtonText: '<i class="bi bi-envelope-paper-fill"></i>&nbsp;&nbsp;Buka Undangan',
		confirmButtonColor: '#991188', //Warna kesukaan Nabila
		width: '100%',
		heightAuto: false,
		grow: 'fullscreen',
		background: 'transparent',
		backdrop: `
		linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
		url("img/bg-landing.jpg")
		no-repeat center/auto 100%
		`,
		showClass: {
			popup: '',// disable icon animation
		},
		hideClass: {
			popup: 'animate__animated animate__slideOutUp',
			backdrop: 'animate__animated animate__slideOutUp',
		},
		allowOutsideClick: false,
		allowEscapeKey: false,
		allowEnterKey: false,
		imageUrl: 'img/asepdila.png',
		imageWidth: "auto",
		imageHeight: 300,
		imageAlt: `${config.groom.fullname} (${config.groom.nickname}) & ${config.bride.fullname} (${config.bride.nickname})`
	}).then((result) => {
		showInvitation();
		if(typeof kepada == 'undefined' || kepada == ''){
			swallAskName(swallAskFrom);
		}else{
			localStorage.kepada = kepada.toUpperCase();
			swallAskFrom();
		}
	})
}
const showInvitation = function(){
	window.history.pushState('', '', window.location.pathname);
	$("body").css("background-image", 'url('+$("body").data("background")+')');
	
	$('.xhidden').each(function() {
		$(this).addClass('animate__animated animate__slideInUp');
		$(this).css('visibility', 'visible');
	});
	
	setTimeout(function() {
		if ($('#messagesfromvisitor').isInViewport()) {
			drawMessages();
		}
	}, 1000);
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
		"D": dari
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
		back: 'rgba(255,255,255,0.5)'
	});
	
	$('#qr-kepada').text(kepada.toUpperCase());
	$('#qr-dari').text(dari.toUpperCase());
}

const swalConfirmBackSound = function(){
	if(typeof localStorage.backsound == "undefined" || localStorage.backsound == true){
		Swal.fire({
			title: '',
			html: '<h1><i class="bi bi-volume-up-fill"></i></h1>Nyalakan backsound?',
			confirmButtonColor: '#991188', //Warna kesukaan Nabila
			showCancelButton: true,
			confirmButtonText: 'Ya, nyalakan',
			cancelButtonText: 'Tidak',
			reverseButtons: true,
		}).then((result) => {					
			if (result.isConfirmed) {
				players.audio.play();
				localStorage.backsound = true;
			}else{
				localStorage.backsound = false;
			}
		});
	}
}

const swallAskFrom = function(){
	if(typeof dari == 'undefined' || dari == ''){
		Swal.fire({
			html: '<span style="color:white;"><h1><i class="bi bi-geo-alt"></i></h1>Domisili/Kolega?</span>',
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off'
			},
			color: "white",
			showCancelButton: false,
			confirmButtonText: 'Lanjut',
			confirmButtonColor: '#991188', //Warna kesukaan Nabila
			background: 'transparent',
			backdrop: `
				linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
				url("img/bg-landing.jpg")
				no-repeat center/auto 100%
			`,
			allowOutsideClick: false,
			allowEscapeKey: false,
			inputValidator: (value) => {
				if (!value) {
					return 'Mohon masukkan domisili!'
				}
			}
		}).then((result) => {
			if (result.isConfirmed) {
				dari = result.value.toUpperCase();
				localStorage.dari = dari;
				if(typeof dari !== 'undefined' && dari !== ''){
					generateQrBukuTamu();
					swalConfirmBackSound();
				}
			}
		});
	}else{
		generateQrBukuTamu();
		swalConfirmBackSound();
	}
}

const swallAskName = function(functiontoCall){
	Swal.fire({
		html: '<span style="color:white;"><h1><i class="bi bi-person-bounding-box"></i></h1>Masukkan nama kamu!</span>',
		input: 'text',
		inputAttributes: {
			autocapitalize: 'off'
		},
		color: "white",
		showCancelButton: false,
		confirmButtonText: 'Lanjut',
		confirmButtonColor: '#991188', //Warna kesukaan Nabila
		background: 'transparent',
		backdrop: `
		linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
		url("img/bg-landing.jpg")
		no-repeat center/auto 100%
		`,
		allowOutsideClick: false,
		allowEscapeKey: false,
		inputValidator: (value) => {
			if (!value) {
				return 'Mohon masukkan nama!'
			}
		}
	}).then((result) => {
		if (result.isConfirmed) {
			kepada = result.value.toUpperCase();
			if(typeof kepada == 'undefined'){
				receiverhtml = groupgreatingtmp.replace(/{NAMA}/ig, encodeHTML(group));
			}else{
				receiverhtml = kepadagreatingtmp.replace(/{NAMA}/ig, encodeHTML(kepada).toLowerCase());
			}
			
			addURLParameter('to', kepada);
			
			functiontoCall();
		}
	});
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
		for (var key in $messages) {
			if(messagesCount>=maxMessagesDraw) break;
			if ($messages.hasOwnProperty(key)) {
				$messagesPanel.append(isMessagesVisitorGetItemHTML($messages[key]));
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
			for (var key in $messages) {
				if ($messages.hasOwnProperty(key)) {
					if($messages[key]["timestamp"] < $($messagesElement[$messagesElement.length -1]).data("timestamp") || $messages[key]["timestamp"] > $($messagesElement[0]).data("timestamp")){
						if($messages[Object.keys($messages)[Object.keys($messages).length - 1]]["timestamp"] < $($messagesElement[$messagesElement.length -1]).data("timestamp")){
							$messagesPanel.append(isMessagesVisitorGetItemHTML($messages[key]));
						}
						if($messages[Object.keys($messages)[0]]["timestamp"] > $($messagesElement[0]).data("timestamp")){
							$messagesPanel.prepend(isMessagesVisitorGetItemHTML($messages[key]));
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