class postData {
	constructor(datas) {  // Constructor
		for (let data in datas) {
			this[data] = datas[data];
		}
		this["visitorIP"] = visitorIP;
		this["visitorId"] = visitorId;
	}
}

class getData {
	constructor(datas, additionalParams = {}) {  // Constructor
		datas = Object.assign({}, datas, additionalParams);
		for (let data in datas) {
			this[data] = datas[data];
		}
		if(typeof this["message"] !== "undefined") delete this["message"];
		if(typeof this["name"] !== "undefined") delete this["name"];
		
		this["visitorIP"] = visitorIP;
		this["visitorId"] = visitorId;
	}
	params(){
		return $.param(this);
	}
}