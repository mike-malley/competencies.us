package competencies.us.modal;

import org.stjs.javascript.functions.Callback0;

import com.eduworks.ec.framework.view.EcModal;

public class ConfirmModal extends EcModal {

	public String modalSize = "tiny";

	public String header;
	public String message;
	public Callback0 confirmCallback;
	
	public ConfirmModal(Callback0 confirmCallback, String message, String header)
	{
		this.confirmCallback = confirmCallback;
		
		this.message = message;
		this.header = header;
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/confirm.html";
	}

}
