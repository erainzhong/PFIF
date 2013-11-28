var PF = {};
window.PF = PF;
PF.CGI = "http://chinapfif.com/cgi/"

PF.isLogin = function(){
	return QC.Login.check();
}

PF.showLoginBtn = function(){
	//调用QC.Login方法，指定btnId参数将按钮绑定在容器节点中
	QC.Login({
	   //btnId：插入按钮的节点id，必选
	   btnId:"qqLoginBtn",    
	   //用户需要确认的scope授权项，可选，默认all
	   scope:"all",
	   //按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
	   size: "A_XL"
	}, function(reqData, opts){//登录成功
	   //根据返回数据，更换按钮显示状态方法
	   var dom = document.getElementById(opts['btnId']),
	   _logoutTemplate=[
	        //头像
	        '<span><img src="{figureurl}" class="{size_key}"/></span>',
	        //昵称
	        '<span>{nickname}</span>',
	        //退出
	        '<span><a href="javascript:QC.Login.signOut();">退出</a></span>'    
	   ].join("");
	   dom && (dom.innerHTML = QC.String.format(_logoutTemplate, {
	       nickname : QC.String.escHTML(reqData.nickname), //做xss过滤
	       figureurl : reqData.figureurl
	   }));
	   PF.login();
	}, function(opts){//注销成功
	     PF.exit();
	}
	);
}

PF.exit = function(){
	$.ajax(PF.CGI + "exit");
	if(PF.isLogin()){
		QC.Login.signOut();
		alert("QQ登录 注销成功")
	}else{
		//alert("你一直未登录");
	}
	$.removeCookie("openId");
	$.removeCookie("accessToken");
	// $.ajax(PF.CGI + "exit");
}

PF.login = function(){
	QC.Login.getMe(function(openId,accessToken){
		$.cookie("openId",openId,{"expires":7});
		$.cookie("accessToken",accessToken,{"expires":7});
		$.ajax(PF.CGI + "login");
	})
}