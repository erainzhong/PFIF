var person = require('./person');

var findPersonCb = function(d){
	console.log(d);
}

var findPerson = function(req, res){
	var params = {
			"full_name" : req.query.full_name
		},
		opts = {
			"cb" : findPersonCb
		}
	person.get(params,opts);
};

exports.findPerson = findPerson;