var FrameworkWorkspaceScreen = function() {
    CassManagerScreen.call(this);
};
FrameworkWorkspaceScreen = stjs.extend(FrameworkWorkspaceScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "frameworks";
    prototype.getDisplayName = function() {
        return FrameworkWorkspaceScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/workspaceFramework.html";
    };
}, {data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + FrameworkWorkspaceScreen.displayName)) {
            ScreenManager.startupScreen = new FrameworkWorkspaceScreen();
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
