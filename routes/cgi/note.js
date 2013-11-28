var db = require('./db');

//Note元数据
var note_entry = {
	'note_record_id':'',
	'person_record_id':'',
	'linked_person_record_id':'',
	'entry_date':'',
	'author_name':'',
	'author_email':'',
	'author_phone':'',
	'source_date':'',
	'status':'',
	'author_made_contact':'',
	'email_of_found_person':'',
	'phone_of_found_person':'',
	'last_known_location':'',
	'text':'',
	'photo_url':''
};

var key_domain_prefix = 'personfinder.pfif.org.note.';

var note = {
	//添加Note信息
	add : function(data,opt){
		var d = new Date();
		data.note_record_id = key_domain_prefix+(d-0);
		data.entry_date = d.toUTCString();
		db.insert('note',data,opt);
	},

	//删除Note信息
	del : function(sobj,opt){
		db.insert('note',sobj,opt);
	},

	//更新Note信息
	update : function(sobj,data,opt){
		db.update('note',sobj,data,opt);
	},

	//获取Note信息
	get : function(sobj,opt){
		db.find('note',sobj,opt)
	}
};

//导出公共方法
module.exports = note;


