package competencies.us.other;

import com.eduworks.ec.framework.view.EcView;

public class DataViewer extends EcView {

	String prefix;
	
	Object callbacks;
	
	Object dataStore;
	
	public DataViewer(String idPrefix, Object callbacks)
	{
		this.prefix = idPrefix;
		
		this.callbacks = callbacks;
		
		dataStore = new Object();
	}
	

	@Override
	public String getHtmlLocation() {
		return "partial/other/dataViewer.html";
	}

}
