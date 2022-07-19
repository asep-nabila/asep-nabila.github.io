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
	$('head').append(`<link href="${gfonts}/css2?family=Playball&display=swap" rel="stylesheet">`);
	$('head').append(`<link href="${gfonts}/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">`);
	$('head').append(`<link rel="stylesheet" rel="preload" as="font" href="${cdnjsdlvr}/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">`);
	
	$.fn.isInViewport = function() {
		var elementTop = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();

		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();

		return elementBottom > viewportTop && elementTop < viewportBottom;
	};
	
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


function isDark( color ) {
    var match = /rgba?\((\d+).*?(\d+).*?(\d+)\)/.exec(color);
    return parseFloat(match[1])
         + parseFloat(match[2])
         + parseFloat(match[3])
           < 3 * 256 / 2; // r+g+b should be less than half of max (3 * 256)
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
		footer: `<small class="envelopefooter fw-lighter text-center">The Wedding of ${config.groom.fullname} & ${config.bride.fullname}<br/><br/>
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
		imageUrl: 'img/asepdila.webp',
		imageWidth: 250,
		imageHeight: 250,
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