let theConfigs = {
	"groom" : {
		"fullname": "Asep Maulana Nuriman",
		"nickname" : "Maunklana"
	},
	"bride" : {
		"fullname": "Nabila Dea Santika",
		"nickname": "Dila"
	}
};

class Config {
	constructor(configs) {  // Constructor
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
			if(typeof this[conf]['fullname'] != 'undefined'){
				for (var key in this[conf]) {
				let re = new RegExp(`{${conf.toUpperCase()}_${key.toUpperCase()}}`,"g");
				document.body.innerHTML = document.body.innerHTML.replace(re, this[conf][key]);
			}
		}
		
		document.title = `The Wedding of ${this.groom.firstname} & ${this.bride.firstname}`;
		document.querySelector('meta[name="description"]').setAttribute("content", `Undangan online ${this.groom.fullname} (${this.groom.nickname}) & ${this.groom.fullname} (${this.bride.nickname})`);
	}
  }
}

const config = new Config(theConfigs);
config.initializing();

let kepada,dari;

if(typeof localStorage.kepada != "undefined" || localStorage.kepada != ''){
	let kepada = localStorage.kepada;
}

if(typeof localStorage.dari != "undefined" || localStorage.dari != ''){
	let dari = localStorage.dari;
}