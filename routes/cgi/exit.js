var exit = function(req,res){
	var store = req.sessionStore;
	var sessionID = req.sessionID;
	var openId = req.cookies.openId;
    var accessToken = req.cookies.accessToken;
    console.log(openId);
    console.log(accessToken);
    store.get(sessionID,function(err,data){
    	if(err) return;
    	if(data && data.user && data.user.sessionID == sessionID){
    		store.destroy(sessionID);
    	}
    });
};

exports.exit = exit;