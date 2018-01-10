package competencies.us.screen;

import com.eduworks.ec.framework.view.manager.ScreenManager;
import competencies.us.AppController;
import org.stjs.javascript.Global;
import org.stjs.javascript.functions.Callback0;

public class UserAdminScreen extends CassManagerScreen {
	static String displayName = "admin";

	static {
		ScreenManager.addStartupScreenCallback(new Callback0() {
			@Override
			public void $invoke() {
				if (AppController.loginController.getLoggedIn())
					if (Global.window.document.location.hash.startsWith("#" + displayName)) {
						ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
					}
			}
		});
	}

	@Override
	public String getDisplayName() {
		return displayName;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/screen/userAdmin.html";
	}

}
