var db = require('./db');
var pfif = require('./pfif');

var person = {
	//添加Person信息
	add : function(data,opt){
		// var d = new Date();
		// data.person_record_id = key_domain_prefix+(d-0);
		// data.entry_date = d.toUTCString();
		// db.insert('person',data,opt);
	},

	//删除Person信息
	del : function(sobj,opt){
		// db.insert('person',sobj,opt);
	},

	//更新Person信息
	update : function(sobj,data,opt){
		// db.update('person',sobj,data,opt);
	},

	//获取Person信息
	get : function(params,opts){
		db.find(params,opts);
	}
};

module.exports = person;



