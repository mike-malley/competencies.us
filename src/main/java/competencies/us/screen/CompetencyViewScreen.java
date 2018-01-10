package competencies.us.screen;

import competencies.us.other.MessageContainer;
import org.cass.competency.EcAlignment;
import org.cass.competency.EcCompetency;
import org.cass.competency.EcLevel;
import org.cass.competency.EcRollupRule;
import org.cassproject.schema.general.EcRemoteLinkedData;
import org.stjs.javascript.Array;
import org.stjs.javascript.Global;
import org.stjs.javascript.JSObjectAdapter;
import org.stjs.javascript.Map;
import org.stjs.javascript.functions.Callback0;
import org.stjs.javascript.functions.Callback1;
import org.stjs.javascript.jquery.GlobalJQuery;

import com.eduworks.ec.framework.browser.url.URLParams;
import com.eduworks.ec.framework.view.manager.ScreenManager;
import com.eduworks.ec.framework.view.manager.ViewManager;

import competencies.us.AppController;
import competencies.us.other.AppMenu;

public class CompetencyViewScreen extends CassManagerScreen
{

	static String displayName = "competencyView";

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

					final String id = (String) urlParameters.$get("id");
					if (id != null)
					{
						EcCompetency.get(id, new Callback1<EcCompetency>()
						{
							@Override
							public void $invoke(EcCompetency data)
							{
								ScreenManager.replaceScreen(new CompetencyViewScreen(data), afterReload, urlParameters);

							}
						}, new Callback1<String>()
						{
							@Override
							public void $invoke(String p1)
							{
								ScreenManager.replaceScreen(new CompetencySearchScreen(null, null, null), afterReload, urlParameters);

							}
						});

						ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
						return;
					}
					ScreenManager.startupScreen = new CompetencySearchScreen(null, null, null);

				}
			}
		});
	}

	Object data;

	public CompetencyViewScreen(Object data)
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
		return "partial/screen/competencyView.html";
	}

	public EcCompetency getData()
	{
		return (EcCompetency) data;
	}

	private MessageContainer mc;

	@Override
	public void display(String containerId)
	{
		if (getData().id != null)
		{
			Object params = new Object();
			JSObjectAdapter.$put(params, "id", getData().id);
			ScreenManager.setScreenParameters(params);
		}
		ViewManager.showView(mc = new MessageContainer("competencyView", null), "#competencyViewMessageContainer", null);
		autoConfigure(GlobalJQuery.$(containerId));

		final CompetencyViewScreen me = this;
		EcCompetency.get(getData().id, new Callback1<EcCompetency>()
		{
			@Override
			public void $invoke(EcCompetency competency)
			{
				AppController.storageController.addRecent(EcCompetency.myType, me.getData().id);
				( (AppMenu) ViewManager.getView(AppController.topBarContainerId)).buildRecentCompetencyList(AppController.storageController.getRecent(EcCompetency.myType));
				
				me.data = competency;
				me.bindControls();
				me.predisplayCompetency();
			}
		}, new Callback1<String>()
		{
			@Override
			public void $invoke(String msg)
			{
				EcCompetency.get(EcRemoteLinkedData.trimVersionFromUrl(me.getData().id), new Callback1<EcCompetency>()
				{
					@Override
					public void $invoke(EcCompetency framework)
					{
						me.data = framework;
						me.bindControls();
						me.predisplayCompetency();
					}
				}, new Callback1<String>()
				{
					@Override
					public void $invoke(String msg)
					{
						me.errorRetrieving(msg);
					}
				});
			}
		});
	}

	public void predisplayCompetency()
	{
		final CompetencyViewScreen me = this;
		me.autoRemove(GlobalJQuery.$("body"), "competency");
		me.autoRemove(GlobalJQuery.$("body"), "relation");
		me.autoRemove(GlobalJQuery.$("body"), "rollupRule");
		me.autoRemove(GlobalJQuery.$("body"), "level");
		me.autoAppend(GlobalJQuery.$("body"), "competency");
		me.autoFill(GlobalJQuery.$("body"), me.getData());
		getData().levels(AppController.serverController.getRepoInterface(), new Callback1<EcLevel>()
		{
			@Override
			public void $invoke(EcLevel p1)
			{
				me.autoFill(me.autoAppend(GlobalJQuery.$("[ec-container='level']"), "level"), p1);
			}
		}, (Callback1<String>) JSObjectAdapter.$get(me, "errorFindingLevels"), new Callback1<Array<EcLevel>>()
		{
			@Override
			public void $invoke(Array<EcLevel> p1)
			{
				if (p1.$length() == 0)
					GlobalJQuery.$("[ec-container='level']").text("None.");
				me.getData().rollupRules(AppController.serverController.getRepoInterface(), new Callback1<EcRollupRule>()
				{
					@Override
					public void $invoke(EcRollupRule p1)
					{
						me.autoFill(me.autoAppend(GlobalJQuery.$("[ec-container='rollupRule']"), "rollupRule"), p1);
					}
				}, (Callback1<String>) JSObjectAdapter.$get(me, "errorFindingRollupRules"), new Callback1<Array<EcRollupRule>>()
				{
					@Override
					public void $invoke(Array<EcRollupRule> p1)
					{
						if (p1.$length() == 0)
							GlobalJQuery.$("[ec-container='rollupRule']").text("None.");
						me.getData().relations(AppController.serverController.getRepoInterface(), new Callback1<EcAlignment>()
						{
							@Override
							public void $invoke(EcAlignment p1)
							{
								me.autoFill(me.autoAppend(GlobalJQuery.$("[ec-container='relation']"), "relation"), p1);
								me.bindControls();
							}
						}, (Callback1<String>) JSObjectAdapter.$get(me, "errorFindingRelations"), new Callback1<Array<EcAlignment>>()
						{
							@Override
							public void $invoke(Array<EcAlignment> p1)
							{
								if (p1.$length() == 0)
									GlobalJQuery.$("[ec-container='relation']").text("None.");
							}
						});
					}
				});
			}
		});
	}

	protected void errorRetrieving(String err)
	{
		if (err == null)
			err = "Unable to Connect to Server to Retrieve Framework";

		mc.displayAlert(err, "getFramework");
	}

	protected void bindControls()
	{
	}

}
