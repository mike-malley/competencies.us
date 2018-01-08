package competencies.us.modal;

import org.cassproject.schema.general.EcRemoteLinkedData;

import com.eduworks.ec.framework.view.EcModal;

public class ImportCompetenciesModal extends EcModal {

	public String modalSize = "medium";

	public EcRemoteLinkedData data;
	
	public ImportCompetenciesModal(EcRemoteLinkedData data)
	{
		this.data = data;
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/importCompetencies.html";
	}

}
