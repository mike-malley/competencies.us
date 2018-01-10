package competencies.us.controller;

import org.cassproject.ebac.identity.EcIdentity;
import org.cassproject.ebac.identity.EcIdentityManager;
import org.cassproject.ebac.identity.remote.EcRemoteIdentityManager;
import org.cassproject.ebac.identity.remote.OAuth2FileBasedRemoteIdentityManager;
import org.cassproject.ebac.identity.remote.RemoteIdentityManagerInterface;
import org.cassproject.ebac.repository.EcRepository;
import org.stjs.javascript.Array;
import org.stjs.javascript.JSGlobal;
import org.stjs.javascript.JSObjectAdapter;
import org.stjs.javascript.functions.Callback0;
import org.stjs.javascript.functions.Callback1;

/**
 * Manages the current user's logged in state and interfaces with the server to
 * sign in/out and create users
 *
 * @author devlin.junker@eduworks.com
 * @module cass.manager
 * @class LoginController
 * @constructor
 */
public class LoginController {
	public RemoteIdentityManagerInterface loginServer = null;
	public IdentityController identity = null;

	public static String OAUTHGOOGLE = "oauth-google";
	public boolean refreshLoggedIn = false;
	public boolean loggedIn = false;

	StorageController storageSystem;

	/**
	 * On startup, check if the last time the user was on the page, whether or not they were signed in
	 */
	public LoginController(StorageController storage) {
		this.storageSystem = storage;

		refreshLoggedIn = (String) storageSystem.getStoredValue("cass.login") == "true" ? true : false;
	}

	/**
	 * Setter for the boolean flag of whether or not a user is loged in
	 *
	 * @param {boolean} val
	 *                  true if signed in, false if logged out
	 * @method setLoggedIn
	 * @static
	 */
	public void setLoggedIn(boolean val) {
		loggedIn = val;

		if (storageSystem != null)
			storageSystem.setStoredValue("cass.login", val);
	}

	/**
	 * Getter for boolean flag of whether or not user is logged in
	 *
	 * @return {boolean}
	 * true if signed in, false if logged out
	 * @method getLoggedin
	 * @static
	 */
	public boolean getLoggedIn() {
		return loggedIn;
	}

	/**
	 * If the last time the user was using the application, they were signed in this
	 * returns true (used to remind them to sign in again once they return)
	 *
	 * @return {boolean}
	 * true if previously signed in, false if not signed in last time, or user is here for
	 * the first time from this computer
	 * @method getPreviouslyLoggedIn
	 * @static
	 */
	public boolean getPreviouslyLoggedIn() {
		return refreshLoggedIn;
	}

	public void hello(final String network, final Callback0 success, final Callback1<String> failure) {
		final IdentityController identityManager = identity;

		final LoginController me = this;
		loginServer = new OAuth2FileBasedRemoteIdentityManager(new Callback0() {
			@Override
			public void $invoke() {
				me.loginServer.setDefaultIdentityManagementServer(network);
				me.loginServer.startLogin(null, null);
				me.loginServer.fetch(new Callback1<Object>() {
					@Override
					public void $invoke(Object p1) {
						EcIdentityManager.readContacts();

						EcRepository.cache = new Object();
						me.setLoggedIn(true);

						if (EcIdentityManager.ids.$length() > 0) {
							identityManager.select(EcIdentityManager.ids.$get(0).ppk.toPem());
						}
						success.$invoke();
						me.cacheLogin(network);

					}
				}, new Callback1<String>() {
					@Override
					public void $invoke(String p1) {
						failure.$invoke(p1);
					}
				});
			}
		});
	}

	/**
	 * Validates a username and password on the server and then parses the user's credentials and
	 * checks if they have an admin key. Also tells the identity manager to check for contacts in
	 * local storage after signed in.
	 *
	 * @param {String} username
	 *                 username of the user signing in
	 * @param {String} password
	 *                 password of the user signing in
	 * @param {String} success
	 *                 callback on successful login
	 * @param {String} failure
	 *                 callback on error during login
	 * @method login
	 */
	public void login(final String username, final String password, final String server, final Callback0 success, final Callback1<String> failure) {
		final IdentityController identityManager = identity;

		final LoginController me = this;

		loginServer = new EcRemoteIdentityManager();
		loginServer.setDefaultIdentityManagementServer(server);
		loginServer.configureFromServer(new Callback1<Object>() {
			@Override
			public void $invoke(Object o) {
				me.loginServer.startLogin(username, password);
				me.loginServer.fetch(new Callback1<Object>() {
					@Override
					public void $invoke(Object p1) {
						EcIdentityManager.readContacts();

						EcRepository.cache = new Object();
						me.setLoggedIn(true);

						if (EcIdentityManager.ids.$length() > 0) {
							identityManager.select(EcIdentityManager.ids.$get(0).ppk.toPem());
						}
						success.$invoke();
						me.cacheLogin(server);
					}
				}, new Callback1<String>() {
					@Override
					public void $invoke(String p1) {
						failure.$invoke(p1);
					}
				});
			}
		},failure);
	}

