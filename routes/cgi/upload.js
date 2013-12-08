var LI = require('../lagic_inter');
var pfif = require('../pfif');
var US = require('underscore');
var gm = require('gm');

var uploadImg = function(req, res){
	//bind event handler
    req.form.on('progress', function(bytesReceived, bytesExpected) {
    	//debugger;
    });
    req.form.on('end', function(){
		var img_cache_path = "../../public/source/imgcache/";
	    	gm(req.files)
	    	.write(img_cache_path+req.files.name);
	        // console.log(req.files);
	        res.jsonp(LI.succJSon(0,{
	        	"fileName" : req.files.name
	        }));
    });
};

exports.uploadImg = uploadImg;