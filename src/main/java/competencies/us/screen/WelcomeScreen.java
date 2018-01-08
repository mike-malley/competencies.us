package competencies.us.screen;

import com.eduworks.ec.framework.view.EcScreen;

public class WelcomeScreen extends EcScreen {

	static String displayName = "welcome";
	
	
	public String getDisplayName(){
		return displayName;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/screen/welcome.html";
	}

}
