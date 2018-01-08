package competencies.us.other;

import org.stjs.javascript.dom.Element;
import org.stjs.javascript.jquery.Event;
import org.stjs.javascript.jquery.EventHandler;
import org.stjs.javascript.jquery.GlobalJQuery;

import com.eduworks.ec.framework.view.EcView;
import com.eduworks.foundation.jquery.plugin.Foundation;

public class Switch extends EcView {

	EventHandler onSwitch;
	
	String switchName;
	String switchId;
	
	boolean switched = false;
	
	public Switch(EventHandler onSwitch, Boolean switchedOn, String switchName)
	{
		this.onSwitch = onSwitch;
		
		this.switchName = switchName;
		
		if(switchedOn != null)
			switched = switchedOn;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/other/switch.html";
	}

	@Override
	public void display(String containerId){
		switchId = containerId+"-switch";
		
		if(switchId.startsWith("#"))
			switchName = switchId.substring(1);
		
		GlobalJQuery.$(containerId).find(".switch-input").prop("id", switchName);
		
		GlobalJQuery.$(containerId).find(".switch-input").prop("name", switchName);
		
		GlobalJQuery.$(containerId).find(".switch-paddle").prop("for", switchName);
		
		if(switched)
			GlobalJQuery.$(containerId).find(".switch-input").prop("checked", switched);
		
		final Switch me = this;
		GlobalJQuery.$(containerId).find(".switch-input").change(new EventHandler() {
			@Override
			public boolean onEvent(Event ev, Element THIS) {
				me.switched = !me.switched;
				
				if(me.onSwitch != null)
					return me.onSwitch.onEvent(ev, THIS);
				return true;
			}
		});
		
		((Foundation<?>)GlobalJQuery.$(containerId)).foundation();
	}
	
	public boolean isChecked(){
		return (boolean) GlobalJQuery.$(switchId).prop("checked");
	}
	
	public void setChecked(boolean checked){
		GlobalJQuery.$(switchId).prop("checked", checked);
	}
}
