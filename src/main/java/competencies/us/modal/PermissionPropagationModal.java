package competencies.us.modal;

import org.cassproject.schema.general.EcRemoteLinkedData;
import org.stjs.javascript.functions.Callback0;

import com.eduworks.ec.framework.view.EcModal;

public class PermissionPropagationModal extends EcModal {

	public String modalSize = "medium";

	public EcRemoteLinkedData data;
	public Callback0 onCancel;
	
	public PermissionPropagationModal(EcRemoteLinkedData data, Callback0 cancelCallback)
	{
		this.data = data;
		onCancel = cancelCallback;
	}
	

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/permissionPropagation.html";
	}

}
