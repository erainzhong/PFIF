var user_entry = {
	'user_id' : '',
	'access_token' : '',
	'create_date':'',
	'last_load_date':'',
	'status':'',
	'privacy':'',
};

var record_entry = {
	'user_id' : '',
	'record_id' : '',
	'create_date' : '',
	'record_type' : ''
};

var person_entry = {
	'person_record_id' : '',
	'entry_date':'',
	'expiry_date':'',
	'author_name':'',
	'author_email':'',
	'author_phone':'',
	'source_name':'',
	'source_date':'',
	'source_url':'',
	'full_name':'',
	'given_name':'',
	'family_name':'',
	'alternate_names':'',
	'description' : '',
	'sex':'',
	'date_of_birth':'',//精度可调
	'age':'',//age可以是个范围
	'home_street':'',
	'home_neighborhood':'',
	'home_city':'',
	'home_state':'',
	'home_postal_code':'',
	'home_country':'',
	'photo_url':'',
	'profile_urls':'',//个人照片，用|分割
	'event_id':''//隶属事件
};

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

var event_entry = {
	'event_id':'',
	'event_name':'',
	'occur_date':'',
	'description':'',
	'photo_url':''
};

exports.user_entry = user_entry;
exports.record_entry = record_entry;
exports.person_entry = person_entry;
exports.note_entry = note_entry;
exports.event_entry = event_entry;