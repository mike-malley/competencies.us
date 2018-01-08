package competencies.us.modal;

import org.stjs.javascript.functions.Callback1;

import com.eduworks.ec.framework.view.EcModal;

public class EncryptOptionsModal extends EcModal {

	public String modalSize = "tiny";

	public Callback1<Object> callback;
	
	public EncryptOptionsModal(Callback1<Object> callback)
	{
		this.callback = callback;
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/encryptOptions.html";
	}

}
