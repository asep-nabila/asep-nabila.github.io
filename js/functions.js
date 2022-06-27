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

function capitalizing(string) {
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
		getVisitorIP();
	}
}
getVisitorIP();


// Initialize the agent at application startup.
const fpPromise = import('https://fpcdn.io/v3/OS3SLXNyklDNGY2qQcMy').then(FingerprintJS => FingerprintJS.load());
let visitorId = '';
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
			getVisitorId();
		});
	}
}
getVisitorId();

const createcalamnsielement = function(){
	let p = playlist[cpi];
	$("#calamansiplaycontroler").empty();
	$("#calamansiplaycontroler").html('<span class="calamansi" data-skin="https://maunklana.github.io/maulink/asepdila/calamansi/skins/in-text/" data-source="https://maunklana.github.io/maulink/asepdila/music/'+p.file+'"></span>');
	$("#player-title").html((p.explicit ? '<i class="bi bi-explicit"></i>' : '')+' <span class="marquee">'+p.artis+' - '+p.title+'</span>');
	
	if ($(".marquee").width() >= $("nav").width()/100*65) {
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
		imageWidth: 300,
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
}

const generateQrBukuTamu = function(){
	if($('#qr-kepada').text() !== ""){
		kepada = $('#qr-kepada').text().toUpperCase();
	}
	if($('#qr-dari').text() !== ""){
		dari = $('#qr-dari').text().toUpperCase();
	}
	
	$("#messagesfromvisitor-name").val(capitalizing(kepada.toLowerCase()));
	
	localStorage.kepada = kepada;
	localStorage.dari = dari;
	
	let bukutamudata = {
		"A": kepada,
		"D": dari,
		"X": Math.random()
	};
	
	let qrstrbukutamu = btoa(JSON.stringify(bukutamudata));
	
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

const recaptchaSiteKey = '6LfhB5wgAAAAAE2vZtWH91E7daPM-KMjdem0uptU';

const submitComment = function() {
  grecaptcha.ready(function() {
    grecaptcha.execute(recaptchaSiteKey, {action: 'submit'}).then(function(token) {
		console.log(token);
    });
  });
}

const getComment = function() {
  grecaptcha.ready(function() {
    grecaptcha.execute(recaptchaSiteKey, {action: 'submit'}).then(function(token) {
		console.log(token);
    });
  });
}



const getComments = function(timestamp = 0){
	
}

let visitorMessages = {};

const getLocalComment = function(){
	let storedComment = {};
	if(Object.keys(visitorMessages).length<1){
		if(typeof localStorage['visitorMessages'] !== 'undefined'){
			storedComment = JSON.parse(localStorage.getItem("visitorMessages"));
		}
		if(Object.keys(storedComment).length>0){
			visitorMessages = storedComment;
		}
	}
	
	return visitorMessages;
}

const addtLocalComment = function(commentData){
	let storedComment = getLocalComment();
	
	storedComment[commentData['timestamp']] = commentData;
	
	visitorMessages = Object.keys(storedComment).sort(function ( a, b ) { return b - a; }).reduce(
	  (obj, key) => { 
		obj[key] = storedComment[key]; 
		return obj;
	  }, 
	  {}
	);
	
	localStorage.setItem("visitorMessages", JSON.stringify(visitorMessages));
	
	return visitorMessages;
}

/*

const getCommentsUrl = function(){
	let getCommentsParams = new getData({ "action":"getComments", "page":1}); 
	return `${appScriptBaseUrl}${deploymentId}/exec?${getCommentsParams.params()}`;
}

let getCommentsParams = new getData({ "action":"getComments", "page":1}); 
return `${appScriptBaseUrl}${deploymentId}/exec?${getCommentsParams.params()}`;

$('#messagesfromvisitor').scroll(function() {
    if($(this).scrollTop() == $(this).height() - $(this).height()) {
        
    }
});

let getCommentsParams = new getData({ "action":"getComments", "page":1}); 
let getComments = `${appScriptBaseUrl}${deploymentId}/exec?${getCommentsParams.params()}`;
$.getJSON( getComments , function( data ) { console.log(data) });

let $isMessagesVisitor = $('#messagesfromvisitor').infiniteScroll({
			// options
			path: function() {
				
			},
			history: false,
			responseBody: 'json',
			append: '.post',
			fetchOptions: function() {
			  return {
				method: 'GET',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
				  'Content-Type': 'application/json'
				}
			  };
			},
			status: '.scroll-status'
		});
		
		$isMessagesVisitor.on( 'request.infiniteScroll', function( event, path, fetchPromise ) {
		  console.log(`Loading page: ${path}`);
		});
		
		$isMessagesVisitor.on( 'load.infiniteScroll', function( event, body ) {
			// compile body data into HTML
			let isMessagesVisitorItemsHTML = body.data.map( isMessagesVisitorGetItemHTML ).join('');
			// convert HTML string into elements
			let $isMessagesVisitorItemsHTMLItems =  $( isMessagesVisitorItemsHTML );
			// append item elements
			$isMessagesVisitor.infiniteScroll( 'appendItems', $isMessagesVisitorItemsHTMLItems );
		});

		// load initial page
		$isMessagesVisitor.infiniteScroll('loadNextPage');

		//------------------//

		function isMessagesVisitorGetItemHTML({ timestamp, name, message, colleague, attend }) {
			return `<div class="card">
				<h5 class="card-header">${timestamp}</h5>
				<div class="card-body">
					<h5 class="card-title">${name}</h5>
					<p class="card-text">${message}</p>
					<small>${colleague} | ${attend}</small>
				</div>
			</div>`;
		}
		
*/