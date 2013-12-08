var LI = require('../lagic_inter');

var login = function(req,res){
	var store = req.sessionStore;
	var sessionID = req.sessionID;
	var openId = req.cookies.openId;
    var accessToken = req.cookies.accessToken;
    console.log(openId);
    console.log(accessToken);
    if(openId && accessToken){
	    var user = {
	    	sessionID : sessionID,
	        openId : openId,
	        accessToken : accessToken,
	        privacy : "vistor"
	    }
	    req.session.user = user;
	    store.set(sessionID);
	    LI.addNewUser(user);
	}
}

var isLogin = function(req,res,scb,ecb){
	var store = req.sessionStore;
	var sessionID = req.sessionID;
	var openId = req.cookies.openId;
	var _islogin = false;
	global.req = req;
	global.res = res;
	store.get(sessionID,function(err,data){
		if(data && data.user && data.user.sessionID == sessionID && data.user.openId == openId){
			_islogin = true;
		}
		if(_islogin){
			ecb();
		}else{
			scb();
		}
	});
}

exports.isLogin = isLogin;
exports.login = login;
