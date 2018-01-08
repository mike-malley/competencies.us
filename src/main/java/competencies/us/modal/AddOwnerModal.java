package competencies.us.modal;


import com.eduworks.ec.framework.view.EcModal;

/**
 * Stub for the AddFieldModal
 * 
 * @module cass.manager
 * @author devlin.junker@eduworks.com
 * @class AddOwnerModal
 * @extends EcModal
 * @constructor
 */
public class AddOwnerModal extends EcModal {

	public String modalSize = "small";
	
	Object field;
	String objectContainerId;
	
	/**
	 * @constructor
	 * @param {Object} field
	 * @param {String} objectContainerId
	 */
	public AddOwnerModal(Object field, String objectContainerId){
		this.field = field;
		
		this.objectContainerId = objectContainerId;
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/addOwner.html";
	}

}
