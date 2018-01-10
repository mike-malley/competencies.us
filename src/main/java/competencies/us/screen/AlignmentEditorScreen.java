package competencies.us.screen;

import competencies.us.AppController;
import competencies.us.other.AlignmentEditorColumn;
import competencies.us.other.MessageContainer;

import com.eduworks.ec.framework.view.manager.ScreenManager;
import com.eduworks.ec.framework.view.manager.ViewManager;
import org.cass.competency.EcAlignment;
import org.cass.competency.EcFramework;
import org.cassproject.ebac.repository.EcRepository;
import org.cassproject.schema.cass.competency.Relation;
import org.schema.AlignmentObject;
import org.schema.CreativeWork;
import org.schema.Thing;
import org.stjs.javascript.Array;
import org.stjs.javascript.Global;
import org.stjs.javascript.JSGlobal;
import org.stjs.javascript.functions.Callback0;
import org.stjs.javascript.functions.Callback1;
import org.stjs.javascript.jquery.GlobalJQuery;

public class AlignmentEditorScreen extends CassManagerScreen {

	static String displayName = "AlignmentEditor";

	static {
		ScreenManager.addStartupScreenCallback(new Callback0() {
			@Override
			public void $invoke() {
				if (Global.window.document.location.hash.startsWith("#" + displayName)) {
					ScreenManager.startupScreen = new AlignmentEditorScreen();
				}
			}
		});
	}

	public Array<AlignmentEditorColumn> columns = null;
	public String containerId = null;

	public AlignmentEditorScreen() {
		columns = new Array<>();
	}

