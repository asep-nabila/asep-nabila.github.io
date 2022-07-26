let theweddingdays = '2023-03-11';

//Constructor.js
class postData {
	constructor(datas) {  // Constructor
		for (let data in datas) {
			this[data] = datas[data];
		}
		this["visitorIP"] = visitorIP;
		this["visitorId"] = visitorId;
	}
}

class getData {
	constructor(datas, additionalParams = {}) {  // Constructor
		datas = Object.assign({}, datas, additionalParams);
		for (let data in datas) {
			this[data] = datas[data];
		}
		if(typeof this["message"] !== "undefined") delete this["message"];
		if(typeof this["name"] !== "undefined") delete this["name"];
		
		this["visitorIP"] = visitorIP;
		this["visitorId"] = visitorId;
	}
	params(){
		return $.param(this);
	}
}

function timeDifference(c, p) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = c - p;
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

const startCountdown = function(){
	const second = 1000,
		minute = second * 60,
		hour = minute * 60,
		day = hour * 24;
		
	const countDown = new Date(theweddingdays).getTime(),
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

function isDark( c ) {
    var match = /rgba?\((\d+).*?(\d+).*?(\d+)\)/.exec(c);
    return parseFloat(match[1])
         + parseFloat(match[2])
         + parseFloat(match[3])
           < 3 * 256 / 2; // r+g+b should be less than half of max (3 * 256)
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
		text: `BUKUTAMU-Asep&Nabila : ${qrstrbukutamu}`,
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
				grecaptcha.execute('6LfhB5wgAAAAAE2vZtWH91E7daPM-KMjdem0uptU', {action: 'submit'}).then((token) => {
					getCommentsParams = new getData(params, {"action":"getComments","limit":limitget,"grespon":token});
					commentsUrl = `https://script.google.com/macros/s/AKfycbyFeS9ghi4Cj44eguhffRmT1bqHrI94mYLA3pS6fjXpW5YokJq7GIAojYCp-VIaBKic/exec?${getCommentsParams.params()}`;
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

window.history.pushState('', '', window.location.pathname);

let playercontrolertimeout;

//$("body").css("background-image", 'url('+$("body").data("background")+')');
$(function() {
	getVisitorIP();

	appendscript('https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js', 'defer').onload = () => {
		console.log('jquery.validate.min.js Loaded');
	}

	appendscript('https://www.google.com/recaptcha/api.js?render=6LfhB5wgAAAAAE2vZtWH91E7daPM-KMjdem0uptU', 'defer').onload = () => {
		drawMessages();
	}
	//appendscript('https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js', 'defer');
	appendscript('//asepnabila.link/qrcode-reader/dist/js/qrcode-reader.min.js', 'defer').onload = () => {
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
});