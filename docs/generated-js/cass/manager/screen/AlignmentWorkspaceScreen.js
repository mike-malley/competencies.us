var AlignmentWorkspaceScreen = function() {
    CassManagerScreen.call(this);
};
AlignmentWorkspaceScreen = stjs.extend(AlignmentWorkspaceScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "alignments";
    prototype.getDisplayName = function() {
        return AlignmentWorkspaceScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/workspaceAlignment.html";
    };
}, {data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + AlignmentWorkspaceScreen.displayName)) {
            ScreenManager.startupScreen = new AlignmentWorkspaceScreen();
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
