package competencies.us.screen;

import org.stjs.javascript.Global;
import org.stjs.javascript.functions.Callback0;

import com.eduworks.ec.framework.view.manager.ScreenManager;

public class RepoCreateScreen extends CassManagerScreen {
	
	static String displayName = "repoCreate";
	
	static{
		ScreenManager.addStartupScreenCallback(new Callback0(){
			@Override
			public void $invoke() {
				if(Global.window.document.location.hash.startsWith("#"+displayName)){
					ScreenManager.startupScreen = new RepoCreateScreen(null);
					
					showLoginModalIfReload();
				}	
			}
		});
	}
	
	Object data;
	
	public RepoCreateScreen(Object data)
	{
		this.data = data;
	}
	
	@Override
	public String getDisplayName(){
		return displayName;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/screen/repoCreate.html";
	}
}
