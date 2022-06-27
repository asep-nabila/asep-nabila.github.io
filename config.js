let theConfigs = {
	"groom" : {
		"fullname": "Asep Maulana Nuriman",
		"nickname": "Maunklana",
		"father": "Ace Sunarya (alm)",
		"mother": "Atikah (alm)"
	},
	"bride" : {
		"fullname": "Nabila Dea Santika",
		"nickname": "Dila",
		"father": "Dudek Junaedi",
		"mother": "Nia Kurniawati"
	},
	"receptiondate": "2023-03-11",
	"receptiontime": "10:00",
	"akadtime": "09:00",
	"appscript" : {
		"baseurl": 'https://script.google.com/macros/s/',
		"deploymentid": 'AKfycbyFeS9ghi4Cj44eguhffRmT1bqHrI94mYLA3pS6fjXpW5YokJq7GIAojYCp-VIaBKic'
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