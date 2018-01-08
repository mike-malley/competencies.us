package competencies.us.screen;

import org.stjs.javascript.Global;
import org.stjs.javascript.functions.Callback0;

import com.eduworks.ec.framework.view.manager.ScreenManager;

public class AssertionSearchScreen extends CassManagerScreen {

	static String displayName = "assertionAll";
	
	static{
		ScreenManager.addStartupScreenCallback(new Callback0(){
			@Override
			public void $invoke() {
				if(Global.window.document.location.hash.startsWith("#"+displayName)){				
					ScreenManager.startupScreen = new AssertionSearchScreen(null);
					
					showLoginModalIfReload();
				}	
			}
		});
	}
	
	Object lastViewed;
	
	public AssertionSearchScreen(Object lastViewed){
		this.lastViewed = lastViewed;
	}
	
	@Override
	public String getDisplayName(){
		return displayName;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/screen/assertionSearch.html";
	}

}
