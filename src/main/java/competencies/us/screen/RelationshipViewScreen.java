package competencies.us.screen;

import org.cass.competency.EcAlignment;
import org.stjs.javascript.Global;
import org.stjs.javascript.JSObjectAdapter;
import org.stjs.javascript.Map;
import org.stjs.javascript.functions.Callback0;
import org.stjs.javascript.functions.Callback1;

import com.eduworks.ec.framework.view.manager.ScreenManager;
import com.eduworks.ec.framework.browser.url.URLParams;

public class RelationshipViewScreen extends CassManagerScreen
{

	static String displayName = "relationView";

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

					String id = (String) urlParameters.$get("id");
					if (id != null)
					{
						EcAlignment.get(id, new Callback1<EcAlignment>()
						{
							@Override
							public void $invoke(EcAlignment data)
							{
								ScreenManager.replaceScreen(new RelationshipViewScreen(data), reloadShowLoginCallback, urlParameters);

								showLoginModalIfReload();
							}

						}, new Callback1<String>()
						{
							@Override
							public void $invoke(String p1)
							{
								ScreenManager.replaceScreen(new RelationshipSearchScreen(null, null, null),
										reloadShowLoginCallback, urlParameters);

								showLoginModalIfReload();
							}
						});

						ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
						return;
					}
					ScreenManager.startupScreen = new RelationshipSearchScreen(null, null, null);

					showLoginModalIfReload();
				}
			}
		});
	}

	Object data;

	public RelationshipViewScreen(Object data)
	{
		this.data = data;
	}

	@Override
	public String getDisplayName()
	{
		return displayName;
	}

	@Override
	public String getHtmlLocation()
	{
		return "partial/screen/relationshipView.html";
	}
}
