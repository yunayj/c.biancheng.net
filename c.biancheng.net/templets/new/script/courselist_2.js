$(document).ready(function(){
	var vipLevel = parseInt( $.cookie("pvip") );
	if(vipLevel>=7 && vipLevel<=11){
		$.ajax({
			method: 'get',
			url: window.config.serverDomain + "/p/vip/api/ajax/get_vip_time.php",
			dataType: 'jsonp',
			data: {
				'siteid': window.config.siteid,
					 'v': window.cmsTempletsVer
			},
			timeout: 10000,
			success: function(retData){
				if(retData.success){
					var vipBeginTime = parseInt(retData.begintime);
					$("#tutorial li.delete-course").each(function(){
						var deleteSeconds = parseInt( Date.parse($(this).attr("deletettime")) / 1000 );
						if(vipBeginTime<=deleteSeconds){
							$(this).removeClass("delete-course");
						}
					});
				}else{
					console.log(retData);
				}
				
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(textStatus);
			}
		});
	}
});