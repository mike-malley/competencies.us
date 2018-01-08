package competencies.us.modal;

import com.eduworks.ec.framework.view.EcModal;
import org.stjs.javascript.functions.Callback0;

public class AddServerModal extends EcModal {

	public String modalSize = "small";

	public Callback0 closeEvent=null;
	public String server = null;

	public AddServerModal(Callback0 modalClose, String server) {
		this.closeEvent = modalClose;
		this.server = server;
	}

	@Override
	public Boolean onClose() {
		if (closeEvent != null)
			closeEvent.$invoke();
		return super.onClose();
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/addServer.html";
	}

}
