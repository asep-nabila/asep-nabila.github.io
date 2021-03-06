//app.js
$(function() {
	$("#main-css").prop("disabled", false);
	$('head').append('<link href="https://fonts.googleapis.com/css2?family=Playball&display=swap" rel="stylesheet">');
	$('head').append('<link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">');
	
	$.fn.isInViewport = function() {
		var elementTop = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();

		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();

		return elementBottom > viewportTop && elementTop < viewportBottom;
	};
	
	// Initialize the agent at application startup.
	//https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3/dist/fp.min.js
	//const fpPromise = import('./sidikramo.js').then(FingerprintJS => );
	let sidikramoScript = document.createElement('script');
    sidikramoScript.src = '//asepnabila.link/js/sidikramo.js';
    sidikramoScript.async = true;
    document.body.appendChild(sidikramoScript);
	sidikramoScript.onload = function(){
		fpPromise = FingerprintJS.load({apiKey: 'OS3SLXNyklDNGY2qQcMy', endpoint: `https://sr.asepnabila.link`});
		if(typeof goToInvitation !== "undefined"){
			getVisitorId(goToInvitation);		
		}else{	
			getVisitorId();
		}
	}
});

//functions.js
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

const addURLParameter = function(k, v) {	
    k = encodeURIComponent(k);
    v = encodeURIComponent(v);

    // kvp looks like ['key1=value1', 'key2=value2', ...]
    var kvp = document.location.search.substr(1).split('&');
    let i=0;

    for(; i<kvp.length; i++){
        if (kvp[i].startsWith(k + '=')) {
            let pair = kvp[i].split('=');
            pair[1] = v;
            kvp[i] = pair.join('=');
            break;
        }
    }

    if(i >= kvp.length){
        kvp[kvp.length] = [k,v].join('=');
    }

    // can return this or...
    let prms = kvp.join('&');
    prms = prms.replace(/^\&+|\&+$/g, '');

    // reload page with new params
	window.history.pushState('', '', document.location.pathname+'?'+prms);
}

function capitalizing(str) {
	str = str.toLowerCase();
	var splitStr = str.toLowerCase().split(' ');
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

let visitorId;
async function getVisitorId(functionCallbak) {
	if(window.self === window.top){
		if(typeof localStorage.visitorId != "undefined" && localStorage.visitorId != ''){
			visitorId = localStorage.visitorId;
			if(typeof functionCallbak == "function"){
				functionCallbak();
			}
		}else{
			// Get the visitor identifier when you need it.
			fpPromise.then(fp => fp.get()).then(result => {
				// This is the visitor identifier:
				visitorId = result.visitorId;
				// save it on localStorage
				localStorage.visitorId = visitorId;
				
				if(typeof functionCallbak == "function"){
					functionCallbak();
				}
			}).catch(error => {
				localStorage.visitorId = localStorage["randid"];
				if(typeof functionCallbak == "function"){
					functionCallbak();
				}
			});
		}
	}
}

if(typeof playlist !== 'undefined') playlist = shuffle(playlist);
let cpi = 0;
let players;

let playersPlayTimeout;
const showInvitation = function(){
	createcalamnsielement();
	
	let calamansiScript = document.createElement('script');
	calamansiScript.src = 'https://cdn.jsdelivr.net/gh/asep-nabila/calamansi-js@master/dist/calamansi.min.js';
	calamansiScript.async = true;
	document.body.appendChild(calamansiScript);
	calamansiScript.onload = function(){		
		CalamansiEvents.on('initialized', function (player) {
			players = player;
			if (localStorage.backsound == "true") {
				playersPlayTimeout = setTimeout(function(){
					players.audio.play();
				}, 2000);
			}
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
		
		Calamansi.autoload();
	}
	
	$('#envelope').load('envelope.html', function( response, status, xhr ) {
		if ( status == "error" ) {
			var msg = "Sorry but there was an error: ";
			$( "#envelope" ).html( msg + xhr.status + " " + xhr.statusText );
		}else{
			$('head')
			.append('<link href="https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap" rel="stylesheet">')
			.append(`<link href="https://cdn.jsdelivr.net/npm/kfgqpc-uthmanic-script-hafs-regular@1.0.0/index.css" rel="stylesheet">`)
			.append('<link rel="stylesheet" href="//asepnabila.link/calamansi-js/dist/calamansi.min.css">')
			.append('<link rel="stylesheet" href="//asepnabila.link/qrcode-reader/dist/css/qrcode-reader.min.css">')
			.append(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/fontawesome.min.css" crossorigin="anonymous" referrerpolicy="no-referrer"/>`)
			.append(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/solid.min.css" crossorigin="anonymous" referrerpolicy="no-referrer"/>`)
			.append(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libshttps://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/regular.min.css" crossorigin="anonymous" referrerpolicy="no-referrer"/>`)
			.append(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css"/>`);
			
			let envelopeScript = document.createElement('script');
			envelopeScript.src = 'js/envelope.js';
			envelopeScript.async = true;
			document.body.appendChild(envelopeScript);
			envelopeScript.onload = function(){				
				console.log("envelope ready");
				let envelopeMainScript = document.createElement('script');
				envelopeMainScript.src = 'js/envelope.main.js';
				envelopeMainScript.async = true;
				document.body.appendChild(envelopeMainScript);
			}
		}
	});
}

const createcalamnsielement = function(){
	let p = playlist[cpi];
	$("#calamansiplaycontroler").empty();
	$("#calamansiplaycontroler").html('<span class="calamansi" data-skin="//i.asepnabila.link/calamansi/skins/in-text" data-source="music/init.mp3"></span>');
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
				localStorage.backsound = true;
				if(typeof players.audio == 'object'){
					clearTimeout(playersPlayTimeout);
					players.audio.play();
				}
			}else{
				localStorage.backsound = false;
			}
		});
	}
}

const swallAskFrom = function(){
	if(typeof dari == 'undefined' || dari == ''){
		Swal.fire({
			html: '<span style="color:#404040;"><h1><i class="bi bi-geo-alt"></i></h1>Domisili/Kolega?</span>',
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off'
			},
			color: "#FFFFFF",
			showCancelButton: false,
			confirmButtonText: 'Lanjut',
			confirmButtonColor: '#991188', //Warna kesukaan Nabila
			background: '#FFFFFF',
			backdrop: '#643A5D',
			customClass : {
				popup: 'close-envelope-popup',
				image: 'close-envelope-popup-img-bridegroom',
				input: 'swall-input-ask text-center'
			},
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
					swalConfirmBackSound();
				}
			}
		});
	}else{
		swalConfirmBackSound();
	}
}