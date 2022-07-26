let prewedimgs = [{
		"href": "https://picsum.photos/600/400",
		"src": "https://picsum.photos/300/200",
		"title": "",
		"alt": "Picsum 1"
	},
	{
		"href": "https://picsum.photos/600/400",
		"src": "https://picsum.photos/300/200",
		"title": "",
		"alt": "Picsum 2"
	},
	{
		"href": "https://picsum.photos/600/400",
		"src": "https://picsum.photos/300/200",
		"title": "",
		"alt": "Picsum 3"
	},
	{
		"href": "https://picsum.photos/600/400",
		"src": "https://picsum.photos/300/200",
		"title": "",
		"alt": "Picsum 4"
	},
	{
		"href": "https://picsum.photos/600/400",
		"src": "https://picsum.photos/300/200",
		"title": "",
		"alt": "Picsum 5"
	},
	{
		"href": "https://picsum.photos/600/400",
		"src": "https://picsum.photos/300/200",
		"title": "",
		"alt": "Picsum 6"
	},
	{
		"href": "https://picsum.photos/600/400",
		"src": "https://picsum.photos/300/200",
		"title": "",
		"alt": "Picsum 7"
	},
	{
		"href": "https://picsum.photos/600/400",
		"src": "https://picsum.photos/300/200",
		"title": "",
		"alt": "Picsum 8"
	},
	{
		"href": "https://picsum.photos/600/400",
		"src": "https://picsum.photos/300/200",
		"title": "",
		"alt": "Picsum 9"
	},
	{
		"href": "https://picsum.photos/600/400",
		"src": "https://picsum.photos/300/200",
		"title": "",
		"alt": "Picsum 10"
	}
];

