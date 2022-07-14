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
						console.log(token);
						
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
    sidikramoScript.src = 'js/sidikramo.js';
    sidikramoScript.defer = true;
    document.body.appendChild(sidikramoScript);
	sidikramoScript.onload = function(){
		fpPromise = FingerprintJS.load({apiKey: config.fingerprintjs.publictoken, endpoint: `https://${config.fingerprintjs.customendpoint}.${config.pagedomain}`});
		getVisitorId();
	}
});

$( window ).on("load", function() {	
	$('head').append(`<link href="${cdnjsdlvr}/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" rel="preload" as="style" crossorigin="anonymous">`);
	$('head').append(`<link rel="stylesheet" href="${cdnjsbaseurl}/animate.css/4.1.1/animate.min.css" rel="preload" as="style" media="(prefers-reduced-motion: no-preference)"/>`);
});

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register("serviceworker.js");
	navigator.serviceWorker.addEventListener('message', event => {
		console.log(event.data);
	});
}