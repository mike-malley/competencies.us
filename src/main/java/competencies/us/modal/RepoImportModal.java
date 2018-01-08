package competencies.us.modal;

import com.eduworks.ec.framework.view.EcModal;

public class RepoImportModal extends EcModal {

	public String modalSize = "medium";

	
	public RepoImportModal()
	{
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/import.html";
	}

}
