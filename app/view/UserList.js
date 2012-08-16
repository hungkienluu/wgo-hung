//This is a Navigation View for the User List.  It also sits inside the TabPanel
Ext.define('wgo-hung.view.UserList', {
    extend: 'Ext.navigation.View',
    xtype: 'userlist',
    requires: [
        'wgo-hung.store.UserStore',
        'Ext.dataview.List'    
    ],
    config: {
        cls:'clsUsers',
        fullscreen: true,
        iconCls: 'team',
        title: 'Users', //Icon subtext
        items: [
            {
                title: 'Users', //Title appear in Title bar
                xtype: 'list',
                id: 'idUserList', // we are using this inside the controller @ control
                itemTpl: Ext.create('Ext.XTemplate',
                    '<div class="vm-wgo-monthly-issues">',
                    '<img src="resources/images/issues.png" />',
                    '<div class="issue">{username}</div>',
                    '</div>'
                ),
                store: 'UserStore', //we have to call out the store here?
                onItemDisclosure: true,
                plugins: [ //Reference code from "http://stackoverflow.com/questions/7321446/sencha-list-paging-plugin"
                    {
                        xclass: 'Ext.plugin.ListPaging',
                        autoPaging: true,
                        // These override the text; use CSS for styling
                        loadMoreText: 'Load more records',
                        noMoreRecordsText: 'All messages loaded'
                    }
                ]
            },
            {
                xtype: 'header',
                docked: 'top'
            },
            {
                    xtype:"toolbar",
                    ui:"dark",
                    docked:"top",
                    items: [
                            {xtype: 'spacer'},
                            {   xtype: 'title' ,
                                title:"Users"
                            },
                            {xtype: 'spacer'}, //spacer puts space between two objects in a toolbar component
                            {
                                iconMask:true,
                                iconCls: 'add',
                                ui: 'plain',
                                align: 'right',
                                action:'btnAddUser',
                                id:'idBtnAdd'
                            },
                            {
                                iconMask:true,
                                iconCls: 'reply', //Why are we using a reply button? and not a back button?
                                ui: 'plain',
                                hidden:true, //We hide this because we are going to toggle it to show when we want it to show. In this case, it shows when we are in Edit form.
                                align: 'right',
                                action:'btnBack',
                                id:'idBtnBack'
                            }
                            ]
                }
            ]
    },

    initialize: function() {
        console.log("User List Initialize (Start)")
        this.callParent();
        //Loading Store on page load
        Ext.getStore('UserStore').load(); //Why do we have to getStore at all?  Not autoload?
        console.log("User List Initialize (End)")

    }
});