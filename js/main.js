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
});

if (history.scrollRestoration) {
	history.scrollRestoration = 'manual';
} else {
	window.onbeforeunload = function () {
		location.href = location.href;
	};
}

CalamansiEvents.on('initialized', function (player) {
	players = player;
	console.log(players);
	if (localStorage.backsound) {
		players.audio.play();
	}
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