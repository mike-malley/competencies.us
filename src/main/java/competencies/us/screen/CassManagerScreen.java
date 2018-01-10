package competencies.us.screen;

import com.eduworks.ec.framework.browser.url.URLParams;
import com.eduworks.ec.framework.view.EcScreen;
import com.eduworks.ec.framework.view.manager.ModalManager;
import com.eduworks.ec.framework.view.manager.ScreenManager;
import org.stjs.javascript.functions.Callback0;
import org.stjs.javascript.functions.Callback1;

public abstract class CassManagerScreen extends EcScreen
{
	Object data;

	@Override
	public void setData(Object data)
	{
		this.data = data;
	}

	public static Callback1<Object> reloadLoginCallback = new Callback1<Object>()
	{
		@Override
		public void $invoke(Object o)
		{
			ModalManager.hideModal();
			EcScreen currentScreen = ScreenManager.getCurrentScreen();
			if (o == null)
				currentScreen.setData(URLParams.getParams());
			else
				currentScreen.setData(o);
			ScreenManager.replaceScreen(currentScreen, null, null);
		}
	};

	public static Callback0 afterReload = new Callback0()
	{
		@Override
		public void $invoke()
		{
		}
	};

}
