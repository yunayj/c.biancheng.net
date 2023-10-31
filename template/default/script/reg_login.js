$(document).ready(function(){
	var patterns2tips = {
		"username": {
			"pattern": /^[0-9A-Za-z_\-\u4e00-\u9fa5]{2,20}$/,
			"msg": "用户名长度应为2~20个字符，且只能包含汉字、字母、数字、下划线(_)和连字符(-)。"
		},
		"password": {
			"pattern": /^.{6,30}$/,
			"msg": "密码长度应为6~30个字符。"
		},
		"email": {
			"pattern": /^([a-z0-9\-]+\.)*[a-z0-9_]+@([a-z0-9\-]+\.)+[a-z]+$/i,
			"msg": "邮箱格式错误。"
		},
		"cellphone": {
			"pattern": /^\d{0,15}$/i,
			"msg": "电话号码格式错误。"
		},
		"captcha": {
			"pattern": /^[0-9a-zA-Z]{4}$/,
			"msg": "验证码长度为4。"
		}
	};

	var checkInputValid = function(ele, showMsg){
		var thisEle = $(ele);
		var thisID = thisEle.attr("id");
		if(thisID=="username" || thisID=="password" || thisID=="email" || thisID=="cellphone" || thisID=="captcha"){
			if( patterns2tips[thisID]["pattern"].test(thisEle.val()) ){
				if(showMsg){ $("#error-tip-for-"+thisID).css("display", "none"); }
				return true;
			}else{
				if(showMsg){ $("#error-tip-for-"+thisID).css("display", "table-row").find(".msg").text(patterns2tips[thisID]["msg"]); }
				return false;
			}
		}else if(thisID=="passworda"){  //重复密码
			if( thisEle.val() == $("#password").val() ){
				if(showMsg){ $("#error-tip-for-"+thisID).css("display", "none"); }
				return true;
			}else{
				if(showMsg){ $("#error-tip-for-"+thisID).css("display", "table-row").find(".msg").text("两次密码输入不一致。"); }
				return false;
			}
		}else if(thisID=="passwordo"){  //现有密码/旧密码
			if( patterns2tips['password']["pattern"].test(thisEle.val()) ){
				if(showMsg){ $("#error-tip-for-"+thisID).css("display", "none"); }
				return true;
			}else{
				if(showMsg){ $("#error-tip-for-"+thisID).css("display", "table-row").find(".msg").text(patterns2tips['password']["msg"]); }
				return false;
			}
		}

		return true;
	}

	$("#reg-login-form").delegate("input", "focusout", function(){
		checkInputValid(this, true);
	});

	$("#reg-login-form").submit( function () {
		var allowSubmit = true;
		$(this).find("input").each(function(){
			if( !checkInputValid(this, false) ){
				allowSubmit = false;
				return false;
			}
		});
		if(!allowSubmit){
			return false;
		}
	} );
});