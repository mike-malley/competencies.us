/**
 *  Handles loading the CASS Manager settings from the settings.js file,
 *  this includes the default server to show and the message to show when the user
 *  refreshes the page and is logged out
 *  
 *  @module cass.manager
 *  @class AppSettings
 *  @static
 *  
 *  @author devlin.junker@eduworks.com
 */
var AppSettings = function() {};
AppSettings = stjs.extend(AppSettings, null, [], function(constructor, prototype) {
    constructor.FIELD_APP_NAME = "appName";
    constructor.FIELD_APP_DESCRIPTION = "appDescription";
    constructor.FIELD_SERVER_URL = "defaultServerUrl";
    constructor.FIELD_SERVER_NAME = "defaultServerName";
    constructor.FIELD_MSG_RETURN = "returnLoginMessage";
    constructor.FIELD_SHOW_REPO_MENU = "showRepoMenu";
    constructor.FIELD_SHOW_EXAMPLES_MENU = "showExamplesMenu";
    constructor.applicationName = "CASS Manager";
    constructor.applicationDescription = "Welcome to the CASS Manager. This application can connect to any instance of CASS. What would you like to do?";
    constructor.defaultServerUrl = "https://sandbox.service.cassproject.org/";
    constructor.defaultServerName = "CASS Sandbox";
    constructor.returnLoginMessage = "You were Signed Out on Page Reload. Please Sign in to Continue";
    constructor.showRepoMenu = false;
    constructor.showExamplesMenu = false;
    constructor.relationTypes = null;
    /**
     *  Loads the settings from the settings file at settings/settings.js
     *  
     *  @static
     *  @method loadSettings
     */
    constructor.loadSettings = function() {
        var urlBase = "http://" + window.location.host + window.location.pathname;
        EcRemote.getExpectingObject(urlBase, "settings/settings.js", function(settingsObj) {
            var appName = (settingsObj)[AppSettings.FIELD_APP_NAME];
            if (appName != null && appName != "") 
                AppSettings.applicationName = appName;
            var appDesc = (settingsObj)[AppSettings.FIELD_APP_DESCRIPTION];
            if (appDesc != null && appDesc != "") 
                AppSettings.applicationDescription = appDesc;
            var serverUrl = (settingsObj)[AppSettings.FIELD_SERVER_URL];
            if (serverUrl != null) 
                AppSettings.defaultServerUrl = serverUrl;
            var serverName = (settingsObj)[AppSettings.FIELD_SERVER_NAME];
            if (serverName != null) 
                AppSettings.defaultServerUrl = serverName;
            var msg = (settingsObj)[AppSettings.FIELD_MSG_RETURN];
            if (msg != null) 
                AppSettings.returnLoginMessage = msg;
            if ((settingsObj)[AppSettings.FIELD_SHOW_REPO_MENU] == "true") 
                AppSettings.showRepoMenu = true;
            if ((settingsObj)[AppSettings.FIELD_SHOW_EXAMPLES_MENU] == "true") 
                AppSettings.showExamplesMenu = true;
        }, function(p1) {
            console.error("Unable to load settings file");
        });
    };
}, {relationTypes: {name: "Map", arguments: [null, null]}}, {});
(function() {
    AppSettings.relationTypes = {"isEnabledBy": "is Enabled by", "requires": "Requires", "desires": "Desires", "narrows": "Narrows", "isRelatedTo": "is Related to", "isEquivalentTo": "is Equivalent to"};
})();
