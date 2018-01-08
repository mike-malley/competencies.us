package competencies.us.modal;

import com.eduworks.ec.framework.view.EcModal;

public class SaveIdModal extends EcModal {

	public String modalSize = "tiny";
	
	public String msg;
	
	public SaveIdModal(String msg){
		this.msg = msg;
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/saveId.html";
	}

}
