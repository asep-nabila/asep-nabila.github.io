let _tCfs = {
	"groom": {
		"fullname": "Asep Maulana Nuriman",
		"nickname": "Maunklana",
		"accountnumber": "3790761757",
		"accountusername": "maunklana",
		"phonenumber": "08999333855"
	},
	"bride": {
		"fullname": "Nabila Dea Santika",
		"nickname": "Dila"
	},
	"events": {
		"date": "2023-03-11",
		"reception": {
			"time": "10:00",
			"location": "Jl. Raya Lembang No.KM 12,1, RT.01/RW.03, Gudangkahuripan, Lembang"
		},
		"akad": {
			"time": "09:00",
			"location": "Jl. Raya Lembang No.KM 12,1, RT.01/RW.03, Gudangkahuripan, Lembang"
		}
	},
	"pagedomain": "asepnabila.link",
	"grecaptchasitekey": "6LfhB5wgAAAAAE2vZtWH91E7daPM-KMjdem0uptU",
	"appscript": {
		"baseurl": "https://script.google.com/macros/s/",
		"deploymentid": "AKfycbyFeS9ghi4Cj44eguhffRmT1bqHrI94mYLA3pS6fjXpW5YokJq7GIAojYCp-VIaBKic"
	},
	"fingerprintjs": {
		"publictoken": "OS3SLXNyklDNGY2qQcMy",
		"customendpoint": "sr"
	},
	"galleryprewed": [{
			"href": "https://picsum.photos/600/400",
			"src": "https://picsum.photos/300/200",
			"title": "",
			"alt": ""
		},
		{
			"href": "https://picsum.photos/600/400",
			"src": "https://picsum.photos/300/200",
			"title": "",
			"alt": ""
		},
		{
			"href": "https://picsum.photos/600/400",
			"src": "https://picsum.photos/300/200",
			"title": "",
			"alt": ""
		},
		{
			"href": "https://picsum.photos/600/400",
			"src": "https://picsum.photos/300/200",
			"title": "",
			"alt": ""
		},
		{
			"href": "https://picsum.photos/600/400",
			"src": "https://picsum.photos/300/200",
			"title": "",
			"alt": ""
		},
		{
			"href": "https://picsum.photos/600/400",
			"src": "https://picsum.photos/300/200",
			"title": "",
			"alt": ""
		},
		{
			"href": "https://picsum.photos/600/400",
			"src": "https://picsum.photos/300/200",
			"title": "",
			"alt": ""
		},
		{
			"href": "https://picsum.photos/600/400",
			"src": "https://picsum.photos/300/200",
			"title": "",
			"alt": ""
		},
		{
			"href": "https://picsum.photos/600/400",
			"src": "https://picsum.photos/300/200",
			"title": "",
			"alt": ""
		},
		{
			"href": "https://picsum.photos/600/400",
			"src": "https://picsum.photos/300/200",
			"title": "",
			"alt": ""
		}
	]
};

class Config {
	constructor(cfgs) {  // Constructor
		if(typeof cfgs.fingerprintjs == 'undefined'){
			 cfgs.fingerprintjs = {};
		}
		
		cfgs.fingerprintjs.url = 'https://openfpcdn.io/fingerprintjs/v3';
		if(typeof cfgs.fingerprintjs.publictoken != 'undefined'){
			cfgs.fingerprintjs.url = `https://fpcdn.io/v3/${cfgs.fingerprintjs.publictoken}`;
		}
		
		let dateObj = new Date(cfgs.events.date),
		month = dateObj.getUTCMonth() + 1,
		day = dateObj.getUTCDate(),
		year = dateObj.getUTCFullYear(),
		daysNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'],
		monthsNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

		cfgs.events.datehuman = day + " " + monthsNames[month-1] + " " + year;
		cfgs.events.days = daysNames[dateObj.getDay()];
		
		for (var conf in cfgs) {
			this[conf] = cfgs[conf];
			if(typeof this[conf]['fullname'] != 'undefined'){
				this[conf]['firstname'] = this[conf]['fullname'].substring(0, this[conf]['fullname'].indexOf(' '));
				this[conf]['lastname'] = this[conf]['fullname'].substring(this[conf]['fullname'].indexOf(' ') + 1);
			}
		}
	}
	
	preinit(d = true){
		if(d){
			document.title = `Undangan Pernikahan ${this.groom.firstname} & ${this.bride.firstname}`;
			document.querySelector('meta[name="description"]').setAttribute("content", `Undangan Pernikahan ${this.groom.fullname} (${this.groom.nickname}) & ${this.bride.fullname} (${this.bride.nickname}), kami mengundang anda untuk hadir di acara pernikahan kami.`);
			document.querySelector('meta[name="keywords"]').setAttribute("content", `Undangan, Pernikahan, ${this.groom.firstname}, ${this.bride.firstname}, ${this.groom.nickname}, ${this.bride.nickname}, ${this.groom.fullname}, ${this.bride.fullname}, ${this.groom.firstname} & ${this.bride.firstname}, ${this.groom.firstname} & ${this.bride.nickname}, Undangan ${this.groom.firstname} & ${this.bride.nickname}, Undangan ${this.groom.firstname} & Bila`);
		}
	}
	
