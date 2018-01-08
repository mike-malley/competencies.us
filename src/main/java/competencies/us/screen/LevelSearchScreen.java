package competencies.us.screen;

import org.stjs.javascript.Array;
import org.stjs.javascript.Global;
import org.stjs.javascript.JSCollections;
import org.stjs.javascript.functions.Callback0;

import com.eduworks.ec.framework.view.manager.ScreenManager;

public class LevelSearchScreen extends CassManagerScreen {

	static String displayName = "levelSearch";
	
	static{
		ScreenManager.addStartupScreenCallback(new Callback0(){
			@Override
			public void $invoke() {
				if(Global.window.document.location.hash.startsWith("#"+displayName)){
					Array<String> hashSplit = JSCollections.$castArray(Global.window.document.location.hash.split("?"));
					
					if(hashSplit.$length() > 1){
						String query = null;
						String ownership = null;
						
						String param = hashSplit.$get(1);
						
						Array<String> paramSplit = JSCollections.$castArray(param.split("&"));
						
						for(int i = 0; i < paramSplit.$length(); i++){
							String paramPiece = paramSplit.$get(i); 
							
							if(paramPiece.startsWith("query"))
								query = paramSplit.$get(i).split("=")[1];
							else if(paramPiece.startsWith("ownership"))
								ownership = paramSplit.$get(i).split("=")[1]; 
						}
						
						if(query != null || ownership != null){
							
							ScreenManager.startupScreen = new LevelSearchScreen(null, query, ownership);
							showLoginModalIfReload();
							return;
						}
					}
					
					ScreenManager.startupScreen = new LevelSearchScreen(null, null, null);
					
					showLoginModalIfReload();
				}	
			}
		});
	}
	
	Object lastViewed;
	
	String query;
	String ownership;
	
	public LevelSearchScreen(Object lastViewed, String query, String ownership){
		this.lastViewed = lastViewed;
		this.query = query;
		this.ownership = ownership;
	}
	
	@Override
	public String getDisplayName(){
		return displayName;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/screen/levelSearch.html";
	}

}
