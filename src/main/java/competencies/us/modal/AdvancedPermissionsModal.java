package competencies.us.modal;

import org.cassproject.schema.general.EcRemoteLinkedData;
import org.stjs.javascript.functions.Callback1;

import com.eduworks.ec.framework.view.EcModal;

public class AdvancedPermissionsModal extends EcModal {

	public String modalSize = "medium";

	public EcRemoteLinkedData data;
	public Callback1<Object> saveCallback;
	public boolean onlyReaders;
	
	public AdvancedPermissionsModal(EcRemoteLinkedData data, Callback1<Object> callback, Boolean onlyReaders)
	{
		this.data = data;
		this.saveCallback = callback;
		
		if(onlyReaders == null)
			this.onlyReaders = false;
		else
			this.onlyReaders = onlyReaders;
	}
	

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/advancedPermissions.html";
	}

}
