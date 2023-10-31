$(document).ready(function(){
	(function(){
		if(window.navName){
			$("#nav-sidebar>dd[nav='" + window.navName + "']").addClass("this");
		}
	})();

	$(".tab").each(function(){
		var tab = $(this),
			tabTitle = tab.children(".title-list"),
			tabCont = tab.children(".cont-list");

		tabTitle.delegate("li", "click", function(){
			var thisTitle = tabTitle.children(".this"),
				thisCont = tabCont.children(".this"),
				hoverTitle = $(this),
				tabNo = hoverTitle.attr("tabno");

			thisTitle.removeClass('this');
			thisCont.removeClass('this');
			hoverTitle.addClass("this");
			tabCont.children("[tabno='" + tabNo + "']").addClass("this");
		});
	});

	//边栏切换
	(function(){
		var toggleBtn = $("#sidebar-toggle");
		var sidebar = $("#sidebar");
		toggleBtn.click(function(){
			toggleBtn.toggleClass("toggle-btn-active");
			sidebar.toggleClass("toggle-target-active");
		});
	})();
});