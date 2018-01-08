package competencies.us.screen;

import org.stjs.javascript.Array;
import org.stjs.javascript.Global;
import org.stjs.javascript.JSCollections;
import org.stjs.javascript.JSObjectAdapter;
import org.stjs.javascript.Map;
import org.stjs.javascript.functions.Callback0;

import com.eduworks.ec.framework.view.manager.ScreenManager;
import com.eduworks.ec.framework.browser.url.URLParams;

public class RepoSearchScreen extends CassManagerScreen
{
	static String displayName = "repoSearch";

	static
	{
		ScreenManager.addStartupScreenCallback(new Callback0()
		{
			@Override
			public void $invoke()
			{
				if (Global.window.document.location.hash.startsWith("#" + displayName))
				{
					final Map<String, Object> urlParameters = JSObjectAdapter.$properties(URLParams.getParams());

					String query = (String) urlParameters.$get("query");
					String ownership = (String) urlParameters.$get("ownership");
					Object ts = urlParameters.$get("types");
					Array<String> types = null;
					
					if (ts != null)
						types = JSCollections.$castArray(ts.toString().split(","));

					if (query != null || ownership != null || types != null)
					{
						ScreenManager.startupScreen = new RepoSearchScreen(null, query, ownership, types);
						showLoginModalIfReload();
						return;
					}
					
					ScreenManager.startupScreen = new RepoSearchScreen(null, null, null, null);

					showLoginModalIfReload();
				}
			}
		});
	}

	Object lastViewed;

	String query;
	String ownership;
	Array<String> types;

	public RepoSearchScreen(Object lastViewed, String query, String ownership, Array<String> types)
	{
		this.lastViewed = lastViewed;

		this.query = query;
		this.ownership = ownership;
		this.types = types;
	}

	@Override
	public String getDisplayName()
	{
		return displayName;
	}

	@Override
	public String getHtmlLocation()
	{
		return "partial/screen/repoSearch.html";
	}
}
