var express = require('express'),
	person = require('./person'),
	note = require('./note');
app = express();
app.use(express.bodyParser());
//Person元数据
var person_entry = {
	'person_record_id' : '',
	'entry_date':'',
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
	'profile_urls':'', 
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
	'description':'',
	'event_id':''
};
//整理写入数据
var addPerson = function(data){
	var d = {};
	for(var i in person_entry){
		if(data[i]){
			d[i] = data[i];
		}
	}
	return d;
}

app.post('/add', function(request, response) {
	console.log(request.body);
	var rpson="";
 	person.add(addPerson(request.body),{cb : function(err,res){
 			console.log(err);
 			console.log(res);
			if(err){
				rpson = '"code":-1,"msg":"err"';
				console.log("add err!");
			}else{
				rpson = '"code":0,"msg":"suc","data":""';
				console.log("add succ!");
			}
			response.set({'Content-Type':'application/x-javascript',
					'Access-Control-Allow-Origin':'*'});
			response.json('{'+rpson+'}');
		}});
});
app.listen(9998);