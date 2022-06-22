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
			localStorage.kepada = kepada;
			if(typeof dari == 'undefined' || dari == ''){
				swallAskFrom();
			}else{
				generateQrBukuTamu();
				swalConfirmBackSound();
			}
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
		back: '#f9f9e1'
	});
	
	$('#qr-name').text(kepada.toUpperCase());
	$('#qr-domisili').text(dari.toUpperCase());
}

const swalConfirmBackSound = function(){
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
		}
	})
}

const swallAskFrom = function(){
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
			dari = result.value;
			localStorage.dari = dari;
			if(typeof dari !== 'undefined' || dari !== ''){
				generateQrBukuTamu();
				swalConfirmBackSound();
			}
		}
	});
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
			kepada = result.value;
			if(typeof kepada == 'undefined'){
				receiverhtml = groupgreatingtmp.replace(/{NAMA}/ig, group);
			}else{
				receiverhtml = kepadagreatingtmp.replace(/{NAMA}/ig, kepada);
			}
			
			addURLParameter('to', kepada);
			
			functiontoCall();
		}
	});
}