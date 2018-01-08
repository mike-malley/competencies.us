package competencies.us.modal;

import com.eduworks.ec.framework.view.EcModal;
import org.stjs.javascript.functions.Callback0;

public class CreateIdentityModal extends EcModal {

	public String modalSize = "small";

	public Callback0 success;

	public CreateIdentityModal(Callback0 onSuccess){
		success = onSuccess;
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/createIdentity.html";
	}

}
