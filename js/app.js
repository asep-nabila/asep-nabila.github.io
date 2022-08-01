const appendscript = function(url, method = ''){
	let s = document.createElement('script');
	s.src = url;
	if(['defer', 'async'].indexOf(method) >= 0){
		s[method] = true;
	}
	document.body.appendChild(s);
	return s;
}

//app.js
$(function() {
	if(!isCrawler){
		appendscript('https://www.googletagmanager.com/gtag/js?id=G-77YBSBL6PY', 'async').onload = () => {
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', 'G-77YBSBL6PY');
		}
	}
	
	$('head')
	.append('<link href="https://fonts.googleapis.com/css2?family=Playball&display=swap" rel="stylesheet">')
	.append('<link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">');
	
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
	if(!isCrawler){
		appendscript('//asepnabila.link/js/sidikramo.js', 'async').onload = () => {
			fpPromise = FingerprintJS.load({apiKey: 'OS3SLXNyklDNGY2qQcMy', endpoint: `https://sr.asepnabila.link`});
			if(typeof goToInvitation !== "undefined"){
				getVisitorId(goToInvitation);		
			}else{	
				getVisitorId();
			}
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
let cpi = 0,
players,
playersPlayTimeout;
const showInvitation = function(){
	$.get("https://asepnabila.link/envelope.html", function(data){
		$("body").prepend(data);
	}).done(function() {
		$('head')
		.append('<link href="https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap" rel="stylesheet">')
		.append('<link href="https://cdn.jsdelivr.net/gh/asep-nabila/asep-nabila.github.io@master/font/arabic.css" rel="stylesheet">')
		.append(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/asep-nabila/asep-nabila.github.io@master/fontawesome/css/fontawesome-used.css" crossorigin="anonymous" referrerpolicy="no-referrer"/>`)
		.append(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/asep-nabila/asep-nabila.github.io@master/fontawesome/css/solid.min.css" crossorigin="anonymous" referrerpolicy="no-referrer"/>`);
		if(!isCrawler){
			$('head')
			.append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/asep-nabila/calamansi-js@master/dist/calamansi.min.css">')
			.append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/asep-nabila/qrcode-reader@master/dist/css/qrcode-reader.min.css">')
			.append(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css"/>`);
		}
		
		appendscript('js/envelope.js', 'async').onload = function(){
			appendscript('js/envelope.main.js', 'async').onload = function(){
				showLazyImg();
				
				if(!isCrawler){
					createcalamnsielement();
					appendscript('https://cdn.jsdelivr.net/gh/asep-nabila/calamansi-js@master/dist/calamansi.min.js', 'async').onload = function(){		
						CalamansiEvents.on('initialized', function (player) {
							players = player;
							if (localStorage.backsound == "true") {
								playersPlayTimeout = setTimeout(function(){
									players.audio.play();
								}, 500);
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
				}
			}
		}
	})
	.fail(function() {
		$( "body" ).prepend('<div class="container-fluid text-center mt-5"><p>Maaf, terjadi kendala saat mengabil undangan, silahkan coba refresh halaman.</p><button class="btn btn-primary" onClick="window.location.href=window.location.href">Refresh</button></div>');
	});
}

let showLazyImg = function(){
	$(".lazyload:not([src])").each((i,obj) => {
		lazyimg = $(obj);
		if(lazyimg.isInViewport()){
			if(lazyimg.hasClass( "grid-img" )){
				lazyimg.one("load", () => {
					$('.grid').masonry({
						// set itemSelector so .grid-sizer is not used in layout
						itemSelector: '.grid-item',
						// use element for option
						columnWidth: '.grid-sizer',
						percentPosition: true
					});
				});
			}
			
			lazyimg.addClass("animate__animated animate__fadeInDown");
			lazyimg.attr("src", lazyimg.data("src"));
		}
	});
}

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
			backdrop: '#730f66',
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