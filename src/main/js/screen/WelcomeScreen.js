WelcomeScreen = (function(WelcomeScreen){
	
	WelcomeScreen.prototype.display = function(containerId)
	{
	    $("#appName").text(AppSettings.applicationName)
		$("#appDescription").html(AppSettings.applicationDescription);

		$("#frameworkManagementBtn").click(function(){
            ScreenManager.changeScreen(new CassEditorScreen());
			if (!AppController.loginController.getLoggedIn())
				alert("As you are not logged in, you will be restricted to viewing frameworks only.");
        });

		if (!AppController.loginController.getLoggedIn())
			$("#competencyAlignmentBtn").addClass("disabled");

		$("#competencyAlignmentBtn").click(function(){
			if (!AppController.loginController.getLoggedIn())
				alert("You should log in before attempting to align competencies.");
			else
            	ScreenManager.changeScreen(new AlignmentEditorScreen());
        });

		$("#learnerProfilesBtn").click(function(){
			alert("Not yet implemented.");
		});
	};

	
	return WelcomeScreen;
})(WelcomeScreen);