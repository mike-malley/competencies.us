package competencies.us.screen;

import org.stjs.javascript.Global;
import org.stjs.javascript.functions.Callback0;

import com.eduworks.ec.framework.view.manager.ScreenManager;

public class FileManagerScreen extends CassManagerScreen {
	
	static String displayName = "fileManager";
	
	static{
		ScreenManager.addStartupScreenCallback(new Callback0(){
			@Override
			public void $invoke() {
				if(Global.window.document.location.hash.startsWith("#"+displayName)){
					ScreenManager.startupScreen = new FileManagerScreen();

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
		return "partial/screen/fileManager.html";
	}
}
