package competencies.us.modal;

import com.eduworks.ec.framework.view.EcModal;
import org.cassproject.schema.general.EcRemoteLinkedData;

public class RepoExportModal extends EcModal {

	public String modalSize = "medium";

	public EcRemoteLinkedData data;
	
	public RepoExportModal(EcRemoteLinkedData data)
	{
		this.data = data;
	}
	

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/repoExport.html";
	}

}
