package competencies.us.other;

import com.eduworks.ec.framework.view.EcView;

public class FrameworkList extends EcView {

	Object data;
	
	Object callbacks;
	
	public FrameworkList(Object data, Object callbacks){
		this.data = data;
		
		this.callbacks = callbacks;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/other/frameworkList.html";
	}

}
