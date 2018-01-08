package competencies.us.modal;

import org.cassproject.schema.general.EcRemoteLinkedData;

import com.eduworks.ec.framework.view.EcModal;

/**
 * Stub for the AddCompetenciesToFrameworkModal
 * 
 * @module cass.manager
 * @author devlin.junker@eduworks.com
 * @class AddCompetenciesToFrameworkModal
 * @extends EcModal
 * @constructor
 */
public class AddToFrameworkModal extends EcModal {

	public String modalSize = "medium";

	public EcRemoteLinkedData data;
	
	/**
	 * @constructor
	 * @param {EcRemoteLinkedData || EcRemoteLinkedData[]} data
	 * 			The competency or array of competencies to add to the framework selected in the modal
	 */
	public AddToFrameworkModal(EcRemoteLinkedData data)
	{
		this.data = data;
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/addToFramework.html";
	}

}
