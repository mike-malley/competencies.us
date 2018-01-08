package competencies.us.modal;

import org.cassproject.ebac.identity.EcContact;
import org.stjs.javascript.functions.Callback0;

import com.eduworks.ec.framework.view.EcModal;

public class ContactGrantModal extends EcModal {

	public String modalSize = "small";
	
	public EcContact contact;
	public String token;
	public String signature;
	
	public Callback0 closeEvent=null;
	
	public ContactGrantModal(EcContact contact, String token, String signature, Callback0 close)
	{
		this.contact = contact;
		this.token = token;
		this.signature = signature;
		
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
		return "partial/modal/contactGrant.html";
	}

}
