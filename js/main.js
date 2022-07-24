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

$(function() {	
	if(typeof kepada == 'undefined' && typeof group == 'undefined'){
		swallAskName(showEnvelope);
	}else{
		if(typeof kepada == 'undefined'){
			receiverhtml = `<p class="greatings">Kepada Teman-Teman/Rekan-Rekan</p> <h2 class="receivername">${encodeHTML(group).toLowerCase()}</h2><p class="greatings">Kami Mengundang Kalian Untuk Hadir Di Acara Pernikahan Kami.</p><small style="font-size:0.7rem;opacity: 0.5;color:white;">Mohon maaf karena kami tidak menyampaikan secara pribadi</small>`;
		}else{
			receiverhtml = `<p class="greatings">Kepada Bapak/Ibu/Saudara/i</p> <h2 class="receivername">${encodeHTML(kepada).toLowerCase()}</h2><p class="greatings">Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan Kami.</p>`;
		}
		
		showEnvelope();
	}
});


if (history.scrollRestoration) {
	history.scrollRestoration = 'manual';
} else {
	window.onbeforeunload = function () {
		location.href = location.href;
	};
}