package competencies.us.modal;

import org.cass.competency.EcLevel;
import org.cassproject.schema.general.EcRemoteLinkedData;
import org.stjs.javascript.functions.Callback1;

import com.eduworks.ec.framework.view.EcModal;

public class EditLevelModal extends EcModal {

	public String modalSize = "small";

	public EcRemoteLinkedData data;
	public Callback1<EcLevel> closeCallback;
	
	public EditLevelModal(EcRemoteLinkedData data, Callback1<EcLevel> callback)
	{
		this.data = data;
		this.closeCallback = callback;
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/editLevel.html";
	}

}
