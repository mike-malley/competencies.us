package competencies.us.modal;

import org.stjs.javascript.functions.Callback0;

import com.eduworks.ec.framework.view.EcModal;

public class MessageModal extends EcModal {

	public String modalSize = "small";

	public String header = "";
	public String message = "";
	public Callback0 okCallback;
	
	public MessageModal(String header, String text, String size, Callback0 okCallback)
	{
		this.header = header;
		
		this.message = text;
		
		if(size != null)
			modalSize = size;
	
		this.okCallback = okCallback;
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/message.html";
	}

}
