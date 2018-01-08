package competencies.us.screen;

import competencies.us.AppSettings;
import competencies.us.modal.LoginModal;
import org.stjs.javascript.Array;
import org.stjs.javascript.Global;
import org.stjs.javascript.JSCollections;
import org.stjs.javascript.functions.Callback0;
import org.stjs.javascript.functions.Callback1;

import competencies.us.AppController;

import com.eduworks.ec.framework.view.manager.ModalManager;
import com.eduworks.ec.framework.view.manager.ScreenManager;

public class UserIdentityScreen extends CassManagerScreen {
	static String displayName = "identity";
	
	static{
		ScreenManager.addStartupScreenCallback(new Callback0(){
			@Override
			public void $invoke() {
				if(Global.window.document.location.hash.startsWith("#"+displayName)){
					Array<String> hashSplit = JSCollections.$castArray(Global.window.document.location.hash.split("?"));

					if(AppController.loginController.getPreviouslyLoggedIn() || (hashSplit.$length() == 2 && hashSplit.$get(1).startsWith("action"))){
						ScreenManager.startupScreen = new UserIdentityScreen();
				
						ModalManager.showModal(new LoginModal(new Callback1<Object>(){
							@Override
							public void $invoke(Object o) {
								ModalManager.hideModal();
								
							}
						}, new Callback0(){
							@Override
							public void $invoke() {
								if(!AppController.loginController.getLoggedIn()){
									ScreenManager.replaceScreen(new WelcomeScreen(), null, null);
								}
								else{
									ScreenManager.reloadCurrentScreen(null);
								}
									
							}
						}, AppSettings.returnLoginMessage), null);
					}
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
