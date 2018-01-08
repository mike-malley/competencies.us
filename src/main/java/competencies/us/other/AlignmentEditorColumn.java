package competencies.us.other;

import com.eduworks.ec.array.EcAsyncHelper;
import com.eduworks.ec.framework.view.EcView;
import org.cass.competency.EcAlignment;
import org.cass.competency.EcCompetency;
import org.cass.competency.EcFramework;
import org.cassproject.ebac.repository.EcRepository;
import org.cassproject.schema.cass.competency.Competency;
import org.cassproject.schema.general.EcRemoteLinkedData;
import org.credentialengine.Badge;
import org.credentialengine.Credential;
import org.schema.Course;
import org.schema.CreativeWork;
import org.schema.Thing;
import org.stjs.javascript.Array;
import org.stjs.javascript.JSGlobal;
import org.stjs.javascript.JSObjectAdapter;
import org.stjs.javascript.Map;
import org.stjs.javascript.functions.Callback0;
import org.stjs.javascript.functions.Callback1;
import org.stjs.javascript.functions.Callback2;

/**
 * Created by fray on 3/10/17.
 */
public class AlignmentEditorColumn extends EcView {
	public static String COMPETENCY = Competency.myType;
	public static String CREDENTIAL = new Credential().type;
	public static String COURSE = new Course().type;
	public static String RESOURCE = new CreativeWork().type;
	public static String BADGE = new Badge().type;
	public int columnIndex = -1;
	public String containerId = null;

	public AlignmentEditorColumn() {

		collection = new Array<>();
		selected = new Array<>();
		highlighted = new Array<>();
	}

	@Override
	public String getHtmlLocation() {
		return "partial/other/alignmentEditor.html";
	}

	public String selectedCategory = null;
	public String selectedSource = null;
	public String selectedCollection = null;
	public EcRepository sourceRepo = null;
	public String filter = null;
	public String type;
	public String urlCollectionIdentifier = null;
	public String collectionSearchString = null;
	public Array<Thing> collection = null;
	public Array<Thing> selected = null;
	public Array<Thing> highlighted = null;
	public Map<String, Integer> weight;
	public Map<String, Integer> lift;
	public Array<Thing> relations;
	public AlignmentEditorColumn left = null;
	public AlignmentEditorColumn right = null;
	public Callback0 screenHook = null;

	@Override
	public void display(String containerId) {
		this.containerId = containerId;
		bindControls(containerId);
	}

	public void bindControls(String containerId) {
		//js stub
	}

	public void toggleNavigation() {
		//js stub
	}

	public String getType() {
		if (selectedCategory == "course")
			return COURSE;
		if (selectedCategory == "competency")
			return COMPETENCY;
		if (selectedCategory == "credential")
			return CREDENTIAL;
		if (selectedCategory == "resource")
			return RESOURCE;
		if (selectedCategory == "badge")
			return BADGE;
		return null;
	}

	public void populate() {
		//js stub
	}

	public void redraw() {
		//js stub
	}
	public void redrawJs() {
		//js stub
	}
	public void redrawJsInit() {
		//js stub
	}
	public void redrawJsFinal() {
		//js stub
	}

	public void selectElement(String id) {
		for (int i = 0; i < selected.$length(); i++)
			if (selected.$get(i).shortId() == id) {
				selected.splice(i, 1);
				if (right != null)
					right.deselectedEvent(id, true);
				if (left != null)
					left.deselectedEvent(id, false);
				return;
			}

		for (int i = 0; i < collection.$length(); i++)
			if (collection.$get(i).shortId() == id) {
				selected.push(collection.$get(i));
				if (right != null)
					right.selectedEvent(id, true);
				if (left != null)
					left.selectedEvent(id, false);
				return;
			}
	}

	public void selectedEvent(String id, Boolean propegatesRight) {

	}

	public void deselectedEvent(String id, Boolean propegatesRight) {

	}

	public void populateListCourses() {
		final AlignmentEditorColumn me = this;
		Object params = new Object();
		JSObjectAdapter.$put(params, "size", 5000);
		sourceRepo.searchWithParams("@type:Course", params, new Callback1<EcRemoteLinkedData>() {
			@Override
			public void $invoke(EcRemoteLinkedData ecRemoteLinkedData) {
			}
		}, new Callback1<Array<EcRemoteLinkedData>>() {
			@Override
			public void $invoke(Array<EcRemoteLinkedData> strings) {
				me.collection = (Array) strings;
				me.selected = new Array<>();
				me.highlighted = new Array<>();
				me.populate();
			}
		}, new Callback1<String>() {
			@Override
			public void $invoke(String s) {

			}
		});
	}

	public void populateListCredentials() {
		final AlignmentEditorColumn me = this;
		Object params = new Object();
		JSObjectAdapter.$put(params, "size", 5000);
		sourceRepo.searchWithParams("@type:Credential", params, new Callback1<EcRemoteLinkedData>() {
			@Override
			public void $invoke(EcRemoteLinkedData ecRemoteLinkedData) {
			}
		}, new Callback1<Array<EcRemoteLinkedData>>() {
			@Override
			public void $invoke(Array<EcRemoteLinkedData> credentials) {
				me.collection = (Array) credentials;
				me.selected = new Array<>();
				me.highlighted = new Array<>();
				me.populate();
			}
		}, new Callback1<String>() {
			@Override
			public void $invoke(String s) {

			}
		});
	}

