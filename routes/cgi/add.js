var LI = require('../lagic_inter');
var pfif = require('../pfif');
var US = require('underscore');

var addPerson = function(req, res){
	var person_entry = US.clone(pfif.person_entry);
	for(var i in person_entry){
		person_entry[i] = req.body[i]
	}

	LI.addNewPerson(person_entry,{
		table : "person",
		cb : function(d){
			res.json(LI.sucJSON(0,d));
		},
		ecb : function(){
			res.json(LI.errJSON(-4000));
		}
	})
};

exports.addPerson = addPerson;