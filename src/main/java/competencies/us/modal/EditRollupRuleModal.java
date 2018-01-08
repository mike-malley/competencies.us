package competencies.us.modal;

import org.cass.competency.EcRollupRule;
import org.cassproject.schema.general.EcRemoteLinkedData;
import org.stjs.javascript.functions.Callback1;

import com.eduworks.ec.framework.view.EcModal;

public class EditRollupRuleModal extends EcModal
{

	public String modalSize = "small";

	public EcRemoteLinkedData data;
	public Callback1<EcRollupRule> closeCallback;

	public EditRollupRuleModal(EcRemoteLinkedData data, Callback1<EcRollupRule> callback)
	{
		this.data = data;
		this.closeCallback = callback;
	}

	@Override
	public String getModalSize()
	{
		return modalSize;
	}

	@Override
	public String getHtmlLocation()
	{
		return "partial/modal/editRollupRule.html";
	}

}
