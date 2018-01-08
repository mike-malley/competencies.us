package competencies.us.other;

import com.eduworks.ec.array.EcArray;
import org.cassproject.ebac.repository.EcRepository;
import org.cassproject.schema.cass.competency.Relation;
import org.schema.CreativeWork;
import org.schema.Thing;
import org.stjs.javascript.Array;
import org.stjs.javascript.JSObjectAdapter;

/**
 * Created by fray on 3/23/17.
 */
public class AlignmentExplorerColumn extends AlignmentEditorColumn {

	public Object idToComments;
	public Object idToCommentHighlight;

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
		if (this.screenHook != null)
			this.screenHook.$invoke();
	}

	public void redraw() {
		Array<Thing> sel = null;
		if (left != null)
		sel = left.selected;
		Array<Thing> rels = relations;
		if (rels == null)
			rels = new Array<>();
		if (left != null)
		rels = rels.concat(left.relations);
		if (sel != null) {
			idToComments = new Object();
			idToCommentHighlight = new Object();
			highlighted = new Array<>();
			for (int i = 0; i < sel.$length(); i++) {
				Thing t = sel.$get(i);
				highlight(t, rels, new Array<Thing>());
			}
			selected = highlighted;
		}
		redrawJs();
	}

	public void redrawJs() {//js stub
	}
	public void redrawJsInit() {//js stub
	}

	private void appendComment(String id, String comment) {
		Array<String> tray = (Array<String>) JSObjectAdapter.$get(idToComments, id);
		if (tray == null) {
			tray = new Array<>();
			JSObjectAdapter.$put(idToComments, id, tray);
		}
		EcArray.setAdd(tray, comment);
	}
	private void highlightComment(String id) {
		Boolean tray = (Boolean) JSObjectAdapter.$get(idToComments, id);
		if (tray == null) {
			JSObjectAdapter.$put(idToCommentHighlight, id, true);
		}
	}

	private void highlight(Thing selectedItem, Array<Thing> rels, Array<Thing> walked) {
		if (EcArray.has(walked, selectedItem))
			return;
		walked.push(selectedItem);
		if (!EcArray.has(highlighted, selectedItem))
			if (EcArray.has(collection, selectedItem))
				highlighted.push(selectedItem);
		for (int j = 0; j < rels.$length(); j++) {
			Thing relation = rels.$get(j);
			if (new Relation().isA(relation.type)) {
				Relation r = (Relation) relation;
				if (selectedItem.shortId() == r.source || selectedItem.shortId() == r.target) {
					boolean relationOk = false;
					String comment = "";
					if (selectedItem.shortId() == r.target && r.relationType == Relation.NARROWS) {
						relationOk = true;
						comment = "Subcompetency of " + ((Thing)EcRepository.getBlocking(r.target)).getName();
					}
					if (r.relationType == Relation.IS_EQUIVALENT_TO) {
						relationOk = true;
						comment = "Equivalent competency.";
					}
					if (selectedItem.shortId() == r.source && r.relationType == Relation.REQUIRES) {
						relationOk = true;
						comment = "Required by " + ((Thing)EcRepository.getBlocking(r.source)).getName();
					}
					if (relationOk)
						for (int k = 0; k < this.collection.$length(); k++) {
							Thing candidate = collection.$get(k);
							if (candidate.shortId() == r.source || candidate.shortId() == r.target) {
								appendComment(selectedItem.shortId(), comment);
								EcArray.setAdd(highlighted, candidate);
								highlight(candidate, rels, walked);
							}
						}
				}
			}
			if (new CreativeWork().isA(relation.type)) {
				CreativeWork r = (CreativeWork) relation;
				if (r.educationalAlignment != null)
					if (selectedItem.shortId() == r.url || selectedItem.shortId() == r.educationalAlignment.targetUrl) {
						for (int k = 0; k < this.collection.$length(); k++) {
							Thing candidate = collection.$get(k);
							if (candidate.shortId() == r.url || candidate.shortId() == r.educationalAlignment.targetUrl) {
								String comment = "";
								if (candidate.shortId() == r.url) {
									if (r.educationalAlignment.alignmentType == "requires")
										comment = "Requires " + ((Thing)EcRepository.getBlocking(r.educationalAlignment.targetUrl)).name;
									if (r.educationalAlignment.alignmentType == "teaches")
										comment = "Teaches " + ((Thing)EcRepository.getBlocking(r.educationalAlignment.targetUrl)).name;
									if (r.educationalAlignment.alignmentType == "assesses")
										comment = "Assesses " + ((Thing)EcRepository.getBlocking(r.educationalAlignment.targetUrl)).name;
									if (r.educationalAlignment.alignmentType == "http://schema.cassproject.org/0.2/vocab/asserts")
										comment = "Asserts " + ((Thing)EcRepository.getBlocking(r.educationalAlignment.targetUrl)).name;
									if (selectedItem.shortId() == r.educationalAlignment.targetUrl)
										highlightComment(comment);
								}
								if (candidate.shortId() == r.educationalAlignment.targetUrl) {
									if (r.educationalAlignment.alignmentType == "requires")
										comment = "Required by " + ((Thing)EcRepository.getBlocking(r.url)).name;
									if (r.educationalAlignment.alignmentType == "teaches")
										comment = "Taught by " + ((Thing)EcRepository.getBlocking(r.url)).name;
									if (r.educationalAlignment.alignmentType == "assesses")
										comment = "Assessed by " + ((Thing)EcRepository.getBlocking(r.url)).name;
									if (r.educationalAlignment.alignmentType == "http://schema.cassproject.org/0.2/vocab/asserts")
										comment = "Asserted by " + ((Thing)EcRepository.getBlocking(r.url)).name;
									if (selectedItem.shortId() == r.url)
										highlightComment(comment);
								}
								if (comment != "")
									appendComment(selectedItem.shortId(), comment);
								EcArray.setAdd(highlighted, candidate);
								highlight(candidate, rels, walked);
							}
						}
					}
			}
		}
	}

	public void deselectedEvent(String id, Boolean propegatesRight) {
		selectedEvent(id, propegatesRight);
	}
}