	init(iTxt = true){
		for (var conf in this) {
			if(iTxt){
				if(['groom','bride','events'].indexOf(conf) !== -1){
					for (var key in this[conf]) {
						if(typeof this[conf][key] == "string"){
							let theClsName = document.getElementsByClassName(`${conf}-${key}`);
							if(theClsName.length > 0){
								for (var i = 0; i < theClsName.length; i++) {
									theClsName.item(i).innerText = this[conf][key];
								}
							}
						}
						
						if(typeof this[conf][key] == "object"){
							for (var keys in this[conf][key]) {
								let theClsName = document.getElementsByClassName(`${conf}-${key}-${keys}`);
								if(theClsName.length > 0){
									for (var i = 0; i < theClsName.length; i++) {
										theClsName.item(i).innerText = this[conf][key][keys];
									}
								}
							}
						}
					}
				}
			}
			
			if(conf == "galleryprewed"){
				for (let index = 0; index < this[conf].length; ++index) {
					let img = this[conf][index];
					if(document.getElementById("gallery-prewed") !== null){
						document.getElementById("gallery-prewed").innerHTML = document.getElementById("gallery-prewed").innerHTML + `<div class="grid-item"><a href="${img.href}?${index}"><img class="lazyload img-fluid" data-src="${img.src}?${index}"></img></a></div>`;
					}
				}
			}
		}
		
		let grmph = document.getElementsByClassName("groomphonenumbershow");
		if(grmph.length > 0){
			for (var i = 0; i < grmph.length; i++) {
				let c = grmph.item(i);
				let ctx = c.getContext('2d');
				ctx.lineWidth = 0.5;
				ctx.textBaseline = 'top';
				
				let __Str = "__";
				if(isMobile){
					__Str = "____";
				}
				
				c.width = ctx.measureText(this.groom.phonenumber.split('').join(" ")).width + ctx.measureText(__Str).width;
				
				ctx.font = ".9rem Arial";
				ctx.fillText(this.groom.phonenumber.split('').join(String.fromCharCode(8202)), 0, 21);
				ctx.strokeText(this.groom.phonenumber.split('').join(String.fromCharCode(8202)), 0, 21);
			}
		}
	}
}

const isMobile = (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))return true; else return false;})(navigator.userAgent||navigator.vendor||window.opera);
const isCrawler = (function(a){if(/bot|googlebot|crawler|spider|robot|crawling|chrome-lighthouse|Google Page Speed Insights/i.test(a))return true; else return false;})(navigator.userAgent||navigator.vendor||window.opera);

const config = new Config(_tCfs);
config.preinit(false);

//Template.js
let groupgreatingtmp = '<p class="greatings">Kepada Teman-Teman/Rekan-Rekan</p> <h2 class="receivername">{NAMA}</h2><p class="greatings">Kami Mengundang Kalian Untuk Hadir Di Acara Pernikahan Kami.</p><small style="font-size:0.7rem;opacity: 0.5;color:white;">Mohon maaf karena kami tidak menyampaikan secara pribadi</small>';
let kepadagreatingtmp = '<p class="greatings">Kepada Bapak/Ibu/Saudara/i</p> <h2 class="receivername">{NAMA}</h2><p class="greatings">Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan Kami.</p>';

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

//app.js
$(function() {
	$("#main-css").prop("disabled", false);
	$('head').append(`<link href="${gfonts}/css2?family=Playball&display=swap" rel="stylesheet">`);
	$('head').append(`<link href="${gfonts}/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">`);
	
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
    sidikramoScript.defer = true;
    document.body.appendChild(sidikramoScript);
	sidikramoScript.onload = function(){
		fpPromise = FingerprintJS.load({apiKey: config.fingerprintjs.publictoken, endpoint: `https://${config.fingerprintjs.customendpoint}.${config.pagedomain}`});
		if(typeof goToInvitation !== "undefined"){
			getVisitorId(goToInvitation);		
		}else{	
			getVisitorId();
		}
	}
});

$( window ).on("load", function() {	
	$('head').append(`<link href="${cdnjsdlvr}/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" rel="preload" as="style" crossorigin="anonymous">`);
	$('head').append(`<link rel="stylesheet" href="${cdnjsbaseurl}/animate.css/4.1.1/animate.min.css" rel="preload" as="style" media="(prefers-reduced-motion: no-preference)"/>`);
});

//functions.js
const cdnjsbaseurl = "https://cdnjs.cloudflare.com/ajax/libs";
const cdnjsdlvr = "https://cdn.jsdelivr.net";
const gfonts = "https://fonts.googleapis.com";

