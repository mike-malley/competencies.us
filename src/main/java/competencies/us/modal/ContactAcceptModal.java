package competencies.us.modal;

import org.cassproject.ebac.identity.EcContactGrant;
import org.stjs.javascript.functions.Callback0;

import com.eduworks.ec.framework.view.EcModal;

public class ContactAcceptModal extends EcModal {

	private Callback0 closeEvent=null;
	public String modalSize = "small";
	
	public EcContactGrant grant;

	public ContactAcceptModal(EcContactGrant grant, Callback0 close)
	{
		this.grant = grant;
		
		this.closeEvent = close;
	}

	@Override
	public Boolean onClose() {
		if (closeEvent != null)
			closeEvent.$invoke();
		return super.onClose();
	}
	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/contactAccept.html";
	}

}
