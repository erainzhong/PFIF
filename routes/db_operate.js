//数据库操作逻辑层，主要负责动态或者静态的SQL语句，且是唯一一处可以直接调用db的接口文件。
var db = require('./db');
var pfif = require('./pfif');
var US = require('underscore');
var mysql = require('mysql');

var db_sql_hash  = {
	selectUser : "select * from user where user_id=<%=user_id%>",
	updateUser : "update user set access_token=<%=access_token%>,last_load_date=<%=last_load_date%>,privacy=<%=privacy%>,status=<%status%> where user_id=<%=user_id%>",
	addUser : "insert into user(user_id,access_token,create_date,last_load_date,status,privacy) values(<%=user_id%>,<%=access_token%>,<%=create_date%>,<%=last_load_date%>,<%=status%>,<%=privacy%>) where not exists user_id=<%=user_id%>",

	selectPerson : "select * from person where full_name=<%=full_name%>",
	updatePerson : "",
	addPerson : "insert into person(person_record_id,entry_date,expiry_date,author_name,author_email,author_phone,source_name,source_date,source_url,full_name,given_name,family_name,alternate_names,profile_urls,sex,date_of_birth,age,home_street,home_neighborhood,home_city,home_state,home_postal_code,home_country,photo_url,profile_urls,event_id,description) values(<%=person_record_id %>,<%=entry_date %>,<%=expiry_date%>,<%=author_name%>,<%=author_email%>,<%=author_phone%>,<%=source_name%>,<%=source_date%>,<%=source_url%>,<%=full_name%>,<%=given_name%>,<%=family_name%>,<%=alternate_names%>,<%=profile_urls%>,<%=sex%>,<%=date_of_birth%>,<%=age%>,<%=home_street%>,<%=home_neighborhood%>,<%=home_city%>,<%=home_state%>,<%=home_postal_code%>,<%=home_country%>,<%=photo_url%>,<%=profile_urls%>,<%=event_id%>,<%=description%>)"

};

var parseSQL = function(type,data){
	var tmp = db_sql_hash[type];
	return US.template(tmp,data);
};


//防SQL注入
var escapeSQL = function(data){
	for(var i in data){
		if()
		data[i] = mysql.escape(data[i],true,'local');
	}
	return data;
}

var db_operate = {
	//添加信息
	add : function(params,opts){
		if(opts.table == "user"){//用户表操作
			var data = escapeSQL(params.data);
			db.get(parseSQL("selectUser",data),{
				cb : function(d){
					if(d.length == 0){
						db.add(parseSQL("addUser",data));
					}else if(d.length == 1){
						db.update(parseSQL("updateUser",data));
					}
					opts.cb(d)
				},
				ecb : function(){
					opts.ecb();
				}
			});
		}else if(opts.table == "person"){
			var data = escapeSQL(params.data);
			db.add(parseSQL("addPerson",data),{
				cb : function(d){
					opts.cb(d);
				},
				ecb : function(){
					opts.ecb();
				}
			});
		}
	},

	//删除信息
	del : function(sobj,opts){
		params = parseParams(params);
		db.find(params.selectSQL,opts);
	},

	//更新信息
	update : function(params,opts){
		params = parseParams(params);
		db.update(params.selectSQL,opts);
	},

	//获取信息
	get : function(params,opts){
		if(opts.table == "user"){

		}else if(opts.table == "person"){
			var data = escapeSQL(params.data);
			db.get(parseSQL("selectPerson",data),{
				cb : function(data){
					opts.cb(data);
				},
				ecb : function(){
					opts.ecb();
				}
			});
		}
	}
};

exports.add = db_operate.add;
exports.del = db_operate.del;
exports.update = db_operate.update;
exports.get = db_operate.get;



