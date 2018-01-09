/**
 *  Manages the storage object of the browser whether it be the session or 
 *  local storage, and provides methods for retrieving values.
 *  
 *  Also holds a list of recently viewed object ids for different classes
 *  for a specific computer in the browsers storage, this can be used
 *  to precache objects for use or to display the recently viewed objects 
 *  
 *  @module cass.manager
 *  @class SessionController
 *  @constructor
 *  
 *  @author devlin.junker@eduworks.com
 */
var StorageController = function() {
    if (localStorage != null) 
        this.storageSystem = localStorage;
     else if (sessionStorage != null) 
        this.storageSystem = sessionStorage;
    var recent = this.storageSystem["cass.recent"];
    if (recent != null && recent != "") {
        try {
            this.recent = JSON.parse(recent);
        }catch (e) {
            this.recent = {};
        }
    } else {
        this.recent = {};
    }
};
StorageController = stjs.extend(StorageController, null, [], function(constructor, prototype) {
    prototype.storageSystem = null;
    prototype.MAX_RECENT = 3;
    prototype.recent = null;
    prototype.getStoredValue = function(key) {
        return this.storageSystem[key];
    };
    prototype.setStoredValue = function(key, val) {
        this.storageSystem[key] = val;
    };
    prototype.getRecent = function(type) {
        var list = this.recent[type];
        if (list == null) {
            list = [];
            this.recent[type] = list;
            this.storageSystem["cass.recent"] = JSON.stringify(this.recent);
        }
        return list;
    };
    prototype.addRecent = function(type, id) {
        var list = this.recent[type];
        if (list == null) {
            list = [id];
        } else if (list.indexOf(id) == -1) {
            if (list.length < this.MAX_RECENT) {
                list.push(id);
            } else {
                list.shift();
                list.push(id);
            }
        }
        this.recent[type] = list;
        this.storageSystem["cass.recent"] = JSON.stringify(this.recent);
    };
    prototype.removeRecent = function(type, id) {
        if (id == null || id == undefined || id == "") {
            return;
        }
        var list = this.recent[type];
        if (list == null) {
            return;
        } else if (list.indexOf(id) == -1) {
            delete (list)[Integer.toString(list.indexOf(id))];
            this.recent[type] = list;
            this.storageSystem["cass.recent"] = JSON.stringify(this.recent);
        }
    };
}, {storageSystem: "Storage", recent: {name: "Map", arguments: [null, {name: "Array", arguments: [null]}]}}, {});
var DataViewer = function(idPrefix, callbacks) {
    EcView.call(this);
    this.prefix = idPrefix;
    this.callbacks = callbacks;
    this.dataStore = new Object();
};
DataViewer = stjs.extend(DataViewer, EcView, [], function(constructor, prototype) {
    prototype.prefix = null;
    prototype.callbacks = null;
    prototype.dataStore = null;
    prototype.getHtmlLocation = function() {
        return "partial/other/dataViewer.html";
    };
}, {callbacks: "Object", dataStore: "Object"}, {});
var AppMenu = function() {
    EcView.call(this);
};
AppMenu = stjs.extend(AppMenu, EcView, [], function(constructor, prototype) {
    prototype.getHtmlLocation = function() {
        return "partial/other/appMenu.html";
    };
    prototype.setLoggedIn = function() {};
    prototype.showRepoMenu = function(show) {};
    prototype.showExamplesMenu = function(show) {};
    prototype.buildRecentCompetencyList = function(list) {};
    prototype.buildRecentFrameworkList = function(list) {};
}, {}, {});
var FrameworkList = function(data, callbacks) {
    EcView.call(this);
    this.data = data;
    this.callbacks = callbacks;
};
FrameworkList = stjs.extend(FrameworkList, EcView, [], function(constructor, prototype) {
    prototype.data = null;
    prototype.callbacks = null;
    prototype.getHtmlLocation = function() {
        return "partial/other/frameworkList.html";
    };
}, {data: "Object", callbacks: "Object"}, {});
/**
 *  @author djunker
 * 
 * 	RepoEdit Stub for RepoEdit.js
 */
var RepoEdit = /**
 *  
 *  @param data
 *  @param saveButtonId
 *  @param messageContainerId
 */
function(data, saveButtonId, messageContainerId) {
    EcView.call(this);
    this.data = data;
    this.saveButtonId = saveButtonId;
    this.messageContainerId = messageContainerId;
};
RepoEdit = stjs.extend(RepoEdit, EcView, [], function(constructor, prototype) {
    prototype.data = null;
    prototype.saveButtonId = null;
    prototype.messageContainerId = null;
    prototype.getHtmlLocation = function() {
        return "partial/other/repoEdit.html";
    };
}, {data: "Object"}, {});
var IdentityDisplay = function(data) {
    EcView.call(this);
    this.data = data;
};
IdentityDisplay = stjs.extend(IdentityDisplay, EcView, [], function(constructor, prototype) {
    prototype.data = null;
    prototype.getHtmlLocation = function() {
        return "partial/other/identityDisplay.html";
    };
}, {data: "Object"}, {});
var Switch = function(onSwitch, switchedOn, switchName) {
    EcView.call(this);
    this.onSwitch = onSwitch;
    this.switchName = switchName;
    if (switchedOn != null) 
        this.switched = switchedOn;
};
Switch = stjs.extend(Switch, EcView, [], function(constructor, prototype) {
    prototype.onSwitch = null;
    prototype.switchName = null;
    prototype.switchId = null;
    prototype.switched = false;
    prototype.getHtmlLocation = function() {
        return "partial/other/switch.html";
    };
    prototype.display = function(containerId) {
        this.switchId = containerId + "-switch";
        if (this.switchId.startsWith("#")) 
            this.switchName = this.switchId.substring(1);
        $(containerId).find(".switch-input").prop("id", this.switchName);
        $(containerId).find(".switch-input").prop("name", this.switchName);
        $(containerId).find(".switch-paddle").prop("for", this.switchName);
        if (this.switched) 
            $(containerId).find(".switch-input").prop("checked", this.switched);
        var me = this;
        $(containerId).find(".switch-input").change(stjs.bind(this, function(ev, THIS) {
            me.switched = !me.switched;
            if (me.onSwitch != null) 
                return me.onSwitch(ev, THIS);
            return true;
        }, 1));
        ($(containerId)).foundation();
    };
    prototype.isChecked = function() {
        return $(this.switchId).prop("checked");
    };
    prototype.setChecked = function(checked) {
        $(this.switchId).prop("checked", checked);
    };
}, {onSwitch: "EventHandler"}, {});
var MessageContainer = function(idPrefix, closeMessage) {
    EcView.call(this);
    this.prefix = idPrefix;
    this.closeMessageCallback = closeMessage;
};
MessageContainer = stjs.extend(MessageContainer, EcView, [], function(constructor, prototype) {
    prototype.prefix = null;
    prototype.closeMessageCallback = null;
    prototype.getHtmlLocation = function() {
        return "partial/other/messageContainer.html";
    };
    prototype.displayAlert = function(msg, msgId) {};
    prototype.clearAlert = function(msgId) {};
}, {closeMessageCallback: "Callback0"}, {});
var ChangeTypeModal = function(changeObj, repoEditContainerId) {
    EcModal.call(this);
    this.changeObj = changeObj;
    this.repoEditContainerId = repoEditContainerId;
};
ChangeTypeModal = stjs.extend(ChangeTypeModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "small";
    prototype.changeObj = null;
    prototype.repoEditContainerId = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/changeType.html";
    };
}, {changeObj: "Object"}, {});
var ConfirmModal = function(confirmCallback, message, header) {
    EcModal.call(this);
    this.confirmCallback = confirmCallback;
    this.message = message;
    this.header = header;
};
ConfirmModal = stjs.extend(ConfirmModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "tiny";
    prototype.header = null;
    prototype.message = null;
    prototype.confirmCallback = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/confirm.html";
    };
}, {confirmCallback: "Callback0"}, {});
var RepoImportModal = function() {
    EcModal.call(this);
};
RepoImportModal = stjs.extend(RepoImportModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "medium";
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/import.html";
    };
}, {}, {});
var ChangeServerModal = function() {
    EcModal.call(this);
};
ChangeServerModal = stjs.extend(ChangeServerModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "tiny";
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/changeServer.html";
    };
}, {}, {});
/**
 *  Stub for the AddFieldModal
 *  
 *  @module cass.manager
 *  @author devlin.junker@eduworks.com
 *  @class AddOwnerModal
 *  @extends EcModal
 *  @constructor
 */
var AddOwnerModal = /**
 *  @constructor
 *  @param {Object} field
 *  @param {String} objectContainerId
 */
function(field, objectContainerId) {
    EcModal.call(this);
    this.field = field;
    this.objectContainerId = objectContainerId;
};
AddOwnerModal = stjs.extend(AddOwnerModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "small";
    prototype.field = null;
    prototype.objectContainerId = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/addOwner.html";
    };
}, {field: "Object"}, {});
var PermissionPropagationModal = function(data, cancelCallback) {
    EcModal.call(this);
    this.data = data;
    this.onCancel = cancelCallback;
};
PermissionPropagationModal = stjs.extend(PermissionPropagationModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "medium";
    prototype.data = null;
    prototype.onCancel = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/permissionPropagation.html";
    };
}, {data: "EcRemoteLinkedData", onCancel: "Callback0"}, {});
var CopyResourceModal = function(data, callback) {
    EcModal.call(this);
    this.data = data;
    this.callback = callback;
};
CopyResourceModal = stjs.extend(CopyResourceModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "medium";
    prototype.data = null;
    prototype.callback = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/copyResource.html";
    };
}, {data: "Object", callback: "Callback0"}, {});
var ImportCompetenciesModal = function(data) {
    EcModal.call(this);
    this.data = data;
};
ImportCompetenciesModal = stjs.extend(ImportCompetenciesModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "medium";
    prototype.data = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/importCompetencies.html";
    };
}, {data: "EcRemoteLinkedData"}, {});
var MessageModal = function(header, text, size, okCallback) {
    EcModal.call(this);
    this.header = header;
    this.message = text;
    if (size != null) 
        this.modalSize = size;
    this.okCallback = okCallback;
};
MessageModal = stjs.extend(MessageModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "small";
    prototype.header = "";
    prototype.message = "";
    prototype.okCallback = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/message.html";
    };
}, {okCallback: "Callback0"}, {});
var CreateIdentityModal = function(onSuccess) {
    EcModal.call(this);
    this.success = onSuccess;
};
CreateIdentityModal = stjs.extend(CreateIdentityModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "small";
    prototype.success = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/createIdentity.html";
    };
}, {success: "Callback0"}, {});
var EditRollupRuleModal = function(data, callback) {
    EcModal.call(this);
    this.data = data;
    this.closeCallback = callback;
};
EditRollupRuleModal = stjs.extend(EditRollupRuleModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "small";
    prototype.data = null;
    prototype.closeCallback = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/editRollupRule.html";
    };
}, {data: "EcRemoteLinkedData", closeCallback: {name: "Callback1", arguments: ["EcRollupRule"]}}, {});
var SaveIdModal = function(msg) {
    EcModal.call(this);
    this.msg = msg;
};
SaveIdModal = stjs.extend(SaveIdModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "tiny";
    prototype.msg = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/saveId.html";
    };
}, {}, {});
/**
 *  Stub for the AddFieldModal
 *  
 *  @module cass.manager
 *  @author devlin.junker@eduworks.com
 *  @class AddFieldModal
 *  @extends EcModal
 *  @constructor
 */
var AddFieldModal = /**
 *  @constructor
 *  @param {Object} field
 *  @param {String} repoEditContainerId
 */
function(field, repoEditContainerId) {
    EcModal.call(this);
    this.field = field;
    this.repoEditContainerId = repoEditContainerId;
};
AddFieldModal = stjs.extend(AddFieldModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "small";
    prototype.field = null;
    prototype.repoEditContainerId = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/addField.html";
    };
}, {field: "Object"}, {});
var RepoExportModal = function(data) {
    EcModal.call(this);
    this.data = data;
};
RepoExportModal = stjs.extend(RepoExportModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "medium";
    prototype.data = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/repoExport.html";
    };
}, {data: "EcRemoteLinkedData"}, {});
var AddServerModal = function(modalClose, server) {
    EcModal.call(this);
    this.closeEvent = modalClose;
    this.server = server;
};
AddServerModal = stjs.extend(AddServerModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "small";
    prototype.closeEvent = null;
    prototype.server = null;
    prototype.onClose = function() {
        if (this.closeEvent != null) 
            this.closeEvent();
        return EcView.prototype.onClose.call(this);
    };
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/addServer.html";
    };
}, {closeEvent: "Callback0"}, {});
var CreateUserModal = function() {
    EcModal.call(this);
};
CreateUserModal = stjs.extend(CreateUserModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "small";
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/createUser.html";
    };
}, {}, {});
var EncryptOptionsModal = function(callback) {
    EcModal.call(this);
    this.callback = callback;
};
EncryptOptionsModal = stjs.extend(EncryptOptionsModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "tiny";
    prototype.callback = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/encryptOptions.html";
    };
}, {callback: {name: "Callback1", arguments: ["Object"]}}, {});
var EditLevelModal = function(data, callback) {
    EcModal.call(this);
    this.data = data;
    this.closeCallback = callback;
};
EditLevelModal = stjs.extend(EditLevelModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "small";
    prototype.data = null;
    prototype.closeCallback = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/editLevel.html";
    };
}, {data: "EcRemoteLinkedData", closeCallback: {name: "Callback1", arguments: ["EcLevel"]}}, {});
var ContactGrantModal = function(contact, token, signature, close) {
    EcModal.call(this);
    this.contact = contact;
    this.token = token;
    this.signature = signature;
    this.closeEvent = close;
};
ContactGrantModal = stjs.extend(ContactGrantModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "small";
    prototype.contact = null;
    prototype.token = null;
    prototype.signature = null;
    prototype.closeEvent = null;
    prototype.onClose = function() {
        if (this.closeEvent != null) 
            this.closeEvent();
        return EcView.prototype.onClose.call(this);
    };
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/contactGrant.html";
    };
}, {contact: "EcContact", closeEvent: "Callback0"}, {});
/**
 *  Stub for the AddCompetenciesToFrameworkModal
 *  
 *  @module cass.manager
 *  @author devlin.junker@eduworks.com
 *  @class AddCompetenciesToFrameworkModal
 *  @extends EcModal
 *  @constructor
 */
var AddToFrameworkModal = /**
 *  @constructor
 *  @param {EcRemoteLinkedData || EcRemoteLinkedData[]} data
 *  			The competency or array of competencies to add to the framework selected in the modal
 */
function(data) {
    EcModal.call(this);
    this.data = data;
};
AddToFrameworkModal = stjs.extend(AddToFrameworkModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "medium";
    prototype.data = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/addToFramework.html";
    };
}, {data: "EcRemoteLinkedData"}, {});
var ContactAcceptModal = function(grant, close) {
    EcModal.call(this);
    this.grant = grant;
    this.closeEvent = close;
};
ContactAcceptModal = stjs.extend(ContactAcceptModal, EcModal, [], function(constructor, prototype) {
    prototype.closeEvent = null;
    prototype.modalSize = "small";
    prototype.grant = null;
    prototype.onClose = function() {
        if (this.closeEvent != null) 
            this.closeEvent();
        return EcView.prototype.onClose.call(this);
    };
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/contactAccept.html";
    };
}, {closeEvent: "Callback0", grant: "EcContactGrant"}, {});
var EvidenceViewModal = function(evidence) {
    EcModal.call(this);
    this.evidence = evidence;
};
EvidenceViewModal = stjs.extend(EvidenceViewModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "medium";
    prototype.evidence = null;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/viewEvidence.html";
    };
}, {evidence: {name: "Array", arguments: [null]}}, {});
var AdvancedPermissionsModal = function(data, callback, onlyReaders) {
    EcModal.call(this);
    this.data = data;
    this.saveCallback = callback;
    if (onlyReaders == null) 
        this.onlyReaders = false;
     else 
        this.onlyReaders = onlyReaders;
};
AdvancedPermissionsModal = stjs.extend(AdvancedPermissionsModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "medium";
    prototype.data = null;
    prototype.saveCallback = null;
    prototype.onlyReaders = false;
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/advancedPermissions.html";
    };
}, {data: "EcRemoteLinkedData", saveCallback: {name: "Callback1", arguments: ["Object"]}}, {});
var WelcomeScreen = function() {
    EcScreen.call(this);
};
WelcomeScreen = stjs.extend(WelcomeScreen, EcScreen, [], function(constructor, prototype) {
    constructor.displayName = "welcome";
    prototype.getDisplayName = function() {
        return WelcomeScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/welcome.html";
    };
}, {failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
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
    constructor.defaultServerUrl = "https://sandbox.cassproject.org/api/custom/";
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
/**
 *  Manages the current user's logged in state and interfaces with the server to
 *  sign in/out and create users
 * 
 *  @author devlin.junker@eduworks.com
 *  @module cass.manager
 *  @class LoginController
 *  @constructor
 */
var LoginController = /**
 *  On startup, check if the last time the user was on the page, whether or not they were signed in
 */
function(storage) {
    this.storageSystem = storage;
    this.refreshLoggedIn = this.storageSystem.getStoredValue("cass.login") == "true" ? true : false;
};
LoginController = stjs.extend(LoginController, null, [], function(constructor, prototype) {
    prototype.loginServer = null;
    prototype.identity = null;
    prototype.refreshLoggedIn = false;
    prototype.loggedIn = false;
    prototype.storageSystem = null;
    /**
     *  Setter for the boolean flag of whether or not a user is loged in
     * 
     *  @param {boolean} val
     *                   true if signed in, false if logged out
     *  @method setLoggedIn
     *  @static
     */
    prototype.setLoggedIn = function(val) {
        this.loggedIn = val;
        if (this.storageSystem != null) 
            this.storageSystem.setStoredValue("cass.login", val);
    };
    /**
     *  Getter for boolean flag of whether or not user is logged in
     * 
     *  @return {boolean}
     *  true if signed in, false if logged out
     *  @method getLoggedin
     *  @static
     */
    prototype.getLoggedIn = function() {
        return this.loggedIn;
    };
    /**
     *  If the last time the user was using the application, they were signed in this
     *  returns true (used to remind them to sign in again once they return)
     * 
     *  @return {boolean}
     *  true if previously signed in, false if not signed in last time, or user is here for
     *  the first time from this computer
     *  @method getPreviouslyLoggedIn
     *  @static
     */
    prototype.getPreviouslyLoggedIn = function() {
        return this.refreshLoggedIn;
    };
    prototype.hello = function(network, success, failure) {
        var identityManager = this.identity;
        var me = this;
        this.loginServer = new OAuth2FileBasedRemoteIdentityManager(function() {
            me.loginServer.setDefaultIdentityManagementServer(network);
            me.loginServer.startLogin(null, null);
            me.loginServer.fetch(function(p1) {
                EcIdentityManager.readContacts();
                EcRepository.cache = new Object();
                me.setLoggedIn(true);
                if (EcIdentityManager.ids.length > 0) {
                    identityManager.select(EcIdentityManager.ids[0].ppk.toPem());
                }
                success();
            }, function(p1) {
                failure(p1);
            });
        });
    };
    /**
     *  Validates a username and password on the server and then parses the user's credentials and
     *  checks if they have an admin key. Also tells the identity manager to check for contacts in
     *  local storage after signed in.
     * 
     *  @param {String} username
     *                  username of the user signing in
     *  @param {String} password
     *                  password of the user signing in
     *  @param {String} success
     *                  callback on successful login
     *  @param {String} failure
     *                  callback on error during login
     *  @method login
     */
    prototype.login = function(username, password, server, success, failure) {
        var identityManager = this.identity;
        var that = this;
        this.loginServer = new EcRemoteIdentityManager();
        this.loginServer.setDefaultIdentityManagementServer(server);
        this.loginServer.configureFromServer(function(o) {
            that.loginServer.startLogin(username, password);
            that.loginServer.fetch(function(p1) {
                EcIdentityManager.readContacts();
                EcRepository.cache = new Object();
                that.setLoggedIn(true);
                if (EcIdentityManager.ids.length > 0) {
                    identityManager.select(EcIdentityManager.ids[0].ppk.toPem());
                }
                success();
            }, function(p1) {
                failure(p1);
            });
        }, failure);
    };
    /**
     *  Sets the flags so the user is logged out, wipes all sign in data so the user is no longer
     *  authenticated and is unidentified
     * 
     *  @method logout
     */
    prototype.logout = function() {
        this.loginServer.clear();
        this.identity.selectedIdentity = null;
        EcRepository.cache = new Object();
        this.setLoggedIn(false);
        EcIdentityManager.ids = new Array();
        EcIdentityManager.clearContacts();
    };
    /**
     *  Creates a new user and saves the account details on the login server, then signs in
     *  to the new account on successful creation
     * 
     *  @param {String}            username
     *                             username of the new account
     *  @param {String}            password
     *                             password of the new account
     *  @param {String}            server
     *                             server to create account on
     *  @param {Callback0}         success
     *                             callback for successful creation and sign in
     *  @param {Callback1<String>} failure
     *                             callback for error during creation
     *  @method create
     */
    prototype.create = function(username, password, server, success, failure) {
        if (this.loginServer == null || this.loginServer == undefined) {
            this.loginServer = new EcRemoteIdentityManager();
        }
        this.loginServer.setDefaultIdentityManagementServer(server);
        var me = this;
        this.loginServer.configureFromServer(function(p1) {
            me.loginServer.startLogin(username, password);
            me.loginServer.create(function(p1) {
                me.login(username, password, server, success, failure);
            }, failure);
        }, failure);
    };
    /**
     *  Saves the users credentials and contacts to the server
     * 
     *  @param {Callback0}         success
     *                             callback for successful save
     *  @param {Callback1<String>} failure
     *                             callback for error during save
     *  @method save
     */
    prototype.save = function(success, failure) {
        this.loginServer.commit(function(p1) {
            success();
        }, function(p1) {
            failure(p1);
        });
    };
}, {loginServer: "RemoteIdentityManagerInterface", identity: "IdentityController", storageSystem: "StorageController"}, {});
/**
 *  Created by fray on 3/10/17.
 */
var AlignmentEditorColumn = function() {
    EcView.call(this);
    this.collection = new Array();
    this.selected = new Array();
    this.highlighted = new Array();
};
AlignmentEditorColumn = stjs.extend(AlignmentEditorColumn, EcView, [], function(constructor, prototype) {
    constructor.COMPETENCY = Competency.myType;
    constructor.CREDENTIAL = new Credential().type;
    constructor.COURSE = new Course().type;
    constructor.RESOURCE = new CreativeWork().type;
    constructor.BADGE = new Badge().type;
    prototype.columnIndex = -1;
    prototype.containerId = null;
    prototype.getHtmlLocation = function() {
        return "partial/other/alignmentEditor.html";
    };
    prototype.selectedCategory = null;
    prototype.selectedSource = null;
    prototype.selectedCollection = null;
    prototype.sourceRepo = null;
    prototype.filter = null;
    prototype.type = null;
    prototype.urlCollectionIdentifier = null;
    prototype.collectionSearchString = null;
    prototype.collection = null;
    prototype.selected = null;
    prototype.highlighted = null;
    prototype.weight = null;
    prototype.lift = null;
    prototype.relations = null;
    prototype.left = null;
    prototype.right = null;
    prototype.screenHook = null;
    prototype.display = function(containerId) {
        this.containerId = containerId;
        this.bindControls(containerId);
    };
    prototype.bindControls = function(containerId) {};
    prototype.toggleNavigation = function() {};
    prototype.getType = function() {
        if (this.selectedCategory == "course") 
            return AlignmentEditorColumn.COURSE;
        if (this.selectedCategory == "competency") 
            return AlignmentEditorColumn.COMPETENCY;
        if (this.selectedCategory == "credential") 
            return AlignmentEditorColumn.CREDENTIAL;
        if (this.selectedCategory == "resource") 
            return AlignmentEditorColumn.RESOURCE;
        if (this.selectedCategory == "badge") 
            return AlignmentEditorColumn.BADGE;
        return null;
    };
    prototype.populate = function() {};
    prototype.redraw = function() {};
    prototype.redrawJs = function() {};
    prototype.redrawJsInit = function() {};
    prototype.redrawJsFinal = function() {};
    prototype.selectElement = function(id) {
        for (var i = 0; i < this.selected.length; i++) 
            if (this.selected[i].shortId() == id) {
                this.selected.splice(i, 1);
                if (this.right != null) 
                    this.right.deselectedEvent(id, true);
                if (this.left != null) 
                    this.left.deselectedEvent(id, false);
                return;
            }
        for (var i = 0; i < this.collection.length; i++) 
            if (this.collection[i].shortId() == id) {
                this.selected.push(this.collection[i]);
                if (this.right != null) 
                    this.right.selectedEvent(id, true);
                if (this.left != null) 
                    this.left.selectedEvent(id, false);
                return;
            }
    };
    prototype.selectedEvent = function(id, propegatesRight) {};
    prototype.deselectedEvent = function(id, propegatesRight) {};
    prototype.populateListCourses = function() {
        var me = this;
        var params = new Object();
        (params)["size"] = 5000;
        this.sourceRepo.searchWithParams("@type:Course", params, function(ecRemoteLinkedData) {}, function(strings) {
            me.collection = strings;
            me.selected = new Array();
            me.highlighted = new Array();
            me.populate();
        }, function(s) {});
    };
    prototype.populateListCredentials = function() {
        var me = this;
        var params = new Object();
        (params)["size"] = 5000;
        this.sourceRepo.searchWithParams("@type:Credential", params, function(ecRemoteLinkedData) {}, function(credentials) {
            me.collection = credentials;
            me.selected = new Array();
            me.highlighted = new Array();
            me.populate();
        }, function(s) {});
    };
    prototype.populateListBadges = function() {
        var me = this;
        var params = new Object();
        (params)["size"] = 5000;
        this.sourceRepo.searchWithParams("@type:Badge", params, function(ecRemoteLinkedData) {}, function(badges) {
            me.collection = badges;
            me.selected = new Array();
            me.highlighted = new Array();
            me.populate();
        }, function(s) {});
    };
    prototype.populateListCompetencies = function() {
        var me = this;
        EcFramework.get(this.selectedCollection, function(framework) {
            var eah = new EcAsyncHelper();
            me.collection = new Array();
            me.selected = new Array();
            me.highlighted = new Array();
            if (framework.competency != undefined && framework.competency != null) {
                eah.each(framework.competency, function(s, callback0) {
                    EcCompetency.get(s, function(ecCompetency) {
                        me.collection.push(ecCompetency);
                        callback0();
                    }, function(s) {
                        callback0();
                    });
                }, function(strings) {
                    me.populate();
                });
            } else {
                me.populate();
            }
        }, function(s) {});
    };
    prototype.getRelations = function() {
        var query = "";
        var me = this;
        if (me.selectedCategory == "competency") {
            for (var i = 0; i < me.collection.length; i++) {
                if (i > 0) 
                    query += " OR ";
                query += "source:\"" + me.collection[i].shortId() + "\"";
            }
            var params = new Object();
            (params)["size"] = 5000;
            EcAlignment.search(this.sourceRepo, query, function(strings) {
                me.relations = strings;
                if (me.screenHook != null) 
                    me.screenHook();
                 else 
                    me.redraw();
            }, function(s) {}, params);
        } else {
            for (var i = 0; i < me.collection.length; i++) {
                if (i > 0) 
                    query += " OR ";
                query += "url:\"" + me.collection[i].shortId() + "\"";
            }
            if (query != null && query != "") 
                query = "(" + query + ") AND " + new CreativeWork().getSearchStringByType();
             else 
                query = new CreativeWork().getSearchStringByType();
            var params = new Object();
            (params)["size"] = 5000;
            me.relations = new Array();
            me.sourceRepo.searchWithParams(query, params, function(ecRemoteLinkedData) {
                var cw = new CreativeWork();
                cw.copyFrom(ecRemoteLinkedData);
                me.relations.push(cw);
            }, function(strings) {
                if (me.screenHook != null) 
                    me.screenHook();
                 else 
                    me.redraw();
            }, function(s) {});
        }
    };
    prototype.populateListResources = function() {
        var me = this;
        var params = new Object();
        (params)["size"] = 5000;
        this.sourceRepo.searchWithParams(new CreativeWork().getSearchStringByType(), params, function(ecRemoteLinkedData) {}, function(strings) {
            me.collection = strings;
            me.selected = new Array();
            me.highlighted = new Array();
            me.populate();
        }, function(s) {});
    };
}, {sourceRepo: "EcRepository", collection: {name: "Array", arguments: ["Thing"]}, selected: {name: "Array", arguments: ["Thing"]}, highlighted: {name: "Array", arguments: ["Thing"]}, weight: {name: "Map", arguments: [null, null]}, lift: {name: "Map", arguments: [null, null]}, relations: {name: "Array", arguments: ["Thing"]}, left: "AlignmentEditorColumn", right: "AlignmentEditorColumn", screenHook: "Callback0"}, {});
/**
 *  Manages the current selected identity for the user, and interfaces 
 *  the EBAC Identity Manager library to provide helper functions for 
 *  ownership and key identification
 *  
 *  @module cass.manager
 *  @class IdentityController
 *  @constructor
 *  
 *  @author devlin.junker@eduworks.com
 */
var IdentityController = function() {
    EcIdentityManager.clearContacts();
};
IdentityController = stjs.extend(IdentityController, null, [], function(constructor, prototype) {
    prototype.selectedIdentity = null;
    /**
     *  Sets the currently selected identity to the ppk specified, only works if the ppk is in the 
     *  list of identities that the user owns
     *  
     *  @method select
     *  @param {String} ppkPem
     *  			PEM of the identity that will be set to the current identity
     */
    prototype.select = function(ppkPem) {
        var clickedPpk = EcPpk.fromPem(ppkPem);
        for (var i = 0; i < EcIdentityManager.ids.length; i++) 
            if (EcIdentityManager.ids[i].ppk.equals(clickedPpk)) 
                this.selectedIdentity = EcIdentityManager.ids[i];
    };
    /**
     *  Clears the selected identity, so the user will be identified as public for any actions
     *  that they make going forward
     *  
     *  @method unselect
     */
    prototype.unselect = function() {
        this.selectedIdentity = null;
    };
    constructor.unknownContact = new EcContact();
    /**
     *  Returns the contact that is associated with the PEM given, looks at both the user's
     *  identities and contacts to match the PEM. The Contact returned will contain the display
     *  name that the user set for the PEM
     * 
     *  @method lookup
     *  @param {String} pkPem 
     *  			PEM of the contact to lookup
     *  @return Contact that contains the displayName and public key, if the user
     *  			does not have a display name stored for the PEM in either their contacts or identities,
     *  			will return the Unknown Contact which contains the key and a display name of "Unknown"
     */
    prototype.lookup = function(pkPem) {
        var candidatePk = EcPk.fromPem(pkPem);
        for (var i = 0; i < EcIdentityManager.ids.length; i++) {
            if (EcIdentityManager.ids[i].ppk.toPk().equals(candidatePk)) {
                var newContact = new EcContact();
                newContact.pk = candidatePk;
                newContact.displayName = EcIdentityManager.ids[i].displayName;
                return newContact;
            }
        }
        for (var i = 0; i < EcIdentityManager.contacts.length; i++) 
            if (EcIdentityManager.contacts[i].pk.equals(candidatePk)) 
                return EcIdentityManager.contacts[i];
        IdentityController.unknownContact.pk = candidatePk;
        IdentityController.unknownContact.displayName = "Unknown";
        return IdentityController.unknownContact;
    };
    /**
     *  Adds a Key to the list of user identities managed by the EcIdentityManager
     *  
     *  @method addKey
     *  @param {String} ppk
     *  			PEM representation of PPK Key to save to user identities
     *  @param {String} displayName 
     *  			Name to associate with the key to be saved, to identify it
     *  @param {Callback0} success
     *  			Callback function once the key has been added
     */
    prototype.addKey = function(ppk, displayName, success) {
        var ident = new EcIdentity();
        ident.ppk = EcPpk.fromPem(ppk);
        ident.displayName = displayName;
        EcIdentityManager.addIdentity(ident);
        if (success != null) 
            success();
    };
    /**
     *  Adds a contact to the list of user's contacts managed by EcIdentityManager
     *  
     *  @method addContact
     *  @param {String} pk
     *  			PEM representation of PK Key to save user contact
     *  @param {String} displayName
     *  			Name to associate with the key to be saved, to identify it
     *  @param {Callback0} success
     *  			Callback function once the contact has been added
     */
    prototype.addContact = function(pk, displayName, success) {
        var contact = new EcContact();
        contact.pk = EcPk.fromPem(pk);
        contact.displayName = displayName;
        EcIdentityManager.addContact(contact);
        if (success != null) 
            success();
    };
    /**
     *  Generates a new Encryption Key to save to the identity manager list
     *  
     *  @method generateIdentity
     *  @param {Callback1<EcIdentity>} success
     *  			callback, once they key has been generated and added to the identity manager
     *  @param {String} displayName
     *  			display name for the key that is being generated to identify it
     */
    prototype.generateIdentity = function(success, displayName) {
        EcPpk.generateKeyAsync(function(p1) {
            var ident = new EcIdentity();
            ident.ppk = p1;
            if (displayName != null && displayName != "") 
                ident.displayName = displayName;
            EcIdentityManager.addIdentity(ident);
            if (success != null) 
                success(ident);
        });
    };
    /**
     *  Helper function to determine if the logged in user owns a piece of data from the repository,
     *  useful for showing certain actions
     *  
     *  @method owns
     *  @param {EcRemoteLiinkedData} data 
     *  			The object to check for ownership of
     *  @return {boolean} true if owned, false if not owned by the current user
     */
    prototype.owns = function(data) {
        if ((data)["hasOwner"] != null) 
            for (var i = 0; i < EcIdentityManager.ids.length; i++) {
                if (data.hasOwner(EcIdentityManager.ids[i].ppk.toPk())) {
                    return true;
                }
            }
        return false;
    };
    /**
     *  Helper function to determine if the logged in user can modify a piece of data, this means 
     *  that they either own the data, or it is public
     *  
     *  @method canEdit
     *  @param {EcRemoteLinkedData} data
     *  			The object to check for ability to edit
     *  @return {boolean} true if editable, false if not
     */
    prototype.canEdit = function(data) {
        if (data.owner == null || data.owner.length == 0) 
            return true;
        for (var i = 0; i < EcIdentityManager.ids.length; i++) {
            if (data.canEdit(EcIdentityManager.ids[i].ppk.toPk())) {
                return true;
            }
        }
        return false;
    };
    /**
     *  Helper function to determine if the current user is associated with the key passed in
     *  
     *  @method isCurrentUser
     *  @param {String} pk
     *  			PEM representation of pk to check
     *  @return {boolean} true if the current logged in user is associated with the key
     */
    prototype.isCurrentUser = function(pk) {
        for (var i = 0; i < EcIdentityManager.ids.length; i++) {
            if (EcIdentityManager.ids[i].ppk.toPk().toString() == pk) {
                return true;
            }
        }
        return false;
    };
}, {selectedIdentity: "EcIdentity", unknownContact: "EcContact"}, {});
/**
 *  Manages the server that the search controller (through EcRepository) and
 *  the identity controller (through EcIdentityManager) communicate with.
 *  Allows the user to change the server that the UI is talking with via the change server modal.
 * 
 *  @author devlin.junker@eduworks.com
 *  @module cass.manager
 *  @class ServerController
 *  @constructor
 */
var ServerController = /**
 *  On Startup:
 *  1) See if repo on this server, if so add the server given and the found server to the list
 *  2) Determine storage system to load/save list of other servers
 *  3) Switch to a previously selected server if the UI has been used before on this browser
 *  4) Set interfaces to point at endpoint
 * 
 *  @param {String} defaultServer
 *                  Base URL of the service end points on the server
 *  @param {String} defaultServerName
 *                  Name of the Default Server (displayed to the user when selecting servers)
 *  @constructor
 */
function(storageSystem, defaultServer, defaultServerName) {
    this.onServerChange = new Array();
    this.onLoad = new Array();
    this.storageSystem = storageSystem;
    if (storageSystem == null) 
        this.storageSystem = new StorageController();
    this.serverList = {};
    this.repoInterface = new EcRepository();
    var me = this;
    if (window.location.protocol == "http") {
        var r = new EcRepository();
        r.autoDetectRepositoryAsync(function() {
            me.addServer("This Server (" + r.selectedServer + ")", r.selectedServer, null, null);
        }, function(o) {});
    }
    var cachedList = storageSystem.getStoredValue("cass.server.list");
    cachedList = JSON.parse(cachedList);
    if (cachedList == null) 
        cachedList = new Object();
    var repos = {};
    var finalCachedList = cachedList;
    var eah = new EcAsyncHelper();
    eah.each(EcObject.keys(cachedList), function(serverName, callback0) {
        me.testAddEndpoint(serverName, (finalCachedList)[serverName], callback0);
    }, function(strings) {
        me.serversLoaded(defaultServer, defaultServerName);
    });
};
ServerController = stjs.extend(ServerController, null, [], function(constructor, prototype) {
    prototype.serverList = null;
    prototype.storageSystem = null;
    prototype.selectedServerUrl = null;
    prototype.selectedServerName = null;
    prototype.repoInterface = null;
    prototype.onServerChange = null;
    prototype.onLoad = null;
    prototype.serversLoaded = function(defaultServer, defaultServerName) {
        this.addServer(defaultServerName, defaultServer, null, null);
        var cachedSelected = this.storageSystem.getStoredValue("cass.server.selected");
        if (cachedSelected != null && this.serverList[cachedSelected] != null) {
            this.selectedServerName = cachedSelected;
            this.selectedServerUrl = this.serverList[this.selectedServerName];
        } else if (defaultServer != null) {
            this.selectedServerUrl = defaultServer;
            if (defaultServerName != null) {
                this.selectedServerName = defaultServerName;
            } else {
                this.selectedServerName = "Default";
            }
        } else {
            this.selectedServerUrl = "http://localhost:8080/api/custom/";
            this.selectedServerName = "Default (Localhost)";
            console.warn("Default Server Not Given, Set to LocalHost");
        }
        this.storageSystem.setStoredValue("cass.server.selected", this.selectedServerName);
        if (this.serverList[this.selectedServerName] == null) 
            this.addServer(this.selectedServerName, this.selectedServerUrl, null, null);
        EcRepository.caching = true;
        this.repoInterface.selectedServer = this.selectedServerUrl;
        for (var i = 0; i < this.onServerChange.length; i++) 
            this.onServerChange[i]();
        for (var i = 0; i < this.onLoad.length; i++) 
            this.onLoad[i]();
    };
    prototype.testAddEndpoint = function(serverName, serverUrl, after) {
        var that = this;
        var repo = new EcRepository();
        repo.selectedServer = serverUrl;
        repo.autoDetectRepositoryAsync(function() {
            that.addServer(serverName, serverUrl, null, null);
            after();
        }, function(error) {
            after();
        });
    };
    prototype.getServerList = function() {
        return this.serverList;
    };
    /**
     *  Adds a server to this list of servers that can be selected from the change server modal
     * 
     *  @param {String}            name
     *                             Name of the server to be displayed in the list
     *  @param {String}            url
     *                             URL of the server that corresponds to the name
     *  @param {Callback0}         success
     *                             Callback when the server is successfully added to the list
     *  @param {Callback1<String>} failure
     *                             Callback for any errors during adding to the list
     *  @method addServer
     */
    prototype.addServer = function(name, url, success, failure) {
        if (name == null) {
            if (failure != null) 
                failure("Cannot Add Server without a name");
            return;
        }
        if (url == null) {
            if (failure != null) 
                failure("Cannot Add Server with blank url");
            return;
        }
        this.serverList[name] = url;
        this.storageSystem.setStoredValue("cass.server.list", JSON.stringify(this.serverList));
        for (var i = 0; i < this.onServerChange.length; i++) 
            this.onServerChange[i]();
        if (success != null) 
            success();
    };
    /**
     *  Sets the server that the UI will communicate with, changes where the EcRepository and
     *  EcRemoteIdentity Manager are pointing to and communicating with
     * 
     *  @param {String}            identifier
     *                             Name of the server that was selected from the list, used to find URL to point at
     *  @param {Callback0}         success
     *                             Callback when successfully change where the components are pointing and set the
     *                             selected server values
     *  @param {Callback1<String>} failure
     *                             Callback if any errors occur during changing where the components are pointing
     *  @method selectServer
     */
    prototype.selectServer = function(identifier, success, failure) {
        var that = this;
        var oldServer = this.selectedServerUrl;
        var oldServerName = this.selectedServerName;
        for (var serverName in this.serverList) {
            if (identifier.equals(serverName) || identifier.equals(this.serverList[serverName])) {
                this.selectedServerName = serverName;
                this.selectedServerUrl = this.serverList[serverName];
                if (this.repoInterface != null) 
                    this.repoInterface.selectedServer = this.selectedServerUrl;
                this.repoInterface.autoDetectRepositoryAsync(function() {
                    that.storageSystem.setStoredValue("cass.server.selected", that.selectedServerName);
                    that.checkForAdmin(success);
                }, function(error) {
                    if (that.repoInterface != null) 
                        that.repoInterface.selectedServer = oldServer;
                    that.selectedServerUrl = oldServer;
                    that.selectedServerName = oldServerName;
                    if (failure != null) 
                        failure(error);
                });
            }
        }
    };
    prototype.admin = false;
    /**
     *  Setter for boolean flag of whether or not the current user is admin
     * 
     *  @param val true = admin, false = not admin
     *  @method setAdmin
     */
    prototype.setAdmin = function(val) {
        this.admin = val;
    };
    /**
     *  Getter for boolean flag of whether or not current user is admin
     * 
     *  @return {boolean}
     *  true = admin, false = not admin
     *  @method getAdmin
     */
    prototype.getAdmin = function() {
        return this.admin;
    };
    prototype.checkForAdmin = function(success) {
        var me = this;
        me.repoInterface.fetchServerAdminKeys(function(keys) {
            me.setAdmin(false);
            for (var i = 0; i < EcIdentityManager.ids.length; i++) {
                if (keys.indexOf(EcIdentityManager.ids[i].ppk.toPk().toPem()) != -1) {
                    me.setAdmin(true);
                    break;
                }
            }
            if (success != null) 
                success();
        }, function(p1) {
            me.setAdmin(false);
            if (success != null) 
                success();
        });
    };
    /**
     *  Used to retrieve the interface to the repository we are currently pointed at
     * 
     *  @return {EcRepository}
     *  Repository Interface to call search/get/delete methods on
     *  @method getRepoInterface
     */
    prototype.getRepoInterface = function() {
        return this.repoInterface;
    };
    /**
     *  Used during setup to set which EcRepository the server controller manages
     * 
     *  @param {EcRepository} repoInterface
     *                        The interface to the repository to be used by the search controller
     *  @method setRepoInterface
     */
    prototype.setRepoInterface = function(repoInterface) {
        this.repoInterface = repoInterface;
        repoInterface.selectedServer = this.selectedServerUrl;
    };
}, {serverList: {name: "Map", arguments: [null, null]}, storageSystem: "StorageController", repoInterface: "EcRepository", onServerChange: {name: "Array", arguments: ["Callback0"]}, onLoad: {name: "Array", arguments: ["Callback0"]}}, {});
/**
 *  Created by fray on 3/23/17.
 */
var AlignmentExplorerColumn = function() {
    AlignmentEditorColumn.call(this);
};
AlignmentExplorerColumn = stjs.extend(AlignmentExplorerColumn, AlignmentEditorColumn, [], function(constructor, prototype) {
    prototype.idToComments = null;
    prototype.idToCommentHighlight = null;
    prototype.selectElement = function(id) {
        for (var i = 0; i < this.selected.length; i++) 
            if (this.selected[i].shortId() == id) {
                this.selected.splice(i, 1);
                if (this.right != null) 
                    this.right.deselectedEvent(id, true);
                if (this.left != null) 
                    this.left.deselectedEvent(id, false);
                return;
            }
        for (var i = 0; i < this.collection.length; i++) 
            if (this.collection[i].shortId() == id) {
                this.selected.push(this.collection[i]);
                if (this.right != null) 
                    this.right.selectedEvent(id, true);
                if (this.left != null) 
                    this.left.selectedEvent(id, false);
                return;
            }
    };
    prototype.selectedEvent = function(id, propegatesRight) {
        if (this.screenHook != null) 
            this.screenHook();
    };
    prototype.redraw = function() {
        var sel = null;
        if (this.left != null) 
            sel = this.left.selected;
        var rels = this.relations;
        if (rels == null) 
            rels = new Array();
        if (this.left != null) 
            rels = rels.concat(this.left.relations);
        if (sel != null) {
            this.idToComments = new Object();
            this.idToCommentHighlight = new Object();
            this.highlighted = new Array();
            for (var i = 0; i < sel.length; i++) {
                var t = sel[i];
                this.highlight(t, rels, new Array());
            }
            this.selected = this.highlighted;
        }
        this.redrawJs();
    };
    prototype.redrawJs = function() {};
    prototype.redrawJsInit = function() {};
    prototype.appendComment = function(id, comment) {
        var tray = (this.idToComments)[id];
        if (tray == null) {
            tray = new Array();
            (this.idToComments)[id] = tray;
        }
        EcArray.setAdd(tray, comment);
    };
    prototype.highlightComment = function(id) {
        var tray = (this.idToComments)[id];
        if (tray == null) {
            (this.idToCommentHighlight)[id] = true;
        }
    };
    prototype.highlight = function(selectedItem, rels, walked) {
        if (EcArray.has(walked, selectedItem)) 
            return;
        walked.push(selectedItem);
        if (!EcArray.has(this.highlighted, selectedItem)) 
            if (EcArray.has(this.collection, selectedItem)) 
                this.highlighted.push(selectedItem);
        for (var j = 0; j < rels.length; j++) {
            var relation = rels[j];
            if (new Relation().isA(relation.type)) {
                var r = relation;
                if (selectedItem.shortId() == r.source || selectedItem.shortId() == r.target) {
                    var relationOk = false;
                    var comment = "";
                    if (selectedItem.shortId() == r.target && r.relationType == Relation.NARROWS) {
                        relationOk = true;
                        comment = "Subcompetency of " + (EcRepository.getBlocking(r.target)).getName();
                    }
                    if (r.relationType == Relation.IS_EQUIVALENT_TO) {
                        relationOk = true;
                        comment = "Equivalent competency.";
                    }
                    if (selectedItem.shortId() == r.source && r.relationType == Relation.REQUIRES) {
                        relationOk = true;
                        comment = "Required by " + (EcRepository.getBlocking(r.source)).getName();
                    }
                    if (relationOk) 
                        for (var k = 0; k < this.collection.length; k++) {
                            var candidate = this.collection[k];
                            if (candidate.shortId() == r.source || candidate.shortId() == r.target) {
                                this.appendComment(selectedItem.shortId(), comment);
                                EcArray.setAdd(this.highlighted, candidate);
                                this.highlight(candidate, rels, walked);
                            }
                        }
                }
            }
            if (new CreativeWork().isA(relation.type)) {
                var r = relation;
                if (r.educationalAlignment != null) 
                    if (selectedItem.shortId() == r.url || selectedItem.shortId() == r.educationalAlignment.targetUrl) {
                        for (var k = 0; k < this.collection.length; k++) {
                            var candidate = this.collection[k];
                            if (candidate.shortId() == r.url || candidate.shortId() == r.educationalAlignment.targetUrl) {
                                var comment = "";
                                if (candidate.shortId() == r.url) {
                                    if (r.educationalAlignment.alignmentType == "requires") 
                                        comment = "Requires " + (EcRepository.getBlocking(r.educationalAlignment.targetUrl)).name;
                                    if (r.educationalAlignment.alignmentType == "teaches") 
                                        comment = "Teaches " + (EcRepository.getBlocking(r.educationalAlignment.targetUrl)).name;
                                    if (r.educationalAlignment.alignmentType == "assesses") 
                                        comment = "Assesses " + (EcRepository.getBlocking(r.educationalAlignment.targetUrl)).name;
                                    if (r.educationalAlignment.alignmentType == "http://schema.cassproject.org/0.2/vocab/asserts") 
                                        comment = "Asserts " + (EcRepository.getBlocking(r.educationalAlignment.targetUrl)).name;
                                    if (selectedItem.shortId() == r.educationalAlignment.targetUrl) 
                                        this.highlightComment(comment);
                                }
                                if (candidate.shortId() == r.educationalAlignment.targetUrl) {
                                    if (r.educationalAlignment.alignmentType == "requires") 
                                        comment = "Required by " + (EcRepository.getBlocking(r.url)).name;
                                    if (r.educationalAlignment.alignmentType == "teaches") 
                                        comment = "Taught by " + (EcRepository.getBlocking(r.url)).name;
                                    if (r.educationalAlignment.alignmentType == "assesses") 
                                        comment = "Assessed by " + (EcRepository.getBlocking(r.url)).name;
                                    if (r.educationalAlignment.alignmentType == "http://schema.cassproject.org/0.2/vocab/asserts") 
                                        comment = "Asserted by " + (EcRepository.getBlocking(r.url)).name;
                                    if (selectedItem.shortId() == r.url) 
                                        this.highlightComment(comment);
                                }
                                if (comment != "") 
                                    this.appendComment(selectedItem.shortId(), comment);
                                EcArray.setAdd(this.highlighted, candidate);
                                this.highlight(candidate, rels, walked);
                            }
                        }
                    }
            }
        }
    };
    prototype.deselectedEvent = function(id, propegatesRight) {
        this.selectedEvent(id, propegatesRight);
    };
}, {idToComments: "Object", idToCommentHighlight: "Object", sourceRepo: "EcRepository", collection: {name: "Array", arguments: ["Thing"]}, selected: {name: "Array", arguments: ["Thing"]}, highlighted: {name: "Array", arguments: ["Thing"]}, weight: {name: "Map", arguments: [null, null]}, lift: {name: "Map", arguments: [null, null]}, relations: {name: "Array", arguments: ["Thing"]}, left: "AlignmentEditorColumn", right: "AlignmentEditorColumn", screenHook: "Callback0"}, {});
/**
 *  Main entry point of the application. Figures out the settings and
 *  starts the EC UI Framework at the appropriate screen.
 *  
 *  @module cass.manager
 *  @class AppController
 *  @static
 *  
 *  @author devlin.junker@eduworks.com
 */
var AppController = function() {};
AppController = stjs.extend(AppController, null, [], function(constructor, prototype) {
    constructor.topBarContainerId = "#menuContainer";
    /**
     *  Manages the server connection by storing and configuring 
     *  the CASS instance endpoint for the rest of the application
     *  and managing the interfaces to it.  
     *  
     *  @property serverController
     *  @static
     *  @type ServerController
     */
    constructor.serverController = null;
    /**
     *  Manages the current user's identities and contacts through the
     *  KBAC libraries. 
     *  
     *  @property identityController
     *  @static
     *  @type IdentityController
     */
    constructor.identityController = null;
    /**
     *  Handles the login/logout and admin communications with the server.
     *  
     *  @property loginController
     *  @static
     *  @type LoginController
     */
    constructor.loginController = null;
    /**
     *  Handles the browser storage
     *  
     *  @property sessionController
     *  @static
     *  @type SessionController
     */
    constructor.storageController = null;
    /**
     *  Entry point of the application
     *  
     *  @param {String[]} args
     *  			Not used at all...
     */
    constructor.main = function(args) {
        AppController.identityController = new IdentityController();
        AppController.storageController = new StorageController();
        AppController.loginController = new LoginController(AppController.storageController);
        AppController.serverController = new ServerController(AppController.storageController, AppSettings.defaultServerUrl, AppSettings.defaultServerName);
        AppController.serverController.onLoad.push(function() {
            AppSettings.loadSettings();
            AppController.loginController.identity = AppController.identityController;
            ScreenManager.setDefaultScreen(new WelcomeScreen());
            $(window.document).ready(function(arg0, arg1) {
                ViewManager.showView(new AppMenu(), AppController.topBarContainerId, function() {
                    ($(window.document)).foundation();
                    var menu = ViewManager.getView(AppController.topBarContainerId);
                    menu.showRepoMenu(AppSettings.showRepoMenu);
                    menu.showExamplesMenu(AppSettings.showExamplesMenu);
                });
                var server = URLParams.get("server");
                if (server != null && server != undefined) {
                    for (var name in AppController.serverController.serverList) {
                        if (AppController.serverController.serverList[name].startsWith(server)) {
                            AppController.serverController.selectServer(name, null, null);
                            return true;
                        }
                    }
                    ModalManager.showModal(new AddServerModal(null, server), null);
                }
                return true;
            });
        });
    };
}, {serverController: "ServerController", identityController: "IdentityController", loginController: "LoginController", storageController: "StorageController"}, {});
if (!stjs.mainCallDisabled) 
    AppController.main();
var LoginModal = function(success, cancel, warningMessage) {
    EcModal.call(this);
    this.loginSuccess = success;
    this.cancel = cancel;
    this.warning = warningMessage;
};
LoginModal = stjs.extend(LoginModal, EcModal, [], function(constructor, prototype) {
    prototype.modalSize = "small";
    prototype.cancel = null;
    prototype.loginSuccess = null;
    prototype.warning = null;
    prototype.onClose = function() {
        if (this.cancel != null) 
            this.cancel();
        return EcView.prototype.onClose.call(this);
    };
    prototype.getModalSize = function() {
        return this.modalSize;
    };
    prototype.getHtmlLocation = function() {
        return "partial/modal/login.html";
    };
    prototype.submitOauth2 = function(server) {
        var me = this;
        var failure = function(err) {
            ViewManager.getView("#loginMessageContainer").displayAlert(err, "loginFail");
        };
        ViewManager.getView("#loginMessageContainer").clearAlert("loginFail");
        AppController.loginController.hello(server, function() {
            AppController.serverController.checkForAdmin(function() {
                if (me.loginSuccess != null) {
                    me.loginSuccess(URLParams.getParams());
                } else {
                    ModalManager.hideModal();
                }
                new AppMenu().setLoggedIn();
            });
        }, failure);
    };
    prototype.submitLogin = function(userId, password, server) {
        var me = this;
        var failure = function(err) {
            ViewManager.getView("#loginMessageContainer").displayAlert(err, "loginFail");
        };
        ViewManager.getView("#loginMessageContainer").clearAlert("loginFail");
        AppController.loginController.login(userId, password, server, function() {
            AppController.serverController.checkForAdmin(function() {
                AppController.serverController.checkForAdmin(function() {
                    if (me.loginSuccess != null) {
                        me.loginSuccess(URLParams.getParams());
                    } else {
                        ModalManager.hideModal();
                    }
                    new AppMenu().setLoggedIn();
                });
            });
        }, failure);
    };
}, {cancel: "Callback0", loginSuccess: {name: "Callback1", arguments: ["Object"]}}, {});
var CassManagerScreen = function() {
    EcScreen.call(this);
};
CassManagerScreen = stjs.extend(CassManagerScreen, EcScreen, [], function(constructor, prototype) {
    prototype.data = null;
    prototype.setData = function(data) {
        this.data = data;
    };
    constructor.reloadLoginCallback = function(o) {
        ModalManager.hideModal();
        var currentScreen = ScreenManager.getCurrentScreen();
        if (o == null) 
            currentScreen.setData(URLParams.getParams());
         else 
            currentScreen.setData(o);
        ScreenManager.replaceScreen(currentScreen, null, null);
    };
    constructor.reloadShowLoginCallback = function() {
        CassManagerScreen.showLoginModalIfReload();
    };
    constructor.showLoginModalIfReload = function() {
        if (AppController.loginController.getPreviouslyLoggedIn() && !AppController.loginController.getLoggedIn()) {}
    };
}, {data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
/**
 *  Created by fray on 3/23/17.
 */
var AlignmentExplorerScreen = function() {
    CassManagerScreen.call(this);
};
AlignmentExplorerScreen = stjs.extend(AlignmentExplorerScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "AlignmentExplorer";
    prototype.columns = null;
    prototype.containerId = null;
    prototype.addColumn = function() {
        var column = new AlignmentExplorerColumn();
        column.columnIndex = this.columns.length;
        var lastColumn = null;
        if (this.columns.length > 0) 
            lastColumn = this.columns[this.columns.length - 1];
        if (lastColumn != null) {
            lastColumn.right = column;
            column.left = lastColumn;
        }
        this.columns.push(column);
        this.addedColumn(column);
        var me = this;
        column.screenHook = function() {
            me.updateControls();
            me.reflow();
        };
        column.display(this.containerId);
        this.reflow();
        return column;
    };
    prototype.reflow = function() {};
    prototype.addedColumn = function(column) {
        ViewManager.showView(column, this.createColumnDiv(), function() {});
    };
    prototype.updateControls = function() {};
    prototype.createColumnDiv = function() {
        return null;
    };
    prototype.getDisplayName = function() {
        return AlignmentExplorerScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/alignmentExplorer.html";
    };
    prototype.display = function(containerId) {
        this.containerId = containerId;
        this.columns = new Array();
        this.addColumn();
        this.addColumn();
        this.addColumn();
        this.addColumn();
        this.bindControls(containerId);
    };
    prototype.bindControls = function(containerId) {};
}, {columns: {name: "Array", arguments: ["AlignmentExplorerColumn"]}, data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + AlignmentExplorerScreen.displayName)) {
            ScreenManager.startupScreen = new AlignmentExplorerScreen();
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var UserIdentityScreen = function() {
    CassManagerScreen.call(this);
};
UserIdentityScreen = stjs.extend(UserIdentityScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "identity";
    prototype.getDisplayName = function() {
        return UserIdentityScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/userIdentity.html";
    };
}, {data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + UserIdentityScreen.displayName)) {
            var hashSplit = (window.document.location.hash.split("?"));
            if (AppController.loginController.getPreviouslyLoggedIn() || (hashSplit.length == 2 && hashSplit[1].startsWith("action"))) {
                ScreenManager.startupScreen = new UserIdentityScreen();
                ModalManager.showModal(new LoginModal(function(o) {
                    ModalManager.hideModal();
                }, function() {
                    if (!AppController.loginController.getLoggedIn()) {
                        ScreenManager.replaceScreen(new WelcomeScreen(), null, null);
                    } else {
                        ScreenManager.reloadCurrentScreen(null);
                    }
                }, AppSettings.returnLoginMessage), null);
            }
        }
    });
})();
var RollupRuleSearchScreen = function(lastViewed, query, ownership) {
    CassManagerScreen.call(this);
    this.lastViewed = lastViewed;
    this.query = query;
    this.ownership = ownership;
};
RollupRuleSearchScreen = stjs.extend(RollupRuleSearchScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "ruleSearch";
    prototype.lastViewed = null;
    prototype.query = null;
    prototype.ownership = null;
    prototype.getDisplayName = function() {
        return RollupRuleSearchScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/ruleSearch.html";
    };
}, {lastViewed: "Object", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + RollupRuleSearchScreen.displayName)) {
            var hashSplit = (window.document.location.hash.split("?"));
            if (hashSplit.length > 1) {
                var query = null;
                var ownership = null;
                var param = hashSplit[1];
                var paramSplit = (param.split("&"));
                for (var i = 0; i < paramSplit.length; i++) {
                    var paramPiece = paramSplit[i];
                    if (paramPiece.startsWith("query")) 
                        query = paramSplit[i].split("=")[1];
                     else if (paramPiece.startsWith("ownership")) 
                        ownership = paramSplit[i].split("=")[1];
                }
                if (query != null || ownership != null) {
                    ScreenManager.startupScreen = new RollupRuleSearchScreen(null, query, ownership);
                    CassManagerScreen.showLoginModalIfReload();
                    return;
                }
            }
            ScreenManager.startupScreen = new RollupRuleSearchScreen(null, null, null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
/**
 *  Created by fray on 1/8/18.
 */
var CassEditorScreen = function(data) {
    CassManagerScreen.call(this);
    this.data = data;
};
CassEditorScreen = stjs.extend(CassEditorScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "cassEditor";
    prototype.mc = null;
    prototype.getData = function() {
        return this.data;
    };
    prototype.getDisplayName = function() {
        return CassEditorScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/cassEditorScreen.html";
    };
    prototype.display = function(containerId) {
        var server = "?server=" + AppController.serverController.selectedServerUrl;
        var origin = "&origin=" + window.location.origin;
        var viewer = AppController.loginController.getLoggedIn() ? "&user=wait" : "&view=true";
        $(containerId).find("#cassEditor").attr("src", "https://cassproject.github.io/cass-editor/index.html" + server + origin + viewer);
        if (AppController.loginController.getLoggedIn()) {
            $(containerId).find("#cassEditor").ready(stjs.bind(this, function(ev, THIS) {
                setTimeout(function() {
                    var ident = new Object();
                    (ident)["action"] = "identity";
                    (ident)["identity"] = AppController.identityController.selectedIdentity.ppk.toPem();
                    ident = JSON.stringify(ident);
                    ($(containerId).find("#cassEditor")[0].contentWindow).postMessage(ident, "https://cassproject.github.io");
                }, 1000);
                return false;
            }, 1));
        }
    };
}, {mc: "MessageContainer", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + CassEditorScreen.displayName)) {
            var urlParameters = (URLParams.getParams());
            ScreenManager.startupScreen = new CassEditorScreen(null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var LevelSearchScreen = function(lastViewed, query, ownership) {
    CassManagerScreen.call(this);
    this.lastViewed = lastViewed;
    this.query = query;
    this.ownership = ownership;
};
LevelSearchScreen = stjs.extend(LevelSearchScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "levelSearch";
    prototype.lastViewed = null;
    prototype.query = null;
    prototype.ownership = null;
    prototype.getDisplayName = function() {
        return LevelSearchScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/levelSearch.html";
    };
}, {lastViewed: "Object", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + LevelSearchScreen.displayName)) {
            var hashSplit = (window.document.location.hash.split("?"));
            if (hashSplit.length > 1) {
                var query = null;
                var ownership = null;
                var param = hashSplit[1];
                var paramSplit = (param.split("&"));
                for (var i = 0; i < paramSplit.length; i++) {
                    var paramPiece = paramSplit[i];
                    if (paramPiece.startsWith("query")) 
                        query = paramSplit[i].split("=")[1];
                     else if (paramPiece.startsWith("ownership")) 
                        ownership = paramSplit[i].split("=")[1];
                }
                if (query != null || ownership != null) {
                    ScreenManager.startupScreen = new LevelSearchScreen(null, query, ownership);
                    CassManagerScreen.showLoginModalIfReload();
                    return;
                }
            }
            ScreenManager.startupScreen = new LevelSearchScreen(null, null, null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var AssertionSearchScreen = function(lastViewed) {
    CassManagerScreen.call(this);
    this.lastViewed = lastViewed;
};
AssertionSearchScreen = stjs.extend(AssertionSearchScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "assertionAll";
    prototype.lastViewed = null;
    prototype.getDisplayName = function() {
        return AssertionSearchScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/assertionSearch.html";
    };
}, {lastViewed: "Object", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + AssertionSearchScreen.displayName)) {
            ScreenManager.startupScreen = new AssertionSearchScreen(null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var RepoCreateScreen = function(data) {
    CassManagerScreen.call(this);
    this.data = data;
};
RepoCreateScreen = stjs.extend(RepoCreateScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "repoCreate";
    prototype.data = null;
    prototype.getDisplayName = function() {
        return RepoCreateScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/repoCreate.html";
    };
}, {data: "Object", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + RepoCreateScreen.displayName)) {
            ScreenManager.startupScreen = new RepoCreateScreen(null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var FrameworkSearchScreen = function(lastViewed, query, ownership) {
    CassManagerScreen.call(this);
    this.lastViewed = lastViewed;
    this.query = query;
    this.ownership = ownership;
};
FrameworkSearchScreen = stjs.extend(FrameworkSearchScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "frameworkSearch";
    prototype.lastViewed = null;
    prototype.query = null;
    prototype.ownership = null;
    prototype.getDisplayName = function() {
        return FrameworkSearchScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/frameworkSearch.html";
    };
}, {lastViewed: "Object", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + FrameworkSearchScreen.displayName)) {
            var hashSplit = (window.document.location.hash.split("?"));
            if (hashSplit.length > 1) {
                var query = null;
                var ownership = null;
                var param = hashSplit[1];
                var paramSplit = (param.split("&"));
                for (var i = 0; i < paramSplit.length; i++) {
                    var paramPiece = paramSplit[i];
                    if (paramPiece.startsWith("query")) 
                        query = paramSplit[i].split("=")[1];
                     else if (paramPiece.startsWith("ownership")) 
                        ownership = paramSplit[i].split("=")[1];
                }
                if (query != null || ownership != null) {
                    ScreenManager.startupScreen = new FrameworkSearchScreen(null, query, ownership);
                    CassManagerScreen.showLoginModalIfReload();
                    return;
                }
            }
            ScreenManager.startupScreen = new FrameworkSearchScreen(null, null, null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var CompetencySearchScreen = function(lastViewed, query, ownership) {
    CassManagerScreen.call(this);
    this.lastViewed = lastViewed;
    this.query = query;
    this.ownership = ownership;
};
CompetencySearchScreen = stjs.extend(CompetencySearchScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "competencySearch";
    prototype.lastViewed = null;
    prototype.query = null;
    prototype.ownership = null;
    prototype.getDisplayName = function() {
        return CompetencySearchScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/competencySearch.html";
    };
}, {lastViewed: "Object", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + CompetencySearchScreen.displayName)) {
            var hashSplit = (window.document.location.hash.split("?"));
            if (hashSplit.length > 1) {
                var query = null;
                var ownership = null;
                var param = hashSplit[1];
                var paramSplit = (param.split("&"));
                for (var i = 0; i < paramSplit.length; i++) {
                    var paramPiece = paramSplit[i];
                    if (paramPiece.startsWith("query")) 
                        query = paramSplit[i].split("=")[1];
                     else if (paramPiece.startsWith("ownership")) 
                        ownership = paramSplit[i].split("=")[1];
                }
                if (query != null || ownership != null) {
                    ScreenManager.startupScreen = new CompetencySearchScreen(null, query, ownership);
                    CassManagerScreen.showLoginModalIfReload();
                    return;
                }
            }
            ScreenManager.startupScreen = new CompetencySearchScreen(null, null, null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var AlignmentEditorScreen = function() {
    CassManagerScreen.call(this);
    this.columns = new Array();
};
AlignmentEditorScreen = stjs.extend(AlignmentEditorScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "AlignmentEditor";
    prototype.columns = null;
    prototype.containerId = null;
    prototype.addColumn = function() {
        var column = new AlignmentEditorColumn();
        column.columnIndex = this.columns.length;
        var lastColumn = null;
        if (this.columns.length > 0) 
            lastColumn = this.columns[this.columns.length - 1];
        if (lastColumn != null) {
            lastColumn.right = column;
            column.left = lastColumn;
        }
        this.columns.push(column);
        this.addedColumn(column);
        var me = this;
        column.screenHook = function() {
            me.updateControls();
            me.reflow();
        };
        column.display(this.containerId);
        this.reflow();
        return column;
    };
    prototype.createRelations = function(relationType) {
        if (AppController.identityController.selectedIdentity == null) {
            if (AppController.loginController.getLoggedIn() == true) {
                (ViewManager.getView("#alignmentEditorMessageContainer")).displayAlert("You need to select an identity to own the new relationship", "noIdentity");
            } else {
                (ViewManager.getView("#alignmentEditorMessageContainer")).displayAlert("You need to sign in in order to create a new relationship", "noIdentity");
            }
            this.reflow();
            return;
        }
        (ViewManager.getView("#alignmentEditorMessageContainer")).clearAlert("noIdentity");
        var left = this.columns[0].selected;
        var right = this.columns[1].selected;
        var leftFramework = null;
        var rightFramework = null;
        if (this.columns[0].selectedCollection != null) 
            leftFramework = EcFramework.getBlocking(this.columns[0].selectedCollection);
        if (this.columns[1].selectedCollection != null) 
            rightFramework = EcFramework.getBlocking(this.columns[1].selectedCollection);
        var me = this;
        for (var i = 0; i < left.length; i++) 
            for (var j = 0; j < right.length; j++) {
                if (this.columns[0].selectedCategory == "competency") 
                    if (this.columns[1].selectedCategory == "competency") {
                        var a = new EcAlignment();
                        a.generateId(this.columns[0].sourceRepo.selectedServer);
                        if (AppController.identityController.selectedIdentity == null) 
                             throw new RuntimeException("No identity selected.");
                        a.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
                        a.source = left[i].shortId();
                        a.target = right[j].shortId();
                        a.relationType = relationType;
                        var found = false;
                        var relations = this.columns[0].relations;
                        for (var ii = 0; ii < relations.length; ii++) {
                            var r = relations[ii];
                            if (r.source == a.source && r.target == a.target && r.relationType == a.relationType) {
                                found = true;
                                if (leftFramework != null) 
                                    if (AppController.identityController.canEdit(leftFramework)) 
                                        leftFramework.removeRelation(r.id);
                                if (rightFramework != null) 
                                    if (AppController.identityController.canEdit(rightFramework)) 
                                        rightFramework.removeRelation(r.id);
                                EcRepository._delete(r, function(s) {
                                    me.columns[0].getRelations();
                                }, function(s) {
                                     throw new RuntimeException(s);
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
                            EcRepository.save(a, function(s) {
                                me.columns[0].getRelations();
                            }, function(s) {
                                 throw new RuntimeException(s);
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
    };
    prototype.createAlignments = function(relationType) {
        if (AppController.identityController.selectedIdentity == null) {
            if (AppController.loginController.getLoggedIn() == true) {
                (ViewManager.getView("#alignmentEditorMessageContainer")).displayAlert("You need to select an identity to own the new relationship", "noIdentity");
            } else {
                (ViewManager.getView("#alignmentEditorMessageContainer")).displayAlert("You need to sign in in order to create a new relationship", "noIdentity");
            }
            this.reflow();
            return;
        }
        var left = this.columns[0].selected;
        var right = this.columns[1].selected;
        var me = this;
        for (var i = 0; i < left.length; i++) 
            for (var j = 0; j < right.length; j++) {
                if ((this.columns[0].selectedCategory != "competency") || (this.columns[1].selectedCategory != "competency")) {
                    var a = new CreativeWork();
                    a.generateId(this.columns[0].sourceRepo.selectedServer);
                    if (AppController.identityController.selectedIdentity == null) 
                         throw new RuntimeException("No identity selected.");
                    a.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
                    a.url = left[i].shortId();
                    a.educationalAlignment = new AlignmentObject();
                    a.educationalAlignment.alignmentType = relationType;
                    a.educationalAlignment.educationalFramework = this.columns[1].selectedCollection;
                    a.educationalAlignment.targetUrl = right[j].shortId();
                    a.educationalAlignment.targetName = right[j].name;
                    a.educationalAlignment.targetDescription = right[j].description;
                    var found = false;
                    var relations = this.columns[0].relations;
                    for (var ii = 0; ii < relations.length; ii++) {
                        var r = relations[ii];
                        if (r.educationalAlignment != null) 
                            if (r.url == a.url && r.educationalAlignment.targetUrl == a.educationalAlignment.targetUrl && r.educationalAlignment.alignmentType == a.educationalAlignment.alignmentType) {
                                found = true;
                                EcRepository._delete(r, function(s) {
                                    me.columns[0].getRelations();
                                }, function(s) {
                                     throw new RuntimeException(s);
                                });
                            }
                    }
                    if (!found) {
                        relations.push(a);
                        EcRepository.save(a, function(s) {
                            me.columns[0].getRelations();
                        }, function(s) {
                             throw new RuntimeException(s);
                        });
                    }
                }
            }
    };
    prototype.reflow = function() {};
    prototype.addedColumn = function(column) {
        ViewManager.showView(column, this.createColumnDiv(), function() {});
    };
    prototype.updateControls = function() {};
    prototype.createColumnDiv = function() {
        return null;
    };
    prototype.getDisplayName = function() {
        return AlignmentEditorScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/alignmentEditor.html";
    };
    prototype.display = function(containerId) {
        this.containerId = containerId;
        this.columns = new Array();
        this.addColumn();
        ($(this.createColumnDiv()).attr("id", "mappingFrameworkColumn")).css("display", "none").html("<div style='font-weight: 800;'>Mapping Framework:</div><select id='mappingFrameworkServerSelect'><option disabled='' selected=''>-- Select Server --</option></select><select 'mappingFrameworkSelect'><option disabled='' selected=''>-- Select Framework or Create New --</option></select>");
        this.addColumn();
        this.bindControls(containerId);
        var me = this;
        ViewManager.showView(new MessageContainer("alignmentEditor", function() {
            me.reflow();
        }), "#alignmentEditorMessageContainer", function() {
            if (AppController.identityController.selectedIdentity == null || AppController.identityController.selectedIdentity == undefined) {
                if (AppController.loginController.getLoggedIn() == true) {
                    (ViewManager.getView("#alignmentEditorMessageContainer")).displayAlert("You need to select an identity to own any relationships or alignments", "noIdentity");
                } else {
                    (ViewManager.getView("#alignmentEditorMessageContainer")).displayAlert("You need to sign in in order to create a relationship or alignment", "noIdentity");
                }
            }
        });
    };
    prototype.bindControls = function(containerId) {};
}, {columns: {name: "Array", arguments: ["AlignmentEditorColumn"]}, data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + AlignmentEditorScreen.displayName)) {
            ScreenManager.startupScreen = new AlignmentEditorScreen();
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var RepoSearchScreen = function(lastViewed, query, ownership, types) {
    CassManagerScreen.call(this);
    this.lastViewed = lastViewed;
    this.query = query;
    this.ownership = ownership;
    this.types = types;
};
RepoSearchScreen = stjs.extend(RepoSearchScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "repoSearch";
    prototype.lastViewed = null;
    prototype.query = null;
    prototype.ownership = null;
    prototype.types = null;
    prototype.getDisplayName = function() {
        return RepoSearchScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/repoSearch.html";
    };
}, {lastViewed: "Object", types: {name: "Array", arguments: [null]}, data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + RepoSearchScreen.displayName)) {
            var urlParameters = (URLParams.getParams());
            var query = urlParameters["query"];
            var ownership = urlParameters["ownership"];
            var ts = urlParameters["types"];
            var types = null;
            if (ts != null) 
                types = (ts.toString().split(","));
            if (query != null || ownership != null || types != null) {
                ScreenManager.startupScreen = new RepoSearchScreen(null, query, ownership, types);
                CassManagerScreen.showLoginModalIfReload();
                return;
            }
            ScreenManager.startupScreen = new RepoSearchScreen(null, null, null, null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var FileManagerScreen = function() {
    CassManagerScreen.call(this);
};
FileManagerScreen = stjs.extend(FileManagerScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "fileManager";
    prototype.getDisplayName = function() {
        return FileManagerScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/fileManager.html";
    };
}, {data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + FileManagerScreen.displayName)) {
            ScreenManager.startupScreen = new FileManagerScreen();
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var RelationshipSearchScreen = function(lastViewed, query, ownership) {
    CassManagerScreen.call(this);
    this.lastViewed = lastViewed;
    this.query = query;
    this.ownership = ownership;
};
RelationshipSearchScreen = stjs.extend(RelationshipSearchScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "relationSearch";
    prototype.lastViewed = null;
    prototype.query = null;
    prototype.ownership = null;
    prototype.getDisplayName = function() {
        return RelationshipSearchScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/relationshipSearch.html";
    };
}, {lastViewed: "Object", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + RelationshipSearchScreen.displayName)) {
            var hashSplit = (window.document.location.hash.split("?"));
            if (hashSplit.length > 1) {
                var query = null;
                var ownership = null;
                var param = hashSplit[1];
                var paramSplit = (param.split("&"));
                for (var i = 0; i < paramSplit.length; i++) {
                    var paramPiece = paramSplit[i];
                    if (paramPiece.startsWith("query")) 
                        query = paramSplit[i].split("=")[1];
                     else if (paramPiece.startsWith("ownership")) 
                        ownership = paramSplit[i].split("=")[1];
                }
                if (query != null || ownership != null) {
                    ScreenManager.startupScreen = new RelationshipSearchScreen(null, query, ownership);
                    CassManagerScreen.showLoginModalIfReload();
                    return;
                }
            }
            ScreenManager.startupScreen = new RelationshipSearchScreen(null, null, null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var UserAdminScreen = function() {
    CassManagerScreen.call(this);
};
UserAdminScreen = stjs.extend(UserAdminScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "admin";
    prototype.getDisplayName = function() {
        return UserAdminScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/userAdmin.html";
    };
}, {data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + UserAdminScreen.displayName)) {
            var hashSplit = (window.document.location.hash.split("?"));
            if (AppController.loginController.getPreviouslyLoggedIn() || (hashSplit.length == 2 && hashSplit[1].startsWith("action"))) {
                ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
                ModalManager.showModal(new LoginModal(function(o) {
                    ModalManager.hideModal();
                    if (!AppController.serverController.getAdmin()) {
                        ScreenManager.replaceScreen(new UserIdentityScreen(), null, null);
                    } else {
                        ScreenManager.replaceScreen(new UserAdminScreen(), null, null);
                    }
                }, function() {
                    if (!AppController.loginController.getLoggedIn()) {
                        ScreenManager.replaceScreen(new WelcomeScreen(), null, null);
                    } else if (AppController.serverController.getAdmin()) {
                        ScreenManager.replaceScreen(new UserAdminScreen(), null, null);
                    } else {
                        ScreenManager.reloadCurrentScreen(null);
                    }
                }, AppSettings.returnLoginMessage), null);
            }
        }
    });
})();
var AssertionEditScreen = function(data) {
    CassManagerScreen.call(this);
    this.data = data;
};
AssertionEditScreen = stjs.extend(AssertionEditScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "assertionEdit";
    prototype.data = null;
    prototype.getDisplayName = function() {
        return AssertionEditScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/assertionEdit.html";
    };
}, {data: "Object", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + AssertionEditScreen.displayName)) {
            var urlParameters = (URLParams.getParams());
            var id = urlParameters["id"];
            if (id != null) {
                EcAssertion.get(id, function(data) {
                    ScreenManager.replaceScreen(new AssertionEditScreen(data), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                }, function(p1) {
                    ScreenManager.replaceScreen(new AssertionSearchScreen(null), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                });
                ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
                return;
            }
            ScreenManager.startupScreen = new AssertionEditScreen(null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var FrameworkEditScreen = function(data) {
    CassManagerScreen.call(this);
    this.data = data;
};
FrameworkEditScreen = stjs.extend(FrameworkEditScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "frameworkEdit";
    prototype.data = null;
    prototype.getDisplayName = function() {
        return FrameworkEditScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/frameworkEdit.html";
    };
}, {data: "Object", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + FrameworkEditScreen.displayName)) {
            var urlParameters = (URLParams.getParams());
            var id = urlParameters["id"];
            if (id != null) {
                EcFramework.get(id, function(data) {
                    ScreenManager.replaceScreen(new FrameworkEditScreen(data), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                }, function(p1) {
                    ScreenManager.replaceScreen(new FrameworkSearchScreen(null, null, null), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                });
                ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
                return;
            }
            ScreenManager.startupScreen = new FrameworkEditScreen(null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var FrameworkViewScreen = function(data) {
    CassManagerScreen.call(this);
    this.data = data;
};
FrameworkViewScreen = stjs.extend(FrameworkViewScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "frameworkView";
    prototype.mc = null;
    prototype.getData = function() {
        return this.data;
    };
    prototype.getDisplayName = function() {
        return FrameworkViewScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/frameworkView.html";
    };
    prototype.display = function(containerId) {};
}, {mc: "MessageContainer", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + FrameworkViewScreen.displayName)) {
            var urlParameters = (URLParams.getParams());
            var id = urlParameters["id"];
            if (id != null) {
                EcFramework.get(id, function(data) {
                    ScreenManager.replaceScreen(new FrameworkViewScreen(data), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                    CassManagerScreen.showLoginModalIfReload();
                }, function(p1) {
                    ScreenManager.replaceScreen(new FrameworkSearchScreen(null, null, null), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                    CassManagerScreen.showLoginModalIfReload();
                });
                ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
                return;
            }
            ScreenManager.startupScreen = new FrameworkSearchScreen(null, null, null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var AssertionViewScreen = function(data) {
    CassManagerScreen.call(this);
    this.data = data;
};
AssertionViewScreen = stjs.extend(AssertionViewScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "assertionView";
    prototype.data = null;
    prototype.getDisplayName = function() {
        return AssertionViewScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/assertionView.html";
    };
}, {data: "Object", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + AssertionViewScreen.displayName)) {
            var urlParameters = (URLParams.getParams());
            var id = urlParameters["id"];
            if (id != null) {
                EcAssertion.get(id, function(data) {
                    ScreenManager.replaceScreen(new AssertionViewScreen(data), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                    CassManagerScreen.showLoginModalIfReload();
                }, function(p1) {
                    ScreenManager.replaceScreen(new CompetencySearchScreen(null, null, null), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                    CassManagerScreen.showLoginModalIfReload();
                });
                ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
                return;
            }
            ScreenManager.startupScreen = new AssertionSearchScreen(null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var CompetencyEditScreen = function(data, frameworkIdToAddCompetencyTo) {
    CassManagerScreen.call(this);
    this.data = data;
    this.frameworkId = frameworkIdToAddCompetencyTo;
};
CompetencyEditScreen = stjs.extend(CompetencyEditScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "competencyEdit";
    prototype.frameworkId = null;
    prototype.getDisplayName = function() {
        return CompetencyEditScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/competencyEdit.html";
    };
}, {data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + CompetencyEditScreen.displayName)) {
            var urlParameters = (URLParams.getParams());
            var id = urlParameters["id"];
            if (id != null) {
                EcCompetency.get(id, function(data) {
                    ScreenManager.replaceScreen(new CompetencyEditScreen(data, urlParameters["frameworkId"]), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                }, function(p1) {
                    ScreenManager.replaceScreen(new CompetencySearchScreen(null, null, null), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                });
                ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
                return;
            }
            ScreenManager.startupScreen = new CompetencyEditScreen(null, null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var CompetencyViewScreen = function(data) {
    CassManagerScreen.call(this);
    this.data = data;
};
CompetencyViewScreen = stjs.extend(CompetencyViewScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "competencyView";
    prototype.data = null;
    prototype.getDisplayName = function() {
        return CompetencyViewScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/competencyView.html";
    };
    prototype.getData = function() {
        return this.data;
    };
    prototype.mc = null;
    prototype.display = function(containerId) {
        if (this.getData().id != null) {
            var params = new Object();
            (params)["id"] = this.getData().id;
            ScreenManager.setScreenParameters(params);
        }
        ViewManager.showView(this.mc = new MessageContainer("competencyView", null), "#competencyViewMessageContainer", null);
        this.autoConfigure($(containerId));
        var me = this;
        EcCompetency.get(this.getData().id, function(competency) {
            AppController.storageController.addRecent(EcCompetency.myType, me.getData().id);
            (ViewManager.getView(AppController.topBarContainerId)).buildRecentCompetencyList(AppController.storageController.getRecent(EcCompetency.myType));
            me.data = competency;
            me.bindControls();
            me.predisplayCompetency();
        }, function(msg) {
            EcCompetency.get(EcRemoteLinkedData.trimVersionFromUrl(me.getData().id), function(framework) {
                me.data = framework;
                me.bindControls();
                me.predisplayCompetency();
            }, function(msg) {
                me.errorRetrieving(msg);
            });
        });
    };
    prototype.predisplayCompetency = function() {
        var me = this;
        me.autoRemove($("body"), "competency");
        me.autoRemove($("body"), "relation");
        me.autoRemove($("body"), "rollupRule");
        me.autoRemove($("body"), "level");
        me.autoAppend($("body"), "competency");
        me.autoFill($("body"), me.getData());
        this.getData().levels(AppController.serverController.getRepoInterface(), function(p1) {
            me.autoFill(me.autoAppend($("[ec-container='level']"), "level"), p1);
        }, (me)["errorFindingLevels"], function(p1) {
            if (p1.length == 0) 
                $("[ec-container='level']").text("None.");
            me.getData().rollupRules(AppController.serverController.getRepoInterface(), function(p1) {
                me.autoFill(me.autoAppend($("[ec-container='rollupRule']"), "rollupRule"), p1);
            }, (me)["errorFindingRollupRules"], function(p1) {
                if (p1.length == 0) 
                    $("[ec-container='rollupRule']").text("None.");
                me.getData().relations(AppController.serverController.getRepoInterface(), function(p1) {
                    me.autoFill(me.autoAppend($("[ec-container='relation']"), "relation"), p1);
                    me.bindControls();
                }, (me)["errorFindingRelations"], function(p1) {
                    if (p1.length == 0) 
                        $("[ec-container='relation']").text("None.");
                });
            });
        });
    };
    prototype.errorRetrieving = function(err) {
        if (err == null) 
            err = "Unable to Connect to Server to Retrieve Framework";
        this.mc.displayAlert(err, "getFramework");
    };
    prototype.bindControls = function() {};
}, {data: "Object", mc: "MessageContainer", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + CompetencyViewScreen.displayName)) {
            var urlParameters = (URLParams.getParams());
            var id = urlParameters["id"];
            if (id != null) {
                EcCompetency.get(id, function(data) {
                    ScreenManager.replaceScreen(new CompetencyViewScreen(data), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                    CassManagerScreen.showLoginModalIfReload();
                }, function(p1) {
                    ScreenManager.replaceScreen(new CompetencySearchScreen(null, null, null), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                    CassManagerScreen.showLoginModalIfReload();
                });
                ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
                return;
            }
            ScreenManager.startupScreen = new CompetencySearchScreen(null, null, null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var RepoViewScreen = function(data) {
    CassManagerScreen.call(this);
    this.data = data;
};
RepoViewScreen = stjs.extend(RepoViewScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "repoView";
    prototype.data = null;
    prototype.getDisplayName = function() {
        return RepoViewScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/repoView.html";
    };
}, {data: "Object", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + RepoViewScreen.displayName)) {
            var urlParameters = (URLParams.getParams());
            var id = urlParameters["id"];
            if (id != null) {
                EcRepository.get(id, function(data) {
                    ScreenManager.replaceScreen(new RepoViewScreen(data), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                }, function(p1) {
                    ScreenManager.replaceScreen(new RepoSearchScreen(null, null, null, null), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                });
                ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
                return;
            }
            ScreenManager.startupScreen = new RepoSearchScreen(null, null, null, null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var RelationshipViewScreen = function(data) {
    CassManagerScreen.call(this);
    this.data = data;
};
RelationshipViewScreen = stjs.extend(RelationshipViewScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "relationView";
    prototype.data = null;
    prototype.getDisplayName = function() {
        return RelationshipViewScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/relationshipView.html";
    };
}, {data: "Object", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + RelationshipViewScreen.displayName)) {
            var urlParameters = (URLParams.getParams());
            var id = urlParameters["id"];
            if (id != null) {
                EcAlignment.get(id, function(data) {
                    ScreenManager.replaceScreen(new RelationshipViewScreen(data), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                    CassManagerScreen.showLoginModalIfReload();
                }, function(p1) {
                    ScreenManager.replaceScreen(new RelationshipSearchScreen(null, null, null), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                    CassManagerScreen.showLoginModalIfReload();
                });
                ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
                return;
            }
            ScreenManager.startupScreen = new RelationshipSearchScreen(null, null, null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
var RelationshipEditScreen = function(data) {
    CassManagerScreen.call(this);
    this.data = data;
};
RelationshipEditScreen = stjs.extend(RelationshipEditScreen, CassManagerScreen, [], function(constructor, prototype) {
    constructor.displayName = "relationEdit";
    prototype.data = null;
    prototype.getDisplayName = function() {
        return RelationshipEditScreen.displayName;
    };
    prototype.getHtmlLocation = function() {
        return "partial/screen/relationshipEdit.html";
    };
}, {data: "Object", data: "Object", reloadLoginCallback: {name: "Callback1", arguments: ["Object"]}, reloadShowLoginCallback: "Callback0", failure: {name: "Callback1", arguments: [null]}, nameToTemplate: "Object"}, {});
(function() {
    ScreenManager.addStartupScreenCallback(function() {
        if (window.document.location.hash.startsWith("#" + RelationshipEditScreen.displayName)) {
            var urlParameters = (URLParams.getParams());
            var id = urlParameters["id"];
            if (id != null) {
                EcAlignment.get(id, function(data) {
                    ScreenManager.replaceScreen(new RelationshipEditScreen(data), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                }, function(p1) {
                    ScreenManager.replaceScreen(new RelationshipSearchScreen(null, null, null), CassManagerScreen.reloadShowLoginCallback, urlParameters);
                });
                ScreenManager.startupScreen = ScreenManager.LOADING_STARTUP_PAGE;
                return;
            }
            var source = urlParameters["source"];
            if (source != null) {
                var data = new Object();
                (data)["source"] = source;
                ScreenManager.startupScreen = new RelationshipEditScreen(data);
                CassManagerScreen.showLoginModalIfReload();
                return;
            }
            var target = urlParameters["target"];
            if (target != null) {
                var data = new Object();
                (data)["target"] = target;
                ScreenManager.startupScreen = new RelationshipEditScreen(data);
                CassManagerScreen.showLoginModalIfReload();
                return;
            }
            ScreenManager.startupScreen = new RelationshipEditScreen(null);
            CassManagerScreen.showLoginModalIfReload();
        }
    });
})();
/**
 * Handles adding a new field to the RepoEdit Container on RepoCreateScreen
 * and RepoViewScreen.
 * 
 * TODO: Need to fix and make work better
 * 
 * @module cass.manager
 * @class AddFieldModal
 * 
 * @author devlin.junker@eduworks.com
 */
var AddFieldModal = (function(AddFieldModal){	
	
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf AddFieldModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	AddFieldModal.prototype.display = function(containerId)
	{
		var addingTo = this.field;
		
		var dataEdit = ViewManager.getView(this.repoEditContainerId);
		
		ViewManager.showView(new MessageContainer("addField"), "#addFieldMessageContainer");
		
		if (addingTo.children("ul").length > 0)
			$(".objectProperties").hide();
		else
			$(".objectProperties").show();
		
		if(dataEdit != undefined)
		{
			$( "#addFieldModalText" ).click(function(){   
				var fieldName = $("#addFieldModalName").val();
				
				if(fieldName != "" )
				{
					ViewManager.getView("#addFieldMessageContainer").clearAlert("emptyText");
					if(addingTo.find("[field="+fieldName+"]").size() > 0){
						ViewManager.getView("#addFieldMessageContainer").displayAlert("Field with that name already exists", "exists");
					}else{
						dataEdit.addField(addingTo, fieldName, "value");
						ModalManager.hideModal();
					}
				}
				else if(addingTo.children("ul").length > 0){
					dataEdit.addField(addingTo, fieldName, "value");
					ModalManager.hideModal();
				}
				else
				{
					ViewManager.getView("#addFieldMessageContainer").displayAlert("Unable to add Text without a field name", "emptyText");
				}
			});

			$( "#addFieldModalArray" ).click(function(){ 
				var fieldName = $("#addFieldModalName").val();
				
				if(fieldName != "")
				{
					ViewManager.getView("#addFieldMessageContainer").clearAlert("emptyArr");
					if(addingTo.find("[field="+fieldName+"]").size() > 0){
						ViewManager.getView("#addFieldMessageContainer").displayAlert("Field with that name already exists", "exists");
					}else{
						dataEdit.addField(addingTo, fieldName, new Array());
						ModalManager.hideModal();
					}
				}
				else if(addingTo.children("ul").length > 0 )
				{
					dataEdit.addField(addingTo, fieldName, new Array());
					ModalManager.hideModal();
				}
				else
				{
					ViewManager.getView("#addFieldMessageContainer").displayAlert("Unable to add Array without a field name", "emptyArr");
				}
			});

			$( "#addFieldModalJsonLd" ).click(function(){ 
				var fieldName = $("#addFieldModalName").val();

				
				if(fieldName != "" || addingTo.children("ul").length > 0)
				{
					ViewManager.getView("#addFieldMessageContainer").clearAlert("emptyObj");
					if(fieldName != "" && addingTo.find("[field="+fieldName+"]").size() > 0 && addingTo.children("ul").length == 0){
						ViewManager.getView("#addFieldMessageContainer").displayAlert("Field with that name already exists", "exists");
						return;
					}
					
					$("#typeSelectRow").removeClass("hide");
					
					$("#addBtn").click(function(){
						if(fieldName != "" && addingTo.find("[field="+fieldName+"]").size() > 0){	
							ViewManager.getView("#addFieldMessageContainer").displayAlert("Field with that name already exists", "exists");
						}
						
						else if(fieldName != "" || addingTo.children("ul").length > 0)
						{
							var t = new Thing();
							dataEdit.addField(addingTo, fieldName, t.toJson());
							ModalManager.hideModal();
						}
						else
						{
							ViewManager.getView("#addFieldMessageContainer").displayAlert("Unable to add Object without a field name", "emptyObj");
						}
					})
				}
				else
				{
					ViewManager.getView("#addFieldMessageContainer").displayAlert("Unable to add Object without a field name", "emptyObj");
				}
			});
		}
		else
		{
			ViewManager.getView("#addFieldMessageContainer").displayAlert("Unable to add Field, are you sure you're on the right page?", "addField");
		}
		
		
		$("#addFieldModalCancel").click(function(){
			ModalManager.hideModal();
		})
		
	}
	
	return AddFieldModal;
})(AddFieldModal);/**
 * Handles adding an owner to an object, lets the user select from their
 * contacts or paste a public key PEM as an owner
 * 
 * @module cass.manager
 * @class AddOwnerModal
 * 
 * @author devlin.junker@eduworks.com
 */
var AddOwnerModal = (function(AddOwnerModal){	
	
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf AddOwnerModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	AddOwnerModal.prototype.display = function(containerId)
	{
		var addingTo = this.field;
		
		var objectContainerId = this.objectContainerId;
		
		ViewManager.showView(new MessageContainer("addOwner"), "#addOwnerMessageContainer");
		
		var ownerElements = addingTo.children("div").children("[field='@owner']").find("ul").find(".identityDisplay");
		
		var owners = [];
		for(var i = 0; i < ownerElements.size(); i++){
			var el = ownerElements.get(i);
			var pk = $(el).attr("data-pk")
			owners.push(pk)
		}
		
		ViewManager.showView(new DataViewer("addOwner", {
			buildMenu: function(){},
			buildRowToolbar: function(){},
			buildDataRow: function(row, id, datum){
				var rowHtml = $("<div class='small-12 columns'></div>");
				rowHtml.text(datum.displayName);
				rowHtml.attr("title", datum.pk.toPem());
				
				row.append(rowHtml);
				
				row.attr("data-id", datum.pk.toPem());
			}
		}), "#contactDisplay", function(){
			var identities = {};
			for (var i in EcIdentityManager.contacts){
				var id = EcIdentityManager.contacts[i];
				if(id.pk == undefined)
					continue;
				if(owners.indexOf(id.pk.toPem()) != -1)
					continue;
				var con = new EcContact();
				con.displayName = id.displayName;
				con.pk = id.pk;
				con.id = con.pk.toPem();
				identities[con.pk.toPem()] = con;
			}
			
			for (var i in EcIdentityManager.ids){
				var id = EcIdentityManager.ids[i];
				if(id.ppk == undefined)
					continue;
				if(owners.indexOf(id.ppk.toPk().toPem()) != -1)
					continue;
				var con = new EcContact();
				con.displayName = id.displayName;
				con.pk = id.ppk.toPk();
				con.id = con.pk.toPem();
				identities[con.pk.toPem()] = con;
			}
			
			ViewManager.getView("#contactDisplay").populate(identities);
			$("#addOwner-data").css("border", "1px solid #b3b3b3")
			$("#addOwner-none").text("No Identities or Contacts available")
		});
		
		$("#addOwnerSubmit").click(function(){
			var key = $("#ownerKeyPaste").text();
			
			if(key == undefined || key == ""){
				var keys = ViewManager.getView("#contactDisplay").getSelected();
				for(var idx in keys){
					ViewManager.getView(objectContainerId).addOwner(addingTo, keys[idx].pk.toPem());
				}
			}else{
				ViewManager.getView(objectContainerId).addOwner(addingTo, key);
			}
			
			ModalManager.hideModal();
		})
		
		$("#addOwnerModalCancel").click(function(){
			ModalManager.hideModal();
		})
	}
	
	return AddOwnerModal;
})(AddOwnerModal);/**
 * Handles adding a server URL and name to the list of servers
 * kept by the application
 * 
 * @module cass.manager
 * @class AddServerModal
 * 
 * @author devlin.junker@eduworks.com
 */
var AddServerModal = (function(AddServerModal){
	
	/**
	 * 
	 * @memberOf AddServerModal
	 * @method submitAddServer
	 * @private
	 * @param {Callback0} onClose
	 * 			Callback triggered once server is added to application list
	 */
	function submitAddServer(onClose){
		var name = $("#addServerName").val();
		var url = $("#addServerUrl").val();
		var me = this;
		var r = new EcRepository();
		r.selectedServer = url;
		r.autoDetectRepositoryAsync(function(){
			AppController.serverController.addServer(name, r.selectedServer, function(){
				AppController.serverController.selectServer(name,function(){
					if(AppController.loginController.getLoggedIn()){
						AppController.loginController.setLoggedIn(false);
						ViewManager.getView("#menuContainer").setLoggedOut();
					}

					AppMenu.prototype.setCurrentServer();

					ModalManager.hideModal();
				});
			},displayError);
		}, displayError);
	}
	
	/**
	 * Adds an error message in the MessageContainer Alert Box
	 * 
	 * @memberOf AddServerModal
	 * @method displayError
	 * @private
	 * @param {String} err
	 * 			Error to display 
	 */
	function displayError(err)
	{
		ViewManager.getView("#addServerMessageContainer").displayAlert(err);
	}
	
	/**
	 * Clears the error message in the MessageContainer Alert Box
	 * 
	 * @memberOf AddServerModal
	 * @method clearError
	 * @private
	 */
	function clearError()
	{
		ViewManager.getView("#addServerMessageContainer").clearAlert();
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf AddServerModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	AddServerModal.prototype.display = function(containerId)
	{
		var closeCallback = this.onClose;
		
		ViewManager.showView(new MessageContainer("addServer"), "#addServerMessageContainer");
		
		if(this.server != undefined && this.server != null){
			$("#addServerUrl").val(this.server).attr("disabled", "disabled");
			$("#addServerMessage").text("It looks like you are coming from a new CASS server. Enter a name below to identify it for future use. This will only be available to your computer.")
		}
		
		$("#addServerForm").submit(function(event){
			event.preventDefault();
			submitAddServer(closeCallback);
		});
		
		$("#addServerCancel").click(function(event){
			event.preventDefault();
			ModalManager.hideModal();
			closeCallback();
		});
		
	}
	
	return AddServerModal;
})(AddServerModal);/**
 * Modal for adding the competencies passed in to the constructor to a framework
 * that is selected from a dropdown list in the modal.
 * 
 * @module cass.manager
 * @class AddToFrameworkModal
 * 
 * @author devlin.junker@eduworks.com
 */
var AddToFrameworkModal = (function(AddToFrameworkModal){
	
	/**
	 * Adds an error message in the MessageContainer Alert Box
	 * 
	 * @memberOf AddToFrameworkModal
	 * @method displayError
	 * @private
	 * @param {String} err
	 * 			Error to display 
	 */
	function displayError(err) {
		ViewManager.getView("#addToFrameworkMessageContainer").displayAlert(err);
	}
	
	/**
	 * Clears the error message in the MessageContainer Alert Box
	 * 
	 * @memberOf AddToFrameworkModal
	 * @method clearError
	 * @private
	 */
	function clearError()
	{
		ViewManager.getView("#addToFrameworkMessageContainer").clearAlert();
	}
	
	/**
	 * @memberOf AddToFrameworkModal
	 * @method buildFrameworkOption
	 * @private
	 * @param {EcFramework} framework
	 * 			The Framework to build on option for
	 */
	function buildFrameworkOption(framework){
		var option = $("<option></option>");
		option.val(framework.id);
		option.text(framework.name + (framework.owner == undefined ? " (Public)": ""));
		
		return option;
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf AddToFrameworkModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	AddToFrameworkModal.prototype.display = function(containerId)
	{
		var data = this.data;
		
		ViewManager.showView(new MessageContainer("addToFramework"), "#addToFrameworkMessageContainer", function(){
			if(data instanceof Array){
				var competencies = false;
				var relations = false; 
				var unknown = false;
				
				for(var i in data){
					if(data[i].type != undefined){
						if((new EcCompetency()).getTypes().indexOf(data[i].getFullType()) != -1){
							competencies = true;
						}else if((new EcAlignment()).getTypes().indexOf(data[i].getFullType()) != -1){
							relations = true;
						}else{
							unknown = true;
							ViewManager.getView("#addToFrameworkMessageContainer").displayWarning("Unsure how to add object ("+data[i].id+") with type ("+data[i].type+") to framework", "unknownType");
						}
					}else{
						unknown = true;
						ViewManager.getView("#addToFrameworkMessageContainer").displayWarning("Unsure how to add object ("+data[i].id+") with no type to framework", "noType");
					}
				}
				
				if(unknown || (relations && competencies)){
					if(data.length > 1){
						$("#dataDescription").text("the objects")
					}else{
						$("#dataDescription").text("the object")
					}
				}else if(relations){
					if(data.length > 1){
						$("#dataDescription").text("the relations")
					}else{
						$("#dataDescription").text("the relation")
					}
				}else if(competencies){
					if(data.length > 1){
						$("#dataDescription").text("the competencies")
					}else{
						$("#dataDescription").text("the competency");
					}
					
				}
			}else if(data.id != undefined){
				if(data.type != undefined){
					if(EcCompetency.getTypes().indexOf(data.getFullType()) != -1){
						$("#dataDescription").text("the competency");
					}else if(EcAlignment.getTypes().indexOf(data.getFullType()) != -1){
						$("#dataDescription").text("the relation");
					}else{
						ViewManager.getView("#addToFrameworkMessageContainer").displayWarning("Unsure how to add object ("+data[i].id+") with type ("+data[i].type+") to framework", "unknownType");
					}
				}else{
					ViewManager.getView("#addToFrameworkMessageContainer").displayWarning("Unsure how to add object ("+data[i].id+") with no type to framework", "noType");
				}
				
			}
		});
		
		
		EcFramework.search(AppController.serverController.getRepoInterface(), "*", function(frameworks){
			$("#addToFrameworkList").html();
			for(var i in frameworks){
				if(AppController.identityController.canEdit(frameworks[i])){
					$("#addToFrameworkList").append(buildFrameworkOption(frameworks[i]));
				}
			}
			
			if($("#addToFrameworkList option").size() == 0){
				$("#addToFrameworkList").append("<option selected>Unable to add to any Frameworks</option>");
				$("#addToFrameworkList").attr("disabled", "disabled");
				
				ViewManager.getView("#addToFrameworkMessageContainer").displayAlert("Must have editing priviledges on a framework to add competencies");
			}
		}, displayError);
		
		$("#addToFrameworkSave").click(function(ev){
			ev.preventDefault();
			
			var id = $("#addToFrameworkList").val();
			
			EcFramework.get(id, function(result){
				if(data instanceof Array){
					for(var i in data){
						if(data[i].type != undefined){
							if((new EcCompetency()).getTypes().indexOf(data[i].getFullType()) != -1){
								result.addCompetency(data[i].id);
							}else if((new EcAlignment()).getTypes().indexOf(data[i].getFullType()) != -1){
								result.addRelation(data[i].id)
							}else{
								
							}
						}else{
							ViewManager.getView("#addToFrameworkMessageContainer").displayWarning("Unsure how to add object ("+data[i].id+") with unknown type to framework", "unknownType");
						}
					}
				}else if(data.id != undefined){
					if(data.type != undefined){
						if((new EcCompetency()).getTypes().indexOf(data.getFullType()) != -1){
							result.addCompetency(data.id);
						}else if((new EcAlignment()).getTypes().indexOf(data.getFullType()) != -1){
							result.addRelation(data.id)
						}else{
							return;
						}
					}else{
						result.addCompetency(data.id);
					}
				}
				
				result.save(function(){
					ModalManager.hideModal();
					ScreenManager.changeScreen(new FrameworkViewScreen(result));
				},displayError)
			}, displayError);
			
			
			
		});
		
		$("#addToFrameworkCancel").click(function(){
			ModalManager.hideModal();
		})
	}
	
	return AddToFrameworkModal;
})(AddToFrameworkModal);/**
 * Handles the advanced permission setting (privacy, owners, readers)
 * of a piece of EcRemoteLinkedData in the Repository
 * 
 * @module cass.manager
 * @class AdvancedPermissionsModal
 * 
 * @author devlin.junker@eduworks.com
 */
var AdvancedPermissionsModal = (function(AdvancedPermissionsModal){
	
	/**
	 * Adds the contact given to the list of owners in the modal
	 * 
	 * @memberOf AdvancedPermissionsModal
	 * @method addOwner
	 * @private
	 * @param {EcContact} contact
	 * 			Contact info for key to add as owner
	 */
	function addOwner(contact){
		$('#advancedPermissionsAddOwner').typeahead('val', "");
		
		var pk;
		if(contact.pk != undefined)
			pk = contact.pk;
		else
			pk = contact.ppk.toPk();

		if($("#advancedPermissionsOwners option").size() == 1){
			$("#noOwners").addClass("hide");
			$("#advancedPermissionsOwners").removeClass("empty");
			$("#advancedPermissionsOwners").removeAttr("disabled");
		}
		
		var option = $("<option></option>");
		option.val(pk.toPem());
		option.text(contact.displayName);
		$("#advancedPermissionsOwners").append(option);
	}
	
	/**
	 * Adds the contact given to the list of readers in the modal
	 * 
	 * @memberOf AdvancedPermissionsModal
	 * @method addReader
	 * @private
	 * @param {EcContact} contact
	 * 			Contact info for key to add as reader
	 */
	function addReader(contact){
		$('#advancedPermissionsAddReader').typeahead('val', "");
		
		var pk;
		if(contact.pk != undefined)
			pk = contact.pk;
		else
			pk = contact.ppk.toPk();

		if($("#advancedPermissionsReaders option").size() == 1){
			$("#noReaders").addClass("hide");
			$("#advancedPermissionsReaders").removeClass("empty");
			$("#advancedPermissionsReaders").removeAttr("disabled");
		}
		
		var option = $("<option></option>");
		option.val(pk.toPem());
		option.text(contact.displayName);
		$("#advancedPermissionsReaders").append(option);
	}
	
	/**
	 * Sets up owner and reader typeaheads to search through
	 * the current users contacts as they type
	 * 
	 * @memberOf AdvancedPermissionsModal
	 * @method setupTypeaheads
	 * @private
	 * @param {} data
	 * 			
	 */
	function setupTypeaheads(){
		$("#advancedPermissionsAddOwner").typeahead({
	  		hint: false,
	  		highlight: true,
	  		minLength: 2,
		},
		{
	  		name: 'contacts',
	  		source: function(q, syncCallback, asyncCallback){
	  			var knownUsers = [];
	  			
	  			for(var i in EcIdentityManager.ids)
	  				knownUsers.push(EcIdentityManager.ids[i])
	  				
	  			for(var i in EcIdentityManager.contacts)
	  				knownUsers.push(EcIdentityManager.contacts[i])
	  			
	  			for(var i = 0; i < knownUsers.length; i++){
	  				var pk;
	  				if(knownUsers[i].pk != undefined)
	  					pk = knownUsers[i].pk;
	  				else
	  					pk = knownUsers[i].ppk.toPk();
	  				
	  				var keys = $("#advancedPermissionsOwners option").map(function(i, el){
	  					return $(el).attr('value');
	  				});
	  				if(keys.toArray().indexOf(pk.toPem()) != -1 || knownUsers[i].source == undefined){
	  					knownUsers.splice(i, 1);
	  					i--;
	  					continue;
	  				}
	  				
	  				var keys = $("#advancedPermissionsReaders option").map(function(i, el){
	  					return $(el).attr('value');
	  				});
	  				if(keys.toArray().indexOf(pk.toPem()) != -1 || knownUsers[i].source == undefined){
	  					knownUsers.splice(i, 1);
	  					i--;
	  				}
	  			}
	  				
	  			syncCallback(knownUsers);
			},
			async:false,
	  		display: function(data){ return data["displayName"]; },
	  		templates:{
	  			suggestion:function(data){ return "<div>" + data["displayName"] + "</div>"; },
	  			notFound:function(){
	  				return "<div style='text-align:center'>No Identies or Contacts Found</div>";
	  			}
	  		}
		}).bind("typeahead:selected", function(ev, contact){
			addOwner(contact);
			
			var owners = $("#advancedPermissionsOwners option").map(function(i, el){
				if($(el).attr('value') != undefined)
					return $(el).attr('value');
			}).toArray();
			
			var temp = new EcRemoteLinkedData();
			temp.owner = [];
			for(var j in owners){
				temp.addOwner(EcPk.fromPem(owners[j]));
			}
			
			if(!AppController.identityController.canEdit(temp)){
				ViewManager.getView("#advancedPermissionsMessageContainer").displayWarning("This will prevent further modifications by you, as you no longer own the object(s)", "lostOwnership");
			}else{
				ViewManager.getView("#advancedPermissionsMessageContainer").clearWarning("lostOwnership");
			}
			
			ViewManager.getView("#advancedPermissionsMessageContainer").clearWarning("public");
		}).bind("typeahead:autocompleted", function(ev, contact){
			addOwner(contact);
			
			var owners = $("#advancedPermissionsOwners option").map(function(i, el){
				if($(el).attr('value') != undefined)
					return $(el).attr('value');
			}).toArray();
		
			var temp = new EcRemoteLinkedData();
			temp.owner = [];
			for(var j in owners){
				temp.addOwner(EcPk.fromPem(owners[j]));
			}
			
			if(!AppController.identityController.canEdit(temp)){
				ViewManager.getView("#advancedPermissionsMessageContainer").displayWarning("This will prevent further modifications by you, as you no longer own the object(s)", "lostOwnership");
			}else{
				ViewManager.getView("#advancedPermissionsMessageContainer").clearWarning("lostOwnership");
			}
			
			ViewManager.getView("#advancedPermissionsMessageContainer").clearWarning("public");
		});
		
		$("#advancedPermissionsAddReader").typeahead({
	  		hint: false,
	  		highlight: true,
	  		minLength: 2,
		},
		{
	  		name: 'contacts',
	  		source: function(q, syncCallback, asyncCallback){
	  			var knownUsers = [];
	  			
	  			for(var i in EcIdentityManager.ids)
	  				knownUsers.push(EcIdentityManager.ids[i])
	  				
	  			for(var i in EcIdentityManager.contacts)
	  				knownUsers.push(EcIdentityManager.contacts[i])
	  			
	  			for(var i = 0; i < knownUsers.length; i++){
	  				var pk;
	  				if(knownUsers[i].pk != undefined)
	  					pk = knownUsers[i].pk;
	  				else
	  					pk = knownUsers[i].ppk.toPk();
	  				
	  				var keys = $("#advancedPermissionsOwners option").map(function(i, el){
	  					return $(el).attr('value');
	  				});
	  				if(keys.toArray().indexOf(pk.toPem()) != -1 || knownUsers[i].source == undefined){
	  					knownUsers.splice(i, 1);
	  					i--;
	  					continue;
	  				}
	  				
	  				var keys = $("#advancedPermissionsReaders option").map(function(i, el){
	  					return $(el).attr('value');
	  				});
	  				if(keys.toArray().indexOf(pk.toPem()) != -1 || knownUsers[i].source == undefined){
	  					knownUsers.splice(i, 1);
	  					i--;
	  				}
	  			}
	  				
	  			syncCallback(knownUsers);
			},
			async:false,
	  		display: function(data){ return data["displayName"]; },
	  		templates:{
	  			suggestion:function(data){ return "<div>" + data["displayName"] + "</div>"; },
	  			notFound:function(){
	  				return "<div style='text-align:center'>No Identies or Contacts Found</div>";
	  			}
	  		}
		}).bind("typeahead:selected", function(ev, contact){
			addReader(contact);
		}).bind("typeahead:autocompleted", function(ev, contact){
			addReader(contact);
		});
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf AdvancedPermissionsModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	AdvancedPermissionsModal.prototype.display = function(containerId)
	{
		var data = this.data;
		
		var saveCallback = this.saveCallback;
		
		var onlyReaders = this.onlyReaders;
		
		var alerts = {};
		var warnings = {};
		ViewManager.showView(new MessageContainer("advancedPermissions"), "#advancedPermissionsMessageContainer", function(){
			for(var id in alerts){
				ViewManager.getView("#advancedPermissionsMessageContainer").displayAlert(alerts[id], id);
			}
			for(var id in warnings){
				ViewManager.getView("#advancedPermissionsMessageContainer").displayWarning(warnings[id], id);
			}
		});
		
		
		var canSave = true;
		if(data instanceof Array){
			warnings[0] = "Modifying multiple resources, all resources will have the same permissions if saved";
			ViewManager.getView("#advancedPermissionsMessageContainer").displayWarning("Modifying multiple resources, all resources will have the same permissions if saved");
			for(var i in data){
				if(data[i].owner == undefined){
					alerts["public"] = "One or more objects is public, Cannot Modify Permissions";
					ViewManager.getView("#advancedPermissionsMessageContainer").displayAlert("One or more objects is public, Cannot Modify Permissions", "public");
					canSave = false;
				}else if(!AppController.identityController.owns(data[i])){
					alerts["notOwned"] = "One or more objects not owned by you, Cannot Modify Permissions";
					ViewManager.getView("#advancedPermissionsMessageContainer").displayAlert("One or more objects not owned by you, Cannot Modify Permissions", "notOwned");
					canSave = false;
				}
				
				if(data[i].type == EcEncryptedValue.type){
					warnings["decrypt"] = "May be decrypting an object by setting all public";
					ViewManager.getView("#advancedPermissionsMessageContainer").displayWarning("May be decrypting an object by setting all public", "decrypt");
				}
			}
		}else{
			if(data.owner == undefined){
				alerts["public"] = "Cannot Modify Permissions of Public Object";
				ViewManager.getView("#advancedPermissionsMessageContainer").displayAlert("Cannot Modify Permissions of Public Object", "public");
				$("#noOwners").removeClass("public");
				$("#advancedPermissionsOwners").addClass("empty")
				canSave = false;
			}else if(!AppController.identityController.owns(data)){
				alerts["notOwned"] = "Cannot Modify Permissions of Object not owned by you";
				ViewManager.getView("#advancedPermissionsMessageContainer").displayAlert("Cannot Modify Permissions of Object not owned by you", "notOwned");
				canSave = false;
			}
		}
		if(!canSave){
			$("#advancedPermissionsSave").attr("disabled", "disabled");
			$("#privateSwitch").attr("disabled", "disabled");
			$("#advancedPermissionsOwners").attr("disabled", "disabled");
			$("#advancedPermissionsReaders").attr("disabled", "disabled");
		}else{
			
			if(!onlyReaders){
				$("#privateSwitch").change(function(){
					if($("#advancedPermissionsOwners option").size() == 1 && $("#advancedPermissionsOwners").attr("disabled") == "disabled"){
						$("#privateSwitch").prop("checked", false)
						ViewManager.getView("#advancedPermissionsMessageContainer").displayAlert("Cannot encrypt a publicly owned object", "publicPrivate");
						return;
					}
					
					$("#readerRow").slideToggle();
					
					if(data instanceof Array){
						if(!$("#privateSwitch").prop("checked")){
							ViewManager.getView("#advancedPermissionsMessageContainer").displayWarning("May be decrypting an object by setting all public", "decrypt");
						}else{
							ViewManager.getView("#advancedPermissionsMessageContainer").clearWarning("decrypt");
						}
					}else if(EcEncryptedValue.encryptOnSave(data.id, true) && !$("#privateSwitch").prop("checked")){
						ViewManager.getView("#advancedPermissionsMessageContainer").displayWarning("Decrypting object by setting it public", "decrypt");
					}else{
						ViewManager.getView("#advancedPermissionsMessageContainer").clearWarning("decrypt");
					}
				});
			}else{
				$("#advancedPermissionsAddOwner").prop("disabled", "disabled");
				$("#advancedPermissionsOwners").prop("disabled", "disabled");
				$("#privateSwitch").prop("checked", true)
				$("#privateSwitch").prop("disabled", "disabled")
				
				$("#ownerRow").addClass("hide");
				$("#privacyRow").addClass("hide");
				
				if(!$("#readerRow").is(":visible"))
					$("#readerRow").slideDown();
			}
			
			
			if(data instanceof Array){
				if(AppController.identityController.selectedIdentity != undefined){
					var option = $("<option></option>");
					option.val(AppController.identityController.selectedIdentity.ppk.toPk().toPem());
					option.text(AppController.identityController.selectedIdentity.displayName);
					$("#advancedPermissionsOwners").append(option);
				}else{
					$("#noOwners").removeClass("hide");
					$("#advancedPermissionsOwners").attr("disabled", "disabled");
					$("#advancedPermissionsOwners").addClass("empty");
				}
			}else{
				for(var i in data.owner){
					var option = $("<option></option>");
					option.val(data.owner[i]);
					option.attr("title", data.owner[i]);
					option.text(AppController.identityController.lookup(data.owner[i]).displayName);
					$("#advancedPermissionsOwners").append(option);
				}
				
				for(var i in data.reader){
					var option = $("<option></option>");
					option.val(data.reader[i]);
					option.attr("title", data.reader[i]);
					option.text(AppController.identityController.lookup(data.reader[i]).displayName);
					$("#advancedPermissionsReaders").append(option);
					
					$("#noReaders").addClass("hide");
					$("#advancedPermissionsReaders").removeAttr("disabled");
					$("#advancedPermissionsReaders").removeClass("empty");
				}
			}
			
			if(EcEncryptedValue.encryptOnSave(data.id)){
				$("#privateSwitch").prop("checked", true);
				$("#readerRow").css('display',"block");
			}
			
			$("#advancedPermissionsOwners").focus(function(){
				$("#advancedPermissionsOwners").css("margin-bottom", "0px");
				$("#advancedPermissionsDeleteOwner").slideDown();
				
				$("#advancedPermissionsOwners").blur(function(){
					$("#advancedPermissionsDeleteOwner").slideUp(function(){
						$("#advancedPermissionsOwners").removeAttr("style");
					});
				})
			});
			
			$("#advancedPermissionsDeleteOwner").click(function(){
				$("#advancedPermissionsOwners option[value='"+$("#advancedPermissionsOwners").val()+"']").remove();
				if($("#advancedPermissionsOwners option").size() == 1){
					$("#noOwners").removeClass("hide")
					$("#advancedPermissionsOwners").attr("disabled", "disabled");
					$("#advancedPermissionsOwners").addClass("empty");
					
					ViewManager.getView("#advancedPermissionsMessageContainer").displayWarning("Public objects will not allow futher modifications of permissions", "public");
				}else{
					ViewManager.getView("#advancedPermissionsMessageContainer").clearWarning("public");
					
					var owners = $("#advancedPermissionsOwners option").map(function(i, el){
	  					if($(el).attr('value') != undefined)
	  						return $(el).attr('value');
	  				}).toArray();
					
					var temp = new EcRemoteLinkedData();
					temp.owner = [];
					for(var j in owners){
						temp.addOwner(EcPk.fromPem(owners[j]));
					}
					
					if(!AppController.identityController.canEdit(temp)){
						ViewManager.getView("#advancedPermissionsMessageContainer").displayWarning("This will prevent further modifications by you, as you no longer own the object(s)", "lostOwnership");
					}else{
						ViewManager.getView("#advancedPermissionsMessageContainer").clearWarning("lostOwnership");
					}
				}
			});
			
			$("#advancedPermissionsReaders").focus(function(){
				$("#advancedPermissionsReaders").css("margin-bottom", "0px");
				$("#advancedPermissionsDeleteReader").slideDown();
				
				$("#advancedPermissionsReaders").blur(function(){
					$("#advancedPermissionsDeleteReader").slideUp(function(){
						$("#advancedPermissionsReaders").removeAttr("style");
					});
				})
			});
			
			$("#advancedPermissionsDeleteReader").click(function(){
				$("#advancedPermissionsReaders option[value='"+$("#advancedPermissionsReaders").val()+"']").remove();
				if($("#advancedPermissionsReaders option").size() == 1){
					$("#noReaders").removeClass("hide")
					$("#advancedPermissionsReaders").attr("disabled", "disabled");
					$("#advancedPermissionsReaders").addClass("empty");
				}
			});
			
			setupTypeaheads();
			
			$("#advancedPermissionsSave").click(function(ev){
				ev.preventDefault();
				
				var owners = $("#advancedPermissionsOwners option").map(function(i, el){
  					if($(el).attr('value') != undefined)
  						return $(el).attr('value');
  				}).toArray();
				
				var readers = $("#advancedPermissionsReaders option").map(function(i, el){
  					if($(el).attr('value') != undefined)
  						return $(el).attr('value');
  				}).toArray();
				
				if(data instanceof Array){
					for(var i in data){
						data[i].owner = [];
						for(var j in owners){
							if(!onlyReaders)
								data[i].addOwner(EcPk.fromPem(owners[j]));
						}
						
						data[i].reader = [];
						for(var j in readers){
							data[i].addReader(EcPk.fromPem(readers[j]))
						}
						
						if(!onlyReaders)
							EcEncryptedValue.encryptOnSave(data[i].id, $("#privateSwitch").prop("checked"));
					}
				}else{
					data.owner = [];
					for(var j in owners){
						if(!onlyReaders)
							data.addOwner(EcPk.fromPem(owners[j]));
					}
					
					data.reader = [];
					for(var j in readers){
						data.addReader(EcPk.fromPem(readers[j]))
					}
					
					if(!onlyReaders)
						EcEncryptedValue.encryptOnSave(data.id, $("#privateSwitch").prop("checked"));
				}
				
				saveCallback(data);
			});				
		}
		
		
		$("#advancedPermissionsCancel").click(function(){				
			ModalManager.hideModal();
			if(data.isAny(new EcLevel().getTypes())){
				saveCallback(data);
			}
		})
		
	}
	
	return AdvancedPermissionsModal;
})(AdvancedPermissionsModal);AlignmentEditorColumn = (function (AlignmentEditorColumn) {
    var itemTemplate = "";
    var colors = {};
    var alpha = 0.1;
    colors[EcAlignment.IS_EQUIVALENT_TO] = 'rgba(0,0,0,' + alpha + ')';
    colors[EcAlignment.IS_RELATED_TO] = 'rgba(128,128,128,' + alpha + ')';//"gray";
    colors[EcAlignment.REQUIRES] = 'rgba(210,105,30,' + alpha + ')';//"chocolate";
    colors[EcAlignment.NARROWS] = 'rgba(0,0,255,' + alpha + ')';//"blue";
    colors[EcAlignment.DESIRES] = 'rgba(255,128,0,' + alpha + ')';//"orange";
    colors[EcAlignment.IS_ENABLED_BY] = 'rgba(128,0,128,' + alpha + ')';//"purple";
    colors["teaches"] = 'rgba(0,128,0,' + alpha + ')';//"green";
    colors["assesses"] = 'rgba(255,0,0,' + alpha + ')';//"red";
    colors["requires"] = 'rgba(210,105,30,' + alpha + ')';//"chocolate";
    colors["http://schema.cassproject.org/0.2/vocab/asserts"] = 'rgba(255,0,255,' + alpha + ')';//"Fuchsia";
    var highlightedColors = {};
    var alpha = 0.6;
    highlightedColors[EcAlignment.IS_EQUIVALENT_TO] = 'rgba(0,0,0,' + alpha + ')';
    highlightedColors[EcAlignment.IS_RELATED_TO] = 'rgba(128,128,128,' + alpha + ')';//"gray";
    highlightedColors[EcAlignment.REQUIRES] = 'rgba(210,105,30,' + alpha + ')';//"chocolate";
    highlightedColors[EcAlignment.NARROWS] = 'rgba(0,0,255,' + alpha + ')';//"blue";
    highlightedColors[EcAlignment.DESIRES] = 'rgba(255,128,0,' + alpha + ')';//"orange";
    highlightedColors[EcAlignment.IS_ENABLED_BY] = 'rgba(128,0,128,' + alpha + ')';//"purple";
    highlightedColors["teaches"] = 'rgba(0,128,0,' + alpha + ')';//"green";
    highlightedColors["assesses"] = 'rgba(255,0,0,' + alpha + ')';//"red";
    highlightedColors["requires"] = 'rgba(210,105,30,' + alpha + ')';//"chocolate";
    highlightedColors["http://schema.cassproject.org/0.2/vocab/asserts"] = 'rgba(255,0,255,' + alpha + ')';//"Fuchsia";
    var fillColors = {};
    alpha = 0.05;
    fillColors[EcAlignment.IS_EQUIVALENT_TO] = 'rgba(0,0,0,' + alpha + ')';
    fillColors[EcAlignment.IS_RELATED_TO] = 'rgba(128,128,128,' + alpha + ')';//"gray";
    fillColors[EcAlignment.REQUIRES] = 'rgba(210,105,30,' + alpha + ')';//"chocolate";
    fillColors[EcAlignment.NARROWS] = 'rgba(0,0,255,' + alpha + ')';//"blue";
    fillColors[EcAlignment.DESIRES] = 'rgba(255,128,0,' + alpha + ')';//"orange";
    fillColors[EcAlignment.IS_ENABLED_BY] = 'rgba(128,0,128,' + alpha + ')';//"purple";
    fillColors["teaches"] = 'rgba(0,128,0,' + alpha + ')';//"green";
    fillColors["assesses"] = 'rgba(255,0,0,' + alpha + ')';//"red";
    fillColors["requires"] = 'rgba(210,105,30,' + alpha + ')';//"chocolate";
    fillColors["http://schema.cassproject.org/0.2/vocab/asserts"] = 'rgba(255,0,255,' + alpha + ')';//"Fuchsia";
    var highlightedFillColors = {};
    alpha = 0.2;
    highlightedFillColors[EcAlignment.IS_EQUIVALENT_TO] = 'rgba(0,0,0,' + alpha + ')';
    highlightedFillColors[EcAlignment.IS_RELATED_TO] = 'rgba(128,128,128,' + alpha + ')';//"gray";
    highlightedFillColors[EcAlignment.REQUIRES] = 'rgba(210,105,30,' + alpha + ')';//"chocolate";
    highlightedFillColors[EcAlignment.NARROWS] = 'rgba(0,0,255,' + alpha + ')';//"blue";
    highlightedFillColors[EcAlignment.DESIRES] = 'rgba(255,128,0,' + alpha + ')';//"orange";
    highlightedFillColors[EcAlignment.IS_ENABLED_BY] = 'rgba(128,0,128,' + alpha + ')';//"purple";
    highlightedFillColors["teaches"] = 'rgba(0,128,0,' + alpha + ')';//"green";
    highlightedFillColors["assesses"] = 'rgba(255,0,0,' + alpha + ')';//"red";
    highlightedFillColors["requires"] = 'rgba(210,105,30,' + alpha + ')';//"chocolate";
    highlightedFillColors["http://schema.cassproject.org/0.2/vocab/asserts"] = 'rgba(255,0,255,' + alpha + ')';//"Fuchsia";

	var populated = {};
    AlignmentEditorColumn.prototype.populate = function () {
        var me = this;
        var container = $(me.containerId);
        var list = container.find(".alignmentEditorContainer");
        list.html("").hide();
        container.find(".loadingRow").show();
        populated = {};
        for (var i = 0; i < me.collection.length; i++) {
            var item = me.collection[i];
            var name;
            if(item.getName != undefined)
            	name = item.getName();
            else
            	name = item.name;
            
            if (name != null && me.filter != null && me.filter != "" && name.toLowerCase().indexOf(me.filter.toLowerCase()) == -1)
                continue;
            list.append(itemTemplate);
            var li = list.children().last();
            li.attr("id", item.shortId());
            if (item.name != null){
            	if(item.name["@value"] != null){
            		li.find("[ec-field='name']").text(item.getName());
            	}else{
            		li.find("[ec-field='name']").text(item.name);
            	}
            }
            	
			else if (item.url != null)
            	li.find("[ec-field='name']").text(item.url);
            else
            	li.find("[ec-field='name']").text("<Unknown>");
            if (item.url != null)
			if (populated[item.url] != null)
			{
				li.remove();
				continue;
			}
			populated[item.url] = true;
            li.click(function (evt) {
                var target = $(evt.currentTarget);
                me.selectElement(target.attr("id"));
                target.toggleClass("selected");
                if (me.screenHook != null)
                    me.screenHook();
            });
        }
        list.off("scroll");
        list.scroll(function () {
            me.redraw();
        });
        me.getRelations();
    }
    AlignmentEditorColumn.prototype.deselectAll = function () {
        var me = this;
        var container = $(me.containerId);
        container.find(".alignmentEditorElement.selected").trigger('click');
        me.selected = [];
    }
    AlignmentEditorColumn.prototype.redraw = function () {
        var me = this;
        var container = $(me.containerId);
        container.find(".alignmentEditorContainer").show();
        container.find(".loadingRow").hide();

        var allElementsMe = container.find(".alignmentEditorElement");
        if (me.left != null)
            me.left.redraw();
        if (me.right == null) return;
        var allElementsRight = $(me.right.containerId).find(".alignmentEditorElement");

        var margin = parseInt($("#alignmentEditorColumns").css("margin-bottom"));
        
        var canvas = $("#canvas")[0];
        var columns = $("#alignmentEditorColumns");
        canvas.style.width = $(canvas).parent().width() +"px";
        canvas.style.height = (columns.height() + margin)+"px";
        if (canvas.width != canvas.offsetWidth)
            canvas.width = canvas.offsetWidth;
        if (canvas.height != canvas.offsetHeight)
            canvas.height = columns.height()+margin;
        var ctx = $("#canvas")[0].getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgb(255,255,255)';
       
        ctx.fillRect(0, 0, canvas.width, canvas.height + margin);

        if (me.relations != null){
            for (var i = 0; i < me.relations.length; i++) {
                var relationType = me.relations[i].relationType;
                if (relationType == null)
                    if (me.relations[i].educationalAlignment != null)
                        relationType = me.relations[i].educationalAlignment.alignmentType;
                if (relationType == null)
                    continue;
                var leftId = me.relations[i].source;
                if (leftId == null)
                    leftId = me.relations[i].url;
                if (leftId == null)
                    continue;
                var rightId = me.relations[i].target;
                if (rightId == null)
                    if (me.relations[i].educationalAlignment != null)
                        rightId = me.relations[i].educationalAlignment.targetUrl;
                if (rightId == null)
                    continue;

                var left = container.find("[id='" + leftId + "']");
                var right = $(me.right.containerId + " [id='" + rightId + "']");
                if (left.length == 0) continue;
                if (right.length == 0) continue;

                var highlight = true;
                if (me.selected.length == 0 && me.right.selected.length == 0)
                    ctx.fillStyle = highlightedFillColors[me.relations[i].relationType];
                else {
                    highlight = false;
                    for (var j = 0; j < me.selected.length; j++) {
                        if (me.selected[j].shortId() == leftId)
                            highlight = true;
                        if (me.selected[j].shortId() == rightId)
                            highlight = true;
                    }
                    for (var j = 0; j < me.right.selected.length; j++) {
                        if (me.right.selected[j].shortId() == leftId)
                            highlight = true;
                        if (me.right.selected[j].shortId() == rightId)
                            highlight = true;
                    }
                }

                ctx.beginPath();
                if (highlight)
                    ctx.strokeStyle = highlightedColors[relationType];
                else
                    ctx.strokeStyle = colors[relationType];

                //Full box height method.
                var x1 = left.position().left + left.outerWidth() - $(canvas).position().left;
                var y1 = left.position().top + (left.outerHeight(true) - left.outerHeight(false)) / 2 - $(canvas).position().top;
                var x2 = right.position().left - $(canvas).position().left;
                var y2 = right.position().top + (right.outerHeight(true) - right.outerHeight(false)) / 2 - $(canvas).position().top;
                var x3 = x2;
                var y3 = right.position().top + right.outerHeight(true) - (right.outerHeight(true) - right.outerHeight(false)) / 2 - $(canvas).position().top;
                var x4 = x1;
                var y4 = left.position().top + left.outerHeight(true) - (left.outerHeight(true) - left.outerHeight(false)) / 2 - $(canvas).position().top;

                //Fixed height line method.
    //			var x1 = left.position().left+left.outerWidth();
    //			var y1 = left.position().top+left.outerHeight(true)/2-15;
    //			var x2 = right.position().left;
    //			var y2 = right.position().top+right.outerHeight(true)/2-15;
    //			var x3 = x2;
    //			var y3 = right.position().top+right.outerHeight(true)/2+15;
    //			var x4 = x1;
    //			var y4 = left.position().top+left.outerHeight(true)/2+15;
                ctx.moveTo(x1, y1);

    //			var xc = (x1 + x2) / 2;
    //			var yc = (y1 + y1 + y1 + y2) / 4;
    //
    //			var xd = (x1 + x2) / 2;
    //			var yd = (y1 + y2 + y2 + y2) / 4;
    //			ctx.quadraticCurveTo(xc,yc, x2, y2);
    //			ctx.bezierCurveTo(xc,yc, xd,yd,x2, y2);
                ctx.lineTo(x2, y2);
                ctx.lineTo(x3, y3);

    //			xc = (x3 + x4) / 2;
    //			yc = (y3 + y3 + y3 + y4) / 4;
    //			xd = (x3 + x4) / 2;
    //			yd = (y3 + y4 + y4 + y4) / 4;
    //			ctx.bezierCurveTo(xc,yc,xd,yd,x4,y4)
    //			ctx.quadraticCurveTo(xc,yc, x4, y4);
                ctx.lineTo(x4, y4);
                ctx.lineTo(x1, y1);
                ctx.closePath();
                if (highlight)
                    ctx.fillStyle = highlightedFillColors[relationType];
                else
                    ctx.fillStyle = fillColors[relationType];
                ctx.fill();
                ctx.stroke();
            }
            
            ctx.clearRect(0, canvas.height - margin, canvas.width, margin);
            ctx.fillStyle = 'rgb(255,255,255)';
           
            ctx.fillRect(0, canvas.height - margin, canvas.width, margin);
           
            if($("#mappingFrameworkColumn").is(":visible")){
            	ctx.clearRect(0, 0, canvas.width,  $("#mappingFrameworkColumn").height());
                ctx.fillStyle = 'rgb(255,255,255)';
               
                ctx.fillRect(0, 0, canvas.width, $("#mappingFrameworkColumn").height());
            }
            
        }
        
//        for (var i = 0;i < allElementsMe.length;i++)
//        {
//        	for (var j = 0;j < allElementsRight.length;j++)
//        	{
//        		var mine = $(allElementsMe[i]);
//        		var right = $(allElementsRight[j]);
//        		var pointA = {left:mine.position().left+mine.outerWidth(),top:mine.position().top+mine.outerHeight(true)/2};
//        		var pointB = {left:right.position().left,top:right.position().top+right.outerHeight(true)/2};
//				ctx.beginPath();
//        		ctx.fillStyle="#000000";
//        		ctx.moveTo(pointA.left,pointA.top);
//        		ctx.lineTo(pointB.left,pointB.top);
//        		ctx.stroke();
//        	}
//        }
    }
    AlignmentEditorColumn.prototype.bindControls = function (containerId) {
        var me = this;
        var container = $(containerId);
        itemTemplate = container.find(".alignmentEditorContainer").html();
        container.find(".alignmentEditorContainer").html("");
        container.find(".alignmentEditorCategory").change(function (evt) {
            var selectedCategory = container.find(".alignmentEditorCategory option:selected").val();
            container.find(".alignmentEditorCollection").hide();
            container.find(".alignmentEditorContainer").hide();
            container.find(".alignmentEditorContainer").html("");
            container.find(".columnFilter").addClass("hide");
            var source = container.find(".alignmentEditorSource");
            source.html("<option disabled selected value> -- Select Source -- </option>").show();
            var lookup = {
            	"course":"Courses",
            	"competency":"Frameworks",
            	"credential":"Credentials",
            	"badge":"Badges",
            	"resource":"Resources"
            };
            for (var name in AppController.serverController.serverList)
    			source.append("<option/>").children().last().attr("value", AppController.serverController.serverList[name]).text(name + " " + lookup[selectedCategory]);
            me.redraw();
        });
        container.find(".alignmentEditorSource").change(function (evt) {
            var selectedCategory = container.find(".alignmentEditorCategory option:selected").val();
            var selectedSource = container.find(".alignmentEditorSource option:selected").val();
            var collection = container.find(".alignmentEditorCollection");
            container.find(".alignmentEditorContainer").hide();
            collection.html("<option disabled selected value> -- Select Framework -- </option>").hide();
            me.selectedCategory = selectedCategory;
            me.selectedSource = selectedSource;
            me.sourceRepo = new EcRepository();
            me.sourceRepo.selectedServer = selectedSource;
            me.sourceRepo.autoDetectRepository();
            if (selectedCategory == "course") {
                me.populateListCourses();
            }
            if (selectedCategory == "competency") {
            	container.find(".alignmentEditorContainer").html("");
            	container.find(".columnFilter").addClass("hide");
                EcFramework.search(me.sourceRepo, "", function (ary) {
                    for (var i = 0; i < ary.length; i++) {
                        var framework = ary[i];
                        collection.append("<option/>").children().last().attr("value", framework.shortId()).text(framework.getName());
                    }
                    collection.show();
                    me.redraw();
                }, function (error) {
                },{size:5000});
            }else{
            	var sourceName = container.find(".alignmentEditorSource option:selected").text();
                container.find(".alignmentEditorColumnSelectCollapsed").html("<i class='fa fa-caret-right'></i> "+sourceName);
            	container.find(".alignmentEditorColumnSelects").slideUp(function () {
	                me.redraw();
	                if (me.screenHook != null)
	                    me.screenHook();
	            });
            	if(selectedSource != undefined && selectedSource != ""){
                	container.find(".columnFilter").removeClass("hide");
                	container.find(".alignmentEditorColumnSelectCollapsed").addClass("navigationHidden");
                }
            }
            if (selectedCategory == "credential") {
                me.populateListCredentials();
            }
            if (selectedCategory == "badge") {
                me.populateListBadges();
            }
            if (selectedCategory == "resource") {
                me.populateListResources();
            }
            me.redraw();
            container.find(".alignmentEditorContainer").hide();
            container.find(".loadingRow").show();
        });
        container.find(".alignmentEditorCollection").change(function (evt) {
            var selectedCategory = container.find(".alignmentEditorCategory option:selected").val();
            var selectedSource = container.find(".alignmentEditorSource option:selected").val();
            var selectedCollection = container.find(".alignmentEditorCollection option:selected").val();
            container.find(".alignmentEditorContainer").hide();
            me.selectedCategory = selectedCategory;
            me.selectedSource = selectedSource;
            me.selectedCollection = selectedCollection;
            if (selectedCategory == "course") {
                me.populateListCourses();
            }
            if (selectedCategory == "competency") {
                me.populateListCompetencies();
                
                var sourceName = container.find(".alignmentEditorSource option:selected").text().substring(0, container.find(".alignmentEditorSource option:selected").text().length - 11);
            	var collectionName = container.find(".alignmentEditorCollection option:selected").text()
                container.find(".alignmentEditorColumnSelectCollapsed").html("<i class='fa fa-caret-right'></i> "+sourceName+" : "+collectionName);
            	container.find(".alignmentEditorColumnSelects").slideUp(function () {
	                me.redraw();
	                if (me.screenHook != null)
	                    me.screenHook();
	            });
            }
            if (selectedCategory == "badge") {
                me.populateListBadges();
            }
            if (selectedCategory == "credential") {
                me.populateListCredentials();
            }
            if (selectedCategory == "resource") {
                me.populateListResources();
            }
            me.redraw();
            if (!container.find(".alignmentEditorColumnSelectCollapsed").hasClass("navigationHidden")){
	        	container.find(".alignmentEditorColumnSelectCollapsed").addClass("navigationHidden");
	        	container.find(".columnFilter").removeClass("hide");
	        }
        });
        container.find(".columnFilter").keyup(function (evt) {
            me.deselectAll();
            me.filter = container.find(".columnFilter").val();
            me.populate();
        })
        container.find(".alignmentEditorColumnSelectCollapsed").click(function (evt) {
            me.toggleNavigation(evt);
        });
    }
    AlignmentEditorColumn.prototype.toggleNavigation = function (evt) {
        var me = this;
        var container = $(me.containerId);
        if (container.find(".alignmentEditorColumnSelectCollapsed").hasClass("navigationHidden")){
        	var text = container.find(".alignmentEditorColumnSelectCollapsed").text();
        	container.find(".alignmentEditorColumnSelectCollapsed").html("<i class='fa fa-caret-down'></i> "+text);
        	container.find(".alignmentEditorColumnSelectCollapsed").removeClass("navigationHidden");
        	
        	var selectedCategory = container.find(".alignmentEditorCategory option:selected").val();
            var selectedSource = container.find(".alignmentEditorSource option:selected").val();
            var selectedCollection = container.find(".alignmentEditorCollection option:selected").val();
            
            if((selectedCategory == "competency" && selectedCollection != undefined && selectedCollection != "") 
            		|| (selectedCategory != "competency" && selectedSource != undefined && selectedSource != "")){
            	container.find(".columnFilter").removeClass("hide");
            }else{
            	container.find(".columnFilter").addClass("hide");
            }
        	
        }else{
        	var text = container.find(".alignmentEditorColumnSelectCollapsed").text();
        	container.find(".alignmentEditorColumnSelectCollapsed").html("<i class='fa fa-caret-right'></i> "+text);
        	container.find(".alignmentEditorColumnSelectCollapsed").addClass("navigationHidden");
        }
            
        container.find(".alignmentEditorColumnSelects").slideToggle(function () {
            me.redraw();
            if (me.screenHook != null)
                me.screenHook();
        });

    }
    return AlignmentEditorColumn;
})(AlignmentEditorColumn);
AlignmentEditorScreen = (function(AlignmentEditorScreen){

	var columnCounter = 0;
	AlignmentEditorScreen.prototype.createColumnDiv = function(){
		var col = $("#alignmentEditorColumns").append('<div class="columns large-4"/>').children().last();

		var id = "alignmentEditorColumn"+columnCounter++;
		col.attr("id",id);

		return "#"+id;
	}
	AlignmentEditorScreen.prototype.updateControls = function(){
		$(this.containerId+" #alignmentEditorControls button").attr("disabled","true");
		if (this.columns.length != 2)
			return;
		if (this.columns[0].selected.length > 0)
			$("#alignmentEditorDeselectLeft").attr("disabled",null);
		if (this.columns[1].selected.length > 0)
			$("#alignmentEditorDeselectRight").attr("disabled",null);
		if (this.columns[0].collection.length == 0)
			return;
		if (this.columns[1].collection.length == 0)
			return;
		if (this.columns[0].selected.length == 0)
			return;
		if (this.columns[1].selected.length == 0)
			return;
		var leftType = this.columns[0].selectedCategory;
		var rightType = this.columns[1].selectedCategory;
		if (leftType == "course")
		{
			if (rightType == "course")
			{
				$("#alignmentEditorEquivalent").attr("disabled",null);
				$("#alignmentEditorTeaches").attr("disabled",null);
				$("#alignmentEditorRequires").attr("disabled",null);
			}
			if (rightType == "competency")
			{
				$("#alignmentEditorTeaches").attr("disabled",null);
				$("#alignmentEditorAssesses").attr("disabled",null);
				$("#alignmentEditorRequires").attr("disabled",null);
			}
			if (rightType == "credential")
			{
				$("#alignmentEditorGrants").attr("disabled",null);
				$("#alignmentEditorRequires").attr("disabled",null);
			}
			if (rightType == "resource")
			{
				$("#alignmentEditorTeaches").attr("disabled",null);
				$("#alignmentEditorRequires").attr("disabled",null);
			}
		}
		if (leftType == "credential")
		{
			if (rightType == "course")
			{
				$("#alignmentEditorRequires").attr("disabled",null);
			}
			if (rightType == "competency")
			{
				$("#alignmentEditorAsserts").attr("disabled",null);
				$("#alignmentEditorGrants").attr("disabled",null);
				$("#alignmentEditorRequires").attr("disabled",null);
			}
			if (rightType == "credential")
			{
				$("#alignmentEditorEquivalent").attr("disabled",null);
				$("#alignmentEditorGrants").attr("disabled",null);
				$("#alignmentEditorRequires").attr("disabled",null);
			}
			if (rightType == "resource")
			{
			}
		}
		if (leftType == "competency")
		{
			if (rightType == "competency")
			{
				$("#alignmentEditorEquivalent").attr("disabled",null);
				$("#alignmentEditorRelated").attr("disabled",null);
				$("#alignmentEditorRequires").attr("disabled",null);
				$("#alignmentEditorNarrows").attr("disabled",null);
				$("#alignmentEditorDesires").attr("disabled",null);
				$("#alignmentEditorEnables").attr("disabled",null);
			}
		}
		if (leftType == "resource")
		{
			if (rightType == "course")
			{
				$("#alignmentEditorRequires").attr("disabled",null);
			}
			if (rightType == "competency")
			{
				$("#alignmentEditorTeaches").attr("disabled",null);
				$("#alignmentEditorAssesses").attr("disabled",null);
				$("#alignmentEditorRequires").attr("disabled",null);
			}
			if (rightType == "credential")
			{
				$("#alignmentEditorRequires").attr("disabled",null);
			}
			if (rightType == "resource")
			{
				$("#alignmentEditorEquivalent").attr("disabled",null);
				$("#alignmentEditorRequires").attr("disabled",null);
			}
		}
		if (leftType == "badge")
		{
			if (rightType == "competency")
			{
				$("#alignmentEditorAsserts").attr("disabled",null);
			}
		}
	}
	AlignmentEditorScreen.prototype.reflow = function(){
		if(this.columns != undefined && this.columns.length > 1){
			var leftType = this.columns[0].selectedCategory;
			var rightType = this.columns[1].selectedCategory;
			if(leftType == "competency" && rightType == "competency"){
				var leftFrameworkId = this.columns[0].selectedCollection;
				var rightFrameworkId = this.columns[1].selectedCollection;
				var leftFramework, rightFramework;
				
				if(leftFrameworkId != null && leftFrameworkId != undefined && leftFrameworkId != "")
					leftFramework = EcFramework.getBlocking(leftFrameworkId);
				
				if(rightFrameworkId != null && rightFrameworkId != undefined && rightFrameworkId != "")
					rightFramework = EcFramework.getBlocking(rightFrameworkId);
				
				if(leftFramework != undefined && rightFramework != undefined && leftFramework != null && rightFramework != null){
					if(leftFrameworkId == rightFrameworkId){
						if (AppController.identityController.canEdit(leftFramework)){
							ViewManager.getView("#alignmentEditorMessageContainer").clearWarning("noEdit");
						}else{
							ViewManager.getView("#alignmentEditorMessageContainer").displayWarning("Cannot modify this framework, please select a different framework or two frameworks to align with each other", "noEdit");
						}
						
						$("#mappingFrameworkColumn").slideUp();
						var ctx = $("#canvas")[0].getContext("2d");
						ctx.clearRect(0, 0, canvas.width,  $("#mappingFrameworkColumn").height());
		                ctx.fillStyle = 'rgb(255,255,255)';
		               
		                ctx.fillRect(0, 0, canvas.width, $("#mappingFrameworkColumn").height());
					}else{
						var leftEdit = false;
						var rightEdit = false;
						
						if (AppController.identityController.canEdit(leftFramework)){
							leftEdit = true;
						}
						
						if(AppController.identityController.canEdit(rightFramework)){
							rightEdit = true;
						}
						
						if(!leftEdit && !rightEdit){
							ViewManager.getView("#alignmentEditorMessageContainer").displayWarning("Cannot modify either framework, created relationships will not be placed in a framework unless a third 'mapping' framework is chosen below", "noEdit");
							$("#mappingFrameworkColumn").slideDown();
						}else{
							ViewManager.getView("#alignmentEditorMessageContainer").clearWarning("noEdit");
							$("#mappingFrameworkColumn").slideUp();
						}
					}
				}else{
					$("#mappingFrameworkColumn").slideUp();
				}
			}
		}
		
		var ctr = $(".alignmentEditorContainer:visible");
		var ctrMinTop = canvas.height;
		var ctrMaxTop = 0;
		for (var i = 0;i < ctr.length;i++)
		{
			$(ctr[i]).css("height",$("#alignmentEditorColumns").innerHeight() - ($(ctr[i]).position().top - $("#alignmentEditorColumns").position().top));
//			ctrMinTop = Math.min(ctrMinTop,$(ctr[i]).position().top);
//			ctrMaxTop = Math.max(ctrMaxTop,$(ctr[i]).position().top);
		}
//		$(".alignmentEditorContainer").css("height",$("#alignmentEditorColumns").innerHeight()-ctrMinTop);
		for (var i = 0; i < this.columns.length; i++)
			this.columns[i].redraw();
	}

	AlignmentEditorScreen.prototype.bindControls = function(containerId){
		var me = this;
		var resizer = function(evt){
			me.reflow();
		};
		$(window).resize(resizer);
		var controls = $(containerId+" #alignmentEditorControls");
		controls.append("<button class='button' id='alignmentEditorDeselectLeft' disabled title='Deselect all items on the left side.'>"+"Left: Deselect All"+"</button>").children().last().click(function(evt){
			me.columns[0].deselectAll();
		});
		controls.append("<button class='button' id='alignmentEditorEquivalent' style='background:black;' disabled title='Items on the left are de-facto or functionally equivalent to items on the right.'>"+"Equivalent"+"</button>").children().last().click(function(evt){
			me.createRelations(Relation.IS_EQUIVALENT_TO);
		});
		controls.append("<button class='button' id='alignmentEditorRelated' style='background:gray;' disabled title='Items on the left and right are related in some non-functional way.'>"+"Related To"+"</button>").children().last().click(function(evt){
			me.createRelations(Relation.IS_RELATED_TO);
		});
		controls.append("<button class='button' id='alignmentEditorNarrows' style='background:blue;' disabled title='Items on the left are sub-items of items on the right.'>"+"Narrows"+"</button>").children().last().click(function(evt){
			me.createRelations(Relation.NARROWS);
		});
		controls.append("<button class='button' id='alignmentEditorDesires' style='background:orange;color:black;' disabled title='Items on the left are positively influenced by items on the right.'>"+"Desires"+"</button>").children().last().click(function(evt){
			me.createRelations(Relation.DESIRES);
		});
		controls.append("<button class='button' id='alignmentEditorRequires' style='background:chocolate;' disabled title='Items on the left require items on the right for completion.'>"+"Requires"+"</button>").children().last().click(function(evt){
			me.createRelations(Relation.REQUIRES);
			me.createAlignments("requires");
		});
		controls.append("<button class='button' id='alignmentEditorTeaches' style='background:green;' disabled title='Items on the left teach about items on the right.'>"+"Teaches"+"</button>").children().last().click(function(evt){
			me.createAlignments("teaches");
		});
		controls.append("<button class='button' id='alignmentEditorAssesses' style='background:red;' disabled title='Items on the left assess knowledge about items on the right.'>"+"Assesses"+"</button>").children().last().click(function(evt){
			me.createAlignments("assesses");
		});
		controls.append("<button class='button' id='alignmentEditorAsserts' style='background:pink;' disabled title='Items on the left assess knowledge about items on the right.'>"+"Asserts"+"</button>").children().last().click(function(evt){
			me.createAlignments("http://schema.cassproject.org/0.2/vocab/asserts");
		});
		controls.append("<button class='button' id='alignmentEditorDeselectRight' disabled title='Deselect all items on the right side.'>"+"Right: Deselect All"+"</button>").children().last().click(function(evt){
			me.columns[1].deselectAll();
        });
		controls.append("<button class='button' id='alignmentEditorHelp' disabled style='float:right;'>"+"?"+"</button>");

		setTimeout(function(){me.reflow()},100);
	}
	return AlignmentEditorScreen;
})(AlignmentEditorScreen);AlignmentExplorerColumn = (function (AlignmentExplorerColumn) {

    AlignmentExplorerColumn.prototype.redrawJsInit = function () {
		$(this.containerId).find(".alignmentEditorElement").removeClass("highlighted");
    }
    AlignmentExplorerColumn.prototype.redrawJsFinal = function () {

        $(this.containerId).find(".loadingRow").hide();
        $(this.containerId).find(".alignmentEditorContainer").show();
    	var selectedTotal = 0;
    	var me=this;
    	while (me != null)
    	{
    		selectedTotal += me.selected;
    		me=me.left;
    	}
    	me = this;
    	while (me != null)
    	{
    		selectedTotal += me.selected;
    		me=me.right;
    	}
    	me = this;
    	if (selectedTotal == 0)
			if ($(this.containerId).find(".alignmentEditorElement.highlighted").length == 0)
				$(this.containerId).find(".alignmentEditorElement").addClass("highlighted");
		if (me.left == null && me.right == null)
			$(this.containerId).find(".alignmentEditorElement").addClass("highlighted");
    }
    AlignmentExplorerColumn.prototype.redrawJs = function () {
    	var selected = [];
    	var leftContainerId = null;
		var me=this;
		while (me != null)
		{
			selected = selected.concat(me.selected);
			leftContainerId = me.containerId;
			me=me.left;
		}
		me = this.right;
		while (me != null)
		{
			selected = selected.concat(me.selected);
			me=me.right;
		}
		for (var i = 0;i < selected.length;i++)
			$("[id=\""+selected[i].shortId()+"\"]").addClass("highlighted");
		if (this.relations != null)
			for (var i = 0;i < this.relations.length;i++){
				var relation = this.relations[i];
				if (new Relation().isA(relation.type)) {

					var src = $("[id=\""+relation.source+"\"]");
					if (src.length == 0) continue;
					var tgt = $("[id=\""+relation.target+"\"]");
					if (tgt.length == 0) continue;
					if ($(leftContainerId).find("[id=\""+relation.source+"\"]").length > 0)
						src.addClass("highlighted");
					if ($(leftContainerId).find("[id=\""+relation.target+"\"]").length > 0)
						tgt.addClass("highlighted");
					if (src.hasClass("highlighted") == false && selected.length > 0)
						continue;
					if (tgt.hasClass("highlighted") == false && selected.length > 0)
						continue;
					src.addClass("highlighted");
					tgt.addClass("highlighted");
				}
				if (new CreativeWork().isA(relation.type)) {
					var src = $("[id=\""+relation.url+"\"]");
					if (src.length == 0) continue;
					if (relation.educationalAlignment == null) continue;
					var tgt = $("[id=\""+relation.educationalAlignment.targetUrl+"\"]");
					if (tgt.length == 0) continue;
					if ($(leftContainerId).find("[id=\""+relation.url+"\"]").length > 0)
						src.addClass("highlighted");
					if ($(leftContainerId).find("[id=\""+relation.educationalAlignment.targetUrl+"\"]").length > 0)
						tgt.addClass("highlighted");
					if (src.hasClass("highlighted") == false && selected.length > 0)
						continue;
					if (tgt.hasClass("highlighted") == false && selected.length > 0)
						continue;
					src.addClass("highlighted");
					tgt.addClass("highlighted");
				}
			}

//		if ((this.selected.length > 0 || selectedTotal == 0) && this.highlighted.length == 0 && this.right != null && this.right.relations != null && this.right.relations.length > 0)
//		{
//			var counter = 0;
//			for (var i = 0;i < this.right.relations.length;i++){
//				var relation = this.right.relations[i];
//				if (new Relation().isA(relation.type)) {
//					counter += $(this.containerId).find("[id=\""+relation.source+"\"]").addClass("highlighted").length;
//					counter += $(this.containerId).find("[id=\""+relation.target+"\"]").addClass("highlighted").length;
//				}
//				if (new CreativeWork().isA(relation.type)) {
//					counter += $(this.containerId).find("[id=\""+relation.url+"\"]").addClass("highlighted").length;
//					if (relation.educationalAlignment != null)
//						counter += $(this.containerId).find("[id=\""+relation.educationalAlignment.targetUrl+"\"]").addClass("highlighted").length;
//				}
//			}
//			if (counter == 0 && this.relations != null)
//			{
//				for (var i = 0;i < this.relations.length;i++){
//					var relation = this.relations[i];
//					if (new Relation().isA(relation.type)) {
//						counter += $(this.right.containerId).find("[id=\""+relation.source+"\"]").addClass("highlighted").length;
//						counter += $(this.right.containerId).find("[id=\""+relation.target+"\"]").addClass("highlighted").length;
//					}
//					if (new CreativeWork().isA(relation.type)) {
//						counter += $(this.right.containerId).find("[id=\""+relation.url+"\"]").addClass("highlighted").length;
//						if (relation.educationalAlignment != null)
//							counter += $(this.right.containerId).find("[id=\""+relation.educationalAlignment.targetUrl+"\"]").addClass("highlighted").length;
//					}
//				}
//			}
//		}
//		if ((this.selected.length > 0 || selectedTotal == 0) && this.highlighted.length == 0 && this.left != null && this.left.relations != null && this.left.relations.length > 0)
//		{
//			var counter = 0;
//			for (var i = 0;i < this.left.relations.length;i++){
//				var relation = this.left.relations[i];
//				if (new Relation().isA(relation.type)) {
//					counter += $(this.containerId).find("[id=\""+relation.source+"\"]").addClass("highlighted").length;
//					counter += $(this.containerId).find("[id=\""+relation.target+"\"]").addClass("highlighted").length;
//				}
//				if (new CreativeWork().isA(relation.type)) {
//					counter += $(this.containerId).find("[id=\""+relation.url+"\"]").addClass("highlighted").length;
//					if (relation.educationalAlignment != null)
//						counter += $(this.containerId).find("[id=\""+relation.educationalAlignment.targetUrl+"\"]").addClass("highlighted").length;
//				}
//			}
//			if (counter == 0 && this.relations != null)
//			{
//				for (var i = 0;i < this.relations.length;i++){
//					var relation = this.relations[i];
//					if (new Relation().isA(relation.type)) {
//						counter += $(this.left.containerId).find("[id=\""+relation.source+"\"]").addClass("highlighted").length;
//						counter += $(this.left.containerId).find("[id=\""+relation.target+"\"]").addClass("highlighted").length;
//					}
//					if (new CreativeWork().isA(relation.type)) {
//						counter += $(this.left.containerId).find("[id=\""+relation.url+"\"]").addClass("highlighted").length;
//						if (relation.educationalAlignment != null)
//							counter += $(this.left.containerId).find("[id=\""+relation.educationalAlignment.targetUrl+"\"]").addClass("highlighted").length;
//					}
//				}
//			}
//		}
		$(this.containerId).find(".alignmentEditorElement ul li").remove();
		for (var i = 0;i < this.highlighted.length;i++)
		{
			$(this.containerId).find("[id='"+this.highlighted[i].shortId()+"']").addClass("highlighted");
			var comments = this.idToComments[this.highlighted[i].shortId()];
			if (comments != null)
			{
				for (var j = 0;j < comments.length;j++)
				{
					var comment = $(this.containerId).find("[id='"+this.highlighted[i].shortId()+"'] ul").append("<li/>").children().last();
					comment.text(comments[j]);
					if (this.idToCommentHighlight[comments[j]] == true)
                    	comment.addClass("fulfilled");

				}
			}
		}
    }
    return AlignmentExplorerColumn;
})(AlignmentExplorerColumn);AlignmentExplorerScreen = (function(AlignmentExplorerScreen){

	var columnCounter = 0;
	AlignmentExplorerScreen.prototype.createColumnDiv = function(){
		var col = $("#alignmentExplorerColumns").append('<div class="columns large-3"/>').children().last();

		var id = "alignmentExplorerColumn"+columnCounter++;
		col.attr("id",id);

		return "#"+id;
	}
	AlignmentExplorerScreen.prototype.reflow = function(){
		var ctr = $(".alignmentEditorContainer:visible");
		var ctrMinTop = canvas.height;
		var ctrMaxTop = 0;
		for (var i = 0;i < ctr.length;i++)
		{
			ctrMinTop = Math.min(ctrMinTop,$(ctr[i]).position().top);
			ctrMaxTop = Math.max(ctrMaxTop,$(ctr[i]).position().top);
		}
		$(".alignmentEditorContainer").css("height",window.innerHeight-ctrMinTop);
		for (var i = 0; i < this.columns.length; i++)
			this.columns[i].redrawJsInit();
		for (var i = 0; i < this.columns.length; i++)
			this.columns[i].redraw();
		for (var i = 0; i < this.columns.length; i++)
			this.columns[i].redrawJsFinal();
	}
	AlignmentExplorerScreen.prototype.bindControls = function(containerId){
		var me = this;
		setTimeout(function(){me.reflow()},100);
	}
	return AlignmentExplorerScreen;
})(AlignmentExplorerScreen);/**
 * View that controls the menu at the top of the CASS Manager
 * app. Controls the loggedIn/loggedOut status of the menu and
 * handles what happens when clicking on menu items.
 * 
 * @class AppMenu
 * @author devlin.junker@eduworks.com
 */
var AppMenu = (function (AppMenu) {

    /**
     * Handles selecting the current identity that the user wants
     * to act as. This connects to the IdentityController and selects
     * the identity then changes the menu to show the selected identity.
     *
     * @memberOf AppMenu
     * @method selectKey
     * @private
     * @param {String} ppk
     * 			PEM representation of PPK
     */
    function selectKey(ppk) {
        $("#appMenuIdentityList").find(".fake-a").removeClass("selected");
        $("#appMenuIdentityList").find("[title='" + ppk + "']").addClass("selected");

        AppController.identityController.select(ppk);

        ScreenManager.replaceScreen(ScreenManager.getCurrentScreen());

        $("#appMenuUserIdentity").children().first().text(AppController.identityController.selectedIdentity.displayName + " @ " + AppController.serverController.selectedServerName);
    }

    var PUBLIC_NAME = "Public";
    var PUBLIC_TITLE = "No Personal Identity, all objects created will be owned by the public";

    /**
     * Deselects the users identity, so the user is acting as public and not
     * under a specific key identity. Changes the menu to match.
     *
     * @memberOf AppMenu
     * @method deselectKey
     * @private
     */
    function deselectKey() {
        $("#appMenuIdentityList").find(".fake-a").removeClass("selected");
        $("#appMenuIdentityList").find("[title='" + PUBLIC_TITLE + "']").addClass("selected");

        AppController.identityController.unselect();

        ScreenManager.replaceScreen(ScreenManager.getCurrentScreen());

        $("#appMenuUserIdentity").children().first().text(PUBLIC_NAME + " @ " + AppController.serverController.selectedServerName);
    }

    /**
     * Builds the list of possible key-based identities of the
     * currently logged in user in the menu for selecting/deselecting
     *
     * @memberOf AppMenu
     * @method buildIdentityList
     * @private
     */
    function buildIdentityList() {
        var identities = EcIdentityManager.ids;

        $("#sessionIdentitySelect").find("option[data-id]").remove();

        var identitySelected = false;
        for (var index in identities) {
            var ppk = identities[index].ppk.toPem().replaceAll("\r?\n", "");
            var name = identities[index].displayName;

            var option = $("<option data-id='true' value='"+ppk+"'></option>");
            option.text(name);


            if (AppController.identityController.selectedIdentity != undefined &&
                name == AppController.identityController.selectedIdentity.displayName) {
                option.prop("selected", true);
                identitySelected = true;
            }
            $("#sessionIdentitySelect").prepend(option);


           // element.click(ppk, function (event) {
           //     selectKey(event.data);
           // });
        }

        var container = $("<option data-id='true' value='public'>PUBLIC_NAME</option>");


        container.prepend(container);
        $("#appMenuIdentityList").prepend(container);
    }

    /**
	 * Function to pass to the callback parameter of the login modal,
	 * to be called when the user has successfully logged in.
	 * 
	 * @memberOf AppMenu
	 * @method loginModalCallback
	 * @private
	 */
	function loginModalCallback(){
		var screenName;
		
		if(ScreenManager.getCurrentScreen().getDisplayName != null){
			screenName = ScreenManager.getCurrentScreen().getDisplayName();
		}else{
			screenName = ScreenManager.getCurrentScreen().displayName;
		}
		
		if(screenName == WelcomeScreen.displayName){
			ModalManager.hideModal();
			ScreenManager.changeScreen(new UserIdentityScreen())
		}else{
			ModalManager.hideModal();
			ScreenManager.replaceScreen(ScreenManager.getCurrentScreen());
		}
	}
	
	/**
	 * Function to build the a list item of a recently viewed competency
	 * 
	 * @memberOf AppMenu
	 * @method buildCompetencyItem
	 * @private
	 * @param {String} compId
	 * 			ID of a competency to build an item for
	 */
	function buildCompetencyItem(compId){
		compId = EcRemoteLinkedData.trimVersionFromUrl(compId);
		if($("#appMenuRecentList li[data-id='"+compId+"']").size() == 0){
			EcCompetency.get(compId, function(comp){
				var recentListItem = $("<li data-recent='competency'><a></a></li>")
				recentListItem.attr("data-id", compId);
				recentListItem.find("a").text(comp.getName());
				recentListItem.find("a").attr("title", compId);
				recentListItem.find("a").attr("href", "#"+CompetencyViewScreen.prototype.getDisplayName()+"?id="+compId)
				recentListItem.find("a").click(function(ev){
					ev.preventDefault();
					ScreenManager.changeScreen(new CompetencyViewScreen(comp));
					return false;
				})
				$("#appMenuCompetencyListStart").after(recentListItem);
				$("#appMenuCompetencyListStart").removeClass("hide");
			}, function(){
				AppController.storageController.removeRecent(EcCompetency.myType, compId);
			});
		}
	}
	
	/**
	 * Function to build the list of recently viewed competencies
	 * 
	 * @memberOf AppMenu
	 * @method buildCompetencyList
	 * @private
	 * @param {Array<String>} compList
	 * 			List of competency IDs
	 */
	function buildCompetencyList(compList){
		if(compList != null && compList.length > 0){
			$("#appMenuNoRecent").addClass("hide");
			$("#appMenuCompetencyListStart").nextAll("[data-recent='competency']").remove();
			for(var idx in compList){
				buildCompetencyItem(compList[idx]);
			}
		}else{
			$("#appMenuCompetencyListStart").nextAll("[data-id]").remove();
			$("#appMenuCompetencyListStart").addClass("hide");
		}
	}
	
	/**
	 * Function to build a list item for a recently viewed framework 
	 * 
	 * @memberOf AppMenu
	 * @method buildFrameworkItem
	 * @private
	 * @param {String} compId
	 * 			ID of a competency to build an item for
	 */
	function buildFrameworkItem(frameworkId){
		frameworkId = EcRemoteLinkedData.trimVersionFromUrl(frameworkId);
		if($("#appMenuRecentList li[data-id='"+frameworkId+"']").size() == 0){
			EcFramework.get(frameworkId, function(framework){
				var recentListItem = $("<li data-recent='framework'><a></a></li>")
				recentListItem.attr("data-id", frameworkId);
				recentListItem.find("a").text(framework.getName());
				recentListItem.find("a").attr("title", frameworkId);
				recentListItem.find("a").attr("href", "#"+FrameworkViewScreen.prototype.getDisplayName()+"?id="+frameworkId)
				recentListItem.find("a").click(function(ev){
					ev.preventDefault();
					ScreenManager.changeScreen(new FrameworkViewScreen(framework));
					return false;
				})
				$("#appMenuFrameworkListStart").after(recentListItem);
				$("#appMenuFrameworkListStart").removeClass("hide");
			}, function(){
				AppController.storageController.removeRecent(EcFramework.myType, frameworkId);
			});
		}
	}
	
	/**
	 * Function to build the list of recently viewed framework
	 * 
	 * @memberOf AppMenu
	 * @method buildFrameworkList
	 * @private
	 */
	function buildFrameworkList(frameworkList){
		if(frameworkList != null && frameworkList.length > 0){
			$("#appMenuNoRecent").addClass("hide");
			var inList = $("#appMenuFrameworkListStart").nextAll("[data-recent='framework']");
			inList.each(function(idx, el){
				if(frameworkList.indexOf($(el).attr("data-id")) == -1){
					$(el).remove();
				}
			})
			for(var idx in frameworkList){
				buildFrameworkItem(frameworkList[idx]);
			}
		}else{
			$("#appMenuFrameworkListStart").nextAll("[data-id]").remove();
			$("#appMenuFrameworkListStart").addClass("hide");
		}
	}

    function buildServerList() {
	    var serverList = AppController.serverController.getServerList();

	    var select = $("#sessionServerSelect");
	    var loginSelect = $("#sessionLoginSelect");
	    select.find("option[value]").remove();
	    loginSelect.find("option[value]").not("[value='google']").remove();
        if(serverList != null && Object.keys(serverList).length > 0){
            select.removeClass("noServers");
            select.find("#noServers").addClass("hide");
            select.find("#noServers").removeAttr("selected");
            select.removeAttr("disabled");

            var i = 0;
            for(var name in serverList){
                if (i < 2 && !AppController.loginController.getLoggedIn()){
                    loginSelect.append($("<option value='"+serverList[name]+"'>to "+name+"</option>"))

                }else if(i == 2){
                    loginSelect.append($("<option value='new'>to Other...</option>"));
                }
                i++;
                if(name === AppController.serverController.selectedServerName)
                    select.append($("<option selected='selected' value='"+serverList[name]+"'>"+name+"</option>"))
                else
                    select.append($("<option value='"+serverList[name]+"'>"+name+"</option>"))
            }

            if(!AppController.loginController.getLoggedIn()){
                loginSelect.append($("<option value='create'>Create Account</option>"));
            }
        }else{
            select.addClass("noServers");
            select.find("#noServers").removeClass("hide");
            select.find("#noServers").attr("selected", "selected");
            select.attr("disabled", true);
        }

    }

    function attemptLogin(){
        var userId = $("#appMenuLoginUser").val();
        var password = $("#appMenuLoginPass").val();
        var server = $("#sessionLoginSelect").val();


        if((userId == undefined || userId == "" ) && (password == undefined || password == "")){
            $("#appMenuLoginUser").addClass("error");
            $("#appMenuLoginPass").addClass("error");
            return;
        }else if(userId == undefined || userId == ""){
            $("#appMenuLoginUser").addClass("error");
            $("#appMenuLoginPass").removeClass("error");
            return;
        }else if(password == undefined || password == ""){
            $("#appMenuLoginPass").addClass("error");
            $("#appMenuLoginUser").removeClass("error");
            return;
        }
        $("#appMenuLoginUser").removeClass("error");
        $("#appMenuLoginPass").removeClass("error");

        $("#appMenuLoginSpinner").next().addClass("hide");
        $("#appMenuLoginSpinner").removeClass("hide");
        $("#appMenuLoginUser").prop("disabled", true);
        $("#appMenuLoginPass").prop("disabled", true);
        AppController.loginController.login(userId, password, server, function() {
            AppController.serverController.checkForAdmin(function() {
                ViewManager.getView("#menuContainer").setLoggedIn();
                $("#appMenuLoginPanel").animate({right:"-100%"}, 800);
                $("#appMenuLoginSpinner").next().removeClass("hide");
                $("#appMenuLoginSpinner").addClass("hide");
                $("#appMenuLoginUser").removeAttr("disabled").val("");
                $("#appMenuLoginPass").removeAttr("disabled").val("");
                $("#sessionLoginSelect").find("option").not("[value]").prop("selected", "true");
            });
        }, function(err){
            $("#appMenuLoginUser").addClass("error");
            $("#appMenuLoginPass").addClass("error");
            $("#appMenuLoginSpinner").next().removeClass("hide");
            $("#appMenuLoginSpinner").addClass("hide");
            $("#appMenuLoginUser").removeAttr("disabled");
            $("#appMenuLoginPass").removeAttr("disabled");
        });
    }

    function setupMenuButtons(){
        $("#appMenuHeader").attr("href", "#" + WelcomeScreen.prototype.getDisplayName())
        $("#appMenuHeader").click(function (ev) {
            ev.preventDefault();
            ScreenManager.changeScreen(new WelcomeScreen());
            return false;
        });



        $("#appMenuRepoSearch").attr("href", "#" + RepoSearchScreen.prototype.getDisplayName());
        $("#appMenuRepoSearch").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new RepoSearchScreen());
        });
        $("#appMenuRepository").attr("href", "#" + RepoSearchScreen.prototype.getDisplayName());
        $("#appMenuRepository").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new RepoSearchScreen());
        })


        $("#appMenuRepoCreate").attr("href", "#" + RepoCreateScreen.prototype.getDisplayName());
        $("#appMenuRepoCreate").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new RepoCreateScreen());
        });

        $("#appMenuGeneralImport").click(function(event){
            event.preventDefault();
            ModalManager.showModal(new RepoImportModal());
        });

        $("#appMenuFileManager").attr("href", "#" + FileManagerScreen.prototype.getDisplayName());
        $("#appMenuFileManager").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new FileManagerScreen());
        });

        $("#appMenuFrameworks").attr("href", "#" + FrameworkSearchScreen.prototype.getDisplayName());
        $("#appMenuFrameworks").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new FrameworkSearchScreen());
        });

        $("#appMenuFrameworkSearch").attr("href", "#" + CompetencySearchScreen.prototype.getDisplayName());
        $("#appMenuFrameworkSearch").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new FrameworkSearchScreen());
        });

        $("#appMenuFrameworkCreate").attr("href", "#" + CompetencyEditScreen.prototype.getDisplayName());
        $("#appMenuFrameworkCreate").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new FrameworkEditScreen());
        });

        $("#appMenuCompetencies").attr("href", "#" + CompetencySearchScreen.prototype.getDisplayName());
        $("#appMenuCompetencies").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new CompetencySearchScreen());
        });

        $("#appMenuCompetencySearch").attr("href", "#" + CompetencySearchScreen.prototype.getDisplayName());
        $("#appMenuCompetencySearch").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new CompetencySearchScreen());
        });

        $("#appMenuCompetencyCreate").attr("href", "#" + CompetencyEditScreen.prototype.getDisplayName());
        $("#appMenuCompetencyCreate").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new CompetencyEditScreen());
        });

        $("#appMenuCompetencyImport").click(function (event) {
            event.preventDefault();
            ModalManager.showModal(new ImportCompetenciesModal());
        })


        $("#appMenuRelationships").attr("href", "#" + RelationshipSearchScreen.prototype.getDisplayName());
        $("#appMenuRelationships").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new RelationshipSearchScreen());
        });

        $("#appMenuRelationshipSearch").attr("href", "#" + RelationshipSearchScreen.prototype.getDisplayName());
        $("#appMenuRelationshipSearch").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new RelationshipSearchScreen());
        });

        $("#appMenuRelationshipCreate").attr("href", "#" + RelationshipEditScreen.prototype.getDisplayName());
        $("#appMenuRelationshipCreate").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new RelationshipEditScreen());
        });

        $("#appMenuLevels").attr("href", "#" + RelationshipSearchScreen.prototype.getDisplayName());
        $("#appMenuLevels").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new LevelSearchScreen());
        });

        $("#appMenuLevelSearch").attr("href", "#" + RelationshipSearchScreen.prototype.getDisplayName());
        $("#appMenuLevelSearch").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new LevelSearchScreen());
        });

        $("#appMenuRollupRules").attr("href", "#" + RelationshipSearchScreen.prototype.getDisplayName());
        $("#appMenuRollupRules").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new RollupRuleSearchScreen());
        });

        $("#appMenuRollupRulesSearch").attr("href", "#" + RelationshipSearchScreen.prototype.getDisplayName());
        $("#appMenuRollupRulesSearch").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new RollupRuleSearchScreen());
        });

        $("#appMenuProfile").click(function (event) {
            event.preventDefault();
            ModalManager.showModal(new MessageModal("Not Implemented Yet!", "This feature has not been implemented yet!", "tiny"));
        });

        $("#appMenuAssertions").attr("href", "#" + AssertionSearchScreen.prototype.getDisplayName());
        $("#appMenuAssertions").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new AssertionSearchScreen());
        });


        $("#appMenuAssertionSearch").attr("href", "#" + AssertionSearchScreen.prototype.getDisplayName());
        $("#appMenuAssertionSearch").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new AssertionSearchScreen());
        });

        $("#appMenuAssertionCreate").attr("href", "#" + AssertionEditScreen.prototype.getDisplayName());
        $("#appMenuAssertionCreate").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new AssertionEditScreen());
        });

        $("#appMenuAlignmentEditor").attr("href", "#" + AlignmentEditorScreen.prototype.getDisplayName());
        $("#appMenuAlignmentEditor").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new AlignmentEditorScreen());
        });

        $("#appMenuAlignmentExplorer").attr("href", "#" + AlignmentExplorerScreen.prototype.getDisplayName());
        $("#appMenuAlignmentExplorer").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new AlignmentExplorerScreen());
        });


        $("#appMenuViewPublic").click(function (event) {
            event.preventDefault();
            if(ScreenManager.getCurrentScreen().filterPublic != undefined){
                ScreenManager.getCurrentScreen().filterPublic();
            }
        });

        $("#appMenuViewAll").click(function (event) {
            event.preventDefault();
            if(ScreenManager.getCurrentScreen().filterAll != undefined){
                ScreenManager.getCurrentScreen().filterAll();
            }
        });

        $("#appMenuViewAdvanced").click(function (event) {
            event.preventDefault();
            ModalManager.showModal(new MessageModal("Advanced View Options Incomplete"));
        });

        $("#appMenuSortByTime").click(function (event) {
            event.preventDefault();
            if(ScreenManager.getCurrentScreen().sortByTimestamp != undefined){
                ScreenManager.getCurrentScreen().sortByTimestamp();
            }
        });

        $("#appMenuSortByOwner").click(function (event) {
            event.preventDefault();
            if(ScreenManager.getCurrentScreen().sortByOwner != undefined){
                ScreenManager.getCurrentScreen().sortByOwner();
            }
        });

        $("#appMenuSortBySource").click(function (event) {
            event.preventDefault();
            if(ScreenManager.getCurrentScreen().sortBySource != undefined){
                ScreenManager.getCurrentScreen().sortBySource();
            }
        });

        $("#appMenuSortByTarget").click(function (event) {
            event.preventDefault();
            if(ScreenManager.getCurrentScreen().sortByTarget != undefined){
                ScreenManager.getCurrentScreen().sortByTarget();
            }
        });

        $("#appMenuSortByCompetency").click(function (event) {
            event.preventDefault();
            if(ScreenManager.getCurrentScreen().sortByCompetency != undefined){
                ScreenManager.getCurrentScreen().sortByCompetency();
            }
        });

        $("#appMenuHowTo").click(function (event) {
            event.preventDefault();
            ModalManager.showModal(new MessageModal("How To Incomplete"));
        });

        $("#appMenuApi").click(function (event) {
            event.preventDefault();
            window.open("http://docs.cassproject.org", "_blank")
        });

        $("#appMenuReportIssue").click(function (event) {
            event.preventDefault();
            ModalManager.showModal(new MessageModal("Report Issue Incomplete"));
        });

        $("#appMenuGetInvolved").click(function (event) {
            event.preventDefault();
            window.open("http://www.cassproject.org", "_blank")
        });
    }

    /**
     * Overridden display function, called once html partial is loaded into DOM
     *
     * @memberOf AppMenu
     * @method display
     * @param {String} containerId
     * 			DOM ID for the element containing this menu
     */
    AppMenu.prototype.display = function (containerId) {
        var view = this;

        $("#appMenuToggle").click(function (ev) {
            ev.preventDefault();
            return false;
        });

        AppMenu.prototype.setCurrentServer();

        setupMenuButtons();
        
     
        var compList = AppController.storageController.getRecent(EcCompetency.myType);
        buildCompetencyList(compList);

        var frameworkList = AppController.storageController.getRecent(EcFramework.myType);
        buildFrameworkList(frameworkList)

        buildServerList();

        $("#appMenuAddServerBtn").click(function(){
            ModalManager.showModal(new AddServerModal());
        });

        $("#sessionServerSelect").change(function(){
            var select = $("#sessionServerSelect");
            var server = select.val();

            AppController.serverController.selectServer(server, function(){
                var options = select.find("option");

                options.removeAttr("selected");
                var selected = options.filter("[value='"+server+"']");

                selected.prop("selected", "true");


                ScreenManager.reloadCurrentScreen();
            }, function(){

            })
        });

        AppController.serverController.onServerChange.push(function(){
        	buildServerList();
        });

        $("#sessionLoginSelect").change(function(){
            var loginSelect = $("#sessionLoginSelect");

            var loginServer = loginSelect.val();

            if(loginServer === "create") {
                ModalManager.showModal(new CreateUserModal());
                loginSelect.find("option").not("[value]").prop("selected", "true");
            }else if(loginServer === "google"){
                AppController.loginController.hello(loginServer, function(){
                    AppController.serverController.checkForAdmin(function() {
                        ViewManager.getView("#menuContainer").setLoggedIn();
                        loginSelect.find("option").not("[value]").prop("selected", "true");
                    });
                }, function(){
                    loginSelect.find("option").not("[value]").prop("selected", "true");
                });
            }else{
                $("#appMenuLoginPanel").animate({right:"0px"}, 800);
            }
        });

        $("#appMenuLoginPanel").submit(attemptLogin);

        $("#sessionIdentitySelect").change(function(){
            var val = $("#sessionIdentitySelect").val();

            if(val == "new"){
                ModalManager.showModal(new CreateIdentityModal(function(){
                    buildIdentityList();
                }));
            }else if(val == "signout"){
                AppController.loginController.logout();
                ViewManager.getView("#menuContainer").setLoggedOut();
                if(ScreenManager.getCurrentScreen().getDisplayName() == "Identity"){
                    ScreenManager.changeScreen(new WelcomeScreen());
                }else{
                    ScreenManager.reloadCurrentScreen();
                }

            }else{
                selectKey(val);
            }
        })

        $("#appMenuIdentityOptionsBtn").click(function(){
            ScreenManager.changeScreen(new UserIdentityScreen());
        })

        $("#closeLoginPanel").click(function(){
            $("#appMenuLoginPanel").animate({right:"-100%"}, 800);
            $("#sessionLoginSelect").find("option").not("[value]").prop("selected", "true");
        });

        if (Foundation.MediaQuery.atLeast("medium")) {
            $("#appMenuMain").removeClass("vertical");
            $("#appMenuPublic").removeClass("vertical");
            $("#appMenuUserInfo").removeClass("vertical");
            $("#appMenuUserInfo").addClass("align-right");
            $("#appMenuUserIdentitySubMenu").removeClass("hide");
            buildIdentityList();
        }


        $(window).on('changed.zf.mediaquery', function (event, name) {
            if (name == "small") {
                $("#appMenuMain").addClass("vertical");
                $("#appMenuPublic").addClass("vertical");
                $("#appMenuUserInfo").addClass("vertical");
                $("#appMenuUserInfo").removeClass("align-right");
                $("#appMenuUserIdentitySubMenu").addClass("hide");

            } else {
                $("#appMenuMain").removeClass("vertical");
                $("#appMenuPublic").removeClass("vertical");
                $("#appMenuUserInfo").removeClass("vertical");
                $("#appMenuUserInfo").addClass("align-right");
                $("#appMenuUserIdentitySubMenu").removeClass("hide");
                buildIdentityList();
            }
        });

    }


    /**
	 * Public method to rebuild the list of user identities, this is useful if
	 * an identity has been added or renamed so the proper identity
	 * names will be displayed.
	 * 
	 * @memberOf AppMenu
	 * @method rebuildIdentityList
	 */
	AppMenu.prototype.rebuildIdentityList = function(){
		buildIdentityList();
	}
	
	/**
	 * Rebuilds the current server display based on the server controllers values
	 * 
	 * @memberOf AppMenu
	 * @method setCurrentServer
	 */
	AppMenu.prototype.setCurrentServer = function(){



	    if(AppController.loginController.loginServer != undefined && AppController.loginController.loginServer.server != undefined &&
            AppController.loginController.loginServer.server != ""){
            $("#appMenuSessionLogout").text("Sign out of "+AppController.loginController.loginServer.server);
        }else{
            $("#appMenuSessionLogout").text("Sign out");
        }

        buildIdentityList();
        buildServerList();
	}

	/**
	 * Sets the menu to the logged in state, showing the identities of the user and the
	 * identity screen link
	 * 
	 * @memberOf AppMenu
	 * @method setLoggedIn
	 */
	AppMenu.prototype.setLoggedIn = function(){

	    $("#appMenuIdentityOptionsBtn").removeClass("invisible");
        $("#sessionIdentitySelect").removeClass("hide");
        $("#sessionLoginSelect").addClass("hide");

		this.setCurrentServer();
		buildIdentityList();
	}
	
	/**
	 * Sets the menu to the logged out state, shows that the user is public and can
	 * login or create an account
	 * 
	 * @memberOf AppMenu
	 * @method setLoggedOut
	 */
	AppMenu.prototype.setLoggedOut = function(){
        $("#appMenuIdentityOptionsBtn").addClass("invisible");
        $("#sessionIdentitySelect").addClass("hide");
        $("#sessionLoginSelect").removeClass("hide");
        buildServerList();
	}
	
	/**
	 * Checks the login controller to see if the user is admin, and if so sets the
	 * admin menu visible
	 * 
	 * @memberOf AppMenu
	 * @method checkAdmin
	 */
	AppMenu.prototype.checkAdmin = function(){
		if( AppController.serverController.getAdmin() )
		{
			$("#appMenuAdmin").removeClass("hide");
		}else{
			$("#appMenuAdmin").addClass("hide");
		}
	}
	
	AppMenu.prototype.showSortBasic = function(){
		$("#appMenuSortBar").removeClass("hide");
		$("#appMenuSortByTime").removeClass("hide");
		$("#appMenuSortByOwner").removeClass("hide");
	}
	
	AppMenu.prototype.showSortRelations = function(){
		$("#appMenuSortBar").removeClass("hide");
		$("#appMenuSortBySource").removeClass("hide");
		$("#appMenuSortByTarget").removeClass("hide");
	}
	
	AppMenu.prototype.showSortByCompetency = function(){
		$("#appMenuSortBar").removeClass("hide");
		$("#appMenuSortByCompetency").removeClass("hide");
	}
	
	AppMenu.prototype.hideSort = function(){
		$("#appMenuSortBar").addClass("hide");
		$("#appMenuSortByTime").addClass("hide");
		$("#appMenuSortByOwner").addClass("hide");
		$("#appMenuSortBySource").addClass("hide");
		$("#appMenuSortByTarget").addClass("hide");
		$("#appMenuSortByCompetency").addClass("hide");
		
	}
	
	AppMenu.prototype.showRepoMenu = function(show){
		if(show){
			$("#appMenuRepo").removeClass("hide");
		}else{
			$("#appMenuRepo").addClass("hide");
		}
	}
	
	AppMenu.prototype.showExamplesMenu = function(show){
		if(show){
			$("#appMenuExamples").removeClass("hide");
		}else{
			$("#appMenuExamples").addClass("hide");
		}
	}
	
	AppMenu.prototype.buildRecentCompetencyList = function(list){
		buildCompetencyList(list);
	}
	
	AppMenu.prototype.buildRecentFrameworkList = function(list){
		buildFrameworkList(list);
	}

    return AppMenu;
})(AppMenu);

/**
 * Screen for Editing Assertions in the CASS Instance
 * 
 * @module cass.manager
 * @class AssertionEditScreen
 * 
 * @author devlin.junker@eduworks.com
 */	
AssertionEditScreen = (function(AssertionEditScreen){
	
	/**
	 * Helper function, converts the date passed in, to a string 
	 * that represents the date in local time
	 *
	 * @memberOf AssertionEditScreen
	 * @method dateToLocalString
	 * @private
	 * @param {Date} d 
	 * 			Date to convert to string
	 */
	function dateToLocalString(d){
		d = new Date(d.toUTCString());
		
		function zeroPadded(val) {
			if (val >= 10)
				return val;
			else
				return '0' + val;
		}
		
		return d.getFullYear()+"-"+zeroPadded(d.getMonth() + 1)+"-"+zeroPadded(d.getDate())+"T"+zeroPadded(d.getHours())+":"+zeroPadded(d.getMinutes())+":"+zeroPadded(d.getSeconds());
	}
	
	/**
	 * Displays the assertion passed in the editor on the screen
	 * 
	 * @memberOf AssertionEditScreen
	 * @param {EcAssertion} assertion 
	 * 			The assertion to be displayed
	 */
	function displayAssertion(assertion)
	{
		$('#competencyEditor').show();
	    $("#assertionEditId").val(assertion.id);
	   
	    if(assertion.agent != undefined){
	    	$("#assertionAgentInput option").removeAttr("selected");
		    var agentOption = $("#assertionAgentInput option[value='"+assertion.getAgent().toPem()+"']");
		    if(agentOption.size() != 1)
		    	$("#assertionAgentInput").append($("<option selected>Unknown</option>"));
		    else
		    	agentOption.attr("selected","selected");
	    }else if(AppController.identityController.selectedIdentity != undefined){
	    	$("#assertionAgentInput option[value='"+AppController.identityController.selectedIdentity.ppk.toPk().toPem()+"']").attr("selected", "selected");
	    	$("#assertionAgentInput").css("font-style","normal");
	    }
	    
	    if(assertion.subject != undefined){
	    	var subjectOption = $("#assertionSubjectInput option[value='"+assertion.getSubject().toPem()+"']");
	    	
	    	$("#assertionSubjectInput option").removeAttr("selected");
	    	if(subjectOption.size() == 1){
	    		subjectOption.attr("selected", "selected");
	    	}else{
	    		var option = $("<option selected='selected'>Unknown Subject</option>");
	    		option.attr("value", assertion.getSubject().toPem());
	    		$("#assertionSubjectInput").append(option);
	    	}
	    	$("#assertionSubjectInput").css("font-style","normal");
	    }
	    
	    if(assertion.competency != undefined){
	    	var competencyOption = $("#assertionCompetencyInput option[value='"+assertion.competency+"']");
	    	
	    	$("#assertionCompetencyInput option").removeAttr("selected");
	    	if(competencyOption.size() == 1){
	    		competencyOption.attr("selected", "selected");
	    	}else{
	    		EcCompetency.get(assertion.competency, function(competency){
	    			var competencyOption = $("#assertionCompetencyInput option[value='"+EcRemoteLinkedData.trimVersionFromUrl(competency.id)+"']");
	    			
	    			if(competencyOption.size() > 0){
	    				competencyOption.attr("selected", "selected");
	    			}else{
	    				var option = $("<option></option>");
						option.text(competency.getName());
						option.attr("value", EcRemoteLinkedData.trimVersionFromUrl(competency.id));
						if(assertion.competency == EcRemoteLinkedData.trimVersionFromUrl(competency.id)){
							$("#assertionCompetencyInput option").removeAttr("selected");
							option.attr("selected");
						}
							
						$("#assertionCompetencyInput").append(option);
	    			}
	    		}, function(err){
	    			var option = $("<option selected='selected'>Unknown Competency</option>");
		    		option.attr("value", assertion.competency);
	    			$("#assertionCompetencyInput").append(option);
	    			
	    			ViewManager.getView("#assertionEditMessageContainer").displayAlert("Unable to find assertion's competency");
	    		});
	    	}
	    	$("#assertionCompetencyInput").css("font-style","normal");
	    	
	    	if(assertion.level != undefined && assertion.level != ""){
		    	var levelOption = $("#assertionLevelInput option[value='"+assertion.level+"']");
		    	
		    	$("#assertionLevelInput option").removeAttr("selected");
		    	if(levelOption.size() == 1){
		    		levelOption.attr("selected", "selected");
		    	}else{
		    		var option = $("<option selected='selected'>Unknown Level</option>");
		    		option.attr("value", assertion.level);
		    		$("#assertionLevelInput").append(option);
		    	}
		    }else{
		    	$("#assertionLevelInput").append("<option value='held' selected='selected'>Held (Demonstrated, but with no performance measures)</option>");
		    	$("#assertionLevelInput").attr("disabled", "disabled");
		    }
	    }
	    
	    
	    
	    if(assertion.confidence != undefined){
	    	$("#assertionConfidenceInput").val(assertion.confidence * 100);
	    	$("#assertionConfidenceDisplay").text(assertion.confidence * 100);
	    }
	    
	    if(assertion.evidence != undefined){
	    	if(assertion.getEvidenceCount() > 0){
	    		var evidences = [];
	    		for(var i = 0; i < assertion.getEvidenceCount(); i++){
	    			evidences.push(assertion.getEvidence(i));
	    		}
	    		
	    		evidences = evidences.join("/n");
	    		
	    		$("#assertionEvidenceInput").text(evidences);
	    	}
	    }
	    
	    
	    
	    if(assertion.getAssertionDate() != undefined){
	    	$("#assertionDateInput").val(dateToLocalString(new Date(assertion.getAssertionDate())));
	    }
	    
	    if(assertion.getExpirationDate() != undefined){
	    	$("#assertionExpirationInput").val(dateToLocalString(new Date(assertion.getExpirationDate())));
	    }
	    
	    if(assertion.decayFunction != undefined){
	    	$("#assertionDecayInput").val(assertion.getDecayFunction());
	    }
	    
	    if(assertion.owner != undefined && assertion.owner.length > 0)
	    {
	    	$("#assertionEditOwner").html("");
	    	for(var i = 0; i < assertion.owner.length; i++)
	    	{
	    		if(i > 0)
	    			$("#assertionEditOwner").append(", ");
	    		
	    		var pem = assertion.owner[i];

	    		$("#assertionEditOwner").append("<span id='assertion-owner-"+i+"'></span>");  
	    		
	    		ViewManager.showView(new IdentityDisplay(pem), "#assertion-owner-"+i)
	    		
	    	}
	    }else{
	    	$("#assertionEditOwner").text("N/A")
	    }
	    
	    if(assertion.reader != undefined && assertion.reader.length > 0)
	    {
	    	$("#assertionEditReaders").html("");
	    	$("#assertionEditNoReader").addClass("hide");
	    	for(var i = 0; i < assertion.reader.length; i++)
	    	{
	    		if(i > 0)
	    			$("#assertionEditReaders").append(", ");
	    		
	    		var pem = assertion.reader[i];
	    		
	    		$("#assertionEditReaders").append("<span id='assertion-reader-"+i+"'></span>")
	    		
	    		ViewManager.showView(new IdentityDisplay(pem), "#assertion-reader-"+i);
	    	}
	    }else{
	    	$("#assertionEditNoReader").removeClass("hide");
	    }
	}
	
	/**
	 * Builds the form before the assertion is displayed,
	 * this builds all  of the select options on the screen for
	 * identities and competencies/levels capable of selecting.
	 *  
	 * @memberOf AssertionEditScreen
	 * @method buildForm
	 * @private
	 * @param {EcAssertion} assertion
	 * 			The assertion that will be displayed later, used to pre-select options in the form
	 */
	function buildForm(assertion){
		
		for(var i in EcIdentityManager.ids){
			var option = $("<option></option>");
			
			option.text(EcIdentityManager.ids[i].displayName);
			option.attr("value", EcIdentityManager.ids[i].ppk.toPk().toPem());
			
			$("#assertionAgentInput").append(option);
		}
		
		$("#assertionAgentInput").change(function(ev){
			var pem = $("#assertionAgentInput").val();
    		
			$("#assertionEditOwner").html("<span id='assertion-owner-0'></span>");
			
			ViewManager.showView(new IdentityDisplay(pem), "#assertion-owner-0");
     
		})
	
		for(var i in EcIdentityManager.contacts){
			var option = $("<option></option>");
			
			option.text(EcIdentityManager.contacts[i].displayName);
			option.attr("value", EcIdentityManager.contacts[i].pk.toPem());
			
			$("#assertionSubjectInput").append(option);
		}
		for(var i in EcIdentityManager.ids){
			var option = $("<option></option>");

			option.text(EcIdentityManager.ids[i].displayName);
			option.attr("value", EcIdentityManager.ids[i].ppk.toPk().toPem());

			$("#assertionSubjectInput").append(option);
		}
		if(EcIdentityManager.contacts.length == 0 && EcIdentityManager.ids.length == 0){
			var option = $("<option selected>Must be connected with other users to Assert Competency</option>");
			$("#assertionSubjectInput option").removeAttr("selected");
			$("#assertionSubjectInput").append(option.clone())
			$("#assertionSubjectInput").attr("disabled","disabled");
			$("#assertionCompetencyInput option").removeAttr("selected");
			$("#assertionCompetencyInput").append(option.clone())
			$("#assertionCompetencyInput").attr("disabled","disabled");
			$("#assertionLevelInput option").removeAttr("selected");
			$("#assertionLevelInput").append(option.clone())
			$("#assertionLevelInput").attr("disabled","disabled");
			$("#assertionConfidenceInput").attr("disabled","disabled");
			$("#assertionEvidenceInput").attr("disabled","disabled");
			$("#assertionDateInput").attr("disabled","disabled");
			$("#assertionExpirationInput").attr("disabled","disabled");
			$("#assertionDecayInput").attr("disabled","disabled");
			
			ViewManager.getView("#assertionEditMessageContainer").displayAlert("Cannot create an assertion unless you have a contact to assert about");
		}
		
		$("#assertionSubjectInput").change(function(){
			var pem = $("#assertionSubjectInput").val();
			//var contact = $(createContactSmall(pem));
    		//$("#assertionEditSubject").html(contact);
    		ViewManager.showView(new IdentityDisplay(pem), "#assertionEditSubject");
    		$("#assertionSubjectInput").css("font-style","normal");
		})
		
	
		
		var competencyList = {};
		EcCompetency.search(AppController.serverController.getRepoInterface(), "*", function(competencies){
			for(var i in competencies){
				competencyList[competencies[i].id] = competencies[i];
				
				var competencyOption = $("#assertionCompetencyInput option[value='"+EcRemoteLinkedData.trimVersionFromUrl(competencies[i].id)+"']")
				
				if(competencyOption.size() > 0){
					competencyOption.attr("selected", "selected");
				}else{
					var option = $("<option></option>");
					option.text(competencies[i].getName());
					option.attr("value", EcRemoteLinkedData.trimVersionFromUrl(competencies[i].id));
					if(assertion.competency == EcRemoteLinkedData.trimVersionFromUrl(competencies[i].id)){
						$("#assertionCompetencyInput option").removeAttr("selected");
						option.attr("selected");
					}
						
					$("#assertionCompetencyInput").append(option);
				}
				
			}
		}, errorRetrievingCompetencies)
		
		if(assertion.competency != undefined && assertion.competency != ""){
			if(assertion.level == undefined || assertion.level == ""){
				$("#assertionLevelInput option").removeAttr("selected");
				$("#assertionLevelInput").append($("<option selected>No level selected</option>"));
			}
				
			EcLevel.searchByCompetency(AppController.serverController.getRepoInterface(), assertion.competency, function(levels){
				for(var i in levels){
					var option = $("<option></option>");
					option.text(levels[i].name);
					option.attr("value", EcRemoteLinkedData.trimVersionFromUrl(levels[i].id));
					if(assertion.level != undefined && assertion.level == EcRemoteLinkedData.trimVersionFromUrl(levels[i].id)){
						$("#assertionLevelInput option").removeAttr("selected");
						option.attr("selected", "selected")
					}
					
					$("#assertionLevelInput").append(option);
				}
			}, errorRetrievingLevels);
		}
		
		$("#assertionCompetencyInput").change(function(){
			var competencyId = $("#assertionCompetencyInput").val();
			$("#assertionCompetencyInput").css("font-style","normal");
			
			EcLevel.searchByCompetency(AppController.serverController.getRepoInterface(), competencyId, function(levels){
				$("#assertionLevelInput option").remove();
				for(var i in levels){
					var option = $("<option></option>");
					option.text(levels[i].name);
					option.attr("value", EcRemoteLinkedData.trimVersionFromUrl(levels[i].id));
					$("#assertionLevelInput").append(option);
				}
				if(levels.length == 0){
					$("#assertionLevelInput").append("<option selected value='held'>Held (Demonstrated, but with no performance measures)</option>");
					$("#assertionLevelInput").attr("disabled", "disabled");
					$("#assertionLevelInput").css("font-style","normal");
				}else{
					$("#assertionLevelInput").removeAttr("disabled");
					$("#assertionLevelInput").css("font-style","italic");
					$("#assertionLevelInput").append("<option selected class='hide' disabled='disabled'>Select the level of competency being asserted</option>");
				}
			}, errorRetrievingLevels);
		});
		
		$("#assertionLevelInput").change(function(){
			$("#assertionLevelInput").css("font-style","normal");
		})
	
		$("#assertionConfidenceInput").change(function(){
			var conf = $("#assertionConfidenceInput").val();
			$("#assertionConfidenceDisplay").text(conf);
		});
		
		$("#assertionDateInput").val(dateToLocalString(new Date()));
		var d = new Date();
		d.setFullYear(new Date().getFullYear() + 1);
		$("#assertionExpirationInput").val(dateToLocalString(d));
	}
	
	/**
	 * Triggered when the assertion is saved so the user knows it was successful
	 * 
	 * @memberOf AssertionEditScreen
	 * @method saveSuccess
	 * @private
	 */
	function saveSuccess(){
		$("#datum").effect("highlight", {}, 1500);
	}
	
	/**
	 * Error function if the server is down when trying to get the assertion to display in Message Container
	 * 
	 * @memberOf AssertionEditScreen
	 * @method errorRetrieving
	 * @private
	 * @param {String} err
	 * 			error message to display 
	 */
	function errorRetrieving(err)
	{
		if(err == undefined)
			err = "Unable to Connect to Server to Retrieve Assertion for Editing";
		ViewManager.getView("#assertionEditMessageContainer").displayAlert(err);
	}
	
	/**
	 * Error function if there is a problem saving the assertion to the server
	 * 
	 * @memberOf AssertionEditScreen
	 * @method errorSaving
	 * @private
	 * @param {String} err
	 * 			error message to display
	 */
	function errorSaving(err)
	{
		if(err == undefined)
			err = "Unable to Connect to Server to Save Assertion";
		
		ViewManager.getView("#assertionEditMessageContainer").displayAlert(err, "saveFail");
	}
	
	/**
	 * Error function if there is a problem retrieving the competency 
	 * list from the server during form creation
	 * 
	 * @memberOf AssertionEditScreen
	 * @method errorRetrievingCompetencies
	 * @private
	 * @param {String} err
	 * 			error message to display
	 */
	function errorRetrievingCompetencies(err)
	{
		if(err == undefined)
			err = "Unable to Connect to Server to Retrieve Competencies";
		ViewManager.getView("#assertionEditMessageContainer").displayAlert(err);
	}
	
	/**
	 *  Error function if there is a problem retrieving the level 
	 *  list from the server during form creation
	 * 
	 * @memberOf AssertionEditScreen
	 * @method errorRetrievingLevels
	 * @private
	 * @param {String} err
	 * 			error message to display
	 */
	function errorRetrievingLevels(err){
		if(err == undefined)
			err = "Unable to Connect to Server to Retrieve Levels";
		ViewManager.getView("#assertionEditMessageContainer").displayAlert(err);
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf AssertionEditScreen
	 * @method display
	 * @param {String} containerId
	 * 			Screen Container DOM ID
	 */
	AssertionEditScreen.prototype.display = function(containerId)
	{
		var data = this.data;
		
		if(data != undefined && data.id != undefined)
		{
			ScreenManager.setScreenParameters({"id":data.id});
		}
		
		var newAssertion = false;
		
		if(data == undefined){
			newAssertion = true;
			data = new EcAssertion();
		    data.generateId(AppController.serverController.getRepoInterface().selectedServer);
		    
		    if(AppController.identityController.selectedIdentity != undefined)
		    {
		    	data.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
		    }
		}
	
		ViewManager.showView(new MessageContainer("assertionEdit"), "#assertionEditMessageContainer", function(){
			if(newAssertion && !AppController.loginController.getLoggedIn())
			{
				ViewManager.getView("#assertionEditMessageContainer").displayAlert("Unable to Create an Assertion Unless you Identify yourself by logging in");
			}
		});
		
		$("#assertionEditSearchBtn").attr("href", "#"+AssertionSearchScreen.prototype.displayName);
		$("#assertionEditSearchBtn").click(function(event){
			event.preventDefault();
			ScreenManager.changeScreen(new AssertionSearchScreen())
		});
		
		if(newAssertion)
		{
			$("#assertionEditViewBtn").hide();
		}
		else
		{
			$("#assertionEditViewBtn").attr("href", "#"+AssertionViewScreen.prototype.displayName);
			$("#assertionEditViewBtn").click(function(event){
				event.preventDefault();
				ScreenManager.changeScreen(new AssertionViewScreen(data))
			});
		}
		
		
		$("#assertionEditBtn").attr("href", "#"+AssertionEditScreen.prototype.displayName);
		$("#assertionEditBtn").click(function(event){
			event.preventDefault();
		});
		
		$("#assertionEditCancelBtn").click(function(event){
			event.preventDefault();
			ScreenManager.changeScreen(new AssertionViewScreen());
		});
		
		if(newAssertion){
			$("#assertionEditDeleteBtn").remove();	
		}else{
			$("#assertionEditDeleteBtn").click(function(event){
				event.preventDefault();
				ModalManager.showModal(new ConfirmModal(function(){
					EcRepository._delete(data, function(){
						ScreenManager.changeScreen(new AssertionSearchScreen());
					}, function(err){
						if(err == undefined)
							err = "Unable to connect to server to delete assertion";
						ViewManager.getView("#assertionEditMessageContainer").displayAlert(err)
					});
					ModalManager.hideModal();
				}, "Are you sure you want to delete this assertion?"));
			})
		}
		
		if(newAssertion && (!AppController.loginController.getLoggedIn() || !AppController.identityController.canEdit(data))){
			$("#assertionEditSaveBtn").removeClass("fake-a-label");
			$("#assertionEditSaveBtn").css('cursor', "default");
			
			$("#assertionAgentInput").attr("disabled", "disabled");
			$("#assertionSubjectInput").attr("disabled", "disabled");
			$("#assertionCompetencyInput").attr("disabled", "disabled");
			$("#assertionLevelInput").attr("disabled", "disabled");
			$("#assertionConfidenceInput").attr("disabled", "disabled");
			$("#assertionEvidenceInput").attr("disabled", "disabled");
			$("#assertionDateInput").attr("disabled", "disabled");
			$("#assertionExpirationInput").attr("disabled", "disabled");
			$("#assertionDecayInput").attr("disabled", "disabled");
		}else{
			$("#assertionEditSaveBtn").click(function(event){
				event.preventDefault();
				
				if($("#assertionSubjectInput").val() == undefined || $("#assertionSubjectInput").val() == "" || $("#assertionSubjectInput").val() == $("#assertionSubjectInput #noSubject").text()){
					ViewManager.getView("#assertionEditMessageContainer").displayAlert("Unable to Create an Assertion Without Subject");
					return;
				}
				data.setSubject(EcPk.fromPem($("#assertionSubjectInput").val()))
				
				if($("#assertionAgentInput").val() == undefined || $("#assertionAgentInput").val() == "" || $("#assertionAgentInput").val() == $("#assertionAgentInput #noAgent").text()){
					ViewManager.getView("#assertionEditMessageContainer").displayAlert("Unable to Create an Assertion Without Specifying Agent");
					return;
				}
				data.setAgent(EcPk.fromPem($("#assertionAgentInput").val()))
				
				if($("#assertionCompetencyInput").val() == undefined || $("#assertionCompetencyInput").val() == "" || $("#assertionCompetencyInput").val() == $("#assertionCompetencyInput #noCompetency").text()){
					ViewManager.getView("#assertionEditMessageContainer").displayAlert("Unable to Create an Assertion Without Specifying Competency");
					return;
				}
				data.setCompetency($("#assertionCompetencyInput").val());
				
				if($("#assertionLevelInput").val() == undefined || $("#assertionLevelInput").val() == "" 
					|| $("#assertionLevelInput").val() == $("#assertionLevelInput #noLevel").text() || $("#assertionLevelInput").val() == "held"){
					data.setLevel("");
				}else{
					data.setLevel($("#assertionLevelInput").val());
				}
				
				var confidence = $("#assertionConfidenceInput").val();
				
				if(confidence > 1){
					confidence = confidence/100;
				}
				data.setConfidence(confidence);
				
				var evidences = $("#assertionEvidenceInput").val().split(/\n/);
				if(evidences != undefined && evidences.length == 1 && evidences[0] == undefined || evidences[0] == ""){
					data.evidence = undefined;
				}else{
					data.setEvidence(evidences);	
				}
				
				
				var dateSplit = new Date($("#assertionDateInput").val()).toUTCString().split(" ");
				dateSplit.splice(5,1);
				
				var expireSplit = new Date($("#assertionExpirationInput").val()).toUTCString().split(" ");
				expireSplit.splice(5,1);
				
				data.setAssertionDate(new Date(dateSplit.join(" ")).getTime());
				data.setExpirationDate(new Date(expireSplit.join(" ")).getTime());
				data.setDecayFunction($("#assertionDecayInput").val());

				data.save(saveSuccess, errorSaving);
			})
			
			$("#assertionEditSaveBtn").on("mousemove", function(){
				var url = $("#assertionEditId").val();
				var split = url.split("\/");
				if (split[split.length-4] == "data") 
					split[split.length-1] = new Date().getTime();
				$("#assertionEditId").val(split.join("/"));
			});
			
			buildForm(data);
		}
		
		$("#assertionEditAddReader").click(function(ev){
			ev.preventDefault();
			
			ModalManager.showModal(new AdvancedPermissionsModal(data, function(dataAfter){
				displayAssertion(dataAfter);
				ModalManager.hideModal();
			}, true));
		})
		
		if(newAssertion)
		{
			displayAssertion(data);
		}
		else
		{
			EcAssertion.get(data.id, function(assertion){
				data = assertion;
				displayAssertion(assertion)
			}, errorRetrieving);
		}
	};
	
	return AssertionEditScreen;
})(AssertionEditScreen);/**
 * Screen for searching for assertions, loads a {DataViewer} view to 
 * display the results of the search and prepares the 
 * 
 * @module cass.manager
 * @class AssertionSearchScreen
 * 
 * @author devlin.junker@eduworks.com
 */
AssertionSearchScreen = (function (AssertionSearchScreen) {

    var maxLength = 24;

    var searchHandle = null;

    /**
     * Method to run the assertion search on the server
     * 
     * @memberOf AssertionSearchScreen
     * @method runAssertionSearch
     * @private
     * @param {int} start
     * 			where in the repository index to start the search
     */
    function runAssertionSearch(start) {
        searchHandle = setTimeout(function () {

            ViewManager.getView("#assertionSearchMessageContainer").clearAlert("searchFail");

            var callback;
            if (start == undefined)
                callback = clearDisplayResults;
            else
                callback = displayResults;

            var params = {};
            params.size = maxLength;
            params.start = start;

            EcAssertion.search(AppController.serverController.getRepoInterface(), "*", function (results) {
                var waitFunc = function () {
                    if (ViewManager.getView("#assertionSearchResults") != undefined) {
                        callback(results);
                    } else {
                        setTimeout(waitFunc, 100);
                    }
                };

                waitFunc();
            }, errorSearching, params);
        }, 100);
    }

    /**
     * Clears the data in the DataViewer so that the table is empty
     * and then displays the results
     * 
     * @memberOf AssertionSearchScreen
     * @method clearDisplayResults
     * @private	
     * @param {Array<EcAssertion>} results
     * 			results to display after clearing the DataViewer
     */
    function clearDisplayResults(results) {
        ViewManager.getView("#assertionSearchResults").clear();
        displayResults(results);
    }

    /**
     * Displays results of the search, by appending them to the table,
     * does some checks on the number of results to see what interfaces 
     * should be visible
     * 
     * @memberOf AssertionSearchScreen
     * @method displayResults
     * @private
     * @param {Array<EcAssertion>} results
     * 			results to add to to the DataViewer
     */
    function displayResults(results) {
    	ViewManager.getView("#menuContainer").showSortBasic();
        ViewManager.getView("#assertionSearchResults").populate(results);

        if (results.length == 0 && $("#assertionResults-data").first().children().size() == 0) {
            ViewManager.getView("#assertionSearchResults").showNoDataMessage();
        } else if (results.length < maxLength) {
            $("#moreSearchResults").addClass("hide");
            //$(window).off("scroll", scrollSearchHandler);
        } else {
            $("#getMoreResults").click(function () {
                $("#getMoreResults").addClass("hide");
                $("#loadingMoreResults").removeClass("hide");
                runAssertionSearch($("#assertionResults-data").first().children().size());
            })

            $("#getMoreResults").removeClass("hide");
            $("#moreSearchResults").removeClass("hide");
            $("#loadingMoreResults").addClass("hide");

            //$(window).scroll(scrollSearchHandler)
        }

        searchHandle = null;

    }

    /*
     * 
    function scrollSearchHandler(){
    	var resultDiv = $("#assertionResults-data").first(); 
    	
    	if(resultDiv.size() == 0){
    		$(window).off("scroll", scrollSearchHandler);
    	}
    	else if(($(window).height() + document.body.scrollTop) > ($(document).height() - 30))
    	{
    		//$("#moreSearchResults").addClass("hide");
    		//$("#loadingMoreResults").removeClass("hide");
    		runAssertionSearch(resultDiv.children().size());
    	}
    }
    */

    /**
     * Error function called if the assertion search fails
     * 
     * @memberOf AssertionSearchScreen
     * @method errorSearching
     * @private
     * @param {String} err
     * 			Error message to display
     */
    function errorSearching(err) {
        if (err == undefined)
            err = "Unable to Connect to Server for Assertion Search";

        ViewManager.getView("#competencySearchMessageContainer").displayAlert(err, "searchFail");

        // TODO: Call Appropriate show/hide on dataViewer

    }

    /**
     * Overridden display function, called once html partial is loaded into DOM
     * 
     * @memberOf AssertionSearchScreen
     * @method display
     * @param {String} containerId
     * 			Screen Container DOM ID
     */
    AssertionSearchScreen.prototype.display = function (containerId) {
        var lastViewed = this.lastViewed;


        ViewManager.showView(new MessageContainer("assertionSearch"), "#assertionSearchMessageContainer");

        ViewManager.showView(new DataViewer("assertionResults", {
            sort: {},
            clickDataEdit: function (datum) {
                ScreenManager.changeScreen(new AssertionEditScreen(datum));
            },
            buildDataRow: function (row, id, datum) {
                row.append("<div class='small-5 columns'>" +
                    "<a>Assertion about <span class='datum-competency' style='font-style:italic'></span></a>" +
                    "</div>" +
                    "<div class='small-2 columns datum-subject'></div>" +
                    "<div class='small-2 columns datum-agent'></div>" +
                    "<div class='small-3 columns datum-owner'></div>");

                row.find(".datum-competency").text("Loading..");
                EcCompetency.get(datum.competency, function (competency) {
                    $("[data-id='" + datum.id + "']").find(".datum-competency").text(competency.getName());
                }, function () {
                    row.find(".datum-competency").text("Unknown Competency");
                })


                for (var i in datum["owner"]) {
                    var trimId = EcRemoteLinkedData.trimVersionFromUrl(id)
                    var idEnd = trimId.split("/")[trimId.split("/").length - 1];
                    var elId = idEnd + "-owner-" + i;

                    var ownerEl = $("<span id='" + elId + "'></span>")
                    row.find(".datum-owner").append(ownerEl);

                    ViewManager.showView(new IdentityDisplay(datum["owner"][i]), "#" + elId)
                }

                row.find(".datum-agent").html("<span style='font-style:italic;'>Loading...</span>");
                datum.getAgentAsync(function (agent) {
                    if (agent == undefined || agent == null) {
                        row.find(".datum-agent").html("by <span style='font-style:italic;'>&lt;Restricted&gt;</span>");
                    } else {
                        row.find(".datum-agent").html("by <span id='assertion-agent" + datum.getGuid() + "'></span>");
                        ViewManager.showView(new IdentityDisplay(agent.toPem()), "#assertion-agent" + datum.getGuid() + "");
                    }
                }, function (error) {
                    row.find(".datum-agent").html("by <span style='font-style:italic;'>&lt;Restricted&gt;</span>");
                });

                row.find(".datum-subject").html("<span style='font-style:italic;'>Loading...</span>");
                datum.getSubjectAsync(function (sub) {
                    if (sub == undefined || sub == null) {
                        row.find(".datum-subject").html("about <span style='font-style:italic;'>&lt;Restricted&gt;</span>");
                    } else {
                        row.find(".datum-subject").html("about <span id='assertion-subject" + datum.getGuid() + "'></span>");
                        ViewManager.showView(new IdentityDisplay(sub.toPem()), "#assertion-subject" + datum.getGuid() + "");
                    }
                }, function (error) {
                    row.find(".datum-subject").html("about <span style='font-style:italic;'>&lt;Restricted&gt;</span>");
                });

                row.find("a").click(function (ev) {
                    ev.preventDefault();
                    ScreenManager.changeScreen(new AssertionViewScreen(datum));
                });

            }
        }), "#assertionSearchResults");

        runAssertionSearch();
        
    	ViewManager.getView("#menuContainer").showSortBasic();
	};
	
	/**
	 * Overridden onClose callback, called when leaving screen
	 * 
	 * @memberOf AssertionSearchScreen
	 * @method onClose
	 */
	AssertionSearchScreen.prototype.onClose = function(){
		ViewManager.getView("#menuContainer").hideSort();
	}
	
	AssertionSearchScreen.prototype.sortByTimestamp = function(){
		$("#assertionResults-sortSelect").val("timestamp");
		$("#assertionResults-sortSelect").trigger("change");
	}
	
	AssertionSearchScreen.prototype.sortByOwner = function(){
		$("#assertionResults-sortSelect").val("owner");
		$("#assertionResults-sortSelect").trigger("change");
	}
	

    return AssertionSearchScreen;
})(AssertionSearchScreen);
/**
 * Screen with a panel for displaying assertion details
 * 
 * @module cass.manager
 * @class AssertionViewScreen
 * 
 * @author devlin.junker@eduworks.com
 */
AssertionViewScreen = (function(AssertionViewScreen){
	
	/**
	 * Displays the assertion details in the HTML panel
	 * 
	 * @memberOf AssertionViewScreen
	 * @method displayAssertion
	 * @private
	 * @param {EcAssertion} assertion
	 * 				Assertion to display
	 */
	function displayAssertion(assertion)
	{	    
	    $("#assertionViewId").text(assertion.id);
	    
	    var agent = assertion.getAgent();
	    if(agent != undefined){
	    	var contact = $(createContactSmall(agent.toPem()));
	    	$("#assertionViewAgent").html(contact);
	    	ViewManager.showView(new IdentityDisplay(agent.toPem()), "#assertionViewAgent");
	    	if(contact.find(".contactText").text() == "Unknown"){
	    		$("#assertionViewAgentContainer").addClass("unknown");
	    		$("#assertionToggleUnknownBtn").removeClass("hide");
	    	}
	    }else{
	    	$("#assertionViewAgent").html("<span style='font-style:italic'>Unknown</span>");
	    	$("#assertionViewAgentContainer").addClass("unknown");
	    	$("#assertionViewAgentContainer").css("display", "none");
	    	$("#assertionToggleUnknownBtn").removeClass("hide");
	    }
	    
	    var sub = assertion.getSubject()
	    if(sub != undefined){
	    	//var contact = $(createContactSmall(sub.toPem()));
	    	//$("#assertionViewSubject").html(contact);
	    	ViewManager.showView(new IdentityDisplay(sub.toPem()), "#assertionViewSubject");
	    	if(contact.find(".contactText").text() == "Unknown"){
	    		$("#assertionViewSubjectContainer").addClass("unknown");
	    		$("#assertionToggleUnknownBtn").removeClass("hide");
	    	}
	    }else{
	    	$("#assertionViewSubject").html("<span style='font-style:italic'>Unknown</span>");
	    	$("#assertionViewSubjectContainer").addClass("unknown");
	    	$("#assertionViewSubjectContainer").css("display", "none");
	    	$("#assertionToggleUnknownBtn").removeClass("hide");
	    }
	    
	    
	    var competency = assertion.competency;
	    if(competency != undefined){
	    	EcCompetency.get(competency, function(competency){
	    		if(competency != undefined){
	    			var el = $("<a href='"+CompetencyViewScreen.displayName+"?id="+competency.id+"'>"+competency.name+"</a>");
	    			el.click(function(ev){
	    				ev.preventDefault();
	    				ScreenManager.changeScreen(new CompetencyViewScreen(competency));
	    			})
		    		$("#assertionViewCompetency").html(el);
	    		}else{
	    			$("#assertionViewCompetency").html("<span style='font-style:italic'>Unknown</span>");
	    			$("#assertionViewCompetencyContainer").addClass(" unknown");
	    			$("#assertionViewCompetencyContainer").css("display", "none");
	    			$("#assertionToggleUnknownBtn").removeClass("hide");
	    		}
	    		
	    	}, function(err){
	    		try{
	    			JSON.parse(err);
	    			
	    			errorFindingCompetency(err);
	    			
	    			return;
	    		}catch(e){}
	    		
	    		$("#assertionViewCompetency").html("<span style='font-style:italic'>Unknown</span>");
    			$("#assertionViewCompetencyContainer").addClass(" unknown");
    			$("#assertionViewCompetencyContainer").css("display", "none");
    			$("#assertionToggleUnknownBtn").removeClass("hide");
	    		
	    	});
	    }else{
	    	ViewManager.getView("#assertionViewMessageContainer").displayAlert("Assertion is Missing Competency Reference");
	    	$("#assertionViewCompetency").html("<span style='font-style:italic'>Unknown</span>");
			$("#assertionViewCompetencyContainer").addClass("hide unknown");
			$("#assertionViewCompetencyContainer").css("display", "none");
			$("#assertionToggleUnknownBtn").removeClass("hide");
	    }
	    
	    var level = assertion.level
	    if(level != undefined){
	    	EcLevel.get(level, function(level){
	    		if(level != undefined){
	    			var tip = "";
	    			if(level.description != undefined && level.description != "")
	    				tip += "Description: "+level.description+"<br/><br/>";
	    			if(level.title != undefined && level.title != "")
	    				tip += "Title: "+level.title+"<br/><br/>";
	    			if(level.performance != undefined && level.performance != "")
	    				tip += "Performance Measure: "+level.performance+"<br/><br/>";
	    			if(level.owner != undefined && level.owner.length > 0){
	    				tip += "Owner: ";
	    				for(var i = 0; i < level.owner.length; i++)
	    				{
	    					if(i != 0)
	    						tip+=", ";
	    					tip+=AppController.identityController.lookup(level.owner[i]).displayName;
	    				}
	    				tip+= "<br/><br/>"
	    			}
	    			tip += level.id;
	    			
	    			var span = $("<span class='has-tip' style='font-weight:normal'></span>");
	    			span.text(level.name);
	    			$("#assertionViewLevel").append(span);
	    			
	    			new Foundation.Tooltip($("#assertionViewLevel .has-tip"), {"tipText":tip});
	    		}else{
	    			$("#assertionViewLevel").html("<span style='font-style:italic'>Unknown</span>");
	    			$("#assertionViewLevelContainer").addClass("unknown");
	    			$("#assertionViewLevelContainer").css("display", "none");
	    			$("#assertionToggleUnknownBtn").removeClass("hide");
	    		}
	    	}, errorFindingLevel)
	    }else{
	    	$("#assertionViewLevel").html("Held (Demonstrated, but with no performance measures)");
	    }
	    
	    
	    var confidence = assertion.confidence;
	    if(confidence < 1){
	    	confidence = Math.round(confidence*100);
	    }
	    $("#assertionViewConfidence").text(confidence + "%")
	    
	    var decay = assertion.getDecayFunction();
	    if(decay != undefined){
	    	if(decay == "linear"){
	    		$("#assertionViewDecay").text("Linear");
	    	}else if(decay == "exponential"){
	    		$("#assertionViewDecay").text("Exponential");
	    	}else if(decay == "logarithmic"){
	    		$("#assertionViewDecay").text("Logarithmic");
	    	}
	    }else{
	    	$("#assertionViewDecay").html("<span style='font-style:italic'>Unknown</span>");
	    	$("#assertionViewDecayContainer").addClass("unknown");
	    	$("#assertionViewDecayContainer").css("display", "none");
	    	$("#assertionToggleUnknownBtn").removeClass("hide");
	    }
	    
	    var evidenceCount = assertion.getEvidenceCount();
	    if(evidenceCount == 0){
	    	$("#assertionViewEvidence").text("No pieces of evidence available")
	    }else{ 
	    	if(evidenceCount == 1){
	    		$("#assertionViewEvidence").text("1 piece of evidence available");
	    		$("#assertionViewEvidence").addClass("fake-a");
	    	}else{
	    		$("#assertionViewEvidence").text(evidenceCount + " pieces of evidence available");
	    		$("#assertionViewEvidence").addClass("fake-a");
	    	}
	    	
	    	$("#assertionViewEvidence").click(function(ev){
	    		ev.preventDefault();
	    		var ev = [];
	    		for(var i = 0; i < assertion.getEvidenceCount(); i++){
	    			ev.push(assertion.getEvidence(i));
	    		}
	    		
	    		ModalManager.showModal(new EvidenceViewModal(ev));
	    	})
	    }
	    
	    var date = assertion.getAssertionDate();
	    if(date != undefined){
	    	$("#assertionViewDate").text(new Date(date).toLocaleString());
	    }else{
	    	$("#assertionViewDate").html("<span style='font-style:italic'>Unknown</span>");
	    	$("#assertionViewDateContainer").addClass("unknown");
	    	$("#assertionViewDateContainer").css("display", "none");
	    	$("#assertionToggleUnknownBtn").removeClass("hide");
	    }
	    
	    var expiration = assertion.getExpirationDate();
	    if(expiration != undefined){
	    	$("#assertionViewExpiration").text(new Date(expiration).toLocaleString());
	    }else{
	    	$("#assertionViewExpiration").html("<span style='font-style:italic'>Unknown</span>");
	    	$("#assertionViewExpirationContainer").addClass("unknown");
	    	$("#assertionViewExpirationContainer").css("display", "none");
	    	$("#assertionToggleUnknownBtn").removeClass("hide");
	    }
	    
	    if(assertion.owner != undefined && assertion.owner.length > 0)
	    {
	    	$("#assertionViewOwner").text("")
	    	for(var i = 0; i < assertion.owner.length; i++)
 	    	{
	    		if(i > 0)
	    			$("#assertionViewOwner").append(", ");
	    		
 	    		var pem = assertion.owner[i];
 	    		
 	    		$("#assertionViewOwner").append("<span id='assertion-owner-"+i+"'></span>");
 	    		
 	    		ViewManager.showView(new IdentityDisplay(pem), "#assertion-owner-"+i);
 	    	}
	    }
	    
	}
	
	/**
	 * Error function called if problem getting the assertion from the server
	 * 
	 * @memberOf AssertionViewScreen
	 * @method errorRetrieving
	 * @private
	 * @param {String} err
	 * 			Error message to display
	 */
	function errorRetrieving(err)
	{
		if(err == undefined)
			err = "Unable to Connect to Server to Retrieve Assertion";
		
		ViewManager.getView("#assertionViewMessageContainer").displayAlert(err, "getAssertion");
	}
	
	/**
	 *  Error function called if problem searching for competencies to display on form
	 * 
	 * @memberOf AssertionViewScreen
	 * @method errorFindingCompetency
	 * @private
	 * @param {String} err
	 * 			Error message to display
	 */
	function errorFindingCompetency(err){
		if(err == undefined)
			err = "Unable to Connect to Server to Retrieve Assertion Competency";
		
		ViewManager.getView("#assertionViewMessageContainer").displayAlert(err, "getCompetency");
	}
	
	/**
	 *  Error function called if problem searching for levels to display on form
	 * 
	 * @memberOf AssertionViewScreen
	 * @method errorFindingLevel
	 * @private
	 * @param {String} err
	 * 			Error message to display
	 */
	function errorFindingLevel(err){
		if(err == undefined)
			err = "Unable to Connect to Server to Retrieve Level";
		
		ViewManager.getView("#assertionViewMessageContainer").displayAlert(err, "getLevel");
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf AssertionViewScreen
	 * @method display
	 * @param {String} containerId
	 * 			Screen Container DOM ID
	 */
	AssertionViewScreen.prototype.display = function(containerId)
	{
		var data = this.data;
		
		if(data.id != null)
		{
			ScreenManager.setScreenParameters({"id":data.id});
		}
			
		ViewManager.showView(new MessageContainer("assertionView"), "#assertionViewMessageContainer");
		
		$("#assertionViewSearchBtn").attr("href", "#"+AssertionSearchScreen.prototype.displayName);
		$("#assertionViewSearchBtn").click(function(event){
			event.preventDefault();
			ScreenManager.changeScreen(new AssertionSearchScreen(data))
		});
		
		$("#assertionViewBtn").attr("href", "#"+AssertionViewScreen.prototype.displayName);
		$("#assertionViewBtn").click(function(event){
			event.preventDefault();
		});
		
		$("#assertionToggleUnknownBtn").click(function(ev){
			ev.preventDefault();
			if($("#assertionToggleUnknownBtn #toggleKeyword").text() == "Show"){
				$("#assertionToggleUnknownBtn #toggleKeyword").text("Hide");
				$(".unknown").slideDown();
			}else{
				$("#assertionToggleUnknownBtn #toggleKeyword").text("Show");
				$(".unknown").slideUp()	
			}
			
			
		})
		
		
		if(AppController.identityController.canEdit(data)){
			$("#editAssertionBtn").click(function(event){
				event.preventDefault();
				ScreenManager.changeScreen(new AssertionEditScreen(data))
			})
		}else{
			$("#editAssertionBtn").remove();
		}
		
		if(!AppController.identityController.owns(data) && !AppController.serverController.getAdmin()){
			$("#assertionViewDeleteBtn").remove();
		}else{
			$("#assertionViewDeleteBtn").click(function(){
				ModalManager.showModal(new ConfirmModal(function(){
					EcRepository._delete(data, function(){
						ScreenManager.changeScreen(new AssertionSearchScreen());
					}, function(err){
						if(err == undefined)
							err = "Unable to connect to server to delete assertion";
						ViewManager.getView("#assertionViewMessageContainer").displayAlert(err)
					});
					ModalManager.hideModal();
				}, "Are you sure you want to delete this assertion?"))
			})
		}
		
		
		EcAssertion.get(data.id, function(result){
			data = result;
			displayAssertion(result);
		}, errorRetrieving);
			
	};
	
	return AssertionViewScreen;
})(AssertionViewScreen);/**
 * Handles changing which server the application is pointed at
 * 
 * @module cass.manager
 * @class ChangeServerModal
 * 
 * @author devlin.junker@eduworks.com
 */
var ChangeServerModal = (function (ChangeServerModal) {
    var ERROR_CONTAINER_ID = "#changeServerError";

    var lastVal;

    /**
     * Occurs on click of submit button, indicating the user has changed the
     * server select and would like to change servers
     * 
     * @memberOf ChangeServerModal
     * @method submitChange
     */
    function submitChange() {
        var server = $("#newServer").val();

        AppController.serverController.selectServer(server, function () {
            ModalManager.hideModal();
			if (!AppController.loginController.loginServer.isGlobal())
			{
            	AppController.loginController.logout();
            	ViewManager.getView("#menuContainer").setLoggedOut();
            }
			AppController.loginController.loginServer=AppController.serverController.getRepoInterface();
            AppMenu.prototype.setCurrentServer();

            ScreenManager.reloadCurrentScreen();
        }, function (err) {
            $("#newServer").val(lastVal);
            displayError("Unable to change servers, reverting to previous server: " + err);
        });
    }

    /**
     * Adds an error message in the MessageContainer Alert Box
     * 
     * @memberOf ChangeServerModal
     * @method displayError
     * @private
     * @param {String} err
     * 			Error to display 
     */
    function displayError(err) {
        ViewManager.getView("#changeServerMessageContainer").displayAlert(err);
    }

    /**
     * Clears the error message in the MessageContainer Alert Box
     * 
     * @memberOf ChangeServerModal
     * @method clearError
     * @private
     */
    function clearError() {
        ViewManager.getView("#changeServerMessageContainer").clearAlert();
    }

    /**
     * Overridden display function, called once html partial is loaded into DOM
     * 
     * @memberOf ChangeServerModal
     * @method display
     * @param {String} containerId
     * 			The DOM ID of the Modal Container this modal is displayed in
     */
    ChangeServerModal.prototype.display = function (containerId) {
        var view = this;

        ViewManager.showView(new MessageContainer("changeServer"), "#changeServerMessageContainer", function () {
            if (AppController.loginController.getLoggedIn()) {
            	if (!AppController.loginController.loginServer.isGlobal())
                	ViewManager.getView("#changeServerMessageContainer").displayWarning("You are currently logged in, you will be logged out if you change servers");
            }
        });



        $("#changeServerCurrentServer").text(AppController.serverController.selectedServerName);
        $("#changeServerCurrentServer").attr('title', AppController.serverController.selectedServerUrl);

        if ($(AppController.serverController.serverList).size() > 0) {
            $("#newServer").html("");
            for (var serverName in AppController.serverController.serverList) {
                var serverUrl = AppController.serverController.serverList[serverName];

                var option = $("<option></option>");

                if (serverName == AppController.serverController.selectedServerName)
                    option.attr("selected", "selected")
                option.attr("value", serverUrl);
                option.text(serverName);

                $("#newServer").append(option);
            }
        }

        lastVal = AppController.serverController.selectedServerUrl;

        $("#addServer").click(function () {
            ModalManager.showModal(new AddServerModal(function () {
                ModalManager.showModal(new ChangeServerModal());
            }));
        });

        $("#changeServerForm").submit(function (event) {
            event.preventDefault();
            submitChange();
        });

        $("#changeServerCancel").click(function (event) {
            event.preventDefault();
            ModalManager.hideModal();
        });

    }

    return ChangeServerModal;
})(ChangeServerModal);
/**
 * TODO: Need to fix and make work better
 * 
 * @module cass.manager
 * @class ChangeTypeModal
 * 
 * @author devlin.junker@eduworks.com
 */
var ChangeTypeModal = (function(ChangeTypeModal){	
	
	/**
	 * Adds an error message in the MessageContainer Alert Box
	 * 
	 * @memberOf ChangeTypeModal
	 * @method displayError
	 * @private
	 * @param {String} err
	 * 			Error to display 
	 */
	function displayError(err)
	{
		ViewManager.getView("#changeTypeMessageContainer").displayAlert(err);
	}
	
	/**
	 * Clears the error message in the MessageContainer Alert Box
	 * 
	 * @memberOf ChangeTypeModal
	 * @method clearError
	 * @private
	 */
	function clearError()
	{
		ViewManager.getView("#changeTypeMessageContainer").clearAlert();
	}
	
	var typeSelected = {};
	
	/**
	 * Builds the select option for each type passed in to
	 * this method
	 * 
	 * @memberOf ChangeTypeModal
	 * @method addOptionToTypeSelect
	 * @private
	 * @param {Object} obj
	 * 			Empty instance of a type to be displayed
	 */
	function addOptionToTypeSelect(obj){
		if(obj.type == null || obj.context == null)
			return;
		
		var option = $("<option></option>");
		option.text(obj.type);
		option.attr("value", obj.type);
		option.attr('selected', 'selected')
		
		$("#changeTypeSelect").prepend(option);
		
		typeSelected[obj.type] = function(dataEdit){
			if(obj.generateId != undefined)
				obj.generateId(AppController.serverController.getRepoInterface().selectedServer)
			dataEdit.changeObject(obj);
		};
	}
	
	/**
	 * Connects with DataEdit View on RepoEdit/RepoViewScreen's and changes 
	 * the type once a new one has been selected in this modal
	 * 
	 * @memberOf ChangeTypeModal
	 * @method submitChangeType
	 * @private
	 * @param {DataEdit} dataEdit
	 * 			DataEdit View to interact with
	 */
	function submitChangeType(changeObj, dataEdit){
		var type = $("#changeTypeSelect").val();
		
		if(typeSelected[type] != undefined){
			typeSelected[type](addingTo, dataEdit);
			ModalManager.hideModal();
		}else{
			var context = $("#changeTypeOtherSchemaInput").val();
			var otherType = $("#changeTypeOtherInput").val();
			if(otherType != undefined && otherType != "" && context != undefined && context != ""){
				
				dataEdit.changeType(changeObj, context, otherType)

				
				ModalManager.hideModal();
			}else{
				displayError("Cannot Set Blank Context or Type")
			}
		}
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf ChangeTypeModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	ChangeTypeModal.prototype.display = function(containerId)
	{	
		typeSelected = [];
		
		var changeObj = this.changeObj;
		
		var dataEdit = ViewManager.getView(this.repoEditContainerId);
		
		
		ViewManager.showView(new MessageContainer("changeType"), "#changeTypeMessageContainer");
		
		var thing = new Thing();
		thing.name = "New Thing";
		addOptionToTypeSelect(thing);
		
		if(dataEdit != undefined){
			$("#changeTypeSelect").change(function(){
				if($("#changeTypeSelect").val() == "other"){
					$("#changeTypeOtherContainer").removeClass("hide");
				}else{
					$("#changeTypeOtherContainer").addClass("hide");
				}
			});
			
			$("#changeTypeSubmit").click(function(){
				submitChangeType(changeObj, dataEdit);
			});
		}else{
			$("#changeTypeSelect").attr("disabled", "disabled")
			
			ViewManager.getView("#changeTypeMessageContainer").displayAlert("Unable to change type, are you one the right screen?");
		}
			
		
		
		
		
		$("#changeTypeCancel").click(function(){
			ModalManager.hideModal();
		})
		
	}
	
	return ChangeTypeModal;
})(ChangeTypeModal);/**
 * Screen with form for editing competency details
 * 
 * @module cass.manager
 * @class CompetencyEditScreen
 * 
 * @author devlin.junker@eduworks.com
 */
CompetencyEditScreen = (function (CompetencyEditScreen) {

    var frameworkId = null;
    var data = null;

    /**
     * Handles displaying the details of the competency in the HTML
     * 
     * @memberOf CompetencyEditScreen
     * @method displayCompetency
     * @private
     * @param {EcCompetency} competency
     * 			The competency to be displayed in the HTML
     */
    function displayCompetency(competency) {
        $('#competencyEditor').show();
        $("#competencyEditId").val(competency.id);
        $("#competencyEditName").val(competency.getName());
        $("#competencyEditDescription").val(competency.getDescription());
        $("#competencyEditScope").val(competency.scope);

        if (competency.owner != undefined && competency.owner.length > 0) {
            $("#competencyEditOwner").html("");
            for (var i = 0; i < competency.owner.length; i++) {
                if (i > 0)
                    $("#competencyEditOwner").append(", ");

                var pem = competency.owner[i];

              
                $("#competencyEditOwner").append("<span id='competency-owner-"+i+"'></span>");
                
                ViewManager.showView(new IdentityDisplay(pem), "#competency-owner-"+i);
            }
        } else {
            $("#competencyEditOwner").text("Public")
            $("#competencyEditOwnerAdvanced").hide();
        }

        if (EcEncryptedValue.encryptOnSave(competency.id)) {
            if ($("#privateRow").css("display") == "none")
                $("#privateRow").slideDown();

            if (competency.reader != undefined && competency.reader.length != 0) {
                $("#competencyEditNoReaders").addClass("hide");
                $("#competencyEditReaders").html("");
                for (var i = 0; i < competency.reader.length; i++) {
                    var pk = competency.reader[i];

                    //var contact = $(createContactSmall(pk));
                    //$("#competencyEditReaders").append(contact);
                    
                    $("#competencyEditReaders").append("<span id='competency-reader-"+i+"'></span>");
                    ViewManager.showView(new IdentityDisplay(pk), "#competency-reader-"+i);

                    if (i < competency.reader.length - 1)
                        $("#competencyEditReaders").append(", ");
                }
            } else {
                $("#competencyEditNoReaders").removeClass("hide");
            }
        } else if ($("#privateRow").css("display") != "none") {
            $("#privateRow").slideUp();
        }

        $("#competencyNoLevels").removeClass("hide");
        $("#competencyLevelContainer").children(".level").remove();
        competency.levels(AppController.serverController.getRepoInterface(), addLevel, errorRetrievingLevels)

        $("#competencyNoRollupRules").removeClass("hide");
        $("#competencyRollupRuleContainer").children(".rollupRule").remove();
        competency.rollupRules(AppController.serverController.getRepoInterface(), addRollupRule, errorRetrievingRollupRules)

    }

    /**
     * Handles adding the elements containing level details, with
     * click handlers on them for editing the level displayed
     * 
     * @memberOf CompetencyEditScreen
     * @method addLevel
     * @private
     * @param {EcLevel} level
     * 			Level to display in the element that is created
     */
    function addLevel(level) {
        $("#competencyNoLevels").addClass("hide");

        var container = $("<span data-tooltip data-fade-out-duration='1500' class='level fake-a has-tip top'></span>");
        container.append(level.getName());
        container.attr("id", level.id);

        var tip = "";
        if (level.description != undefined && level.description != "")
            tip += "Description: " + level.description + "<br/><br/>";
        if (level.title != undefined && level.title != "")
            tip += "Title: " + level.title + "<br/><br/>";
        if (level.performance != undefined && level.performance != "")
            tip += "Performance Measure: " + level.performance + "<br/><br/>";
        if (level.owner != undefined && level.owner.length > 0) {
            tip += "Owner: ";
            for (var i = 0; i < level.owner.length; i++) {
                if (i != 0)
                    tip += ", ";
                tip += AppController.identityController.lookup(level.owner[i]).displayName;
            }
            tip += "<br/><br/>"
        }

        tip += level.id;

        if ($("#competencyLevelContainer").children("span").size() > 0)
            $("#competencyLevelContainer").append(", ");

        $("#competencyLevelContainer").append(container);

        container.click(function (ev) {
            ev.preventDefault();
            ModalManager.showModal(new EditLevelModal(level, function (level) {
                var commas = container.parent().contents().filter(function() {
                    return this.nodeType == 3;
                });
                commas.last().remove();
            	container.foundation("destroy");
                container.remove();
               

                if (level != null)
                    addLevel(level)
                else if ($("#competencyLevelContainer").find(".level").size() == 0)
                    $("#competencyNoLevels").removeClass("hide");
            }));
        });

        new Foundation.Tooltip(container, {
            "tipText": tip
        });
    }
    
    /**
     * Handles adding an element containing rollup rule details,
     * with click handlers for editing the rollup rule displayed
     * 
     * @memberOf CompetencyEditScreen
     * @method addRollupRule
     * @private
     * @param {EcRollupRule} rollupRule
     * 			Rollup rule to be displayed
     */
    function addRollupRule(rollupRule) {
        $("#competencyNoRollupRules").addClass("hide");

        var container = $("<span data-tooltip data-fade-out-duration='1500' class='rollup-rule fake-a has-tip top'></span>");
        container.append(rollupRule.getName());
        container.attr("id", rollupRule.id);

        var tip = "";
        if (rollupRule.description != undefined && rollupRule.description != "")
            tip += "Description: " + rollupRule.description + "<br/><br/>";
        if (rollupRule.rule != undefined && rollupRule.rule != "")
            tip += "Rule: " + rollupRule.rule + "<br/><br/>";
        if (rollupRule.outcome != undefined && rollupRule.outcome != "")
            tip += "Outcome: " + rollupRule.outcome + "<br/><br/>";
        if (rollupRule.owner != undefined && rollupRule.owner.length > 0) {
            tip += "Owner: ";
            for (var i = 0; i < rollupRule.owner.length; i++) {
                if (i != 0)
                    tip += ", ";
                tip += AppController.identityController.lookup(rollupRule.owner[i]).displayName;
            }
            tip += "<br/><br/>"
        }

        tip += rollupRule.id;

        if ($("#competencyRollupRuleContainer").children("span").size() > 0)
            $("#competencyRollupRuleContainer").append(", ");

        $("#competencyRollupRuleContainer").append(container);

        container.click(function (ev) {
            ev.preventDefault();
            ModalManager.showModal(new EditRollupRuleModal(rollupRule, function (rollupRule) {
            	var commas = container.parent().contents().filter(function() {
                    return this.nodeType == 3;
                });
                commas.last().remove();
            	container.foundation("destroy");
                container.remove();

                if (rollupRule != null)
                    addRollupRule(rollupRule)
                else if ($("#competencyRollupRuleContainer").find("span").size() == 0)
                    $("#competencyNoRollupRules").removeClass("hide");
            }));
        });

        new Foundation.Tooltip(container, {
            "tipText": tip
        });
    }

    
    /**
     * Callback when the competency is  saved to let 
     * the user know it was successful. If the frameworkId
     * variable is set, add the competency, lefels and rollup rule
     * to the framework and return to the framework page 
     * 
     * @memberOf CompetencyEditScreen
     */
    function saveSuccess() {
        $("#datum").effect("highlight", {}, 1500);
        
        if (frameworkId != null) {
            EcFramework.get(frameworkId, function (framework) {
            	var rulesDone = false;
            	var levelsDone = false;
                framework.addCompetency(data.id);
                data.levels(AppController.serverController.getRepoInterface(), function (level) {
                    framework.addLevel(level.id);
                }, errorRetrievingLevels, function (levels) {
                    framework.save(function (s) {
                    	if(rulesDone)
	                        ScreenManager.changeScreen(new FrameworkEditScreen({
	                            id: EcRemoteLinkedData.trimVersionFromUrl(frameworkId)
	                        }));
                    	else
                    		levelsDone = true;
                    }, errorSaving);
                });

                data.rollupRules(AppController.serverController.getRepoInterface(), function (rollupRule) {
                    framework.addRollupRule(rollupRule.id);
                }, errorRetrievingRollupRules, function (rollupRules) {
                    framework.save(function (s) {
                        if(levelsDone)
	                    	ScreenManager.changeScreen(new FrameworkEditScreen({
	                            id: EcRemoteLinkedData.trimVersionFromUrl(frameworkId)
	                        }));
                        else
                        	rulesDone = true;
                    }, errorSaving);
                });

            }, errorRetrieving);
        }
    }

    /**
	 * Error function called if problem getting the competency from the server
	 * 
	 * @memberOf CompetencyEditScreen
	 * @method errorRetrieving
	 * @private
	 * @param {String} err
	 * 			Error message to display
	 */
    function errorRetrieving(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Retrieve Competency for Editing";
        ViewManager.getView("#competencyEditMessageContainer").displayAlert(err);
    }

    /**
	 * Error function called if problem saving the competency to the server
	 * 
	 * @memberOf CompetencyEditScreen
	 * @method errorSaving
	 * @private
	 * @param {String} err
	 * 			Error message to display
	 */
    function errorSaving(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Save Competency";

        ViewManager.getView("#competencyEditMessageContainer").displayAlert(err, "saveFail");
    }

    /**
	 * Error function called if problem retrieving competency levels from server
	 * 
	 * @memberOf CompetencyEditScreen
	 * @method errorRetrievingLevels
	 * @private
	 * @param {String} err
	 * 			Error message to display
	 */
    function errorRetrievingLevels(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Retrieve Competency Levels";

        ViewManager.getView("#competencyEditMessageContainer").displayAlert(err, "getLevels");
    }

    /**
	 * Error function called if problem retrieving competency rollup rules from the server
	 * 
	 * @memberOf CompetencyEditScreen
	 * @method errorRetrievingRollupRules
	 * @private
	 * @param {String} err
	 * 			Error message to display
	 */
    function errorRetrievingRollupRules(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Retrieve Competency Rollup Rules";

        ViewManager.getView("#competencyEditMessageContainer").displayAlert(err, "getRollupRules");
    }

    
    
    
    /**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf CompetencyEditScreen
	 * @method display
	 * @param {String} containerId
	 * 			Screen Container DOM ID
	 */
    CompetencyEditScreen.prototype.display = function (containerId) {
        data = this.data;
        if (data == null)
            data = {};

        if (data.id != undefined)
            ScreenManager.setScreenParameters({
                "id": data.id
            });

        if (this.frameworkId != null)
            ScreenManager.setScreenParameters({
                "frameworkId": this.frameworkId
            });
        else if (data.frameworkId != null)
            ScreenManager.setScreenParameters({
                "frameworkId": this.frameworkId = data.frameworkId
            });

        frameworkId = this.frameworkId;

        if (data.id == undefined) {
            data = new EcCompetency();
            data.generateId(AppController.serverController.getRepoInterface().selectedServer);
            data.name = "";

            if (AppController.identityController.selectedIdentity != undefined) {
                data.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
            }
            
            $("#competencyEditName").focus();
        }

        ViewManager.showView(new MessageContainer("competencyEdit"), "#competencyEditMessageContainer", function () {
            if (data.name == "" && AppController.identityController.selectedIdentity == undefined) {
                ViewManager.getView("#competencyEditMessageContainer").displayWarning("You are Creating a Public Competency, this competency can be modified by anyone")
            }
        });

        $("#competencyEditSearchBtn").attr("href", "#" + CompetencySearchScreen.prototype.displayName);
        $("#competencyEditSearchBtn").click(function (event) {
            event.preventDefault();
            if (data.name == "") {
                ScreenManager.changeScreen(new CompetencySearchScreen())
            } else {
                ScreenManager.changeScreen(new CompetencySearchScreen(data));
            }

        });

        if (data.name == "") {
            $("#competencyEditViewBtn").hide();

        } else {
            $("#competencyEditViewBtn").attr("href", "#" + CompetencyViewScreen.prototype.displayName);
            $("#competencyEditViewBtn").click(function (event) {
                event.preventDefault();
                ScreenManager.changeScreen(new CompetencyViewScreen(data))
            });
        }


        $("#competencyEditBtn").attr("href", "#" + CompetencyEditScreen.prototype.displayName);
        $("#competencyEditBtn").click(function (event) {
            event.preventDefault();
        });

        $("#competencyEditCancelBtn").click(function (event) {
            event.preventDefault();
            if (frameworkId == null)
                ScreenManager.changeScreen(new CompetencyViewScreen(data))
            else
                ScreenManager.changeScreen(new FrameworkEditScreen({
                    id: EcRemoteLinkedData.trimVersionFromUrl(frameworkId)
                }));
        });

        if (data.name == "") {
            $("#competencyEditDeleteBtn").remove();
        } else {
            $("#competencyEditDeleteBtn").click(function (event) {
                event.preventDefault();

                ModalManager.showModal(new ConfirmModal(function () {
                    data._delete(function () {
                        ScreenManager.changeScreen(new CompetencySearchScreen());
                    }, function (err) {
                        if (err == undefined)
                            err = "Unable to connect to server to delete framework";
                        ViewManager.getView("#competencyEditMessageContainer").displayAlert(err)
                    });
                    ModalManager.hideModal();
                }, "Are you sure you want to delete this competency?"))
            })
        }

        $("#competencyEditSaveBtn").click(function (event) {
            event.preventDefault();

            data.setName($("#competencyEditName").val());
            data.setDescription($("#competencyEditDescription").val());
            data.scope = $("#competencyEditScope").val();

            if (data.name != "") {
                ViewManager.getView("#competencyEditMessageContainer").clearAlert("saveFail");
                ViewManager.getView("#competencyEditMessageContainer").clearAlert("defaultName");
                data.save(saveSuccess, errorSaving);
            } else {
                ViewManager.getView("#competencyEditMessageContainer").displayAlert("Cannot Save Competency Without a Name", "defaultName");
            }
        })

        $("#competencyEditSaveBtn").on("mousemove", function () {
            var url = $("#competencyEditId").val();
            var split = url.split("\/");
            if (split[split.length - 4] == "data")
                split[split.length - 1] = new Date().getTime();
            $("#competencyEditId").val(split.join("/"));
        });

        $("#competencyAddLevel").click(function (ev) {
            ev.preventDefault();
            ModalManager.showModal(new EditLevelModal(data, function (level) {
                addLevel(level);
            }));
        });

        $("#competencyAddRollupRule").click(function (ev) {
            ev.preventDefault();
            ModalManager.showModal(new EditRollupRuleModal(data, function (rollupRule) {
                addRollupRule(rollupRule);
            }));
        });

        $("#competencyEditOwnerAdvanced").click(function (ev) {
            ev.preventDefault();

            data.setName($("#competencyEditName").val());
            data.setDescription($("#competencyEditDescription").val());
            data.scope = $("#competencyEditScope").val();

            ModalManager.showModal(new AdvancedPermissionsModal(data, function (dataAfter) {
                data.owner = dataAfter.owner;
                data.reader = dataAfter.reader;

                displayCompetency(data);

                ModalManager.hideModal();
            }))
        })

        if (data.name == "") {
            displayCompetency(data);
        } else {
            EcCompetency.get(data.id, function (competency) {
                data = competency;
                displayCompetency(competency)
            }, errorRetrieving);
        }

    };

    return CompetencyEditScreen;
})(CompetencyEditScreen);
/**
 * Screen for displaying search results from a competency search in 
 * a DataViewer view. 
 * 
 * @module cass.manager
 * @class CompetencySearchScreen
 *  
 * @author devlin.junker@eduworks.com
 */
CompetencySearchScreen = (function(CompetencySearchScreen){
	
	var maxLength = 24;
	
	var searchHandle = null;
	
	/**
     * Method to run the competency search on the server
     * 
     * @memberOf CompetencySearchScreen
     * @method runCompetencySearch
     * @private
     * @param {int} start
     */
	function runCompetencySearch(start){
		var query = $("#competencySearchText").val();

		if (query == null || query == "")
			query = "*";
		if (searchHandle != null)
			clearTimeout(searchHandle);
		
		var ownership = $("#competencySearchOwnership").val();
		if(ownership == 1)
			ownership = "public";
		else if(ownership == 3)
			ownership = "owned";
		else if(ownership == 4)
			ownership = "me"
		else
			ownership = "all";
		
		var callback;
		if(start == undefined)
			callback = clearDisplayResults;
		else
			callback = displayResults;
		
		searchHandle = setTimeout(function() {
			
			var urlParams = {};
			if(window.location.hash.split("?").length > 1){
				var hashSplit = window.location.hash.split(/[?&]/)
				for(var i = 1; i < hashSplit.length; i++){
					var paramSplit = hashSplit[i].split("=");
					if(paramSplit.length == 2)
						urlParams[paramSplit[0]] = paramSplit[1]; 
				}
			}
			if(query != "*")
				urlParams.query = query;
			if(ownership != "all")
				urlParams.ownership = ownership;
			
			if(Object.keys(urlParams).length > 0){
				ScreenManager.setScreenParameters(urlParams);
				ScreenManager.getCurrentScreen().setParams(urlParams);
			}else{
				ScreenManager.setScreenParameters(null);
				ScreenManager.getCurrentScreen().clearParams();
			}
				
			
			ViewManager.getView("#competencySearchMessageContainer").clearAlert("searchFail");
			//ViewManager.getView("#competencySearchResults").showProgressMessage();
			ViewManager.getView("#competencySearchResults").deselectAll();
			
			var params = {};
			params.ownership = ownership;
			params.size = maxLength;
			params.start = start;
			
			EcCompetency.search(AppController.serverController.getRepoInterface(), query, callback, errorSearching, params);
		}, 100);
	}
	
	/**
	 * Clears the data in the DataViewer so that the table is empty
	 * and then displays the results
	 * 
	 * @memberOf CompetencySearchScreen
	 * @method clearDisplayResults
	 * @private	
	 * @param {Array<EcCompetency>} results
	 * 			results to display after clearing the DataViewer
	 */
	function clearDisplayResults(results)
	{
		ViewManager.getView("#competencySearchResults").clear();
		displayResults(results);
	}
	
	/**
	 * Displays results of the search, by appending them to the table,
	 * does some checks on the number of results to see what interfaces 
	 * should be visible
	 * 
	 * @memberOf CompetencySearchScreen
	 * @method displayResults
	 * @private
	 * @param {Array<EcAssertion>} results
	 * 			results to add to to the DataViewer
	 */
	function displayResults(results)
	{ 
		ViewManager.getView("#menuContainer").showSortBasic();
		ViewManager.getView("#competencySearchResults").populate(results);
		
		
		if(results.length == 0 && $("#competencyResults-data").first().children().size() == 0)
		{
			ViewManager.getView("#competencySearchResults").showNoDataMessage();
		}else if(results.length < maxLength){
			$("#moreSearchResults").addClass("hide");
			//$(window).off("scroll", scrollSearchHandler);
		}else{
			$("#getMoreResults").click(function(){
				$("#getMoreResults").addClass("hide");
				$("#loadingMoreResults").removeClass("hide");
				runCompetencySearch($("#competencyResults-data").first().children().size());
			})
			
			$("#getMoreResults").removeClass("hide");
			$("#moreSearchResults").removeClass("hide");
			$("#loadingMoreResults").addClass("hide");
			
			//$(window).scroll(scrollSearchHandler)
		}
		
		searchHandle = null;
	}
	
	/*
	function scrollSearchHandler(){
		var resultDiv = $("#competencyResults-data").first(); 
		
		if(resultDiv.children().size() == 0){
			$(window).off("scroll", scrollSearchHandler);
		}
		else if(($(window).height() + document.body.scrollTop) > ($(document).height() - 30))
		{
			//$("#moreSearchResults").addClass("hide");
			//$("#loadingMoreResults").removeClass("hide");
			runCompetencySearch(resultDiv.children().size() );
		}
	}
	*/
	
	/**
     * Called when error searching for competency
     * 
     * @memberOf CompetencySearchScreen
     * @method errorSearching
     * @private
     * @param {String} err
     * 			Error message to be displayed
     */
	function errorSearching(err){
		if(err == undefined)
			err = "Unable to Connect to Server for Competency Search";
		
		ViewManager.getView("#competencySearchMessageContainer").displayAlert(err, "searchFail");
		
		$("#competencySearchNone").removeClass("hide");
		$("#competencySearchProgress").addClass("hide");
	}

	/**
     * Called when the competency name is clicked on in the DataViewer
     * 
     * @memberOf CompetencySearchScreen
     * @method viewCompetency
     * @private 
     * @param {EcCompetency} competency	
     * 			Competency to display on the CompetencyViewScreen changed to
     */
	function viewCompetency(competency){
		ScreenManager.changeScreen(new CompetencyViewScreen(competency));
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf CompetencySearchScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
	CompetencySearchScreen.prototype.display = function(containerId)
	{
		var lastViewed = this.lastViewed;
		
		var query = this.query;
		var ownership = this.ownership;
		
		ViewManager.showView(new MessageContainer("competencySearch"), "#competencySearchMessageContainer");
		
		ViewManager.showView(new DataViewer("competencyResults", {
			sort:{},
			clickDataEdit:function(datum){
				ScreenManager.changeScreen(new CompetencyEditScreen(datum));
			},
			moreMenuTools:function(){
				var container = $("<div></div>");
				
				var el = $("<li><span><i class='fa fa-sitemap'></i> Add to Framework</span></li>");
				
				el.click(function(){
					var selected = ViewManager.getView("#competencySearchResults").getSelected();
					
					ModalManager.showModal(new AddToFrameworkModal(selected));
				})
				
				container.append(el);
				
				el = $("<li><span><i class='fa fa-download'></i> Export</span></li>");
				
				el.click(function(){
					var selected = ViewManager.getView("#competencySearchResults").getSelected();
					
					ModalManager.showModal(new RepoExportModal(selected));
				})
				
				container.append(el);
				
				return container.contents();
			},
			buildDataRow:function(row, id, datum){
				row.append("<div class='small-8 columns'>" +
							"<a class='datum-name'></a>" +
							"<span class='datum-description'></span>" +
							"</div>" +
							"<div class='small-4 columns datum-owner'></div>");
				
				var name;
				if(datum.getName != undefined){
					name = datum.getName();
				}else if(datum["name"] != undefined){
					name = datum["name"];
				}else{
					name = id;
				}
					
				row.find(".datum-name").text(name);
				
				var desc;
				if(datum.getDescription != undefined && datum.getDescription() != null && datum.getDescription() != ""){
					desc = " - "+datum.getDescription();
				}else if(datum["description"] != undefined && datum["description"] != ""){
					desc = " - "+datum["description"];
				}else{
					desc = "";
				}
				row.find(".datum-description").text(desc);
				
				if(datum["owner"] != undefined && datum["owner"].length > 0){
					for(var i in datum["owner"]){
						var trimId = EcRemoteLinkedData.trimVersionFromUrl(id)
						var idEnd = trimId.split("/")[trimId.split("/").length-1];
						var elId = idEnd+"-owner-"+i;
						
						var ownerEl = $("<span id='"+elId+"'></span>")
						row.find(".datum-owner").append(ownerEl);
						
						ViewManager.showView(new IdentityDisplay(datum["owner"][i]), "#"+elId)
					}
				}else{
					row.find(".datum-owner").text("Public");
				}
				
				row.find("a.datum-name").click(function(ev){
					ev.preventDefault();
					ScreenManager.changeScreen(new CompetencyViewScreen(datum));
				});
				
			}
		}), "#competencySearchResults");
		
		
		$("#competencySearchSubmit").click(function(event){
			event.preventDefault();
			runCompetencySearch();
		});
		
		$("#competencySearchText").keypress(function(e){
			var key = e.which;
			if(key == 13)  // the enter key code
			{
				runCompetencySearch();
			}
		});
		
		if(query != null)
			$("#competencySearchText").val(query)
		
		if(AppController.loginController.getLoggedIn())
		{
			$("#competencySearchOwnership").attr("max", 4);
			$("#competencySearchOwnershipLoggedIn").removeClass("hide");
			$("#competencySearchOwnershipPublic").addClass("hide");
		}
		else
		{
			$("#competencySearchOwnershipLoggedIn").addClass("hide");
			$("#competencySearchOwnershipPublic").removeClass("hide");
		}
		
		if(ownership != null){
			if(ownership == "public")
				ownership = 1;
			else if(ownership == "owned")
				ownership = 3;
			else if(ownership == "me")
				ownership = 4
			
			$("#competencySearchOwnership").val(ownership);
		}
		
		runCompetencySearch();
		
		ViewManager.getView("#menuContainer").showSortBasic();
	};
	
	/**
	 * Overridden onClose callback, called when leaving screen
	 * 
	 * @memberOf CompetencySearchScreen
	 * @method onClose
	 */
	CompetencySearchScreen.prototype.onClose = function(){
		ViewManager.getView("#menuContainer").hideSort();
	}
	
	CompetencySearchScreen.prototype.sortByTimestamp = function(){
		$("#competencyResults-sortSelect").val("timestamp");
		$("#competencyResults-sortSelect").trigger("change");
	}
	
	CompetencySearchScreen.prototype.sortByOwner = function(){
		$("#competencyResults-sortSelect").val("owner");
		$("#competencyResults-sortSelect").trigger("change");
	}
	
	CompetencySearchScreen.prototype.filterPublic = function(){
		$("#competencySearchOwnership").val(1);
		runCompetencySearch();
	}
	
	CompetencySearchScreen.prototype.filterAll = function(){
		$("#competencySearchOwnership").val(2);
		runCompetencySearch();
	}
	
	CompetencySearchScreen.prototype.filterOwned = function(){
		$("#competencySearchOwnership").val(3);
		runCompetencySearch();
	}
	
	CompetencySearchScreen.prototype.filterOwnedByMe = function(){
		if(!AppController.loginController.getLoggedIn()){
			return;
		}
		
		$("#competencySearchOwnership").val(4);
		runCompetencySearch();
	}
	
	/**
	 * Sets the search parameters on the view, so they can be reloaded if the page is
	 * 
	 * @memberOf CompetencySearchScreen
	 * @method setParams
	 * @param {Object} params
	 */
	CompetencySearchScreen.prototype.setParams = function(params)
	{
		if(params == undefined){
			this.clearParams();
			return;
		}
		
		this.query = params.query;
		this.ownership = params.ownership;
	}
	
	/**
	 * Handles getting search parameters from DOM and running
	 * basic Repository search
	 * 
	 * @memberOf CompetencySearchScreen
	 * @method clearParams
	 */
	CompetencySearchScreen.prototype.clearParams = function(){
		this.query = undefined;
		this.ownership = undefined;
	}
	
	return CompetencySearchScreen;
})(CompetencySearchScreen);/**
 * @module cass.manager
 * 
 * @author fritz.ray@eduworks.com
 */	
CompetencyViewScreen.prototype.errorFindingRelations = function(err){
		if(err == undefined)
			err = "Unable to Connect to Server to Retrieve Relationships";
		
		ViewManager.getView("#competencyViewMessageContainer").displayAlert(err, "getRelationships");
	}

CompetencyViewScreen.prototype.errorFindingRollupRules = function(err){
		if(err == undefined)
			err = "Unable to Connect to Server to Retrieve Relationships";
		
		ViewManager.getView("#competencyViewMessageContainer").displayAlert(err, "getRelationships");
	}
	
CompetencyViewScreen.prototype.errorFindingLevels = function(err){
		if(err == undefined)
			err = "Unable to Connect to Server to Retrieve Levels";
		
		ViewManager.getView("#competencyViewMessageContainer").displayAlert(err, "getLevels");
	}
	
CompetencyViewScreen.prototype.bindControls = function(containerId)
	{
		var data = this.data;
		
		$("#competencyViewSearchBtn").attr("href", "#"+CompetencySearchScreen.prototype.displayName);
		$("#competencyViewSearchBtn").click(function(event){
			event.preventDefault();
			ScreenManager.changeScreen(new CompetencySearchScreen(data))
		});
		
		$("#competencyViewBtn").attr("href", "#"+CompetencyViewScreen.prototype.displayName);
		$("#competencyViewBtn").click(function(event){
			event.preventDefault();
		});
		
		$(".relationViewLink").off("click");
		$(".relationViewLink").on("click", function(){
			ScreenManager.changeScreen(new RelationshipViewScreen({id:$(this).closest(".relation").attr("id")}));
		});
		
		$("#addToFrameworkBtn").off("click");
		$("#addToFrameworkBtn").on("click", function(event){
			event.preventDefault();
			ModalManager.showModal(new AddToFrameworkModal(data));
		});
		
		if(AppController.identityController.canEdit(data)){
			$("#editCompetencyBtn").click(function(event){
				event.preventDefault();
				ScreenManager.changeScreen(new CompetencyEditScreen(data));
			})
		}else{
			$("#editCompetencyBtn").remove();
		}
		
		$("#createSourceRelation").off("click");
		$("#createSourceRelation").attr("href", "#"+RelationshipEditScreen.prototype.getDisplayName()+"?source="+data.shortId());
		$("#createSourceRelation").click("click", function(ev){
			ev.preventDefault();
			ScreenManager.changeScreen(new RelationshipEditScreen({"source":data.shortId()}));
			return false;
		})
		
		$("#createTargetRelation").off("click");
		$("#createTargetRelation").attr("href", "#"+RelationshipEditScreen.prototype.getDisplayName()+"?target="+data.shortId());
		$("#createTargetRelation").on("click", function(ev){
			ev.preventDefault();
			ScreenManager.changeScreen(new RelationshipEditScreen({"target":data.shortId()}));
			return false;
		});
		
		$('[ec-container="competency"]').on("click","a[id]",null,function(evt){
			if (this.getAttribute("id").indexOf(".competency/") != -1)
				ScreenManager.changeScreen(new CompetencyViewScreen({id:this.getAttribute("id")}));
		});
		
		if(AppController.identityController.owns(data) || AppController.serverController.getAdmin()){
			$("#competencyViewDeleteBtn").click(function(){
				ModalManager.showModal(new ConfirmModal(function(){
					data._delete(function(){
						ScreenManager.changeScreen(new CompetencySearchScreen());
					}, function(err){
						if(err == undefined)
							err = "Unable to connect to server to delete competenncy";
						ViewManager.getView("#competencyViewMessageContainer").displayAlert(err)
					});
					ModalManager.hideModal();
				}, "Are you sure you want to delete this competency?"))
			})
		}else{
			$("#competencyViewDeleteBtn").remove();
		}
		
		 if (data.owner != undefined && data.owner.length > 0) {
		        $("#competencyViewOwner").text("")
		        for (var i = 0; i < data.owner.length; i++) {
		            if (i > 0)
		                $("#competencyViewOwner").append(", ");

		            
		            $("#competencyViewOwner").append("<span id='competency-owner-"+i+"'></span>");
		            
		            ViewManager.showView(new IdentityDisplay(data.owner[i]), "#competency-owner-"+i);
		   
		        }
		    } else {
		        $("#competencyViewOwner").text("Public")
		    }
	};
	/**
 * Generic Modal for a confirm interaction, displays a message and 
 * waits for the user to select confirm, then triggers the confirm 
 * callback
 * 
 * @module cass.manager
 * @class ConfirmModal
 * 
 * @author devlin.junker@eduworks.com
 */
var ConfirmModal = (function(ConfirmModal){	
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf ConfirmModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	ConfirmModal.prototype.display = function(containerId)
	{
		var msg = this.message;
		
		var confirmCallback = this.confirmCallback;
		
		ViewManager.showView(new MessageContainer("confirm"), "#confirmMessageContainer");
		
		if(this.header != undefined)
			$("#confirmHeader").text(this.header);
		
		$("#confirmMessage").html(msg);
		
		$("#confirmBtn").click(function(event){
			confirmCallback();
		});
		
		$("#cancelBtn").click(function(event){
			ModalManager.hideModal();
		});
		
	}
	
	/**
	 * Public function for showing an alert message in the confirm container, 
	 * can be used in the confirm callback to indicate an error during confirmation 
	 * 
	 * @memberOf ConfirmModal
	 * @method displayAlertMessage
	 * @param {String} msg
	 * 			Alert message to display
	 */
	ConfirmModal.prototype.displayAlertMessage = function(msg){
		ViewManager.getView("#confirmMessageContainer").displayAlert(msg);
	}
	
	return ConfirmModal;
})(ConfirmModal);/**
 * Modal to indicate to the user that another user has shared 
 * contact information with them via a ContactGrant 
 * 
 * @module cass.manager
 * @class ContactAcceptModal
 * 
 * @author devlin.junker@eduworks.com
 */
var ContactAcceptModal = (function(ContactAcceptModal){	
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf ContactAcceptModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	ContactAcceptModal.prototype.display = function(containerId)
	{
		var me = this;
		var closed = false;
		
		var grant = this.grant;
		
		var onClose = this.onClose;
		
		ViewManager.showView(new MessageContainer("contactAccept"), "#contactAcceptMessageContainer", function(){});
		
		$("#newContactName").text(grant.displayName);
		
		$("#addContact").click(function(event){
			event.preventDefault();
			
			var contact = new EcContact();
            contact.pk = EcPk.fromPem(grant.pk);
            contact.source = grant.source;
            contact.displayName = grant.displayName;
            
            EcIdentityManager.addContact(contact);
            
            EcRepository._delete(grant);
            
            ModalManager.hideModal();
		});
		
		$("#skipAddContact").click(function(event){
			event.preventDefault();
			ModalManager.hideModal();
		});
		
		$(containerId).on("closed.zf.reveal", function(){
			if(ModalManager.getCurrentModal() == me & !closed){
				onClose();
			}
			closed = true;
		});
		
	}
	
	return ContactAcceptModal;
})(ContactAcceptModal);/**
 * Modal to indicate that the user has followed a link to add a new contact
 * and allows them to send their own contact grant to the user
 * 
 * @module cass.manager
 * @class ContactAcceptModal
 * 
 * @author devlin.junker@eduworks.com
 */
var ContactGrantModal = (function(ContactGrantModal){	
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf ContactGrantModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	ContactGrantModal.prototype.display = function(containerId)
	{
		var me = this;
		var closed = false;
		
		var contact = this.contact;
		var responseToken = this.token;
		var responseSignature = this.signature;
		
		var onClose = this.onClose;
		
		
		ViewManager.showView(new MessageContainer("contactGrant"), "#contactGrantMessageContainer", function(){});
		
		if(EcIdentityManager.ids != undefined){
			for(var i = 0; i < EcIdentityManager.ids.length; i++)
			{
				var option = $("<option></option>");
				
				option.attr("value", EcIdentityManager.ids[i].ppk.toPem());
				option.text(EcIdentityManager.ids[i].displayName);
				
				$("#contactGrantIdentity").append(option);
			}
		}
		
		$("#sendContactGrant").click(function(event){
			event.preventDefault();
			
			var displayName = $("#contactGrantDisplayName").val();
			if(displayName == undefined || displayName == ""){
				ViewManager.getView("#contactGrantMessageContainer").displayAlert("Cannot Share Information without a Display Name");
				return;
			}
			
			var identity = $("#contactGrantIdentity").val();
			if(identity == undefined || identity == ""){
				ViewManager.getView("#contactGrantMessageContainer").displayAlert("Cannot Share Information without an Identity Selected");
				return;
			}
			
			var grant = new EcContactGrant();
            grant.addOwner(contact.pk);
            grant.addOwner(EcPpk.fromPem(identity).toPk());
            grant.generateId(contact.source);
            grant.source = AppController.serverController.selectedServerUrl;

            grant.displayName = displayName;
            grant.pk = EcPpk.fromPem(identity).toPk().toPem();
            
            grant.responseToken = responseToken;
            grant.responseSignature = responseSignature;
            
            grant.signWith(EcPpk.fromPem(identity));
            
            var encrypted = EcEncryptedValue.toEncryptedValue(grant, false);
            
            EcRepository.save(encrypted, function () {
            	ModalManager.hideModal();
            }, function(){});
		});
		
		$("#skipContactGrant").click(function(event){
			event.preventDefault();
			ModalManager.hideModal();
		});
		
		$(containerId).on("closed.zf.reveal", function(){
			if(ModalManager.getCurrentModal() == me & !closed){
				onClose();
			}
			closed = true;
		});
		
	}
	
	return ContactGrantModal;
})(ContactGrantModal);/**
 * Handles the details of copying resources in the repository,
 * this gives the current user owner priveledges on a copy of a resource
 * 
 * @module cass.manager
 * @class CopyResourceModal
 * 
 * @author devlin.junker@eduworks.com
 */
var CopyResourceModal = (function(CopyResourceModal){
	
	/**
	 * Handles actually copying the data selected and then triggering the callback
	 * once it has completed copying everything
	 * 
	 * @memberOf CopyResourceModal
	 * @method submitCopy
	 * @private
	 * @param {EcRemoteLinkedData || EcRemoteLinkedData[]} data
	 * 			Data or array of data to be copied
	 * @param {Callback0} callback
	 * 			Callback to be triggered once successfully copied everything
	 */
	function submitCopy(data, callback){
		if(data instanceof Array){
			var copied = 0;
			for(var i = 0; i < data.length; i++){
				var copy = new EcRemoteLinkedData();
				copy.copyFrom(data[i]);
				copy.generateId(AppController.serverController.selectedServerUrl);
				
				EcRepository.save(copy, function(){
					copied++;
					if(copied == data.length){
						ModalManager.hideModal();
						callback();
					}
				}, function(){
					ViewManager.getView("#copyResourceMessageContainer").displayAlert("Failed to Save Copied Resource: "+copy.name);
				})
			}
		}else{
			var copy = new EcRemoteLinkedData();
			copy.copyFrom(data);
			copy.generateId(AppController.serverController.selectedServerUrl);
			
			if(AppController.identityController.selectedIdentity != undefined){
				copy.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
			}
			
			EcRepository.save(copy, function(){
				ModalManager.hideModal();
				callback();
			}, function(){
				ViewManager.getView("#copyResourceMessageContainer").displayAlert("Failed to Save Copied Resource: "+copy.name);
			})
		}
	}
	
	/**
	 * Adds a resource name to the list of resources being copied
	 * 
	 * @memberOf CopyResourceModal
	 * @method submitCopy
	 * @private
	 * @param {EcLinkedData} resource
	 */
	function addResourceToList(resource){
		var name = resource.name;
		if(resource.getName != undefined)
			name = resource.getName();
		$("#copyResources").append($("<li>"+name+"</li>"));
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf ContactGrantModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	CopyResourceModal.prototype.display = function(containerId)
	{
		var data = this.data;
		var cb = this.callback;
	
		ViewManager.showView(new MessageContainer("copyResource"), "#copyResourceMessageContainer");

		if(data instanceof Array){
			for(var i = 0; i < data.length; i++){
				addResourceToList(data[i]);
			}
		}else{
			addResourceToList(data);
		}
		
		$("#submitCopyResources").click(function(){
			submitCopy(data, cb);
		});
		
		$("#cancelCopyResources").click(function(){
			ModalManager.hideModal();
		});
		
		if(AppController.identityController.selectedIdentity != undefined){
			var ownerElement = $(createContactSmall(AppController.identityController.selectedIdentity.ppk.toPk().toPem()));
			$("#copyOwner").append(ownerElement);
		}else{
			$("#copyOwner").text("Public");
		}
			
	}
	
	return CopyResourceModal;
})(CopyResourceModal);/**
 * Modal containing the form for creating a new user with a username
 * and password combination.
 * 
 * @module cass.manager
 * @class CreateIdentityModal
 * 
 * @author devlin.junker@eduworks.com
 */
var CreateIdentityModal = (function(CreateIdentityModal){
	
	/**
	 * Submits the username and password given to the server
	 * to create a new user 
	 * 
	 * @memberOf CreateIdentityModal
	 * @method submitCreateForm
	 * @private 
	 */
	function submitCreateForm(successCallback){
		ViewManager.getView("#createIdentityMessageContainer").clearAlert("createFail");

		$("#createButton").prop("disabled", true);
		$("#createIdentitySpinner").removeClass("hide");

        var name = $("#createIdentityName").val();
        AppController.identityController.generateIdentity(function (identity) {
            if(ScreenManager.getCurrentScreen().refreshIdentities != undefined)
                ScreenManager.getCurrentScreen().refreshIdentitie(EcIdentityManager.ids);
            download(identity.displayName + '.pem', identity.ppk.toPem());
            AppController.loginController.save(
                function(){
                    $("#createButton").removeAttr("disabled");
                    $("#createIdentitySpinner").addClass("hide");
                    ModalManager.hideModal();
                	if(successCallback != undefined){
                		successCallback();
					}
				},
                function(err){
                    $("#createButton").removeAttr("disabled");
                    $("#createIdentitySpinner").addClass("hide");
				}
            );
        }, name);
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf CreateIdentityModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	CreateIdentityModal.prototype.display = function(containerId)
	{
		var successCallback = this.success;
		
		ViewManager.showView(new MessageContainer("createIdentity"), "#createIdentityMessageContainer");
		
		$("#createForm").submit(function(event){
			event.preventDefault();
			submitCreateForm(successCallback);
		})
		
	}
	
	return CreateIdentityModal;
})(CreateIdentityModal);/**
 * Modal containing the form for creating a new user with a username
 * and password combination.
 *
 * @module cass.manager
 * @class CreateUserModal
 *
 * @author devlin.junker@eduworks.com
 */
var CreateUserModal = (function(CreateUserModal){

	/**
	 * Submits the username and password given to the server
	 * to create a new user
	 *
	 * @memberOf CreateUserModal
	 * @method submitCreateForm
	 * @private
	 */
	function submitCreateForm(){
		ViewManager.getView("#createMessageContainer").clearAlert("createFail");

		var server = $("#createServer").val();

		AppController.serverController.selectServer(server,function(){

			AppController.loginController.create(
					$("#createUsername").val(),
					$("#createPassword").val(),
					server,
					function(){
						ModalManager.hideModal();
						ViewManager.getView(AppController.topBarContainerId).setLoggedIn();
						ScreenManager.changeScreen(new UserIdentityScreen());

						AppController.serverController.selectServer($("#createServer").val());
					},
					function(err){
						if(err == undefined)
							err = "Unable to Connect to Server to Create User";

						ViewManager.getView("#createMessageContainer").displayAlert(err, "createFail");
					}
				);
		});
	}

	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 *
	 * @memberOf CreateUserModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	CreateUserModal.prototype.display = function(containerId)
	{
		ViewManager.showView(new MessageContainer("createUser"), "#createMessageContainer");

		if($(AppController.serverController.serverList).size() > 0 ){
			$("#createServer").html("");
		}
		for(var serverName in AppController.serverController.serverList){
			var serverUrl = AppController.serverController.serverList[serverName];

			var option = $("<option></option>");
			option.attr("value", serverUrl);
			option.text(serverName);

			if(serverName == AppController.serverController.selectedServerName)
				option.attr("selected", "selected")

			$("#createServer").append(option);
		}

		$("#createAddServer").click(function(){
			ModalManager.showModal(new AddServerModal(function(){
				ModalManager.showModal(new CreateUserModal());
			}));
		});

		$("#createForm").submit(function(event){
			event.preventDefault();
			submitCreateForm();
		})

	}

	return CreateUserModal;
})(CreateUserModal);
/**
 * Abstracted viewer for 'Rows' of data in a table on a page.
 * 
 * Defines callbacks that can alter the way that rows are displayed, 
 * or the actions available on each element or multiple elements of 
 * the row. Also has handler callbacks for specific events that 
 * occur for interactions or building the View.
 * 
 * The 'sort' callback object defines a sort function name, and a method 
 * that defines how to compare two different objects for sorting.
 * 
 * Callbacks available:
 * 		buildMenu() returns Menu DOM Container
 * 		buildDataRow(row, id, datum) *** Appends Row HTML to row parameter
 * 		buildRowToolbar(id, datum) returns Toolbar DOM Container
 * 		
 * 		moreMenuTools(prefix)
 * 		moreRowTools(datum) returns MoreActions DOM Container
 * 
 * 		clickDataSelect(ev, id, datum, prefix)
 * 		clickDataDelete(datum)
 * 		clickDataEdit(datum)
 * 		clickName(id, datum)
 * 		clickMenuDelete(selectedIdArr)
 * 		clickMenuPermissions(selectedIdArr)
 * 		permissionsChanged(data || arrData)
 * 
 * 		sort = {} of sort(a, b) functions
 * 		
 * 		afterPopulate()
 * 
 * @class DataViewer
 * @author devlin.junker@eduworks.com
 */
var DataViewer = (function(DataViewer){

	/**
	 * Sorts the data before displaying it in the DataViewer table
	 * 
	 * @memberOf DataViewer
	 * @method sortData
	 * @private
	 * @param {String} prefix
	 * 			DataViewer prefix that uniquifys the view 
	 * @param {Array || Map} data
	 * @param {Object} callbacks
	 * 			Callback object that can be passed in by other developer to handle events or modify display
	 */
	function sortData(prefix, data, callbacks){
		if(data == undefined){
			return;
		}
		
		var arr;
		
		var wasObject = false;
		if(data instanceof Array){
			arr = data;
		}else if(data instanceof Object){
			wasObject = true;
			arr = [];
			for(var i in data){
				arr.push(data[i]);
			}
			
		}else{
			return;
		}
		
		
		var sortType = $("#"+prefix+"-sortSelect").val();
		
		var defaultSort = (callbacks == undefined || callbacks["sort"] == undefined || callbacks["sort"][sortType] == undefined);
		
		if(sortType == "type"){
			arr.sort(function(a, b){
				if(a.type > b.type){
					return 1;
				}else if(b.type > a.type){
					return -1;
				}else{
					return 0;
				}
			});
		}else if(sortType == "owner" || (AppController.loginController.getLoggedIn() && defaultSort)){
			arr.sort(function(a, b){
				if(AppController.identityController.owns(a)){
					if(AppController.identityController.owns(b)){
						return 0;
					}else{
						return -1;
					}
				}else if(AppController.identityController.owns(b)){
					return 1;
				}else if(a.owner == undefined || a.owner.length == 0){
					return -1;
				}else if(b.owner == undefined || b.owner.length == 0){
					return 1;
				}else if(a.owner[0] > b.owner[0]){
					return 1;
				}else if(b.owner[0] > a.owner[0]){
					return -1
				}else{
					return 0;
				}
			});
		}else if(sortType == "timestamp" || (!AppController.loginController.getLoggedIn() && defaultSort)){
			arr.sort(function(a, b){
				// By ID Timestamp (date newest -> oldest)
				var aId = a.id.split("/");
				aId = aId[aId.length -1]
				
				var bId = b.id.split("/");
				bId = bId[bId.length -1]
				
				if(aId > bId){
					return -1;
				}else{
					return 1;
				}
			});
		}else if(callbacks != undefined && callbacks["sort"] != undefined){
			arr.sort(callbacks["sort"][sortType]);
		}
		
		return arr;
	}
	
	/**
	 * Builds the sort input based on the sorts that are hard coded and 
	 * what are passed in via the callbacks object 
	 *
	 * Note: Sort Callbacks can be implemented so that if undefined is 
	 * 	passed they return a string name of the sort type, otherwise
	 * 	the key of the sort object will be used
	 * 
	 * @memberOf DataViewer
	 * @method buildSort
	 * @private
	 * @param {String} prefix
	 * 			DataViewer prefix that uniquifys the view 
	 * @param {Array || Map} data
	 * @param {DataViewer} self
	 * 			Reference to 'this' DataViewer because of JavaScript weirdness
	 * @param {Object} callbacks
	 * 			Callback object that can be passed in by other developer to handle events or modify display
	 */
	function buildSort(prefix, data, self, callbacks){
		$("#"+prefix+"-sortSelect").html("");
		$("#"+prefix+"-sortSelect").off("change");
		
		var urlParams = {};
		if(window.location.hash.split("?").length > 1){
			var hashSplit = window.location.hash.split(/[?&]/)
			for(var i = 1; i < hashSplit.length; i++){
				var paramSplit = hashSplit[i].split("=");
				if(paramSplit.length == 2)
					urlParams[paramSplit[0]] = paramSplit[1]; 
			}
		}
		
		var option = $("<option value='timestamp'>Sort by Timestamp</option>");
		if(urlParams["sort"] == undefined && !AppController.loginController.getLoggedIn())
			option.attr("selected","selected");
		$("#"+prefix+"-sortSelect").append(option);
		
		option = $("<option value='owner'>Sort by Owner</option>");
		if(urlParams["sort"] == "owner" || (urlParams["sort"] == undefined && AppController.loginController.getLoggedIn()))
			option.attr("selected","selected");
		$("#"+prefix+"-sortSelect").append(option);
		
		if(callbacks != undefined && callbacks["sort"] != undefined && callbacks["sort"] instanceof Object){
			for(var type in callbacks["sort"]){
				option = $("<option value='"+type+"'>Sort by "+type+"</option>")
				
				if(urlParams["sort"] == undefined && callbacks["sort"][type]())
					option.attr("selected","selected");
				
				if(urlParams["sort"] == type)
					option.attr("selected","selected");
				
				$("#"+prefix+"-sortSelect").append(option);
			}
		}else{
			option = $("<option value='type'>Sort by Type</option>");
			if(urlParams["sort"] == "type")
				option.attr("selected","selected");
			$("#"+prefix+"-sortSelect").append(option);
		}
		
		$("#"+prefix+"-sortSelect").removeClass("hide")
		
		$("#"+prefix+"-sortSelect").on("change", function(){
			urlParams["sort"] = $("#"+prefix+"-sortSelect").val();

			var otherDefault = false;
			if(callbacks["sort"] != undefined){
				for(var type in callbacks["sort"]){
					if(callbacks["sort"][type]()){
						otherDefault = true;
						if(urlParams["sort"] == type)
							delete urlParams["sort"];
					}
				}
			}
			if(otherDefault){
				
			}else if(urlParams["sort"] == "timestamp" && !AppController.loginController.getLoggedIn()){
				delete urlParams["sort"];
			}else if(urlParams["sort"] == "owner" && AppController.loginController.getLoggedIn()){
				delete urlParams["sort"];
			}
				
			
			ScreenManager.setScreenParameters(urlParams);
			
			$("#"+prefix+"-data").find(".row").remove();
			populateData(self.dataStore, self, prefix, callbacks);
		});
	}
	
	/**
	 * Builds the dataviewer from a set of data (either a map from id to data, or an array)
	 * 
	 * @memberOf DataViewer
	 * @method populateData
	 * @private
	 * @param {Array || Map} data	
	 * 			Set of data to be displayed
	 * @param {DataViewer} self
	 * 			Reference to 'this' DataViewer because of JavaScript weirdness
	 * @param {String} prefix
	 * 			DataViewer prefix that uniquifys the view 
	 * @param {Object} callbacks
	 * 			Callback object that can be passed in by other developer to handle events or modify display
	 */
	function populateData(data, self, prefix, callbacks){
		if(data == undefined){
			showNoDataMessage(prefix);
			return;
		}
		
		$(".toggleSelectData").removeClass("hide");
		$(".toggleSelectData").text("Select All");
		
		if(self.dataStore == undefined)
			self.dataStore = {};
		
		var newSearch = false;
		
		$("#"+prefix+"-none").addClass("hide");
		$("#"+prefix+"-progress").addClass("hide");
		$("#"+prefix+"-menu").removeClass("hide");
		$("#"+prefix+"-data").removeClass("hide");
	
		buildSort(prefix, data, self, callbacks);
		data = sortData(prefix, data, callbacks);
		
		if(data instanceof Array){
			if(data.length == 0){
				showNoDataMessage(prefix);
				return;
			}
			
			if($("#"+prefix+"-data .row").size() == 0){
				for(var i in self.dataStore){
					delete self.dataStore[i];
				}
			}
			
			for(var idx in data){
				var id;
				if(data[idx]["id"] != undefined){
					id = data[idx]["id"]
				}else{
					id = idx;
				}
				
				if(self.dataStore[id] == undefined){
					buildData(data[idx]["id"], data[idx], prefix, callbacks, self);
				}
				
				self.dataStore[id] = data[idx];
			}
		}else if(data instanceof Object){
			if(Object.keys(data).length == 0){
				showNoDataMessage(prefix);
				return;
			}
			
			if($("#"+prefix+"-data .row").size() == 0){
				for(var i in self.dataStore){
					delete self.dataStore[i];
				}
			}
			
			for(var i in data){
				self.dataStore[i] = data[i];
			}
			
			for(var id in data){
				buildData(id, data[idx], prefix, callbacks, self);
			}
		}else{
			
		}
		
		deselectAll(prefix);
		
		if(callbacks != undefined && callbacks["afterPopulate"]){
			callbacks["afterPopulate"]();
		}
	}
	
	/**
	 * The beginning function call to build a row, handles all the extra stuff like the checkbox
	 * and encryption status etc
	 * 
	 * @memberOf DataViewer
	 * @method buildData
	 * @private
	 * @param {String} id
	 * 			ID of data to be displayed in the row
	 * @param {EcRemoteLinkedData} datum
	 * 			The data to be displayed in the row
	 * @param {String} prefix
	 * 			DataViewer prefix that uniquifys the view 
	 * @param {Object} callbacks
	 * 			Callback object that can be passed in by other developer to handle events or modify display
	 * @param {DataViewer} self
	 * 			Reference to 'this' DataViewer because of JavaScript weirdness
	 */
	function buildData(id, datum, prefix, callbacks, self){
		var row;
		if($(".row[data-id='"+id+"']").size() == 0){
			row = $("<div class='row column' style='padding:7px 2px;padding-left:40px;'></div>");
		}else{
			return;
		}
		
		row.attr("data-id", id);
		row.attr("title", id);
		
		var dataSelect = $("<input type='checkbox' class='datum-select'></input>)");
		
		row.append(dataSelect);
		
		if(datum.isAny != undefined){
			if(datum.isAny(new EcEncryptedValue().getTypes())){
				var lockIcon = $("<i class='fa fa-lock fake-a' style='position: absolute;top: 33%;left: 37px;color: #2A3A2B;'></i>");
				row.append(lockIcon);
			}else if(EcEncryptedValue.encryptOnSave(datum.id) == true){
				var lockIcon = $("<i class='fa fa-unlock-alt fake-a' style='position: absolute;top: 33%;left: 37px;color: #2A3A2B;'></i>");
				row.append(lockIcon);
			}
		}
		
		
		row.on("click", ".datum-select", function(ev){
			if(callbacks != undefined && callbacks["clickDataSelect"] != undefined){
				callbacks["clickDataSelect"](ev, id, datum, prefix);
			}
			
			if($(".dataView").find(".datum-select:checked").size() == $("#"+prefix+"-data .row").size()){
				$(".toggleSelectData").text("Unselect All");
			}else{
				$(".toggleSelectData").text("Select All");
			}
			
			if($(ev.target).is(":checked")){
				$(ev.target).closest(".row").addClass("selected");
				//row.find(".data-id").slideDown();
				
				if(!AppController.identityController.owns(datum)){
					$("#"+prefix+"-menu").find(".fa-group").addClass("hide");
					var admin = AppController.serverController.getAdmin();
					if(!admin){
						$("#"+prefix+"-menu").find(".fa-trash").addClass("hide");
					}
				}
			}else{
				$(ev.target).closest(".row").removeClass("selected");
				//row.find(".data-id").slideUp();
				
				var selected = [];
				$("#"+prefix+"-data").find(".row.selected").each(function(i, obj){
					selected.push(self.dataStore[$(obj).attr("data-id")]);
				});
				
				if(!AppController.identityController.owns(datum)){
					var allOwned = true;
					for(var i in selected){
						var d = selected[i];
						if(!AppController.identityController.owns(d))
							allOwned = false;
					}
					if(allOwned){
						
						$("#"+prefix+"-menu").find(".fa-group").removeClass("hide");
						$("#"+prefix+"-menu").find(".fa-trash").removeClass("hide");
					}
				}
			}
			
			if($(ev.target).closest(".dataView").find(".datum-select").is(":checked")){
				$(ev.target).closest(".dataView").addClass("selecting");
				
				if(!$("#"+prefix+"-menu").is(":visible")){
					$("#"+prefix+"-menu").slideDown();
				}
				
				$(".dataViewMenu .dataViewSelected").text($(".dataView").find("[data-id] .datum-select:checked").size());
			}else{
				$(ev.target).closest(".dataView").removeClass("selecting");
				
				if($("#"+prefix+"-menu").is(":visible")){
					$("#"+prefix+"-menu").slideUp();
				}
			}
			
		});
		
		
		if(callbacks != undefined && callbacks["aggregateDataRows"] != undefined){
			callbacks["aggregateDataRows"](row, id, datum);
		}else{
			$("#"+prefix+"-data").append(row);
		}
		
		
		var dataDisplay;
		
		if(callbacks != undefined && callbacks["buildDataRow"] != undefined){
			dataDisplay = callbacks["buildDataRow"](row, id, datum);
			
			var rowInner = $(dataDisplay);
			
			row.append(rowInner);
		}else{
			dataDisplay = defaultBuildRow(row, id, datum, callbacks);
		}
		
		
		
		var rowToolbar = $("<div class='rowToolbar'></div>");
		if(callbacks != undefined && callbacks["buildRowToolbar"] != undefined){
			rowToolbar.append(callbacks["buildRowToolbar"](id, datum));
		}else{
			rowToolbar.append(defaultBuildRowToolbar(id, datum, callbacks));
		}
		
		row.append(rowToolbar)
		
		
	}
	
	/**
	 * Callback that is triggered when the delete button is pressed to confirm the user wanted to delete
	 * 
	 * @memberOf DataViewer
	 * @method confirmDeleteDataRow
	 * @private
	 * @param {jQueryObject} element
	 * 			DOM element clicked on to cause the delete event to occure
	 * @param {EcRemoteLinkedData} datum
	 * 			The data corresponding to the row
	 * @param {Object} callbacks
	 * 			Callback object that can be passed in by other developer to handle events or modify display
	 */
	function confirmDeleteDataRow(element, datum, callbacks){
		if(callbacks != undefined && callbacks["clickDataDelete"] != undefined){
			callbacks["clickDataDelete"](datum);
		}else{
			var id;
			if(datum.name != undefined)
				id = datum.name;
			else
				id = datum.id;
				
			var msg = "Are you sure you want to delete <em>"+id+"</em>?"
			
			ModalManager.showModal(new ConfirmModal(function(){
				EcRepository._delete(datum, function(){
					ModalManager.hideModal();
					
					var row = element.closest(".row");
					var siblings = row.siblings(".row")
					
					row.remove();
					
					if(siblings.size() == 0){
						showNoDataMessage(prefix);
						$(".toggleSelectData").addClass("hide");
					}
				}, function(err){
					ModalManager.getCurrentModal().displayAlertMessage(err);
				})
			}, msg))
		}
	}
	
	/**
	 * Default Method to build a row toolbar for the DataViewer
	 * 
	 * @memberOf DataViewer
	 * @method defaultBuildRowToolbar
	 * @private
	 * @param {String} id
	 * 			ID of the data displayed in the row
	 * @param {EcRemoteLinkedData} datum
	 * 			The data displayed in the row
	 * @param {Object} callbacks
	 * 			Callback object that can be passed in by other developer to handle events or modify display
	 */
	function defaultBuildRowToolbar(id, datum, callbacks){
		var html = "<div style='padding-top:5px;'>" +
					"<i class='fa fa-trash dataViewBtn' title='Delete' style='margin-right:1rem;'></i>" +
					"<i class='fa fa-group dataViewBtn' title='Manage Permissions' style='margin-right:1rem;'></i>" +
					"<i class='fa fa-clone dataViewBtn' title='Copy Resource' style='margin-right:1rem;'></i>" +
					"<i class='fa fa-pencil dataViewBtn' title='Edit Resource' style='margin-right:1rem;'></i>"; +
				"</div>";
		
		var element = $(html);
		
		if(callbacks != undefined && callbacks["moreRowTools"]){
			var more = $("<i class='fa fa-ellipsis-v dataViewBtn' title='Additional Actions' style='margin-right:1rem;'></i>");
			
			var list = $("<ul class='contextMenu' style='list-style:none;margin:0px;'></ul>");
			
			var moreActions = callbacks["moreRowTools"](datum);
			
			if(moreActions != undefined && moreActions != "" && $(moreActions).size() > 0){
				element.append(more);
				
				element.find(".fa-ellipsis-v").click(function(ev){
					ev.preventDefault();
					
					list.append(moreActions);
					
					list.css("left", ev.clientX);
					list.css("top", ev.clientY);
					
					$("body").append(list);
				});
			}
			
		}
		
		if(!AppController.identityController.owns(datum)){
			element.find(".fa-group").remove();
			
			// TODO: Figure out admin user stuff
			var adminUser = AppController.serverController.getAdmin();
			if(!adminUser){
				element.find(".fa-trash").remove();
			}else{
				element.find(".fa-trash").click(function(){
					confirmDeleteDataRow(element, datum, callbacks);
				});
			}
		}else{
			element.find(".fa-group").click(function(){
				ModalManager.showModal(new AdvancedPermissionsModal(datum, function(data){
					EcRepository.save(data, function(){
						ModalManager.hideModal();
						ScreenManager.reloadCurrentScreen();
					}, function(){
						ViewManager.getView("#advancedPermissionsMessageContainer").displayAlert("Error Saving Changed Permissions");
					})
				}));
			});
			
			element.find(".fa-trash").click(function(){
				confirmDeleteDataRow(element, datum, callbacks)
			});
		}
		
		if(!AppController.identityController.canEdit(datum)){
			element.find(".fa-pencil").remove();
		}else{
			element.find(".fa-pencil").click(function(ev){
				ev.preventDefault();
				if(callbacks != undefined && callbacks["clickDataEdit"] != undefined)
					callbacks["clickDataEdit"](datum);
				else	
					ScreenManager.changeScreen(new RepoViewScreen(datum));
			})
		}
		
		element.find(".fa-clone").click(function(ev){
			ev.preventDefault();
			ModalManager.showModal(new CopyResourceModal(datum, function(){
				ScreenManager.reloadCurrentScreen();
			}));
		});
		
		return element;
	}
	
	/**
	 * Default method to build a data row for the DataViewer
	 * 
	 * @memberOf DataViewer
	 * @method defaultBuildRow
	 * @private
	 * @param {jQueryObject} row
	 * 			row element on the screen to display the row in
	 * @param {String} id
	 * 			ID of the data  displayed in the row
	 * @param {EcRemoteLinkedData} datum
	 * 			The data to be displayed in the row
	 * @param {Object} callbacks
	 * 			Callback object that can be passed in by other developer to handle events or modify display
	 */
	function defaultBuildRow(row, id, datum, callbacks){
		
		row.append("<div class='small-6 columns'>" +
						"<a class='datum-name'></a>" +
						"<span class='datum-description'></span>" +
						"</div>" +
					"<div class='small-2 columns datum-type'></div>" +
					"<div class='small-4 columns datum-owner'></div>")
		
		var name;
		if(Array.isArray(datum["name"])){
			
		}else if(datum["name"] instanceof Object && datum["name"]["@value"] != undefined && datum["name"]["@value"] != ""){
			name = datum["name"]["@value"];
		}else if(datum["name"] != undefined && datum["name"] != ""){
			name = datum["name"];
		}else{
			name = id;
			row.find(".datum-name").css("font-size", "0.8rem");
		}			
		row.find(".datum-name").text(name);

		
		var desc;
		if(Array.isArray(datum["description"])){
			
		}else if(datum["description"] instanceof Object && datum["description"]["@value"] != undefined && datum["description"]["@value"] != ""){
			desc = " - "+datum["description"]["@value"];
		}else if(datum["description"] != undefined && datum["description"] != ""){
			desc = " - "+datum["description"];
		}else{
			desc = "";
		}
		row.find(".datum-description").text(desc);
		
		if(datum["type"] != undefined){
			var typeSplit = datum["type"].split("/");
			row.find(".datum-type").text(typeSplit[typeSplit.length-1]);
		}
		
		if(datum["owner"] != undefined && datum["owner"].length > 0){
			
			for(var i in datum["owner"]){
				var trimId = EcRemoteLinkedData.trimVersionFromUrl(id)
				var idEnd = trimId.split("/")[trimId.split("/").length-1];
				var elId = idEnd+"-owner-"+i;
				
				var ownerEl = $("<span id='"+elId+"'></span>")
				row.find(".datum-owner").append(ownerEl);
				
				ViewManager.showView(new IdentityDisplay(datum["owner"][i]), "#"+elId)
			}

		}else{
			row.find(".datum-owner").text("Public");
		}
		
		
		row.find("a.datum-name").click(function(ev){
			ev.preventDefault();
			if(callbacks != undefined && callbacks["clickName"] != undefined){
				callbacks["clickName"](id, datum);
			}else{
				ScreenManager.changeScreen(new RepoViewScreen(datum));
			}
		})
		
	}

	/**
	 * Default method to build the menu for the DataViewer
	 * 
	 * @memberOf DataViewer
	 * @method defaultBuildMenu
	 * @private
	 * @param {String} prefix
	 * 			DataViewer prefix that uniquifys the view 
	 * @param {DataViewer} self
	 * 			Reference to 'this' DataViewer because of JavaScript weirdness
	 * @param {Object} callbacks
	 * 			Callback object that can be passed in by other developer to handle events or modify display
	 */
	function defaultBuildMenu(prefix, self, callbacks){
		var html = "<div class='row column' style='position:relative;padding:7px 2px; font-weight:500; background-color: lightgrey;'>" +
					"<div class='small-3 columns'>" +
						"<span class='deselectData dataViewBtn'> <i class='fa fa-undo'></i> Unselect All</span>" +
					"</div>" +
					"<div class='small-5 columns' style='text-align:center'>" +
						"<span class='dataViewSelected'></span> selected" +
					"</div>" +
					"<div class='small-3 columns' style='text-align:right;padding-top:3px;'>" +
						"<i class='fa fa-trash dataViewBtn' title='Delete' style='margin-right:1rem;'></i>" +
						"<i class='fa fa-group dataViewBtn' title='Manage Permissions' style='margin-right:1rem;'></i>" +
						"<i class='fa fa-clone dataViewBtn' title='Copy Resource' style='margin-right:1rem;'></i>" +
						"<ul id='moreMenuBtns' class='dropdown menu align-right hide' style='display:inline-block;vertical-align:middle;text-align:left;' data-dropdown-menu data-disable-hover='true' data-click-open='true' data-close-on-click='true'>" +
							"<li id='moreMenuContainer'><span class='dataViewBtn' style='padding:0px 5px; display:inline-block;'><i class='fa fa-ellipsis-v'></i></span></li>" +
						"</ul>" +
					"</div>" +
				"</div>";
		
		var row = $(html);
		
		row.find(".deselectData").click(function(ev){
			deselectAll(prefix)
			$(".toggleSelectData").text("Select All");
		})
		
		row.find(".fa-clone").click(function(){
			var selected = [];
			$("#"+prefix+"-data").find(".row.selected").each(function(i, obj){
				selected.push(self.dataStore[$(obj).attr("data-id")]);
			});
			
			ModalManager.showModal(new CopyResourceModal(selected, function(){
				ScreenManager.reloadCurrentScreen();
			}))
		});
		
		row.find(".fa-trash").click(function(){
			var selected = [];
			$("#"+prefix+"-data").find(".row.selected").each(function(i, obj){
				selected.push(self.dataStore[$(obj).attr("data-id")]);
			});
			
			if(callbacks != undefined && callbacks["clickMenuDelete"] != undefined){
				callbacks["clickMenuDelete"](selected);
			}else{
				ModalManager.showModal(new ConfirmModal(function(){
					var deleted = 0;
					
					var runDelete = function(id, datum){
						EcRepository._delete(datum, function(){
							$("#"+prefix+"-data").find(".row[data-id='"+id+"']").remove();
							
							if($("#"+prefix+"-data").find(".row").size() == 0){
								showNoDataMessage(prefix);
								$(".toggleSelectData").addClass("hide");
							}
							
							deleted++;
							if(deleted == selected.length){
								ModalManager.hideModal();
								if($("#"+prefix+"-menu").is(":visible")){
									$("#"+prefix+"-menu").slideUp();
								}
							}
						}, function(err){
							ModalManager.getCurrentModal().displayAlertMessage(err);
						})
					}
					
					for(var i in selected){
						runDelete(selected[i].id, selected[i]);
					}
				}, "Are you sure you want to delete the selected resources?"));
			}
		});
		
		row.find(".fa-group").click(function(){
			var selected = [];
			$("#"+prefix+"-data").find(".row.selected").each(function(i, obj){
				selected.push(self.dataStore[$(obj).attr("data-id")]);
			});
			
			if(selected.length == 1)
				selected = selected[0];
			
			if(callbacks != undefined && callbacks["clickMenuPermissions"] != undefined){
				callbacks["clickMenuPermissions"](selected);
			}else{
				ModalManager.showModal(new AdvancedPermissionsModal(selected, function(data){
					if(! (data instanceof Array)){
						data = [data]
					}
						
					if(callbacks != undefined && callbacks["permissionsChanged"] != undefined){
						callbacks["permissionsChanged"](data);
					}else{
						var saved = 0;
						for(var i in data){
							EcRepository.save(data[i], function(){
								saved++;
								if(saved == data.length){
									ModalManager.hideModal();
									ScreenManager.reloadCurrentScreen();
								}
							}, function(){
								ViewManager.getView("#advancedPermissionsMessageContainer").displayAlert("Error Saving Changed Permissions");
							});
						}
					}
				}));
			}
		});
		
		if(callbacks != undefined && callbacks["moreMenuTools"]){
			var list = $("<ul class='menu contextMenu'></ul>");
			row.find("#moreMenuContainer").append(list);
			
			var moreActions = callbacks["moreMenuTools"](prefix);
			
			if(moreActions != undefined && moreActions != "" && $(moreActions).size() > 0){
				row.find("#moreMenuBtns").removeClass("hide");
				
				list.append(moreActions);
			}
			
		}
		
		return row;
	}
	
	/**
	 * Shows the 'No Data' message in the DataViewer
	 * 
	 * @memberOf DataViewer
	 * @method showNoDataMessage
	 * @private
	 * @param {String} prefix
	 * 			DataViewer prefix that uniquifys the view 
	 */
	function showNoDataMessage(prefix){
		$("#"+prefix+"-none").removeClass("hide");
		$("#"+prefix+"-progress").addClass("hide");
		$("#"+prefix+"-menu").addClass("hide");
		$("#"+prefix+"-data").addClass("hide");
		
		$(".selectData").addClass("hide");
	}
	
	/**
	 * Shows the 'Progress' message in the DataViewer
	 * 
	 * @memberOf DataViewer
	 * @method showProgressMessage
	 * @private
	 * @param {String} prefix
	 * 			DataViewer prefix that uniquifys the view 
	 */
	function showProgressMessage(prefix){
		$("#"+prefix+"-progress").removeClass("hide");
		//$("#"+prefix+"-none").addClass("hide");
		//$("#"+prefix+"-menu").addClass("hide");
		//$("#"+prefix+"-data").addClass("hide");
	}
	
	/**
	 * Triggers the deselection of all elements in the DataViewer right now
	 * 
	 * @memberOf DataViewer
	 * @method deselectAll
	 * @private
	 * @param {String} prefix
	 * 			DataViewer prefix that uniquifys the view 
	 */
	function deselectAll(prefix){
		$(".dataView").find(".row").removeClass("selected");
		
		$(".dataView").removeClass("selecting");
		
		$(".dataView .datum-select").attr("checked", false);
		
		if($("#"+prefix+"-menu").is(":visible")){
			$("#"+prefix+"-menu").slideUp();
		}
	}
	
	/**
	 * Returns the data objects corresponding to all of the selected elements in the DataViewer
	 * 
	 * @memberOf DataViewer
	 * @method getSelectedData
	 * @private
	 * @param {String} prefix
	 * 			DataViewer prefix that uniquifys the view 
	 * @param {DataViewer} self
	 * 			Reference to 'this' DataViewer because of JavaScript weirdness
	 */
	function getSelectedData(prefix, self){
		var selected = [];
		$("#"+prefix+"-data").find(".row.selected").each(function(i, obj){
			if(self.dataStore[$(obj).attr("data-id")] != undefined)
				selected.push(self.dataStore[$(obj).attr("data-id")]);
		});
		return selected;
	}
	
	/**
	 * Setup the DataViewer after the html has been loaded
	 * 		renames Id's to uniqify
	 * 		builds Menu
	 * 		sets up select all 
	 * 
	 * Need to call Populate to build the rows
	 * 
	 * @memberOf DataViewer
	 * @method display
	 * @param {String} containerId
	 * 			DOM ID of the element to display the DataViewer
	 */
	DataViewer.prototype.display = function(containerId){	
		var prefix = this.prefix;
		
		var callbacks = this.callbacks;
		
		var self = this;
					
		
		$(containerId).find("[id]").each(function(i, e){
			$(e).attr("id", prefix+"-"+$(e).attr("id"))
		});
		
		var menu;
		if(callbacks != undefined && callbacks["buildMenu"] != undefined){
			menu = callbacks["buildMenu"]();
		}else{
			menu = defaultBuildMenu(prefix, self, callbacks);
		}
		
		$("#"+prefix+"-menu").append(menu);
		$("#"+prefix+"-menu").foundation();
		
		
		$(".toggleSelectData").click(function(){
			if($(".dataView").find(".datum-select:checked").size() == $("#"+prefix+"-data .row").size()){
				deselectAll(prefix);
				$(".toggleSelectData").text("Select All");
			}else{
				$(".dataView").find(".row").addClass("selected");
				
				$(".dataView").addClass("selecting");
				
				$(".dataView .datum-select").prop("checked", true);
				
				$(".dataViewMenu .dataViewSelected").text($(".dataView").find("[data-id] .datum-select:checked").size());
				
				if(!$("#"+prefix+"-menu").is(":visible") && menu != undefined){
					$("#"+prefix+"-menu").slideDown();
				}
				
				$(".toggleSelectData").text("Unselect All");
				
				var allOwned = true;
				var allData = getSelectedData(prefix, self);
				for(var i in allData){
					if(!AppController.identityController.owns(allData[i])){
						allOwned = false;
						$("#"+prefix+"-menu").find(".fa-group").addClass("hide");
						$("#"+prefix+"-menu").find(".fa-trash").addClass("hide");
					}
				}
				if(allOwned){
					$("#"+prefix+"-menu").find(".fa-group").removeClass("hide");
					$("#"+prefix+"-menu").find(".fa-trash").removeClass("hide");
				}
				
				if(AppController.serverController.getAdmin()){
					$("#"+prefix+"-menu").find(".fa-trash").removeClass("hide");
				}
			}
		});
	}

	/**
	 * Clears the rows of data from the DOM and empty's the datastore member field
	 * 
	 * @memberOf DataViewer
	 * @method clear
	 */
	DataViewer.prototype.clear = function(){
		$("#"+this.prefix+"-data").find(".row").remove();
		this.dataStore = {};
	}
	
	/**
	 * Builds the rows of data in HTML
	 * 
	 * @memberOf DataViewer
	 * @method populate
	 * @param {Array || Map} data
	 * 			Data to add to the DataViewer
	 */
	DataViewer.prototype.populate = function(data){
		var dataSize;
		if(data instanceof Object){
			dataSize = Object.keys(data).length;
		}else if(data instanceof Array){
			dataSize = data.length;
		}
		
		if(dataSize > 0){
			populateData(data, this, this.prefix, this.callbacks);
		}else if($("#"+this.prefix+"-data").find(".row").size() == 0){
			showNoDataMessage(this.prefix);
		}
	}
	
	/**
	 * Shows the 'No Data' message in the DataViewer
	 * 
	 * @memberOf DataViewer
	 * @method showNoDataMessage
	 */
	DataViewer.prototype.showNoDataMessage = function(){
		showNoDataMessage(this.prefix);
	}
	
	/**
	 * Shows the 'Progress' message in the DataViewer
	 * 
	 * @memberOf DataViewer
	 * @method showProgressMessage
	 */
	DataViewer.prototype.showProgressMessage = function(){
		showProgressMessage(this.prefix);
	}
	
	/**
	 * Triggers the deselection of all elements in the DataViewer right now
	 * 
	 * @memberOf DataViewer
	 * @method deselectAll
	 */
	DataViewer.prototype.deselectAll = function(){
		deselectAll(this.prefix);
	}
	
	/**
	 * Returns the data objects corresponding to all of the selected elements in the DataViewer
	 * 
	 * @memberOf DataViewer
	 * @method getSelected
	 */
	DataViewer.prototype.getSelected = function(){
		return getSelectedData(this.prefix, this);
	}
	
	return DataViewer;
})(DataViewer);/**
 * Form for editing level details
 * 
 * @module cass.manager
 * @class EditLevelModal
 * 
 * @author devlin.junker@eduworks.com
 */
var EditLevelModal = (function(EditLevelModal){	
	
	/**
	 * Displays errors if they occur when trying to save level
	 * 
	 * @memberOf EditLevelModal
	 * @method saveLevelFail
	 * @private
	 * @param {String} err
	 * 			Error to display 
	 */
	function saveLevelFail(err){
		if(err == undefined)
			err = "Unable to Connect to Server to Save Level";
		
		ViewManager.getView("#editLevelError").displayAlert(err);
	}
	
	/**
	 * Displays errors if they occur during deleting the level
	 * 
	 * @memberOf EditLevelModal
	 * @method errorDeleting
	 * @private
	 * @param {String} err
	 * 			Error to display 
	 */
	function errorDeleting(err){
		if(err == undefined)
			err = "Unable to Connect to Server to Delete Level";
		
		ViewManager.getView("#editLevelError").displayAlert(err);
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf EditLevelModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	EditLevelModal.prototype.display = function(containerId)
	{
		var data = this.data;
		var modalCloseCallback = this.closeCallback;
		
			
		ViewManager.showView(new MessageContainer("editLevel"), "#editLevelError", function(){
			if(AppController.identityController.selectedIdentity == undefined && data.isAny(new EcCompetency().getTypes()))
			{
				ViewManager.getView("#editLevelError").displayWarning("You are Creating a Public Level, this level can be modified by anyone");
			}
		});
		
		$("#editLevelCancel").click(function(event){
			event.preventDefault();
			ModalManager.hideModal();
		});
		
		if(data.isAny(new EcCompetency().getTypes()))
		{
			if(AppController.identityController.selectedIdentity != undefined)
			{
				$("#editLevelOwnership").text("");
				
				var pem = AppController.identityController.selectedIdentity.ppk.toPk().toPem()
				
				ViewManager.showView(new IdentityDisplay(pem), "#editLevelOwnership");
	    		
	    		$("#editLevelAdvancedOwnership").removeClass("hide");
				$("#editLevelAdvancedOwnership").click(function(ev){
					var level = new EcLevel();
					level.name = $("#editLevelName").val();
					level.title = $("#editLevelTitle").val();
					level.description = $("#editLevelDescription").val();
					level.performance = $("#editLevelPerformance").val();
					
					var owners = $("#editLevelOwnership").children("span").map(function(idx, el){
						return $(el).find(".contactText").attr("title");
					})
					
					for(var i = 0; i < owners.length; i++){
						level.addOwner(EcPk.fromPem(owners[i]))
					}
					
					if(!$("#editLevelVisibilityRow").hasClass("hide")){
						EcEncryptedValue.encryptOnSave(level.id, true);
						var readers = $("#editLevelReaders").children().map(function(idx, el){
							return $(el).find(".contactText").attr("title");
						})
						
						for(var i = 0; i < readers.length; i++){
							level.addReader(EcPk.fromPem(readers[i]))
						}
					}

					ModalManager.showModal(new AdvancedPermissionsModal(level, function(permissionedLevel){
						ModalManager.showModal(new EditLevelModal(data, modalCloseCallback), function(){
							$("#editLevelName").val(permissionedLevel.name);
							$("#editLevelTitle").val(permissionedLevel.title);
							$("#editLevelDescription").val(permissionedLevel.description);
							$("#editLevelPerformance").val(permissionedLevel.performance);
							
							if(permissionedLevel.owner != undefined && permissionedLevel.owner.length > 0)
							{
								$("#editLevelOwnership").text("");
								
								for(var i = 0; i < permissionedLevel.owner.length; i++)
								{	
									if(i > 0)
						    			$("#editLevelOwnership").append(", ");
									
									var pem = permissionedLevel.owner[i];

									$("#editLevelOwnership").append("<span id='level-owner-"+i+"'></span>");
									
									ViewManager.showView(new IdentityDisplay(pem), "#level-owner-"+i);
									
								}
							}else{
								$("#editLevelOwnership").text("Public");
							}
							
							if(EcEncryptedValue.encryptOnSave(permissionedLevel.id)){
								$("#editLevelVisibilityRow").removeClass("hide");
								$("#editLevelReadersRow").removeClass("hide");
								
								if(permissionedLevel.reader != undefined && permissionedLevel.reader.length > 0)
								{
									$("#editLevelReaders").text("");
									$("#editLevelReaders").css("font-style", "normal");
									
									for(var i = 0; i < permissionedLevel.reader.length; i++)
									{	
										if(i > 0)
							    			$("#editLevelReaders").append(", ");
										
										var pem = permissionedLevel.reader[i];
										
										$("#editLevelReaders").append("<span id='level-reader-"+i+"'></span>");
										
										ViewManager.showView(new IdentityDisplay(pem), "#level-reader-"+i);   
									}
								}else{
									$("#editLevelReaders").text("None Added Yet");
								}
							}else{
								$("#editLevelVisibilityRow").addClass("hide");
								$("#editLevelReadersRow").addClass("hide");
								
							}
						})
					}))
				});
			}
			
			
			$("#editLevelDelete").remove();
			
			$("#editLevelSubmit").click(function(event){
				event.preventDefault();
				
				var level = new EcLevel();
				if(AppController.identityController.selectedIdentity != undefined){
					level.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
				}
				level.generateId(AppController.serverController.selectedServerUrl)
				level.name = $("#editLevelName").val();
				level.title = $("#editLevelTitle").val();
				level.description = $("#editLevelDescription").val();
				level.performance = $("#editLevelPerformance").val();
				level.competency = data.shortId();
				
				var owners = $("#editLevelOwnership").children("span").map(function(idx, el){
					return $(el).find(".contactText").attr("title");
				})
				
				for(var i = 0; i < owners.length; i++){
					level.addOwner(EcPk.fromPem(owners[i]))
				}
				
				if(!$("#editLevelVisibilityRow").hasClass("hide")){
					EcEncryptedValue.encryptOnSave(level.id, true);
					var readers = $("#editLevelReaders").children().map(function(idx, el){
						return $(el).find(".contactText").attr("title");
					})
					
					for(var i = 0; i < readers.length; i++){
						level.addReader(EcPk.fromPem(readers[i]))
					}
				}
				
				if(level.name == undefined || level.name == ""){
					ViewManager.getView("#editLevelError").displayAlert("Level Requires a Name to be Saved");
					return;
				}
				
				level.save(function(){
					if(modalCloseCallback != undefined)
						modalCloseCallback(level);
					
					ModalManager.hideModal();
				}, saveLevelFail);
			})
		}
		else if(data.isAny(new EcLevel().getTypes()))
		{
			$("#editLevelDelete").removeClass("hide");
			
			$("#editLevelSubmit").text("Save");
			
			$("#editLevelName").val(data.name);
			$("#editLevelTitle").val(data.title);
			$("#editLevelDescription").val(data.description);
			$("#editLevelPerformance").val(data.performance);
			
			if(EcEncryptedValue.encryptOnSave(data.id)){
				$("#editLevelVisibilityRow").removeClass("hide");
				$("#editLevelReadersRow").removeClass("hide");
				
				if(data.reader != undefined && data.reader.length > 0)
				{
					$("#editLevelReaders").text("");
					$("#editLevelReaders").css("font-style", "normal");
					
					for(var i = 0; i < data.reader.length; i++)
					{	
						if(i > 0)
			    			$("#editLevelReaders").append(", ");
						
						var pem = data.reader[i];
						
						$("#editLevelReaders").append("<span id='level-reader-"+i+"'></span>");
						
						ViewManager.showView(new IdentityDisplay(pem), "#level-reader-"+i);    
					}
				}else{
					$("#editLevelReaders").text("None Added Yet");
				}
			}
			
			if(data.owner != undefined && data.owner.length > 0)
			{
				$("#editLevelOwnership").text("");
				
				for(var i = 0; i < data.owner.length; i++)
				{
					if(i > 0)
		    			$("#editLevelOwnership").append(", ");
					
					var pem = data.owner[i];
					
					$("#editLevelOwnership").append("<span id='level-owner-"+i+"'></span>");
					
					ViewManager.showView(new IdentityDisplay(pem), "#level-owner-"+i);
				}
			}
			
			var canEdit = false;
			for(var index in EcIdentityManager.ids){
				var pk = EcIdentityManager.ids[index].ppk.toPk()
				if(data.canEdit(pk))
					canEdit = true;
			}
			if(data.owner == undefined || data.owner.length == 0)
				canEdit = true;
			
			if(canEdit)
			{
				if(data.owner != undefined){
					$("#editLevelAdvancedOwnership").removeClass("hide");
					$("#editLevelAdvancedOwnership").click(function(ev){
						data.name = $("#editLevelName").val();
						data.title = $("#editLevelTitle").val();
						data.description = $("#editLevelDescription").val();
						data.performance = $("#editLevelPerformance").val();
						
						var owners = $("#editLevelOwnership").children("span").map(function(idx, el){
							return $(el).find(".contactText").attr("title");
						})
						
						for(var i = 0; i < owners.length; i++){
							data.addOwner(EcPk.fromPem(owners[i]))
						}
						
						if(!$("#editLevelVisibilityRow").hasClass("hide")){
							EcEncryptedValue.encryptOnSave(data.id, true);
							var readers = $("#editLevelReaders").children().map(function(idx, el){
								return $(el).find(".contactText").attr("title");
							})
							
							for(var i = 0; i < readers.length; i++){
								data.addReader(EcPk.fromPem(readers[i]))
							}
						}
						
						ModalManager.showModal(new AdvancedPermissionsModal(data, function(permissionedLevel){
							if(EcEncryptedValue.encryptOnSave(permissionedLevel.id)){
								$("#editLevelVisibilityRow").removeClass("hide");
								$("#editLevelReadersRow").removeClass("hide");
								
								if(permissionedLevel.reader != undefined && permissionedLevel.reader.length > 0)
								{
									$("#editLevelReaders").text("");
									$("#editLevelReaders").css("font-style", "normal");
									
									for(var i = 0; i < permissionedLevel.reader.length; i++)
									{	
										if(i > 0)
											$("#editLevelReaders").append(", ");
										
										var pem = permissionedLevel.reader[i];

										$("#editLevelReaders").append("<span id='level-reader-"+i+"'></span>");
										
										ViewManager.showView(new IdentityDisplay(pem), "#level-reader-"+i);  
									}
								}else{
									$("#editLevelReaders").text("None Added Yet");
								}
							}else{
								$("#editLevelVisibilityRow").addClass("hide");
								$("#editLevelReadersRow").addClass("hide");
								
							}
							
							ModalManager.showModal(new EditLevelModal(permissionedLevel, modalCloseCallback))
						}));
					});
				}
				
				$("#editLevelModalTitle").text("Edit Level");
				
				$("#editLevelSubmit").click(function(event){
					event.preventDefault();
					
					data.name = $("#editLevelName").val();
					data.title = $("#editLevelTitle").val();
					data.description = $("#editLevelDescription").val();
					data.performance = $("#editLevelPerformance").val();
					
					var owners = $("#editLevelOwnership").children("span").map(function(idx, el){
						return $(el).find(".contactText").attr("title");
					})
					
					for(var i = 0; i < owners.length; i++){
						data.addOwner(EcPk.fromPem(owners[i]))
					}
					
					if(!$("#editLevelVisibilityRow").hasClass("hide")){
						EcEncryptedValue.encryptOnSave(data.id, true);
						var readers = $("#editLevelReaders").children().map(function(idx, el){
							return $(el).find(".contactText").attr("title");
						})
						
						for(var i = 0; i < readers.length; i++){
							data.addReader(EcPk.fromPem(readers[i]))
						}
					}
					
					if(data.name == undefined || data.name == ""){
						ViewManager.getView("#editLevelError").displayAlert("Level Requires a Name to be Saved");
						return;
					}
					
					var url = data.id;
					var split = url.split("\/");
					if (split[split.length-4] == "data") 
						split[split.length-1] = new Date().getTime();
					data.id = split.join("/");
					
					data.save(function(level){
						if(modalCloseCallback != undefined)
							modalCloseCallback(data);
						
						ModalManager.hideModal();
					}, saveLevelFail);
				});
				
				$("#editLevelDelete").click(function(event){
					event.preventDefault();
					
					EcRepository._delete(data, function(){
						if(modalCloseCallback != undefined)
							modalCloseCallback(null);
						ModalManager.hideModal();
					}, errorDeleting);
				})
			}
			else
			{
				$("#editLevelModalTitle").text("View Level");
				
				$("#editLevelDelete").remove();
				$("#editLevelSubmit").remove();
				$("#editLevelCancel").remove();
				
				$("#editLevelName").attr("disabled", "disabled");
				$("#editLevelTitle").attr("disabled", "disabled");
				$("#editLevelDescription").attr("disabled", "disabled");
				$("#editLevelPerformance").attr("disabled", "disabled");
			}
		}
		else
		{
			ViewManager.getView("#editLevelError").displayAlert("Unrecognized Context For Level Modal");
			$("#editLevelName").attr("disabled", "disabled");
			$("#editLevelTitle").attr("disabled", "disabled");
			$("#editLevelDescription").attr("disabled", "disabled");
			$("#editLevelPerformance").attr("disabled", "disabled");
			
			$("#editLevelSubmit").click(function(event){
				event.preventDefault();
			});
		}
	}
	
	return EditLevelModal;
})(EditLevelModal);/**
 * Form for editing rollup rule details
 * 
 * @module cass.manager
 * @class EditRollupRuleModal
 * 
 * @author devlin.junker@eduworks.com
 */
var EditRollupRuleModal = (function (EditRollupRuleModal) {

	/**
	 * Displays errors if they occur when trying to save rollup rule
	 * 
	 * @memberOf EditLevelModal
	 * @method saveLevelFail
	 * @private
	 * @param {String} err
	 * 			Error to display 
	 */
    function saveRollupRuleFail(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Save RollupRule";

        ViewManager.getView("#editRollupRuleError").displayAlert(err);
    }

    /**
	 * Displays errors if they occur when trying to delete rollup rule
	 * 
	 * @memberOf EditLevelModal
	 * @method saveLevelFail
	 * @private
	 * @param {String} err
	 * 			Error to display 
	 */
    function errorDeleting(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Delete RollupRule";

        ViewManager.getView("#editRollupRuleError").displayAlert(err);
    }

    /**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf EditRollupRuleModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
    EditRollupRuleModal.prototype.display = function (containerId) {
        var data = this.data;
        var modalCloseCallback = this.closeCallback;

        ViewManager.showView(new MessageContainer("editRollupRule"), "#editRollupRuleError", function () {
            if (AppController.identityController.selectedIdentity == undefined && data.isAny(new EcCompetency().getTypes())) {
                ViewManager.getView("#editRollupRuleError").displayWarning("You are Creating a Public Rollup Rule, this rule can be modified by anyone");
            }
        });

        $("#editRollupRuleCancel").click(function (event) {
            event.preventDefault();
            ModalManager.hideModal();
        });

        if (data.isAny(new EcCompetency().getTypes())) {
            if (AppController.identityController.selectedIdentity != undefined) {
                $("#editRollupRuleOwnership").text("");

                var pem = AppController.identityController.selectedIdentity.ppk.toPk().toPem()

                
                $("#editRollupRuleOwnership").append("<span id='rule-owner-"+i+"'></span>");
				
				ViewManager.showView(new IdentityDisplay(pem), "#rule-owner-"+i);
                

                $("#editRollupRuleAdvancedOwnership").removeClass("hide");
                $("#editRollupRuleAdvancedOwnership").click(function (ev) {
                    var rollupRule = new EcRollupRule();
                    rollupRule.name = $("#editRollupRuleName").val();
                    rollupRule.rule = $("#editRollupRuleRule").val();
                    rollupRule.description = $("#editRollupRuleDescription").val();
                    rollupRule.outcome = $("#editRollupRuleOutcome").val();

                    var owners = $("#editRollupRuleOwnership").children("span").map(function (idx, el) {
                        return $(el).find(".contactText").attr("title");
                    })

                    for (var i = 0; i < owners.length; i++) {
                        rollupRule.addOwner(EcPk.fromPem(owners[i]))
                    }

                    if (!$("#editRollupRuleVisibilityRow").hasClass("hide")) {
                    	EcEncryptedValue.encryptOnSave(rollupRule.id, true);
                        var readers = $("#editRollupRuleReaders").children().map(function (idx, el) {
                            return $(el).find(".contactText").attr("title");
                        })

                        for (var i = 0; i < readers.length; i++) {
                            rollupRule.addReader(EcPk.fromPem(readers[i]))
                        }
                    }

                    ModalManager.showModal(new AdvancedPermissionsModal(rollupRule, function (permissionedRollupRule) {
                        ModalManager.showModal(new EditRollupRuleModal(data, modalCloseCallback), function () {
                            $("#editRollupRuleName").val(permissionedRollupRule.name);
                            $("#editRollupRuleRule").val(permissionedRollupRule.rule);
                            $("#editRollupRuleDescription").val(permissionedRollupRule.description);
                            $("#editRollupRuleOutcome").val(permissionedRollupRule.outcome);

                            if (permissionedRollupRule.owner != undefined && permissionedRollupRule.owner.length > 0) {
                                $("#editRollupRuleOwnership").text("");

                                for (var i = 0; i < permissionedRollupRule.owner.length; i++) {
                                    if (i > 0)
                                        $("#editRollupRuleOwnership").append(", ");

                                    var pem = permissionedRollupRule.owner[i];

                                    $("#editRollupRuleOwnership").append("<span id='rule-owner-"+i+"'></span>");
                    				
                    				ViewManager.showView(new IdentityDisplay(pem), "#rule-owner-"+i);
                                }
                            } else {
                                $("#editRollupRuleOwnership").text("Public");
                            }

                            if (EcEncryptedValue.encryptOnSave(permissionedRollupRule.id)) {
                                $("#editRollupRuleVisibilityRow").removeClass("hide");
                                $("#editRollupRuleReadersRow").removeClass("hide");

                                if (permissionedRollupRule.reader != undefined && permissionedRollupRule.reader.length > 0) {
                                    $("#editRollupRuleReaders").text("");
                                    $("#editRollupRuleReaders").css("font-style", "normal");

                                    for (var i = 0; i < permissionedRollupRule.reader.length; i++) {
                                        if (i > 0)
                                            $("#editRollupRuleReaders").append(", ");

                                        var pem = permissionedRollupRule.reader[i];

                                        $("#editRollupRuleReaders").append("<span id='rule-reader-"+i+"'></span>");
                        				
                        				ViewManager.showView(new IdentityDisplay(pem), "#rule-reader-"+i);
                                    }
                                } else {
                                    $("#editRollupRuleReaders").text("None Added Yet");
                                }
                            } else {
                                $("#editRollupRuleVisibilityRow").addClass("hide");
                                $("#editRollupRuleReadersRow").addClass("hide");

                            }
                        })
                    }))
                });
            }


            $("#editRollupRuleDelete").remove();

            $("#editRollupRuleSubmit").click(function (event) {
                event.preventDefault();

                var rollupRule = new EcRollupRule();
                if (AppController.identityController.selectedIdentity != undefined) {
                    rollupRule.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
                }
                rollupRule.generateId(AppController.serverController.selectedServerUrl)
                rollupRule.name = $("#editRollupRuleName").val();
                rollupRule.rule = $("#editRollupRuleRule").val();
                rollupRule.description = $("#editRollupRuleDescription").val();
                rollupRule.outcome = $("#editRollupRuleOutcome").val();
                rollupRule.competency = data.shortId();

                var owners = $("#editRollupRuleOwnership").children("span").map(function (idx, el) {
                    return $(el).find(".contactText").attr("title");
                })

                for (var i = 0; i < owners.length; i++) {
                    rollupRule.addOwner(EcPk.fromPem(owners[i]))
                }

                if (!$("#editRollupRuleVisibilityRow").hasClass("hide")) {
                	EcEncryptedValue.encryptOnSave(rollupRule.id, true);
                    var readers = $("#editRollupRuleReaders").children().map(function (idx, el) {
                        return $(el).find(".contactText").attr("title");
                    })

                    for (var i = 0; i < readers.length; i++) {
                        rollupRule.addReader(EcPk.fromPem(readers[i]))
                    }
                }

                if (rollupRule.name == undefined || rollupRule.name == "") {
                    ViewManager.getView("#editRollupRuleError").displayAlert("RollupRule Requires a Name to be Saved");
                    return;
                }

                rollupRule.save(function () {
                    if (modalCloseCallback != undefined)
                        modalCloseCallback(rollupRule);

                    ModalManager.hideModal();
                }, saveRollupRuleFail);
            })
        } else if (data.isAny(new EcRollupRule().getTypes())) {
            $("#editRollupRuleDelete").removeClass("hide");

            $("#editRollupRuleSubmit").text("Save");

            $("#editRollupRuleName").val(data.name);
            $("#editRollupRuleRule").val(data.rule);
            $("#editRollupRuleDescription").val(data.description);
            $("#editRollupRuleOutcome").val(data.outcome);

            if (EcEncryptedValue.encryptOnSave(data.id) == true) {
                $("#editRollupRuleVisibilityRow").removeClass("hide");
                $("#editRollupRuleReadersRow").removeClass("hide");

                if (data.reader != undefined && data.reader.length > 0) {
                    $("#editRollupRuleReaders").text("");
                    $("#editRollupRuleReaders").css("font-style", "normal");

                    for (var i = 0; i < data.reader.length; i++) {
                        if (i > 0)
                            $("#editRollupRuleReaders").append(", ");

                        var pem = data.reader[i];

                        $("#editRollupRuleReaders").append("<span id='rule-reader-"+i+"'></span>");
        				
        				ViewManager.showView(new IdentityDisplay(pem), "#rule-reader-"+i);
                    }
                } else {
                    $("#editRollupRuleReaders").text("None Added Yet");
                }
            }

            if (data.owner != undefined && data.owner.length > 0) {
                $("#editRollupRuleOwnership").text("");

                for (var i = 0; i < data.owner.length; i++) {
                    if (i > 0)
                        $("#editRollupRuleOwnership").append(", ");

                    var pem = data.owner[i];
                    
                    $("#editRollupRuleReaders").append("<span id='rule-owner-"+i+"'></span>");
    				
    				ViewManager.showView(new IdentityDisplay(pem), "#rule-owner-"+i);
                }
            }

            var canEdit = false;
            for (var index in EcIdentityManager.ids) {
                var pk = EcIdentityManager.ids[index].ppk.toPk()
                if (data.canEdit(pk))
                    canEdit = true;
            }
            if (data.owner == undefined || data.owner.length == 0)
                canEdit = true;

            if (canEdit) {
                if (data.owner != undefined) {
                    $("#editRollupRuleAdvancedOwnership").removeClass("hide");
                    $("#editRollupRuleAdvancedOwnership").click(function (ev) {
                        data.name = $("#editRollupRuleName").val();
                        data.rule = $("#editRollupRuleRule").val();
                        data.description = $("#editRollupRuleDescription").val();
                        data.outcome = $("#editRollupRuleOutcome").val();

                        var owners = $("#editRollupRuleOwnership").children("span").map(function (idx, el) {
                            return $(el).find(".contactText").attr("title");
                        })

                        for (var i = 0; i < owners.length; i++) {
                            data.addOwner(EcPk.fromPem(owners[i]))
                        }

                        if (!$("#editRollupRuleVisibilityRow").hasClass("hide")) {
                        	EcEncryptedValue.encryptOnSave(data.id, true);
                            var readers = $("#editRollupRuleReaders").children().map(function (idx, el) {
                                return $(el).find(".contactText").attr("title");
                            })

                            for (var i = 0; i < readers.length; i++) {
                                data.addReader(EcPk.fromPem(readers[i]))
                            }
                        }

                        ModalManager.showModal(new AdvancedPermissionsModal(data, function (permissionedRollupRule) {
                            if (EcEncryptedValue.encryptOnSave(permissionedRollupRule.id)) {
                                $("#editRollupRuleVisibilityRow").removeClass("hide");
                                $("#editRollupRuleReadersRow").removeClass("hide");

                                if (permissionedRollupRule.reader != undefined && permissionedRollupRule.reader.length > 0) {
                                    $("#editRollupRuleReaders").text("");
                                    $("#editRollupRuleReaders").css("font-style", "normal");

                                    for (var i = 0; i < permissionedRollupRule.reader.length; i++) {
                                        if(i > 0)
                                        	$("#editRollupRuleReaders").append(", ");
                                        
                                    	var pem = permissionedRollupRule.reader[i];

                                        $("#editRollupRuleReaders").append("<span id='rule-reader-"+i+"'></span>");
                        				
                        				ViewManager.showView(new IdentityDisplay(pem), "#rule-reader-"+i);
                                    }
                                } else {
                                    $("#editRollupRuleReaders").text("None Added Yet");
                                }
                            } else {
                                $("#editRollupRuleVisibilityRow").addClass("hide");
                                $("#editRollupRuleReadersRow").addClass("hide");

                            }

                            ModalManager.showModal(new EditRollupRuleModal(permissionedRollupRule, modalCloseCallback))
                        }));
                    });
                }

                $("#editRollupRuleModalTitle").text("Edit RollupRule");

                $("#editRollupRuleSubmit").click(function (event) {
                    event.preventDefault();

                    data.name = $("#editRollupRuleName").val();
                    data.rule = $("#editRollupRuleRule").val();
                    data.description = $("#editRollupRuleDescription").val();
                    data.outcome = $("#editRollupRuleOutcome").val();

                    var owners = $("#editRollupRuleOwnership").children("span").map(function (idx, el) {
                        return $(el).find(".contactText").attr("title");
                    })

                    for (var i = 0; i < owners.length; i++) {
                        data.addOwner(EcPk.fromPem(owners[i]))
                    }

                    if (!$("#editRollupRuleVisibilityRow").hasClass("hide")) {
                    	EcEncryptedValue.encryptOnSave(data.id, true);
                        var readers = $("#editRollupRuleReaders").children().map(function (idx, el) {
                            return $(el).find(".contactText").attr("title");
                        })

                        for (var i = 0; i < readers.length; i++) {
                            data.addReader(EcPk.fromPem(readers[i]))
                        }
                    }

                    if (data.name == undefined || data.name == "") {
                        ViewManager.getView("#editRollupRuleError").displayAlert("RollupRule Requires a Name to be Saved");
                        return;
                    }

                    var url = data.id;
                    var split = url.split("\/");
                    if (split[split.length - 4] == "data")
                        split[split.length - 1] = new Date().getTime();
                    data.id = split.join("/");

                    data.save(data, function (rollupRule) {
                        if (modalCloseCallback != undefined)
                            modalCloseCallback(data);

                        ModalManager.hideModal();
                    }, saveRollupRuleFail);
                });

                $("#editRollupRuleDelete").click(function (event) {
                    event.preventDefault();

                    EcRepository._delete(data, function () {
                        if (modalCloseCallback != undefined)
                            modalCloseCallback(null);
                        ModalManager.hideModal();
                    }, errorDeleting);
                })
            } else {
                $("#editRollupRuleModalTitle").text("View RollupRule");

                $("#editRollupRuleDelete").remove();
                $("#editRollupRuleSubmit").remove();
                $("#editRollupRuleCancel").remove();

                $("#editRollupRuleName").attr("disabled", "disabled");
                $("#editRollupRuleRule").attr("disabled", "disabled");
                $("#editRollupRuleDescription").attr("disabled", "disabled");
                $("#editRollupRuleOutcome").attr("disabled", "disabled");
            }
        } else {
            ViewManager.getView("#editRollupRuleError").displayAlert("Unrecognized Context For RollupRule Modal");
            $("#editRollupRuleName").attr("disabled", "disabled");
            $("#editRollupRuleRule").attr("disabled", "disabled");
            $("#editRollupRuleDescription").attr("disabled", "disabled");
            $("#editRollupRuleOutcome").attr("disabled", "disabled");

            $("#editRollupRuleSubmit").click(function (event) {
                event.preventDefault();
            });
        }



    }

    return EditRollupRuleModal;
})(EditRollupRuleModal);
/**
 * Generic Modal for a confirm interaction, displays a message and 
 * waits for the user to select confirm, then triggers the confirm 
 * callback
 * 
 * @module cass.manager
 * @class EncryptOptionsModal
 * 
 * @author devlin.junker@eduworks.com
 */
var EncryptOptionsModal = (function(EncryptOptionsModal){	
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf EncryptOptionsModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	EncryptOptionsModal.prototype.display = function(containerId)
	{
		var callback = this.callback;
		
		ViewManager.showView(new MessageContainer("encryptOptions"), "#encryptOptionsMessageContainer");
		
		var showName = false;
		var showType = false;
		
		ViewManager.showView(new Switch(function(){
			showName = ViewManager.getView("#showName").isChecked()
		}, false, "showEncryptedName"), "#showName");
			
		ViewManager.showView(new Switch(function(){
			showType = ViewManager.getView("#showType").isChecked();
		}, false, "showEncryptedType"), "#showType");
		
		
		$("#confirmBtn").click(function(event){
			callback({
				type: showType,
				name: showName
			});
		});
		
		$("#cancelBtn").click(function(event){
			ModalManager.hideModal();
		});
		
	}
	
	return EncryptOptionsModal;
})(EncryptOptionsModal);/**
 * Modal for viewing evidence details
 * 
 * @module cass.manager
 * @class EvidenceViewModal
 * 
 * @author devlin.junker@eduworks.com
 */
var EvidenceViewModal = (function(EvidenceViewModal){	
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf EvidenceViewModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	EvidenceViewModal.prototype.display = function(containerId)
	{
		var evidence = this.evidence;
		
		ViewManager.showView(new MessageContainer("viewEvidence"), "#viewEvidenceMessageContainer", function(){
			if(evidence.length == 0){
				ViewManager.getView("#viewEvidenceMessageContainer").displayAlert("No Evidences Available to Display");
			}
		});
		
		$("#viewEvidenceCloseBtn").click(function(event){
			event.preventDefault();
			ModalManager.hideModal();
		});
		
		
		for(var i in evidence){
			var ev = evidence[i];
			
			if(ev.startsWith("http") || ev.startsWith("www")){
				var a = $("<a></a>");
				a.attr("href", ev);
				a.text(ev);
				
				var li = $("<li></li>");
				li.append(a);
				
				$("#evidenceList").append(li);
			}else{
				var li = $("<li></li>");
				li.text(ev);
				$("#evidenceList").append(li);
			}
		}
		
	}
	
	return EvidenceViewModal;
})(EvidenceViewModal);/**
 * Screen showing of the capabilities of the Repository for saving and encrypitng data
 * 
 * @module cass.manager
 * @class FileManagerScreen
 * 
 * @uthor devlin.junker@eduworks.com
 */
FileManagerScreen = (function(FileManagerScreen){
	
	/**
	 * Displays an error that occurs during upload
	 * 
	 * @memberOf FileManagerScreen
	 * @method uploadFailed
	 * @private
	 * @param {String} err
	 * 			Error message to display
	 */
	function uploadFailed(err)
	{
		if(err == undefined)
			err = "Unable to Connect to Server for Upload";
		ViewManager.getView("#fileManagerMessageContainer").displayAlert(err, "uploadFail");
	}
	
	/**
	 * Displays an error that occurs during download
	 * 
	 * @memberOf FileManagerScreen
	 * @method searchFailed
	 * @private
	 * @param {String} err
	 * 			Error message to display
	 */
	function downloadFailed(err)
	{
		if(err == undefined)
			err = "Unable to Connect to Server for Download";
		ViewManager.getView("#fileManagerMessageContainer").displayAlert(err, "downloadFail");
	}
	
	/**
	 * Displays an error that occurs during search
	 * 
	 * @memberOf FileManagerScreen
	 * @method searchFailed
	 * @private
	 * @param {String} err
	 * 			Error message to display
	 */
	function searchFailed(err)
	{
		if(err == undefined)
			err = "Unable to Connect to Server to Search";
		ViewManager.getView("#fileManagerMessageContainer").displayAlert(err, "searchFail");
	}
	
	
	var tile = '<div class="tile" tabindex="0" style="display:block"><div class="cube app document"><div class="front"><p class="title"></p></div><div class="back"><p class="status"></p><div class="actions"></div></div></div><a class="hotspot finger" title=""></a></div>';
	
	/**
	 * Displays the dom representing the results of the file search
	 * 
	 * @memberOf FileManagerScreen
	 * @method displayResult
	 * @private
	 * @param {EcRemoteLinkedData[]} obj
	 * 			Results from File Manager search
	 */
	function displayResult(obj)
	{
	    $("#fileManagerResults").html("");
	    for (var index in obj)
	    {
	        $("#fileManagerResults").append(tile);
	        var t = $("#fileManagerResults").children(".tile").last();
	        var name = obj[index]["name"];
	        t.find(".title").text(name);
	        t.attr("id",obj[index].id);
	    }
	    
	    $( "#fileManagerResults" ).on( "click", ".tile",function(){
	    	ViewManager.getView("#fileManagerMessageContainer").clearAlert("downloadFail");
	        
	    	EcFile.get($(this).attr("id"), function(file){
	        	file.download();
	        }, downloadFailed)
	    });
	}
	
	/**
	 * Handles getting search parameters from DOM and starting search
	 * 
	 * @memberOf FileManagerScreen
	 * @method fileSearch
	 * @private
	 */
	function fileSearch(){
		var query = $("#fileManagerSearchText").val();

		ViewManager.getView("#fileManagerMessageContainer").clearAlert("searchFail");
		
		var paramObj;
		if(fileManagerSearchesPublic){
			paramObj = null;
		}else{
			paramObj = {ownership:"owned"};
		}
		
		EcFile.search(AppController.serverController.getRepoInterface(), query, displayResult, searchFailed, paramObj);
	}

	/**
	 * Handles Starting the upload of files from the DOM
	 * 
	 * @memberOf FileManagerScreen
	 * @method startFileUpload
	 * @private
	 */
	function startFileUpload()
	{
	    var tile = '<div class="tile" tabindex="0" style="display:block"><div class="cube app document"><div class="front"><p class="title">Initializing...</p></div><div class="back"><p class="status"></p><div class="actions"></div></div></div><a class="hotspot finger" title=""></a></div>';
	    $("#fileManagerResults").append(tile);
	    if (files.length > 0)
	        if (fileManagerEncrypted)
	            setTimeout(function(){startFileUpload2(true);},100);
	        else
	            setTimeout(function(){startFileUpload2(false);},100);
	}

	/**
	 * Handles changing the DOM to indicate upload began
	 * 
	 * @memberOf FileManagerScreen
	 * @method startFileUpload2
	 * @private
	 * @param {boolean} encrypt
	 * 			Whether or not to encrypt the file uploaded
	 */
	function startFileUpload2(encrypt)
	{
	    var t = $("#fileManagerResults").children(".tile").last();
	    t.find(".title").text("Uploading...");
	    setTimeout(function(){startFileUpload3(encrypt);},100);
	}

	/**
	 * Handles actually creating the file based on DOM input and
	 * saving to the server
	 * 
	 * @memberOf FileManagerScreen
	 * @method startFileUpload3
	 * @private
	 * @param {boolean} encrypt
	 * 			Whether or not to encrypt the file uploaded
	 */
	function startFileUpload3(encrypt)
	{
	    var reader = new FileReader();
	    reader.onload = function(event) {
	        var file = EcFile.create(files[0].name,
	            		event.target.result.split(",")[1],
	            		event.target.result.split(";")[0].split(":")[1]);
	        file.generateId(AppController.serverController.getRepoInterface().selectedServer)
	    	
	        if(encrypt){
	        	EcEncryptedValue.encryptOnSave(file.id, true);
	        	file.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
	        }
	        	
	        
	        file.save(fileUploaded, uploadFailed);
	        
	    };
	    reader.readAsDataURL(files[0]);    
	}
	
	/**
	 * Handles displaying that the upload was successful
	 * 
	 * @memberOf FileManagerScreen
	 * @method fileUploaded
	 * @private
	 */
	function fileUploaded()
	{
		ViewManager.getView("#fileManagerMessageContainer").clearAlert("uploadFail");
		
	    var t = $("#fileManagerResults").children(".tile").last();
	    t.find(".title").text("Completed.");
	    files.shift();
	    if (files.length != 0)
	        startFileUpload();
	    else
	    	fileSearch();
	}
	
	var fileManagerEncrypted = true;
	var fileManagerSearchesPublic = true;

	var brdr = '2px dotted #0B85A1';
	var obj = $("#dragTarget");

	var files;
	var timeout;
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf FileManagerScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
	FileManagerScreen.prototype.display = function(containerId){
		ViewManager.showView(new MessageContainer("fileSearch"), "#fileManagerMessageContainer");
		
		fileSearch();

		$( "#fileManagerSearchText" ).on( "keyup", function(event){
			fileSearch();
		});
		
		$( "#fileManagerSearchBtn" ).click(fileSearch);
		
		$("#fileManagerEncrypted").change(function(){
		    fileManagerEncrypted = this.checked;
		    fileSearch();
		})
		$("#fileManagerPublic").change(function(){
		    fileManagerSearchesPublic = this.checked;
		    fileSearch();
		})
		
		$("#dragTarget").on('dragenter', function (e)
		{
			e.stopPropagation();
			e.preventDefault();
			brdr = '2px solid #0B85A1';
		});
		$("#dragTarget").on('dragover', function (e) 
		{
			e.stopPropagation();
		    e.preventDefault();
		    brdr = '2px solid #0B85A1';
			$("#dragTarget").css('border', brdr);
		});
		
		$("body").on('dragover', function (e) 
		{
			clearTimeout( timeout );
			timeout = setTimeout( function(){         
				$("#dragTarget").css('border', '');
			}, 200);
			$("#dragTarget").css('border', brdr);
		});
		$("#dragTarget").on('dragleave', function (e) 
		{
			e.stopPropagation();
			e.preventDefault();
			brdr = '2px dotted #0B85A1';
		});
		
		$("#dragTarget").on('drop', function (e) 
		{
			$(this).css('border', '');
			e.preventDefault();
			var fileContainer = e.originalEvent.dataTransfer.files;
			if (fileManagerEncrypted && AppController.identityController.selectedIdentity == null)
			{
				ViewManager.getView("#fileManagerMessageContainer").displayAlert("Cannot Encrypt, User Not Logged In or Identity Not Selected", "noIdentity");
				return;
			}else{
				ViewManager.getView("#fileManagerMessageContainer").clearAlert("noIdentity");
			}
			
			files = [];
			for (var index = 0;index < fileContainer.length;index++)
				files.push(fileContainer[index]);
			$("#fileManagerResults").html("");
			startFileUpload();
		});

	};
	
	return FileManagerScreen;
})(FileManagerScreen);/**
 * Screen with a form for editing Frameworks
 *
 * @module cass.manager
 * @class FrameworkEditScreen
 *
 * @author devlin.junker@eduworks.com
 */
FrameworkEditScreen = (function (FrameworkEditScreen) {

	var formDirty;

    /**
     * Displays all of the framework details in the form on the screen
     *
     * @memberOf FrameworkEditScreen
     * @method displayFramework
     * @private
     * @param {EcFramework} framework
     * 			Framework to display
     */
    function displayFramework(framework) {
        $("#frameworkEditId").val(framework.id);
        $("#frameworkEditName").val(framework.getName());
        $("#frameworkEditDescription").val(framework.getDescription());

        if (framework.owner != undefined && framework.owner.length != 0) {
            $("#frameworkEditOwner").html("");
            for (var i = 0; i < framework.owner.length; i++) {
                var pk = framework.owner[i];

                $("#frameworkEditOwner").append("<span id='framework-owner-"+i+"'></span>");

                ViewManager.showView(new IdentityDisplay(pk), "#framework-owner-"+i);

                if (i < framework.owner.length - 1)
                    $("#frameworkEditOwner").append(", ");
            }
            $("#frameworkEditOwnerAdvanced").removeClass("hide");
        } else {
            $("#frameworkEditOwner").text("Public")
            $("#frameworkEditOwnerAdvanced").addClass("hide");
        }

        if (EcEncryptedValue.encryptOnSave(framework.id)) {
            if ($("#privateRow").css("display") == "none")
                $("#privateRow").slideDown();

            if (framework.reader != undefined && framework.reader.length != 0) {
                $("#frameworkEditNoReaders").addClass("hide");
                $("#frameworkEditReaders").html("");
                for (var i = 0; i < framework.reader.length; i++) {
                    var pk = framework.reader[i];

                    $("#frameworkEditReaders").append("<span id='framework-reader-"+i+"'></span>");

                    ViewManager.showView(new IdentityDisplay(pk), "#framework-reader-"+i);

                    if (i < framework.reader.length - 1)
                        $("#frameworkEditReaders").append(", ");
                }
            } else {
                $("#frameworkEditNoReaders").removeClass("hide");
            }
        } else if ($("#privateRow").css("display") != "none") {
            $("#privateRow").slideUp();
        }


        $("#frameworkEditCompetencies option").not("#noCompetencies").remove();
        for (var idx in framework.competency) {
            EcCompetency.get(framework.competency[idx], addCompetency, errorRetrievingCompetency);
        }

        $("#frameworkEditRelations option").not("#noRelations").remove();
        for (var idx in framework.relation) {
            EcAlignment.get(framework.relation[idx], addRelation, errorRetrievingRelation)
        }

        $("#frameworkEditLevels option").not("#noLevels").remove();
        for (var idx in framework.level) {
            EcLevel.get(framework.level[idx], function (level) {
                addLevel(level);
            }, errorRetrievingLevel);
        }

        $("#frameworkEditRollupRules option").not("#noRollupRules").remove();
        for (var idx in framework.rollupRule) {
            EcRollupRule.get(framework.rollupRule[idx], function (rollupRule) {
                addRollupRule(rollupRule);
            }, errorRetrievingRollupRule);
        }
    }

    /**
     * Adds a competency to the competency list in the form
     *
     * @memberOf FrameworkEditScreen
     * @method addCompetency
     * @private
     * @param {EcCompetency} competency
     * 			Competency to include in the framework edit form
     */
    function addCompetency(competency) {
        $("#frameworkEditCompetencies #noCompetencies").hide();

        $("#frameworkEditCompetencies").removeAttr("disabled");
        $("#frameworkEditCompetencies").removeClass("empty");

        var option = $("<option></option>");
        option.attr("title", competency.id);
        option.attr("id", competency.id);
        option.attr("value", competency.id);
        option.text(competency.getName() + (competency.getDescription() == undefined ? "" : " - " + competency.getDescription()));
        $("#frameworkEditCompetencies").append(option);
        formDirty = true;
    }

    /**
     * Adds a relation to the relation list in the form
     *
     * @memberOf FrameworkEditScreen
     * @method addRelation
     * @private
     * @param {EcAlignment} relation
     * 			Relation to include in the framework edit form
     */
    function addRelation(relation) {
        $("#frameworkEditRelations #noRelations").hide();

        $("#frameworkEditRelations").removeAttr("disabled");
        $("#frameworkEditRelations").removeClass("empty");

        var sourceId = EcRemoteLinkedData.trimVersionFromUrl(relation.source).split("/");
        sourceId = sourceId[sourceId.length - 1] + "-relations";


        var competencyGroup = $("#frameworkEditRelations optgroup#" + sourceId);
        if (competencyGroup.size() == 0) {
            competencyGroup = $("<optgroup></optgroup>");
            competencyGroup.attr("id", sourceId);
            competencyGroup.attr("label", EcCompetency.getBlocking(relation.source).getName())
            $("#frameworkEditRelations").append(competencyGroup);
        }

        var basicId = relation.shortId().split("/");
        basicId = basicId[basicId.length - 1];

        var option = $("<option style='font-style:italic;'></option>");
        option.attr("id", basicId);
        option.val(relation.id);
        option.text(relation["relationType"] + " " + EcCompetency.getBlocking(relation.target).getName());

        competencyGroup.append(option)
        formDirty = true;
    }

    /**
     * Adds a level to the level list in the form
     *
     * @memberOf FrameworkEditScreen
     * @method addLevel
     * @private
     * @param {EcLevel} level
     * 			Level to include in level list
     */
    function addLevel(level) {
        $("#frameworkEditLevels #noLevels").hide();

        $("#frameworkEditLevels").removeAttr("disabled");
        $("#frameworkEditLevels").removeClass("empty");

        var competency = EcCompetency.getBlocking(level.competency);

        if (competency == undefined)
            competency = EcCompetency.getBlocking(EcRemoteLinkedData.trimVersionFromUrl(level.competency));

        var competencyId = competency.shortId().split("/");
        competencyId = competencyId[competencyId.length - 1] + "-levels";

        var competencyGroup = $("#frameworkEditLevels optgroup#" + competencyId);

        if (competencyGroup.size() == 0) {
            competencyGroup = $("<optgroup></optgroup>");
            competencyGroup.attr("id", competencyId);
            competencyGroup.attr("label", competency.getName());
            $("#frameworkEditLevels").append(competencyGroup);
        }

        var basicId = level.shortId().split("/");
        basicId = basicId[basicId.length - 1];

        var option = $("<option style='font-style:italic'></option>");
        option.attr("id", basicId);
        option.val(level.id);
        option.attr("title", (level.performance == undefined ? level.description : level.performance) + "'>" + level.getName() + " (Title: " + level.title + ")");
        option.text(level.getName());
        competencyGroup.append(option);

        formDirty = true;

    }

    /**
     * Adds a rollup rule to the rollup rule list in the form
     *
     * @memberOf FrameworkEditScreen
     * @method addRollupRule
     * @private
     * @param {EcRollupRule} rollupRule
     * 			Rollup Rule to include in the list
     */
    function addRollupRule(rollupRule) {
        $("#frameworkEditRollupRules #noRollupRules").hide();

        $("#frameworkEditRollupRules").removeAttr("disabled");
        $("#frameworkEditRollupRules").removeClass("empty");

        var competency = EcCompetency.getBlocking(rollupRule.competency);

        if (competency == undefined)
            competency = EcCompetency.getBlocking(EcRemoteLinkedData.trimVersionFromUrl(rollupRule.competency));

        var competencyId = competency.shortId().split("/");
        competencyId = competencyId[competencyId.length - 1] + "-rollupRules";

        var competencyGroup = $("#frameworkEditRollupRules optgroup#" + competencyId);

        if (competencyGroup.size() == 0) {
            competencyGroup = $("<optgroup></optgroup>");
            competencyGroup.attr("id", competencyId);
            competencyGroup.attr("label", competency.getName());
            $("#frameworkEditRollupRules").append(competencyGroup);
        }

        var basicId = rollupRule.shortId().split("/");
        basicId = basicId[basicId.length - 1];

        var option = $("<option style='font-style:italic'></option>");
        option.attr("id", basicId);
        option.val(rollupRule.id);
        option.attr("title", rollupRule.getDescription());
        option.text(rollupRule.getName());
        competencyGroup.append(option);

        formDirty = true;

    }

    /**
     * Handles triggering changes in the DOM to indicate the the framework was saved successfully
     *
     * @memberOf FrameworkEditScreen
     * @method saveSuccess
     * @private
     */
    function saveSuccess() {
        $("#datum").effect("highlight", {}, 1500);
        formDirty = false;
    }

    /**
     * Error Handling if problem retrieving framework to display on screen
     *
     * @memberOf FrameworkEditScreen
     * @method errorRetrieving
     * @private
     * @param {String} err
	 * 			Error message to display
     */
    function errorRetrieving(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Retrieve Competency for Editing";
        ViewManager.getView("#frameworkEditMessageContainer").displayAlert(err);
    }

    /**
     * Error Handling if problem saving framework
     *
     * @memberOf FrameworkEditScreen
     * @method errorSaving
     * @private
     * @param {String} err
	 * 			Error message to display
     */
    function errorSaving(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Save Competency";

        ViewManager.getView("#frameworkEditMessageContainer").displayAlert(err, "saveFail");
    }

    /**
     * Error Handling if problem retrieving competency in framework
     *
     * @memberOf FrameworkEditScreen
     * @method errorRetrievingCompetency
     * @private
     * @param {String} err
	 * 			Error message to display
     */
    function errorRetrievingCompetency(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Retrieve Competency";

        ViewManager.getView("#frameworkEditMessageContainer").displayAlert(err, "getCompetency");
    }

    /**
     * Error Handling if problem retrieving relation in framework
     *
     * @memberOf FrameworkEditScreen
     * @method errorRetrievingRelation
     * @private
     * @param {String} err
	 * 			Error message to display
     */
    function errorRetrievingRelation(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Retrieve Relation";

        ViewManager.getView("#frameworkEditMessageContainer").displayAlert(err, "getRelation");
    }

    /**
     * Error Handling if problem retrieving level in framework
     *
     * @memberOf FrameworkEditScreen
     * @method errorRetrievingLevel
     * @private
     * @param {String} err
	 * 			Error message to display
     */
    function errorRetrievingLevel(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Retrieve Level";

        ViewManager.getView("#frameworkEditMessageContainer").displayAlert(err, "getLevel");
    }

    /**
     * Error Handling if problem retrieving rollup rule in framework
     *
     * @memberOf FrameworkEditScreen
     * @method errorRetrievingRollupRule
     * @private
     * @param {String} err
	 * 			Error message to display
     */
    function errorRetrievingRollupRule(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Retrieve Rollup Rule";

        ViewManager.getView("#frameworkEditMessageContainer").displayAlert(err, "getRollupRule");
    }

    /**
     * Error Handling if problem searching for competencies to add to the framework
     *
     * @memberOf FrameworkEditScreen
     * @method errorSearchingCompetencies
     * @private
     * @param {String} err
	 * 			Error message to display
     */
    function errorSearchingCompetencies(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Search Competency";

        ViewManager.getView("#frameworkEditMessageContainer").displayAlert(err, "searchCompetencies");
    }

    /**
     * Error Handling if problem searching for relations to add to the framework
     *
     * @memberOf FrameworkEditScreen
     * @method errorSearchingRelations
     * @private
     * @param {String} err
	 * 			Error message to display
     */
    function errorSearchingRelations(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Search Relations";

        ViewManager.getView("#frameworkEditMessageContainer").displayAlert(err, "searchRelations");
    }

    /**
     * Error Handling if problem searching for levels to add to the framework
     *
     * @memberOf FrameworkEditScreen
     * @method errorSearchingLevels
     * @private
     * @param {String} err
	 * 			Error message to display
     */
    function errorSearchingLevels(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Search Levels";

        ViewManager.getView("#frameworkEditMessageContainer").displayAlert(err, "searchLevels");
    }

    /**
     * Error Handling if problem searching for rollup rules to add to the framework
     *
     * @memberOf FrameworkEditScreen
     * @method errorSearchingRollupRules
     * @private
     * @param {String} err
	 * 			Error message to display
     */
    function errorSearchingRollupRules(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Search Rollup Rules";

        ViewManager.getView("#frameworkEditMessageContainer").displayAlert(err, "searchRollupRules");
    }

    /**
     * Error Handling if problem removing competency from framework
     *
     * @memberOf FrameworkEditScreen
     * @method errorRemovingCompetency
     * @private
     * @param {String} err
	 * 			Error message to display
     */
    function errorRemovingCompetency(err) {
        ViewManager.getView("#frameworkEditMessageContainer").displayAlert(err, "removeCompetency");
    }

    var _setupLevelTypeahead = setupLevelTypeahead;

    /**
     * Handles setting up the level typeahead on screen setup
     *
     * @memberOf FrameworkEditScreen
     * @method setupLevelTypeahead
     * @private
     * @param {EcFramework} framework
     * 			Framework used to help determine which competencies to use during level search
     */
    function setupLevelTypeahead(framework) {
        $("#frameworkEditAddLevel").typeahead({
            hint: false,
            highlight: true,
            minLength: 2,
        }, {
            name: 'levels',
            source: function (q, syncCallback, asyncCallback) {
                var levels = {};

                var i = 0;
                for (var j = 0; j < framework.competency.length; j++) {
                    var id = framework.competency[j];
                    EcCompetency.get(id, function (competency) {
                        competency.levels(AppController.serverController.getRepoInterface(), undefined, errorSearchingLevels, function (results) {
                            i++;

                            for (var idx in results) {
                                levels[results[idx].id] = results[idx];
                            }

                            if (i == framework.competency.length) {
                                var ret = [];
                                for (var id in levels) {
                                    if (framework.level == undefined || framework.level.indexOf(id) == -1 && framework.level.indexOf(EcRemoteLinkedData.trimVersionFromUrl(id)) == -1) {
                                        ret.push(levels[id])
                                    }
                                }

                                asyncCallback(ret);
                            }
                        });
                    });
                }
            },
            async: true,
            display: function (data) {
                return EcCompetency.getBlocking(data.competency).getName() + " - " + data.getName() + " (Title: " + data["title"] + ")";
            },
            templates: {
                suggestion: function (data) {
                    return "<div class='typeaheadSuggestion'>" + EcCompetency.getBlocking(data.competency).getName() + " - <i>" + data["name"] + " (Title: " + data["title"] + ") <span class='label secondary'>"+data["id"]+"</span></i></div>";
                }
            }
        }).bind("typeahead:selected", function (ev, data) {
            $('#frameworkEditAddLevel').typeahead('val', "");
            framework.addLevel(data.id);
            addLevel(data);
        }).bind("typeahead:autocompleted", function (obj, data) {
            $('#frameworkEditAddLevel').typeahead('val', "");
            framework.addLevel(data.id);
            addLevel(data);
        });
    }

    var _setupRollupRuleTypeahead = setupRollupRuleTypeahead;

    /**
     * Handles setting up the rollup rule typeahead on screen setup
     *
     * @memberOf FrameworkEditScreen
     * @method setupRollupRuleTypeahead
     * @private
     * @param {EcFramework} framework
     * 			Framework used to help determine which competencies to use during rollup rules search
     */
    function setupRollupRuleTypeahead(framework) {
        $("#frameworkEditAddRollupRule").typeahead({
            hint: false,
            highlight: true,
            minLength: 2,
        }, {
            name: 'rollupRules',
            source: function (q, syncCallback, asyncCallback) {
                var rollupRules = {};

                var i = 0;
                for (var j = 0; j < framework.competency.length; j++) {
                    var id = framework.competency[j];
                    var competency = EcCompetency.getBlocking(id);
                    competency.rollupRules(AppController.serverController.getRepoInterface(), undefined, errorSearchingRollupRules, function (results) {
                        i++;

                        for (var idx in results) {
                            rollupRules[results[idx].id] = results[idx];
                        }

                        if (i == framework.competency.length) {
                            var ret = [];
                            for (var id in rollupRules) {
                                if (framework.rollupRule == undefined || framework.rollupRule.indexOf(id) == -1 && framework.rollupRule.indexOf(EcRemoteLinkedData.trimVersionFromUrl(id)) == -1) {
                                    ret.push(rollupRules[id])
                                }
                            }

                            asyncCallback(ret);
                        }
                    });
                }
            },
            async: true,
            display: function (data) {
                return EcCompetency.getBlocking(data.competency).getName() + " - " + data.name;
            },
            templates: {
                suggestion: function (data) {
                    return "<div class='typeaheadSuggestion'>" + EcCompetency.getBlocking(data.competency).getName() + " - <i>" + data["name"] + "</i> <span class='label secondary'>"+data["id"]+"</span></div>";
                }
            }
        }).bind("typeahead:selected", function (ev, data) {
            $('#frameworkEditAddRollupRule').typeahead('val', "");
            framework.addRollupRule(data.id);
            addRollupRule(data);
        }).bind("typeahead:autocompleted", function (obj, data) {
            $('#frameworkEditAddRollupRule').typeahead('val', "");
            framework.addRollupRule(data.id);
            addRollupRule(data);
        });
    }

    var _setupRelationTypehead = setupRelationTypeahead;

    /**
     * Handles setting up the relation typeahead on screen setup
     *
     * @memberOf FrameworkEditScreen
     * @method setupRelationTypeahead
     * @private
     * @param {EcFramework} framework
     * 			Framework used to help determine which competencies to use during relation search
     */
    function setupRelationTypeahead(framework) {
        $("#frameworkEditAddRelation").typeahead({
            hint: false,
            highlight: true,
            minLength: 2,
        }, {
            name: 'relations',
            source: function (q, syncCallback, asyncCallback) {
                var relations = {};

                var i = 0;
                EcAlignment.searchBySources(AppController.serverController.getRepoInterface(), framework.competency, function (results) {
                    asyncCallback(results);
                }, errorSearchingRelations);
            },
            async: true,
            display: function (data) {
                return EcCompetency.getBlocking(data.source).getName() + " " + AppSettings.relationTypes[data["relationType"]] + " " + EcCompetency.getBlocking(data.target).getName();
            },
            templates: {
                suggestion: function (data) {
                    return "<div class='typeaheadSuggestion'>" + EcCompetency.getBlocking(data.source).getName() + " <i>" + AppSettings.relationTypes[data["relationType"]] + "</i> " + EcCompetency.getBlocking(data.target).getName() + " <span class='label secondary'>"+data["id"]+"</span></div>";
                }
            }
        }).bind("typeahead:selected", function (ev, data) {
            $('#frameworkEditAddRelation').typeahead('val', "");
            framework.addRelation(data.id);
            addRelation(data);
        }).bind("typeahead:autocompleted", function (obj, data) {
            $('#frameworkEditAddRelation').typeahead('val', "");
            framework.addRelation(data.id);
            addRelation(data);
        });
    }

    /**
     * Handles setting up the competency typeahead on screen setup
     *
     * @memberOf FrameworkEditScreen
     * @method setupCompetencyTypeahead
     * @private
     * @param {EcFramework} framework
     * 			Framework used to help determine which competencies already exist in the framework
     */
    function setupCompetencyTypeahead(framework) {
        $("#frameworkEditAddCompetency").typeahead({
            hint: false,
            highlight: true,
            minLength: 2,
        }, {
            limit: 25,
            name: 'competencies',
            source: function (q, syncCallback, asyncCallback) {
                EcCompetency.search(AppController.serverController.getRepoInterface(), q, function (results) {
                    var filtered = [];

                    for (var idx in results) {
                        if (framework.competency == undefined || (framework.competency.indexOf(results[idx].id) == -1 && framework.competency.indexOf(results[idx].shortId()) == -1)) {
                            filtered.push(results[idx]);
                        }
                    }

                    asyncCallback(filtered);
                }, errorSearchingCompetencies);
            },
            async: true,
            display: function (data) {
                return data.getName();
            },
            templates: {
                suggestion: function (data) {
                    return "<div class='typeaheadSuggestion' title='" + data["id"] + "'>" + data.getName() + "<span class='label secondary'>"+data["id"]+"</span></div>";
                }
            }
        }).bind("typeahead:selected", function (ev, data) {
            $('#frameworkEditAddCompetency').typeahead('val', "");
            framework.addCompetency(data.id);
            addCompetency(data);

        }).bind("typeahead:autocompleted", function (obj, data) {
            $('#frameworkEditAddCompetency').typeahead('val', "");
            framework.addCompetency(data.id);
            addCompetency(data);

        });
    }

    var NEW_FRAMEWORK_NAME = "";

    /**
	 * Overridden display function, called once html partial is loaded into DOM
	 *
	 * @memberOf FrameworkEditScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
    FrameworkEditScreen.prototype.display = function (containerId, callback) {
        var data = this.data;

        formDirty = false;

        if (data != undefined){
        	if(data.id != undefined) {
	            ScreenManager.setScreenParameters({
	                "id": EcRemoteLinkedData.trimVersionFromUrl(data.id)
	            });
        	}else{
        		data = undefined
        	}
        }

        if (data == undefined ) {
            data = new EcFramework();
            data.generateId(AppController.serverController.getRepoInterface().selectedServer);
            data.name = NEW_FRAMEWORK_NAME;

            if (AppController.identityController.selectedIdentity != undefined) {
                data.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
            }

            $("#frameworkEditName").focus();
        }

        ViewManager.showView(new MessageContainer("frameworkEdit"), "#frameworkEditMessageContainer", function () {
            if (data.name == NEW_FRAMEWORK_NAME && AppController.identityController.selectedIdentity == undefined) {
                ViewManager.getView("#frameworkEditMessageContainer").displayWarning("You are Creating a Public Framework, this framework can be modified by anyone")
            }
        });

        $("#frameworkEditSearchBtn").attr("href", "#" + FrameworkSearchScreen.prototype.displayName);
        $("#frameworkEditSearchBtn").click(function (event) {
            event.preventDefault();
            if (data.name == NEW_FRAMEWORK_NAME) {
                ScreenManager.changeScreen(new FrameworkSearchScreen())
            } else {
                ScreenManager.changeScreen(new FrameworkSearchScreen(data));
            }

        });

        if (data.name == NEW_FRAMEWORK_NAME) {
            $("#frameworkEditCreateCompetency").hide();

        } else {
            $("#frameworkEditCreateCompetency").attr("href", "#" + FrameworkEditScreen.prototype.displayName + "?frameworkId=" + EcRemoteLinkedData.trimVersionFromUrl(data.id));
            $("#frameworkEditCreateCompetency").click(function (event) {
                event.preventDefault();
				if(data.name == NEW_FRAMEWORK_NAME)
				{
				}
				else
				{
					ModalManager.showModal(new ConfirmModal(function(){
	                    ScreenManager.changeScreen(new CompetencyEditScreen(null, data.id), function(){
	                    	ModalManager.hideModal();
	                    });
	                }, "Creating a new competency will navigate away from this screen.<br/><br/> Any unsaved changes will be lost"));
				}
            });
        }

        if (data.name == NEW_FRAMEWORK_NAME) {
            $("#frameworkEditViewBtn").hide();

        } else {
            $("#frameworkEditViewBtn").attr("href", "#" + FrameworkViewScreen.prototype.displayName);
            $("#frameworkEditViewBtn").click(function (event) {
                event.preventDefault();
                ScreenManager.changeScreen(new FrameworkViewScreen(data))
            });
        }

        $("#frameworkEditBtn").attr("href", "#" + FrameworkEditScreen.prototype.displayName);
        $("#frameworkEditBtn").click(function (event) {
            event.preventDefault();
        });

        $("#frameworkEditCancelBtn").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new FrameworkViewScreen(data))
        });

        if (data.name == NEW_FRAMEWORK_NAME) {
            $("#frameworkEditDeleteBtn").remove();
        } else {
            $("#frameworkEditDeleteBtn").click(function (event) {
                event.preventDefault();
                ModalManager.showModal(new ConfirmModal(function () {
                    data._delete(function () {
                        ScreenManager.changeScreen(new FrameworkSearchScreen());
                    }, function (err) {
                        if (err == undefined)
                            err = "Unable to connect to server to delete framework";
                        ViewManager.getView("#frameworkEditMessageContainer").displayAlert(err)
                    });
                    ModalManager.hideModal();
                }, "Are you sure you want to delete this framework?"));
            })
        }

        $("#frameworkEditSaveBtn").click(function (event) {
            event.preventDefault();

            data.setName($("#frameworkEditName").val());
            data.setDescription($("#frameworkEditDescription").val());
            data.id = $("#frameworkEditId").val();

            if (data.name != NEW_FRAMEWORK_NAME) {
                ViewManager.getView("#frameworkEditMessageContainer").clearAlert("saveFail");
                ViewManager.getView("#frameworkEditMessageContainer").clearAlert("defaultName");

                var savingData = new EcFramework();
                for (var key in data) {
                    savingData[key] = data[key];
                }

                savingData.save(function (str) {
                    data.id = savingData.id;
                    $("#frameworkEditId").val(data.id);
                    saveSuccess(str);
                }, errorSaving);
            } else {
                ViewManager.getView("#frameworkEditMessageContainer").displayAlert("Cannot Save Framework With Default Name", "defaultName");
            }
        });

        $("#frameworkEditSaveBtn").on("mousemove", function () {
            var url = $("#frameworkEditId").val();
            var split = url.split("\/");
            if (split[split.length - 4] == "data")
                split[split.length - 1] = new Date().getTime();
            $("#frameworkEditId").val(split.join("/"));
        });

        $("#importCompetenciesBtn").click(function () {
        	data.setName($("#frameworkEditName").val());

        	if(data.name == undefined || data.name.trim() == ""){
        		alert("Framework name cannot be empty");
        	}else{
						data.id = $("#frameworkEditId").val();
        		ModalManager.showModal(new ImportCompetenciesModal(data));
        	}
        });

				function checkId(id, suffix){
					EcRepository.get(id+suffix, function(data){
						suffix = suffix == "" ? 2 : suffix+1;
						checkId(id, suffix);
					}, function(){
						$("#frameworkEditId").val(id+suffix+"/"+new Date().getTime());
					})
				}

				$("#frameworkEditName").change(function(){
					var rawName = $("#frameworkEditName").val().toLowerCase();

					var name = rawName.replace(/[^a-zA-Z0-9-_]/g, '-');

					var splitId = EcRemoteLinkedData.trimVersionFromUrl($("#frameworkEditId").val()).split("/");
					splitId[splitId.length - 1] = name;

					checkId(splitId.join("/"), "");
				})

        $("#frameworkEditCompetencies").focus(function () {
            setTimeout(function () {
                if ($("#frameworkEditCompetencies").val() != undefined && $("#frameworkEditCompetencies").val() != "") {
                    $("#frameworkEditCompetencies").css("margin-bottom", "0rem");
                    $("#frameworkEditDeleteCompetency").slideDown();
                }
            }, 100)
        });
        $("#frameworkEditCompetencies").blur(function () {
            $("#frameworkEditDeleteCompetency").slideUp(function () {
                $("#frameworkEditCompetencies").css("margin-bottom", "1rem");
            });
        });
        $("#frameworkEditDeleteCompetency").click(function (ev) {
            ev.preventDefault();
            var ids = $("#frameworkEditCompetencies").val();

            for (var idx in ids) {
                var id = ids[idx];

                data.removeCompetency(id, function () {
                    $("#frameworkEditOwner").text("");
                    $("#frameworkEditCompetencies").html("");
                    $("#frameworkEditRelations").html("");
                    $("#frameworkEditLevels").html("");
                    $("#frameworkEditRollupRules").html("");

                    data.setName($("#frameworkEditName").val());
                    data.setDescription($("#frameworkEditDescription").val());

                    displayFramework(data);
                }, errorRemovingCompetency);
            }
            formDirty = true;
        });
        $("#frameworkEditRelations").focus(function () {
            setTimeout(function () {
                if ($("#frameworkEditRelations").val() != undefined && $("#frameworkEditRelations").val() != "") {
                    $("#frameworkEditRelations").css("margin-bottom", "0rem");
                    $("#frameworkEditDeleteRelation").slideDown();
                }
            }, 100);
        });
        $("#frameworkEditRelations").blur(function () {
            $("#frameworkEditDeleteRelation").slideUp(function () {
                $("#frameworkEditRelations").css("margin-bottom", "1rem");
            });
        });
        $("#frameworkEditDeleteRelation").click(function (ev) {
            ev.preventDefault();
            var ids = $("#frameworkEditRelations").val();

            for (var idx in ids) {
                var id = ids[idx];

                data.removeRelation(id);

                var basicId = EcRemoteLinkedData.trimVersionFromUrl(id).split("/");
                basicId = basicId[basicId.length - 1];
                $("#frameworkEditRelations #" + basicId).remove();
            }

            $("#frameworkEditRelations optgroup").each(function (idx, el) {
                if ($(el).children().size() == 0)
                    $(el).remove();
            });

            formDirty = true;
        });

        $("#frameworkEditLevels").focus(function () {
            setTimeout(function () {
                if ($("#frameworkEditLevels").val() != undefined && $("#frameworkEditLevels").val() != "") {
                    $("#frameworkEditLevels").css("margin-bottom", "0rem");
                    $("#frameworkEditDeleteLevel").slideDown();
                }
            }, 100);
        });
        $("#frameworkEditLevels").blur(function () {
            $("#frameworkEditDeleteLevel").slideUp(function () {
                $("#frameworkEditLevels").css("margin-bottom", "1rem");
            });
        });
        $("#frameworkEditDeleteLevel").click(function (ev) {
            ev.preventDefault();
            var ids = $("#frameworkEditLevels").val();

            for (var idx in ids) {
                var id = ids[idx];

                data.removeLevel(id);

                var basicId = EcRemoteLinkedData.trimVersionFromUrl(id).split("/");
                basicId = basicId[basicId.length - 1];
                $("#frameworkEditLevels #" + basicId).remove();
            }

            $("#frameworkEditLevels optgroup").each(function (idx, el) {
                if ($(el).children().size() == 0)
                    $(el).remove();
            })

            formDirty = true;
        });

        $("#frameworkEditRollupRules").focus(function () {
            setTimeout(function () {
                if ($("#frameworkEditRollupRules").val() != undefined && $("#frameworkEditRollupRules").val() != "") {
                    $("#frameworkEditRollupRules").css("margin-bottom", "0rem");
                    $("#frameworkEditDeleteRollupRule").slideDown();
                }
            }, 100);
        });
        $("#frameworkEditRollupRules").blur(function () {
            $("#frameworkEditDeleteRollupRule").slideUp(function () {
                $("#frameworkEditRollupRules").css("margin-bottom", "1rem");
            });
        });
        $("#frameworkEditDeleteRollupRule").click(function (ev) {
            ev.preventDefault();
            var ids = $("#frameworkEditRollupRules").val();

            for (var idx in ids) {
                var id = ids[idx];

                data.removeRollupRule(id);

                var basicId = EcRemoteLinkedData.trimVersionFromUrl(id).split("/");
                basicId = basicId[basicId.length - 1];
                $("#frameworkEditRollupRules #" + basicId).remove();
            }

            $("#frameworkEditRollupRules optgroup").each(function (idx, el) {
                if ($(el).children().size() == 0)
                    $(el).remove();
            });
        });

        $("#frameworkEditOwnerAdvanced").click(function (ev) {
            ev.preventDefault();

            data.setName($("#frameworkEditName").val());
            data.setDescription($("#frameworkEditDescription").val());

            var oldOwner = data.owner.slice(0);
            var oldReader = data.reader == undefined ? undefined :data.reader.slice(0);

            ModalManager.showModal(new AdvancedPermissionsModal(data, function (dataAfter) {
            	if(!AppController.identityController.owns(dataAfter)){
            		if(!confirm("Are you sure you want to remove your ownership from this framework? \n\n You will no longer be able to edit it if you do")){
            			data.owner = oldOwner
            			data.reader = oldReader;
            			ModalManager.hideModal();
            			return;
            		}
            	}

               	var changed = false;
               	if(oldOwner != undefined && data.owner != undefined && oldOwner.length != data.owner.length){
               		for (var idx in oldOwner){
               			if(data.owner.indexOf(oldOwner[idx]) == -1)
               				changed = true;
               		}
               		for (var idx in data.owner){
               			if(oldOwner.indexOf(data.owner[idx]) == -1)
               				changed = true;
               		}
               	}else if (oldOwner != undefined && data.owner == undefined){
               		changed = true;
               	}

               	if(oldReader == undefined && data.reader != undefined && data.reader.length > 0){
               		changed = true;
               	}else if(oldReader != undefined){
               		if(data.reader == undefined){
               			changed = true;
               		}else if(oldReader.length > 0 && (data.reader == undefined || data.reader.length == 0)){
            			changed = true;
            		}else if(oldReader.length == 0 && (data.reader != undefined && data.reader.length > 0)){
            			changed = true;
            		}else if(data.reader != undefined && oldReader.length != data.reader.length){
            			for (var idx in oldReader){
                   			if(data.reader.indexOf(oldReader[idx]) == -1)
                   				changed = true;
                   		}
                   		for (var idx in data.reader){
                   			if(oldReader.indexOf(data.reader[idx]) == -1)
                   				changed = true;
                   		}
            		}
               	}

            	if(changed){
                	data.owner = dataAfter.owner;
                    data.reader = dataAfter.reader;

                    displayFramework(data);

                    ModalManager.showModal(new PermissionPropagationModal(data, function(){
                    	displayFramework(data);
                    }));
               	}else{
               		ModalManager.hideModal();
               	}

            }))
        })


        if (data.name == NEW_FRAMEWORK_NAME) {
            displayFramework(data);
            setupCompetencyTypeahead(data);
            setupRelationTypeahead(data);
            setupLevelTypeahead(data);
            setupRollupRuleTypeahead(data);
        } else {
            EcFramework.get(data.id, function (framework) {
                data = framework;

                displayFramework(data);
                setupCompetencyTypeahead(data);
                setupRelationTypeahead(data);
                setupLevelTypeahead(data);
                setupRollupRuleTypeahead(data);
            }, errorRetrieving);
        }

    };

    /**
	 * Public function for adding a competency to the edit form while it is being displayed
	 *
	 * @memberOf FrameworkEditScreen
	 * @method addCompetency
	 * @param {EcCompetency} competency
	 * 			Competency to add to the framework
	 */
    FrameworkEditScreen.prototype.addCompetency = function (competency) {
        addCompetency(competency);
    }

    /**
	 * Public function for adding a relation to the edit form while it is being displayed
	 *
	 * @memberOf FrameworkEditScreen
	 * @method addRelation
	 * @param {EcAlignment} relation
	 * 			relation to add to the framework
	 */
    FrameworkEditScreen.prototype.addRelation = function (relation) {
        addRelation(relation);
    }

    /**
	 * Public function for showing that the framework has been saved by another view
	 *
	 * @memberOf FrameworkEditScreen
	 * @method showSave
	 */
    FrameworkEditScreen.prototype.showSave = function () {
    	saveSuccess();
    }

    /**
	 * Public function for showing error saving framework by another view
	 *
	 * @memberOf FrameworkEditScreen
	 * @method errorSaving
	 * @param {String} err
	 * 			Error Message to display
	 */
    FrameworkEditScreen.prototype.errorSaving = function (err) {
    	errorSaving(err)
    }

    /**
	 * Public function for showing successful action in another view (modal probably)
	 *
	 * @memberOf FrameworkEditScreen
	 * @method displaySuccess
	 * @param {String} msg
	 * 			Message to display
	 */
    FrameworkEditScreen.prototype.displaySuccess = function (msg) {
    	 if (msg != undefined)
    		 ViewManager.getView("#frameworkEditMessageContainer").displaySuccess(msg);
    }

    return FrameworkEditScreen;
})(FrameworkEditScreen);
/**
 * 
 * @class FrameworkList
 * @author devlin.junker@eduworks.com
 */
var FrameworkList = (function(FrameworkList){

	
	/**
	 * Builds the FrameworkList from a set of data (either a map from id to data, or an array)
	 * 
	 * @memberOf FrameworkList
	 * @method populateData
	 * @private
	 * @param {Array || Map} data	
	 * 			Set of data to be displayed
	 * @param {FrameworkList} self
	 * 			Reference to 'this' FrameworkList because of JavaScript weirdness
	 * @param {String} prefix
	 * 			FrameworkList prefix that uniquifys the view 
	 * @param {Object} callbacks
	 * 			Callback object that can be passed in by other developer to handle events or modify display
	 */
	function populateFramework(framework, containerId, callbacks){
		if(framework == undefined){
			//TODO: hide
			return;
		}
		
		
		$("#competencyList").html("");
		if(framework.competency != undefined){
			if(framework.competency.length > 7){
				$("#frameworkContentSearch").removeClass("hide");
			}
			
			for (var i = 0; i < framework.competency.length; i++) {
	            (function (i) {
	                timeout(function () {
	                    EcCompetency.get(framework.competency[i], function (competency) {
	                    	addCompetency(competency, containerId, callbacks);
	                    }, function(err){
	                    	
	                    })
	                })
	            })(i);
			}
		}
		
		if(framework.relation != undefined){
			for (var i = 0; i < framework.relation.length; i++) {
	            (function (i) {
	                timeout(function () {
	                	var retry;
	                	
	                    EcAlignment.get(framework.relation[i], function (rel) {
	                    	(retry = function(){
	                    		if($(".competency[data-id='"+rel.source+"']").size() > 0)
		                    		addRelation(rel, framework);
		                    	else
		                    		setTimeout(retry, 100);
	                    	})()
	                    	
	                    }, function(err){
	                    	
	                    })
	                })
	            })(i);
	            
			}
		}
		
		if(framework.level != undefined){
			for (var i = 0; i < framework.level.length; i++) {
	            (function (i) {
	                timeout(function () {
	                	var retry;
	                	
	                    EcLevel.get(framework.level[i], function (level) {
	                    	(retry = function(){
	                    		if($(".competency[data-id='"+level.competency+"']").size() > 0)
		                    		addLevel(level);
		                    	else
		                    		setTimeout(retry, 100);
	                    	})()
	                    }, function(err){
	                    	
	                    })
	                })
	            })(i);
			}
		}
		
		if(framework.rollupRule != undefined){
			for (var i = 0; i < framework.rollupRule.length; i++) {
	            (function (i) {
	                timeout(function () {
	                	var retry;
	                	
	                    EcRollupRule.get(framework.rollupRule[i], function (rule) {
	                    	(retry = function(){
	                    		if($(".competency[data-id='"+rule.competency+"']").size() > 0)
		                    		addRollup(rule);
		                    	else
		                    		setTimeout(retry, 100);
	                    	})()
	                    }, function(err){
	                    	
	                    })
	                })
	            })(i);
			}
		}
	}
	
	/**
	 * 
	 * 
	 * @memberOf FrameworkList
	 * @method addCompetency
	 * @private
	 */
	function addCompetency(competency, containerId, callbacks){
		var element = $("<li class='competency' style='margin-top: 0.5rem; cursor: pointer; padding: 0.25rem;'>"+
							"<div class='competencyDetails'>"+
								"<h6 class='competencyName' style='margin-bottom: 0px;'>"+
								"<a></a><br> <small class='competencyId'></small></h6>"+
								"<small class='competencyDescription' style='font-size: 0.75rem; margin-left: .5rem;'></small>" +
								"<div class='levelContainer hide' style='margin-left:1.25rem;'><small>" +
									"<strong>Levels:</strong> <span class='levelCount' style='font-size:0.7rem;'></span></small>"+
									"<ul class='competencyLevels' style='list-style: none; display:none;'></ul>" +
								"</div>"+
								"<div class='ruleContainer hide' style='margin-left:1.25rem;'><small>" +
									"<strong>Rules:</strong> <span class='ruleCount' style='font-size:0.7rem;'></span></small>"+
									"<ul class='rollupRules' style='list-style: none; display:none;'></ul>"+
								"</div>"+
								"<ul class='competencyRelations' style='list-style: none; '></ul>"+
							"</div></li>");
		
		element.attr("data-id", competency.shortId())
		
		if(competency.getName != undefined){
			element.find(".competencyName a").text(competency.getName());
		}else if(datum["name"] != undefined){
			element.find(".competencyName a").text(competency["name"]);
		}else{
			element.find(".competencyName a").html("<i>Unknown Competency Name</i>");
		}
	
		element.find(".competencyDescription").text(competency.description);
		
		element.find(".competencyId").text(competency.shortId())
		
		element.attr("data-comp-id", competency.shortId());
		
		element.find(".competencyName a").click(function(ev){
    		ev.preventDefault();
    		
    		ScreenManager.changeScreen(new CompetencyViewScreen(competency));
    		
    		return false;
    	});
		
		element.find('.ruleCount').click(function(ev){
			element.find('.rollupRules').slideToggle();
		});
		
		element.find('.levelCount').click(function(ev){
			element.find('.competencyLevels').slideToggle();
		});
		
		element.click(function(ev){
			if($(ev.target).hasClass("fake-a") || $(ev.target).is("a"))
				return;
			
			element.toggleClass("selected");
			$(containerId+" .competency").not(element).removeClass("selected");
			
			if(callbacks != undefined && callbacks["selected"] != undefined)
				callbacks["selected"](competency.shortId());
		})

		$("#frameworkList").append(element);
	}
	
	/**
	 * 
	 * 
	 * @memberOf FrameworkList
	 * @method addRelation
	 * @private
	 */
	function addRelation(relation, framework){
		var element = $("<li class='relation'><small>"+
							"<i class='source'></i> " +
							"<span class='relationType'></span> " +
							"<i class='target'></i>" +
						"</small></li>");
		
		var type = AppSettings.relationTypes[relation.relationType];
		if(type == undefined)
			type = " has a relationship with ";
		element.find(".relationType").text(type);
		element.find(".source").attr("data-id", relation.source);
		element.find(".source").attr("data-id", relation.target);
		
		var sourceEl = element;
		var targetEl = element.clone();
		
		EcCompetency.get(relation.source, function(comp){
			sourceEl.find(".source").text(comp.getName());
			targetEl.find(".source").text(comp.getName());
			
			if(framework.competency.indexOf(relation.source) == -1){
				element.find("small").append(" <i class='fa fa-small fa-external-link' style='font-size:0.65rem'></i> ");
			}
		});
		
		EcCompetency.get(relation.target, function(comp){
			sourceEl.find(".target").text(comp.getName());
			targetEl.find(".target").text(comp.getName());
			
			if(framework.competency.indexOf(relation.target) == -1){
				element.find("small").append(" <i class='fa fa-small fa-external-link' style='font-size:0.65rem'></i> ");
			}
		});
		
		
		sourceEl.find(".target").addClass("fake-a");
		targetEl.find(".source").addClass("fake-a");
		
		$("[data-id='"+relation.source+"'] .competencyRelations").append(sourceEl);

		$("[data-id='"+relation.target+"'] .competencyRelations").append(targetEl);
	}
	
	/**
	 * 
	 * 
	 * @memberOf FrameworkList
	 * @method addLevel
	 * @private
	 */
	function addLevel(level){
		var element = $("<li class='level'>" +
							"<a class='levelName'></a> " +
							"<small class='levelTitle'></small>" +
							"<p class='levelDescription' style='font-size: .65rem; margin-left: .4rem; margin-bottom:0.65rem; line-height:0.5rem;'></p>" +
						"</li>");
		
		element.find(".levelName").text(level.name);
		element.find(".levelTitle").text("("+level.title+")");
		
		if(level.description != undefined && level.description != "")
			element.find(".levelDescription").text(level.description);
		else
			element.find(".levelDescription").hide();
		
		element.find(".levelName").click(function(){
			ModalManager.showModal(new EditLevelModal(level))
		});
		
		$("[data-id='"+level.competency+"'] .levelContainer").removeClass('hide');
		
		$("[data-id='"+level.competency+"'] .competencyLevels").append(element);
		
		var count = $("[data-id='"+level.competency+"'] .competencyLevels").find(".level").size();
		$("[data-id='"+level.competency+"'] .levelCount").text("( "+count+" )");
	}
	
	/**
	 * 
	 * 
	 * @memberOf FrameworkList
	 * @method addRollup
	 * @private
	 */
	function addRollup(rule){
		var element = $("<li class='rollupRule'>" +
							"<a class='ruleName'></a> " +
							"<p class='ruleDescription' style='font-size: .65rem; margin-left: .4rem; margin-bottom:0.65rem; line-height:0.5rem;'></p>" +
						"</li>");
		
		element.find(".ruleName").text(rule.name);
		if(rule.description != undefined && rule.description != "")
			element.find(".ruleDescription").text(rule.description);
		else
			element.find(".ruleDescription").hide();
						
		element.find(".ruleName").click(function(){
			ModalManager.showModal(new EditRollupRuleModal(rule))
		});
		
		$("[data-id='"+rule.competency+"'] .ruleContainer").removeClass('hide');

		$("[data-id='"+rule.competency+"'] .rollupRules").append(element);
		
		var count = $("[data-id='"+rule.competency+"'] .rollupRules").find(".rollupRule").size();
		$("[data-id='"+rule.competency+"'] .ruleCount").text("( "+count+" )");
	}
	
	/**
	 * Shows the 'Progress' message in the FrameworkList
	 * 
	 * @memberOf FrameworkList
	 * @method showProgressMessage
	 * @private
	 * @param {String} prefix
	 * 			FrameworkList prefix that uniquifys the view 
	 */
	function showProgressMessage(prefix){
		$("#"+prefix+"-progress").removeClass("hide");
	}
	

	
	/**
	 * Setup the FrameworkList after the html has been loaded
	 * 		renames Id's to uniqify
	 * 		builds Menu
	 * 		sets up select all 
	 * 
	 * Need to call Populate to build the rows
	 * 
	 * @memberOf FrameworkList
	 * @method display
	 * @param {String} containerId
	 * 			DOM ID of the element to display the FrameworkList
	 */
	FrameworkList.prototype.display = function(containerId){			
		var self = this;
					
		var framework = this.data;
		
		populateFramework(framework, containerId, this.callbacks);
		
		$("#frameworkContentSearch").keyup(function(ev){
			var text = $("#frameworkContentSearch").val().toLowerCase();
			
			if(text.length > 3){
				$("#frameworkList .competency").each(function(idx, el){
					if($(el).find('.competencyName').text().toLowerCase().indexOf(text) == 0){
						$(el).remove();
						
						var first = $("#frameworkList .competency").first();
						if(first.text().toLowerCase().indexOf(text) == 0){
							if(first.find(".competencyRelations .relation").size() >= $(el).find(".competencyRelations .relation").size()){
								first.after(el);
							}else{
								$("#frameworkList").prepend(el);
							}
						}else{
							$("#frameworkList").prepend(el);
						}
						
						$(el).show();
					}else if($(el).text().toLowerCase().indexOf(text) == -1){
						$(el).hide();
					}else{
						$(el).show();
					}
				})
			}else{
				$("#frameworkList .competency").show();
			}
		})
		
	}

	
	/**
	 * Shows the 'Progress' message in the FrameworkList
	 * 
	 * @memberOf FrameworkList
	 * @method setSelected
	 */
	FrameworkList.prototype.setSelected = function(competencyId){
		var cb = this.callbacks;
		
		$(".competency").removeClass("selected");
		
		var compEl = $(".competency[data-id='"+competencyId+"']");
		
		compEl.addClass("selected");
		
		var compList = compEl.parent();
		compEl.remove();
		
		compList.prepend(compEl);
		compEl.click(function(ev){
			if($(ev.target).hasClass("fake-a") || $(ev.target).is("a"))
				return;
			
			compEl.toggleClass("selected");
			$(".competency").not(compEl).removeClass("selected");
			
			if(cb != undefined && cb["selected"] != undefined)
				cb["selected"](competencyId)
		})
		
		$(".competency").not(compEl).each(function(idx, el){
			if($(el).find("[data-id='"+competencyId+"']").size() > 0){
				var parent = $(el).parent();
				$(el).remove();
				compEl.after(el);
				
				$(el).click(function(ev){
					if($(ev.target).hasClass("fake-a") || $(ev.target).is("a"))
						return;
					
					$(el).toggleClass("selected");
					$(".competency").not(el).removeClass("selected");
					
					if(cb != undefined && cb["selected"] != undefined)
						cb["selected"]($(el).attr("data-id"));
				})
			}
		})
	}
	
	
	/**
	 * Shows the 'Progress' message in the FrameworkList
	 * 
	 * @memberOf FrameworkList
	 * @method deselect
	 */
	FrameworkList.prototype.deselectAll = function(){
		$(".competency").removeClass("selected");
	}

	
	return FrameworkList;
})(FrameworkList);/**
 * Screen that handles searching and displaying frameworks
 * 
 * @module cass.manager
 * @class FrameworkSearchScreen
 * 
 * @author devlin.junker@eduworks.com
 */
FrameworkSearchScreen = (function(FrameworkSearchScreen){
	
	var maxLength = 24;
	var searchHandle = null;
	
	/**
	 * Handles running the framework search with the parameters set in the DOM
	 * 
	 * @memberOf FrameworkSearchScreen
	 * @method runFrameworkSearch
	 * @private
	 * @param {int} start
	 * 			Where to start the search results at in the repository
	 */
	function runFrameworkSearch(start){
		var query = $("#frameworkSearchText").val();

		if (query == null || query == "")
			query = "*";
		if (searchHandle != null)
			clearTimeout(searchHandle);
		
		var ownership = $("#frameworkSearchOwnership").val();
		if(ownership == 1)
			ownership = "public";
		else if(ownership == 3)
			ownership = "owned";
		else if(ownership == 4)
			ownership = "me"
		else
			ownership = "all";
		
		var callback;
		if(start == undefined)
			callback = clearDisplayResults;
		else
			callback = displayResults;
		
		searchHandle = setTimeout(function() {
			var urlParams = {};
			if(window.location.hash.split("?").length > 1){
				var hashSplit = window.location.hash.split(/[?&]/)
				for(var i = 1; i < hashSplit.length; i++){
					var paramSplit = hashSplit[i].split("=");
					if(paramSplit.length == 2)
						urlParams[paramSplit[0]] = paramSplit[1]; 
				}
			}
			if(query != "*")
				urlParams.query = query;
			if(ownership != "all")
				urlParams.ownership = ownership;
			
			if(Object.keys(urlParams).length > 0){
				ScreenManager.setScreenParameters(urlParams);
				ScreenManager.getCurrentScreen().setParams(urlParams);
			}else{
				ScreenManager.setScreenParameters(null);
				ScreenManager.getCurrentScreen().clearParams();
			}
				
			
			ViewManager.getView("#frameworkSearchMessageContainer").clearAlert("searchFail");
			//ViewManager.getView("#frameworkSearchResults").showProgressMessage();
			ViewManager.getView("#frameworkSearchResults").deselectAll();
			
			var params = {};
			params.ownership = ownership;
			params.size = maxLength;
			params.start = start;
			
			EcFramework.search(AppController.serverController.getRepoInterface(), query, callback, errorSearching, params);
		}, 100);
	}
	
	/**
	 * Clears the currently displayed results before showing the results
	 * 
	 * @memberOf FrameworkSearchScreen
	 * @method clearDisplayResults
	 * @private
	 * @param {EcFramework[]} results
	 * 			Results of the framework search
	 */
	function clearDisplayResults(results)
	{
		ViewManager.getView("#frameworkSearchResults").clear();
		displayResults(results);
	}
	
	/**
	 * Displays the results of the framework search, appends them to the DataViewer table
	 * 
	 * @memberOf FrameworkSearchScreen
	 * @method displayResults
	 * @private
	 * @param {EcFramework[]} results
	 */
	function displayResults(results)
	{  
		ViewManager.getView("#menuContainer").showSortBasic();
		ViewManager.getView("#frameworkSearchResults").populate(results);
		
		if(results.length == 0 && $("#frameworkResults-data").first().children().size() == 0){
			ViewManager.getView("#frameworkSearchResults").showNoDataMessage();
		}else if(results.length < maxLength){
			$("#moreSearchResults").addClass("hide");
			//$(window).off("scroll", scrollSearchHandler);
		}else{
			$("#getMoreResults").click(function(){
				$("#getMoreResults").addClass("hide");
				$("#loadingMoreResults").removeClass("hide");
				runFrameworkSearch($("#frameworkResults-data").first().children().size());
			})
			
			$("#getMoreResults").removeClass("hide");
			$("#moreSearchResults").removeClass("hide");
			$("#loadingMoreResults").addClass("hide");
			
			//$(window).scroll(scrollSearchHandler)
		}
		
		searchHandle = null;
	}
	
//	function scrollSearchHandler(){
//		var resultDiv = $("#frameworkResults-data").first(); 
//		
//		if(resultDiv.size() == 0){
//			$(window).off("scroll", scrollSearchHandler);
//		}
//		else if(($(window).height() + document.body.scrollTop) > ($(document).height() - 30))
//		{
//			//$("#moreSearchResults").addClass("hide");
//			//$("#loadingMoreResults").removeClass("hide");
//			runFrameworkSearch(resultDiv.children().size());
//		}
//	}
	
	/**
	 * Handles displaying errors that occur during search
	 * 
	 * @memberOf FrameworkSearchScreen
	 * @method errorSearching
	 * @private
	 * @param {String} err
	 * 			Error message to display
	 */
	function errorSearching(err){
		if(err == undefined)
			err = "Unable to Connect to Server for Competency Search";
		
		ViewManager.getView("#frameworkSearchMessageContainer").displayAlert(err, "searchFail");
		
		ViewManager.getView("#frameworkSearchResults").showNoDataMessage();
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf FrameworkSearchScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
	FrameworkSearchScreen.prototype.display = function(containerId)
	{
		var lastViewed = this.lastViewed;
		
		var query = this.query;
		var ownership = this.ownership;
	
		ViewManager.showView(new MessageContainer("frameworkSearch"), "#frameworkSearchMessageContainer");
		
		ViewManager.showView(new DataViewer("frameworkResults", {
			sort:{},
			clickDataEdit:function(datum){
				ScreenManager.changeScreen(new FrameworkEditScreen(datum));
			},
			moreMenuTools:function(){
				var container = $("<div></div>");
				
				el = $("<li><span><i class='fa fa-download'></i> Export</span></li>");
				
				el.click(function(){
					var selected = ViewManager.getView("#frameworkSearchResults").getSelected();
					
					ModalManager.showModal(new RepoExportModal(selected));
				})
				
				container.append(el);
				
				return container.contents();
			},
			buildDataRow:function(row, id, datum){
				var comps = (datum.competency == undefined ? 0 : datum.competency.length);
				var rels = (datum.relation == undefined ? 0 : datum.relation.length)
				
				row.append("<div class='small-4 columns'><a class='datum-name'></a></div>" +
							"<div class='small-2 columns'>"+ comps + (comps == 1 ? " Competency" : " Competencies") +"</div>" +
							"<div class='small-2 columns'>"+ rels + (rels == 1 ? " Relationship" : " Relationships")+"</div>" +
							"<div class='small-4 columns datum-owner'></div>");
				
				var name;
				if(datum.getName != undefined && datum.getName() != ""){
					row.find(".datum-name").text(datum.getName());
				}else if(datum["name"] != undefined && datum["name"] != ""){
					row.find(".datum-name").text(datum["name"]);
				}else{
					row.find(".datum-name").html("<i>No Name</i>");
				}
					
				
				if(datum["owner"] != undefined && datum["owner"].length > 0){
					for(var i in datum["owner"]){
						var trimId = EcRemoteLinkedData.trimVersionFromUrl(id)
						var idEnd = trimId.split("/")[trimId.split("/").length-1];
						var elId = idEnd+"-owner-"+i;
						
						var ownerEl = $("<span id='"+elId+"'></span>")
						row.find(".datum-owner").append(ownerEl);
						
						ViewManager.showView(new IdentityDisplay(datum["owner"][i]), "#"+elId)
					}
				}else{
					row.find(".datum-owner").text("Public");
				}
				
				
				row.find(".datum-name").click(function(ev){
					ev.preventDefault();
					ScreenManager.changeScreen(new FrameworkViewScreen(datum));
				});
				
			}
		}), "#frameworkSearchResults");
		
		$("#frameworkSearchSubmit").click(function(event){
			event.preventDefault();
			runFrameworkSearch();
		});			
		$("#frameworkSearchOwnership").change(function(event){
			event.preventDefault();
			runFrameworkSearch();
		});

		
		$("#frameworkSearchText").keypress(function(e){
			var key = e.which;
			if(key == 13)  // the enter key code
			{
				runFrameworkSearch();
			}
		});
		
		if(query != null)
			$("#frameworkSearchText").val(query)
		
		if(AppController.loginController.getLoggedIn())
		{
			$("#frameworkSearchOwnership").attr("max", 4);
			$("#frameworkSearchOwnershipLoggedIn").removeClass("hide");
			$("#frameworkSearchOwnershipPublic").addClass("hide");
		}
		else
		{
			$("#frameworkSearchOwnershipLoggedIn").addClass("hide");
			$("#frameworkSearchOwnershipPublic").removeClass("hide");
		}
		
		if(ownership != null){
			if(ownership == "public")
				ownership = 1;
			else if(ownership == "owned")
				ownership = 3;
			else if(ownership == "me")
				ownership = 4
			
			$("#frameworkSearchOwnership").val(ownership);
		}
		
		runFrameworkSearch();
		
		ViewManager.getView("#menuContainer").showSortBasic();
	};
	
	/**
	 * Overridden onClose callback, called when leaving screen
	 * 
	 * @memberOf FrameworkSearchScreen
	 * @method onClose
	 */
	FrameworkSearchScreen.prototype.onClose = function(){
		ViewManager.getView("#menuContainer").hideSort();
	}
	
	FrameworkSearchScreen.prototype.sortByTimestamp = function(){
		$("#frameworkResults-sortSelect").val("timestamp");
		$("#frameworkResults-sortSelect").trigger("change");
	}
	
	FrameworkSearchScreen.prototype.sortByOwner = function(){
		$("#frameworkResults-sortSelect").val("owner");
		$("#frameworkResults-sortSelect").trigger("change");
	}
	
	FrameworkSearchScreen.prototype.filterPublic = function(){
		$("#frameworkSearchOwnership").val(1);
		runFrameworkSearch();
	}
	
	FrameworkSearchScreen.prototype.filterAll = function(){
		$("#frameworkSearchOwnership").val(2);
		runFrameworkSearch();
	}
	
	FrameworkSearchScreen.prototype.filterOwned = function(){
		$("#frameworkSearchOwnership").val(3);
		runFrameworkSearch();
	}
	
	FrameworkSearchScreen.prototype.filterOwnedByMe = function(){
		if(!AppController.loginController.getLoggedIn()){
			return;
		}
		
		$("#frameworkSearchOwnership").val(4);
		runFrameworkSearch();
	}
	
	/**
	 * Sets the search parameters on the view, so they can be reloaded if the page is
	 * 
	 * @memberOf FrameworkSearchScreen
	 * @method setParams
	 * @param {Object} params
	 */
	FrameworkSearchScreen.prototype.setParams = function(params)
	{
		if(params == undefined){
			this.clearParams();
			return;
		}
		
		this.query = params.query;
		this.ownership = params.ownership;
	}
	
	/**
	 * Handles getting search parameters from DOM and running
	 * basic Repository search
	 * 
	 * @memberOf FrameworkSearchScreen
	 * @method clearParams
	 */
	FrameworkSearchScreen.prototype.clearParams = function(){
		this.query = undefined;
		this.ownership = undefined;
	}
	
	return FrameworkSearchScreen;
})(FrameworkSearchScreen);/**
 * Screen that handles displaying Framework Details
 * 
 * @module cass.manager
 * @class FrameworkViewScreen
 * 
 * @author devlin.junker@eduworks.com
 */
FrameworkViewScreen = (function (FrameworkViewScreen) {
    
	EcRepository.caching = true;
	var springyHandleMap = {};
	
	var fonts = {
	    node: "bold 12px Arial",
	    edge: "bold 12px Arial"
	};
	
	/**
	 * Handles displaying relationship details in DOM
	 * 
	 * @memberOf FrameworkViewScreen
	 * @method buildFramework 
	 * @private
	 * @param {EcAlignment} framework 
	 * 			Relation to display
	 */
    function buildFramework(framework) {
    	var name;
		if(framework.getName != undefined){
			$("#frameworkViewerName").text(framework.getName());
		}else if(framework["name"] != undefined){
			$("#frameworkViewerName").text(framework["name"]);
		}else{
			$("#frameworkViewerName").html("<i>Unnamed Framework</i>");
		}
    		
    	$("#frameworkViewerId").text(framework.id);
    	
    	if(framework.getDescription != undefined){
			$("#frameworkViewerDescription").text(framework.getDescription());
		}else if(framework["description"] != undefined){
			$("#frameworkViewerDescription").text(framework["description"]);
		}
    	
    	cacheShowObjects(framework);
    }
    
    function cacheShowObjects(framework, callback){
    	if(framework.competency != undefined && framework.competency.length > 0){
    		$("#frameworkViewerContents").removeClass("hide");
    		$("#frameworkEmpty").addClass("hide");
    		$("#frameworkLoading").removeClass("hide");
        	AppController.serverController.getRepoInterface().precache(framework.competency, function(){
    			AppController.serverController.getRepoInterface().precache(framework.relation, function(){
    				AppController.serverController.getRepoInterface().precache(framework.level, function(){
    					$("#frameworkLoading").addClass("hide");
    					
    					var nodeSelectedFunction = displayVisualization(framework);
    		        	
    					ViewManager.showView(new FrameworkList(framework, {
    						selected:nodeSelectedFunction
    					}), "#frameworkContentsList");
    					
    					
    				});
    			});
    		});
    	}else{
    		$("#frameworkViewerContents").addClass("hide");
    		$("#frameworkEmpty").removeClass("hide");
    	}
    }

	FrameworkViewScreen.prototype.onClose = function(){
		if (window.springy != springyHandleMap[this.data.shortId()])
			return true;
		if (window.springy != null && window.springy !== undefined)
			window.springy.layout.stop();
		window.springy = null;
		return true;
	}

    /**
	 * Handles displaying relationship details in DOM
	 * 
	 * @memberOf FrameworkViewScreen
	 * @method displayVisualization 
	 * @private
	 */
    function displayVisualization(framework) {
        var canvas = $("#frameworkViewCanvas").get(0);
        var ctx = canvas.getContext("2d");

        var graph = new Springy.Graph();
        var nodes = {};

        canvas.width = $("#frameworkViewCanvas").parent().innerWidth() - 60;

        jQuery(function () {
            var springy = window.springy = $("#frameworkViewCanvas").springy({
                graph: graph,
                nodeSelected: function (node) {
                	
                    console.log('Node selected: ' + JSON.stringify(node.data));
                    
                    ViewManager.getView("#frameworkContentsList").setSelected(EcRemoteLinkedData.trimVersionFromUrl(node.data.id));
                },
                noNodeSelected: function(){
                	 ViewManager.getView("#frameworkContentsList").deselectAll();
                },
                stiffness:500,
                minEnergyThreshold:0.1
            });
            springyHandleMap[framework.shortId()] = springy;
        });

        //window.springs = new Springy.Layout.ForceDirected(graph, 0.0, new Springy.Vector(200.0, 100.0), 0.1);

        var fetches = 0;

        if (framework.competency != undefined)
            for (var i = 0; i < framework.competency.length; i++) {
                fetches++;
                (function (i) {
					EcCompetency.get(framework.competency[i], function (competency) {
						fetches--;

						var name = competency.getName()

						nodes[competency.shortId()] = graph.newNode({id:competency.id, "name":name, font: fonts.node, mass: 2});
						nodes[competency.shortId()].gravity = 0.0;
						nodes[competency.shortId()].fixed = true;
						if (framework.competency.length > 100)
							nodes[competency.shortId()].alwaysShowText = false;
						else if (framework.competency.length < 20)
							nodes[competency.shortId()].alwaysShowText = true;
						if (fetches == 0) {
							$("#frameworkViewCanvas").removeClass("hide");
							if (framework.relation != undefined)
								for (var i = 0; i < framework.relation.length; i++) {
									(function (i) {
										EcAlignment.get(framework.relation[i], function (rel) {
											var relation = new EcAlignment();
											relation.copyFrom(rel);
											if (relation.source !== undefined) {
												var shortSource = EcRemoteLinkedData.trimVersionFromUrl(relation.source);
												var shortTarget = EcRemoteLinkedData.trimVersionFromUrl(relation.target);
												if (nodes[shortSource] == null)
													return;
												if (nodes[shortTarget] == null)
													return;
													if (nodes[shortSource].alwaysShowText === undefined)
														nodes[shortSource].alwaysShowText = false;
												relation.font = fonts.edge;
												if (relation.relationType == "requires") {
													if (framework.competency.length < 100)
														nodes[shortSource].alwaysShowText = true;
													nodes[shortTarget].fixed = false;
													nodes[shortTarget].gravity += 1.0;
													relation.color = "#880000";
													graph.newEdge(nodes[shortSource], nodes[shortTarget], relation);
												}
												if (relation.relationType == "narrows") {
													if (framework.competency.length < 100)
														nodes[shortTarget].alwaysShowText = true;
													nodes[shortSource].fixed = false;
													nodes[shortSource].gravity += 1.0;
													relation.color = "#008800";
													graph.newEdge(nodes[shortTarget], nodes[shortSource], relation);
												}
											}
										}, function () {});
									})(i);
								}
						}
					}, function () {});
                })(i);
            }
        
        return function(competencyId){
        	window.springy.layout.eachNode(function(n, p){
        		if(EcRemoteLinkedData.trimVersionFromUrl(n.data.id) == competencyId){
        			window.springy.layout.selected = {
        		            node: n,
        		            point: p,
        		            distance: 0.0
        		        };
        		}
        	});
        }
    }

    
    function deleteFramework(framework){
    	ModalManager.showModal(new ConfirmModal(function(){
    		framework._delete(function(p1){
					ScreenManager.changeScreen(new FrameworkSearchScreen());
			}, function(err){
				if (err == null)
					err = "Unable to connect to server to delete framework";
				ViewManager.getView("#frameworkViewMessageContainer").displayAlert(err);
			});
			ModalManager.hideModal();
		}, "Are you sure you want to delete this framework?"));
    }
    
    /**
	 * Handles displaying error message when retrieving relationship for display
	 * 
	 * @memberOf FrameworkViewScreen
	 * @method displayRelation 
	 * @private
	 * @param {String} err 
	 * 			Error message to display
	 */
    function errorRetrieving(err) {
    	if (err == undefined)
			err = "Unable to Connect to Server to Retrieve Framework";

    	ViewManager.getView("#frameworkViewMessageContainer").displayAlert(err, "getFramework");
    }

    
    /**
	 * Attempts to download the file passed in
	 * 
	 * @memberOf FrameworkViewScreen
	 * @method saveFile
	 * @param content
	 * 			Content of file to save
	 * @param name
	 * 			Name of file to save
	 */
    function saveFile(content, name){
    	try {
		    var isFileSaverSupported = !!new Blob;
		    
		    var blob = new Blob([content], {type:"text/plain;charset=utf-8"});
    		saveAs(blob, name);
		} catch (e) {
			ViewManager.getView("#frameworkViewMessageContainer").displayAlert("Your browser doesn't support file downloads", "downloadFile");
		}
    }
    
    /**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf FrameworkViewScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
    FrameworkViewScreen.prototype.display = function (containerId, callback) {
        var data = this.data;

        if (data.id != null) {
            ScreenManager.setScreenParameters({
                "id": data.id
            })
        }

        ViewManager.showView(new MessageContainer("frameworkView"), "#frameworkViewMessageContainer");

        if (EcEncryptedValue.encryptOnSave(data.id))
            $("#frameworkViewerPrivateSymbol").removeClass("hide");
        else
            $("#frameworkViewerPrivateSymbol").addClass("hide");

        if (data.owner != undefined && data.owner.length > 0) {
            $("#frameworkViewOwner").text("")
            for (var i = 0; i < data.owner.length; i++) {
                if (i > 0)
                    $("#frameworkViewOwner").append(", ");

                
                $("#frameworkViewOwner").append("<span id='framework-owner-"+i+"'></span>");
                
                ViewManager.showView(new IdentityDisplay(data.owner[i]), "#framework-owner-"+i);
       
            }
        } else {
            $("#frameworkViewOwner").text("Public")
        }

        $("#frameworkViewSearchBtn").attr("href", "#" + FrameworkSearchScreen.prototype.displayName);
        $("#frameworkViewSearchBtn").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new FrameworkSearchScreen(data));
        });

        $("#frameworkViewBtn").attr("href", "#" + FrameworkViewScreen.prototype.displayName);
        $("#frameworkViewBtn").click(function (event) {
            event.preventDefault();
        });

        if (AppController.identityController.canEdit(data)) {
            $("#editFrameworkBtn").click(function (event) {
                event.preventDefault();
                ScreenManager.changeScreen(new FrameworkEditScreen(data));
            })
        } else {
            $("#editFrameworkBtn").hide();
        }
        
        if (!AppController.identityController.owns(data) && !AppController.serverController.getAdmin()) {
            $("#frameworkViewDeleteBtn").remove();
        } else {
            $("#frameworkViewDeleteBtn").click(function () {
                deleteFramework();
            })
        }
        
        $("#jsonLdDownload").click(function(){
        	saveFile(data.toJson(), data.getGuid()+".jsonld");
        });
        
        // May need to include the signatureSheet to allow access to hidden/encrypted objects
        $("#rdfDownload").click(function(){
        	data.asRdfXml(function(rdf){
        		saveFile(rdf, data.getGuid()+".xml");
        	});
        });
        
        $("#ttlDownload").click(function(){
        	data.asTurtle(function(ttl){
        		saveFile(ttl, data.getGuid()+".ttl");
        	});
        });
        
        $("#nQuadsDownload").click(function(){
        	data.asNQuads(function(nquads){
        		saveFile(nquads, data.getGuid()+".n4");
        	});
        });
        
        $("#asnJsonDownload").click(function(){
        	data.asAsnJson(function(asn){
        		saveFile(asn, data.getGuid()+".json")
        	}, function(err){
        		ViewManager.getView("#frameworkViewMessageContainer").displayAlert("Cannot find ASN endpoint: "+err, "downloadFile");
        	}, AppController.serverController.selectedServerUrl)
        });
        
        $("#csvDownload").click(function(){
        	CSVExport.exportFramework(data.id, function(){
        		
        	}, function(){
        		
        	});
        })
        
        EcFramework.get(data.id, function(framework){
        	data = framework;
        	
        	AppController.storageController.addRecent(EcFramework.myType, data.shortId());
			ViewManager.getView(AppController.topBarContainerId).buildRecentFrameworkList(AppController.storageController.getRecent(EcFramework.myType));	
			
			buildFramework(data);
		}, function(msg){
			EcFramework.get(EcRemoteLinkedData.trimVersionFromUrl(data.id), function(framework){
				data = framework;
				
				AppController.storageController.addRecent(EcFramework.myType, data.shortId());
				ViewManager.getView(AppController.topBarContainerId).buildRecentFrameworkList(AppController.storageController.getRecent(EcFramework.myType));
				
				buildFramework(data);
			}, errorRetrieving);
		});
    };

    return FrameworkViewScreen;
})(FrameworkViewScreen);
/**
 * View to display contact information including a qr code view of their pk,
 * the ability to name/request name from a key
 * 
 * @class IdentityDisplay
 * @author devlin.junker@eduworks.com
 */
var IdentityDisplay = (function(IdentityDisplay){

	/**
	 * @memberOf IdentityDisplay
	 * @method buildPopoutDisplay
	 * @private
	 * @param {String} pem
	 * 			String representation of the pk or Ppk
	 * @param {String} containerId
	 * 			DOM ID of the element for the identityDisplay 
	 */
	function buildPopoutDisplay(pem, containerId){
		var ident = AppController.identityController.lookup(pem);
		
		var container = $(containerId).find(".identityDisplay").first();
		
		container.attr("data-pk", pem);
		container.find(".identityText").text(ident.displayName);
		
		container.find(".qrcodeCanvas:empty").html("").qrcode({
            width: 256,
            height: 256,
            text: pem.replaceAll(/[\r\n]/g, "").trim()
		});
		
    	container.off("click.qr").on("click.qr",null,null,
            function(ev){
    			if( !($(ev.target).parents().hasClass("popout") || $(ev.target).hasClass("popout")) ){
		    		copyTextToClipboard(pem);
		    		alert("Public key copied to clipboard.");
    			}
	    	}
    	);
    	
    	container.on("mouseenter", function(){
    		container.find(".popout").removeClass("hide");
    		
    		container.find(".qrcodeCanvas").addClass("hide");
    		container.find(".connectContainer").addClass("hide");
    		container.find(".identifyContainer").addClass("hide");
    		container.find(".renameContainer").addClass("hide");
    	});
    	
    	container.on("mouseleave", function(){
    		container.find(".popout").addClass("hide");
    	});
    	
    	container.find(".qrBtn").click(function(ev){
    		ev.preventDefault();
    		container.find(".identifyContainer").addClass("hide");
    		container.find(".connectContainer").addClass("hide");
    		container.find(".renameContainer").addClass("hide");
    		
    		container.find(".qrcodeCanvas").toggleClass("hide");
    	});
    	
    	if(ident == IdentityController.unknownContact){
    		container.find(".knownIdentityContainer").addClass("hide");
    		container.find(".unknownIdentityContainer").removeClass("hide");
    	}else{
    		container.find(".unknownIdentityContainer").addClass("hide");
    		container.find(".knownIdentityContainer").removeClass("hide");
    	}
    	
    	container.find(".identifyBtn").click(function(ev){
    		ev.preventDefault();
    		container.find(".qrcodeCanvas").addClass("hide");
    		container.find(".connectContainer").addClass("hide");
    		
    		container.find(".identifyContainer").toggleClass("hide");
    		container.find(".identifyInput").focus();
    	});
    	
    	container.find(".connectBtn").click(function(ev){
    		ev.preventDefault();
    		
    		container.find(".qrcodeCanvas").addClass("hide");
    		container.find(".identifyContainer").addClass("hide");
    		
    		container.find(".connectContainer").toggleClass("hide");
    		container.find(".connectInput").focus();
    	});
    	
    	container.find(".saveIdentifyBtn").click(function(ev){
    		ev.preventDefault();
    		
    		var name = container.find(".identifyInput").val(); 
    		
    		AppController.identityController.addContact(pem, name);
    		$("[data-pk='"+pem+"'] .identityText").text(name);
    		$("[data-pk='"+pem+"'] .unknownIdentityContainer").addClass("hide");
    		$("[data-pk='"+pem+"'] .knownIdentityContainer").removeClass("hide");
    		
    		container.find(".identifyInput").val("");
    		
    		container.find(".popout").addClass("hide");
    	});
    	
    	container.find(".sendConnectBtn").click(function(ev){
    		ev.preventDefault();
    		
    		container.find(".connectInput").val("");
    		
    		container.find(".popout").addClass("hide");
    	});
    	
    	container.find(".renameBtn").click(function(ev){
    		ev.preventDefault();
    		
    		container.find(".qrcodeCanvas").addClass("hide");
    		
    		container.find(".renameContainer").toggleClass("hide");
    	});
		
		container.find(".saveRenameBtn").click(function(ev){
    		ev.preventDefault();
    		
    		var newName = container.find(".renameInput").val();
    		
    		if(AppController.identityController.isCurrentUser(pem)){
    			AppController.identityController.addKey(pem, newName);
    		}else{
    			AppController.identityController.addContact(pem, newName);
    		}
    		
    		$("[data-pk='"+pem+"'] .identityText").text(newName);
    		
    		container.find(".renameInput").val("");
    		
    		container.find(".popout").addClass("hide");
    	});
    	
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf IdentityDisplay
	 * @method display
	 * @param {String} containerId
	 * 			DOM ID of the element that holds this IdentityDisplay
	 */
	IdentityDisplay.prototype.display = function(containerId)
	{	
		var data = this.data;
		buildPopoutDisplay(data, containerId);
	}
	
	
	return IdentityDisplay;
})(IdentityDisplay);/**
 * Modal for viewing evidence details
 *
 * @module cass.manager
 * @class ImportCompetenciesModal
 *
 * @author devlin.junker@eduworks.com
 */
var ImportCompetenciesModal = (function(ImportCompetenciesModal){

	var cached_frameworks = {};

	/**
	 * Adds a framework to the select input of frameworks to add
	 * imported competencies to
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method addLocationFramework
	 * @private
	 * @param {EcFramework} framework
	 * 			Framework details to add to the select input
	 */
	function addLocationFramework(framework){
		var id = framework.shortId().split("/");
		var id = id[id.length-1];

		$("#noLocation").text("No Specific Framework");

		var op = $("<option></option>");
		op.attr("value", id);

		if(framework.owner == undefined || framework.owner.length == 0){
			op.text(framework.name+" (Public)");
			$("#importLocationSelect").append(op);
		}else{
			op.text(framework.name);

			op.insertAfter("#noLocation")
		}

	}

	/**
	 * Adds list of frameworks to select input of frameworks to add
	 * imported competencies too
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method addFrameworks
	 * @private
	 * @param {EcFramework[]} frameworks
	 * 			List of frameworks to add
	 */
	function addFrameworks(frameworks){
		for(var i = 0; i < frameworks.length; i++){
			var framework = frameworks[i];
			var id = framework.shortId().split("/");
			var id = id[id.length-1];

			addLocationFramework(framework)

			cached_frameworks[id] = framework;
		}
		if(frameworks.length == 0){
			$("#noLocation").text("No Specific Framework");
		}
	}

	/**
	 * Adds framework to source select input for transferring
	 * competencies from (to another framework)
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method addSourceFramework
	 * @private
	 * @param {EcFramework} framework
	 * 			Framework to add to source select
	 */
	function addSourceFramework(framework){
		var id = framework.shortId().split("/");
		var id = id[id.length-1];

		var op = $("<option></option>");
		op.attr("value", id);
		if(framework.owner == undefined || framework.owner.length == 0){
			op.text(framework.name+" (Public)");
			$("#importSourceSelect").append(op);
		}else{
			op.text(framework.name);

			op.insertAfter("#noSource")
		}
	}

	/**
	 * Adds a list of frameworks to the source input for
	 * transferring competencies from (to another framework)
	 *
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method addSourceFrameworks
	 * @private
	 */
	function addSourceFrameworks(frameworks){
		for(var i = 0; i < frameworks.length; i++){
			var framework = frameworks[i];
			var id = framework.shortId().split("/");
			var id = id[id.length-1];

			if(id != $("#importLocationSelect").val())
				addSourceFramework(framework);

			cached_frameworks[id] = framework;
		}
	}

	/**
	 * Displays error if problem finding a list of frameworks to display
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method errorFindingFrameworks
	 * @private
	 * @param {String} err
	 * 			Error to display
	 */
	function errorFindingFrameworks(err){
		if(err == undefined)
			err = "Unable to Connect to Server to Find Frameworks";

		ViewManager.getView("#importCompetenciesMessageContainer").displayAlert(err, "getFramework");
	}

	/**
	 * Displays error if problem parsing CSV
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method errorParsing
	 * @private
	 * @param {String} err
	 * 			Error to display
	 */
	function errorParsing(err){
		if(err == undefined)
			err = "CSV could not be parsed";

		ViewManager.getView("#importCompetenciesMessageContainer").displayAlert(err, "parseCSV");
	}

	/**
	 * Displays error if problem saving competency during import
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method errorSavingCompetency
	 * @private
	 * @param {String} err
	 * 			Error to display
	 */
	function errorSavingCompetency(err){
		if(err == undefined)
			err = "Could not connect to server to save competency";

		ViewManager.getView("#importCompetenciesMessageContainer").displayAlert(err, "saveCompetency");
	}

	/**
	 * Displays error if problem saving framework during import (ASN)
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method errorSavingFramework
	 * @private
	 * @param {String} err
	 * 			Error to display
	 */
	function errorSavingFramework(err){
		if(err == undefined)
			err = "Could not connect to server to save framework";

		ViewManager.getView("#importCompetenciesMessageContainer").displayAlert(err, "saveFramework");
	}

	/**
	 * Displays error if problem finding competencies in source framework
	 * during framework import
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method errorFindingCompetency
	 * @private
	 * @param {String} err
	 * 			Error to display
	 */
	function errorFindingCompetency(err){
		if(err == undefined)
			err = "Could not connect to server to find source framework competencies";

		ViewManager.getView("#importCompetenciesMessageContainer").displayAlert(err, "findCompetencies");
	}

	/**
	 * Handles getting CSV file from Competency CSV Input and
	 * displays columns and # found once finished analyzing CSV
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method analyzeCsv
	 * @private
	 * @param {EcFramework} framework
	 * 			Framework to import CSV competencies too
	 */
	function analyzeCsv(framework) {
	    var file = $("#importCsvFile")[0].files[0];

	    CSVImport.analyzeFile(file, function(data){
	    	if (data.length === undefined || data.length == 0) {
            	ViewManager.getView("#importCompetenciesMessageContainer").displayAlert("CSV could not be parsed", "parseCSV");
            	$("#submitImportCsv").attr("disabled", "disabled")
            	$("#submitImportCsv").off("click");
            	$(".importCsvRelation").addClass("hide");
                return;
            }
            $("#submitImportCsv").removeAttr("disabled");
            ViewManager.getView("#importCompetenciesMessageContainer").clearAlert("parseCSV");

            $("#importCsvColumnName").html("<option index='-1'>N/A</option>");
            $("#importCsvColumnDescription").html("<option index='-1'>N/A</option>");
            $("#importCsvColumnScope").html("<option index='-1'>N/A</option>");
            $("#importCsvColumnId").html("<option index='-1'>N/A</option>");
            for (var i = 0; i < data[0].length; i++) {
                $("#importCsvColumnName").append("<option/>").children().last().text(data[0][i]).attr("index", i);
                $("#importCsvColumnDescription").append("<option/>").children().last().text(data[0][i]).attr("index", i);
                $("#importCsvColumnScope").append("<option/>").children().last().text(data[0][i]).attr("index", i);
                $("#importCsvColumnId").append("<option/>").children().last().text(data[0][i]).attr("index", i);

                if(data[0][i].toLowerCase().includes("name")){
                	$("#importCsvColumnName [index="+i+"]").attr("selected", "selected");
                	ViewManager.getView("#importCompetenciesMessageContainer").displayPrimary("CSV column names atuomatically determined based off of name", "csvGuess");
                }else if(data[0][i].toLowerCase().includes("description")){
                	$("#importCsvColumnDescription [index="+i+"]").attr("selected", "selected");
                	ViewManager.getView("#importCompetenciesMessageContainer").displayPrimary("CSV column names atuomatically determined based off of name", "csvGuess");
                }else if(data[0][i].toLowerCase().includes("scope")){
                	 $("#importCsvColumnScope [index="+i+"]").attr("selected", "selected");
                	 ViewManager.getView("#importCompetenciesMessageContainer").displayPrimary("CSV column names atuomatically determined based off of name", "csvGuess");
                }else if(data[0][i].toLowerCase().includes("id")){
                	$("#importCsvColumnId [index="+i+"]").attr("selected", "selected");
                	ViewManager.getView("#importCompetenciesMessageContainer").displayPrimary("CSV column names atuomatically determined based off of name", "csvGuess");
                	$(".importCsvRelation").removeClass("hide");
                }
            }

            $("#importCsvColumnId").change(function(){
            	if($("#importCsvColumnId").val() != undefined && $("#importCsvColumnId").val() != -1){
            		$(".importCsvRelation").removeClass("hide");
            	}
            })


            $("#submitImportCsv").on("click", function(ev){
				ev.preventDefault();
				$("#submitImportCsv").attr("disabled", "disabled");
				$("#submitImportCsv").find(".fa-spin").removeClass("hide");
				setTimeout(function(){
					importCsv(framework);
				}, 100);
			})
	    }, errorParsing);
	}

	/**
	 * Handles getting CSV file from Relation CSV input and
	 * displays columns and # found once finished analyzing CSV
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method analyzeRelationCsv
	 * @private
	 */
	function analyzeRelationCsv() {
	    var file = $("#importCsvRelation")[0].files[0];

	    CSVImport.analyzeFile(file, function(data){
	    	if (data.length === undefined || data.length == 0) {
            	ViewManager.getView("#importCompetenciesMessageContainer").displayAlert("CSV could not be parsed", "parseCSV");
            	$("#submitImportCsv").attr("disabled", "disabled")
            	$("#submitImportCsv").off("click");
                return;
            }
            $("#submitImportCsv").removeAttr("disabled");
            ViewManager.getView("#importCompetenciesMessageContainer").clearAlert("parseCSV");

            $("#importCsvColumnSource").html("<option index='-1'>N/A</option>");
            $("#importCsvColumnRelationType").html("<option index='-1'>N/A</option>");
            $("#importCsvColumnTarget").html("<option index='-1'>N/A</option>");
            for (var i = 0; i < data[0].length; i++) {
                $("#importCsvColumnSource").append("<option/>").children().last().text(data[0][i]).attr("index", i);
                $("#importCsvColumnRelationType").append("<option/>").children().last().text(data[0][i]).attr("index", i);
                $("#importCsvColumnTarget").append("<option/>").children().last().text(data[0][i]).attr("index", i);

                if(data[0][i].toLowerCase().includes("source")){
                	$("#importCsvColumnSource [index="+i+"]").attr("selected", "selected");
                	ViewManager.getView("#importCompetenciesMessageContainer").displayPrimary("CSV column names atuomatically determined based off of name", "csvGuess");
                }else if(data[0][i].toLowerCase().includes("relationtype")){
                	$("#importCsvColumnRelationType [index="+i+"]").attr("selected", "selected");
                	ViewManager.getView("#importCompetenciesMessageContainer").displayPrimary("CSV column names atuomatically determined based off of name", "csvGuess");
                }else if(data[0][i].toLowerCase().includes("target")){
                	$("#importCsvColumnTarget [index="+i+"]").attr("selected", "selected");
                	ViewManager.getView("#importCompetenciesMessageContainer").displayPrimary("CSV column names atuomatically determined based off of name", "csvGuess");
                }
            }

	    }, errorParsing)
	}

	/**
	 * Handles getting file and column input from DOM and pass
	 * to import to import competencies from CSV
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method importCsv
	 * @private
	 * @param {EcFramework} framework
	 * 			Framework that is being edited
	 */
	function importCsv(framework) {
		var editingFramework = true;
		if(framework == undefined){
			editingFramework = false;
			framework = cached_frameworks[$("#importLocationSelect").val()]
		}

	    var file = $("#importCsvFile")[0].files[0];
	    var relation = $("#importCsvRelation")[0].files[0];

	    var nameIndex = parseInt($("#importCsvColumnName option:selected").attr("index"));
        var descriptionIndex = parseInt($("#importCsvColumnDescription option:selected").attr("index"));
        var scopeIndex = parseInt($("#importCsvColumnScope option:selected").attr("index"));
        var idIndex = parseInt($("#importCsvColumnId option:selected").attr("index"));
        var sourceIndex = parseInt($("#importCsvColumnSource option:selected").attr("index"));
        var relationTypeIndex = parseInt($("#importCsvColumnRelationType option:selected").attr("index"));
        var targetIndex = parseInt($("#importCsvColumnTarget option:selected").attr("index"));

        if(nameIndex == -1 ){
        	ViewManager.getView("#importCompetenciesMessageContainer").displayAlert("Must select a column that contains competency names", "selectName");
        	$("#submitImportCsv").addClass("alert");
			$("#submitImportCsv").attr("disabled", "disabled");

			$("#importCsvColumnName").change(function(){
				$("#submitImportCsv").removeClass("alert");
				$("#submitImportCsv").removeAttr("disabled", "disabled");
			});

        	return;
        }
        ViewManager.getView("#importCompetenciesMessageContainer").clearAlert("selectName");

        CSVImport.importCompetencies(file, AppController.serverController.repoInterface, AppController.identityController.selectedIdentity,
        		nameIndex, descriptionIndex, scopeIndex, idIndex,relation,sourceIndex,relationTypeIndex,targetIndex,function(savedCompetencies,savedRelations){
        	var query = "";
            for(var i = 0; i < savedCompetencies.length; i++)
            {
            	var comp = savedCompetencies[i];

            	if(framework != undefined){
            		framework.addCompetency(comp.id)
            	}else{
            		var id = comp.shortId().split("/");
            		id = id[id.length - 1];

            		if(i > 0)
            			query += " OR ";
            		query += id;
            	}
            }

            for(var i = 0; i < savedRelations.length; i++)
            {
            	var comp = savedRelations[i];

            	if(framework != undefined){
            		framework.addRelation(comp.id)
            	}else{
            		var id = comp.shortId().split("/");
            		id = id[id.length - 1];

            		if(i > 0)
            			query += " OR ";
            		query += id;
            	}
            }

            if(framework != undefined){
    			if(!editingFramework){
	                framework.save(function () {
	                	ScreenManager.changeScreen(new FrameworkViewScreen(framework))
	                	ModalManager.hideModal();
	                }, errorSavingFramework);
    			}else{
    				for(var i = 0; i < savedCompetencies.length; i++){
    					ScreenManager.getCurrentScreen().addCompetency(savedCompetencies[i]);
    				}
    				for(var i = 0; i < savedRelations.length; i++){
    					ScreenManager.getCurrentScreen().addRelation(savedRelations[i]);
    				}

    				ModalManager.showModal(new ConfirmModal(function(){
        				var f = new EcFramework();
        				f.copyFrom(framework);
        				f.save(function(){
        					ScreenManager.getCurrentScreen().showSave();
        					ModalManager.hideModal();
        				}, function(err){
        					ScreenManager.getCurrentScreen().errorSaving(err);
        					ModalManager.hideModal();
        				});
        			}, "Would you like to save the framework now?", "Competencies Added!"));
    			}


    		}else{
            	ScreenManager.changeScreen(new CompetencySearchScreen(null, query))

            	ModalManager.hideModal();
            }


        }, function(error){
        	ViewManager.getView("#csvImportProgressMessageContainer").clearSuccess();
        	ViewManager.getView("#csvImportProgressMessageContainer").displayAlert(error);
        }, function(progressObj){
        	if(progressObj != undefined && progressObj["competencies"] != undefined){
        		if(progressObj["relations"] == undefined){
        			ViewManager.getView("#csvImportProgressMessageContainer").displaySuccess("Sucessfully imported "+progressObj["competencies"]+" competencies", "competenciesImported")
        		}else{
        			ViewManager.getView("#csvImportProgressMessageContainer").displaySuccess("Sucessfully imported "+progressObj["relations"]+" relations", "relationsImported")
        		}
        	}

        });

	}

	/**
	 * Handles getting framework to copy/link competencies
	 * from and target framework from DOM
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method importFromFramework
	 * @private
	 * @param {EcFramework} framework
	 * 			Framework that is being edited
	 */
	function importFromFramework(framework){
		var editingFramework = true;
		if(framework == undefined){
			editingFramework = false;
			framework = cached_frameworks[$("#importLocationSelect").val()];
		}

		if(framework == undefined){
			ViewManager.getView("#importCompetenciesMessageContainer").displayAlert("Problem finding framework to import to", "missingLocationFramework");
			return;
		}
		ViewManager.getView("#importCompetenciesMessageContainer").clearAlert("missingLocationFramework");

		var source = cached_frameworks[$("#importSourceSelect").val()];

		if(source == undefined){
			ViewManager.getView("#importCompetenciesMessageContainer").displayAlert("Problem finding framework to import from", "missingSourceFramework");
			return;
		}
		ViewManager.getView("#importCompetenciesMessageContainer").clearAlert("missingSourceFramework");

		if(source.competency == undefined || source.competency.length == 0){
			ViewManager.getView("#importCompetenciesMessageContainer").displayAlert(source.name+" contains no competencies", "missingSourceFrameworkCompetencies");
			$("#submitImportFramework").addClass("alert");
			$("#submitImportFramework").attr("disabled", "disabled");

			$("#importLocationSelect").change(function(){
				$("#submitImportFramework").removeClass("alert");
				$("#submitImportFramework").removeAttr("disabled", "disabled");
			});

			return;
		}
		ViewManager.getView("#importCompetenciesMessageContainer").clearAlert("missingSourceFrameworkCompetencies");

		var copy = $("#copySwitch").is(":checked");

		FrameworkImport.importCompetencies(source, framework, copy, AppController.serverController.selectedServerUrl, AppController.identityController.selectedIdentity,
			function(savedCompetencies, savedRelations)
		{
			if(editingFramework){
				for(var i = 0; i < savedCompetencies.length; i++)
				{
					ScreenManager.getCurrentScreen().addCompetency(savedCompetencies[i]);
				}
				for(var i = 0; i < savedRelations.length; i++)
				{
					ScreenManager.getCurrentScreen().addRelation(savedRelations[i]);
				}
			}else{
				ScreenManager.changeScreen(new FrameworkViewScreen(framework));
			}

			ModalManager.hideModal();
		},
		function(error)
		{
			ViewManager.getView("#importCompetenciesMessageContainer").displayAlert(error);
		});

	}

	/**
	 * Analyzes a medbiquitious XML file for competencies to import
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method analyzeMedbiq
	 * @private
	 * @param {EcFramework} framework
	 * 			Framework that is being edited
	 */
	function analyzeMedbiq(framework){
		var importAllowed = function(){
			$("#submitImportMedbiq").attr("disabled", "disabled");
			$("#submitImportMedbiq").find(".fa-spin").removeClass("hide");
			setTimeout(function(){
				startImportMedbiqXml(framework);
			}, 100);
		}

		var file = $("#importMedbiqFile")[0].files[0];
		$("#medbiqImportProgress").text("");

		$("#medbiqAnalyzeProgress").removeClass("hide");

	    MedbiqImport.analyzeFile(file, function(found){
	    	$("#medbiqAnalyzeProgress").addClass("hide");

	    	if(found.length == 0)
	    	{
	    		ViewManager.getView("#importCompetenciesMessageContainer").displayAlert("No Competencies Found to Import", "noCompetencies");
	    		$("#submitImportMedbiq").addAttr("disabled");
	    		$("#submitImportMedbiq").off("click", importAllowed)
	    		return;
	    	}
	    	ViewManager.getView("#importCompetenciesMessageContainer").clearAlert("noCompetencies");

	    	$("#medbiqImportProgress").text(Object.keys(found).length + " competencies detected. Press import to finish.");
            $("#submitImportMedbiq").removeAttr("disabled");

            $("#submitImportMedbiq").on("click", importAllowed)
	    }, function(error){
	    	ViewManager.getView("#importCompetenciesMessageContainer").displayAlert(error);
	    });
	}

	/**
	 * Calls medbiq importer to import frameworks
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method startImportMedbiqXml
	 * @private
	 * @param {EcFramework} framework
	 * 			Framework that is being edited
	 */
	function startImportMedbiqXml(framework) {
	    var editingFramework = true;
		if(framework == undefined){
			editingFramework = false;
	    	framework = cached_frameworks[$("#importLocationSelect").val()];
	    }

	    MedbiqImport.importCompetencies(AppController.serverController.selectedServerUrl, AppController.identityController.selectedIdentity,
	    		function(savedCompetencies)
	    {
	    	var query = "";
	    	for(var i = 0; i < savedCompetencies.length; i++){
	    		if(framework != null){
	    			framework.addCompetency(savedCompetencies[i].id);
	    		}else{
	    			var id = savedCompetencies[i].shortId().split("/");
            		id = id[id.length - 1];

            		if(i > 0)
            			query += " OR ";
            		query += id;
	    		}
	    	}

	    	if(framework != null){
	    		if(!editingFramework){
	                framework.save(function () {
	                	ScreenManager.changeScreen(new FrameworkViewScreen(framework))
	                }, errorSavingFramework);
    			}else{
    				for(var i = 0; i < savedCompetencies.length; i++){
    					ScreenManager.getCurrentScreen().addCompetency(savedCompetencies[i]);
    				}
    			}
	    	}else{
	    		ScreenManager.changeScreen(new CompetencySearchScreen(null, query))
	    	}

	    	ModalManager.hideModal();
	    },
	    function(error){
	    	ViewManager.getView("#importCompetenciesMessageContainer").displayAlert(error);
	    	ViewManager.getView("#importCompetenciesMessageContainer").clearSuccess();
	    },
	    function(progressObj){
        	if(progressObj != undefined && progressObj["competencies"] != undefined){
        		ViewManager.getView("#importCompetenciesMessageContainer").displaySuccess("Sucessfully imported "+progressObj["competencies"]+" competencies", "competenciesImported")
        	}

        });
	}

	/**
	 * Analyzes an ASN file for competencies and sets up modal
	 * to import them
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method analyzeASN
	 * @private
	 * @param {EcFramework} framework
	 * 			Framework that is being edited
	 */
	function analyzeASN(framework){
		var importAllowed = function(){
			$("#submitImportASN").attr("disabled", "disabled");
			$("#submitImportASN").find(".fa-spin").removeClass("hide");
			setTimeout(function(){
				startImportASN(framework);
			}, 100)
		}

		var file = $("#importASNFile")[0].files[0];
		$("#asnImportProgress").text("");

		$("#asnAnalyzeProgress").removeClass("hide");

		ASNImport.analyzeFile(file, function(found){
			$("#asnAnalyzeProgress").addClass("hide");
			if(found.length == 0)
	    	{
	    		ViewManager.getView("#importCompetenciesMessageContainer").displayAlert("No Competencies Found to Import", "noCompetencies");
	    		$("#submitImportASN").addAttr("disabled");
	    		$("#submitImportASN").off("click", importAllowed)
	    		return;
	    	}
	    	ViewManager.getView("#importCompetenciesMessageContainer").clearAlert("noCompetencies");

	    	$("#asnImportProgress").text(Object.keys(found).length + " competencies detected. Press import to finish.");
            $("#submitImportASN").removeAttr("disabled");

            $("#submitImportASN").on("click", importAllowed)

	    }, function(error){
	    	ViewManager.getView("#importCompetenciesMessageContainer").displayAlert(error);
	    });
	}

	/**
	 * Calls the ASN Import with an ASN file to import
	 * competencies from.
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method startImportASN
	 * @private
	 * @param {EcFramework} framework
	 * 			Framework that is being edited
	 */
	function startImportASN(framework){
		var editingFramework = true;
		if(framework == undefined){
			editingFramework = false;
		   	framework = cached_frameworks[$("#importLocationSelect").val()];
		}

		var createFramework = $("#createFrameworkSwitch").is(":checked");

		ASNImport.importCompetencies(AppController.serverController.selectedServerUrl,
				AppController.identityController.selectedIdentity,
				createFramework,
	    		function(savedCompetencies, createdFramework)
	    {
	    	var query = "";
	    	for(var i = 0; i < savedCompetencies.length; i++){
	    		if(framework != null){
	    			framework.addCompetency(savedCompetencies[i].id);
	    		}else{
	    			var id = savedCompetencies[i].shortId().split("/");
            		id = id[id.length - 1];

            		if(i > 0)
            			query += " OR ";
            		query += id;
	    		}
	    	}

	    	if(framework != null){
	    		if(!editingFramework){
	                framework.save(function () {
	                	ScreenManager.changeScreen(new FrameworkViewScreen(framework))
	                }, errorSavingFramework);
    			}else{
    				for(var i = 0; i < savedCompetencies.length; i++){
    					ScreenManager.getCurrentScreen().addCompetency(savedCompetencies[i]);
    				}
    			}
	    	}else if(createdFramework != null){
	    		ScreenManager.changeScreen(new FrameworkViewScreen(createdFramework));
	    	}else{
	    		ScreenManager.changeScreen(new CompetencySearchScreen(null, query))
	    	}

	    	ModalManager.hideModal();
	    },
	    function(error){
	    	ViewManager.getView("#importCompetenciesMessageContainer").displayAlert(error);
	    	ViewManager.getView("#importCompetenciesMessageContainer").clearSuccess();
	    },
	    function(progressObj){
	    	if(progressObj != undefined && progressObj["competencies"] != undefined){
        		if(progressObj["relations"] == undefined){
        			ViewManager.getView("#importCompetenciesMessageContainer").displaySuccess("Sucessfully imported "+progressObj["competencies"]+" competencies", "competenciesImported")
        		}else{
        			ViewManager.getView("#importCompetenciesMessageContainer").displaySuccess("Sucessfully imported "+progressObj["relations"]+" relations", "relationsImported")
        		}
        	}
        });
	}

	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 *
	 * @memberOf ImportCompetenciesModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	ImportCompetenciesModal.prototype.display = function(containerId)
	{
		var data = this.data;

		ViewManager.showView(new MessageContainer("csvImportProgress"), "#csvImportProgressMessageContainer");
		ViewManager.showView(new MessageContainer("importCompetencies"), "#importCompetenciesMessageContainer", function(){
			if(AppController.identityController.selectedIdentity == undefined)
			{
				ViewManager.getView("#importCompetenciesMessageContainer").displayWarning("Competencies that are imported will be Public and can be modified by anyone", "noOwner");
			}

			if(data == undefined)
			{
				ViewManager.getView("#importCompetenciesMessageContainer").displayWarning("No Framework Specified, Competencies will not be attached to any frameworks when imported", "noFrameworkSelected");
			}
		});

		if(data == undefined){
			EcFramework.search(AppController.serverController.getRepoInterface(), "*", addFrameworks, errorFindingFrameworks, {ownership:"public"});
			EcFramework.search(AppController.serverController.getRepoInterface(), "*", addFrameworks, errorFindingFrameworks, {ownership:"me"});
		}else{
			$("#selectFramework").removeClass("hide");

			// TODO:

			addLocationFramework(data);
			$("#noLocation").removeAttr('selected');

			var id = data.shortId().split("/");
			var id = id[id.length-1];
			$("#importLocationSelect option[value="+id+"]").attr("selected", "selected");

			$("#importLocationSelect").attr("disabled","disabled")
		}

		$("#importLocationSelect").change(function(ev){
			if($("#importLocationSelect").val() == ""){
				$("#selectFramework").addClass("hide");
				$("#frameworkSourceRow").addClass("hide");
				ViewManager.getView("#importCompetenciesMessageContainer").displayWarning("No Framework Specified, Competencies will not be attached to any frameworks when imported", "noFrameworkSelected");
			}else{
				$("#selectFramework").removeClass("hide");
				ViewManager.getView("#importCompetenciesMessageContainer").clearWarning("noFrameworkSelected");
			}
		});


		$("#selectCSV").click(function(ev){
			ev.preventDefault();
			$(".sourceRow").addClass("hide");
			$("#csvSourceRow").removeClass("hide");
			$("#csvOwnerRow").removeClass("hide");
			$("#csvActionRow").removeClass("hide");
			$("#modalContainer").foundation("open")
		});

		$("#importCsvRelation").change(function(ev){
			ev.preventDefault();
			if ($("#importCsvFile")[0].files.length > 0)
				$("#csvRelationRow").removeClass("hide");
			else
				$("#csvRelationRow").addClass("hide");
		});

		$("#selectMedbiq").click(function(ev){
			ev.preventDefault();
			$(".sourceRow").addClass("hide");
			$("#medbiqSourceRow").removeClass("hide");
			$("#modalContainer").foundation("open")
		});

		$("#selectFramework").click(function(ev){
			ev.preventDefault();
			$(".sourceRow").addClass("hide");
			$("#frameworkSourceRow").removeClass("hide");
			$("#modalContainer").foundation("open")

			EcFramework.search(AppController.serverController.getRepoInterface(), "*", addSourceFrameworks, errorFindingFrameworks);

			ViewManager.getView("#importCompetenciesMessageContainer").clearWarning("noOwner");

			$("#copySwitch").change(function(){
				if($("#copySwitch").is(":checked")){
					$("#importFrameworkOwner").fadeIn();
					if(AppController.identityController.selectedIdentity == undefined)
						ViewManager.getView("#importCompetenciesMessageContainer").displayWarning("Competencies that are copied will be Public and can be modified by anyone", "noOwner");
				}else{
					$("#importFrameworkOwner").fadeOut();
					ViewManager.getView("#importCompetenciesMessageContainer").clearWarning("noOwner");
				}
			})

			$("#importSourceSelect").change(function(ev){
				$("#submitImportFramework").removeAttr("disabled");
				$("#submitImportFramework").click(function(ev){
					ev.preventDefault();
					$("#submitImportFramework").attr("disabled", "disabled");
					$("#submitImportFramework").find(".fa-spin").removeClass("hide");
					setTimeout(function(){
						importFromFramework(data);
					}, 100)
				})
			})
		});

		$("#selectASN").click(function(ev){
			ev.preventDefault();
			$(".sourceRow").addClass("hide");
			$("#asnSourceRow").removeClass("hide");
			$("#modalContainer").foundation("open");

			if(data == undefined){
				$("#createFrameworkInputs").removeClass("hide");
				$("#noCreateFrameworkInputs").addClass("hide");

				var newFrameworkOption = $("<option selected>New ASN Framework</option>");
				$("#createFrameworkSwitch").change(function(){
					if($("#createFrameworkSwitch").is(":checked")){
						$("#importLocationSelect").attr("disabled", "disabled");
						$("#importLocationSelect").append(newFrameworkOption)
					}else{
						$("#importLocationSelect").removeAttr("disabled");
						newFrameworkOption.remove();
					}
				})
			}else{
				$("#createFrameworkInputs").addClass("hide");
				$("#noCreateFrameworkInputs").removeClass("hide");
			}
		})


		$("#importASNFile").change(function(){
			analyzeASN(data);
		})

		$("#importCsvFile").change(function(){
			analyzeCsv(data);
		})

		$("#importCsvRelation").change(function(){
			analyzeRelationCsv(data);
		})

		$("#importMedbiqFile").change(function(){
			analyzeMedbiq(data);
		})

		$(".cancelImport").click(function(ev){
			ev.preventDefault();
			ModalManager.hideModal();
		})

		$("#newFramework").click(function(){
			ScreenManager.changeScreen(new FrameworkEditScreen());
			ModalManager.hideModal();
		});

		if(AppController.identityController.selectedIdentity != undefined){
			var pem = AppController.identityController.selectedIdentity.ppk.toPk().toPem();

			ViewManager.showView(new IdentityDisplay(pem), "#importCsvCompetenciesOwner");
			ViewManager.showView(new IdentityDisplay(pem), "#importMedbiqCompetenciesOwner");
			ViewManager.showView(new IdentityDisplay(pem), "#importAsnCompetenciesOwner");
			ViewManager.showView(new IdentityDisplay(pem), "#importAsnCompetenciesCreateFrameworkOwner");
			ViewManager.showView(new IdentityDisplay(pem), "#importFrameworkCompetenciesOwner");

		}

	}

	return ImportCompetenciesModal;
})(ImportCompetenciesModal);
/**
 * Screen that handles displaying search results of relationships
 * 
 * @module cass.manager
 * @class LevelSearchScreen
 * 
 * @author devlin.junker@eduworks.com
 */
LevelSearchScreen = (function(LevelSearchScreen){
	
	var maxLength = 24;
	
	var searchHandle = null;
	
	/**
	 * Handles getting search params from DOM and initiating search request
	 * 
	 * @memberOf LevelSearchScreen
	 * @method runLevelSearch 
	 * @private
	 * @param {int} start 
	 * 			index to start search (number of results already displayed)
	 */
	function runLevelSearch(start){
		var query = $("#levelSearchText").val();

		if (query == null || query == "")
			query = "*";
		if (searchHandle != null)
			clearTimeout(searchHandle);
		
		var ownership = $("#levelSearchOwnership").val();
		if(ownership == 1)
			ownership = "public";
		else if(ownership == 3)
			ownership = "owned";
		else if(ownership == 4)
			ownership = "me"
		else
			ownership = "all";
		
		var callback;
		if(start == undefined)
			callback = clearDisplayResults;
		else
			callback = displayResults;
		
		searchHandle = setTimeout(function() {
			var urlParams = {};
			if(window.location.hash.split("?").length > 1){
				var hashSplit = window.location.hash.split(/[?&]/)
				for(var i = 1; i < hashSplit.length; i++){
					var paramSplit = hashSplit[i].split("=");
					if(paramSplit.length == 2)
						urlParams[paramSplit[0]] = paramSplit[1]; 
				}
			}
			if(query != "*")
				urlParams.query = query;
			if(ownership != "all")
				urlParams.ownership = ownership;
			
			if(Object.keys(urlParams).length > 0){
				ScreenManager.setScreenParameters(urlParams);
				ScreenManager.getCurrentScreen().setParams(urlParams);
			}else{
				ScreenManager.setScreenParameters(null);
				ScreenManager.getCurrentScreen().clearParams();
			}
			
			ViewManager.getView("#levelSearchMessageContainer").clearAlert("searchFail");
			//ViewManager.getView("#levelSearchResults").showProgressMessage();
			ViewManager.getView("#levelSearchResults").deselectAll();
			
			var params = {};
			params.ownership = ownership;
			params.size = maxLength;
			params.start = start;
			
			EcLevel.search(AppController.serverController.getRepoInterface(), query, callback, errorSearching, params);
		}, 100);
	}
	
	/**
	 * Clears all results on screen before appending new results to Data Viewer
	 * 
	 * @memberOf LevelSearchScreen
	 * @method clearDisplayResults 
	 * @private
	 * @param {EcAlignment[]} results
	 * 			Results to display in the Data Viewer
	 */
	function clearDisplayResults(results)
	{
		ViewManager.getView("#levelSearchResults").clear();
		displayResults(results);
	}
	
	/**
	 * Just appends new results to Data Viewer
	 * 
	 * @memberOf LevelSearchScreen
	 * @method runRelationshipSearch 
	 * @private
	 * @param {EcAlignment[]} results
	 * 			Results to display in the Data Viewer
	 */
	function displayResults(results)
	{  
		ViewManager.getView("#menuContainer").showSortBasic();
		ViewManager.getView("#menuContainer").showSortByCompetency();
		
		ViewManager.getView("#levelSearchResults").populate(results);
		
		if(results.length == 0 && $("#levelResults-data").first().children().size() == 0)
		{
			ViewManager.getView("#levelSearchResults").showNoDataMessage();
		}else if(results.length < maxLength){
			$("#moreSearchResults").addClass("hide");
			//$(window).off("scroll", scrollSearchHandler);
		}else{
			$("#getMoreResults").click(function(){
				$("#getMoreResults").addClass("hide");
				$("#loadingMoreResults").removeClass("hide");
				runRelationshipSearch($("#levelResults-data .row[data-id]").size());
			})
			
			$("#getMoreResults").removeClass("hide");
			$("#moreSearchResults").removeClass("hide");
			$("#loadingMoreResults").addClass("hide");
			
			//$(window).scroll(scrollSearchHandler)
		}
		
		searchHandle = null;
	}
	
//	function scrollSearchHandler(){
//		var resultDiv = $("#levelResults-data").first(); 
//		
//		if(resultDiv.size() == 0){
//			$(window).off("scroll", scrollSearchHandler);
//		}
//		else if(($(window).height() + document.body.scrollTop) > ($(document).height() - 30))
//		{
//			//$("#moreSearchResults").addClass("hide");
//			//$("#loadingMoreResults").removeClass("hide");
//			runRelationshipSearch(resultDiv.children().size());
//		}
//	}
	
	/**
	 * Handles displaying errors during search
	 * 
	 * @memberOf LevelSearchScreen
	 * @method errorSearching 
	 * @private
	 * @param {String} err
	 * 			Error message to display
	 */
	function errorSearching(err){
		if(err == undefined)
			err = "Unable to Connect to Server for Competency Search";
		
		ViewManager.getView("#levelSearchMessageContainer").displayAlert(err, "searchFail");
		
		ViewManager.getView("#levelSearchResults").showNoDataMessage();
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf LevelSearchScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
	LevelSearchScreen.prototype.display = function(containerId)
	{
		var lastViewed = this.lastViewed;
		
		var query = this.query;
		var ownership = this.ownership;
		
			
		ViewManager.showView(new MessageContainer("levelSearch"), "#levelSearchMessageContainer");
		
		var dataViewPrefix = "levelResults";
		
		ViewManager.showView(new DataViewer(dataViewPrefix, {
			sort:{
				"Competency":function(a, b){
					if(a == undefined)
						return true;
				
					var aId = EcRemoteLinkedData.trimVersionFromUrl(a["competency"]).split("/");
					aId = aId[aId.length -1]
					
					var bId = EcRemoteLinkedData.trimVersionFromUrl(b["competency"]).split("/");
					bId = bId[bId.length -1]
					
					if(aId > bId){
						return -1;
					}else{
						return 1;
					}
					
				}
			},
			clickDataEdit:function(datum){
				ScreenManager.changeScreen(new CompetencyViewScreen({id:datum.competency}), function(){
					ModalManager.showModal(new EditLevelModal(datum, function(){
						ScreenManager.reloadCurrentScreen();
					}));
				});
			},
			clickDataSelect:function(ev, id, datum, prefix){
				var row = $(ev.target).closest(".row");
				var aggId = row.attr("data-aggregateId");
				if(aggId == undefined)
					return;
				var aggregatedRows = row.siblings("[data-aggregateId='"+aggId+"']");
				
				if($(ev.target).is(":checked")){
					if(aggregatedRows.find(".datum-select:checked").size() == aggregatedRows.size()){
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("checked", "checked");
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("indeterminate", false);
					}else{
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("indeterminate", true);
					}
				}else{
					if(aggregatedRows.find(".datum-select:checked").size() == 0){
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").removeAttr("checked");
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("indeterminate", false);
					}else{
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("indeterminate", true);
					}
				}
			},
			moreMenuTools:function(){
				var container = $("<div></div>");
				
				el = $("<li><span><i class='fa fa-download'></i> Export</span></li>");
				
				el.click(function(){
					var selected = ViewManager.getView("#levelSearchResults").getSelected();
					
					ModalManager.showModal(new RepoExportModal(selected));
				})
				
				container.append(el);
				
				return container.contents();
			},
			aggregateDataRows:function(row, id, datum){
				var aggId;
				if($("#levelSearchResults #"+dataViewPrefix+"-sortSelect").val() == "Competency" && datum["competency"] != undefined){
					aggId = datum["competency"];
				}else{
					$("#levelSearchResults #"+dataViewPrefix+"-data").append(row);
					return;
				}
				
				EcCompetency.get(aggId, function(competency){
					var version;
					if(aggId == competency.shortId()){
						version = "";
					}else{
						version = aggId.split("/");
						version = version[version.length - 1];
					}
					
					var shortCompId = competency.shortId().split("/");
					shortCompId = shortCompId[shortCompId.length - 1];
					
					if(version != ""){
						shortCompId +="-"+version;
					}
					
					row.attr("data-aggregateId", shortCompId);
					
					var competencyRow;
					
					if($("#levelSearchResults .competencyAggregateRow[data-competencyId="+shortCompId+"]").size() == 0){
						$("#levelSearchResults #"+dataViewPrefix+"-data").append("<div class='row column competencyAggregateRow' data-competencyId='"+shortCompId+"'></div>");
						
						competencyRow = $("#levelSearchResults .competencyAggregateRow[data-competencyId='"+shortCompId+"']")
					
						competencyRow.append($("<input type='checkbox' class='datum-select'></input>)"));
						
						competencyRow.on("click", ".datum-select", function(ev){					
							if($(".dataView").find(".datum-select:checked").size() == $("#"+dataViewPrefix+"-data .row").size()){
								$(".toggleSelectData").text("Unselect All");
							}else{
								$(".toggleSelectData").text("Select All");
							}
							
							if($(ev.target).is(":checked")){
								var relationRows = competencyRow.siblings("[data-aggregateId='"+shortCompId+"']");
								
								relationRows.addClass("selected");
								relationRows.find(".datum-select").prop("checked", "checked");
								
								var selected = ViewManager.getView("#levelSearchResults").getSelected();
								
								var allOwned = true;
								for(var i in selected){
									var d = selected[i];
									if(!AppController.identityController.owns(d))
										allOwned = false;
								}
								if(allOwned){
									$("#"+dataViewPrefix+"-menu").find(".fa-group").removeClass("hide");
									$("#"+dataViewPrefix+"-menu").find(".fa-trash").removeClass("hide");
								}else{
									$("#"+dataViewPrefix+"-menu").find(".fa-group").addClass("hide");
									var admin = AppController.serverController.getAdmin();
									if(!admin){
										$("#"+dataViewPrefix+"-menu").find(".fa-trash").addClass("hide");
									}
								}
							}else{
								var relationRows = competencyRow.siblings("[data-aggregateId='"+shortCompId+"']");
								
								relationRows.removeClass("selected");
								relationRows.find(".datum-select").removeAttr("checked");
								
								var selected = ViewManager.getView("#levelSearchResults").getSelected();
								
								var allOwned = true;
								for(var i in selected){
									var d = selected[i];
									if(!AppController.identityController.owns(d))
										allOwned = false;
								}
								if(allOwned){
									$("#"+dataViewPrefix+"-menu").find(".fa-group").removeClass("hide");
									$("#"+dataViewPrefix+"-menu").find(".fa-trash").removeClass("hide");
								}
							}
							
							if($(ev.target).closest(".dataView").find(".datum-select").is(":checked")){
								$(ev.target).closest(".dataView").addClass("selecting");
								
								if(!$("#"+dataViewPrefix+"-menu").is(":visible")){
									$("#"+dataViewPrefix+"-menu").slideDown();
								}
								
								$(".dataViewMenu .dataViewSelected").text($(".dataView").find("[data-id] .datum-select:checked").size());
							}else{
								$(ev.target).closest(".dataView").removeClass("selecting");
								
								if($("#"+dataViewPrefix+"-menu").is(":visible")){
									$("#"+dataViewPrefix+"-menu").slideUp();
								}
							}
							
						});
						
						competencyRow.attr("style","padding:7px 2px;padding-left:30px;background-color:#f3f3f3;cursor:default;");
						competencyRow.append("<div class='small-9 columns'></div>");
						competencyRow.find(".small-9").append(competency["name"]);
						
						if(version != "")
							competencyRow.find(".small-9").append("<small>(Version:"+version+")</small>");
						
						competencyRow.append("<div class='small-3 columns'>"+
												"<div class='rowToolbar'>"+
												"<span class='fa-stack fa-lg dataViewBtn' style='font-size: 0.45rem;margin-right:.8rem;' title='Load All Relationships'>"+
													"<i class='fa fa-refresh fa-stack-2x' style='font-size: 3em;top: -4px;'></i>" +
													"<i class='fa fa-plus fa-stack-1x' style='top: -2px;'></i>" +
												"</span> <a style='color:inherit;'><i title='View Competency' class='fa fa-external-link dataViewBtn' style='margin-right:1rem;'></a></i>" +
												"</div>" +
											"</div>");
						
						competencyRow.find(".fa-stack").click(function(ev){
							ev.preventDefault();
							if($(this).find(".fa-plus").hasClass("hide")){
								return;
							}
							$(this).find(".fa-plus").addClass("hide");
							$(this).find(".fa-refresh").addClass("fa-spin");
								
							competency.levels(AppController.serverController.getRepoInterface(), null, function(err){
								ViewManager.getView("#levelSearchMessageContainer").displayAlert("Error getting all levels: "+err);
								competencyRow.find(".fa-refresh").removeClass("fa-spin");
								competencyRow.find(".fa-plus").removeClass("hide");
							}, function(data){
								var next = competencyRow.nextAll(".competencyAggregateRow").first();
								next.before("<div class='row column loadingRow' style='text-align:center;padding:7px 2px;font-style:italic;'>Loading...</div>")
								
								ViewManager.getView("#levelSearchResults").populate(data);
								
								competencyRow.find(".fa-stack").remove();
								competencyRow.nextAll(".loadingRow").first().remove();
								competencyRow.find(".rowToolbar").css("padding-top", "5px");
							});
							
							
						});
						
						competencyRow.find("a").attr("href", "#"+CompetencyViewScreen.prototype.getDisplayName()+"?id="+aggId);
						
						competencyRow.find("a").click(function(ev){
							ev.preventDefault();
							ScreenManager.changeScreen(new CompetencyViewScreen(competency));
							return false;
						});
					}else{
						competencyRow = $("#levelSearchResults .competencyAggregateRow[data-competencyId='"+shortCompId+"']");
					}
					
					if(competencyRow.nextAll(".competencyAggregateRow").size() > 0){
						competencyRow.nextAll(".competencyAggregateRow").first().before(row);
					}else if(competencyRow.nextAll(".row").size() > 0){
						competencyRow.nextAll(".row").last().after(row);
					}else{
						competencyRow.after(row);
					}
					
					
				}, function(err){
					ViewManager.getView("#levelSearchMessageContainer").displayAlert("Error Retrieving Aggregate Competency: "+ err);
					
					var unknownAggregateRow;
					
					if($("#levelSearchResults .competencyAggregateRow[data-competencyId=unknown]").size() == 0){
						$("#levelSearchResults #"+dataViewPrefix+"-data").prepend("<div class='row column competencyAggregateRow' data-competencyId='unknown'></div>");
						
						unknownAggregateRow = $("#levelSearchResults .competencyAggregateRow[data-competencyId='unknown']")
						
						unknownAggregateRow.append($("<input type='checkbox' class='datum-select'></input>)"));
						
						unknownAggregateRow.on("click", ".datum-select", function(ev){					
							if($(".dataView").find(".datum-select:checked").size() == $("#"+dataViewPrefix+"-data .row").size()){
								$(".toggleSelectData").text("Unselect All");
							}else{
								$(".toggleSelectData").text("Select All");
							}
							
							if($(ev.target).is(":checked")){
								var relationRows = unknownAggregateRow.siblings("[data-aggregateId='"+shortCompId+"']");
								
								relationRows.addClass("selected");
								relationRows.find(".datum-select").prop("checked", "checked");
								
								var selected = ViewManager.getView("#levelSearchResults").getSelected();
								
								var allOwned = true;
								for(var i in selected){
									var d = selected[i];
									if(!AppController.identityController.owns(d))
										allOwned = false;
								}
								if(allOwned){
									$("#"+dataViewPrefix+"-menu").find(".fa-group").removeClass("hide");
									$("#"+dataViewPrefix+"-menu").find(".fa-trash").removeClass("hide");
								}else{
									$("#"+dataViewPrefix+"-menu").find(".fa-group").addClass("hide");
									var admin = AppController.serverController.getAdmin();
									if(!admin){
										$("#"+dataViewPrefix+"-menu").find(".fa-trash").addClass("hide");
									}
								}
							}else{
								var relationRows = unknownAggregateRow.siblings("[data-aggregateId='"+shortCompId+"']");
								
								relationRows.removeClass("selected");
								relationRows.find(".datum-select").removeAttr("checked");
								
								var selected = ViewManager.getView("#levelSearchResults").getSelected();
								
								var allOwned = true;
								for(var i in selected){
									var d = selected[i];
									if(!AppController.identityController.owns(d))
										allOwned = false;
								}
								if(allOwned){
									$("#"+dataViewPrefix+"-menu").find(".fa-group").removeClass("hide");
									$("#"+dataViewPrefix+"-menu").find(".fa-trash").removeClass("hide");
								}
							}
							
							if($(ev.target).closest(".dataView").find(".datum-select").is(":checked")){
								$(ev.target).closest(".dataView").addClass("selecting");
								
								if(!$("#"+dataViewPrefix+"-menu").is(":visible")){
									$("#"+dataViewPrefix+"-menu").slideDown();
								}
								
								$(".dataViewMenu .dataViewSelected").text($(".dataView").find("[data-id] .datum-select:checked").size());
							}else{
								$(ev.target).closest(".dataView").removeClass("selecting");
								
								if($("#"+dataViewPrefix+"-menu").is(":visible")){
									$("#"+dataViewPrefix+"-menu").slideUp();
								}
							}
							
						});
						
						unknownAggregateRow.attr("style","padding:7px 2px;padding-left:30px;background-color:#f3f3f3;cursor:default;color:#f74646;font-weight:500;");
						unknownAggregateRow.append("<div class='small-12 columns'></div>");
						unknownAggregateRow.find(".small-12").append("Unknown Competency");
					}else{
						unknownAggregateRow = $("#levelSearchResults .competencyAggregateRow[data-competencyId='unknown']");
					}
					
					if(unknownAggregateRow.nextAll(".competencyAggregateRow").size() > 0){
						unknownAggregateRow.nextAll(".competencyAggregateRow").first().before(row);
					}else if(unknownAggregateRow.nextAll(".row").size() > 0){
						unknownAggregateRow.nextAll(".row").last().after(row);
					}else{
						unknownAggregateRow.after(row);
					}
				});

			},
			buildDataRow:function(row, id, datum){				
				if($("#levelSearchResults #"+dataViewPrefix+"-sortSelect").val() == "Competency" && datum["competency"] != undefined){
					row.append("<a>" +
									"<div class='small-3 columns datum-title'></div>" +
								"</a>" +
								"<div class='small-6 columns datum-description'></div>" +
								"<div class='small-3 columns datum-owner'></div>");
				}else{
					row.append("<a>" +
									"<div class='small-2 columns end datum-title'></div>" +
								"</a>" +
								"<div class='small-4 columns datum-description'></div>" +
								"<div class='small-3 columns datum-competency'></div>" +
								"<div class='small-3 columns datum-owner'></div>");
				}
				
				
				
				if(datum["owner"] == undefined || datum["owner"].length == 0){
					row.find(".datum-owner").html("Public");
				}else{
					for(var i in datum["owner"]){
						var trimId = EcRemoteLinkedData.trimVersionFromUrl(id)
						var idEnd = trimId.split("/")[trimId.split("/").length-1];
						var elId = idEnd+"-owner-"+i;
						
						var ownerEl = $("<span id='"+elId+"'></span>")
						row.find(".datum-owner").append(ownerEl);
						
						var timeoutFunc = function(){
							if($("#"+elId).size() > 0){
								ViewManager.showView(new IdentityDisplay(datum["owner"][i]), "#"+elId)
							}else{
								setTimeout(timeoutFunc, 500);
							}
						};
						
						setTimeout(timeoutFunc, 500);
						
					}
				}
				
				if(row.find(".datum-competency").size() > 0){
					EcCompetency.get(datum.competency, function(competency){
						row.find(".datum-competency").html("on <span style='font-style:italic;'></span>");
						row.find(".datum-competency span").text(competency.getName());
					}, function(){
						row.find(".datum-competency").text("Unknown Competency");
					})
					row.find(".datum-competency").text("Loading..");
				}
				
				if(datum.title != undefined && datum.title != "")
					row.find(".datum-title").text(datum.title)

				if(datum.description != undefined && datum.description != "")
					row.find(".datum-description").text(datum.description)
				
				row.find("a").click(function(ev){
					ev.preventDefault();
					ScreenManager.changeScreen(new CompetencyViewScreen({id:datum.competency}), function(){
						ModalManager.showModal(new EditLevelModal(datum, function(){
							ScreenManager.reloadCurrentScreen();
						}));
					});
				})
				
			}
		}), "#levelSearchResults");
		
		
		
		$("#levelSearchSubmit").click(function(event){
			event.preventDefault();
			runLevelSearch();
		});			
		$("#levelSearchOwnership").change(function(event){
			event.preventDefault();
			runLevelSearch();
		});

		
		$("#levelSearchText").keypress(function(e){
			var key = e.which;
			if(key == 13)  // the enter key code
			{
				runLevelSearch();
			}
		});
		
		if(query != null)
			$("#levelSearchText").val(query)
		
		if(AppController.loginController.getLoggedIn())
		{
			$("#levelSearchOwnership").attr("max", 4);
			$("#levelSearchOwnershipLoggedIn").removeClass("hide");
			$("#levelSearchOwnershipPublic").addClass("hide");
		}
		else
		{
			$("#levelSearchOwnershipLoggedIn").addClass("hide");
			$("#levelSearchOwnershipPublic").removeClass("hide");
		}
		
		if(ownership != null){
			if(ownership == "public")
				ownership = 1;
			else if(ownership == "owned")
				ownership = 3;
			else if(ownership == "me")
				ownership = 4
			
			$("#levelSearchOwnership").val(ownership);
		}
		
		runLevelSearch();
		
		ViewManager.getView("#menuContainer").showSortBasic();
		ViewManager.getView("#menuContainer").showSortByCompetency();
	};
	
	/**
	 * Overridden onClose callback, called when leaving screen
	 * 
	 * @memberOf LevelSearchScreen
	 * @method onClose
	 */
	LevelSearchScreen.prototype.onClose = function(){
		ViewManager.getView("#menuContainer").hideSort();
	}
	
	LevelSearchScreen.prototype.sortByTimestamp = function(){
		$("#levelResults-sortSelect").val("timestamp");
		$("#levelResults-sortSelect").trigger("change");
	}
	
	LevelSearchScreen.prototype.sortByOwner = function(){
		$("#levelResults-sortSelect").val("owner");
		$("#levelResults-sortSelect").trigger("change");
	}
	
	LevelSearchScreen.prototype.filterPublic = function(){
		$("#levelSearchOwnership").val(1);
		runLevelSearch();
	}
	
	LevelSearchScreen.prototype.filterAll = function(){
		$("#levelSearchOwnership").val(2);
		runLevelSearch();
	}
	
	LevelSearchScreen.prototype.filterOwned = function(){
		$("#levelSearchOwnership").val(3);
		runLevelSearch();
	}
	
	LevelSearchScreen.prototype.filterOwnedByMe = function(){
		if(!AppController.loginController.getLoggedIn()){
			return;
		}
		
		$("#levelSearchOwnership").val(4);
		runRepoSearch();
	}
	
	/**
	 * Sets the search parameters on the view, so they can be reloaded if the page is
	 * 
	 * @memberOf LevelSearchScreen
	 * @method setParams
	 * @param {Object} params
	 */
	LevelSearchScreen.prototype.setParams = function(params)
	{
		if(params == undefined){
			this.clearParams();
			return;
		}
		
		this.query = params.query;
		this.ownership = params.ownership;
	}
	
	/**
	 * Handles getting search parameters from DOM and running
	 * basic Repository search
	 * 
	 * @memberOf LevelSearchScreen
	 * @method clearParams
	 */
	LevelSearchScreen.prototype.clearParams = function(){
		this.query = undefined;
		this.ownership = undefined;
	}
	
	return LevelSearchScreen;
})(LevelSearchScreen);/**
 * Modal for authenticating a user and getting keys stored on server
 * 
 * @module cass.manager
 * @class LoginModal
 * 
 * @author devlin.junker@eduworks.com
 */
var LoginModal = (function (LoginModal) {
    var ERROR_CONTAINER_ID = "#loginError";

    /**
     * Overridden display function, called once html partial is loaded into DOM
     * 
     * @memberOf LoginModal
     * @method display
     * @param {String} containerId
     * 			The DOM ID of the Modal Container this modal is displayed in
     */
    LoginModal.prototype.display = function (containerId) {
        var loginSuccess = this.loginSuccess;

		var me = this;
        var warning = this.warning;

        ViewManager.showView(new MessageContainer("login"), "#loginMessageContainer", function () {
            if (warning != undefined)
                ViewManager.getView("#loginMessageContainer").displayWarning(warning);
        });

        if ($(AppController.serverController.serverList).size() > 0) {
            $("#loginServer").html("");
        }
        for (var serverName in AppController.serverController.serverList) {
            var serverUrl = AppController.serverController.serverList[serverName];

            var option = $("<option></option>");
            option.attr("value", serverUrl);
            option.text(serverName);

            if (serverName == AppController.serverController.selectedServerName)
                option.attr("selected", "selected")

            $("#loginServer").append(option);
        }

        $("#loginAddServer").click(function () {
            ModalManager.showModal(new AddServerModal(function () {
                ModalManager.showModal(new LoginModal());
            }));
        });

        $("#loginCreateAccount").click(function () {
            ModalManager.showModal(new CreateUserModal());
        });

        $("#loginForm").submit(function (event) {
            event.preventDefault();
        var server = $("#loginServer").val();
        var userId = $("#loginUserId").val();
        var password = $("#loginPassword").val();
			me.submitLogin(userId,password,server);
        });

        $("#loginCancel").click(function (event) {
            event.preventDefault();
            ModalManager.hideModal();
        });

        $("#loginOauth2Google").click(function (event) {
            event.preventDefault();
            me.submitOauth2("google");
        });
        var testOauth = new OAuth2FileBasedRemoteIdentityManager(
        	function(){
        		$("#oauth").show()
        	}
        );
    }

    return LoginModal;
})(LoginModal);
/**
 * View for displaying messages to the user in relation to actions they perform
 * 
 * @class MessageContainer
 * @author devlin.junker@eduworks.com
 */
var MessageContainer = (function(MessageContainer){

	/**
	 * Actually handles displaying the message and associating 
	 * the messageId in the correct container
	 * 
	 * @memberOf MessageContainer
	 * @method displayMessage
	 * @private
	 * @param {String} msg
	 * 			Message to be displayed
	 * @param {String} msgId
	 * 			Message Id associated with message
	 * @param {String} containerId
	 * 			DOM ID of the element containing this MessageContainer
	 */
	function displayMessage(msg, msgId, containerId){
		var container = $(containerId);
		
		container.attr("style", "");
		container.removeClass("hide");
		
		var identifier = msgId != undefined ? msgId : msg;
		
		var messages = $(containerId+"Messages")
		
		messages.find("[data-msg='"+identifier+"']").remove();
		
		var div = $("<div></div>");
		div.attr("data-msg", identifier);
		div.text(msg);
		
		messages.append(div);
	}
	
	/**
	 * Handles clearing the message associated with the messageId
	 * clears all messages if no msgId passed in
	 * 
	 * @memberOf MessageContainer
	 * @method clearMessage
	 * @private
	 * @param {String} containerId
	 * 			DOM ID of the element containing this MessageContainer
	 * @param {String} [optional] msgId
	 * 			Message Id associated with message to clear
	 */
	function clearMessage(containerId, msgId){
		var messages = $(containerId+"Messages");
		
		if(msgId == undefined || (messages.find("[data-msg]").size() == 1 && messages.find("[data-msg='"+msgId+"']").size() == 1)){
			hideMessageBox(containerId, function(){
				messages.html("");
			});
		}else{
			messages.find("[data-msg='"+msgId+"']").remove();
		}
			
	}
	
	/**
	 * Hides the MessageContainer from view, no matter how many messages are in it
	 * 
	 * @memberOf MessageContainer
	 * @method hideMessageBox
	 * @private
	 * @param {String} containerId
	 * 			DOM ID of the element containing this MessageContainer
	 * @param {Callback0} callback
	 * 			Callback once the MessageContainer has fully faded out
	 */
	function hideMessageBox(containerId, callback)
	{	
		var container = $(containerId);
		
		container.fadeOut({complete:function(){
			container.addClass("hide");
			container.attr("style", "");
			
			if(callback != undefined)
				callback();
		}});
	}
	
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf MessageContainer
	 * @method display
	 * @param {String} containerId
	 * 			DOM ID of the element that holds this message container
	 */
	MessageContainer.prototype.display = function(containerId)
	{	
		var prefix = this.prefix;
			
		var closeCallback = this.closeMessageCallback;
		$(containerId).find("[id]").each(function(i, e){
			$(e).attr("id", prefix+"-"+$(e).attr("id"))
		});
		
		$(containerId).find(".messageContainer").each(function(i, e){
			$(e).find('button').click(function(){
				hideMessageBox("#"+$(e).attr("id"), closeCallback);
				
			})
		});
	}
	
	/**
	 * Displays the message in the alert box of the MessageContainer
	 * 
	 * @memberOf MessageContainer
	 * @method displayAlert
	 * @param {String} msg
	 * 			Alert message to display
	 * @param {String} [optional] msgId
	 * 			ID to associate with the message for clearing later
	 */
	MessageContainer.prototype.displayAlert = function(msg, msgId){
		var containerId = "#"+this.prefix+"-"+"alertbox";
		
		displayMessage(msg, msgId, containerId);
	}
	/**
	 * Displays the message in the warning box of the MessageContainer
	 * 
	 * @memberOf MessageContainer
	 * @method displayWarning
	 * @param {String} msg
	 * 			Warning message to display
	 * @param {String} [optional] msgId
	 * 			ID to associate with the message for clearing later
	 */
	MessageContainer.prototype.displayWarning = function(msg, msgId){
		var containerId = "#"+this.prefix+"-"+"warningbox";
		
		displayMessage(msg, msgId, containerId);
	}
	/**
	 * Displays the message in the success box of the MessageContainer
	 * 
	 * @memberOf MessageContainer
	 * @method displaySuccess
	 * @param {String} msg
	 * 			Success message to display
	 * @param {String} [optional] msgId
	 * 			ID to associate with the message for clearing later
	 */
	MessageContainer.prototype.displaySuccess = function(msg, msgId){
		var containerId = "#"+this.prefix+"-"+"successbox";
		
		displayMessage(msg, msgId, containerId);
	}
	/**
	 * Displays the message in the primary box of the MessageContainer
	 * 
	 * @memberOf MessageContainer
	 * @method displayPrimary
	 * @param {String} msg
	 * 			Primary message to display
	 * @param {String} [optional] msgId
	 * 			ID to associate with the message for clearing later
	 */
	MessageContainer.prototype.displayPrimary = function(msg, msgId){
		var containerId = "#"+this.prefix+"-"+"primarybox";
		
		displayMessage(msg, msgId, containerId);
	}
	/**
	 * Displays the message in the secondary box of the MessageContainer
	 * 
	 * @memberOf MessageContainer
	 * @method displaySecondary
	 * @param {String} msg
	 * 			Secondary message to display
	 * @param {String} [optional] msgId
	 * 			ID to associate with the message for clearing later
	 */
	MessageContainer.prototype.displaySecondary = function(msg, msgId){
		var containerId = "#"+this.prefix+"-"+"secondarybox";
		
		displayMessage(msg, msgId, containerId);
	}
	
	/**
	 * Clears the message(s) in the alert box of the MessageContainer,
	 * if no msgId passed in, clears all alerts
	 * 
	 * @memberOf MessageContainer
	 * @method clearAlert
	 * @param {String} [optional] msgId
	 * 			ID of message to clear
	 */
	MessageContainer.prototype.clearAlert = function(msgId){
		var containerId = "#"+this.prefix+"-"+"alertbox";
		
		clearMessage(containerId, msgId)
	}
	/**
	 * Clears the message(s) in the warning box of the MessageContainer,
	 * if no msgId passed in, clears all warnings
	 * 
	 * @memberOf MessageContainer
	 * @method clearWarning
	 * @param {String} [optional] msgId
	 * 			ID of message to clear
	 */
	MessageContainer.prototype.clearWarning = function(msgId){
		var containerId = "#"+this.prefix+"-"+"warningbox";
		
		clearMessage(containerId, msgId)
	}
	/**
	 * Clears the message(s) in the success box of the MessageContainer,
	 * if no msgId passed in, clears all success messages
	 * 
	 * @memberOf MessageContainer
	 * @method clearSuccess
	 * @param {String} [optional] msgId
	 * 			ID of message to clear
	 */
	MessageContainer.prototype.clearSuccess = function(msgId){
		var containerId = "#"+this.prefix+"-"+"successbox";
		
		clearMessage(containerId, msgId)
	}
	/**
	 * Clears the message(s) in the primary box of the MessageContainer,
	 * if no msgId passed in, clears all primary messages
	 * 
	 * @memberOf MessageContainer
	 * @method clearPrimary
	 * @param {String} [optional] msgId
	 * 			ID of message to clear
	 */
	MessageContainer.prototype.clearPrimary = function(msgId){
		var containerId = "#"+this.prefix+"-"+"primarybox";
		
		clearMessage(containerId, msgId)
	}
	/**
	 * Clears the message(s) in the secondary box of the MessageContainer,
	 * if no msgId passed in, clears all secondary messages
	 * 
	 * @memberOf MessageContainer
	 * @method clearSecondary
	 * @param {String} [optional] msgId
	 * 			ID of message to clear
	 */
	MessageContainer.prototype.clearSecondary = function(msgId){
		var containerId = "#"+this.prefix+"-"+"secondarybox";
		
		clearMessage(containerId, msgId)
	}
	
	/**
	 * Hides the alert box of the message container
	 * 
	 * @memberOf MessageContainer
	 * @method hideAlert
	 */
	MessageContainer.prototype.hideAlert = function(){
		var containerId = "#"+this.prefix+"-"+"alertbox";
		
		hideMessageBox(containerId);
	}
	/**
	 * Hides the warning box of the message container
	 * 
	 * @memberOf MessageContainer
	 * @method hideWarning
	 */
	MessageContainer.prototype.hideWarning = function(msg, msgId){
		var containerId = "#"+this.prefix+"-"+"warningbox";
		
		hideMessageBox(containerId);
	}
	/**
	 * Hides the success box of the message container
	 * 
	 * @memberOf MessageContainer
	 * @method hideSuccess
	 */
	MessageContainer.prototype.hideSuccess = function(msg, msgId){
		var containerId = "#"+this.prefix+"-"+"successbox";
		
		hideMessageBox(containerId);
	}
	/**
	 * Hides the primary box of the message container
	 * 
	 * @memberOf MessageContainer
	 * @method hidePrimary
	 */
	MessageContainer.prototype.hidePrimary = function(msg, msgId){
		var containerId = "#"+this.prefix+"-"+"primarybox";
		
		hideMessageBox(containerId);
	}
	/**
	 * Hides the secondary box of the message container
	 * 
	 * @memberOf MessageContainer
	 * @method hideSecondary
	 */
	MessageContainer.prototype.hideSecondary = function(msg, msgId){
		var containerId = "#"+this.prefix+"-"+"secondarybox";
		
		hideMessageBox(containerId);
	}
	
	return MessageContainer;
})(MessageContainer);/**
 * Generic Modal to show a message to a user with an 'Ok' button
 * 
 * @module cass.manager
 * @class MessageModal
 * 
 * @author devlin.junker@eduworks.com
 */
var MessageModal = (function(MessageModal){	
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf MessageModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	MessageModal.prototype.display = function(containerId)
	{
		var okCallback = this.okCallback;
		
		$("#messageHeader").html(this.header);
		$("#messageText").html(this.message);
		if(this.message == "" || this.message == undefined){
			$("#messageText").css("margin-bottom", "0px");
			$("#okBtn").css("margin-top", "0px");
		}
		
		$("#okBtn").click(function(event){
			if(okCallback != undefined)
				okCallback();
			ModalManager.hideModal();
		});
		
	}
	
	return MessageModal;
})(MessageModal);/**
 * Modal used to propagate permissions down the child objects in another object
 * 
 * @module cass.manager
 * @class PermissionPropagationModal
 * 
 * @author devlin.junker@eduworks.com
 */
var PermissionPropagationModal = (function(PermissionPropagationModal){	
	
	/**
	 * Displays the objects of the framework that will be changed and any
	 * issues with trying to propagate the permissions
	 * 
	 * @memberOf PermissionPropagationModal
	 * @method setupFrameworkDisplay
	 * @private
	 * @param {EcFramework} data
	 * 			EcFramework to propagate permissions from 
	 */
	function setupFrameworkDisplay(framework){
		var closeModal = true;
		
		var div = $("<div class='row columns'></div>");
		
		div.append("<div id='resultsList' class='row' style='border: 1px solid lightgrey; overflow-y:scroll;padding:0.3rem;height:8rem;'></div>")
		
		$("#propagateResultsDisplay").append(div);
		
		if(framework.competency != undefined && framework.competency.length > 0){
			$("#resultsList").append("<div id='competencyOptGroup' class='small-12 columns'><span class='prefix'>Competencies</span></div>");
			for(var idx in framework.competency){
				closeModal = false;
				EcCompetency.get(framework.competency[idx], function(data){
					var display = $("<div class='row'></div>")
				
					var col1 = $("<div class='small-1 columns'></div>");
					
					if(AppController.identityController.owns(data)){
						col1.prepend("<i class='fa fa-check' style='color:lightgreen;margin-top:0.25rem;'></i>");
						display.attr("title", "Permissions will be changed to match")
					}else if(AppController.identityController.canEdit(data)){
						col1.prepend("<i class='fa fa-minus' style='color:lightblue;margin-top:0.25rem;'></i>")
						display.attr("title", "Publicly owned, permissions will remain unchanged, but still editable by anyone")
						
						ViewManager.getView("#propagateMessageContainer").displayPrimary("One or more of the objects contained is publicly owned and permissions will not be affected", "publicObject");
					}else{
						col1.prepend("<i class='fa fa-times' style='color:red;margin-top:0.25rem;'></i>")
						display.attr("title", "Not owned by you, cannot change permissions")
						
						ViewManager.getView("#propagateMessageContainer").displayAlert("You are not allowed to modify the permissions on one or more of the objects contained", "noPropagation");
					}
					display.append(col1);
					
					var col2 = $("<div class='small-11 columns'></div>");
					col2.text(data.name);
					display.append(col2);
					
					$("#competencyOptGroup").append(display)
				}, function(err){
					displayAlert(err);
				});
			}
		}
		
		if(framework.relation != undefined && framework.relation.length > 0){
			$("#resultsList").append("<div id='relationsOptGroup' class='small-12 columns'><span class='prefix'>Relationships</span></div>");
			
			for(var idx in framework.relation){
				closeModal = false;
				EcAlignment.get(framework.relation[idx], function(data){
					EcCompetency.get(data.source, function(source){
						EcCompetency.get(data.target, function(target){
							var display = $("<div class='row'></div>")
							
							var col1 = $("<div class='small-1 columns'></div>");
							
							if(AppController.identityController.owns(data)){
								col1.prepend("<i class='fa fa-check' style='color:lightgreen;margin-top:0.25rem;'></i>");
								display.attr("title", "Permissions will be changed to match")
							}else if(AppController.identityController.canEdit(data)){
								col1.prepend("<i class='fa fa-minus' style='color:lightblue;margin-top:0.25rem;'></i>")
								display.attr("title", "Publicly owned, permissions will remain unchanged, but still editable by anyone")
								
								ViewManager.getView("#propagateMessageContainer").displayPrimary("One or more of the objects contained is publicly owned and permissions will not be affected", "publicObject");
							}else{
								col1.prepend("<i class='fa fa-times' style='color:red;margin-top:0.25rem;'></i>")
								display.attr("title", "Not owned by you, cannot change permissions")
								
								ViewManager.getView("#propagateMessageContainer").displayAlert("You are not allowed to modify the permissions on one or more of the objects contained", "noPropagation");
							}
							display.append(col1);
							
							
							var typeDisplay = AppSettings.relationTypes[data.relationType];
							if(typeDisplay == undefined){
								typeDisplay = data.relationType.split(/(?=[A-Z])/).join(" ");
							}
							
							var col2 = $("<div class='small-11 columns'></div>");
							col2.text(source.name+" "+typeDisplay+" "+target.name);
							display.append(col2);
							
							$("#relationsOptGroup").append(display)
						}, function(err){
							displayAlert(err)
						});
					}, function(err){
						displayAlert(err)
					});
					
				}, function(err){
					displayAlert(err);
				});
			}
		}
		
		if(framework.level != undefined && framework.level.length > 0){
			$("#resultsList").append("<div id='levelsOptGroup' class='small-12 columns'><span class='prefix'>Levels</span></div>");
			
			for(var idx in framework.level){
				closeModal = false;
				EcLevel.get(framework.level[idx], function(data){
					EcCompetency.get(data.competency, function(comp){
						var display = $("<div class='row'></div>")
						
						var col1 = $("<div class='small-1 columns'></div>");
						
						if(AppController.identityController.owns(data)){
							col1.prepend("<i class='fa fa-check' style='color:lightgreen;margin-top:0.25rem;'></i>");
							display.attr("title", "Permissions will be changed to match")
						}else if(AppController.identityController.canEdit(data)){
							col1.prepend("<i class='fa fa-minus' style='color:lightblue;margin-top:0.25rem;'></i>")
							display.attr("title", "Publicly owned, permissions will remain unchanged, but still editable by anyone")
							
							ViewManager.getView("#propagateMessageContainer").displayPrimary("One or more of the objects contained is publicly owned and permissions will not be affected", "publicObject");
						}else{
							col1.prepend("<i class='fa fa-times' style='color:red;margin-top:0.25rem;'></i>")
							display.attr("title", "Not owned by you, cannot change permissions")
							
							ViewManager.getView("#propagateMessageContainer").displayAlert("You are not allowed to modify the permissions on one or more of the objects contained", "noPropagation");
						}
						display.append(col1);
						
						var col2 = $("<div class='small-11 columns'></div>");
						col2.text(comp.name +" : "+data.name)
						display.append(col2);
						
						$("#levelsOptGroup").append(display)
					}, function(err){
						displayAlert(err);
					})
				}, function(err){
					displayAlert(err);
				});
			}
		}
		
		if(framework.rollupRule != undefined && framework.rollupRule.length > 0){
			$("#resultsList").append("<div id='rulesOptGroup' class='small-12 columns'><span class='prefix'>Rollup Rules</span></div>");
			
			for(var idx in framework.rollupRule){
				closeModal = false;
				EcRollupRule.get(framework.rollupRule[idx], function(data){
					EcCompetency.get(data.competency, function(comp){
						var display = $("<div class='row'></div>")
						
						var col1 = $("<div class='small-1 columns'></div>");
						
						if(AppController.identityController.owns(data)){
							col1.prepend("<i class='fa fa-check' style='color:lightgreen;margin-top:0.25rem;'></i>");
							display.attr("title", "Permissions will be changed to match")
						}else if(AppController.identityController.canEdit(data)){
							col1.prepend("<i class='fa fa-minus' style='color:lightblue;margin-top:0.25rem;'></i>")
							display.attr("title", "Publicly owned, permissions will remain unchanged, but still editable by anyone")
							
							ViewManager.getView("#propagateMessageContainer").displayPrimary("One or more of the objects contained is publicly owned and permissions will not be affected", "publicObject");
						}else{
							col1.prepend("<i class='fa fa-times' style='color:red;margin-top:0.25rem;'></i>")
							display.attr("title", "Not owned by you, cannot change permissions")
							
							ViewManager.getView("#propagateMessageContainer").displayAlert("You are not allowed to modify the permissions on one or more of the objects contained", "noPropagation");
						}
						display.append(col1);
						
						var col2 = $("<div class='small-11 columns'></div>");
						col2.text(comp.name+" : "+data.name)
						display.append(col2);
						
						$("#rulesOptGroup").append(display)
					}, function(err){
						displayAlert(err);
					});
					
				}, function(err){
					displayAlert(err);
				});
			}
		}
		
		if(closeModal)
			setTimeout(function(){
				ModalManager.hideModal();
			}, 100);
	}
	
	/**
	 * Does the legwork of copying permissions to all objects allowed
	 * 
	 * @memberOf PermissionPropagationModal
	 * @method populateFrameworkChanges
	 * @private
	 * @param {EcFramework} data
	 * 			EcFramework to propagate permissions from 
	 */
	function propagateFrameworkChanges(framework){
		var total = 0;
		var saved = {};
		var oldEOS = {};
		var failed = 0;
		
		if(framework.competency != undefined && framework.competency.length > 0){
			total += framework.competency.length;
			for(var idx in framework.competency){
				EcCompetency.get(framework.competency[idx], function(data){
					if(AppController.identityController.owns(data)){
						var old = new EcRemoteLinkedData();
						old.copyFrom(data);
						oldEOS[data.id] = EcEncryptedValue.encryptOnSave(data.id);
						
						data.owner = framework.owner;
						EcEncryptedValue.encryptOnSave(data.id, EcEncryptedValue.encryptOnSave(framework.id));
						data.reader = framework.reader;
						
						// Only attempt propagation if it has not failed on other objects yet
						if(failed == 0){
							data.save(function(){
								if(failed == 0){
									saved[data.id] = old;
									
									if(Object.keys(saved).length == total){
										ModalManager.hideModal();
										ScreenManager.getCurrentScreen().displaySuccess("Successfully propagated changes to referenced objects")
									}else{
										ViewManager.getView("#propagateProgressMessageContainer").displaySuccess(total+" objects saved", "saved");
									}
								}else{
									data.owner = old.owner;
									data.reader = old.reader
									EcEncryptedValue.encryptOnSave(data.id, oldEOS[data.id]);
									
									data.save(function(){
										delete saved[data.id];
										if(Object.keys(saved).length == 0){
											
										}
									}, function(){
										delete saved[data.id];
										if(Object.keys(saved).length == 0){
											
										}
									});	
									
									for(var id in saved){
										
									}
								}
								
							}, function(){
								failed++;
								
								ViewManager.getView("#propagateProgressMessageContainer").displaySuccess(total+" objects failed", "failed")
							});
						}
						
					}else{
						total--;
					}
				});
			}
		}
		
		if(framework.relation != undefined && framework.relation.length > 0){
			total += framework.relation.length;
			for(var idx in framework.relation){
				EcAlignment.get(framework.relation[idx], function(data){
					if(AppController.identityController.owns(data)){
						var old = new EcRemoteLinkedData();
						old.copyFrom(data);
						oldEOS[data.id] = EcEncryptedValue.encryptOnSave(data.id);
						
						data.owner = framework.owner;
						EcEncryptedValue.encryptOnSave(data.id, EcEncryptedValue.encryptOnSave(framework.id));
						data.reader = framework.reader;
						
						// Only attempt propagation if it has not failed on other objects yet
						if(failed == 0){
							data.save(function(){
								if(failed == 0){
									saved[data.id] = old;
									
									if(Object.keys(saved).length == total){
										ModalManager.hideModal();
										ScreenManager.getCurrentScreen().displaySuccess("Successfully propagated changes to referenced objects")
									}else{
										ViewManager.getView("#propagateProgressMessageContainer").displaySuccess(total+" objects saved", "saved");
									}
								}else{
									data.owner = old.owner;
									data.reader = old.reader
									EcEncryptedValue.encryptOnSave(data.id, oldEOS[data.id]);
									
									data.save(function(){
										delete saved[data.id];
										if(Object.keys(saved).length == 0){
											
										}
									}, function(){
										delete saved[data.id];
										if(Object.keys(saved).length == 0){
											
										}
									});	
									
									for(var id in saved){
										
									}
								}
								
							}, function(){
								failed++;
								
								ViewManager.getView("#propagateProgressMessageContainer").displaySuccess(total+" objects failed", "failed")
							});
						}
						
					}else{
						total--;
					}
				});
			}
		}
		
		if(framework.level != undefined && framework.level.length > 0){
			total += framework.level.length;
			for(var idx in framework.level){
				EcLevel.get(framework.level[idx], function(data){
					if(AppController.identityController.owns(data)){
						var old = new EcRemoteLinkedData();
						old.copyFrom(data);
						oldEOS[data.id] = EcEncryptedValue.encryptOnSave(data.id);
						
						data.owner = framework.owner;
						EcEncryptedValue.encryptOnSave(data.id, EcEncryptedValue.encryptOnSave(framework.id));
						data.reader = framework.reader;
						
						// Only attempt propagation if it has not failed on other objects yet
						if(failed == 0){
							data.save(function(){
								if(failed == 0){
									saved[data.id] = old;
									
									if(Object.keys(saved).length == total){
										ModalManager.hideModal();
										ScreenManager.getCurrentScreen().displaySuccess("Successfully propagated changes to referenced objects")
									}else{
										ViewManager.getView("#propagateProgressMessageContainer").displaySuccess(total+" objects saved", "saved");
									}
								}else{
									data.owner = old.owner;
									data.reader = old.reader
									EcEncryptedValue.encryptOnSave(data.id, oldEOS[data.id]);
									
									data.save(function(){
										delete saved[data.id];
										if(Object.keys(saved).length == 0){
											
										}
									}, function(){
										delete saved[data.id];
										if(Object.keys(saved).length == 0){
											
										}
									});	
									
									for(var id in saved){
										
									}
								}
								
							}, function(){
								failed++;
								
								ViewManager.getView("#propagateProgressMessageContainer").displaySuccess(total+" objects failed", "failed")
							});
						}
						
					}else{
						total--;
					}
				});
			}
		}
		
		if(framework.rollupRule != undefined && framework.rollupRule.length > 0){
			total += framework.rollupRule.length;
			for(var idx in framework.rollupRule){
				EcRollupRule.get(framework.rollupRule[idx], function(data){
					if(AppController.identityController.owns(data)){
						var old = new EcRemoteLinkedData();
						old.copyFrom(data);
						oldEOS[data.id] = EcEncryptedValue.encryptOnSave(data.id);
						
						data.owner = framework.owner;
						EcEncryptedValue.encryptOnSave(data.id, EcEncryptedValue.encryptOnSave(framework.id));
						data.reader = framework.reader;
						
						// Only attempt propagation if it has not failed on other objects yet
						if(failed == 0){
							data.save(function(){
								if(failed == 0){
									saved[data.id] = old;
									
									if(Object.keys(saved).length == total){
										ModalManager.hideModal();
										ScreenManager.getCurrentScreen().displaySuccess("Successfully propagated changes to referenced objects")
									}else{
										ViewManager.getView("#propagateProgressMessageContainer").displaySuccess(total+" objects saved", "saved");
									}
								}else{
									ViewManager.getView("#propagateMessageContainer").displayAlert("Failed to Propagate. Tried rolling back changes..", "rollback");
									
									data.owner = old[data.id].owner;
									data.reader = old[data.id].reader
									EcEncryptedValue.encryptOnSave(data.id, oldEOS[data.id]);
									
									data.save(function(){}, function(){
										ViewManager.getView("#propagateMessageContainer").displayAlert("Failed to Propagate. Failed to roll back.", "rollback");
									});	
									
									for(var id in saved){
										EcRepository.get(id, function(data){
											data.owner = old[data.id].owner;
											data.reader = old[data.id].reader
											EcEncryptedValue.encryptOnSave(data.id, oldEOS[data.id]);
											
											data.save(function(){
												delete saved[data.id];
												if(Object.keys(saved).length == 0){
													ViewManager.getView("#propagateMessageContainer").displaySuccess("Successfully rolled back propagation");
												}
											}, function(){
												delete saved[data.id];
												if(Object.keys(saved).length == 0){
													ViewManager.getView("#propagateMessageContainer").displaySuccess("Successfully rolled back propagation");
												}
											});	
										}, function(){
											ViewManager.getView("#propagateMessageContainer").displayAlert("Failed to Propagate. Failed to roll back.", "rollback");
										})
									}
								}
								
							}, function(){
								failed++;
								
								ViewManager.getView("#propagateProgressMessageContainer").displaySuccess(total+" objects failed", "failed")
							});
						}
					}else{
						total--;
					}
				});
			}
		}
	}
	
	/**
	 * Shows an alert message in the message Container
	 * 
	 * @memberOf PermissionPropagationModal
	 * @method displayAlertMessage
	 * @private
	 * @param {String} msg
	 * 			Alert message to display
	 */
	function displayAlert(msg){
		ViewManager.getView("#propagateMessageContainer").displayAlert(msg);
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf PermissionPropagationModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	PermissionPropagationModal.prototype.display = function(containerId)
	{
		var data = this.data;
		
		var onCancel = this.onCancel;
		
		ViewManager.showView(new MessageContainer("propagate"), "#propagateMessageContainer");
		ViewManager.showView(new MessageContainer("propagateProgress"), "#propagateProgressMessageContainer");
		
		$("#propagateConfirmBtn").click(function(event){
			var prop = true;
			if(data.owner == null || data.owner.length == 0){
				prop = confirm("Are you sure that you would like to make all of these objects public?");
			}else if (!AppController.identityController.owns(data)){
				prop = confirm("Are you sure that you would like to remove your ownership from all of these objects?");
			}
			
			if(prop){
				if(data.isAny(new EcFramework().getTypes())){
					propagateFrameworkChanges(data);
				}
			}
		});
		
		$("#propagateCancelBtn").click(function(event){
			ModalManager.hideModal();
			if(onCancel != undefined)
				onCancel();
		});
	
		if(this.data.isAny(new EcFramework().getTypes())){
			setupFrameworkDisplay(this.data);
		}
	}
	
	
	
	return PermissionPropagationModal;
})(PermissionPropagationModal);/**
 * Screen that handles editing a relationship in a form
 * 
 * @module cass.manager
 * @class RelationshipEditScreen
 * 
 * @author devlin.junker@eduworks.com
 */
RelationshipEditScreen = (function(RelationshipEditScreen){

	var currentRelation = null;
	
	/**
	 * Builds the competency selectors on the relationship edit form
	 * 
	 * @memberOf RelationshipEditScreen
	 * @method buildCompetencyInput
	 * @private 
	 * @param {EcCompetency[]} results
	 * 			list of competencies from competency search
	 */
	function buildCompetencyInput(results){
        $("#relationEditSource").html("<option selected disabled='disabled' class='hide'>Select Source Competency</option>");
        $("#relationEditTarget").html("<option selected disabled='disabled' class='hide'>Select Target Competency</option>");
        for (var i = 0;i < results.length;i++)
        {
            var competency = results[i];
            $("#relationEditSource").append("<option/>");
            $("#relationEditSource").children("option").last().attr("value",EcRemoteLinkedData.trimVersionFromUrl(competency.id)).text(competency.getName());               
            $("#relationEditTarget").append("<option/>");
            $("#relationEditTarget").children("option").last().attr("value",EcRemoteLinkedData.trimVersionFromUrl(competency.id)).text(competency.getName());
            if (currentRelation != null)
            {
                if (competency.isId(currentRelation.source))
                {
                    $("#relationEditSource").children("option").last().attr("selected",true);
                    relationEditSourceSelected();
                }
                if (competency.isId(currentRelation.target))
                {
                    $("#relationEditTarget").children("option").last().attr("selected",true);
                    relationEditTargetSelected();
                }
            }
        }
	}
	
	/**
	 * Builds the relationType selectors on the relationship edit form
	 * 
	 * @memberOf RelationshipEditScreen
	 * @method buildRelationTypeInput
	 * @private 
	 * @param {EcAlignment} relation
	 * 			relation that we are currently editing, to set the option selected attribute
	 */
	function buildRelationTypeInput(relation){
		for (var type in AppSettings.relationTypes){
			$("#relationEditType").append("<option value='"+type+"'>"+AppSettings.relationTypes[type]+"</option>")
		}
		
		if(relation != null && relation.relationType != null && relation.relationType != ""){
			var currentOption = $("#relationEditType option[value='"+relation.relationType+"']");
			if(currentOption.size() > 0){
				currentOption.attr("selected", "selected");
			}else{
				var typeDisplay = relation.relationType.split(/(?=[A-Z])/).join(" ");
				
				$("#relationEditType").append("<option value='"+relation.relationType+"'>"+typeDisplay+"</option>")
			}
		}
	}
	
	/**
	 * Starts to populate the disabled source fields in the form, asks for the
	 * source competency info from the server
	 * 
	 * @memberOf RelationshipEditScreen
	 * @method relationEditSourceSelected
	 * @private 
	 */
	function relationEditSourceSelected()
	{ 
		ViewManager.getView("#relationshipEditMessageContainer").clearAlert("populateFail");
		EcCompetency.get($("#relationEditSource option:selected").attr("value"), relationEditPopulateSource, errorPopulatingDetails);
	}

	/**
	 * Starts to populate the disabled target fields in the form, asks for the
	 * target competency info from the server
	 * 
	 * @memberOf RelationshipEditScreen
	 * @method relationEditTargetSelected
	 * @private 
	 */
	function relationEditTargetSelected()
	{ 
		ViewManager.getView("#relationshipEditMessageContainer").clearAlert("populateFail");
	    EcCompetency.get($("#relationEditTarget option:selected").attr("value"), relationEditPopulateTarget, errorPopulatingDetails);
	}
	
	/**
	 * Populates the disabled source fields
	 * 
	 * @memberOf RelationshipEditScreen
	 * @method relationEditPopulateSource
	 * @private 
	 * @param {EcCompetency} competency
	 * 			Competency to display details of
	 */
	function relationEditPopulateSource(competency)
	{
	    $("#relationEditSourceId").val(competency.shortId());
	    $("#relationEditSourceName").val(competency.getName());
	    $("#relationEditSourceDescription").val(competency.getDescription());
	    $("#relationEditSourceScope").val(competency.scope);
	}
	
	/**
	 * Populates the disabled target fields
	 * 
	 * @memberOf RelationshipEditScreen
	 * @method relationEditPopulateTarget
	 * @private
	 * @param {EcCompetency} competency
	 * 			Competency to display details of 
	 */
	function relationEditPopulateTarget(competency)
	{
	    $("#relationEditTargetId").val(competency.shortId());
	    $("#relationEditTargetName").val(competency.getName());
	    $("#relationEditTargetDescription").val(competency.getDescription());
	    $("#relationEditTargetScope").val(competency.scope);
	}
	
	/**
	 * Populates the rest of the relationship fields
	 * 
	 * @memberOf RelationshipEditScreen
	 * @method relationshipEditActual
	 * @private 
	 * @param {EcAlignment} relation
	 * 			relationship details to display
	 */
	function relationshipEditActual(relation)
	{
	    $('.topLevel').hide();
	    currentRelation = relation;
	    
	    buildRelationTypeInput(relation);
	    
	    $("#relationEditId").val(relation.id);
	    $("#relationEditName").val(relation.name);
	    $("#relationEditDescription").val(relation.description);
	    $('#relationEditor').show();
	    relationshipCompetencySearch();
	    
	    if(relation.owner != undefined && relation.owner.length > 0)
	    {
	    	$("#relationEditOwner").html("");
	    	for(var i = 0; i < relation.owner.length; i++)
	    	{
	    		if(i > 0)
	    			$("#relationEditOwner").append(", ");
	    		
	    		var pem = relation.owner[i];
	    		$("#relationEditOwner").append("<span id='relation-owner-"+i+"'></span>");
                
                ViewManager.showView(new IdentityDisplay(pem), "#relation-owner-"+i);  
	    	}
	    }
	    else
	    {
	    	$("#relationEditOwner").text("Public")
	    	$("#relationEditOwnerAdvanced").hide();
	    }
	    
	    if(EcEncryptedValue.encryptOnSave(relation.id)){
			if($("#privateRow").css("display") == "none")
				$("#privateRow").slideDown();
			
			if(relation.reader != undefined && relation.reader.length != 0)
		    {
		    	$("#relationEditNoReaders").addClass("hide");
		    	$("#relationEditReaders").html("");
		    	for(var i = 0; i < relation.reader.length; i++)
		    	{
		    		var pk = relation.reader[i];
		    		
		    		$("#relationEditReaders").append("<span id='relation-reader-'"+i+"></span>");
	                
	                ViewManager.showView(new IdentityDisplay(pk), "#relation-reader-"+i);             
		    		
		    		if(i < relation.reader.length-1)
		    			$("#relationEditReaders").append(", ");
		    	}
		    }else{
		    	$("#relationEditNoReaders").removeClass("hide");
		    }
			
		}else if($("#privateRow").css("display") != "none"){
			$("#privateRow").slideUp();
		}
	}
	
	/**
	 * Handles starting the competency search to build competency selects
	 * 
	 * @memberOf RelationshipEditScreen
	 * @method relationshipCompetencySearch
	 * @private 
	 */
	function relationshipCompetencySearch()
	{
		ViewManager.getView("#relationshipEditMessageContainer").clearAlert("competencyFindFail");
		EcCompetency.search(AppController.serverController.getRepoInterface(), "*", buildCompetencyInput, errorRetrievingCompetencies);
	}

	/**
	 * Handles displaying errors while retrieving the details of competencies
	 * selected in the source/target selects
	 * 
	 * @memberOf RelationshipEditScreen
	 * @method errorPopulatingDetails
	 * @private 
	 * @param {String} err
	 * 			Error message to display
	 */
	function errorPopulatingDetails(err){
		if(err == undefined)
			err = "Unable to Connect to Server to Populate Competency Details";
		ViewManager.getView("#relationshipEditMessageContainer").displayAlert(err,"populateFail");
	}
	
	/**
	 * Handles displaying errors while searching for competencies to
	 * put in source/target selects
	 * 
	 * @memberOf RelationshipEditScreen
	 * @method errorRetrievingCompetencies
	 * @private 
	 * @param {String} err
	 * 			Error message to display
	 */
	function errorRetrievingCompetencies(err){
		if(err == undefined)
			err = "Unable to Connect to Server to Retrieve List of Competencies";
		ViewManager.getView("#relationshipEditMessageContainer").displayAlert(err, "competencyFindFail");
	}
	
	/**
	 * Handles displaying errors while saving relation
	 * 
	 * @memberOf RelationshipEditScreen
	 * @method errorSaving
	 * @private 
	 * @param {String} err
	 * 			Error message to display
	 */
	function errorSaving(err){
		if(err == undefined)
			err = "Unable to Connect to Server to Save Relationship";
		ViewManager.getView("#relationshipEditMessageContainer").displayAlert(err, "saveFail");
	}
	
	/**
	 * Handles displaying errors while retrieving competency
	 * 
	 * @memberOf RelationshipEditScreen
	 * @method errorRetrieving
	 * @private 
	 * @param {String} err
	 * 			Error message to display
	 */
	function errorRetrieving(err){
		if(err == undefined)
			err = "Unable to Connect to Server to Retrieve Relationship";
		ViewManager.getView( "#relationshipEditMessageContainer").displayAlert(err);
	}
	
	
	
	var NEW_RELATION_NAME = "";
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf RelationshipEditScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
	RelationshipEditScreen.prototype.display = function(containerId)
	{
		var data = this.data;
		
		if(data != undefined && data.id != undefined)
		{
			ScreenManager.setScreenParameters({"id":data.id} )
		}else if(data != undefined && data.source != undefined){
			ScreenManager.setScreenParameters({"source":data.source} )
		}else if(data != undefined && data.target != undefined){
			ScreenManager.setScreenParameters({"target":data.target} )
		}
		
		ViewManager.showView(new MessageContainer("relationshipEdit"), "#relationshipEditMessageContainer", function(){
			if(data.name == "_New Relation" && AppController.identityController.selectedIdentity == undefined)
			{
				ViewManager.getView("#relationshipEditMessageContainer").displayWarning("You are Creating a Public Relationship, this relationship can be modified by anyone");	
			}
		});
		
		if(data != undefined && data.id != undefined)
		{
			EcAlignment.get(data.id, function(relation){
				data = relation;
				relationshipEditActual(data);
			}, errorRetrieving);
		}
		else if(data != undefined && data.source != undefined)
		{
			var source = data.source
			data = new EcAlignment();
		    data.generateId(AppController.serverController.getRepoInterface().selectedServer);
		    data.name = NEW_RELATION_NAME;
		    data.source = source;
		    if(AppController.identityController.selectedIdentity != undefined)
		    	data.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
		    
		    relationshipEditActual(data);
		}
		else if(data != undefined && data.target != undefined)
		{
			var target = data.target
			data = new EcAlignment();
		    data.generateId(AppController.serverController.getRepoInterface().selectedServer);
		    data.name = NEW_RELATION_NAME;
		    data.target = target;
		    if(AppController.identityController.selectedIdentity != undefined)
		    	data.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
		    
		    relationshipEditActual(data);
		}
		else
		{
			data = new EcAlignment();
		    data.generateId(AppController.serverController.getRepoInterface().selectedServer);
		    data.name = NEW_RELATION_NAME;
		    if(AppController.identityController.selectedIdentity != undefined)
		    	data.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
		    
		    relationshipEditActual(data);
		    	
		}
		
		relationshipCompetencySearch();

		$("#relationEditSource").change(relationEditSourceSelected);
		$("#relationEditTarget").change(relationEditTargetSelected);
		
		$("#relationshipEditCancelBtn").click(function(event){
			event.preventDefault();
			ScreenManager.changeScreen(new RelationshipViewScreen(data))
		});
		
		if(data.name == NEW_RELATION_NAME){
			$("#relationshipEditDeleteBtn").remove();	
		}else{
			$("#relationshipEditDeleteBtn").click(function(event){
				event.preventDefault();
				
				ModalManager.showModal(new ConfirmModal(function(){
					data._delete(function(){
						ScreenManager.changeScreen(new RelationshipSearchScreen());
					}, function(err){
						if(err == undefined)
							err = "Unable to connect to server to delete relationship";
						ViewManager.getView("#relationshipEditMessageContainer").displayAlert(err)
					});
					ModalManager.hideModal();
				}, "Are you sure you want to delete this relationship?"));
			})
		}
		
		$("#relationshipEditSaveBtn").click(function(ev){
			ev.preventDefault();
			
			var name = $("#relationEditName").val();
			
		    
			data.source = $("#relationEditSource option:selected").val();
		    if(data.source == "")
		    {
		    	ViewManager.getView("#relationshipEditMessageContainer").displayAlert("Cannot Create Relation without Source Competency Specified");
				return;
		    }
		    
		    data.target = $("#relationEditTarget option:selected").val();
		    if(data.target == "")
		    {
		    	ViewManager.getView("#relationshipEditMessageContainer").displayAlert("Cannot Create Relation without Target Competency Specified");
				return;
		    }
		    
		    data.name = name;
		    data.description = $("#relationEditDescription").val();
		    data.relationType = $("#relationEditType option:selected").attr("value");
		    
		    ViewManager.getView("#relationshipEditMessageContainer").clearAlert("saveFail");
		    currentRelation.save(function(){
		    	EcCompetency.get(data.source, function(competency){
		    		ScreenManager.changeScreen(new RelationshipViewScreen(currentRelation));
		    	});
		    }, errorSaving);
		});
		
		$("#relationEditOwnerAdvanced").click(function(ev){
			ev.preventDefault();
			
			data.name = $("#relationEditName").val();
			data.description = $("#relationEditDescription").val();
			
			ModalManager.showModal(new AdvancedPermissionsModal(data, function(dataAfter){
				data.owner = dataAfter.owner;
				data.reader = dataAfter.reader;
				
				relationshipEditActual(data);
				
				ModalManager.hideModal();
			}))
		})
			
	};
	
	return RelationshipEditScreen;
})(RelationshipEditScreen);/**
 * Screen that handles displaying search results of relationships
 * 
 * @module cass.manager
 * @class RelationshipSearchScreen
 * 
 * @author devlin.junker@eduworks.com
 */
RelationshipSearchScreen = (function(RelationshipSearchScreen){
	
	var maxLength = 24;
	
	var inverseTypes = {
		isEnabledBy:"Enables",
		requires:"is Required By",
		desires:"is Desired By",
		narrows:"is Narrowed By",
		isRelatedTo:"is Related To",
		isEquivalentTo:"is Equivalent To"
	}
	
	var searchHandle = null;
	
	/**
	 * Handles getting search params from DOM and initiating search request
	 * 
	 * @memberOf RelationshipSearchScreen
	 * @method runRelationshipSearch 
	 * @private
	 * @param {int} start 
	 * 			index to start search (number of results already displayed)
	 */
	function runRelationshipSearch(start){
		var query = $("#relationshipSearchText").val();

		if (query == null || query == "")
			query = "*";
		if (searchHandle != null)
			clearTimeout(searchHandle);
		
		var ownership = $("#relationshipSearchOwnership").val();
		if(ownership == 1)
			ownership = "public";
		else if(ownership == 3)
			ownership = "owned";
		else if(ownership == 4)
			ownership = "me"
		else
			ownership = "all";
		
		var callback;
		if(start == undefined)
			callback = clearDisplayResults;
		else
			callback = displayResults;
		
		searchHandle = setTimeout(function() {
			var urlParams = {};
			if(window.location.hash.split("?").length > 1){
				var hashSplit = window.location.hash.split(/[?&]/)
				for(var i = 1; i < hashSplit.length; i++){
					var paramSplit = hashSplit[i].split("=");
					if(paramSplit.length == 2)
						urlParams[paramSplit[0]] = paramSplit[1]; 
				}
			}
			if(query != "*")
				urlParams.query = query;
			if(ownership != "all")
				urlParams.ownership = ownership;
			
			if(Object.keys(urlParams).length > 0){
				ScreenManager.setScreenParameters(urlParams);
				ScreenManager.getCurrentScreen().setParams(urlParams);
			}else{
				ScreenManager.setScreenParameters(null);
				ScreenManager.getCurrentScreen().clearParams();
			}
			
			ViewManager.getView("#relationshipSearchMessageContainer").clearAlert("searchFail");
			//ViewManager.getView("#relationshipSearchResults").showProgressMessage();
			ViewManager.getView("#relationshipSearchResults").deselectAll();
			
			var params = {};
			params.ownership = ownership;
			params.size = maxLength;
			params.start = start;
			
			EcAlignment.search(AppController.serverController.getRepoInterface(), query, callback, errorSearching, params);
		}, 100);
	}
	
	/**
	 * Clears all results on screen before appending new results to Data Viewer
	 * 
	 * @memberOf RelationshipSearchScreen
	 * @method clearDisplayResults 
	 * @private
	 * @param {EcAlignment[]} results
	 * 			Results to display in the Data Viewer
	 */
	function clearDisplayResults(results)
	{
		ViewManager.getView("#relationshipSearchResults").clear();
		displayResults(results);
	}
	
	/**
	 * Just appends new results to Data Viewer
	 * 
	 * @memberOf RelationshipSearchScreen
	 * @method runRelationshipSearch 
	 * @private
	 * @param {EcAlignment[]} results
	 * 			Results to display in the Data Viewer
	 */
	function displayResults(results)
	{  
		ViewManager.getView("#menuContainer").showSortBasic();
		ViewManager.getView("#menuContainer").showSortRelations();
		
		ViewManager.getView("#relationshipSearchResults").populate(results);
		
		if(results.length == 0 && $("#relationshipResults-data").first().children().size() == 0)
		{
			ViewManager.getView("#relationshipSearchResults").showNoDataMessage();
		}else if(results.length < maxLength){
			$("#moreSearchResults").addClass("hide");
			//$(window).off("scroll", scrollSearchHandler);
		}else{
			$("#getMoreResults").click(function(){
				$("#getMoreResults").addClass("hide");
				$("#loadingMoreResults").removeClass("hide");
				runRelationshipSearch($("#relationshipResults-data .row[data-id]").size());
			})
			
			$("#getMoreResults").removeClass("hide");
			$("#moreSearchResults").removeClass("hide");
			$("#loadingMoreResults").addClass("hide");
			
			//$(window).scroll(scrollSearchHandler)
		}
		
		searchHandle = null;
	}
	
//	function scrollSearchHandler(){
//		var resultDiv = $("#relationshipResults-data").first(); 
//		
//		if(resultDiv.size() == 0){
//			$(window).off("scroll", scrollSearchHandler);
//		}
//		else if(($(window).height() + document.body.scrollTop) > ($(document).height() - 30))
//		{
//			//$("#moreSearchResults").addClass("hide");
//			//$("#loadingMoreResults").removeClass("hide");
//			runRelationshipSearch(resultDiv.children().size());
//		}
//	}
	
	/**
	 * Handles displaying errors during search
	 * 
	 * @memberOf RelationshipSearchScreen
	 * @method errorSearching 
	 * @private
	 * @param {String} err
	 * 			Error message to display
	 */
	function errorSearching(err){
		if(err == undefined)
			err = "Unable to Connect to Server for Competency Search";
		
		ViewManager.getView("#relationshipSearchMessageContainer").displayAlert(err, "searchFail");
		
		ViewManager.getView("#relationshipSearchResults").showNoDataMessage();
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf RelationshipSearchScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
	RelationshipSearchScreen.prototype.display = function(containerId)
	{
		var lastViewed = this.lastViewed;
		
		var query = this.query;
		var ownership = this.ownership;
		
			
		ViewManager.showView(new MessageContainer("relationshipSearch"), "#relationshipSearchMessageContainer");
		
		var dataViewPrefix = "relationshipResults";
		
		ViewManager.showView(new DataViewer(dataViewPrefix, {
			sort:{
				"Source":function(a, b){
					if(a == undefined)
						return true;
				
					var aId = EcRemoteLinkedData.trimVersionFromUrl(a["source"]).split("/");
					aId = aId[aId.length -1]
					
					var bId = EcRemoteLinkedData.trimVersionFromUrl(b["source"]).split("/");
					bId = bId[bId.length -1]
					
					if(aId > bId){
						return -1;
					}else{
						return 1;
					}
					
				},
				"Target":function(a, b){
					if(a == undefined)
						return false; 
					
					var aId = EcRemoteLinkedData.trimVersionFromUrl(a["target"]).split("/");
					aId = aId[aId.length -1]
					
					var bId = EcRemoteLinkedData.trimVersionFromUrl(b["target"]).split("/");
					bId = bId[bId.length -1]
					
					if(aId > bId){
						return -1;
					}else{
						return 1;
					}
				}
			},
			clickDataEdit:function(datum){
				ScreenManager.changeScreen(new RelationshipEditScreen(datum));
			},
			moreMenuTools:function(){
				var container = $("<div></div>");
				var el = $("<li><span><i class='fa fa-sitemap'></i> Add to Framework</span></li>");
				
				el.click(function(){
					var selected = ViewManager.getView("#relationshipSearchResults").getSelected();
					
					ModalManager.showModal(new AddToFrameworkModal(selected));
				})
				container.append(el);
				
				el = $("<li><span><i class='fa fa-download'></i> Export</span></li>");
				
				el.click(function(){
					var selected = ViewManager.getView("#relationshipSearchResults").getSelected();
					
					ModalManager.showModal(new RepoExportModal(selected));
				})
				
				container.append(el);
				
				return container.contents();
				
			},
			clickDataSelect:function(ev, id, datum, prefix){
				var row = $(ev.target).closest(".row");
				var aggId = row.attr("data-aggregateId");
				if(aggId == undefined)
					return;
				var aggregatedRows = row.siblings("[data-aggregateId='"+aggId+"']");
				
				if($(ev.target).is(":checked")){
					if(aggregatedRows.find(".datum-select:checked").size() == aggregatedRows.size()){
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("checked", "checked");
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("indeterminate", false);
					}else{
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("indeterminate", true);
					}
				}else{
					if(aggregatedRows.find(".datum-select:checked").size() == 0){
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").removeAttr("checked");
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("indeterminate", false);
					}else{
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("indeterminate", true);
					}
				}
			},
			aggregateDataRows:function(row, id, datum){
				var aggId;
				if($("#relationshipSearchResults #"+dataViewPrefix+"-sortSelect").val() == "Source" && datum["source"] != undefined){
					aggId = datum["source"];
				}else if($("#relationshipSearchResults #"+dataViewPrefix+"-sortSelect").val() == "Target" && datum["target"] != undefined){
					aggId = datum["target"];
				}else{
					$("#relationshipSearchResults #"+dataViewPrefix+"-data").append(row);
					return;
				}
				
				EcCompetency.get(aggId, function(competency){
					var version;
					if(aggId == competency.shortId()){
						version = "";
					}else{
						version = aggId.split("/");
						version = version[version.length - 1];
					}
					
					var shortCompId = competency.shortId().split("/");
					shortCompId = shortCompId[shortCompId.length - 1];
					
					if(version != ""){
						shortCompId +="-"+version;
					}
					
					row.attr("data-aggregateId", shortCompId);
					
					var competencyRow;
					
					if($("#relationshipSearchResults .competencyAggregateRow[data-competencyId="+shortCompId+"]").size() == 0){
						$("#relationshipSearchResults #"+dataViewPrefix+"-data").append("<div class='row column competencyAggregateRow' data-competencyId='"+shortCompId+"'></div>");
						
						competencyRow = $("#relationshipSearchResults .competencyAggregateRow[data-competencyId='"+shortCompId+"']")
					
						competencyRow.append($("<input type='checkbox' class='datum-select'></input>)"));
						
						competencyRow.on("click", ".datum-select", function(ev){					
							if($(".dataView").find(".datum-select:checked").size() == $("#"+dataViewPrefix+"-data .row").size()){
								$(".toggleSelectData").text("Unselect All");
							}else{
								$(".toggleSelectData").text("Select All");
							}
							
							if($(ev.target).is(":checked")){
								var relationRows = competencyRow.siblings("[data-aggregateId='"+shortCompId+"']");
								
								relationRows.addClass("selected");
								relationRows.find(".datum-select").prop("checked", "checked");
								
								var selected = ViewManager.getView("#relationshipSearchResults").getSelected();
								
								var allOwned = true;
								for(var i in selected){
									var d = selected[i];
									if(!AppController.identityController.owns(d))
										allOwned = false;
								}
								if(allOwned){
									$("#"+dataViewPrefix+"-menu").find(".fa-group").removeClass("hide");
									$("#"+dataViewPrefix+"-menu").find(".fa-trash").removeClass("hide");
								}else{
									$("#"+dataViewPrefix+"-menu").find(".fa-group").addClass("hide");
									var admin = AppController.serverController.getAdmin();
									if(!admin){
										$("#"+dataViewPrefix+"-menu").find(".fa-trash").addClass("hide");
									}
								}
							}else{
								var relationRows = competencyRow.siblings("[data-aggregateId='"+shortCompId+"']");
								
								relationRows.removeClass("selected");
								relationRows.find(".datum-select").removeAttr("checked");
								
								var selected = ViewManager.getView("#relationshipSearchResults").getSelected();
								
								var allOwned = true;
								for(var i in selected){
									var d = selected[i];
									if(!AppController.identityController.owns(d))
										allOwned = false;
								}
								if(allOwned){
									$("#"+dataViewPrefix+"-menu").find(".fa-group").removeClass("hide");
									$("#"+dataViewPrefix+"-menu").find(".fa-trash").removeClass("hide");
								}
							}
							
							if($(ev.target).closest(".dataView").find(".datum-select").is(":checked")){
								$(ev.target).closest(".dataView").addClass("selecting");
								
								if(!$("#"+dataViewPrefix+"-menu").is(":visible")){
									$("#"+dataViewPrefix+"-menu").slideDown();
								}
								
								$(".dataViewMenu .dataViewSelected").text($(".dataView").find("[data-id] .datum-select:checked").size());
							}else{
								$(ev.target).closest(".dataView").removeClass("selecting");
								
								if($("#"+dataViewPrefix+"-menu").is(":visible")){
									$("#"+dataViewPrefix+"-menu").slideUp();
								}
							}
							
						});
						
						competencyRow.attr("style","padding:7px 2px;padding-left:30px;background-color:#f3f3f3;cursor:default;");
						competencyRow.append("<div class='small-9 columns'></div>");
						competencyRow.find(".small-9").append(competency.getName());
						
						if(version != "")
							competencyRow.find(".small-9").append("<small>(Version:"+version+")</small>");
						
						competencyRow.append("<div class='small-3 columns'>"+
												"<div class='rowToolbar'>"+
												"<span class='fa-stack fa-lg dataViewBtn' style='font-size: 0.45rem;margin-right:.8rem;' title='Load All Relationships'>"+
													"<i class='fa fa-refresh fa-stack-2x' style='font-size: 3em;top: -4px;'></i>" +
													"<i class='fa fa-plus fa-stack-1x' style='top: -2px;'></i>" +
												"</span> <a style='color:inherit;'><i title='View Competency' class='fa fa-external-link dataViewBtn' style='margin-right:1rem;'></a></i>" +
												"</div>" +
											"</div>");
						
						competencyRow.find(".fa-stack").click(function(ev){
							ev.preventDefault();
							if($(this).find(".fa-plus").hasClass("hide")){
								return;
							}
							$(this).find(".fa-plus").addClass("hide");
							$(this).find(".fa-refresh").addClass("fa-spin");
								
							competency.relations(AppController.serverController.getRepoInterface(), null, function(err){
								ViewManager.getView("#relationshipSearchMessageContainer").displayAlert("Error getting all relationship: "+err);
								competencyRow.find(".fa-refresh").removeClass("fa-spin");
								competencyRow.find(".fa-plus").removeClass("hide");
							}, function(data){
								var next = competencyRow.nextAll(".competencyAggregateRow").first();
								next.before("<div class='row column loadingRow' style='text-align:center;padding:7px 2px;font-style:italic;'>Loading...</div>")
								
								ViewManager.getView("#relationshipSearchResults").populate(data);
								
								competencyRow.find(".fa-stack").remove();
								competencyRow.nextAll(".loadingRow").first().remove();
								competencyRow.find(".rowToolbar").css("padding-top", "5px");
							});
							
							
						});
						
						competencyRow.find("a").attr("href", "#"+CompetencyViewScreen.prototype.getDisplayName()+"?id="+aggId);
						
						competencyRow.find("a").click(function(ev){
							ev.preventDefault();
							ScreenManager.changeScreen(new CompetencyViewScreen(competency));
							return false;
						});
					}else{
						competencyRow = $("#relationshipSearchResults .competencyAggregateRow[data-competencyId='"+shortCompId+"']");
					}
					
					if(competencyRow.nextAll(".competencyAggregateRow").size() > 0){
						competencyRow.nextAll(".competencyAggregateRow").first().before(row);
					}else if(competencyRow.nextAll(".row").size() > 0){
						competencyRow.nextAll(".row").last().after(row);
					}else{
						competencyRow.after(row);
					}
					
					
				}, function(err){
					ViewManager.getView("#relationshipSearchMessageContainer").displayAlert("Error Retrieving Aggregate Competency: "+ err);
					
					var unknownAggregateRow;
					
					if($("#relationshipSearchResults .competencyAggregateRow[data-competencyId=unknown]").size() == 0){
						$("#relationshipSearchResults #"+dataViewPrefix+"-data").prepend("<div class='row column competencyAggregateRow' data-competencyId='unknown'></div>");
						
						unknownAggregateRow = $("#relationshipSearchResults .competencyAggregateRow[data-competencyId='unknown']")
						
						unknownAggregateRow.append($("<input type='checkbox' class='datum-select'></input>)"));
						
						unknownAggregateRow.on("click", ".datum-select", function(ev){					
							if($(".dataView").find(".datum-select:checked").size() == $("#"+dataViewPrefix+"-data .row").size()){
								$(".toggleSelectData").text("Unselect All");
							}else{
								$(".toggleSelectData").text("Select All");
							}
							
							if($(ev.target).is(":checked")){
								var relationRows = unknownAggregateRow.siblings("[data-aggregateId='"+shortCompId+"']");
								
								relationRows.addClass("selected");
								relationRows.find(".datum-select").prop("checked", "checked");
								
								var selected = ViewManager.getView("#relationshipSearchResults").getSelected();
								
								var allOwned = true;
								for(var i in selected){
									var d = selected[i];
									if(!AppController.identityController.owns(d))
										allOwned = false;
								}
								if(allOwned){
									$("#"+dataViewPrefix+"-menu").find(".fa-group").removeClass("hide");
									$("#"+dataViewPrefix+"-menu").find(".fa-trash").removeClass("hide");
								}else{
									$("#"+dataViewPrefix+"-menu").find(".fa-group").addClass("hide");
									var admin = AppController.serverController.getAdmin();
									if(!admin){
										$("#"+dataViewPrefix+"-menu").find(".fa-trash").addClass("hide");
									}
								}
							}else{
								var relationRows = unknownAggregateRow.siblings("[data-aggregateId='"+shortCompId+"']");
								
								relationRows.removeClass("selected");
								relationRows.find(".datum-select").removeAttr("checked");
								
								var selected = ViewManager.getView("#relationshipSearchResults").getSelected();
								
								var allOwned = true;
								for(var i in selected){
									var d = selected[i];
									if(!AppController.identityController.owns(d))
										allOwned = false;
								}
								if(allOwned){
									$("#"+dataViewPrefix+"-menu").find(".fa-group").removeClass("hide");
									$("#"+dataViewPrefix+"-menu").find(".fa-trash").removeClass("hide");
								}
							}
							
							if($(ev.target).closest(".dataView").find(".datum-select").is(":checked")){
								$(ev.target).closest(".dataView").addClass("selecting");
								
								if(!$("#"+dataViewPrefix+"-menu").is(":visible")){
									$("#"+dataViewPrefix+"-menu").slideDown();
								}
								
								$(".dataViewMenu .dataViewSelected").text($(".dataView").find("[data-id] .datum-select:checked").size());
							}else{
								$(ev.target).closest(".dataView").removeClass("selecting");
								
								if($("#"+dataViewPrefix+"-menu").is(":visible")){
									$("#"+dataViewPrefix+"-menu").slideUp();
								}
							}
							
						});
						
						unknownAggregateRow.attr("style","padding:7px 2px;padding-left:30px;background-color:#f3f3f3;cursor:default;color:#f74646;font-weight:500;");
						unknownAggregateRow.append("<div class='small-12 columns'></div>");
						unknownAggregateRow.find(".small-12").append("Unknown Competency");
					}else{
						unknownAggregateRow = $("#relationshipSearchResults .competencyAggregateRow[data-competencyId='unknown']");
					}
					
					if(unknownAggregateRow.nextAll(".competencyAggregateRow").size() > 0){
						unknownAggregateRow.nextAll(".competencyAggregateRow").first().before(row);
					}else if(unknownAggregateRow.nextAll(".row").size() > 0){
						unknownAggregateRow.nextAll(".row").last().after(row);
					}else{
						unknownAggregateRow.after(row);
					}
				});

			},
			buildDataRow:function(row, id, datum){				
				if($("#relationshipSearchResults #"+dataViewPrefix+"-sortSelect").val() == "Source" && datum["source"] != undefined){
					row.append("<a>" +
									"<div class='small-2 columns datum-type' style='font-style:italic'></div>" +
									"<div class='small-6 columns end datum-target'></div>" +
								"</a>" +
								"<div class='small-4 columns datum-owner'></div>");
				}else if($("#relationshipSearchResults #"+dataViewPrefix+"-sortSelect").val() == "Target" && datum["target"] != undefined){
					row.append("<a>" +
							"<div class='small-2 columns datum-type' style='font-style:italic'></div>" +
							"<div class='small-6 columns end datum-source'></div>" +
						"</a>" +
						"<div class='small-4 columns datum-owner'></div>");
				}else{
					row.append("<a>" +
									"<div class='small-3 columns end datum-source'></div>" +
									"<div class='small-2 columns datum-type' style='font-style:italic'></div>" +
									"<div class='small-3 columns end datum-target'></div>" +
								"</a>" +
								"<div class='small-4 columns datum-owner'></div>");
				}
				
				
				
				if(datum["owner"] == undefined || datum["owner"].length == 0){
					row.find(".datum-owner").html("Public");
				}else{
					for(var i in datum["owner"]){
						var trimId = EcRemoteLinkedData.trimVersionFromUrl(id)
						var idEnd = trimId.split("/")[trimId.split("/").length-1];
						var elId = idEnd+"-owner-"+i;
						
						var ownerEl = $("<span id='"+elId+"'></span>")
						row.find(".datum-owner").append(ownerEl);
						
						var timeoutFunc = function(){
							if($("#"+elId).size() > 0){
								ViewManager.showView(new IdentityDisplay(datum["owner"][i]), "#"+elId)
							}else{
								setTimeout(timeoutFunc, 500);
							}
						};
						
						setTimeout(timeoutFunc, 500);
						
					}
				}
				
				if(row.find(".datum-source").size() > 0){
					EcCompetency.get(datum.source, function(competency){
						row.find(".datum-source").text(competency.getName())
					}, function(){
						row.find(".datum-source").text("Unknown Competency");
					})
					row.find(".datum-source").text("Loading..");
				}
				
				if(row.find(".datum-target").size() > 0){
					EcCompetency.get(datum.target, function(competency){
						row.find(".datum-target").text(competency.getName())
					}, function(){
						row.find(".datum-target").text("Unknown Competency");
					})
					row.find(".datum-target").text("Loading..");
				}
				
				var types;
				if(row.find(".datum-target").size() == 0){
					types = inverseTypes;
				}else{
					types = AppSettings.relationTypes;
				}
				
				
				if(types[datum.relationType] != undefined){
					row.find(".datum-type").text(types[datum.relationType])
				}else{
					row.find(".datum-type").text("has a relationship with");
				}
				
				row.find("a").click(function(ev){
					ev.preventDefault();
					ScreenManager.changeScreen(new RelationshipViewScreen(datum));
				})
				
			}
		}), "#relationshipSearchResults");
		
		
		
		$("#relationshipSearchSubmit").click(function(event){
			event.preventDefault();
			runRelationshipSearch();
		});			
		$("#relationshipSearchOwnership").change(function(event){
			event.preventDefault();
			runRelationshipSearch();
		});

		
		$("#relationshipSearchText").keypress(function(e){
			var key = e.which;
			if(key == 13)  // the enter key code
			{
				runRelationshipSearch();
			}
		});
		
		if(query != null)
			$("#relationshipSearchText").val(query)
		
		if(AppController.loginController.getLoggedIn())
		{
			$("#relationshipSearchOwnership").attr("max", 4);
			$("#relationshipSearchOwnershipLoggedIn").removeClass("hide");
			$("#relationshipSearchOwnershipPublic").addClass("hide");
		}
		else
		{
			$("#relationshipSearchOwnershipLoggedIn").addClass("hide");
			$("#relationshipSearchOwnershipPublic").removeClass("hide");
		}
		
		if(ownership != null){
			if(ownership == "public")
				ownership = 1;
			else if(ownership == "owned")
				ownership = 3;
			else if(ownership == "me")
				ownership = 4
			
			$("#relationshipSearchOwnership").val(ownership);
		}
		
		runRelationshipSearch();
		
		ViewManager.getView("#menuContainer").showSortBasic();
		ViewManager.getView("#menuContainer").showSortRelations();
	};
	
	/**
	 * Overridden onClose callback, called when leaving screen
	 * 
	 * @memberOf RelationshipSearchScreen
	 * @method onClose
	 */
	RelationshipSearchScreen.prototype.onClose = function(){
		ViewManager.getView("#menuContainer").hideSort();
	}
	
	RelationshipSearchScreen.prototype.sortByTimestamp = function(){
		$("#relationshipResults-sortSelect").val("timestamp");
		$("#relationshipResults-sortSelect").trigger("change");
	}
	
	RelationshipSearchScreen.prototype.sortByOwner = function(){
		$("#relationshipResults-sortSelect").val("owner");
		$("#relationshipResults-sortSelect").trigger("change");
	}
	
	RelationshipSearchScreen.prototype.filterPublic = function(){
		$("#relationshipSearchOwnership").val(1);
		runRelationshipSearch();
	}
	
	RelationshipSearchScreen.prototype.filterAll = function(){
		$("#relationshipSearchOwnership").val(2);
		runRelationshipSearch();
	}
	
	RelationshipSearchScreen.prototype.filterOwned = function(){
		$("#relationshipSearchOwnership").val(3);
		runRelationshipSearch();
	}
	
	RelationshipSearchScreen.prototype.filterOwnedByMe = function(){
		if(!AppController.loginController.getLoggedIn()){
			return;
		}
		
		$("#relationshipSearchOwnership").val(4);
		runRelationshipSearch();
	}
	
	/**
	 * Sets the search parameters on the view, so they can be reloaded if the page is
	 * 
	 * @memberOf RelationshipSearchScreen
	 * @method setParams
	 * @param {Object} params
	 */
	RelationshipSearchScreen.prototype.setParams = function(params)
	{
		if(params == undefined){
			this.clearParams();
			return;
		}
		
		this.query = params.query;
		this.ownership = params.ownership;
	}
	
	/**
	 * Handles getting search parameters from DOM and running
	 * basic Repository search
	 * 
	 * @memberOf RelationshipSearchScreen
	 * @method clearParams
	 */
	RelationshipSearchScreen.prototype.clearParams = function(){
		this.query = undefined;
		this.ownership = undefined;
	}
	
	return RelationshipSearchScreen;
})(RelationshipSearchScreen);/**
 * Screen that handles displaying Relationship Details
 * 
 * @module cass.manager
 * @class RelationshipViewScreen
 * 
 * @author devlin.junker@eduworks.com
 */
RelationshipViewScreen = (function (RelationshipViewScreen) {
    /**
	 * Handles displaying relationship details in DOM
	 * 
	 * @memberOf RelationshipViewScreen
	 * @method displayRelation 
	 * @private
	 * @param {EcAlignment} relation 
	 * 			Relation to display
	 */
    function displayRelation(relation) {

        if (EcEncryptedValue.encryptOnSave(relation.id))
            $("#relationshipViewerPrivateSymbol").removeClass("hide");
        else
            $("#relationshipViewerPrivateSymbol").addClass("hide");

        if (relation.source != undefined) {
            EcCompetency.get(relation.source, function (competency) {
                var a = $("<a></a>");
                a.attr("href", "#" + CompetencyViewScreen.displayName);
                a.text(competency.getName())
                $("#relationshipViewerSource").html(a);
                $("#relationshipViewerSource").click(function (event) {
                    event.preventDefault();
                    ScreenManager.changeScreen(new CompetencyViewScreen(competency));
                });
            }, function (err) {
                try {
                    var parsedErr = JSON.parse(err);
                    if (parsedErr.msg == undefined && parsedErr.message == undefined) {
                        $("#relationshipViewerSource").text("Unknown Competency");
                        $("#relationshipViewerSource").css("font-style", "italic");
                    }
                } catch (e) {
                    errorFindingSource(err);
                }
            });
        }

        if (relation.target != undefined) {
            EcCompetency.get(relation.target, function (competency) {
                var a = $("<a></a>");
                a.attr("href", "#" + CompetencyViewScreen.displayName);
                a.text(competency.getName())
                $("#relationshipViewerTarget").html(a);
                $("#relationshipViewerTarget").click(function (event) {
                    event.preventDefault();
                    ScreenManager.changeScreen(new CompetencyViewScreen(competency));
                });
            }, function (err) {
                try {
                    var parsedErr = JSON.parse(err);
                    if (parsedErr.msg == undefined && parsedErr.message == undefined) {
                        $("#relationshipViewerTarget").text("Unknown Competency");
                        $("#relationshipViewerTarget").css("font-style", "italic");
                    }
                } catch (e) {
                    errorFindingTarget(err);
                }
            });
        }

        if (relation.relationType != undefined && AppSettings.relationTypes[relation.relationType] != undefined) {
            $("#relationshipViewerType").text(AppSettings.relationTypes[relation.relationType]);
        } else {
            $("#relationshipViewerType").text("has a relationship with");
        }

        $("#relationshipViewerId").text(relation.id);
        if (relation.name == null || relation.name == undefined)
            $(".relationshipViewerName").text("Relation");
        else
            $(".relationshipViewerName").text(relation.name);
        $("#relationshipViewerDescription").text(relation.description);

        if (relation.owner != undefined && relation.owner.length > 0) {
            $("#relationshipViewerOwner").text("")
            for (var i = 0; i < relation.owner.length; i++) {
                if (i > 0)
                    $("#relationshipViewerOwner").append(", ");

                var pem = relation.owner[i];

                $("#relationshipViewerOwner").append("<span id='relation-owner-"+i+"'></span>");
                
                ViewManager.showView(new IdentityDisplay(pem), "#relation-owner-"+i);
            }
        } else {
            $("#relationshipViewerOwner").text("Public")
        }

    }

    /**
	 * Handles displaying error message when retrieving relationship for display
	 * 
	 * @memberOf RelationshipViewScreen
	 * @method displayRelation 
	 * @private
	 * @param {String} err 
	 * 			Error message to display
	 */
    function errorRetrieving(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Retrieve Relation";

        ViewManager.getView("#relationshipViewMessageContainer").displayAlert(err, "getRelation");
    }

    /**
	 * Handles displaying error message when retrieving relationship source info
	 * 
	 * @memberOf RelationshipViewScreen
	 * @method errorFindingSource 
	 * @private
	 * @param {String} err 
	 * 			Error message to display		
	 */
    function errorFindingSource(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Retrieve Source Competency";

        ViewManager.getView("#relationshipViewMessageContainer").displayAlert(err, "getSource");
    }

    /**
	 * Handles displaying error message when retrieving relationship target info display
	 * 
	 * @memberOf RelationshipViewScreen
	 * @method errorFindingTarget 
	 * @private
	 * @param {String} err 
	 * 			Error message to display
	 */
    function errorFindingTarget(err) {
        if (err == undefined)
            err = "Unable to Connect to Server to Retrieve Target Competency";

        ViewManager.getView("#relationshipViewMessageContainer").displayAlert(err, "getTarget");
    }

    /**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf RelationshipViewScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
    RelationshipViewScreen.prototype.display = function (containerId, callback) {
        var data = this.data;

        if (data.id != null) {
            ScreenManager.setScreenParameters({
                "id": data.id
            })
        }


        ViewManager.showView(new MessageContainer("relationshipView"), "#relationshipViewMessageContainer");

        $("#relationshipViewSearchBtn").attr("href", "#" + RelationshipSearchScreen.prototype.displayName);
        $("#relationshipViewSearchBtn").click(function (event) {
            event.preventDefault();
            ScreenManager.changeScreen(new RelationshipSearchScreen(data))
        });

        $("#relationshipViewBtn").attr("href", "#" + RelationshipViewScreen.prototype.displayName);
        $("#relationshipViewBtn").click(function (event) {
            event.preventDefault();
        });


        if (AppController.identityController.canEdit(data)) {
            $("#editRelationshipBtn").click(function (event) {
                event.preventDefault();
                ScreenManager.changeScreen(new RelationshipEditScreen(data))
            })
        } else {
            $("#editRelationshipBtn").remove();
        }

        if (!AppController.identityController.owns(data) && !AppController.serverController.getAdmin()) {
            $("#relationshipViewDeleteBtn").remove();
        } else {
            $("#relationshipViewDeleteBtn").click(function () {
                ModalManager.showModal(new ConfirmModal(function () {
                    data._delete(function () {
                        ScreenManager.changeScreen(new RelationshipSearchScreen());
                    }, function (err) {
                        if (err == undefined)
                            err = "Unable to connect to server to delete relationship";
                        ViewManager.getView("#relationshipViewMessageContainer").displayAlert(err)
                    });
                    ModalManager.hideModal();
                }, "Are you sure you want to delete this relationship?"))
            })
        }


        EcAlignment.get(data.id, function (result) {
            data = result;
            displayRelation(result);
        }, errorRetrieving);

    };

    return RelationshipViewScreen;
})(RelationshipViewScreen);
/**
 * Screen that handles editing Raw objects from Repository,
 * uses the RepoEdit View to handle editing
 * 
 * @module cass.manager
 * @class RepoCreateScreen
 * 
 * @author devlin.junker@eduworks.com
 */
RepoCreateScreen = (function(RepoCreateScreen){
	
	 /**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf RepoCreateScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
	RepoCreateScreen.prototype.display = function(containerId)
	{
		var data = this.data;
	
		if(data == undefined || Object.keys(data).length == 0)
		{
			var t = new Thing();
			t.generateId(AppController.serverController.getRepoInterface().selectedServer);
			t.name = "New Object";
	    
			if(AppController.identityController.selectedIdentity != undefined)
		    {
		    	t.addOwner(AppController.identityController.selectedIdentity.ppk.toPk());
		    }
			
			data = t;
		}
		
		if(data.hasOwner == undefined && data["@owner"] == undefined)
		{
			if(AppController.identityController.selectedIdentity != undefined)
		    {
		    	data["@owner"] = [];
		    	data["@owner"][0] = AppController.identityController.selectedIdentity.ppk.toPk().toPem();
		    }
		}
		
		ViewManager.showView(new RepoEdit(data, "#repoCreateSaveBtn", "#repoCreateMessageContainer"), "#repoCreateData", function(){
			if(data.name == "New Object" && AppController.identityController.selectedIdentity == undefined)
				 ViewManager.getView("#repoCreateMessageContainer").displayWarning("You are Creating a Public Repository Item, this item can be modified by anyone", "warning");
		});

	};
	
	return RepoCreateScreen;
})(RepoCreateScreen);/**
 * Repo Edit View that can be used to display a piece of data from the 
 * repository in an editable DIV container. Allows the developer to designate 
 * where the save button is that (when clicked) will save the piece of data to 
 * it's repository.
 * 
 * @class RepoEdit
 * @author devlin.junker@eduworks.com
 */
var RepoEdit = (function(RepoEdit){
	/**
	 * Builds the display initially by creating the different editable divs
	 * and fills the containerId passed in with the editor.
	 * 
	 * @memberOf RepoEdit
	 * @method buildDisplay
	 * @private
	 * @param {Object} data
	 * @param {String} myContainerId
	 */
	function buildDisplay(data, myContainerId){
		$('#datum').remove();
	    if ($('#datum').length == 0)
	        $(".dataRecepticle").append("<div id='datum'></div>");
	    replaceField($('#datum'),data);
	    $('#datum').children("div").css("overflow-x","inherit");
	    
	    $( "#datum" ).on( "click", ".label:contains('Encrypt')",function(){
	        var isObject = false;
	        var field = $(this).parents("[field]").first();

	        if(field.attr("id") == "datum"){
	        	ModalManager.showModal(new EncryptOptionsModal(function(options){
		        	  encryptField(field, serializeField(field), options.type, options.name);
		        	  ModalManager.hideModal();
		        }));
	        }else{
	        	encryptField(field, serializeField(field));
	        }
	        	        
	    });

	    $( "#datum" ).on( "click", ".label:contains('Add')",function(){
	    	var field = $(this).parent().parent().parent();
	        ModalManager.showModal(new AddOwnerModal(field, myContainerId))
	    });
	    
	    $( "#datum" ).on( "click", ".label:contains('Decrypt')",function(){
	        var field = $(this).parents("[field]").first();
	        if (field.find("[field='@type']").children("p").text() == new EcEncryptedValue().type)
	            decryptField(field);
	    });

	    $( "#datum" ).on( "click", ".label:contains('+')",function(){
	        var field = $(this).parents("[field]").first();
	        
	    	ModalManager.showModal(new AddFieldModal(field, myContainerId))
	    });

	    $( "#datum" ).on( "click", ".label:contains('X')",function(){
	        var data = $(this).parents("[field]").first();
	        
	        if(data.attr("id") == "datum"){
	        	data.remove();
	        }else{
	        	data.remove();
	        }
	    });
	    
	    $( "#datum" ).on( "click", ".label:contains('Copy')",function(){    	
	    	$("#datum").find("[field='@id']").each(
	            function(i,e){
	                var url = $(e).children("p").text();
	                var split = url.split("\/");
	                if (split[split.length-4] == "data") 
	                    split[split.length-2] = guid();
	                $(e).children("p").text(split.join("/"));
	                
	                if(i == $("#datum").find("[field='@id']").size() - 1)
	                {
	                	var obj = JSON.parse(serializeField($("#datum")));
	                	
	                	var data = new EcRemoteLinkedData();
	                	data.copyFrom(obj);
	                	delete data["@owner"];
	                	delete data["@signature"];
	                	ScreenManager.changeScreen(new RepoCreateScreen(data));
	                } 	
	            }
	        );
	    });
	    
	    $( "#datum" ).on( "click", ".label:contains('Change')",function(){
	    	var field = $(this).parent().parent().parent();
	    	ModalManager.showModal(new ChangeTypeModal(field, myContainerId));
	    });

	    $( "#datum" ).on( "click", ".label:contains('Verify')",function(){
	        var field = $(this).parents("[field]").first();
	        if (field.find("[field='@signature']").children("p").text() != undefined){
	        	if (field.find("[field='@owner']").children("p").text() != undefined)
	        		if(verifyField(field))
	        			ModalManager.showModal(new MessageModal("Verified!", "", "tiny"));
	        		else
	        			ViewManager.getView(messageContainerId).displayAlert("Unable to Verify", "verify")
	        }
	    });
	}


	/**
	 * Encrypts the field selected
	 * 
	 * @memberOf RepoEdit
	 * @method encryptField
	 * @private
	 * @param {jQueryObject} field
	 * @param {String} text
	 * @param {boolean} showType
	 * @param {boolean} showName
	 */
	function encryptField(field,text,showType, showName)
	{
	    if (AppController.identityController.selectedIdentity == null)
	    {
	        alert("Select a key.","You have no keys available to encrypt with.");
	        return;
	    }
	    
	    var fieldx = field.attr("field");
	    var id = $("[field='@id']").children("p").text();
	    
	    if(AppController.identityController.selectedIdentity == null)
	    	return;
	    
	    var oldType = undefined;
	    var oldName = undefined;
	    if(showType){
	    	oldType = JSON.parse(text)["@type"];
	    }
	    if(showName){
	    	oldName = JSON.parse(text)["name"];
	    }
	    
	    var obj = EcEncryptedValue.encryptValueOld(text, id, AppController.identityController.selectedIdentity.ppk.toPk());
	    
	    if(oldType != undefined){
	    	obj["encryptedType"] = oldType;
	    }
	    if(oldName != undefined){
	    	obj["name"] = oldName;
	    }
	    
	    if (obj != null)
	    {
	        if (field.find("[field='@id']").length > 0)
	            obj["@id"]=field.find("[field='@id']").children("p").text();
	        replaceField(field,obj);
	    }
	}
	
	/**
	 * @memberOf RepoEdit
	 * @method decryptField
	 * @private
	 * @param field
	 */
	function decryptField(field)
	{
	    var id = field.find("[field='@id']").children("p").text();
	    var fld = field.attr("field");
	    
	    var e = new EcEncryptedValue();
		e.copyFrom(JSON.parse(serializeField(field)));
	    
	    var result = e.decryptIntoObject();
	    if (result != null)
	        replaceField(field,result);
	    else
	    	result = e.decryptIntoString();
	    
	    if(result != null)
	    	replaceField(field, result);
	}

	/**
	 * @memberOf RepoEdit
	 * @method verifyField
	 * @private
	 * @param field
	 */
	function verifyField(field)
	{
	    var obj = JSON.parse(serializeField(field));
	   
	    var data = new EcRemoteLinkedData();
	    data.copyFrom(obj);
	    
	    return data.verify();
	}
	
	/* 
	 * Hacky way to understand how many object's are owned in this object,
	 * including this object. Used to properly display owner IdentityDisplays 
	 * at each level of hierarchy
	 * 
	 * i.e. is this the top level object owner? or are we displaying a encrypted 
	 * fields ownership?
	 * 
	 */
	var ownedNodes;
	
	/**
	 * @memberOf RepoEdit
	 * @method replaceField
	 * @private
	 * @param field
	 * @param data
	 * @param parentField
	 */
	function replaceField(field,data,parentField)
	{
		if(field.attr("id") == "datum")
			ownedNodes = 0;
		ownedNodes++;
		
		field.children("section").remove();
	    field.children("p").remove();
	    field.children("div").remove();
	    field.children("ul").remove();
	    field.children("span").remove();
	    
	    var obj;
	    try{
	    	obj = JSON.parse(data.toJson());
	    }catch(ex){
//	    	try{
//	    		var ecData = new EcRemoteLinkedData();
//	    		ecData.copyFrom(data);
//	    		obj = ecData;
//		    }
//		    catch(ex)
//		    {
		    	try{
		    		obj=JSON.parse(data);
		    	}catch(ex){
		    		obj = undefined;
		    	}
		        
//		    }
	    }
	    if (isObject(obj) || isObject(data))
	    {   
	    	if(obj == undefined)
	    		obj = data;
	    	
	    	if(field.attr("field") == undefined)
				field.attr("field", "dataObject")
	        field.append("<div style='margin-left:20px;'></div>");
	        for (var f in obj)
	        {
	            if (!isFunction(obj[f]) && obj[f] != undefined)
	                addField(field,f,obj[f]);
	        }
	        var sortList = field.children("div").children("div").get();
	        sortList.sort(function (a, b) {
	            if ( $(a).attr('field') < $(b).attr('field') )
	                return -1;
	            if ( $(a).attr('field') > $(b).attr('field') )
	                return 1;
	            return 0;
	        });
	        $.each(sortList,
	            function(idx,itm)
	            {
	                itm.remove();
	                field.children("div").append(itm);
	            }
	        );
	    }
	    else if (isArray(data))
	    {
	        field.append("<ul style='margin-left:30px;'></ul>");
	        for (var index in data)
	        {
	            addField(field,parentField,data[index]);
	        }
	    }
	    else
	    {
	        if (field.children("label").text() == "@owner" || field.parent().parent().children("label").text() == "@owner")
	        {
	        	var id = "node-"+ownedNodes+"-owner-" + field.siblings("li").size();
	        	field.append("<span id='"+id+"' style='display:block;'></span>")
	        	
	        	
	        	ViewManager.showView(new IdentityDisplay(data),"#"+id);
	        	
	        	//var contact = $(createContactSmall(data));
	            //field.append(contact);  
	        }
	        else
	            field.append("<p style='text-overflow: ellipsis;margin-bottom:0px;overflow:hidden;'>"+data+"</p>");
	    }
	    decorate(field,field.children("label").text(), data);
	    contextualEnable(field,obj);
	    field.effect("highlight", {}, 1500);
	}

	/**
	 * @memberOf RepoEdit
	 * @method addField
	 * @private
	 * @param field
	 * @param f
	 * @param value
	 */
	function addField(field,f,value)
	{	
		if (field.children("div").length > 0)
	    {
	        field.children("div").append('<div field="'+f+'"></div>');
	        field.children("div").children("[field='"+f+"']").append('<label class="repoEdit-label" style="font-weight:500;text-decoration:underline;">'+f+'</label>');
	        replaceField(field.children("div").children("[field='"+f+"']"), value, f);
	    }
	    else if (field.children("ul").length > 0)
	    {
	    	var idx = field.children("ul").children("li").length;
	        field.children("ul").append('<li field="'+f+'['+idx+']"></li>');
	        //field.children("ul").children("li").last().append('<label>'+(field.children("ul").children("li").length-1)+'</label>');
	        replaceField(field.children("ul").children("li").last(),value,f);
	    }	
	}

	/**
	 * @memberOf RepoEdit
	 * @method decorate
	 * @private
	 * @param field
	 * @param f
	 * @param obj
	 */
	function decorate(field,f,obj)
	{
	    field.children("a").remove();
	    //If isNotCryptoFields AND is an object
	    if (f.indexOf("@") == -1 && f != "payload" && f != "secret" && field.children("div").length > 0)
	    {
	    	var buttonStr = "<section class='clearfix";
	    	if(!(obj instanceof EcRemoteLinkedData))
	    		buttonStr += " float-right";
	    	buttonStr += "'>";
	    		
	    	if(f != "" || (obj.owner != null && obj.owner.length != null && obj.owner.length > 0 
	    					&& AppController.identityController.canEdit(obj)))
	    	{
	    		buttonStr += decorationButton("X","Deletes this field.");
	    	}
	    	
	    	if(obj != undefined && obj["signature"] != undefined)
	    	{
	    		buttonStr += decorationButton("Verify","Verifies the object using the @signature to ensure it has not been changed by anyone but the @owner.")
	    	}
    		
	    	
	    	if(obj != undefined && obj["owner"] == undefined)
	    	{
	    		buttonStr += decorationButton("+","Add a new field to the object."); 
	    	}else if(AppController.identityController.owns(obj)){
	    		buttonStr+=decorationButton("+","Add a new field to the object.");
	    		if(obj.isAny(new EcEncryptedValue().getTypes())){
	    			buttonStr+=decorationButton("Decrypt","Decrypts the field so that it is no longer private.");
	    		}else{
	    			buttonStr+=decorationButton("Encrypt","Encrypts the field so nobody but you and the people you authorize can see the data.");
	    		}
	    		
	    	}
	    		
	    	buttonStr += "</section>";
	    	
	        field.prepend(buttonStr);
	       
	        field.children("p").attr("contenteditable","true");
	    }
	    //If isNotCryptoFields AND is an array
	    if (f.indexOf("@") == -1 && f != "payload" && f != "secret" && field.children("ul").length > 0)
	    {
	        field.prepend(decorationButton("+","Add a new entry to the list."));
	    }
	    //If isNotCryptoFields
	    if (f.indexOf("@") == -1 && f != "payload" && f != "secret" && field.children("div").length == 0)
	    {
	    	var buttonStr = decorationButton("X","Deletes this field.");
	        field.prepend(buttonStr);
	        field.children("p").attr("contenteditable","true");
	    }
	    if (f == "@id")
	    {
	        field.prepend(decorationButton("Copy","Changes the ID, causing the next save to write to a new object."));
	    }
	    if (f == "@type")
	    {
	        field.prepend(decorationButton("Change","Changes the type of the object."));
	    }
	    if (f == "@owner" && (obj != null && obj.length != null && obj.length > 0) )
	    {
	    	var owns = false;
	    	for(var j = 0; j < EcIdentityManager.ids.length; j++)
			{
	    		for (var i = 0; i < obj.length; i++)
					if (EcIdentityManager.ids[j].ppk.toPk().toPem() == obj[i])
						owns = true;
			}
	    	
	    	
	    	if(owns)
	    		field.prepend(decorationButton("Add","Adds an owner by public key."));
	    }
	}
	
	/**
	 * @memberOf RepoEdit
	 * @method decorationButton
	 * @private
	 * @param name
	 * @param title
	 */
	function decorationButton(name,title)
	{
	    return '<a style="margin-right:2px;" class="float-right label fieldBtn" title="'+title+'">'+name+'</a>';   
	}
	/**
	 * @memberOf RepoEdit
	 * @method decorationButtonDisabled
	 * @private
	 * @param name
	 * @param title
	 */
	function decorationButtonDisabled(name,title)
	{
	    return '<a style="margin-right:2px;color:gray;background-color:darkgray;" class="float-right label fieldBtn" title="'+title+'">'+name+'</a>';   
	}
	
	/**
	 * @memberOf RepoEdit
	 * @method contextualEnable
	 * @private
	 * @param field
	 * @param obj
	 */
	function contextualEnable(field,obj)
	{
	    field.children(".label:contains('decrypt')").text("encrypt");
	    field.children(".label:contains('verify')").hide();
	    if (isObject(obj))
	    {
	        if (
	            obj["@context"] != undefined 
	            && obj["@type"] != undefined 
	            && obj["@context"] == Ebac.context
	            && obj["@type"] == EbacEncryptedValue.type
	        )
	            field.children().first().children(".label:contains('encrypt')").text("decrypt");

	        if (
	            obj["@signature"] != undefined 
	            && obj["@type"] != undefined 
	        )
	            field.children().first().children(".label:contains('verify')").show();
	    }

	}
	
	/**
	 * @memberOf RepoEdit
	 * @method serializeField
	 * @private
	 * @param field
	 * @param child
	 */
	function serializeField(field,child)
	{
		if (field.children(".ownershipDisplay").size() == 1)
	    	return field.children(".ownershipDisplay").attr("pk");
		if (field.children("span").children(".identityDisplay").size() == 1)
			return field.find(".identityDisplay").attr("data-pk");
		else if(field.children("span").length == 1)
			return field.find("input[type='checkbox']").prop("checked");
	    if (field.children("p").length == 1)
	        return field.children("p").text();
	    else if (field.children("div").length > 0)
	    {
	        var obj = {};
	        var fields = field.children("div").children("[field!='']");
	        for (var fieldIndex in fields)
	            obj[fields.eq(fieldIndex).attr("field")]=serializeField(fields.eq(fieldIndex),true);
	        if (child)
	            return obj;
	        return JSON.stringify(obj);
	    }
	    else if (field.children("ul").length > 0)
	    {
	        var obj = [];
	        var fields = field.children("ul").children("li");
	        for (var fieldIndex in fields)
	        {        	
	            var result = serializeField(fields.eq(fieldIndex),true);
	            if (result != null && result !== undefined)
	                obj.push(result);
	        }
	        if (child)
	            return obj;
	        return JSON.stringify(obj);
	    }
	}
	
	/**
	 * @memberOf RepoEdit
	 * @method saveSuccess
	 * @private
	 */
	function saveSuccess(){
		$("#datum").effect("highlight", {}, 1500);
	}
	

	var messageContainerId;
	/**
	 * @memberOf RepoEdit
	 * @method saveFailure
	 * @private
	 * @param {String} err
	 * 			Error message to display on failed save
	 */
	function saveFailure(err)
	{
		if(err == undefined)
			err = "Unable to Connect to Server to Save";
	    ViewManager.getView(messageContainerId).displayAlert(err);
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf RepoEdit
	 * @method display
	 * @param {String} containerId
	 * 			DOM ID of the element that holds this message container
	 */
	RepoEdit.prototype.display = function(containerId){
		
		var data = this.data;
		this.containerId = containerId;
		messageContainerId = this.messageContainerId;
		
		ViewManager.showView(new MessageContainer("repoEdit"), this.messageContainerId);
		
		$(this.saveButtonId).click(function(){
			var serialized = serializeField($("#datum"));
			if(serialized != undefined){
				var d = new EcRemoteLinkedData(null, null);
				d.copyFrom(JSON.parse(serialized));
				EcRepository.save(d, saveSuccess, saveFailure)
			}else if(data != undefined){
				EcRepository._delete(data, saveSuccess, saveFailure);
			}
		});
		
		$(this.saveButtonId).on("mousemove", function(){
			$("#datum").first().children("div").find("[field='@id']").each(function(i,e){
				var url = $(e).children("p").text();
				var split = url.split("\/");
				if (split[split.length-4] == "data") 
					split[split.length-1] = new Date().getTime();
				$(e).children("p").text(split.join("/"));
			})
		});
		
		buildDisplay(data, containerId);
	}
	
	/**
	 * @memberOf RepoEdit
	 * @method addField
	 * @param field
	 * @param f
	 * @param value
	 */
	RepoEdit.prototype.addField = function(field, f, value){
		addField(field,f,value);
	}
	
	/**
	 * @memberOf RepoEdit
	 * @method changeObject
	 * @param obj
	 */
	RepoEdit.prototype.changeObject = function(obj){
		buildDisplay(obj, this.containerId);
	}
	
	RepoEdit.prototype.changeType = function(field, context, type){
		field.children("div").children("[field='@context']").each(
			function(i, e){
				   $(e).children("p").text(context);
			}
		);
		
		
		field.children("div").children("[field='@type']").each(
            function(i,e){
                $(e).children("p").text(type);
                
                var newType;
                if(type.startsWith(context))
                	newType = type;
                else
                	newType = context+"."+type;
                
                var typeSplit = newType.split(/\/|\./);
                for(var i = typeSplit.length - 1; i>=0; i--) {
                	if(typeSplit[i] == "" || typeSplit[i] == "http:" || typeSplit[i] == "https:" || typeSplit[i] == "www")
                		typeSplit.splice(i, 1);
                }

                
                var url = $(e).parent().children("[field='@id']").children("p").text();
                var split = url.split("\/");
                if (split[split.length-4] == "data") 
                    split[split.length-3] = typeSplit.join(".");
                $(e).parent().children("[field='@id']").children("p").text(split.join("/"));
            }
        );
	}
	
	RepoEdit.prototype.addOwner = function(field, owner){
		addField(field.children("div").children("[field='@owner']"), "@owner", owner);
	}
	
	return RepoEdit;
})(RepoEdit);/**
 * Handles the details of copying resources in the repository,
 * this gives the current user owner priveledges on a copy of a resource
 * 
 * @module cass.manager
 * @class RepoExportModal
 * 
 * @author devlin.junker@eduworks.com
 */
var RepoExportModal = (function(RepoExportModal){
	
	

	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf ContactGrantModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	RepoExportModal.prototype.display = function(containerId)
	{
		var data = this.data;
	
		ViewManager.showView(new MessageContainer("repoExport"), "#repoExportMessageContainer", function(){
			if(data == undefined || data == null){
				ViewManager.getView("#repoExportMessageContainer").displayAlert("Error getting objects to export");
			}
		});
		
		var name = "";
		
		if(data == undefined || data == null){
			name = "Error";
		}else if(data instanceof Array){
			name = data.length + " CASS Objects"
		}else{
			if(data.name != undefined){
				name = data.name;
			}else if(data.id != undefined){
				name = data.id;
			}else{
				name = "1 CASS Object"
			}
			
			var arr = [];
			arr.push(data);
			data = arr;
		}
		
		
		$("#exportName").text(name);
		
		$("#submitExport").click(function(){
			var process = new CSVExport.CSVExportProcess();
			
			process.buildExport(data);
			
			var optName = $("#nameInput").val();
			if(optName != undefined && optName != ""){
				name = optName;
			}
			
			var date = new Date();
			process.downloadCSV(name +"-"+ date.getYear()+date.getMonth()+date.getDay());
			
			ModalManager.hideModal();
		});
		
		$("#cancelExport").click(function(){
			ModalManager.hideModal();
		});
		
	}
	
	return RepoExportModal;
})(RepoExportModal);/**
 * Modal for viewing evidence details
 * 
 * @module cass.manager
 * @class RepoImportModal
 * 
 * @author devlin.junker@eduworks.com
 */
var RepoImportModal = (function(RepoImportModal){	

	
	/**
	 * Handles getting CSV file from Competency CSV Input and 
	 * displays columns and # found once finished analyzing CSV
	 * 
	 * @memberOf RepoImportModal
	 * @method analyzeCsv
	 * @private
	 * @param {EcFramework} framework
	 * 			Framework to import CSV competencies too
	 */
	function analyzeCsv() {
	    var file = $("#generalImportFile")[0].files[0];
	    
	    CSVImport.analyzeFile(file, function(data){
	    	if (data.length === undefined || data.length == 0) {
            	ViewManager.getView("#generalImportMessageContainer").displayAlert("CSV could not be parsed", "parseCSV");
            	$("#submitGeneralImport").attr("disabled", "disabled")
            	$("#submitGeneralImport").off("click");
                return;
            }
            $("#submitGeneralImport").removeAttr("disabled");
            ViewManager.getView("#generalImportMessageContainer").clearAlert("parseCSV");
            
            $("#generalImportColumnId").html("<option index='-1'>N/A</option>");
            for (var i = 0; i < data[0].length; i++) {
                $("#generalImportColumnId").append("<option/>").children().last().text(data[0][i]).attr("index", i);
                
                if(data[0][i].toLowerCase().includes("id")){
                	$("#generalImportColumnId [index="+i+"]").attr("selected", "selected");
                	ViewManager.getView("#generalImportMessageContainer").displayPrimary("CSV column names atuomatically determined based off of name", "csvGuess");
                }
            }
            
            $("#generalImportColumnId").change(function(){
            	if($("#generalImportColumnId").val() != undefined && $("#generalImportColumnId").val() != -1){
            		
            	}else{
            		ViewManager.getView("#generalImportMessageContainer").displayWarning("If ID Column not set, imported data cannot be linked", "noID");
            	}
            });
            
            $("#submitGeneralImport").on("click", function(ev){
				ev.preventDefault();
				$("#submitGeneralImport").attr("disabled", "disabled");
				$("#submitGeneralImport").find(".fa-spin").removeClass("hide");
				setTimeout(function(){
					importCsv();
				}, 100);
			})
	    }, function(error){
        	ViewManager.getView("#generalImportMessageContainer").clearSuccess();
        	ViewManager.getView("#generalImportMessageContainer").displayAlert(error);
        });
	}
	
	/**
	 * Handles getting file and column input from DOM and pass
	 * to import to import competencies from CSV
	 * 
	 * @memberOf RepoImportModal
	 * @method importCsv
	 * @private
	 * @param {EcFramework} framework
	 * 			Framework that is being edited
	 */
	function importCsv() {  
	    var file = $("#generalImportFile")[0].files[0];
	   
        var idIndex = parseInt($("#generalImportColumnId option:selected").attr("index"));

        ViewManager.getView("#generalImportMessageContainer").clearAlert("selectName");
	    
        CSVImport.importData(file, AppController.serverController.selectedServerUrl, AppController.identityController.selectedIdentity,
        		function(savedObjects){
        	var query = "";
            for(var i = 0; i < savedObjects.length; i++)
            {
            	var obj = savedObjects[i];
            	
            	var id = obj.shortId().split("/");
        		id = id[id.length - 1];
        		
        		if(i > 0)
        			query += " OR ";
        		query += id;
            }
           
        	ScreenManager.changeScreen(new RepoSearchScreen(null, query))
        	
        	ModalManager.hideModal();
     
        }, function(error){
        	ViewManager.getView("#generalImportProgressMessageContainer").clearSuccess();
        	ViewManager.getView("#generalImportProgressMessageContainer").displayAlert(error);
        }, function(count){
        	ViewManager.getView("#generalImportProgressMessageContainer").displaySuccess("Sucessfully imported "+count+" objects", "progress")
        }, idIndex);
        
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf RepoImportModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	RepoImportModal.prototype.display = function(containerId)
	{
	
		ViewManager.showView(new MessageContainer("generalImportProgress"), "#generalImportProgressMessageContainer");
		ViewManager.showView(new MessageContainer("importCompetencies"), "#generalImportMessageContainer", function(){
			if(AppController.identityController.selectedIdentity == undefined)
			{
				ViewManager.getView("#generalImportMessageContainer").displayWarning("Objects that are imported will be Public and can be modified by anyone", "noOwner");
			}
		});
		
		
		$("#generalImportFile").change(function(){
			analyzeCsv();
		})
		
		$(".cancelImport").click(function(ev){
			ev.preventDefault();
			ModalManager.hideModal();
		})
		
		if(AppController.identityController.selectedIdentity != undefined){
			var pem = AppController.identityController.selectedIdentity.ppk.toPk().toPem();
			
			ViewManager.showView(new IdentityDisplay(pem), "#generalImportOwner");
		}

	}
	
	return RepoImportModal;
})(RepoImportModal);/**
 * Screen that handles searching the repository for all objects
 * lists types of objects available in repository to be used as a paremter of search
 * 
 * @module cass.manager
 * @class RepoSearchScreen
 * 
 * @author devlin.junker@eduworks.com
 */
RepoSearchScreen = (function(RepoSearchScreen){
	
	var maxLength = 24;
	
	var searchHandle = null;
	
	/**
	 * Handles getting search parameters from DOM and running
	 * basic Repository search
	 * 
	 * @memberOf RepoSearchScreen
	 * @method runRepoSearch
	 * @private
	 * @param {int} start
	 * 			Index to begin results at in repository
	 */
	function runRepoSearch(start){
		
		if(start == undefined || start <= 0){
			ViewManager.getView("#repoSearchResults").clear();
			$("#moreSearchResults").addClass("hide");
		}
		
		var query = $("#repoSearchText").val();
		
		if (query == null || query == "")
			query = "*";
		
		var ownership = $("#repoSearchOwnership").val();
		if(ownership == 1)
			ownership = "public";
		else if(ownership == 3)
			ownership = "owned";
		else if(ownership == 4)
			ownership = "me"
		else
			ownership = "all";
		
		var types = undefined;
		if($("#repoSearchTypes input:checkbox:checked").size() != $("#repoSearchTypes input:checkbox").size())
		{
			 types = $("#repoSearchTypes input:checkbox:checked").map(function(){
			      return $(this).parent().attr('title');
		    }).get();
		}else if($("#repoSearchTypes input:checkbox:checked").size() == 0 && urlTypes != undefined){
			types = urlTypes;
		}else{
			types = undefined;
		}
		
		
		if (searchHandle != null)
			clearTimeout(searchHandle);
		
		var callback;
		if(start == undefined)
			callback = clearDisplayResults;
		else
			callback = displayResults;
		
		setTimeout(function() {
			if(searchHandle == null)
			{
				var urlParams = {};
				if(window.location.hash.split("?").length > 1){
					var hashSplit = window.location.hash.split(/[?&]/)
					for(var i = 1; i < hashSplit.length; i++){
						var paramSplit = hashSplit[i].split("=");
						if(paramSplit.length == 2)
							urlParams[paramSplit[0]] = paramSplit[1]; 
					}
				}
				
				if(types != undefined)
					urlParams.types = types;
				else if(urlParams.types != undefined)
					delete urlParams.types;
				
				if(query != "*")
					urlParams.query = query;
				else if(urlParams.query != undefined)
					delete urlParams.query;
				
				if(ownership != "all")
					urlParams.ownership = ownership;
				else if(urlParams.ownership != undefined)
					delete urlParams.ownership;
				

				if(Object.keys(urlParams).length > 0){
					ScreenManager.setScreenParameters(urlParams);
					ScreenManager.getCurrentScreen().setParams(urlParams);
				}else{
					ScreenManager.setScreenParameters(null);
					ScreenManager.getCurrentScreen().clearParams();
				}
				
				
				
				searchHandle = true;
				ViewManager.getView("#repoSearchMessageContainer").clearAlert("repoSearchFail");
				//ViewManager.getView("#repoSearchResults").showProgressMessage();
				ViewManager.getView("#repoSearchResults").deselectAll();
				
				if($("#repoResults-data").first().children().size() == 0)
					ViewManager.getView("#repoSearchResults").showProgressMessage();
				
				var params = {};
				params.size = maxLength;
				params.start = start;
				params.ownership = ownership;
				params.types = types;
				
				AppController.serverController.getRepoInterface().searchWithParams(query, params, null, callback, errorSearching);
			}
		}, 100);
	}
	
	/**
	 *  Clears all results on screen before appending new results to Data Viewer
	 * 
	 * @memberOf RepoSearchScreen
	 * @method clearDisplayResults
	 * @private
	 * @param {EcRemoteLinkedData[]} results
	 * 			Results to display in the Data Viewer
	 */
	function clearDisplayResults(results)
	{
		ViewManager.getView("#repoSearchResults").clear();
		displayResults(results);
	}
	
	/**
	 * Just appends new results to Data Viewer
	 * 
	 * @memberOf RepoSearchScreen
	 * @method displayResults
	 * @private
	 * @param {EcRemoteLinkedData[]} results
	 * 			Results to display in the Data Viewer
	 */
	function displayResults(results)
	{ 
		ViewManager.getView("#menuContainer").showSortBasic();
		ViewManager.getView("#repoSearchResults").populate(results);
		
		var rows = $("#repoResults-data").first().children();
		
		if(results.length == 0)
		{
			ViewManager.getView("#repoSearchResults").showNoDataMessage();
		}else if(results.length < maxLength){
			$("#moreSearchResults").addClass("hide");
			//$(window).off("scroll", scrollSearchHandler);
		}else{
			$("#getMoreResults").click(function(){
				$("#getMoreResults").addClass("hide");
				$("#loadingMoreResults").removeClass("hide");
				runRepoSearch($("#repoResults-data").first().children().size());
			})
			
			$("#getMoreResults").removeClass("hide");
			$("#moreSearchResults").removeClass("hide");
			$("#loadingMoreResults").addClass("hide");
			
			//$(window).scroll(scrollSearchHandler)
		}
		
		searchHandle = null;
	}
	
//	function scrollSearchHandler(){
//		var resultDiv = $("#repoResults-data").first(); 
//		
//		if(resultDiv.size() == 0){
//			$(window).off("scroll", scrollSearchHandler);
//		}
//		else if(($(window).height() + document.body.scrollTop) > ($(document).height() - 30))
//		{
//			//$("#moreSearchResults").addClass("hide");
//			//$("#loadingMoreResults").removeClass("hide");
//			runRepoSearch(resultDiv.children().size());
//		}
//	}
	
	/**
	 * Handles displaying error message when retrieving type list
	 * 
	 * @memberOf RepoSearchScreen
	 * @method errorDisplayingTypes
	 * @private
	 * @param {String} err 
	 * 			Error message to display	
	 */
	function errorDisplayingTypes(errorMsg){
		if(errorMsg == undefined || errorMsg == "" )
			errorMsg = "Unable to retrieve type list";
		
		ViewManager.getView("#repoSearchMessageContainer").displayAlert(errorMsg, "repoTypesFail");
		$("#repoSearchTypeContainer").addClass("hide");
	}
	
	/**
	 * Handles displaying errors during search
	 * 
	 * @memberOf RepoSearchScreen
	 * @method errorSearching
	 * @private
	 * @param {String} err 
	 * 			Error message to display	
	 */
	function errorSearching(errorMsg){
		if(errorMsg == undefined || errorMsg == "" )
			errorMsg = "Unable to connect to server to retrieve search results";
		
		ViewManager.getView("#repoSearchMessageContainer").displayAlert(errorMsg, "repoSearchFail");
		searchHandle = null;
	}
	
	/**
	 * Handles what happens when the user wants to view a results by clicking on name
	 * in search results
	 * 
	 * @memberOf RepoSearchScreen
	 * @method viewResult
	 * @private
	 * @param {EcRemoteLinkedData} data
	 * 			Data the user is interested in viewing
	 */
	function viewResult(data)
	{
		ScreenManager.changeScreen(new RepoViewScreen(data));
	}
	
	
	var urlTypes;
	
	/**
	 * Displays the result of retrieving all types from repository in select box
	 * 
	 * @memberOf RepoSearchScreen
	 * @method displayTypes
	 * @private
	 * @param {Object[]} typeObjects
	 * 			Array of objects returned from type search
	 */
	function displayTypes(typeObjects)
	{
		if($(typeObjects).size() == 0)
			errorDisplayingTypes("No Types Returned");
		
		$("#repoSearchTypes li.type").remove();
		for(var i in typeObjects)
		{
			var typeObject = typeObjects[i];
			
			var fullType = typeObject.key;
			var count = typeObject.doc_count;
			
			var typeSplit = fullType.split("/");
			var shortType = typeSplit[typeSplit.length-1];
			shortType = shortType.slice(0,1).toUpperCase() + shortType.slice(1, shortType.length);

			var el;
			if(urlTypes == undefined){
				el = $("<li class='type'><label></label></li>");
				el.find("label").attr("title", fullType);
				el.find("label").text(shortType+' ('+count+')');
				el.find("label").prepend("<input type='checkbox' style='margin-bottom:0.5rem;' checked='checked'/>");
			}else{
				el = $("<li class='type'><label></label></li>");
				el.find("label").attr("title", fullType);
				el.find("label").text(shortType+' ('+count+')');
				el.find("label").prepend("<input type='checkbox' style='margin-bottom:0.5rem;'/>");
				if($.inArray(fullType, urlTypes) != -1)
					el.find("input").attr("checked", "checked");
				
				if(urlTypes.length == 1 && $.inArray(fullType, urlTypes) != -1){
					$("#repoSearchTypesText").text(shortType+' ('+count+')');
				}
			}
				
			$("#repoSearchTypes").prepend(el);
		}
		
		if(urlTypes != undefined && urlTypes.length > 1){
			$("#repoSearchTypesText").text(urlTypes.length + " Types Selected")
			$("#repoSearchTypesText").css("font-size", "small");
		}
		
		var selectToggle = $("#repoSearchSelectAllToggle");
		selectToggle.click(function(){
			if(selectToggle.text().indexOf("Deselect") == -1){
				$("#repoSearchTypes input:checkbox").prop('checked', true);
				selectToggle.text("Deselect All");
				$("#repoSearchTypes input:checkbox").trigger("change");
			}else{
				$("#repoSearchTypes input:checkbox").prop('checked', false);
				selectToggle.text("Select All");
			}
		})
		
		var typesChanged = false;
		$("#repoSearchTypes input:checkbox").change(function(){
			typesChanged = true;
		})
		
		var el = new Foundation.Dropdown($("#repoSearchTypes"));
		
		$(el.$element).bind("hide.zf.dropdown", function(ev){
			
			var checked = $("#repoSearchTypes input:checked");
			
			var typeText;
			if(checked.size() == 0 || checked.size() == $("#repoSearchTypes input").size()){
				typeText = "All";
				$("#repoSearchTypes input:checkbox").prop('checked', true);
				selectToggle.text("Deselect All");
				$("#repoSearchTypesText").css("font-size", "normal");
			}else if(checked.size() == 1){
				typeText = checked.closest("label").text();
				$("#repoSearchTypesText").css("font-size", "normal");
			}else{
				typeText = checked.size() + " Types Selected";
				$("#repoSearchTypesText").css("font-size", "small");
			}
			
			$("#repoSearchTypesText").text(typeText);
			
			if(typesChanged){
				typesChanged = false;
				runRepoSearch();
			}
				
		})
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf RepoSearchScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
	RepoSearchScreen.prototype.display = function(containerId, callback)
	{
		var lastViewed = this.lastViewed;
		searchHandle = null;
		
		var query = this.query;
		var ownership = this.ownership;
		urlTypes = this.types;
	
		ViewManager.showView(new MessageContainer("repoSearch"), "#repoSearchMessageContainer");
		
		ViewManager.showView(new DataViewer("repoResults", {
			moreMenuTools:function(){
				var container = $("<div></div>");
				
				el = $("<li><span><i class='fa fa-download'></i> Export</span></li>");
				
				el.click(function(){
					var selected = ViewManager.getView("#repoSearchResults").getSelected();
					
					ModalManager.showModal(new RepoExportModal(selected));
				})
				
				container.append(el);
				
				return container.contents();
			}
		}), "#repoSearchResults");
		
		$("#repoSearchBtn").click(function(event){
			event.preventDefault();
			runRepoSearch();
		});
		$("#repoSearchOwnership").change(function(event){
			event.preventDefault();
			runRepoSearch();
		});
		
		
		$("#repoSearchText").keypress(function(e){
			var key = e.which;
			if(key == 13)  // the enter key code
			{
				runRepoSearch();
			}
		});
		if(query != null)
			$("#repoSearchText").val(query);
		
		if(AppController.loginController.getLoggedIn())
		{
			$("#repoSearchOwnership").attr("max", 4);
			$("#repoSearchOwnershipLoggedIn").removeClass("hide");
			$("#repoSearchOwnershipPublic").addClass("hide");
		}
		else
		{
			$("#repoSearchOwnershipLoggedIn").addClass("hide");
			$("#repoSearchOwnershipPublic").removeClass("hide");
		}
		if(ownership != null){
			if(ownership == "public")
				ownership = 1;
			else if(ownership == "owned")
				ownership = 3;
			else if(ownership == "me")
				ownership = 4
			
			$("#repoSearchOwnership").val(ownership);
		}
			
		AppController.serverController.getRepoInterface().listTypes(displayTypes, errorDisplayingTypes);
		
		runRepoSearch();
		ViewManager.getView("#menuContainer").showSortBasic();
	};
	
	/**
	 * Overridden onClose callback, called when leaving screen
	 * 
	 * @memberOf RepoSearchScreen
	 * @method onClose
	 */
	RepoSearchScreen.prototype.onClose = function(){
		ViewManager.getView("#menuContainer").hideSort();
	}
	
	RepoSearchScreen.prototype.sortByTimestamp = function(){
		$("#repoResults-sortSelect").val("timestamp");
		$("#repoResults-sortSelect").trigger("change");
	}
	
	RepoSearchScreen.prototype.sortByOwner = function(){
		$("#repoResults-sortSelect").val("owner");
		$("#repoResults-sortSelect").trigger("change");
	}
	
	RepoSearchScreen.prototype.filterPublic = function(){
		$("#repoSearchOwnership").val(1);
		runRepoSearch();
	}
	
	RepoSearchScreen.prototype.filterAll = function(){
		$("#repoSearchOwnership").val(2);
		runRepoSearch();
	}
	
	RepoSearchScreen.prototype.filterOwned = function(){
		$("#repoSearchOwnership").val(3);
		runRepoSearch();
	}
	
	RepoSearchScreen.prototype.filterOwnedByMe = function(){
		if(!AppController.loginController.getLoggedIn()){
			return;
		}
		
		$("#repoSearchOwnership").val(4);
		runRepoSearch();
	}
	
	/**
	 * Sets the search parameters on the view, so they can be reloaded if the page is
	 * 
	 * @memberOf RepoSearchScreen
	 * @method setParams
	 * @param {Object} params
	 */
	RepoSearchScreen.prototype.setParams = function(params)
	{
		if(params == undefined){
			this.clearParams();
			return;
		}
		
		this.query = params.query;
		this.ownership = params.ownership;
		this.types = params.types;
	}
	
	/**
	 * Handles getting search parameters from DOM and running
	 * basic Repository search
	 * 
	 * @memberOf RepoSearchScreen
	 * @method clearParams
	 */
	RepoSearchScreen.prototype.clearParams = function(){
		this.query = undefined;
		this.ownership = undefined;
		this.types = undefined;
	}
	
	return RepoSearchScreen;
})(RepoSearchScreen);/**
 * Screen that handles searching Viewing a raw repository object
 * lists types of objects available in repository to be used as a paremter of search
 * 
 * @module cass.manager
 * @class RepoViewScreen
 * 
 * @author devlin.junker@eduworks.com
 */
RepoViewScreen = (function(RepoViewScreen){
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf RepoViewScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
	RepoViewScreen.prototype.display = function(containerId)
	{
		var data = this.data
		
		if(data.id != null)
		{
			ScreenManager.setScreenParameters( {"id":data.id} )
		}
	
		$("#repoViewSearchBtn").attr("href", "#"+RepoSearchScreen.prototype.displayName);
		$("#repoViewSearchBtn").click(function(event){
			event.preventDefault();
			ScreenManager.changeScreen(new RepoSearchScreen(data))
		});
		
		if(!AppController.identityController.owns(data) && !AppController.serverController.getAdmin()){
			$("#repoViewDeleteBtn").remove();
		}else{
			$("#repoViewDeleteBtn").click(function(){
				ModalManager.showModal(new ConfirmModal(function(){
					EcRepository._delete(data, function(){
						ScreenManager.changeScreen(new RepoSearchScreen());
						ModalManager.hideModal();
					}, function(err){
						if(err == undefined)
							err = "Unable to connect to server to delete item";
						ViewManager.getView("#repoViewMessageContainer").displayAlert(err)
					});
	        	}, "Are you sure you want to delete this object?"))
			})
		}
		
		$("#repoViewBtn").click(function(event){
			event.preventDefault();
		})
		
		EcRepository.get(data.id, function (result) {
            data = result;
            ViewManager.showView(new RepoEdit(data, "#repoViewSaveBtn", "#repoViewMessageContainer"), "#repoViewResult");
        }, function(err){
        	if(err == undefined)
        		err = "Unable to get object from repository";
        	
        	ViewManager.getView("#repoViewMessageContainer").displayAlert(err)
        });
	};
	
	return RepoViewScreen;
})(RepoViewScreen);/**
 * Screen that handles displaying search results of relationships
 * 
 * @module cass.manager
 * @class RollupRuleSearchScreen
 * 
 * @author devlin.junker@eduworks.com
 */
RollupRuleSearchScreen = (function(RollupRuleSearchScreen){
	
	var maxLength = 24;
	
	var searchHandle = null;
	
	/**
	 * Handles getting search params from DOM and initiating search request
	 * 
	 * @memberOf RollupRuleSearchScreen
	 * @method runRuleSearch 
	 * @private
	 * @param {int} start 
	 * 			index to start search (number of results already displayed)
	 */
	function runRuleSearch(start){
		var query = $("#rollupRuleSearchText").val();

		if (query == null || query == "")
			query = "*";
		if (searchHandle != null)
			clearTimeout(searchHandle);
		
		var ownership = $("#rollupRuleSearchOwnership").val();
		if(ownership == 1)
			ownership = "public";
		else if(ownership == 3)
			ownership = "owned";
		else if(ownership == 4)
			ownership = "me"
		else
			ownership = "all";
		
		var callback;
		if(start == undefined)
			callback = clearDisplayResults;
		else
			callback = displayResults;
		
		searchHandle = setTimeout(function() {
			var urlParams = {};
			if(window.location.hash.split("?").length > 1){
				var hashSplit = window.location.hash.split(/[?&]/)
				for(var i = 1; i < hashSplit.length; i++){
					var paramSplit = hashSplit[i].split("=");
					if(paramSplit.length == 2)
						urlParams[paramSplit[0]] = paramSplit[1]; 
				}
			}
			if(query != "*")
				urlParams.query = query;
			if(ownership != "all")
				urlParams.ownership = ownership;
			
			if(Object.keys(urlParams).length > 0){
				ScreenManager.setScreenParameters(urlParams);
				ScreenManager.getCurrentScreen().setParams(urlParams);
			}else{
				ScreenManager.setScreenParameters(null);
				ScreenManager.getCurrentScreen().clearParams();
			}
			
			ViewManager.getView("#rollupRuleSearchMessageContainer").clearAlert("searchFail");
			//ViewManager.getView("#levelSearchResults").showProgressMessage();
			ViewManager.getView("#rollupRuleSearchResults").deselectAll();
			
			var params = {};
			params.ownership = ownership;
			params.size = maxLength;
			params.start = start;
			
			EcRollupRule.search(AppController.serverController.getRepoInterface(), query, callback, errorSearching, params);
		}, 100);
	}
	
	/**
	 * Clears all results on screen before appending new results to Data Viewer
	 * 
	 * @memberOf RollupRuleSearchScreen
	 * @method clearDisplayResults 
	 * @private
	 * @param {EcAlignment[]} results
	 * 			Results to display in the Data Viewer
	 */
	function clearDisplayResults(results)
	{
		ViewManager.getView("#rollupRuleSearchResults").clear();
		displayResults(results);
	}
	
	/**
	 * Just appends new results to Data Viewer
	 * 
	 * @memberOf RollupRuleSearchScreen
	 * @method runRelationshipSearch 
	 * @private
	 * @param {EcAlignment[]} results
	 * 			Results to display in the Data Viewer
	 */
	function displayResults(results)
	{  
		ViewManager.getView("#menuContainer").showSortBasic();
		ViewManager.getView("#menuContainer").showSortByCompetency();
		
		ViewManager.getView("#rollupRuleSearchResults").populate(results);
		
		if(results.length == 0 && $("#rollupRuleResults-data").first().children().size() == 0)
		{
			ViewManager.getView("#rollupRuleSearchResults").showNoDataMessage();
		}else if(results.length < maxLength){
			$("#moreSearchResults").addClass("hide");
			//$(window).off("scroll", scrollSearchHandler);
		}else{
			$("#getMoreResults").click(function(){
				$("#getMoreResults").addClass("hide");
				$("#loadingMoreResults").removeClass("hide");
				runRelationshipSearch($("#rollupRuleResults-data .row[data-id]").size());
			})
			
			$("#getMoreResults").removeClass("hide");
			$("#moreSearchResults").removeClass("hide");
			$("#loadingMoreResults").addClass("hide");
			
			//$(window).scroll(scrollSearchHandler)
		}
		
		searchHandle = null;
	}
	
//	function scrollSearchHandler(){
//		var resultDiv = $("#rollupRuleResults-data").first(); 
//		
//		if(resultDiv.size() == 0){
//			$(window).off("scroll", scrollSearchHandler);
//		}
//		else if(($(window).height() + document.body.scrollTop) > ($(document).height() - 30))
//		{
//			//$("#moreSearchResults").addClass("hide");
//			//$("#loadingMoreResults").removeClass("hide");
//			runRelationshipSearch(resultDiv.children().size());
//		}
//	}
	
	/**
	 * Handles displaying errors during search
	 * 
	 * @memberOf RollupRuleSearchScreen
	 * @method errorSearching 
	 * @private
	 * @param {String} err
	 * 			Error message to display
	 */
	function errorSearching(err){
		if(err == undefined)
			err = "Unable to Connect to Server for Competency Search";
		
		ViewManager.getView("#rollupRuleSearchMessageContainer").displayAlert(err, "searchFail");
		
		ViewManager.getView("#rollupRuleSearchResults").showNoDataMessage();
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf RollupRuleSearchScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
	RollupRuleSearchScreen.prototype.display = function(containerId)
	{
		var lastViewed = this.lastViewed;
		
		var query = this.query;
		var ownership = this.ownership;
		
			
		ViewManager.showView(new MessageContainer("rollupRuleSearch"), "#rollupRuleSearchMessageContainer");
		
		var dataViewPrefix = "rollupRuleResults";
		
		ViewManager.showView(new DataViewer(dataViewPrefix, {
			sort:{
				"Competency":function(a, b){
					if(a == undefined)
						return true;
				
					var aId = EcRemoteLinkedData.trimVersionFromUrl(a["competency"]).split("/");
					aId = aId[aId.length -1]
					
					var bId = EcRemoteLinkedData.trimVersionFromUrl(b["competency"]).split("/");
					bId = bId[bId.length -1]
					
					if(aId > bId){
						return -1;
					}else{
						return 1;
					}
					
				}
			},
			clickDataEdit:function(datum){
				ScreenManager.changeScreen(new CompetencyViewScreen({id:datum.competency}), function(){
					ModalManager.showModal(new EditRollupRuleModal(datum, function(){
						ScreenManager.reloadCurrentScreen();
					}));
				});
			},
			clickDataSelect:function(ev, id, datum, prefix){
				var row = $(ev.target).closest(".row");
				var aggId = row.attr("data-aggregateId");
				if(aggId == undefined)
					return;
				var aggregatedRows = row.siblings("[data-aggregateId='"+aggId+"']");
				
				if($(ev.target).is(":checked")){
					if(aggregatedRows.find(".datum-select:checked").size() == aggregatedRows.size()){
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("checked", "checked");
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("indeterminate", false);
					}else{
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("indeterminate", true);
					}
				}else{
					if(aggregatedRows.find(".datum-select:checked").size() == 0){
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").removeAttr("checked");
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("indeterminate", false);
					}else{
						row.siblings("[data-competencyId='"+aggId+"']").find(".datum-select").prop("indeterminate", true);
					}
				}
			},
			moreMenuTools:function(){
				var container = $("<div></div>");
				
				el = $("<li><span><i class='fa fa-download'></i> Export</span></li>");
				
				el.click(function(){
					var selected = ViewManager.getView("#rollupRuleSearchResults").getSelected();
					
					ModalManager.showModal(new RepoExportModal(selected));
				})
				
				container.append(el);
				
				return container.contents();
			},
			aggregateDataRows:function(row, id, datum){
				var aggId;
				if($("#rollupRuleSearchResults #"+dataViewPrefix+"-sortSelect").val() == "Competency" && datum["competency"] != undefined){
					aggId = datum["competency"];
				}else{
					$("#rollupRuleSearchResults #"+dataViewPrefix+"-data").append(row);
					return;
				}
				
				EcCompetency.get(aggId, function(competency){
					var version;
					if(aggId == competency.shortId()){
						version = "";
					}else{
						version = aggId.split("/");
						version = version[version.length - 1];
					}
					
					var shortCompId = competency.shortId().split("/");
					shortCompId = shortCompId[shortCompId.length - 1];
					
					if(version != ""){
						shortCompId +="-"+version;
					}
					
					row.attr("data-aggregateId", shortCompId);
					
					var competencyRow;
					
					if($("#rollupRuleSearchResults .competencyAggregateRow[data-competencyId="+shortCompId+"]").size() == 0){
						$("#rollupRuleSearchResults #"+dataViewPrefix+"-data").append("<div class='row column competencyAggregateRow' data-competencyId='"+shortCompId+"'></div>");
						
						competencyRow = $("#rollupRuleSearchResults .competencyAggregateRow[data-competencyId='"+shortCompId+"']")
					
						competencyRow.append($("<input type='checkbox' class='datum-select'></input>)"));
						
						competencyRow.on("click", ".datum-select", function(ev){					
							if($(".dataView").find(".datum-select:checked").size() == $("#"+dataViewPrefix+"-data .row").size()){
								$(".toggleSelectData").text("Unselect All");
							}else{
								$(".toggleSelectData").text("Select All");
							}
							
							if($(ev.target).is(":checked")){
								var relationRows = competencyRow.siblings("[data-aggregateId='"+shortCompId+"']");
								
								relationRows.addClass("selected");
								relationRows.find(".datum-select").prop("checked", "checked");
								
								var selected = ViewManager.getView("#rollupRuleSearchResults").getSelected();
								
								var allOwned = true;
								for(var i in selected){
									var d = selected[i];
									if(!AppController.identityController.owns(d))
										allOwned = false;
								}
								if(allOwned){
									$("#"+dataViewPrefix+"-menu").find(".fa-group").removeClass("hide");
									$("#"+dataViewPrefix+"-menu").find(".fa-trash").removeClass("hide");
								}else{
									$("#"+dataViewPrefix+"-menu").find(".fa-group").addClass("hide");
									var admin = AppController.serverController.getAdmin();
									if(!admin){
										$("#"+dataViewPrefix+"-menu").find(".fa-trash").addClass("hide");
									}
								}
							}else{
								var relationRows = competencyRow.siblings("[data-aggregateId='"+shortCompId+"']");
								
								relationRows.removeClass("selected");
								relationRows.find(".datum-select").removeAttr("checked");
								
								var selected = ViewManager.getView("#rollupRuleSearchResults").getSelected();
								
								var allOwned = true;
								for(var i in selected){
									var d = selected[i];
									if(!AppController.identityController.owns(d))
										allOwned = false;
								}
								if(allOwned){
									$("#"+dataViewPrefix+"-menu").find(".fa-group").removeClass("hide");
									$("#"+dataViewPrefix+"-menu").find(".fa-trash").removeClass("hide");
								}
							}
							
							if($(ev.target).closest(".dataView").find(".datum-select").is(":checked")){
								$(ev.target).closest(".dataView").addClass("selecting");
								
								if(!$("#"+dataViewPrefix+"-menu").is(":visible")){
									$("#"+dataViewPrefix+"-menu").slideDown();
								}
								
								$(".dataViewMenu .dataViewSelected").text($(".dataView").find("[data-id] .datum-select:checked").size());
							}else{
								$(ev.target).closest(".dataView").removeClass("selecting");
								
								if($("#"+dataViewPrefix+"-menu").is(":visible")){
									$("#"+dataViewPrefix+"-menu").slideUp();
								}
							}
							
						});
						
						competencyRow.attr("style","padding:7px 2px;padding-left:30px;background-color:#f3f3f3;cursor:default;");
						competencyRow.append("<div class='small-9 columns'></div>");
						competencyRow.find(".small-9").append(competency["name"]);
						
						if(version != "")
							competencyRow.find(".small-9").append("<small>(Version:"+version+")</small>");
						
						competencyRow.append("<div class='small-3 columns'>"+
												"<div class='rowToolbar'>"+
												"<span class='fa-stack fa-lg dataViewBtn' style='font-size: 0.45rem;margin-right:.8rem;' title='Load All Relationships'>"+
													"<i class='fa fa-refresh fa-stack-2x' style='font-size: 3em;top: -4px;'></i>" +
													"<i class='fa fa-plus fa-stack-1x' style='top: -2px;'></i>" +
												"</span> <a style='color:inherit;'><i title='View Competency' class='fa fa-external-link dataViewBtn' style='margin-right:1rem;'></a></i>" +
												"</div>" +
											"</div>");
						
						competencyRow.find(".fa-stack").click(function(ev){
							ev.preventDefault();
							if($(this).find(".fa-plus").hasClass("hide")){
								return;
							}
							$(this).find(".fa-plus").addClass("hide");
							$(this).find(".fa-refresh").addClass("fa-spin");
								
							competency.rollupRules(AppController.serverController.getRepoInterface(), null, function(err){
								ViewManager.getView("#rollupRuleSearchMessageContainer").displayAlert("Error getting all rules: "+err);
								competencyRow.find(".fa-refresh").removeClass("fa-spin");
								competencyRow.find(".fa-plus").removeClass("hide");
							}, function(data){
								var next = competencyRow.nextAll(".competencyAggregateRow").first();
								next.before("<div class='row column loadingRow' style='text-align:center;padding:7px 2px;font-style:italic;'>Loading...</div>")
								
								ViewManager.getView("#rollupRuleSearchResults").populate(data);
								
								competencyRow.find(".fa-stack").remove();
								competencyRow.nextAll(".loadingRow").first().remove();
								competencyRow.find(".rowToolbar").css("padding-top", "5px");
							});
							
							
						});
						
						competencyRow.find("a").attr("href", "#"+CompetencyViewScreen.prototype.getDisplayName()+"?id="+aggId);
						
						competencyRow.find("a").click(function(ev){
							ev.preventDefault();
							ScreenManager.changeScreen(new CompetencyViewScreen(competency));
							return false;
						});
					}else{
						competencyRow = $("#rollupRuleSearchResults .competencyAggregateRow[data-competencyId='"+shortCompId+"']");
					}
					
					if(competencyRow.nextAll(".competencyAggregateRow").size() > 0){
						competencyRow.nextAll(".competencyAggregateRow").first().before(row);
					}else if(competencyRow.nextAll(".row").size() > 0){
						competencyRow.nextAll(".row").last().after(row);
					}else{
						competencyRow.after(row);
					}
					
					
				}, function(err){
					ViewManager.getView("#rollupRuleSearchMessageContainer").displayAlert("Error Retrieving Aggregate Competency:"+ err);
					
					var unknownAggregateRow;
					
					if($("#rollupRuleSearchResults .competencyAggregateRow[data-competencyId=unknown]").size() == 0){
						$("#rollupRuleSearchResults #"+dataViewPrefix+"-data").prepend("<div class='row column competencyAggregateRow' data-competencyId='unknown'></div>");
						
						unknownAggregateRow = $("#rollupRuleSearchResults .competencyAggregateRow[data-competencyId='unknown']")
						
						unknownAggregateRow.append($("<input type='checkbox' class='datum-select'></input>)"));
						
						unknownAggregateRow.on("click", ".datum-select", function(ev){					
							if($(".dataView").find(".datum-select:checked").size() == $("#"+dataViewPrefix+"-data .row").size()){
								$(".toggleSelectData").text("Unselect All");
							}else{
								$(".toggleSelectData").text("Select All");
							}
							
							if($(ev.target).is(":checked")){
								var relationRows = unknownAggregateRow.siblings("[data-aggregateId='"+shortCompId+"']");
								
								relationRows.addClass("selected");
								relationRows.find(".datum-select").prop("checked", "checked");
								
								var selected = ViewManager.getView("#rollupRuleSearchResults").getSelected();
								
								var allOwned = true;
								for(var i in selected){
									var d = selected[i];
									if(!AppController.identityController.owns(d))
										allOwned = false;
								}
								if(allOwned){
									$("#"+dataViewPrefix+"-menu").find(".fa-group").removeClass("hide");
									$("#"+dataViewPrefix+"-menu").find(".fa-trash").removeClass("hide");
								}else{
									$("#"+dataViewPrefix+"-menu").find(".fa-group").addClass("hide");
									var admin = AppController.serverController.getAdmin();
									if(!admin){
										$("#"+dataViewPrefix+"-menu").find(".fa-trash").addClass("hide");
									}
								}
							}else{
								var relationRows = unknownAggregateRow.siblings("[data-aggregateId='"+shortCompId+"']");
								
								relationRows.removeClass("selected");
								relationRows.find(".datum-select").removeAttr("checked");
								
								var selected = ViewManager.getView("#rollupRuleSearchResults").getSelected();
								
								var allOwned = true;
								for(var i in selected){
									var d = selected[i];
									if(!AppController.identityController.owns(d))
										allOwned = false;
								}
								if(allOwned){
									$("#"+dataViewPrefix+"-menu").find(".fa-group").removeClass("hide");
									$("#"+dataViewPrefix+"-menu").find(".fa-trash").removeClass("hide");
								}
							}
							
							if($(ev.target).closest(".dataView").find(".datum-select").is(":checked")){
								$(ev.target).closest(".dataView").addClass("selecting");
								
								if(!$("#"+dataViewPrefix+"-menu").is(":visible")){
									$("#"+dataViewPrefix+"-menu").slideDown();
								}
								
								$(".dataViewMenu .dataViewSelected").text($(".dataView").find("[data-id] .datum-select:checked").size());
							}else{
								$(ev.target).closest(".dataView").removeClass("selecting");
								
								if($("#"+dataViewPrefix+"-menu").is(":visible")){
									$("#"+dataViewPrefix+"-menu").slideUp();
								}
							}
							
						});
						
						unknownAggregateRow.attr("style","padding:7px 2px;padding-left:30px;background-color:#f3f3f3;cursor:default;color:#f74646;font-weight:500;");
						unknownAggregateRow.append("<div class='small-12 columns'></div>");
						unknownAggregateRow.find(".small-12").append("Unknown Competency");
					}else{
						unknownAggregateRow = $("#rollupRuleSearchResults .competencyAggregateRow[data-competencyId='unknown']");
					}
					
					if(unknownAggregateRow.nextAll(".competencyAggregateRow").size() > 0){
						unknownAggregateRow.nextAll(".competencyAggregateRow").first().before(row);
					}else if(unknownAggregateRow.nextAll(".row").size() > 0){
						unknownAggregateRow.nextAll(".row").last().after(row);
					}else{
						unknownAggregateRow.after(row);
					}
				});

			},
			buildDataRow:function(row, id, datum){				
				if($("#rollupRuleSearchResults #"+dataViewPrefix+"-sortSelect").val() == "Competency" && datum["competency"] != undefined){
					row.append("<a>" +
									"<div class='small-3 columns datum-name'></div>" +
								"</a>" +
								"<div class='small-6 columns datum-description'></div>" +
								"<div class='small-3 columns datum-owner'></div>");
				}else{
					row.append("<a>" +
									"<div class='small-2 columns end datum-name'></div>" +
								"</a>" +
								"<div class='small-4 columns datum-description'></div>" +
								"<div class='small-3 columns datum-competency'></div>" +
								"<div class='small-3 columns datum-owner'></div>");
				}
				
				
				
				if(datum["owner"] == undefined || datum["owner"].length == 0){
					row.find(".datum-owner").html("Public");
				}else{
					for(var i in datum["owner"]){
						var trimId = EcRemoteLinkedData.trimVersionFromUrl(id)
						var idEnd = trimId.split("/")[trimId.split("/").length-1];
						var elId = idEnd+"-owner-"+i;
						
						var ownerEl = $("<span id='"+elId+"'></span>")
						row.find(".datum-owner").append(ownerEl);
						
						var timeoutFunc = function(){
							if($("#"+elId).size() > 0){
								ViewManager.showView(new IdentityDisplay(datum["owner"][i]), "#"+elId)
							}else{
								setTimeout(timeoutFunc, 500);
							}
						};
						
						setTimeout(timeoutFunc, 500);
						
					}
				}
				if(row.find(".datum-competency").size() > 0){
					EcCompetency.get(datum.competency, function(competency){
						row.find(".datum-competency").html("for <span style='font-style:italic;'></span>");
						row.find(".datum-competency span").text(competency.getName());
					}, function(){
						row.find(".datum-competency").text("Unknown Competency");
					})
					row.find(".datum-competency").text("Loading..");
				}
				
				if(datum.name != undefined && datum.name != "")
					row.find(".datum-name").text(datum.name)

				if(datum.description != undefined && datum.description != "")
					row.find(".datum-description").text(datum.description)
				
				row.find("a").click(function(ev){
					ev.preventDefault();
					ScreenManager.changeScreen(new CompetencyViewScreen({id:datum.competency}), function(){
						ModalManager.showModal(new EditRollupRuleModal(datum, function(){
							ScreenManager.reloadCurrentScreen();
						}));
					});
				})
				
			}
		}), "#rollupRuleSearchResults");
		
		
		
		$("#rollupRuleSearchSubmit").click(function(event){
			event.preventDefault();
			runRuleSearch();
		});			
		$("#rollupRuleSearchOwnership").change(function(event){
			event.preventDefault();
			runRuleSearch();
		});

		
		$("#rollupRuleSearchText").keypress(function(e){
			var key = e.which;
			if(key == 13)  // the enter key code
			{
				runRuleSearch();
			}
		});
		
		if(query != null)
			$("#rollupRuleSearchText").val(query)
		
		if(AppController.loginController.getLoggedIn())
		{
			$("#rollupRuleSearchOwnership").attr("max", 4);
			$("#rollupRuleSearchOwnershipLoggedIn").removeClass("hide");
			$("#rollupRuleSearchOwnershipPublic").addClass("hide");
		}
		else
		{
			$("#rollupRuleSearchOwnershipLoggedIn").addClass("hide");
			$("#rollupRuleSearchOwnershipPublic").removeClass("hide");
		}
		
		if(ownership != null){
			if(ownership == "public")
				ownership = 1;
			else if(ownership == "owned")
				ownership = 3;
			else if(ownership == "me")
				ownership = 4
			
			$("#rollupRuleSearchOwnership").val(ownership);
		}
		
		runRuleSearch();
		
		ViewManager.getView("#menuContainer").showSortBasic();
		ViewManager.getView("#menuContainer").showSortByCompetency();
	};
	
	/**
	 * Overridden onClose callback, called when leaving screen
	 * 
	 * @memberOf RollupRuleSearchScreen
	 * @method onClose
	 */
	RollupRuleSearchScreen.prototype.onClose = function(){
		ViewManager.getView("#menuContainer").hideSort();
	}
	
	RollupRuleSearchScreen.prototype.sortByTimestamp = function(){
		$("#rollupRuleResults-sortSelect").val("timestamp");
		$("#rollupRuleResults-sortSelect").trigger("change");
	}
	
	RollupRuleSearchScreen.prototype.sortByOwner = function(){
		$("#rollupRuleResults-sortSelect").val("owner");
		$("#rollupRuleResults-sortSelect").trigger("change");
	}
	
	RollupRuleSearchScreen.prototype.filterPublic = function(){
		$("#rollupRuleSearchOwnership").val(1);
		runRuleSearch();
	}
	
	RollupRuleSearchScreen.prototype.filterAll = function(){
		$("#rollupRuleSearchOwnership").val(2);
		runRuleSearch();
	}
	
	RollupRuleSearchScreen.prototype.filterOwned = function(){
		$("#rollupRuleSearchOwnership").val(3);
		runRuleSearch();
	}
	
	RollupRuleSearchScreen.prototype.filterOwnedByMe = function(){
		if(!AppController.loginController.getLoggedIn()){
			return;
		}
		
		$("#rollupRuleSearchOwnership").val(4);
		runRuleSearch();
	}
	
	/**
	 * Sets the search parameters on the view, so they can be reloaded if the page is
	 * 
	 * @memberOf RollupRuleSearchScreen
	 * @method setParams
	 * @param {Object} params
	 */
	RollupRuleSearchScreen.prototype.setParams = function(params)
	{
		if(params == undefined){
			this.clearParams();
			return;
		}
		
		this.query = params.query;
		this.ownership = params.ownership;
	}
	
	/**
	 * Handles getting search parameters from DOM and running
	 * basic Repository search
	 * 
	 * @memberOf RollupRuleSearchScreen
	 * @method clearParams
	 */
	RollupRuleSearchScreen.prototype.clearParams = function(){
		this.query = undefined;
		this.ownership = undefined;
	}
	
	return RollupRuleSearchScreen;
})(RollupRuleSearchScreen);/**
 * Modal to handle saving identities and contact information
 * to the server
 * 
 * @module cass.manager
 * @class SaveIdModal
 * 
 * @author devlin.junker@eduworks.com
 */
var SaveIdModal = (function(SaveIdModal){	

	/**
	 * Submits the identities and contacts to the server
	 * 
	 * @memberOf SaveIdModal
	 * @method submitSave
	 * @private
	 */
	function submitSave(){
		AppController.loginController.save(
			saveSuccess,
			saveFailure
		);
	}

	/**
	 * Handles what happens if succesfully saved
	 * 
	 * @memberOf SaveIdModal
	 * @method saveSuccess
	 * @private
	 */
	function saveSuccess()
	{
		ModalManager.hideModal();	
		
		AppMenu.prototype.rebuildIdentityList();
	}
	
	/**
	 * Handles displaying errors if failure during save
	 * 
	 * @memberOf SaveIdModal
	 * @method saveFailure
	 * @private
	 * @param {String} err
	 * 			Error to display 
	 */
	function saveFailure(err)
	{
		ViewManager.getView("#saveIdentityMessageContainer").displayAlert(err);
	}
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf SaveIdModal
	 * @method display
	 * @param {String} containerId
	 * 			The DOM ID of the Modal Container this modal is displayed in
	 */
	SaveIdModal.prototype.display = function(containerId)
	{
		var msg = this.msg;
		
		ViewManager.showView(new MessageContainer("saveId"), "#saveIdentityMessageContainer");
		
		if(msg == undefined){
			msg = "Something has changed...";
		}
		$("#saveMessageContainer").text(msg);
		
		$("#saveId").click(function(event){
			submitSave()
		});
		
		$("#skipSaveId").click(function(event){
			ModalManager.hideModal();
		});
		
	}
	
	return SaveIdModal;
})(SaveIdModal);/**
 * Screen that displays admin specific info and allows admin to access adapter configuration
 * 
 * @module cass.manager
 * @class UserAdminScreen
 * 
 * @author devlin.junker@eduworks.com
 */
UserAdminScreen = (function(UserAdminScreen){
	
	/**
	 * Overridden display function, called once html partial is loaded into DOM
	 * 
	 * @memberOf UserAdminScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
	UserAdminScreen.prototype.display = function(containerId)
	{			
		ViewManager.showView(new MessageContainer("userAdmin"), "#userAdminMessageContainer");
		ViewManager.showView(new MessageContainer("moodleToCass"), "#moodleToCassMessageContainer");
		ViewManager.showView(new MessageContainer("cassToMoodle"), "#cassToMoodleMessageContainer");
		ViewManager.showView(new MessageContainer("database"), "#databaseMessageContainer");
		
		$("#xapiAdapterConfigureBtn").click(function(ev){
			ev.preventDefault();
			$(".configRow").addClass("hide");
			$("#xapiConfiguration").removeClass("hide");
		})
		$("#moodleAdapterConfigureBtn").click(function(ev){
			ev.preventDefault();
			$(".configRow").addClass("hide");
			$("#moodleConfiguration").removeClass("hide");
		})


		XapiConfig.get(AppController.serverController.selectedServerUrl, function(configObj){
			if(configObj != null){
				if(configObj["enabled"])
					$("#xapiAdapterEnabledSwitch").prop("checked", true);
				else
					$("#xapiAdapterEnabledSwitch").prop("checked", false);
					
				if(configObj["xapiEndpoint"] != null)
					$("#xapiEndpointInput").val(configObj["xapiEndpoint"]);
					
				if(configObj["xapiHostName"] != null)
					$("#xapiEndpointHostnameInput").val(configObj["xapiHostName"]);
				
				if(configObj["xapiAuth"] != null)
					$("#xapiAuthKeyInput").val(configObj["xapiAuth"]);
			}
		}, function(error){
			
		});
			
		$("#xapiSaveBtn").click(function(ev){
			ev.preventDefault();
			
			var config = new XapiConfig();
			
			config.enabled = $("#xapiAdapterEnabledSwitch").prop("checked");
			
			config["xapiEndpoint"] = $("#xapiEndpointInput").val();
			
			config["xapiHostName"] = $("#xapiEndpointHostnameInput").val();
			
			config["xapiAuth"] = $("#xapiAuthKeyInput").val();
			
			config.save(AppController.serverController.selectedServerUrl, function(){
				$("#xapiConfiguration").effect("highlight", {}, 1500);
			}, function(){
				
			});
		});
		
		
		MoodleConfig.get(AppController.serverController.selectedServerUrl, function(configObj){
			if(configObj != null){
				if(configObj["moodleToCassEnabled"]){
					$("#moodleToCassEnabledSwitch").prop("checked", true);
					$("#moodleToCassContainer").removeClass("hide");
					$("#moodleToCassBtn").removeAttr("disabled");
				}else{
					$("#moodleToCassEnabledSwitch").prop("checked", false);
					$("#moodleToCassContainer").addClass("hide");
					$("#moodleToCassBtn").attr("disabled", "disabled");
				}
				
				if(configObj["cassToMoodleEnabled"]){
					$("#cassToMoodleEnabledSwitch").prop("checked", true);
					$("#cassToMoodleContainer").removeClass("hide");
					$("#cassToMoodleBtn").removeAttr("disabled");
				}else{
					$("#cassToMoodleEnabledSwitch").prop("checked", false);
					$("#cassToMoodleContainer").addClass("hide");
					$("#cassToMoodleBtn").attr("disabled", "disabled");
				}
					
				if(configObj["moodleEndpoint"] != null)
					$("#moodleEndpointInput").val(configObj["moodleEndpoint"]);
				
				if(configObj["moodleToken"] != null)
					$("#moodleTokenInput").val(configObj["moodleToken"]);
			}
		}, function(error){
			
		});
		
		$("#moodleToCassEnabledSwitch").on("change", function(){
			if($("#moodleToCassEnabledSwitch").is(":checked")){
				$("#moodleToCassContainer").removeClass("hide");
			}else{
				$("#moodleToCassContainer").addClass("hide");
			}
		})
		
		$("#cassToMoodleEnabledSwitch").on("change", function(){
			if($("#cassToMoodleEnabledSwitch").is(":checked")){
				$("#cassToMoodleContainer").removeClass("hide");
			}else{
				$("#cassToMoodleContainer").addClass("hide");
			}
		})
		
		$("#moodleSaveBtn").click(function(ev){
			ev.preventDefault();
			
			var config = new MoodleConfig();
			
			config["moodleToCassEnabled"] = $("#moodleToCassEnabledSwitch").prop("checked");
			
			config["cassToMoodleEnabled"] = $("#cassToMoodleEnabledSwitch").prop("checked");
			
			config["moodleEndpoint"] = $("#moodleEndpointInput").val();
			
			config["moodleToken"] = $("#moodleTokenInput").val();
			
			config.save(AppController.serverController.selectedServerUrl, function(){
				$("#moodleConfiguration").effect("highlight", {}, 1500);
				
				if($("#cassToMoodleEnabledSwitch").is(":checked")){
					$("#cassToMoodleBtn").removeAttr("disabled");
				}else{
					$("#cassToMoodleBtn").attr("disabled", "disabled");
				}
				
				if($("#moodleToCassEnabledSwitch").is(":checked")){
					$("#moodleToCassBtn").removeAttr("disabled");
				}else{
					$("#moodleToCassBtn").attr("disabled", "disabled");
				}
			}, function(){
				
			});
		});
		
		$("#moodleToCassBtn").click(function(){
			if($("#moodleToCassBtn").attr("disabled") != undefined && $("#moodleToCassBtn").attr("disabled") != ""){
				ViewManager.getView("#moodleToCassMessageContainer").displayWarning("Save Moodle Configuration First");
				$("#moodleSaveBtn").effect("highlight", {}, 1500);
				return;
			} 
			ViewManager.getView("#moodleToCassMessageContainer").clearWarning();
			
			$("#moodleToCassSyncing").removeClass("hide");
			$("#moodleToCassBtn").attr("disabled", "disabled");
			
			MoodleConfig.syncMoodleToCass(AppController.serverController.selectedServerUrl, function(result){
				$("#moodleToCassSyncing").addClass("hide");
				$("#moodleToCassBtn").removeAttr("disabled");
				ViewManager.getView("#moodleToCassMessageContainer").clearAlert();
				ViewManager.getView("#moodleToCassMessageContainer").displaySuccess("Successfully Synced");
			}, function(err){
				$("#moodleToCassSyncing").addClass("hide");
				$("#moodleToCassBtn").removeAttr("disabled");
				ViewManager.getView("#moodleToCassMessageContainer").clearSuccess();
				ViewManager.getView("#moodleToCassMessageContainer").displayAlert("Error Syncing: "+error);
			});
		})
		
		$("#cassToMoodleBtn").click(function(){
			if($("#cassToMoodleBtn").attr("disabled") != undefined && $("#cassToMoodleBtn").attr("disabled") != ""){
				ViewManager.getView("#cassToMoodleMessageContainer").displayWarning("Save Moodle Configuration First");
				$("#moodleSaveBtn").effect("highlight", {}, 1500);
				return;
			}
			ViewManager.getView("#cassToMoodleMessageContainer").clearWarning();
			
			$("#cassToMoodleSyncing").removeClass("hide");
			$("#cassToMoodleBtn").attr("disabled", "disabled");
			
			MoodleConfig.syncCassToMoodle(AppController.serverController.selectedServerUrl, function(result){
				$("#cassToMoodleSyncing").addClass("hide");
				$("#cassToMoodleBtn").removeAttr("disabled");
				ViewManager.getView("#cassToMoodleMessageContainer").clearAlert();
				ViewManager.getView("#cassToMoodleMessageContainer").displaySuccess("Successfully Synced");
			}, function(err){
				$("#cassToMoodleSyncing").addClass("hide");
				$("#cassToMoodleBtn").removeAttr("disabled");
				ViewManager.getView("#cassToMoodleMessageContainer").clearSuccess();
				ViewManager.getView("#cassToMoodleMessageContainer").displayAlert("Error Syncing: "+error);
			});
		})
		
		
		$("#skyrepoBackup").click(function(){
			var secret = prompt("Please enter the Server Secret (from the .secret file on the CASS Server) to complete the backup")
			
			AppController.serverController.repoInterface.backup(secret, function(){
				ViewManager.getView("#databaseMessageContainer").clearAlert()
				ViewManager.getView("#databaseMessageContainer").displaySuccess("Successfully backed up database")
			}, function(err){
				var error = "Error backing up database: "+err;
				ViewManager.getView("#databaseMessageContainer").displayAlert(error);
				ViewManager.getView("#databaseMessageContainer").clearSuccess();
			});
		});
		
		$("#skyrepoRestore").click(function(){
			var secret = prompt("Please enter the Server Secret (from the .secret file on the CASS Server) to complete the restore")
			
			AppController.serverController.repoInterface.restoreBackup(secret, function(){
				ViewManager.getView("#databaseMessageContainer").clearAlert()
				ViewManager.getView("#databaseMessageContainer").displaySuccess("Successfully restored database")
			}, function(err){
				var error = "Error restoring database: "+err;
				ViewManager.getView("#databaseMessageContainer").displayAlert(error);
				ViewManager.getView("#databaseMessageContainer").clearSuccess();
			});
		});
		
		$("#skyrepoWipe").click(function(){
			var secret = prompt("Please enter the Server Secret (from the .secret file on the CASS Server) to complete the database wipe")
			
			AppController.serverController.repoInterface.wipe(secret, function(){
				ViewManager.getView("#databaseMessageContainer").clearAlert()
				ViewManager.getView("#databaseMessageContainer").displaySuccess("Successfully wiped database")
			}, function(err){
				var error = "Error wiping database: "+err;
				ViewManager.getView("#databaseMessageContainer").displayAlert(error);
				ViewManager.getView("#databaseMessageContainer").clearSuccess();
			});
		});
	};
	
	return UserAdminScreen;
})(UserAdminScreen);/**
 * Screen that displays user identity and contact information once the user has signed in
 *
 * @module cass.manager
 * @class UserIdentityScreen
 *
 * @author devlin.junker@eduworks.com
 */
UserIdentityScreen = (function (UserIdentityScreen) {

	/**
     * Called to clear and and display the identities
     * passed in, on the identity list
     *
     * @memberOf UserIdentityScreen
     * @method refreshIdentities
     * @private
     * @param {EcIdentity[]} identities
     * 			identities to display
     */
    function refreshIdentities(identities) {
        $("#identityKeys").html("");
        $("#addKeyIv").val("");
        for (var index in identities) {
            var wrapper = $("<div class='identityKey' style='min-height:1.33rem;'></div>");

            var id = identities[index];

            var ppk = id.ppk.toPem().replaceAll("\r?\n", "");
            var name = id.displayName;

            var element = $("<span class='has-tip'></span>");

            element.attr("title", ppk);

            var clickFunction = function () {
                copyTextToClipboard(ppk);
                alert("Copied Key to Clipboard");
            };

            element.on("click", clickFunction);
            element.text(name);
            wrapper.append(element);

            var editNameBtn = $("<i class='fa fa-pencil float-right'></i>");

            editNameBtn.on("click", function () {
                var text = element.text();

                editNameBtn.addClass("hide")

                element.off("click");
                element.removeClass("has-tip");
                element.attr("contenteditable", true);
                element.focus();
                var sel, range
                if (window.getSelection && document.createRange) {
                    range = document.createRange();
                    range.selectNodeContents(element.get(0));
                    range.collapse(true);
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (document.body.createTextRange) {
                    range = document.body.createTextRange();
                    range.moveToElementText(element.get(0));
                    range.collapse(true);
                    range.select();
                }

                element.blur(function () {
                    if (element.text() == "") {
                        element.text(text);
                    } else if (text != element.text()) {
                        id.displayName = element.text();
                        ModalManager.showModal(new SaveIdModal());
                    }

                    element.off("click");
                    element.on("click", clickFunction)
                    element.addClass("has-tip");

                    editNameBtn.removeClass("hide")

                });
            });

            wrapper.append(editNameBtn);

            $("#identityKeys").append(wrapper);

            var invitationOption = $("<option></option>");
            invitationOption.attr("value", ppk);
            invitationOption.text(name)
            $("#shareContactIdentity").append(invitationOption);

        }
    }

    /**
     * Called to clear and display the contacts
     * passed in, on the contact list
     *
     * @memberOf UserIdentityScreen
     * @method refreshIdentities
     * @private
     * @param {EcContact[]} contacts
     * 			contacts to display
     */
    function refreshContacts(contacts) {
        $("#contactList").html("");
        for (var index in contacts) {
            var pk = contacts[index].pk.toPem().replaceAll("\r?\n", "");
            var name = contacts[index].displayName;

            var element = $("<span></span>");
            element.attr("title", pk);
            element.text(name);

            $("#contactList").append(element);
            $("#contactList").append($("<br/>"));
        }
    }

    /**
     * Sets the key passed in as the current key in the identity controller
     *
     * @memberOf UserIdentityScreen
     * @method refreshIdentities
     * @private
     * @param {Object[]} ppk
     * 			list of files from the import input
     */
    function activateKey(ppk) {
        if (ppk.length == 0) {
            $("#addKeyPpk").addClass("is-invalid-label");
            return;

            $("#addKeyPpk").change(function () {
                $("#addKeyPpk").removeClass("is-invalid-label");
            })
        } else {
            $("#addKeyPpk").removeClass("is-invalid-label");
        }

        if (is(ppk, "FileList")) {
            for (var i in ppk) {
                var file = ppk[i];
                var fr = new FileReader();

                fr.onload = (function (file, fr) {
                    return function (event) {
                        AppController.identityController.addKey(fr.result, file.name.replace(".pem", ""), function () {
                            refreshIdentities(EcIdentityManager.ids);

                            AppController.loginController.loginServer.fetchServerAdminKeys(function (keys) {
                                for (var i = 0; i < EcIdentityManager.ids.length; i++) {
                                    if (keys.indexOf(EcIdentityManager.ids[i].ppk.toPk().toPem()) != -1) {
                                        AppController.loginController.setAdmin(true);
                                        ViewManager.getView("#menuContainer").checkAdmin()
                                    }
                                }
                            }, function () {

                            });

                            if (EcIdentityManager.ids.length == 1) {
                                AppController.identityController.select(EcIdentityManager.ids[0].ppk.toPem());
                            }

                            ModalManager.showModal(new SaveIdModal());

                            $("#addKeyPpk").replaceWith($("#addKeyPpk").val('').clone(true));

                            ViewManager.getView("#menuContainer").rebuildIdentityList();
                        });
                    }
                })(file, fr);

                if (is(file, "File"))
                    fr.readAsText(file);
            }
        } else {

        }
    }

    /**
     * Displays an error message
     *
     * @memberOf UserIdentityScreen
     * @method refreshIdentities
     * @private
     * @param {String} error
     * 			Error message to display
     */
    function displayMessage(error, errorClass) {
    	ViewManager.getView("#userIdentityMessageContainer").displayAlert(error, errorClass);

    }

    /**
     * Hides any error messages
     *
     * @memberOf UserIdentityScreen
     * @method refreshIdentities
     * @private
     */
    function hideMessage() {
    	ViewManager.getView("#userIdentityMessageContainer").clearAlert();
    }

    /**
     * Checks if the URL has a contact invitation in it and shows the
     * contact modal if so
     *
     * @memberOf UserIdentityScreen
     * @method refreshIdentities
     * @private
     * @param {EcScreen} screen
     * 			Current screen, used to reload page
     * @param {String} containerId
     * 			Current screen container id, used to reload page
     */
    function checkNewContact(screen, containerId) {
        var hashSplit = window.document.location.hash.split("?");

        if (hashSplit.length > 1) {
            var firstParam = hashSplit[1];

            if (firstParam.startsWith("action")) {
                var paramSplit = firstParam.split("&");

                if (paramSplit.length == 6 && paramSplit[0].startsWith("action") && paramSplit[1].startsWith("contactDisplayName") &&
                    paramSplit[2].startsWith("contactKey") && paramSplit[3].startsWith("contactServer") &&
                    paramSplit[4].startsWith("responseToken") && paramSplit[5].startsWith("responseSignature")) {
                    var actionSplit = paramSplit[0].split("=");

                    if (actionSplit.length > 1 && actionSplit[1] == "newContact") {
                        var displayName = decodeURIComponent(paramSplit[1].split("=")[1]);
                        var contactKey = decodeURIComponent(paramSplit[2].split("=")[1]);
                        var contactServer = decodeURIComponent(paramSplit[3].split("=")[1]);
                        var responseToken = decodeURIComponent(paramSplit[4].split("=")[1]);
                        var responseSignature = decodeURIComponent(paramSplit[5].split("=")[1]);

                        var c = new EcContact();
                        c.displayName = displayName;
                        c.pk = EcPk.fromPem(contactKey);
                        c.source = contactServer;
                        if (EcIdentityManager.getContact(c.pk) != null) {
                            ScreenManager.replaceHistory(screen, containerId, null);
                            return;
                        }
                        EcIdentityManager.addContact(c);
                        refreshContacts(EcIdentityManager.contacts)

                        ModalManager.showModal(new ContactGrantModal(c, responseToken, responseSignature, function () {
                            ModalManager.showModal(new SaveIdModal("You have added a contact"));
                        }));


                        ScreenManager.replaceHistory(screen, containerId, null);
                    }
                }
            }
        }
    }

    /**
     * Copys an inviation to the clipboard if possible
     *
     * @memberOf UserIdentityScreen
     * @method copyInvitationText
     * @private
     */
    function copyInvitationText(){
    	if (document.selection) {
    		document.selection.empty();
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById("invitationContainer"));
            range.select();
        } else if (window.getSelection) {
        	if (window.getSelection().empty) {  // Chrome
    		    window.getSelection().empty();
    		} else if (window.getSelection().removeAllRanges) {  // Firefox
    		    window.getSelection().removeAllRanges();
    		}
            var range = document.createRange();
            range.selectNode(document.getElementById("invitationContainer"));
            window.getSelection().addRange(range);
        }


        document.removeEventListener("copy",copyEvent,true);
        document.removeEventListener("copy",copyEvent,false);

        try {
        	var successful = document.execCommand('copy');
        	var msg = successful ? 'successful' : 'unsuccessful';
        	console.log('Copying text command was ' + msg);

	          if(successful){
	        	  $("#copyInvitation").find("#copy").css("display", "none");
	        	  $("#copyInvitation").find("#copied").css("display", "inline-block");

	        	  $("#copyInvitation").find("#copied").fadeOut(1000, function(){
	        		  $("#copyInvitation").find("#copy").css("display", "inline-block");
	        	  })
	        	  ViewManager.getView("#invitationMessageContainer").displaySuccess("Succesfully Copied to Clipboard");

	        	  setTimeout(function(){
	          		  ViewManager.getView("#invitationMessageContainer").clearSuccess();
	          	  }, 3000);
	          }else{
	        	  ViewManager.getView("#invitationMessageContainer").displayWarning("Unable to Copy to Clipboard")
	        	  ViewManager.getView("#invitationMessageContainer").clearSuccess();
	          }
        } catch (err) {
	          console.log('Oops, unable to copy');
	          ViewManager.getView("#invitationMessageContainer").displayWarning("Unable to Copy to Clipboard")
	          ViewManager.getView("#invitationMessageContainer").clearSuccess();
        }

        document.addEventListener("copy", copyEvent);
    }

    /**
     * Look in repository for any contact grants given by other users
     *
     * @memberOf UserIdentityScreen
     * @method refreshIdentities
     * @private
     */
    function checkContactGrants() {
        AppController.serverController.getRepoInterface().search(new EcContactGrant().getSearchStringByType(), function (encryptedValue) {
            EcRepository.get(encryptedValue.shortId(), function (encryptedValue) {
                var ev = new EcEncryptedValue();
                ev.copyFrom(encryptedValue);
                var grant = ev.decryptIntoObject();
                if (grant != null) {
                    var g = new EcContactGrant();
                    g.copyFrom(grant);
                    if (g.valid())
                        ModalManager.showModal(new ContactAcceptModal(g, function () {
                            refreshContacts(EcIdentityManager.contacts);
                            ModalManager.showModal(new SaveIdModal("You have added a contact"));
                        }));
                }
            }, null);
        }, null, null);
    }

    /**
	 * Overridden display function, called once html partial is loaded into DOM
	 *
	 * @memberOf UserIdentityScreen
	 * @method display
	 * @param containerId
	 * 			Screen Container DOM ID
	 */
    UserIdentityScreen.prototype.display = function (containerId) {
        var screen = this;

        ViewManager.showView(new MessageContainer("userIdentity"), "#userIdentityMessageContainer");
        ViewManager.showView(new MessageContainer("copyInvitation"), "#invitationMessageContainer");

        if (AppController.loginController.getLoggedIn()) {
            checkNewContact(screen, containerId);
            refreshContacts(EcIdentityManager.contacts);
            checkContactGrants();
        }

				$("#adminButton").click(function(e){
					e.preventDefault();
					ScreenManager.changeScreen(new UserAdminScreen());
				});

				if(!AppController.serverController.getAdmin()){
					$("#adminButtonContainer").parent().parent().remove();
				};

        refreshIdentities(EcIdentityManager.ids);


        $("#identityServerName").text(AppController.serverController.selectedServerName);
        $("#identityServerUrl").text(AppController.serverController.selectedServerUrl);

        $("#importIdentity").click(function (event) {
            event.preventDefault();

            $("#importContainer").removeClass("hide");
            $("#generateContainer").addClass("hide");
        });

        $("#startGenerateIdentity").click(function (event) {
            event.preventDefault();

            $("#generateContainer").removeClass("hide");
            $("#importContainer").addClass("hide");
        })

        $("#createImportIdentity").click(function (event) {
            event.preventDefault();

            activateKey($('#addKeyPpk')[0].files);
        });

        $("#generateIdentity").click(function () {
        	$("#generateInProgress").removeClass("hide");
        	$("#generateIdentity").addClass("hide");

            var name = $("#generateIdentityName").val();
            AppController.identityController.generateIdentity(function (identity) {
                refreshIdentities(EcIdentityManager.ids);
                download(identity.displayName + '.pem', identity.ppk.toPem());
                ModalManager.showModal(new SaveIdModal("Your identities have changed"));
                $("#generateIdentity").removeClass("hide");
            	$("#generateInProgress").addClass("hide");
            }, name);
        });

        $("#openSaveModal").click(function () {
            ModalManager.showModal(new SaveIdModal());
        });

        $("#generateInvitation").click(function () {
            var input = $("#shareContactName").val();

            if (input == undefined || input == "") {

                return;
            }

            var identityPpk = EcPpk.fromPem($("#shareContactIdentity").val());
            if (identityPpk == undefined || identityPpk == "") {

                return;
            }

            var invitation = "Hi, I would like to add you as a contact in CASS.\n\nIf we are using the same CASS system, you may click the following link. If not, change the URL of my CASS server (" + window.location.href.split('/')[2] + ") to yours.\n\n"

            var iv = EcAes.newIv(32);
            var url = window.location + "?action=newContact&contactDisplayName=" + encodeURIComponent(input) + "&contactKey=" + encodeURIComponent(identityPpk.toPk().toPem()) + "&contactServer=" + encodeURIComponent(AppController.serverController.selectedServerUrl) + "&responseToken=" + encodeURIComponent(iv) + "&responseSignature=" + encodeURIComponent(EcRsaOaep.sign(identityPpk, iv));


            var string = invitation + url;

            invitation = invitation.replaceAll("Hi,", "Hi, <br/><br/>")

            $("#invitationBox").html(invitation);
            $("#linkBox").text(url);

            $("#invitationContainer").removeClass("hide")
            $("#invitationContainerHeader").removeClass("hide")
            $("#copyInvitation").removeClass("hide");

            $("#generateInvitation").text("Re-Generate")

            $("#invitationContainer").click(function(ev){
            	if($(ev.target).attr("id") != "invitationBox"){
            		copyInvitationText();
            	}
            })


            $("#copyInvitation").mousedown(function(){
            	copyInvitationText();
            });

            setTimeout(function(){
            	copyInvitationText();
            }, 100)
        });
    };

    UserIdentityScreen.prototype.refreshIdentities = function(ids){
        refreshIdentities(ids);
    }

    return UserIdentityScreen;
})(UserIdentityScreen);
WelcomeScreen = (function(WelcomeScreen){
	
	WelcomeScreen.prototype.display = function(containerId)
	{
	    $("#appName").text(AppSettings.applicationName)
		$("#appDescription").html(AppSettings.applicationDescription);

		$("#frameworkManagementBtn").click(function(){
            ScreenManager.changeScreen(new CassEditorScreen());
        });

		$("#competencyAlignmentBtn").click(function(){
            ScreenManager.changeScreen(new AlignmentEditorScreen());
        });

		$("#learnerProfilesBtn").click(function(){
            ScreenManager.changeScreen(new AssertionSearchScreen());
		});
	};

	
	return WelcomeScreen;
})(WelcomeScreen);