const shuffle = function(ar) {
	let cI = ar.length,  rI;while (cI != 0) {rI = Math.floor(Math.random() * cI);cI--;[ar[cI], ar[rI]] = [ar[rI], ar[cI]];}return ar;
}

const encodeHTML = function(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

const queryParams = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const isMobile = (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))return true; else return false;})(navigator.userAgent||navigator.vendor||window.opera);
const isCrawler = (function(a){if(/bot|googlebot|crawler|spider|robot|crawling|chrome-lighthouse|Google Page Speed Insights/i.test(a))return true; else return false;})(navigator.userAgent||navigator.vendor||window.opera);

//Template.js
const groupgreatingtmp = '<p class="greatings">Kepada Teman-Teman/Rekan-Rekan</p> <h2 class="receivername">{NAMA}</h2><p class="greatings">Kami Mengundang Kalian Untuk Hadir Di Acara Pernikahan Kami.</p><small style="font-size:0.7rem;opacity: 0.5;color:white;">Mohon maaf karena kami tidak menyampaikan secara pribadi</small>';
const kepadagreatingtmp = '<p class="greatings">Kepada Bapak/Ibu/Saudara/i</p> <h2 class="receivername">{NAMA}</h2><p class="greatings">Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan Kami.</p>';

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


const showEnvelope = function(){
	document.head.innerHTML += '<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css" rel="stylesheet" as="font">';
	document.head.innerHTML += '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet">';
	
	Swal.fire({
		title: '<small class="envelopefooter fw-lighter" style="color: #00000000;">Undangan Pernikahan</small>' +
			'<h1 class="envelope">' +
				'<sup style="font-size:3.5rem" title="Asep Maulana Nuriman (Maunklana)" data-bs-toggle="tooltip" data-bs-placement="top">Asep</sup>' +
				'<small>&</small>' + 
				'<sub style="font-size:3.5rem" title="Nabila Dea Santika (Dila)" data-bs-toggle="tooltip" data-bs-placement="top">Nabila</sub>' +
			'</h1>',
		html: receiverhtml,		
		confirmButtonText: '<i title="Bukan Undangan Asep Maulana Nuriman & Nabila Dea Santika" class="bi bi-envelope-paper-fill"></i>&nbsp;&nbsp;Buka Undangan',
		footer: `<small class="envelopefooter fw-lighter text-center">The Wedding of Asep Maulana Nuriman & Nabila Dea Santika<br/>Build with <i class="bi bi-suit-heart-fill" title="love" style="font-size:0.5rem;padding:0 0.1rem;"></i> in Bandung by Maunk under kukulutus of Bila</small>`,
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
		imageAlt: 'Asep Maulana Nuriman (Maunklana) & Nabila Dea Santika (Dila)',
		didRender: () => {
			document.head.innerHTML += '<link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet"/>';
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