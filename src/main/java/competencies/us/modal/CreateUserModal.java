package competencies.us.modal;

import com.eduworks.ec.framework.view.EcModal;

public class CreateUserModal extends EcModal {

	public String modalSize = "small";
	

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/createUser.html";
	}

}
