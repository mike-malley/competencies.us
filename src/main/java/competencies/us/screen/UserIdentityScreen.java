package competencies.us.screen;

import com.eduworks.ec.framework.view.manager.ScreenManager;
import competencies.us.AppController;
import org.stjs.javascript.Global;
import org.stjs.javascript.functions.Callback0;

public class UserIdentityScreen extends CassManagerScreen {
	static String displayName = "identity";
	
	static{
		ScreenManager.addStartupScreenCallback(new Callback0(){
			@Override
			public void $invoke() {
				if (AppController.loginController.getLoggedIn())
				if(Global.window.document.location.hash.startsWith("#"+displayName)){
					ScreenManager.startupScreen = new UserIdentityScreen();
				}	
			}
		});
	}
	
	@Override
	public String getDisplayName(){
		return displayName;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/screen/userIdentity.html";
	}

}
