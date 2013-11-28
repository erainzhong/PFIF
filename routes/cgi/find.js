var LI = require('../lagic_inter');

var findPerson = function(req, res){
	LI.findPerson({
		full_name:req.params.full_name
	},{
		table : "person",
		cb : function(d){
			res.json(LI.sucJSON(0,d));
		},
		ecb : function(){
			res.json(LI.errJSON("-4000"));
		}
	})
};

exports.findPerson = findPerson;