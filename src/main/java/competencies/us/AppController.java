package competencies.us;

import com.eduworks.ec.framework.browser.url.URLParams;
import com.eduworks.ec.framework.view.manager.ModalManager;
import com.eduworks.ec.framework.view.manager.ScreenManager;
import com.eduworks.ec.framework.view.manager.ViewManager;
import com.eduworks.foundation.jquery.plugin.Foundation;
import competencies.us.controller.IdentityController;
import competencies.us.controller.LoginController;
import competencies.us.controller.ServerController;
import competencies.us.controller.StorageController;
import competencies.us.modal.AddServerModal;
import competencies.us.other.AppMenu;
import competencies.us.screen.WelcomeScreen;
import org.stjs.javascript.Global;
import org.stjs.javascript.JSGlobal;
import org.stjs.javascript.dom.Element;
import org.stjs.javascript.functions.Callback0;
import org.stjs.javascript.functions.Callback1;
import org.stjs.javascript.jquery.Event;
import org.stjs.javascript.jquery.EventHandler;
import org.stjs.javascript.jquery.GlobalJQuery;

import static org.stjs.javascript.Global.window;

/**
 * Main entry point of the application. Figures out the settings and
 * starts the EC UI Framework at the appropriate screen.
 * 
 * @module cass.manager
 * @class AppController
 * @static
 * 
 * @author devlin.junker@eduworks.com
 */
public class AppController {
	
	public static String topBarContainerId = "#menuContainer";
	
	/**
	 * Manages the server connection by storing and configuring 
	 * the CASS instance endpoint for the rest of the application
	 * and managing the interfaces to it.  
	 * 
	 * @property serverController
	 * @static
	 * @type ServerController
	 */
	public static ServerController serverController;
	
	/**
	 * Manages the current user's identities and contacts through the
	 * KBAC libraries. 
	 * 
	 * @property identityController
	 * @static
	 * @type IdentityController
	 */
	public static IdentityController identityController;
	
	/**
	 * Handles the login/logout and admin communications with the server.
	 * 
	 * @property loginController
	 * @static
	 * @type LoginController
	 */
	public static LoginController loginController;
	
	/**
	 * Handles the browser storage
	 * 
	 * @property sessionController
	 * @static
	 * @type SessionController
	 */
	public static StorageController storageController;

	/**
	 * Entry point of the application
	 * 
	 * @param {String[]} args
	 * 			Not used at all...
	 */
	public static void main(String[] args)
	{
		identityController = new IdentityController();
		storageController = new StorageController();
		loginController = new LoginController(storageController);
		serverController = new ServerController(storageController);
		serverController.onLoad.push(new Callback0() {
			@Override
			public void $invoke() {
				AppSettings.loadSettings();

				// Give Login Controller access to the User Identity Controller
				loginController.identity = identityController;

				Callback0 afterTryLogin = new Callback0() {
					@Override
					public void $invoke() {

						// Start the Web Application
						ScreenManager.setDefaultScreen(new WelcomeScreen());

						// Show App Menu on document ready
						GlobalJQuery.$(Global.window.document).ready(new EventHandler(){
							@Override
							public boolean onEvent(Event arg0, Element arg1) {
								ViewManager.showView(new AppMenu(), topBarContainerId, new Callback0(){
									@Override
									public void $invoke() {
										((Foundation<?>)GlobalJQuery.$(window.document)).foundation();

										AppMenu menu = (AppMenu) ViewManager.getView(topBarContainerId);
										menu.showRepoMenu(AppSettings.showRepoMenu);
										menu.showExamplesMenu(AppSettings.showExamplesMenu);
									}
								});
								String server = URLParams.get("server");

								if(server != null && server != JSGlobal.undefined){
									for(String name : serverController.serverList){
										if(serverController.serverList.$get(name).startsWith(server)){
											serverController.selectServer(name, null, null);
											return true;
										}
									}

									ModalManager.showModal(new AddServerModal(null, server), null);
								}
								return true;
							}
						});
					}
				};

				if (AppController.loginController.cacheReady())
					AppController.loginController.loginWithCache(afterTryLogin,(Callback1)afterTryLogin);
				else
					afterTryLogin.$invoke();
			}
		});
		serverController.init(AppSettings.defaultServerUrl, AppSettings.defaultServerName);
	}
}
