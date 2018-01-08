package competencies.us.screen;

import org.cass.competency.EcAlignment;
import org.stjs.javascript.Global;
import org.stjs.javascript.JSObjectAdapter;
import org.stjs.javascript.Map;
import org.stjs.javascript.functions.Callback0;
import org.stjs.javascript.functions.Callback1;

import com.eduworks.ec.framework.view.manager.ScreenManager;
import com.eduworks.ec.framework.browser.url.URLParams;

public class RelationshipEditScreen extends CassManagerScreen {

	static String displayName = "relationEdit";
	
	static{
		ScreenManager.addStartupScreenCallback(new Callback0(){
			@Override
			public void $invoke() {
				if(Global.window.document.location.hash.startsWith("#"+displayName)){
					final Map<String, Object> urlParameters = JSObjectAdapter.$properties(URLParams.getParams());

					String id = (String) urlParameters.$get("id");
					if (id != null)
					{
								EcAlignment.get(id, new Callback1<EcAlignment>(){
									@Override
									public void $invoke(EcAlignment data) {
										ScreenManager.replaceScreen(new RelationshipEditScreen(data), reloadShowLoginCallback, urlParameters);
									}
								}, new Callback1<String>(){
									@Override
									public void $invoke(String p1) {
										ScreenManager.replaceScreen(new RelationshipSearchScreen(null, null, null), reloadShowLoginCallback, urlParameters);
									}
								});
								
								ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
								return;
					}
					String source = (String) urlParameters.$get("source");
					if(source != null)
					{
						Object data = new Object();
						JSObjectAdapter.$put(data, "source", source);
						ScreenManager.startupScreen = new RelationshipEditScreen(data);
						showLoginModalIfReload();
						return;
					}
					
					String target = (String) urlParameters.$get("target");
					if(target != null)
					{
						Object data = new Object();
						JSObjectAdapter.$put(data, "target", target);
						ScreenManager.startupScreen = new RelationshipEditScreen(data);
						showLoginModalIfReload();
						return;
					}
					
					
					ScreenManager.startupScreen = new RelationshipEditScreen(null);
					
					showLoginModalIfReload();
				}	
			}
		});
	}
	
	Object data;
	
	public RelationshipEditScreen(Object data)
	{
		this.data = data;
	}
	
	@Override
	public String getDisplayName(){
		return displayName;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/screen/relationshipEdit.html";
	}

}
