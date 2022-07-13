let tCfs = {
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
	constructor(configs) {  // Constructor
		if(typeof configs.fingerprintjs == 'undefined'){
			 configs.fingerprintjs = {};
		}
		
		configs.fingerprintjs.url = 'https://openfpcdn.io/fingerprintjs/v3';
		if(typeof configs.fingerprintjs.publictoken != 'undefined'){
			configs.fingerprintjs.url = `https://fpcdn.io/v3/${configs.fingerprintjs.publictoken}`;
		}
		
		var dateObj = new Date(configs.events.date);
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		
		var daysNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'];
		var monthsNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

		configs.events.datehuman = day + " " + monthsNames[month-1] + " " + year;
		configs.events.days = daysNames[dateObj.getDay()];
		
		for (var conf in configs) {
			this[conf] = configs[conf];
			if(typeof this[conf]['fullname'] != 'undefined'){
				this[conf]['firstname'] = this[conf]['fullname'].substring(0, this[conf]['fullname'].indexOf(' '));
				this[conf]['lastname'] = this[conf]['fullname'].substring(this[conf]['fullname'].indexOf(' ') + 1);
			}
		}
	}
	
	initializing(){
		for (var conf in this) {
			if(['groom','bride','events'].indexOf(conf) !== -1){
				for (var key in this[conf]) {
					if(typeof this[conf][key] == "string"){
						let re = new RegExp(`{${conf.toUpperCase()}_${key.toUpperCase()}}`,"g");
						document.body.innerHTML = document.body.innerHTML.replace(re, this[conf][key]);
					}
					
					if(typeof this[conf][key] == "object"){
						for (var keys in this[conf][key]) {
							let re = new RegExp(`{${conf.toUpperCase()}_${key.toUpperCase()}_${keys.toUpperCase()}}`,"g");
							document.body.innerHTML = document.body.innerHTML.replace(re, this[conf][key][keys]);
						}
					}
				}
			}
			
			if(conf == "galleryprewed"){
				console.log(conf);
				for (let index = 0; index < this[conf].length; ++index) {
					let img = this[conf][index];
					if(document.getElementById("gallery-prewed") !== null){
						document.getElementById("gallery-prewed").innerHTML = document.getElementById("gallery-prewed").innerHTML + `<div class="grid-item"><a href="${img.href}?${index}"><img class="lazyload img-fluid" data-src="${img.src}?${index}"></img></a></div>`;
					}
				}
			}
		}
		
		
		
		document.title = `The Wedding of ${this.groom.firstname} & ${this.bride.firstname}`;
		document.querySelector('meta[name="description"]').setAttribute("content", `Undangan online ${this.groom.fullname} (${this.groom.nickname}) & ${this.groom.fullname} (${this.bride.nickname})`);
		
		let groomphonenumbershow = document.getElementsByClassName("groomphonenumbershow");
		if(groomphonenumbershow.length > 0){
			for (var i = 0; i < groomphonenumbershow.length; i++) {
				console.log(groomphonenumbershow.item(i));
				let c = groomphonenumbershow.item(i);
				let ctx = c.getContext('2d');
				ctx.lineWidth = 0.5;
				ctx.textBaseline = 'top';
				
				let __Str = "__";
				if(isMobile){
					__Str = "____";
				}
				
				c.width = ctx.measureText(this.groom.phonenumber.split('').join(" ")).width + ctx.measureText(__Str).width;
				
				ctx.font = ".9rem Arial";
				ctx.fillStyle = "#991188";
				ctx.fillText(this.groom.phonenumber.split('').join(String.fromCharCode(8202)), 0, 21);
				ctx.strokeStyle = "#991188";
				ctx.strokeText(this.groom.phonenumber.split('').join(String.fromCharCode(8202)), 0, 21);
			}
		}
	}
}

const isMobile = (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))return true; else return false;})(navigator.userAgent||navigator.vendor||window.opera);

const config = new Config(tCfs);
config.initializing();