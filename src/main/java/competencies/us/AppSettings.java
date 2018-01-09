package competencies.us;

import com.eduworks.ec.remote.EcRemote;
import org.stjs.javascript.Global;
import org.stjs.javascript.JSCollections;
import org.stjs.javascript.JSObjectAdapter;
import org.stjs.javascript.Map;
import org.stjs.javascript.functions.Callback1;


/**
 * Handles loading the CASS Manager settings from the settings.js file,
 * this includes the default server to show and the message to show when the user
 * refreshes the page and is logged out
 *
 * @module cass.manager
 * @class AppSettings
 * @static
 *
 * @author devlin.junker@eduworks.com
 */
public class AppSettings {

	public static String FIELD_APP_NAME = "appName";
	public static String FIELD_APP_DESCRIPTION = "appDescription";

	public static String FIELD_SERVER_URL = "defaultServerUrl";
	public static String FIELD_SERVER_NAME = "defaultServerName";

	public static String FIELD_MSG_RETURN = "returnLoginMessage";

	public static String FIELD_SHOW_REPO_MENU = "showRepoMenu";
	public static String FIELD_SHOW_EXAMPLES_MENU = "showExamplesMenu";


	public static String applicationName = "CASS Manager";

	public static String applicationDescription = "Welcome to the CASS Manager. This application can connect to any " +
			"instance of CASS. What would you like to do?";

	public static String defaultServerUrl = "https://sandbox.cassproject.org/api/custom/";
	public static String defaultServerName = "CASS Sandbox";

	public static String returnLoginMessage = "You were Signed Out on Page Reload. Please Sign in to Continue";

	public static boolean showRepoMenu = false;
	public static boolean showExamplesMenu = false;

	public static Map<String,String> relationTypes;

	static {
		relationTypes = JSCollections.$map(
				"isEnabledBy", "is Enabled by",
				"requires", "Requires",
				"desires", "Desires",
				"narrows", "Narrows",
				"isRelatedTo", "is Related to",
				"isEquivalentTo", "is Equivalent to"
		);
	}


	/**
	 * Loads the settings from the settings file at settings/settings.js
	 *
	 * @static
	 * @method loadSettings
	 */
	public static void loadSettings(){

		String urlBase = "http://"+Global.window.location.host + Global.window.location.pathname;

		EcRemote.getExpectingObject(urlBase, "settings/settings.js", new Callback1<Object>(){
			@Override
			public void $invoke(Object settingsObj) {


				String appName = (String)JSObjectAdapter.$get(settingsObj, FIELD_APP_NAME);
				if(appName != null && appName != "")
					applicationName = appName;

				String appDesc = (String)JSObjectAdapter.$get(settingsObj, FIELD_APP_DESCRIPTION);
				if(appDesc != null && appDesc != "")
					applicationDescription = appDesc;


				String serverUrl = (String)JSObjectAdapter.$get(settingsObj, FIELD_SERVER_URL);
				if(serverUrl != null)
					defaultServerUrl = serverUrl;

				String serverName = (String)JSObjectAdapter.$get(settingsObj, FIELD_SERVER_NAME);
				if(serverName != null)
					defaultServerUrl = serverName;


				String msg = (String)JSObjectAdapter.$get(settingsObj, FIELD_MSG_RETURN);
				if(msg != null)
					returnLoginMessage = msg;

				if(JSObjectAdapter.$get(settingsObj, FIELD_SHOW_REPO_MENU) == "true")
					showRepoMenu = true;

				if(JSObjectAdapter.$get(settingsObj, FIELD_SHOW_EXAMPLES_MENU) == "true")
					showExamplesMenu = true;

			}
		}, new Callback1<String>(){

			@Override
			public void $invoke(String p1) {
				Global.console.error("Unable to load settings file");
			}

		});
	}
}