$(function() {
	for (let i = 0; i < prewedimgs.length; ++i) {
		let img = prewedimgs[i];
		if($("#gallery-prewed") !== null){
			$("#gallery-prewed").append(`<div class="grid-item"><a href="${img.href}?${i}" aria-label="${img.alt}"><img class="lazyload img-fluid" alt="${img.alt}" data-src="${img.src}?${i}"></img></a></div>`);
		}
	}
	
	let grmph = $(".groomphonenumbershow");
	if(grmph.length > 0){
		grmph.each(function(i, obj) {
			let c = this;
			let ctx = c.getContext('2d');
			ctx.lineWidth = 0.5;
			ctx.textBaseline = 'top';
			
			let __Str = "__";
			if(isMobile){
				__Str = "____";
			}
			
			c.width = ctx.measureText('08999333855'.split('').join(" ")).width + ctx.measureText(__Str).width;
			
			ctx.font = ".9rem Arial";
			ctx.fillText('08999333855'.split('').join(String.fromCharCode(8202)), 0, 21);
			ctx.strokeText('08999333855'.split('').join(String.fromCharCode(8202)), 0, 21);
		});
	}

	$('.nav-link, .navigate-link').each(function() {
		$(this).on('click', function(event) {
			event.preventDefault();
			$('html,body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500);
		});
	});
	
	$("#nextsongs").on('click', function(event) {
		nextsongs();
	});
	
	if($("body").width()>1024){
		$("#qr-kepada, #qr-dari").each(function(){
			$(this).on("click focus", function(){
				$(this).css("visibility", "hidden");
				
				let totalWidth = $(this).parents("div").width();
				totalWidth += parseInt($(this).parents("div").css("padding-left"), 10) + parseInt($(this).parents("div").css("padding-right"), 10); //Total Padding Width
				totalWidth += parseInt($(this).parents("div").css("margin-left"), 10) + parseInt($(this).parents("div").css("margin-right"), 10); //Total Margin Width
				totalWidth += parseInt($(this).parents("div").css("borderLeftWidth"), 10) + parseInt($(this).parents("div").css("borderRightWidth"), 10); //Total Border Width
				
				let totalHeight = $(this).height()+10;
				totalHeight += parseInt($(this).css("padding-top"), 10) + parseInt($(this).css("padding-bottom"), 10); //Total Padding Width
				totalHeight += parseInt($(this).css("margin-top"), 10) + parseInt($(this).css("margin-bottom"), 10); //Total Margin Width
				totalHeight += parseInt($(this).css("borderTopWidth"), 10) + parseInt($(this).css("borderBottomWidth"), 10); //Total Border Width
				
				let inlinedit = $('<input></input>').css({
					"top" : $(this).parents("div").offset().top-$(window).scrollTop(),
					"left" : $(this).parents("div").offset().left,
					"height" : totalHeight-5,
					"width" : totalWidth-1,
					"position" : "fixed",
					"text-align" : "center"
				})
				.val($(this).text().toUpperCase())
				.data("elemid", $(this).attr("id"))
				.css('font-size', $(this).parent().css('font-size'))
				.addClass("inlineinput");
				
				inlinedit.keyup(function(e){
					if(e.keyCode === 27){
						$("#"+$(this).data("elemid")).css("visibility", "visible");
						$(this).remove();
					}
				});
		
				inlinedit.focusout(function() {
					$("#"+$(this).data("elemid")).text($(this).val().toUpperCase());
					generateQrBukuTamu();
					$("#"+$(this).data("elemid")).css("visibility", "visible");
					$(this).remove();
				});
				
				inlinedit.keypress(function(e){
					if(e.which == 13 || e.which == 27){
						$("#"+$(this).data("elemid")).text($(this).val().toUpperCase());
						generateQrBukuTamu();
						$("#"+$(this).data("elemid")).css("visibility", "visible");
						$(this).remove();
					}
				});
				
				$("body").append(inlinedit);
				
				inlinedit.focus();
				
				$(window).scroll(function(){
					$("#"+$(this).data("elemid")).css("visibility", "visible");
					inlinedit.remove();
				});
			});
		});
	}

	$("#reset-attenderdata").click(function(){
		Swal.fire({
			html: '<h1><i class="bi bi-arrow-clockwise"></i></h1>Reset data kamu?',
			confirmButtonColor: '#991188', //Warna kesukaan Nabila
			showCancelButton: true,
			confirmButtonText: 'Ya, reset',
			cancelButtonText: 'Tidak',
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				["kepada", "dari", "backsound"].forEach(
					k => localStorage.removeItem(k)
				);
				location.reload();
			}
		})
	});

	$("#edit-attenderdata").click(function(){
		Swal.fire({
			html:
				'<div style="max-width:25rem;">' +
				'<h1><i class="bi bi-person-bounding-box"></i></h1>Ubah data tamu?' +
				'<div class="mt-2 text-start row">' +
				'<label for="attenderdata-kepada" class="col-sm-4 col-form-label">Nama</label>' +
				'<div class="col-sm-8">' +
				'<input id="attenderdata-kepada" type="text" aria-label="Nama" class="form-control text-uppercase">' +
				'</div>' +
				'</div>' +
				'<div class="mb-1 text-start row">' +
				'<label for="attenderdata-dari" class="col-sm-4 col-form-label">Domisili</label>' +
				'<div class="col-sm-8">' +
				'<input id="attenderdata-dari" type="text" aria-label="Domisili" class="form-control text-uppercase">' +
				'</div>' +
				'</div>' +
				'</div>',
			showCancelButton: true,
			width: '25rem',
			confirmButtonColor: '#991188', //Warna kesukaan Nabila
			reverseButtons: true,
			preConfirm: function () {
				return new Promise(function (resolve) {
					// Validate input
					if ($('#attenderdata-kepada').val() == '' || $('#attenderdata-dari').val() == '') {
						swal.showValidationMessage("isikan Nama dan Domisili"); // Show error when validation fails.
						swal.enableConfirmButton(); // Enable the confirm button again.
					} else {
						swal.resetValidationMessage(); // Reset the validation message.
						resolve([
							$('#attenderdata-kepada').val(),
							$('#attenderdata-dari').val()
						]);
					}
				})
			},
			didOpen: (popupedit) => {
				console.log($(popupedit));
				console.log($(popupedit).children(".swal2-html-container")[0]);
				$($(popupedit).children(".swal2-html-container")[0]).css("overflow-x","hidden");
				$('#attenderdata-kepada').val($('#qr-kepada').text().toUpperCase());
				$('#attenderdata-dari').val($('#qr-dari').text().toUpperCase());
				$('#attenderdata-kepada').focus()
			}
		}).then(function (result) {
			if (result.isConfirmed) {
				$("#qr-kepada").text($('#attenderdata-kepada').val());
				$("#qr-dari").text($('#attenderdata-dari').val());
				generateQrBukuTamu();
			}
		}).catch(swal.noop)
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
					grecaptcha.execute('6LfhB5wgAAAAAE2vZtWH91E7daPM-KMjdem0uptU', {action: 'submit'}).then(function(token) {
						
						getInsertMessageParams = new getData({}, {"action":"insertComments", "grespon":token});
						
						var settings = {
							"url": `https://script.google.com/macros/s/AKfycbyFeS9ghi4Cj44eguhffRmT1bqHrI94mYLA3pS6fjXpW5YokJq7GIAojYCp-VIaBKic/exec?${getInsertMessageParams.params()}`,
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

	$("iframe").each(function() {
		$(this).attr("src", $(this).data("src"));  
	});
	
	appendscript('https://cdn.jsdelivr.net/npm/clipboard@2.0.10/dist/clipboard.min.js', 'defer').onload = () => {
		let clipboard = new ClipboardJS('.clipboard');
		clipboard.on('success', function (e) {
			let $elem = $(e.trigger);
			let elemprehtml = $elem.html();
			let elempreclass = $elem.attr("class");
			let copytext = e.text;
			$elem.html("Berhasil disalin");
			$elem.attr("class", elempreclass.replace(/primary/g, 'warning'));
			setTimeout(function(){
				$elem.html(elemprehtml);
				$elem.attr("class", elempreclass);
			},1000);

			e.clearSelection();
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
	
	setTimeout(function() {
		if ($('#messagesfromvisitor').isInViewport()) {
			drawMessages();
		}
	}, 1000);
	
	generateQrBukuTamu();
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
	
	$("body>div#envelope>div").each((i,obj) => {
		$container = $(obj);
		if($container.isInViewport()){
			$plyrElem = $("#player-elem>#player-control-panel");
			var elementTop = parseInt($plyrElem.offset().top);
			var elementBottom = parseInt(elementTop + $plyrElem.outerHeight());

			var viewContainerTop = parseInt($container.offset().top);
			var viewContainerBottom = parseInt(viewContainerTop + parseInt($container.css('margin-top'), 10) + parseInt($container.css('margin-bottom'), 10) + $container.outerHeight());
			
			if(viewContainerTop+$plyrElem.height()/2 > elementTop || elementBottom-$plyrElem.height()/2 < viewContainerBottom){					
				$plyrElem.find("[class*=btn-outline-]").each((i,obj) => {
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