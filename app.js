Ext.application({
    name: 'wgo-hung',

    models: ['Festival','Issue','User'],
    views:  ['Header','Footer','Login','Home', 'Main','FestivalList','IssueList','UserList','AddUser'],
    controllers: ['Main','Festival','UserController'],
    stores: ['FestivalStore','IssueStore','UserStore'],
    token: "",
    requires: [
        'Ext.MessageBox',
        'Ext.util.DelayedTask'
    ],

    viewport: {
        autoMaximize: true
    },

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        //Delaying for a while
        var task = Ext.create('Ext.util.DelayedTask', function() {
            // Destroy the #appLoadingIndicator element. Ext.fly is like Ext.get
            Ext.fly('appLoadingIndicator').destroy();
            //Change the index.html background color to white
            Ext.get('wgo-pg-body').setStyle('backgroundColor', 'white');
            // Initialize the main view
            Ext.Viewport.add(Ext.create('wgo-hung.view.Login'));
        });
        task.delay(0);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
