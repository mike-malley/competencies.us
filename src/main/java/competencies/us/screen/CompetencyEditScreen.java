package competencies.us.screen;

import org.cass.competency.EcCompetency;
import org.stjs.javascript.Global;
import org.stjs.javascript.JSObjectAdapter;
import org.stjs.javascript.Map;
import org.stjs.javascript.functions.Callback0;
import org.stjs.javascript.functions.Callback1;

import com.eduworks.ec.framework.view.manager.ScreenManager;
import com.eduworks.ec.framework.browser.url.URLParams;

public class CompetencyEditScreen extends CassManagerScreen
{

	static String displayName = "competencyEdit";

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
						EcCompetency.get(id, new Callback1<EcCompetency>()
						{
							@Override
							public void $invoke(EcCompetency data)
							{
								ScreenManager.replaceScreen(new CompetencyEditScreen(data, (String)urlParameters.$get("frameworkId")),
										afterReload, urlParameters);
							}
						}, new Callback1<String>()
						{
							@Override
							public void $invoke(String p1)
							{
								ScreenManager.replaceScreen(new CompetencySearchScreen(null, null, null),
										afterReload, urlParameters);
							}
						});

						ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
						return;
					}
					ScreenManager.startupScreen = new CompetencyEditScreen(null, null);

				}
			}
		});
	}

	String frameworkId;

	public CompetencyEditScreen(Object data, String frameworkIdToAddCompetencyTo)
	{
		this.data = data;
		this.frameworkId = frameworkIdToAddCompetencyTo;
	}

	@Override
	public String getDisplayName()
	{
		return displayName;
	}

	@Override
	public String getHtmlLocation()
	{
		return "partial/screen/competencyEdit.html";
	}

}
