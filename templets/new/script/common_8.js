// jQuery cookie 插件
(function($,document,undefined){var pluses=/\+/g;function raw(s){return s}function decoded(s){return unRfc2068(decodeURIComponent(s.replace(pluses," ")))}function unRfc2068(value){if(value.indexOf('"')===0){value=value.slice(1,-1).replace('\\"','"').replace("\\\\","\\")}return value}var config=$.cookie=function(key,value,options){if(value!==undefined){options=$.extend({},config.defaults,options);if(value===null){options.expires=-1}if(typeof options.expires==="number"){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days)}value=config.json?JSON.stringify(value):String(value);return(document.cookie=[encodeURIComponent(key),"=",config.raw?value:encodeURIComponent(value),options.expires?"; expires="+options.expires.toUTCString():"",options.path?"; path="+options.path:"",options.domain?"; domain="+options.domain:"",options.secure?"; secure":""].join(""))}var decode=config.raw?raw:decoded;var cookies=document.cookie.split("; ");var result=key?null:{};for(var i=0,l=cookies.length;i<l;i++){var parts=cookies[i].split("=");var name=decode(parts.shift());var cookie=decode(parts.join("="));if(config.json){cookie=JSON.parse(cookie)}if(key&&key===name){result=cookie;break}if(!key){result[name]=cookie}}return result};config.defaults={};$.removeCookie=function(key,options){if($.cookie(key)!==null){$.cookie(key,null,options);return true}return false}})(jQuery,document);

window.config = {
	'siteid': 2,
	'serverDomain': 'https://vip.biancheng.net',
	'rootDomain'  : 'biancheng.net'
};

