var ProfileWorkspaceScreen = function() {
    CassManagerScreen.call(this);
};
ProfileWorkspaceScreen = stjs.extend(ProfileWorkspaceScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "profiles";
    prototype.getDisplayName = function() {
        return ProfileWorkspaceScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/workspaceProfile.html";
    };
}, {data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + ProfileWorkspaceScreen.displayName)) {
            ScreenManager.startupScreen = new ProfileWorkspaceScreen();
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
