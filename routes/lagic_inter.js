//后台逻辑接口层，主要提供公共方法。

var LI = {};

var pfif = require('./pfif');
var dbOpr = require('./db_operate');
var US = require('underscore');	//基础库


var key_domain_person = 'personfinder.chinapfif.com.person/';
var key_domain_note = 'personfinder.chinapfif.com.note/';
 
LI = {
	//标准错误json返回
	/*  type -3000 未登录
		type -4000 未找到数据
		type -5000 其他乱七八糟
	*/ 
	errJSON : function(type,data){
		if(!type) return;
		data = data || {};
		var msg = {
			"-3000" : "未登录",
			"-4000" : "未找到数据",
			"-5000" : "其他乱七八糟"
		};
		var d = {
			"code" : type,
			"msg" : msg[type],
			"data" : data
		}
		return d;
	},
	sucJSON : function(type,data){
		data = data || {};
		var d = {
			"code" : type,
			"msg" : "成功",
			"data" : data
		}
		return d;
	},
	//格式为 YYYY-MM-DD HH:MM:SS
	getNowDate : function(){
		var _d = new Date();
		var dateFormat = require('dateformat');
		return dateFormat(_d, "yyyy-mm-dd HH:MM:ss");
	},
	addNewUser : function(user,opts){
		var _d = LI.getNowDate(),
			user_entry = US.clone(pfif.user_entry);
		user.user_id = user.openId;
		user.access_token = user.accessToken;
		user.create_date = _d;
		user.last_load_date = _d;
		user.status = "";
		user.privacy = user.privacy;
		for(var i in user_entry){
			user_entry[i] = user[i];
		}
		dbOpr.add({
			data:user_entry
		},{
			table : "user",
			cb : function(d){console.log(d)}
		})
	},
	addNewPerson : function(person){
		var _d = LI.getNowDate(),
			person_entry = US.clone(pfif.person_entry);
		for(var i in person){
			person_entry[i] = person[i];
		}
		person_entry.person_record_id = key_domain_person + (+new Date());
		dbOpr.add({
			data : person_entry
		},{
			table : "person",
			cb : function(d){}
		});

	},
	addNewNote : function(note){

	},

	findPerson : function(person,opts){
		dbOpr.get({
			data : person
		},{
			table : "person",
			cb : opts.cb,
			ecb : opts.ecb
		})
	}

};

exports.errJSON = LI.errJSON;
exports.sucJSON = LI.sucJSON;
exports.getNowDate = LI.getNowDate;
exports.addNewNote = LI.addNewNote;
exports.addNewPerson = LI.addNewPerson;
exports.addNewUser = LI.addNewUser;
exports.findPerson = LI.findPerson;