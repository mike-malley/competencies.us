package competencies.us.modal;

import competencies.us.AppController;
import competencies.us.other.AppMenu;
import com.eduworks.ec.framework.browser.url.URLParams;
import com.eduworks.ec.framework.view.EcModal;
import com.eduworks.ec.framework.view.manager.ModalManager;
import com.eduworks.ec.framework.view.manager.ViewManager;
import org.stjs.javascript.functions.Callback0;
import org.stjs.javascript.functions.Callback1;

public class LoginModal extends EcModal {

	public String modalSize = "small";

	public Callback0 cancel = null;
	public Callback1<Object> loginSuccess;

	String warning;

	public LoginModal(Callback1<Object> success, Callback0 cancel, String warningMessage) {
		loginSuccess = success;
		this.cancel = cancel;
		this.warning = warningMessage;
	}

	@Override
	public Boolean onClose() {
		if (cancel != null)
			cancel.$invoke();
		return super.onClose();
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/login.html";
	}

	public void submitOauth2(String server) {
		final LoginModal me = this;
		final Callback1<String> failure = new Callback1<String>() {
			@Override
			public void $invoke(String err) {
				ViewManager.getView("#loginMessageContainer").displayAlert(err, "loginFail");
			}
		};

		ViewManager.getView("#loginMessageContainer").clearAlert("loginFail");

		AppController.loginController.hello(server, new Callback0() {
					@Override
					public void $invoke() {
						AppController.serverController.checkForAdmin(new Callback0() {
							@Override
							public void $invoke() {
								if (me.loginSuccess != null) {
									me.loginSuccess.$invoke(URLParams.getParams());
								} else {
									ModalManager.hideModal();
								}
								new AppMenu().setLoggedIn();
							}
						});
					}
				}, failure
		);
	}

	public void submitLogin(final String userId, final String password, String server) {
		final LoginModal me = this;
		final Callback1<String> failure = new Callback1<String>() {
			@Override
			public void $invoke(String err) {
				ViewManager.getView("#loginMessageContainer").displayAlert(err, "loginFail");
			}
		};

		ViewManager.getView("#loginMessageContainer").clearAlert("loginFail");

		AppController.loginController.login(
				userId,
				password, server, new Callback0() {
					@Override
					public void $invoke() {
						AppController.serverController.checkForAdmin(new Callback0() {
							@Override
							public void $invoke() {
								AppController.serverController.checkForAdmin(new Callback0() {
									@Override
									public void $invoke() {
										if (me.loginSuccess != null) {
											me.loginSuccess.$invoke(URLParams.getParams());
										} else {
											ModalManager.hideModal();
										}
										new AppMenu().setLoggedIn();
									}
								});
							}
						});
					}
				}, failure
		);
	}

}
