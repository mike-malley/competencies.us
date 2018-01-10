package competencies.us.screen;

import competencies.us.other.AlignmentEditorColumn;
import competencies.us.other.AlignmentExplorerColumn;
import com.eduworks.ec.framework.view.manager.ScreenManager;
import com.eduworks.ec.framework.view.manager.ViewManager;
import org.stjs.javascript.Array;
import org.stjs.javascript.Global;
import org.stjs.javascript.functions.Callback0;

/**
 * Created by fray on 3/23/17.
 */
public class AlignmentExplorerScreen extends CassManagerScreen {
	static String displayName = "AlignmentExplorer";

	static {
		ScreenManager.addStartupScreenCallback(new Callback0() {
			@Override
			public void $invoke() {
				if (Global.window.document.location.hash.startsWith("#" + displayName)) {
					ScreenManager.startupScreen = new AlignmentExplorerScreen();
				}
			}
		});
	}
	public Array<AlignmentExplorerColumn> columns = null;
	public String containerId = null;


	public AlignmentExplorerColumn addColumn() {
		AlignmentExplorerColumn column = new AlignmentExplorerColumn();
		column.columnIndex = columns.$length();
		AlignmentExplorerColumn lastColumn = null;
		if (columns.$length() > 0)
			lastColumn = columns.$get(columns.$length() - 1);
		if (lastColumn != null) {
			lastColumn.right = column;
			column.left = lastColumn;
		}
		columns.push(column);
		addedColumn(column);
		final AlignmentExplorerScreen me = this;
		column.screenHook = new Callback0() {
			@Override
			public void $invoke() {
				me.updateControls();
				me.reflow();
			}
		};
		column.display(containerId);
		reflow();
		return column;
	}

	private void reflow() {
		//js stub
	}

	protected void addedColumn(AlignmentEditorColumn column) {
		ViewManager.showView(column, createColumnDiv(), new Callback0() {
			@Override
			public void $invoke() {

			}
		});
	}

	protected void updateControls() {
		//js stub
	}

	protected String createColumnDiv() {
		//js stub
		return null;
	}

	@Override
	public String getDisplayName() {
		return displayName;
	}

	@Override
	public String getHtmlLocation() {
		return "partial/screen/alignmentExplorer.html";
	}

	@Override
	public void display(String containerId) {
		this.containerId = containerId;
		columns = new Array<>();
		addColumn();
		addColumn();
		addColumn();
		addColumn();
		bindControls(containerId);
	}

	public void bindControls(String containerId) {
		//js stub
	}
}
