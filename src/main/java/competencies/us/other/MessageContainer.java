package competencies.us.other;

import org.stjs.javascript.functions.Callback0;

import com.eduworks.ec.framework.view.EcView;

public class MessageContainer extends EcView
{

	String prefix;
	Callback0 closeMessageCallback;

	public MessageContainer(String idPrefix, Callback0 closeMessage)
	{
		this.prefix = idPrefix;
		closeMessageCallback = closeMessage;
	}

	@Override
	public String getHtmlLocation()
	{
		return "partial/other/messageContainer.html";
	}

	public void displayAlert(String msg, String msgId)
	{
	}

	public void clearAlert(String msgId)
	{
	}
}
