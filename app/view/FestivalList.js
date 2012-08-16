Ext.define('wgo-hung.view.FestivalList', {
    extend: 'Ext.navigation.View',
    xtype: 'festivallist',
    requires: [
        'wgo-hung.store.FestivalStore',
        'Ext.dataview.List'
    ],
    config: {
        cls:'clsUsers',
        fullscreen: true,
        iconCls: 'favorites',
        title: 'Festivals', //Icon subtext
        items: [
            {
            title: 'Festivals', //Title appear in Title bar
            xtype: 'list',
            id: 'idFestivalList', // we are using this inside the controller @ control
            itemTpl:
                    '<div class="vm-festival">' +
                    '<div>' +
                    '<span class="vm-festival-title">{name}</span>' +
                    //'<span class="vm-festival-timings">{period}</span>' +
                    //'<div class="vm-festival-content">{details}</div>' +
                    '</div>' +
                    '</div>',
            store: 'FestivalStore',
            onItemDisclosure: true,
                plugins: [ //Reference code from "http://stackoverflow.com/questions/7321446/sencha-list-paging-plugin"
                {
                    xclass: 'Ext.plugin.ListPaging',
                    autoPaging: true,
                    // These override the text; use CSS for styling
                    loadMoreText: 'Load more records...',
                    noMoreRecordsText: 'All messages loaded'
                }
            ]
        },
        {
            xtype: 'header',
            docked: 'top'
        },
        {
            xtype: 'toolbar',
            ui:'dark',
            docked:'top',
            items: [
                    {xtype: 'spacer'},
                    {xtype: 'title',
                    title: 'Festivals'
                    },
                    {xtype: 'spacer'},
                    {
                        iconMask:true,
                        iconCls: 'add',
                        ui: 'plain',
                        align: 'right',
                        action:'btnAddFestival',
                        id: 'idBtnAddFestival'
                    },
                    {
                        iconMask:true,
                        iconCls: 'reply',
                        ui: 'plain',
                        hidden: true,
                        align: 'right',
                        action: 'btnBackFestival',
                        id: 'idBtnBackFestival'
                    }]
        }

    ],
        listeners: {
            activate: function() {
                //console.log('FestivalList Active Item Id = ' + this.getActiveItem().getId());
                //debugger;
                console.log(' Active Item Check = ' + Number(this.getActiveItem().getActiveItem()).toString() == Number.NaN);
                if(Number(this.getActiveItem().getActiveItem()).toString() == '0')
                {
                    this.pop();
                }
            }
        }
    },
    initialize: function() {
        console.log("Festival List Initialize (Start)")
        this.callParent();
        //Loading Store on page load
        Ext.getStore('FestivalStore').load(); //Why do we have to getStore at all?  Not autoload?
        console.log("Festival List Initialize (End)")
    }
});