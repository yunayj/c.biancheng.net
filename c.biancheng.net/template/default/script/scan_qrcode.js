$(document).ready(function(){
	//获取浏览器时间戳（秒）
	function getTimestamp(thetime=''){
		var timeTemp = thetime ? new Date(thetime) : new Date();
		return Math.floor( timeTemp.valueOf() / 1000 );  //前端时间戳，向下取整
	}

	//轮询函数
	function roundRobin(captcha, createtime, nowtimeserver, expire, jumpurl){
		var timerCallNum = 0;  //定时器调用次数
		var expireSecond = createtime + expire - nowtimeserver;  //过期秒数
		var timeDiff = getTimestamp() - nowtimeserver;  //前端时间比服务器时间快多少秒，用于前端和服务器的时间校准

		var expireSecondEle = $("#expire-second");  //数秒元素
		var expireSecondEleWrap = expireSecondEle.parent();  //数秒元素的父级元素
		var msgTipEle = $("#msg-tip");  //登录/绑定成功提示元素
		var successTipMsg = msgTipEle.text();  //成功时的提示信息

		expireSecondEle.text(expireSecond);  //在定时器触发以前，显式一次倒计时时间，避免前1秒内时间空白

		//定时器，1秒触发一次
		var timer = setInterval(function(){
			++timerCallNum;
			expireSecond = createtime + expire - ( getTimestamp()-timeDiff );  //重新计算过期时间，避免前端页面进入后台停止运行一段时间，唤起后倒计时出错

			//过期倒计时
			if(expireSecond > 0){  //验证码未过期
				expireSecondEle.text(expireSecond);  //显式倒计时时间
			}else{  //验证码过期
				expireSecondEleWrap.html('验证码已过期，请<a class="col-link" href="javascript:location.reload();">重新获取</a>');
			}

			//ajax轮询请求。偶数发送请求，也即2秒发送一次请求
			if(timerCallNum % 2 == 0){
				if(expireSecond >= -10){  //验证码过期以后，轮询延迟10秒，防止用户在即将过期时发送验证码
					$.ajax({
						url: location.href,
						type: 'POST',
						dataType: 'json',
						data: {'captcha': captcha},
						success:function(data){
							if(data['status']){  //用户已经发送验证码
								expireSecondEleWrap.remove();  //删除数秒元素
								msgTipEle.show();  //显式提示信息

								if(data['errmsg']){  //收到验证码，但是有错误信息
									msgTipEle.addClass('fail');
									msgTipEle.text(data['errmsg']);
								}else{  //登录成功
									msgTipEle.addClass('success');
									msgTipEle.text(successTipMsg);
									clearInterval(timer);  //清除定时器
									//url跳转
									setTimeout(function(){
										location.href = jumpurl;
									},3000);
								}
							}
						}
					});
				}else{  //验证码过期10秒后，清除定时器
					clearInterval(timer);
				}
			}

		}, 1000);
	}

	roundRobin(captchaInfo.captcha, captchaInfo.create_time, captchaInfo.now_time, captchaInfo.expire, captchaInfo.jump_url);
});