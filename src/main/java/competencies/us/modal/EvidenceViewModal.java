package competencies.us.modal;

import org.stjs.javascript.Array;

import com.eduworks.ec.framework.view.EcModal;

public class EvidenceViewModal extends EcModal {

	public String modalSize = "medium";

	public Array<String> evidence;
	
	public EvidenceViewModal(Array<String> evidence)
	{
		this.evidence = evidence;
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/viewEvidence.html";
	}

}