	public void populateListBadges() {
		final AlignmentEditorColumn me = this;
		Object params = new Object();
		JSObjectAdapter.$put(params, "size", 5000);
		sourceRepo.searchWithParams("@type:Badge", params, new Callback1<EcRemoteLinkedData>() {
			@Override
			public void $invoke(EcRemoteLinkedData ecRemoteLinkedData) {
			}
		}, new Callback1<Array<EcRemoteLinkedData>>() {
			@Override
			public void $invoke(Array<EcRemoteLinkedData> badges) {
				me.collection = (Array) badges;
				me.selected = new Array<>();
				me.highlighted = new Array<>();
				me.populate();
			}
		}, new Callback1<String>() {
			@Override
			public void $invoke(String s) {

			}
		});
	}

	public void populateListCompetencies() {
		final AlignmentEditorColumn me = this;
		EcFramework.get(selectedCollection, new Callback1<EcFramework>() {
			@Override
			public void $invoke(EcFramework framework) {
				EcAsyncHelper<String> eah = new EcAsyncHelper<>();
				me.collection = new Array<>();
				me.selected = new Array<>();
				me.highlighted = new Array<>();
				if(framework.competency != JSGlobal.undefined && framework.competency != null){
					eah.each(framework.competency, new Callback2<String, Callback0>() {
						@Override
						public void $invoke(String s, final Callback0 callback0) {
							EcCompetency.get(s, new Callback1<EcCompetency>() {
								@Override
								public void $invoke(EcCompetency ecCompetency) {
									me.collection.push(ecCompetency);
									callback0.$invoke();
								}
							}, new Callback1<String>() {
								@Override
								public void $invoke(String s) {
									callback0.$invoke();
								}
							});
						}
					}, new Callback1<Array<String>>() {
						@Override
						public void $invoke(Array<String> strings) {
							me.populate();
						}
					});
				}else{
					me.populate();
				}
			}
		}, new Callback1<String>() {
			@Override
			public void $invoke(String s) {

			}
		});
	}

	public void getRelations() {
		String query = "";
		final AlignmentEditorColumn me = this;

		if (me.selectedCategory == "competency") {
			for (int i = 0; i < me.collection.$length(); i++) {
				if (i > 0)
					query += " OR ";
				query += "source:\"" + me.collection.$get(i).shortId() + "\"";
			}
			Object params = new Object();
			JSObjectAdapter.$put(params, "size", 5000);
			EcAlignment.search(sourceRepo, query, new Callback1<Array<EcAlignment>>() {
				@Override
				public void $invoke(Array<EcAlignment> strings) {
					me.relations = (Array<Thing>) (Object) strings;
					if (me.screenHook != null)
						me.screenHook.$invoke();
					else
						me.redraw();
				}
			}, new Callback1<String>() {
				@Override
				public void $invoke(String s) {

				}
			}, params);
		} else {
			for (int i = 0; i < me.collection.$length(); i++) {
				if (i > 0)
					query += " OR ";
				query += "url:\"" + me.collection.$get(i).shortId() + "\"";
			}
			if (query != null && query != "")
				query = "(" + query + ") AND " + new CreativeWork().getSearchStringByType();
			else
				query = new CreativeWork().getSearchStringByType();
			Object params = new Object();
			JSObjectAdapter.$put(params, "size", 5000);
			me.relations = new Array<>();
			me.sourceRepo.searchWithParams(query, params, new Callback1<EcRemoteLinkedData>() {
				@Override
				public void $invoke(EcRemoteLinkedData ecRemoteLinkedData) {
					CreativeWork cw = new CreativeWork();
					cw.copyFrom(ecRemoteLinkedData);
					me.relations.push(cw);
				}
			}, new Callback1<Array<EcRemoteLinkedData>>() {
				@Override
				public void $invoke(Array<EcRemoteLinkedData> strings) {
					if (me.screenHook != null)
						me.screenHook.$invoke();
					else
						me.redraw();
				}
			}, new Callback1<String>() {
				@Override
				public void $invoke(String s) {

				}
			});
		}
	}

	public void populateListResources() {
		final AlignmentEditorColumn me = this;
		Object params = new Object();
		JSObjectAdapter.$put(params, "size", 5000);
		sourceRepo.searchWithParams(new CreativeWork().getSearchStringByType(), params, new Callback1<EcRemoteLinkedData>() {
			@Override
			public void $invoke(EcRemoteLinkedData ecRemoteLinkedData) {
			}
		}, new Callback1<Array<EcRemoteLinkedData>>() {
			@Override
			public void $invoke(Array<EcRemoteLinkedData> strings) {
				me.collection = (Array) strings;
				me.selected = new Array<>();
				me.highlighted = new Array<>();
				me.populate();
			}
		}, new Callback1<String>() {
			@Override
			public void $invoke(String s) {

			}
		});
	}
}
