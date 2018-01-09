package competencies.us.screen;

import com.eduworks.ec.framework.browser.url.URLParams;
import com.eduworks.ec.framework.view.manager.ScreenManager;
import competencies.us.AppController;
import competencies.us.other.MessageContainer;
import org.cass.competency.EcFramework;
import org.stjs.javascript.Global;
import org.stjs.javascript.JSObjectAdapter;
import org.stjs.javascript.Map;
import org.stjs.javascript.annotation.STJSBridge;
import org.stjs.javascript.dom.Element;
import org.stjs.javascript.functions.Callback0;
import org.stjs.javascript.jquery.Event;
import org.stjs.javascript.jquery.EventHandler;

import static org.stjs.javascript.jquery.GlobalJQuery.$;

/**
 * Created by fray on 1/8/18.
 */
public class CassEditorScreen extends CassManagerScreen {

	static String displayName = "cassEditor";
	private MessageContainer mc;

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

					ScreenManager.startupScreen = new CassEditorScreen(null);

					showLoginModalIfReload();
				}
			}
		});
	}

	public EcFramework getData()
	{
		return (EcFramework) data;
	}

	public CassEditorScreen(Object data)
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
		return "partial/screen/cassEditorScreen.html";
	}

	@Override
	public void display(final String containerId)
	{
		String server = "?server="+AppController.serverController.selectedServerUrl;
		String origin = "&origin="+Global.window.location.origin;
		String viewer = AppController.loginController.getLoggedIn() ? "&user=wait" : "&view=true";
		$(containerId).find("#cassEditor").attr("src","https://cassproject.github.io/cass-editor/index.html"+server+origin+viewer);
		if (AppController.loginController.getLoggedIn())
		{
			$(containerId).find("#cassEditor").ready(new EventHandler() {
				@Override
				public boolean onEvent(Event ev, Element THIS) {
					Global.setTimeout(new Callback0() {
						@Override
						public void $invoke() {

							Object ident = new Object();
							JSObjectAdapter.$put(ident,"action","identity");
							JSObjectAdapter.$put(ident,"identity",AppController.identityController.selectedIdentity.ppk.toPem());
							ident = Global.JSON.stringify(ident);
							((messagePoster)(Object)$(containerId).find("#cassEditor").$get(0).contentWindow).postMessage(ident, "https://cassproject.github.io");
						}
					},1000);
					return false;
				}
			});
		}
	}

	@STJSBridge()
	public class messagePoster {
		public void postMessage(Object o, String s){};
	}

}