const queryParams = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const shuffle = function(ar) {
	let cI = ar.length,  rI;while (cI != 0) {rI = Math.floor(Math.random() * cI);cI--;[ar[cI], ar[rI]] = [ar[rI], ar[cI]];}return ar;
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

const showEnvelope = function(){
	Swal.fire({
		title: '<small class="envelopefooter fw-lighter" style="color: #00000000;">Undangan Pernikahan</small>' +
			'<h1 class="envelope">' +
				`<sup style="font-size:3.5rem" title="${config.groom.fullname} (${config.groom.nickname})" data-bs-toggle="tooltip" data-bs-placement="top">${config.groom.firstname}</sup>` +
				'<small>&</small>' + 
				`<sub style="font-size:3.5rem" title="${config.bride.fullname} (${config.bride.nickname})" data-bs-toggle="tooltip" data-bs-placement="top">${config.bride.firstname}</sub>` +
			'</h1>',
		html: receiverhtml,		
		confirmButtonText: `<i title="Bukan Undangan ${config.groom.fullname} & ${config.bride.fullname}" class="bi bi-envelope-paper-fill"></i>&nbsp;&nbsp;Buka Undangan`,
		footer: `<small class="envelopefooter fw-lighter text-center">The Wedding of ${config.groom.fullname} & ${config.bride.fullname}<br/>
				Build with <i class="bi bi-suit-heart-fill" title="love" style="font-size:0.5rem;padding:0 0.1rem;"></i> in Bandung by Maunk under kukulutus of Bila</small>`,
		width: 'auto',
		height: '100%',
		grow: 'fullscreen',
		background: '#FFFAFF',
		backdrop: '#643A5D',
		customClass : {
			popup: 'close-envelope-popup',
			image: 'close-envelope-popup-img-bridegroom',
			confirmButton: 'btn btn-primary'
		},
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
		imageUrl: 'https://cdn.jsdelivr.net/gh/asep-nabila/asep-nabila.github.io@master/img/asepdila.webp',
		imageWidth: 250,
		imageHeight: 250,
		imageAlt: `${config.groom.fullname} (${config.groom.nickname}) & ${config.bride.fullname} (${config.bride.nickname})`,
		didOpen: () => {
			$('head').append(`<link rel="stylesheet" as="font" href="${cdnjsdlvr}/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">`);
		}
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
	if (localStorage.backsound) {
		players.audio.play();
	}
	$('#envelope').load('envelope.html', function( response, status, xhr ) {
		if ( status == "error" ) {
			var msg = "Sorry but there was an error: ";
			$( "#envelope" ).html( msg + xhr.status + " " + xhr.statusText );
		}else{
			$('head')
			.append(`<link href="${gfonts}/css2?family=Tangerine:wght@400;700&display=swap" rel="stylesheet">`)
			.append(`<link href="${cdnjsdlvr}/npm/kfgqpc-uthmanic-script-hafs-regular@1.0.0/index.css" rel="stylesheet">`)
			.append('<link rel="stylesheet" href="//asepnabila.link/calamansi-js/dist/calamansi.min.css">')
			.append('<link rel="stylesheet" href="//asepnabila.link/qrcode-reader/dist/css/qrcode-reader.min.css">')
			.append(`<link rel="stylesheet" href="${cdnjsbaseurl}/font-awesome/6.1.1/css/fontawesome.min.css" integrity="sha512-xX2rYBFJSj86W54Fyv1de80DWBq7zYLn2z0I9bIhQG+rxIF6XVJUpdGnsNHWRa6AvP89vtFupEPDP8eZAtu9qA==" crossorigin="anonymous" referrerpolicy="no-referrer" />`)
			.append(`<link rel="stylesheet" href="${cdnjsbaseurl}/font-awesome/6.1.1/css/solid.min.css" integrity="sha512-qzgHTQ60z8RJitD5a28/c47in6WlHGuyRvMusdnuWWBB6fZ0DWG/KyfchGSBlLVeqAz+1LzNq+gGZkCSHnSd3g==" crossorigin="anonymous" referrerpolicy="no-referrer" />`)
			.append(`<link rel="stylesheet" href="${cdnjsbaseurl}/font-awesome/6.1.1/css/regular.min.css" integrity="sha512-YoxvmIzlVlt4nYJ6QwBqDzFc+2aXL7yQwkAuscf2ZAg7daNQxlgQHV+LLRHnRXFWPHRvXhJuBBjQqHAqRFkcVw==" crossorigin="anonymous" referrerpolicy="no-referrer" />`)
			.append(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css"/>`);
			
			let envelopeScript = document.createElement('script');
			envelopeScript.src = 'js/envelope.js';
			envelopeScript.defer = true;
			document.body.appendChild(envelopeScript);
			envelopeScript.onload = function(){				
				console.log("envelope ready");
				let envelopeMainScript = document.createElement('script');
				envelopeMainScript.src = 'js/envelope.main.js';
				envelopeMainScript.defer = true;
				document.body.appendChild(envelopeMainScript);
			}
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

const swallAskName = function(functiontoCall){
	Swal.fire({
		html: '<span style="color:#404040;"><h1><i class="bi bi-person-bounding-box"></i></h1>Masukkan nama kamu!</span>',
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