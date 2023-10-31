$(document).ready(function(){
	var userInfo = $.cookie("userinfo");
	var arcBody = $("#arc-body");
	if(userInfo){  //已经登录
		arcBody.append(
			'<div class="down-link">' +
				'我们为您提供了以下三种「电子书专用」搜索神器，常见的电子书基本都能搜索到：'+
				'<ul>' +
				'<li><a href="https://www.xuebapan.com/" target="_blank">https://www.xuebapan.com/</a></li>' +
				'<li><a href="https://www.xiaobaipan.com/" target="_blank">https://www.xiaobaipan.com/</a></li>' +
				'<li><a href="https://www.iizhi.cn/" target="_blank">https://www.iizhi.cn/</a></li>' +
				'</ul>' +
			'</div>'
		);
	}else{  //未登录
		arcBody.append('<p class="click-down-book"><a href="http://vip.biancheng.net/wechatlogin.php" target="_blank">登录后即可免费下载</a></p>');
	}
});