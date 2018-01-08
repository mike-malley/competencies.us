package competencies.us.modal;

import org.stjs.javascript.functions.Callback0;

import com.eduworks.ec.framework.view.EcModal;

public class CopyResourceModal extends EcModal {

	public String modalSize = "medium";

	public Object data;
	public Callback0 callback;
	
	public CopyResourceModal(Object data, Callback0 callback)
	{
		this.data = data;
		this.callback = callback;
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/copyResource.html";
	}

}