	public AlignmentEditorColumn addColumn() {
		AlignmentEditorColumn column = new AlignmentEditorColumn();
		column.columnIndex = columns.$length();
		AlignmentEditorColumn lastColumn = null;
		if (columns.$length() > 0)
			lastColumn = columns.$get(columns.$length() - 1);
		if (lastColumn != null) {
			lastColumn.right = column;
			column.left = lastColumn;
		}
		columns.push(column);
		addedColumn(column);
		final AlignmentEditorScreen me = this;
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

	public void createRelations(String relationType) {
		if (AppController.identityController.selectedIdentity == null){
			if(AppController.loginController.getLoggedIn() == true){
				((MessageContainer)ViewManager.getView("#alignmentEditorMessageContainer")).displayAlert("You need to select an identity to own the new relationship", "noIdentity");
			}else{
				((MessageContainer)ViewManager.getView("#alignmentEditorMessageContainer")).displayAlert("You need to sign in in order to create a new relationship", "noIdentity");
			}
			reflow();
			
			return;
		}
			
		((MessageContainer)ViewManager.getView("#alignmentEditorMessageContainer")).clearAlert("noIdentity");
		
		Array<Thing> left = columns.$get(0).selected;
		Array<Thing> right = columns.$get(1).selected;
		EcFramework leftFramework = null;
		EcFramework rightFramework = null;
		if (columns.$get(0).selectedCollection != null)
			leftFramework = EcFramework.getBlocking(columns.$get(0).selectedCollection);
		if (columns.$get(1).selectedCollection != null)
			rightFramework = EcFramework.getBlocking(columns.$get(1).selectedCollection);
		final AlignmentEditorScreen me = this;
		for (int i = 0; i < left.$length(); i++)
			for (int j = 0; j < right.$length(); j++) {
				if (columns.$get(0).selectedCategory == "competency")
					if (columns.$get(1).selectedCategory == "competency") {
						EcAlignment a = new EcAlignment();
						a.generateId(columns.$get(0).sourceRepo.selectedServer);
						if (AppController.identityController.selectedIdentity == null)
							throw new RuntimeException("No identity selected.");
						a.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
						a.source = left.$get(i).shortId();
						a.target = right.$get(j).shortId();
						a.relationType = relationType;
						boolean found = false;
						Array<Thing> relations = columns.$get(0).relations;
						for (int ii = 0; ii < relations.$length(); ii++) {
							Relation r = (Relation) relations.$get(ii);
							if (r.source == a.source && r.target == a.target && r.relationType == a.relationType) {
								found = true;
								if (leftFramework != null)
									if (AppController.identityController.canEdit(leftFramework))
										leftFramework.removeRelation(r.id);
								if (rightFramework != null)
									if (AppController.identityController.canEdit(rightFramework))
										rightFramework.removeRelation(r.id);
								EcRepository._delete(r, new Callback1<String>() {
									@Override
									public void $invoke(String s) {
										me.columns.$get(0).getRelations();
									}
								}, new Callback1<String>() {
									@Override
									public void $invoke(String s) {
										throw new RuntimeException(s);
									}
								});
							}
						}
						if (!found) {
							relations.push(a);
							if (leftFramework != null)
								if (AppController.identityController.canEdit(leftFramework))
									leftFramework.addRelation(a.id);
							if (rightFramework != null)
								if (AppController.identityController.canEdit(rightFramework))
									rightFramework.addRelation(a.id);
							EcRepository.save(a, new Callback1<String>() {
								@Override
								public void $invoke(String s) {
									me.columns.$get(0).getRelations();
								}
							}, new Callback1<String>() {
								@Override
								public void $invoke(String s) {
									throw new RuntimeException(s);
								}
							});
						}
					}
			}
		if (leftFramework != null)
			if (AppController.identityController.canEdit(leftFramework))
				leftFramework.save(null, null);
		if (rightFramework != null)
			if (AppController.identityController.canEdit(rightFramework))
				rightFramework.save(null, null);
	}

	public void createAlignments(String relationType) {
		if (AppController.identityController.selectedIdentity == null){
			if(AppController.loginController.getLoggedIn() == true){
				((MessageContainer)ViewManager.getView("#alignmentEditorMessageContainer")).displayAlert("You need to select an identity to own the new relationship", "noIdentity");
			}else{
				((MessageContainer)ViewManager.getView("#alignmentEditorMessageContainer")).displayAlert("You need to sign in in order to create a new relationship", "noIdentity");
			}
			reflow();
			
			return;
		}
		
		Array<Thing> left = columns.$get(0).selected;
		Array<Thing> right = columns.$get(1).selected;
		final AlignmentEditorScreen me = this;
		for (int i = 0; i < left.$length(); i++)
			for (int j = 0; j < right.$length(); j++) {
				if ((columns.$get(0).selectedCategory != "competency") || (columns.$get(1).selectedCategory != "competency")) {
					CreativeWork a = new CreativeWork();
					a.generateId(columns.$get(0).sourceRepo.selectedServer);
					if (AppController.identityController.selectedIdentity == null)
						throw new RuntimeException("No identity selected.");
					a.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
					a.url = left.$get(i).shortId();
					a.educationalAlignment = new AlignmentObject();
					a.educationalAlignment.alignmentType = relationType;
					a.educationalAlignment.educationalFramework = columns.$get(1).selectedCollection;
					a.educationalAlignment.targetUrl = right.$get(j).shortId();
					a.educationalAlignment.targetName = right.$get(j).name;
					a.educationalAlignment.targetDescription = right.$get(j).description;
					boolean found = false;
					Array<Thing> relations = columns.$get(0).relations;
					for (int ii = 0; ii < relations.$length(); ii++) {
						CreativeWork r = (CreativeWork) relations.$get(ii);
						if (r.educationalAlignment != null)
							if (r.url == a.url && r.educationalAlignment.targetUrl == a.educationalAlignment.targetUrl && r.educationalAlignment.alignmentType == a.educationalAlignment.alignmentType) {
								found = true;
								EcRepository._delete(r, new Callback1<String>() {
									@Override
									public void $invoke(String s) {
										me.columns.$get(0).getRelations();
									}
								}, new Callback1<String>() {
									@Override
									public void $invoke(String s) {
										throw new RuntimeException(s);
									}
								});
							}
					}
					if (!found) {
						relations.push(a);
						EcRepository.save(a, new Callback1<String>() {
							@Override
							public void $invoke(String s) {
								me.columns.$get(0).getRelations();
							}
						}, new Callback1<String>() {
							@Override
							public void $invoke(String s) {
								throw new RuntimeException(s);
							}
						});
					}
				}
			}
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
		return "partial/screen/alignmentEditor.html";
	}

	@Override
	public void display(String containerId) {
		this.containerId = containerId;
		columns = new Array<>();
		addColumn();
		
		(GlobalJQuery.$(createColumnDiv()).attr("id", "mappingFrameworkColumn")).css("display", "none").html("<div style='font-weight: 800;'>Mapping Framework:</div><select id='mappingFrameworkServerSelect'><option disabled='' selected=''>-- Select Server --</option></select><select 'mappingFrameworkSelect'><option disabled='' selected=''>-- Select Framework or Create New --</option></select>");
		
		addColumn();
		bindControls(containerId);
		
		final AlignmentEditorScreen me = this;
		
		ViewManager.showView(new MessageContainer("alignmentEditor", new Callback0() {
			@Override
			public void $invoke() {
				me.reflow();
			}
		}), "#alignmentEditorMessageContainer", new Callback0() {
			@Override
			public void $invoke() {
				if (AppController.identityController.selectedIdentity == null || AppController.identityController.selectedIdentity == JSGlobal.undefined){
					if(AppController.loginController.getLoggedIn() == true){
						((MessageContainer)ViewManager.getView("#alignmentEditorMessageContainer")).displayAlert("You need to select an identity to own any relationships or alignments", "noIdentity");
					}else{
						((MessageContainer)ViewManager.getView("#alignmentEditorMessageContainer")).displayAlert("You need to sign in in order to create a relationship or alignment", "noIdentity");
					}
				}
			}
		});
	}

	public void bindControls(String containerId) {
		//js stub
	}
}
