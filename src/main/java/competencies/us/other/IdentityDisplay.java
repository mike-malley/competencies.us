package competencies.us.other;

import com.eduworks.ec.framework.view.EcView;

public class IdentityDisplay extends EcView
{

	Object data;

	public IdentityDisplay(Object data)
	{
		this.data = data;
	}

	@Override
	public String getHtmlLocation()
	{
		return "partial/other/identityDisplay.html";
	}

}
