package competencies.us.modal;

import com.eduworks.ec.framework.view.EcModal;

public class ChangeTypeModal extends EcModal {

	public String modalSize = "small";
	
	Object changeObj;
	String repoEditContainerId;
	
	public ChangeTypeModal(Object changeObj, String repoEditContainerId)
	{
		this.changeObj = changeObj;
		this.repoEditContainerId = repoEditContainerId;
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/changeType.html";
	}

}
