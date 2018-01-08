FrameworkWorkspaceScreen = (function(FrameworkWorkspaceScreen){
	
	var searchHandle = null;
	
	function searchForFrameworks(query, mine, start){
		$("#frameworkWorkspaceViewer").find("#frameworkListContainer #frameworkListNone").addClass("hide");
		$("#frameworkWorkspaceViewer").find("#frameworkListContainer #moreFrameworks").addClass("hide");		

		if (query == null || query == "")
			query = "*";
		if (searchHandle != null)
			clearTimeout(searchHandle);
		
		var ownership = "all";
		if(mine != undefined && mine != false)
			ownership = "me"
		else
			ownership = "all";
		
		var callback;
		if(start == 0 || start == undefined)
			callback = clearDisplayResults;
		else
			callback = displayResults;
		
		searchHandle = setTimeout(function() {
//			var urlParams = {};
//			if(window.location.hash.split("?").length > 1){
//				var hashSplit = window.location.hash.split(/[?&]/)
//				for(var i = 1; i < hashSplit.length; i++){
//					var paramSplit = hashSplit[i].split("=");
//					if(paramSplit.length == 2)
//						urlParams[paramSplit[0]] = paramSplit[1]; 
//				}
//			}
//			if(query != "*")
//				urlParams.query = query;
//			if(ownership != "all")
//				urlParams.ownership = ownership;
//			
//			if(Object.keys(urlParams).length > 0){
//				ScreenManager.setScreenParameters(urlParams);
//				ScreenManager.getCurrentScreen().setParams(urlParams);
//			}else{
//				ScreenManager.setScreenParameters(null);
//				ScreenManager.getCurrentScreen().clearParams();
//			}
				
			
			ViewManager.getView("#frameworkWorkspaceMessageContainer").clearAlert("searchFail");
			
			var params = {};
			params.ownership = ownership;
			params.size = 10;
			params.start = start;
			
			EcFramework.search(AppController.serverController.getRepoInterface(), query, callback, errorSearching, params);
		}, 100);
	}
	
	function errorSearching(error){
		ViewManager.getView("#frameworkWorkspaceMessageContainer").displayAlert(error, "searchFail");
	}
	
	function clearDisplayResults(results){
		$("#frameworkWorkspaceViewer").find("#frameworkListContainer ul li").not("[data-recent='true']").remove();
		
		displayResults(results);
	}
	
	function displayResults(results){
		if(results != undefined && results.length != undefined && results.length > 0){
			for(var idx in results){
				addFrameworkToList(results[idx]);
			}
			
			if(results.length == 10){
				$("#frameworkWorkspaceViewer").find("#frameworkListContainer #moreFrameworks").removeClass("hide");
			}
			
			$("#frameworkWorkspaceViewer").find("#frameworkListContainer #frameworkListLoading").addClass("hide");
			$("#frameworkWorkspaceViewer").find("#frameworkListContainer #frameworkListNone").addClass("hide");
		}else{
			$("#frameworkWorkspaceViewer").find("#frameworkListContainer #frameworkListLoading").addClass("hide");
			if(("#frameworkListContainer ul li").size() == 0){
				$("#frameworkWorkspaceViewer").find("#frameworkListContainer #frameworkListNone").removeClass("hide");
			}
		}
	}
	
	function addFrameworkToList(framework, recent){
		if($("#frameworkWorkspaceViewer").find("#frameworkListContainer ul").find("[data-framework-id='']").size() == 0){
			var element = $("<li class='frameworkListFramework' style='padding-bottom:0.5rem;'>"+
					"<h5 class='fake-a'><span></span></h5>"+
					"<div class='framework-description' style='font-size:0.8rem; padding-left:1rem;'></div>" +
					"<div style='padding-left:1rem;'><strong>Competencies:</strong> <span class='framework-competencies'><span style='font-size:0.8rem;' class='load-competencies'>Loading..</span></span></div></li>");
			
			element.attr("data-framework-id", framework.id);
			if(recent == true)
				element.attr("data-recent", "true");
			
			element.find("h5 span").text(framework.getName());
			element.find("h5 span").click(function(){
				ScreenManager.changeScreen(new FrameworkViewScreen(framework));
			});
			if(framework.description != "" && framework.description != undefined)
				element.find(".framework-description").text(framework.description)
			else
				element.find(".framework-description").html("<em>No Description</em>")
			
				
			if(framework.competency != undefined && framework.competency.length > 0){
				for(var i in framework.competency){
					if(i >= 10)
						break;
					EcCompetency.get(framework.competency[i], function(competency){
						var display;
						if(competency.name.length > 60){
							var idx = 60;
							
							for(idx = 55; idx < 75; idx++){
								if(competency.name.charAt(idx) == " "){
									break;
								}
							}
							
							display = competency.name.substring(0, idx) + "...";
						}else{
							display = competency.name;
						} 
						
						var comp = $("<span style='font-size:0.8rem;' class='fake-a'>("+display+")</span>");
						element.find(".framework-competencies").prepend(comp);
						comp.click(function(){
							ScreenManager.changeScreen(new CompetencyViewScreen(competency));
						});
						
						 
						var comps = element.find(".framework-competencies").children();
						
						if(comps.size() > 4 || comps.size()  > framework.competency.length){
							element.find(".load-competencies").remove();
						} 
						
						if(comps.size() >= 3){
							comp.after(", ")
						}
						
					});
				}
			}else{
				element.find(".framework-competencies").append("<span style='font-size:0.8rem;'>None</span>")
				element.find(".load-competencies").remove();
			}
			
			$("#frameworkWorkspaceViewer").find("#frameworkListContainer ul").append(element);
		}
	}
	
	function loadMyFrameworks(){
		var recents = AppController.storageController.getRecent(EcFramework.myType);
		
		for(var idx in recents){
			var framework = EcFramework.get(recents[idx], function(framework){
				addFrameworkToList(framework, true);
			}, function(err){
				
			});
		}
		
		searchForFrameworks("*", true)
	}
	
	FrameworkWorkspaceScreen.prototype.display = function(containerId)
	{
		ViewManager.showView(new MessageContainer("frameworkWorkspace"), "#frameworkWorkspaceMessageContainer")
		
		$(".frameworkWorkspaceTabBtn").click(function(e){
			if(!$(e.target).hasClass("active")){
				$(".frameworkWorkspaceTabBtn").removeClass("active");
				$(e.target).addClass("active");
				
				if($(e.target).attr("id") == "allFrameworks"){
					$("#frameworkWorkspaceViewer").find("#frameworkListContainer #frameworkListLoading").removeClass("hide");
					$("#frameworkWorkspaceViewer").find("#frameworkListContainer ul").html("");					
					var query = $("#frameworkWorkspaceSearch").val();
					searchForFrameworks(query);
				}else if($(e.target).attr("id") == "myFrameworks"){
					$("#frameworkWorkspaceViewer").find("#frameworkListContainer #frameworkListLoading").removeClass("hide");
					$("#frameworkWorkspaceViewer").find("#frameworkListContainer ul").html("");
					loadMyFrameworks();
				}
			}
		});
		
		var recents = AppController.storageController.getRecent(EcFramework.myType);
		if(AppController.loginController.getLoggedIn() || recents.length > 0){
			$(".frameworkWorkspaceTabBtn").removeClass("active");
			$("#myFrameworks").addClass("active");
			
			
			loadMyFrameworks();
			
		}else{
			$(".frameworkWorkspaceTabBtn").removeClass("active");
			$("#allFrameworks").addClass("active");
			searchForFrameworks("");
		}
		
		var timeoutHandle = undefined;
		
		$("#frameworkWorkspaceSearch").on("keyup", function(){
			if(timeoutHandle != undefined)
				clearTimeout(timeoutHandle)
			
			timeoutHandle = setTimeout(function(){
				var query = $("#frameworkWorkspaceSearch").val();
				if($("#myFrameworks").hasClass("active")){
					var recents = $("#frameworkWorkspaceViewer").find("#frameworkListContainer ul li[data-recent='true']");
					if(recents.size() > 0 && (query != "" || query != undefined)){
						recents.each(function(idx, recent){
							var recent = $(recents.get(idx));
							if(recent.find("h5").text().toLowerCase().indexOf(query.trim().toLowerCase()) == -1){
								recent.addClass("hide");
							}else{
								recent.removeClass("hide");
							}
						});
					}
					
					searchForFrameworks(query, true, 0);
				}else{
					searchForFrameworks(query, false,0);
				}
				
			}, 500);
		});
		
		
		$("#newFrameworkBuild").click(function(){
			ScreenManager.changeScreen(new FrameworkEditScreen());
		});
		
		$("#newFrameworkRegister").click(function(){
			ModalManager.showModal(new MessageModal("Not Implemented Yet"));
		});
		
		$("#newFrameworkImport").click(function(){
			ModalManager.showModal(new ImportCompetenciesModal());
		});
	};
	
	return FrameworkWorkspaceScreen;
})(FrameworkWorkspaceScreen);