$(document).ready(function(){
	//提示框/确认框
	window.promptBox = function(params){
		//窗口高度和宽度
		var winWidth  = $(window).width();
		var winHeight = $(window).height();

		//设置提示消息
		var content = "";
		if(params.style=="success"){
			content = '<div class="msg"><p class="success"><span class="glyphicon glyphicon-ok"></span> ' + params.msg + '</p></div>';
		}else if(params.style=="fail"){
			content = '<div class="msg"><p class="fail"><span class="glyphicon glyphicon-remove"></span> ' + params.msg + '</p></div>';
		}else{
			content = '<div class="msg"><p class="plain">' + params.msg + '</p></div>';
		}

		//设置按钮
		if(params.type=="tip"){  //不带任何按钮的提示框
			//TODO:
		}else if(params.type=="button"){  //带确认按钮的提示框
			content +=  '<div class="button-box">' +
							'<p class="button glyphicon-ok" action="ok">确 定</p>'
						'</div>';
		}else if(params.type=="confirm"){  //带确定和取消按钮的提示框
			content +=  '<div class="button-box">' +
							'<p class="button ok" action="ok">确 定</p>' +
							'<p class="button cancle" action="cancle">取 消</p>' +
						'</div>';
		}else{
			//TODO:
		}

		var prompBox = $('<div class="promp-box">' + content + '</div>');
		prompBox.css( {"display": "none"} ).appendTo("body");

		//当前元素高度和宽度
		var thisWidth = prompBox.width();
		var thisHeight = prompBox.height();

		//淡入
		prompBox.css({
			"left": (winWidth-thisWidth)/2,
			"top" : (winHeight-thisHeight)/2
		}).fadeIn();

		//绑定事件
		prompBox.delegate("p.button", "click", function(){
			var action = $(this).attr("action");
			prompBox.fadeOut(function(){
				if(action=="ok" && params.okcallback){
					params.okcallback();
				}else if(action=="cancle" && params.canclecallback){
					params.canclecallback();
				}
			});
		});

		//设置一些附加效果
		if(params.type=="tip"){  //自动淡出
			prompBox.delay(2000).fadeOut();
		}
	};

	//上一节/下一节
	(function(){
		$("#article").children(".pre-next-page").html(
			'<span class="pre left"><a href="' + window.prePageURL + '"><span class="icon">&lt;</span> 上一节</a></span>' +
			'<span class="next right"><a href="' + window.nextPageURL + '">下一节 <span class="icon">&gt;</span></a></span>'
		);
	})();

	//处理广告
	(function(){
		//面包屑导航下方广告
		/*$("#ggxc-position-bottom").html(
			'<a href="https://www.apecome.com/series/XL100228xxxxxx" target="_blank">' +
				'<img width="100%" src="/uploads/ggxc/apecome_wap.jpg?v=' + window.cmsTempletsVer + '" />'+
			'</a>'
		);*/
		//文章上方通栏广告
		$("#ggxc-arctop-pc-1").html(
			'<p class="small-image">' +
				'<a href="/view/niz69i.html?from=arctop" target="_blank">' +
					'<img width="100%" src="/uploads/ggxc/embed_course.png?v=' + window.cmsTempletsVer + '" />'+
				'</a>'+
				'<a href="http://fudao.biancheng.net/?from=arctop" target="_blank">' +
					'<img width="100%" src="/uploads/ggxc/fudaoban_small.png?v=' + window.cmsTempletsVer + '" />'+
				'</a>'+
			'</p>' /*+
			'<p class="big-link">' +
				'<a href="/view/niz69i.html?from=arctop" target="_blank" style="color:#D33428;">一套完整的嵌入式开发学习路线（高薪就业版），知识全面，思路清晰，猛击这里免费领取！</a>' +
			'</p>'*/
			/*'<a href="http://fudao.biancheng.net" target="_blank">' +
				'<img width="100%" src="/uploads/ggxc/fudaoban_pc.png?v=' + window.cmsTempletsVer + '" />'+
			'</a>'+
			'<p class="plain-text" style="margin-top:10px;"><a href="/view/niz69i.html?from=arctop#embed-route" target="_blank" style="color:#D33428;">一套完整的嵌入式开发学习路线（高薪就业版），知识全面，思路清晰，猛击这里免费领取！</a></p>'*/
			//'<p style="margin-top:10px;"><a href="http://fudao.biancheng.net" target="_blank" style="color:#D33428;">C语言中文网推出辅导班啦，包括<span style="color: #008000;">「C语言辅导班、C++辅导班、算法/数据结构辅导班」</span>，全部都是一对一教学：一对一辅导 + 一对一答疑 + 布置作业 + 项目实践 + 永久学习。QQ在线，随时响应！</a></p>'
			//'<img width="100%" src="/uploads/ggxc/duanshipin_pc.png?v=' + window.cmsTempletsVer + '" />'
		);
	})();

	// 在目录中找到当前文章
	(function(){
		var url = document.location.pathname;
		var contents = $("#contents");
		var as = contents.length ? contents.find('a') : null;

		as && as.each(function(index, domEle){
			var thisURL = $(domEle).attr('href');
			if(thisURL === url){
				$(this).parent().addClass('active');
				return false;
			}
		});
	})();

	//手机版--教程目录切换按钮
	(function(){
		var toggleBtn = $("#sidebar-toggle");
		var sidebar = $("#sidebar");
		toggleBtn.click(function(){
			toggleBtn.toggleClass("toggle-btn-active");
			sidebar.toggleClass("toggle-target-active");
		});
	})();

	//返回顶部
	(function(){
		$("#return-top").click(function(){
			$(window).scrollTop(0);
		});
	})();

	//添加站长微信
	(function(){
		$("#close-addweixin-widget").click(function(){
			$("#addweixin-widget").hide();
		});
	})();

	// 加载代码高亮插件
	function codeHighlight(){
		var pres = document.getElementsByTagName("pre");
		if(!pres || !pres.length) return;

		jQuery.ajaxSetup({
			cache: true
		});
		$.getScript(window.cmsTemplets+"/script/jquery.snippet.js",function(){
			$(pres).each(function(){
				settings = {style: "bright"};

				var thisClass = $(this).attr("class");
				thisClass = thisClass && thisClass.replace( /^shell$/, "sh" );  // Shell

				var showNum = $(this).attr("shownum");
				if(showNum && showNum=="false"){
					settings.showNum = false;
					settings.menu = false;
				}

				var showMenu = $(this).attr("showmenu");
				if(showMenu){
					if(showMenu=="false"){
						settings.menu = false;
					}else{
						settings.menu = true;
					}
				}

				if(showMenu && showMenu=="false"){
					settings.menu = false;
				}

				thisClass && !/info-box/.test(thisClass) && $(this).snippet(thisClass, settings);
			});
		});
		jQuery.ajaxSetup({
			cache: false
		});
	}
	codeHighlight();

	//加载付费文章，或者提示购买积分
	(function(){
		var buyCourseTip = $("#buy-course-tip");  //提示购买课程/开通VIP会员
		if(buyCourseTip && buyCourseTip.length){
			var vipCookie = parseInt( $.cookie("pvip") );
			var pointsCookie = parseInt( $.cookie("ppoints") );

			if(vipCookie>=7){  //开通了会员
				$.ajax({
					method: 'get',
					url: window.config.serverDomain + "/p/vip/api/ajax/get_article.php",
					dataType: 'jsonp',
					data: {
						'siteid': window.config.siteid,
						'aid':    buyCourseTip.attr("aid"),
						'v':      window.cmsTempletsVer
					},
					timeout: 10000,
					beforeSend: function(XMLHttpRequest){
						buyCourseTip.html('<p>正在加载文章内容...</p>');
					},
					success: function(retData){
						var arcBody = decodeURIComponent(retData.body);
						if(retData.success){
							buyCourseTip.parent().html( decodeURIComponent(retData.body) );
							codeHighlight();
						}else{
							buyCourseTip.html('<p>' +decodeURIComponent(retData.msg) + '</p>');
						}
					},
					error: function(jqXHR, textStatus, errorThrown){
						buyCourseTip.html('<p>加载文章内容失败，请刷新重试！</p>');
					}
				});
			}else if(pointsCookie>0){  //拥有积分
				var points =  buyCourseTip.attr("points");
				$.ajax({
					method: 'get',
					url: window.config.serverDomain + "/p/points/api/ajax/get_article.php",
					dataType: 'jsonp',
					data: {
						'siteid': window.config.siteid,
						'aid':    buyCourseTip.attr("aid"),
						'points': points ? points : 1,
						'v':      window.cmsTempletsVer
					},
					timeout: 10000,
					beforeSend: function(XMLHttpRequest){
						buyCourseTip.html('<p>正在加载文章内容...</p>');
					},
					success: function(retData){
						var arcBody = decodeURIComponent(retData.body);
						if(retData.success){
							buyCourseTip.parent().html( decodeURIComponent(retData.body) );
							codeHighlight();
						}else{
							buyCourseTip.html('<p>' +decodeURIComponent(retData.msg) + '</p>');
						}
					},
					error: function(jqXHR, textStatus, errorThrown){
						buyCourseTip.html('<p>加载文章内容失败，请刷新重试！</p>');
					}
				});
			}else if( !$.cookie("userinfo") /*&& thisTimestamp>1615824001 && thisTimestamp<1615910401*/ ){
				//buyCourseTip.html('<p>您好，您正在阅读高级教程/项目实践，请先 <a href="' + window.config.serverDomain + '/login.php?from=viparc" target="_blank">登录</a> / <a href="' + window.config.serverDomain + '/register.php?from=viparc" target="_blank">注册</a>。</p>');
				buyCourseTip.html('<p>您好，您正在阅读高级教程/项目实践，请先 <a href="' + window.config.serverDomain + '/wechatlogin.php?from=viparc" target="_blank">登录 / 注册</a>。</p>');
			}else{
				buyCourseTip.html('<p>您好，您正在阅读付费教程，请<a href="' + window.config.serverDomain + '/p/vip/show.php?from=viparc" target="_blank">开通VIP会员（赠送1TB优质视频资料）</a>。</p>');
			}
		}
	})();

	//更新文章点击次数
	/*(function(){
		$.ajax({
			method: 'get',
			url: "http://sso.biancheng.net/api/click.php",
			dataType: 'jsonp',
			data: {"siteid": window.siteId, "arcid": window.arcId, "v": window.cmsTempletsVer},
			timeout: 10000,
			success: function(data){
				if( !data.success ){
					//TODO:
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				//TODO:
			}
		});
	})();*/

	//Tab 切换
	$(".tab").each(function(){
		var tab = $(this),
			tabTitle = tab.children(".tab-title-list"),
			tabCont = tab.children(".tab-cont-list");

		tabTitle.delegate(".list-item", "click", function(){
			var thisTitle = tabTitle.children(".this-item"),
				thisCont = tabCont.children(".this-item"),
				hoverTitle = $(this),
				tabNo = hoverTitle.attr("tabno");

			thisTitle.removeClass('this-item');
			thisCont.removeClass('this-item');
			hoverTitle.addClass("this-item");
			tabCont.children("[tabno='" + tabNo + "']").addClass("this-item");
		});
	});


	//关注公众号弹窗
	$("#arc-body .btn-more-info").click(function(){
		var typeStrArr = {
			'download': '下载链接',
			'down'    : '下载链接',
			'q2a'     : '答案',
			'qa'      : '答案',
			'info'    : '更多信息',
			'more'    : '更多内容',
			'pdf'     : '电子书'
		};
		var btnType = $(this).attr("type");
		var type2Str = typeStrArr[btnType];
		if(type2Str){
			window.promptBox({
				'style': 'msg',
				'type' : 'button',
				'msg'  : '<p style="margin-bottom:10px;">关注公众号<span class="col-green">站长严长生</span>，回复 <b>' + $(this).attr("keyword") + '</b> 获取' + type2Str + '</p>' +
					     '<p>' +
					         '<img width="180" src="/templets/new/images/material/qrcode_weixueyuan_original.png?v=1.6.67" alt="站长严长生二维码"><br>' +
					         '<small class="col-green">微信扫描二维码关注</small>'+
					      '</p>'
			});
		}
	})
});