	public void loginWithCache(final Callback0 success, final Callback1<String> failure){
		if (!cacheReady()) return;
		String server = (String) storageSystem.getStoredValue("cass.login.selected");
		if (server == "google")
		{
			hello(server,success,failure);
		}
		else {final IdentityController identityManager = identity;

			final LoginController me = this;

			loginServer = new EcRemoteIdentityManager();
			loginServer.setDefaultIdentityManagementServer(server);
			loginServer.configureFromServer(new Callback1<Object>() {
				@Override
				public void $invoke(Object o) {
					JSObjectAdapter.$put(me.loginServer,"usernameWithSalt",me.storageSystem.getStoredValue("cass.login.username"));
					JSObjectAdapter.$put(me.loginServer,"passwordWithSalt",me.storageSystem.getStoredValue("cass.login.password"));
					JSObjectAdapter.$put(me.loginServer,"secretWithSalt",me.storageSystem.getStoredValue("cass.login.secret"));
					me.loginServer.fetch(new Callback1<Object>() {
						@Override
						public void $invoke(Object p1) {
							EcIdentityManager.readContacts();

							EcRepository.cache = new Object();
							me.setLoggedIn(true);

							if (EcIdentityManager.ids.$length() > 0) {
								identityManager.select(EcIdentityManager.ids.$get(0).ppk.toPem());
							}
							success.$invoke();
						}
					}, new Callback1<String>() {
						@Override
						public void $invoke(String p1) {
							failure.$invoke(p1);
						}
					});
				}
			},failure);
		}
	}

	private void cacheLogin(String server) {
		storageSystem.setStoredValue("cass.login.selected",server);
		storageSystem.setStoredValue("cass.login.username", JSObjectAdapter.$get(loginServer,"usernameWithSalt"));
		storageSystem.setStoredValue("cass.login.password",JSObjectAdapter.$get(loginServer,"passwordWithSalt"));
		storageSystem.setStoredValue("cass.login.secret",JSObjectAdapter.$get(loginServer,"secretWithSalt"));
	}

	public void clearCachedLogin(){
		storageSystem.setStoredValue("cass.login.selected",null);
		storageSystem.setStoredValue("cass.login.username", null);
		storageSystem.setStoredValue("cass.login.password",null);
		storageSystem.setStoredValue("cass.login.secret",null);
	}

	public boolean cacheReady() {
		return (storageSystem.getStoredValue("cass.login.selected") != null);
	}

	/**
	 * Sets the flags so the user is logged out, wipes all sign in data so the user is no longer
	 * authenticated and is unidentified
	 *
	 * @method logout
	 */
	public void logout() {
		loginServer.clear();
		identity.selectedIdentity = null;
		EcRepository.cache = new Object();
		setLoggedIn(false);
		EcIdentityManager.ids = new Array<EcIdentity>();
		EcIdentityManager.clearContacts();
		clearCachedLogin();
	}

	/**
	 * Creates a new user and saves the account details on the login server, then signs in
	 * to the new account on successful creation
	 *
	 * @param {String}            username
	 *                            username of the new account
	 * @param {String}            password
	 *                            password of the new account
	 * @param {String}            server
 	 *                            server to create account on
	 * @param {Callback0}         success
	 *                            callback for successful creation and sign in
	 * @param {Callback1<String>} failure
	 *                            callback for error during creation
	 * @method create
	 */
	public void create(final String username, final String password, final String server, final Callback0 success, final Callback1<String> failure) {
		if(loginServer == null || loginServer == JSGlobal.undefined){
			loginServer = new EcRemoteIdentityManager();
		}
		loginServer.setDefaultIdentityManagementServer(server);
		final LoginController me = this;
		loginServer.configureFromServer(new Callback1<Object>() {
			@Override
			public void $invoke(Object p1) {
				me.loginServer.startLogin(username, password);
				me.loginServer.create(new Callback1<String>() {
					@Override
					public void $invoke(String p1) {
						me.login(username, password, server, success, failure);
					}
				}, failure);
			}
		},failure);
	}

	/**
	 * Saves the users credentials and contacts to the server
	 *
	 * @param {Callback0}         success
	 *                            callback for successful save
	 * @param {Callback1<String>} failure
	 *                            callback for error during save
	 * @method save
	 */
	public void save(final Callback0 success, final Callback1<String> failure) {
		loginServer.commit(new Callback1<String>() {
			@Override
			public void $invoke(String p1) {
				success.$invoke();
			}
		}, new Callback1<String>() {
			@Override
			public void $invoke(String p1) {
				failure.$invoke(p1);
			}
		});
	}

}
