package competencies.us.modal;

import com.eduworks.ec.framework.view.EcModal;

public class ChangeServerModal extends EcModal {

	public String modalSize = "tiny";

	public ChangeServerModal()
	{
	}
	

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/changeServer.html";
	}

}
