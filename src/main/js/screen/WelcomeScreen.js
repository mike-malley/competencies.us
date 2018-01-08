WelcomeScreen = (function(WelcomeScreen){
	
	WelcomeScreen.prototype.display = function(containerId)
	{
	    $("#appName").text(AppSettings.applicationName)
		$("#appDescription").html(AppSettings.applicationDescription);

		$("#frameworkManagementBtn").click(function(){
            ScreenManager.changeScreen(new CassEditorScreen());
        });

		$("#competencyAlignmentBtn").click(function(){
            ScreenManager.changeScreen(new AlignmentEditorScreen());
        });

		$("#learnerProfilesBtn").click(function(){
            ScreenManager.changeScreen(new AssertionSearchScreen());
		});
	};

	
	return WelcomeScreen;
})(WelcomeScreen);