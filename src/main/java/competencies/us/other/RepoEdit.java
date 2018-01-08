package competencies.us.other;

import com.eduworks.ec.framework.view.EcView;

/**
 * @author djunker
 *
 *	RepoEdit Stub for RepoEdit.js
 *
 */
public class RepoEdit extends EcView {

	Object data;
	String saveButtonId;
	String messageContainerId;
	
	/**
	 * 
	 * @param data
	 * @param saveButtonId
	 * @param messageContainerId
	 */
	public RepoEdit(Object data, String saveButtonId, String messageContainerId)
	{
		this.data = data;
		this.saveButtonId = saveButtonId;
		this.messageContainerId = messageContainerId;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/other/repoEdit.html";
	}

}
