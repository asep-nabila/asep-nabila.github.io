if ("virtualKeyboard" in navigator) {
	navigator.virtualKeyboard.overlaysContent = true;
}
   
let kepada,dari,kenalan,group,receiverhtml;
   
if(localStorage.kepada){
	kepada = localStorage.kepada.toUpperCase();
}

if(localStorage.kenalan){
	kenalan = localStorage.kenalan;
}
   
if(localStorage.dari){
	dari = localStorage.dari.toUpperCase();
}

if(queryParams.to !== null && queryParams.to !== ""){
	if(typeof kepada == "undefined"){
		kepada = encodeHTML(queryParams.to).toUpperCase();
	}
}

if(queryParams.group !== null && queryParams.group !== ""){
	dari = encodeHTML(queryParams.group).toUpperCase();
}else{
	if(queryParams['from'] !== null && queryParams['from'] !== ""){
		dari = encodeHTML(queryParams['from']).toUpperCase();
	}
}

if(isCrawler){
	kepada = "Elon Musk";
	dari = "Tesla, Inc";
	localStorage.backsound = false;
}

$(function() {	
	if(typeof kepada == 'undefined' && typeof group == 'undefined'){
		swallAskName(showEnvelope);
	}else{
		if(typeof kepada == 'undefined'){
			receiverhtml = ggtmp.replace(/{NM}/ig, encodeHTML(group));
		}else{
			receiverhtml = kgtmp.replace(/{NM}/ig, encodeHTML(kepada).toLowerCase());
		}
		
		if(isCrawler){
			showInvitation();
		}else{
			showEnvelope();
		}
	}
});


if (history.scrollRestoration) {
	history.scrollRestoration = 'manual';
} else {
	window.onbeforeunload = function () {
		location.href = location.href;
	};
}