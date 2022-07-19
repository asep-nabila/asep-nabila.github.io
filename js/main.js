if ("virtualKeyboard" in navigator) {
		navigator.virtualKeyboard.overlaysContent = true;
	}

	let kepada,dari,group,receiverhtml;

	if(typeof localStorage.kepada != "undefined" && localStorage.kepada != ''){
		kepada = localStorage.kepada.toUpperCase();
	}

	if(typeof localStorage.dari != "undefined" && localStorage.dari != ''){
		dari = localStorage.dari.toUpperCase();
	}
	
	if(queryParams.to !== null && queryParams.to !== ""){
		if(typeof kepada == "undefined"){
			kepada = encodeHTML(queryParams.to).toUpperCase();
		}
	}
	
	if(queryParams.group !== null && queryParams.group !== ""){
		group = encodeHTML(queryParams.group).toUpperCase();
	}
	
	if(isCrawler){
		kepada = "Elon Musk";
		dari = "Tesla, Inc";
	}
	
	playlist = shuffle(playlist);
	let cpi = 0;
	let players;
	
	$(function() {		
		$(".clipboard[data-clipboard-var]").each(function(i, obj){
			let clipboardVar = $(this).data("clipboard-var").split("-");
			$(this).attr("data-clipboard-text", config[clipboardVar[0]][clipboardVar[1]]);
		});
		
		if(typeof kepada == 'undefined' && typeof group == 'undefined'){
			swallAskName(showEnvelope);
		}else{
			if(typeof kepada == 'undefined'){
				receiverhtml = groupgreatingtmp.replace(/{NAMA}/ig, encodeHTML(group));
			}else{
				receiverhtml = kepadagreatingtmp.replace(/{NAMA}/ig, encodeHTML(kepada).toLowerCase());
			}
			
			showEnvelope();
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
	});
	
	if (history.scrollRestoration) {
		history.scrollRestoration = 'manual';
	} else {
		window.onbeforeunload = function () {
			location.href = location.href;
		};
	}