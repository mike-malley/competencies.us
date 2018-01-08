package competencies.us.modal;


import com.eduworks.ec.framework.view.EcModal;

/**
 * Stub for the AddFieldModal
 * 
 * @module cass.manager
 * @author devlin.junker@eduworks.com
 * @class AddFieldModal
 * @extends EcModal
 * @constructor
 */
public class AddFieldModal extends EcModal {

	public String modalSize = "small";
	
	Object field;
	String repoEditContainerId;
	
	/**
	 * @constructor
	 * @param {Object} field
	 * @param {String} repoEditContainerId
	 */
	public AddFieldModal(Object field, String repoEditContainerId){
		this.field = field;
		
		this.repoEditContainerId = repoEditContainerId;
	}

	@Override
	public String getModalSize() {
		return modalSize;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/modal/addField.html";
	}

}
