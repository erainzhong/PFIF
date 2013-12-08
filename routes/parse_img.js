var fs = require('fs'),
	gm = require('./gm');

var img_cache_path = "../public/source/imgcache/";
var img_save_path = "../public/source/img/";

var saveRecordImg = function(filename,personData){
	var _id = personData.person_record_id,
		_cache_img_url = img_cache_path + filename;
		_save_img_url = img_save_path+_id+"/"+_id;

	var buf = fs.readFileSync(_cache_img_url);
	if(!buf){
		return "";
	}
	//80像素
	gm(buf)
	.resize(80,80)
	.write(_save_img_url+"_80.jpg",function(err){
		console.log();
	})

	//原图
	gm(buf).write(_save_img_url+".jpg",function(err){
		//保存成功了那么就删除缓存图
		fs.rmFile(img_cache_path+filename);
	});
	
	return _save_img_url+"_80.jpg";
};

exports.saveRecordImg = saveRecordImg;