package competencies.us.screen;


import org.cass.profile.EcAssertion;
import org.stjs.javascript.Global;
import org.stjs.javascript.JSObjectAdapter;
import org.stjs.javascript.Map;
import org.stjs.javascript.functions.Callback0;
import org.stjs.javascript.functions.Callback1;

import com.eduworks.ec.framework.view.manager.ScreenManager;
import com.eduworks.ec.framework.browser.url.URLParams;

public class AssertionEditScreen extends CassManagerScreen
{

	static String displayName = "assertionEdit";

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
						EcAssertion.get(id, new Callback1<EcAssertion>()
						{
							@Override
							public void $invoke(EcAssertion data)
							{
								ScreenManager.replaceScreen(new AssertionEditScreen(data), reloadShowLoginCallback, urlParameters);
							}
						}, new Callback1<String>()
						{
							@Override
							public void $invoke(String p1)
							{
								ScreenManager.replaceScreen(new AssertionSearchScreen(null), reloadShowLoginCallback, urlParameters);
							}
						});

						ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
						return;
					}
					ScreenManager.startupScreen = new AssertionEditScreen(null);

					showLoginModalIfReload();
				}
			}
		});
	}

	Object data;

	public AssertionEditScreen(Object data)
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
		return "partial/screen/assertionEdit.html";
	}

}
