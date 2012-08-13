Ext.define("wgo-hung.view.FestivalList", {
    extend: 'Ext.navigation.View',
    xtype: 'festivallist',
    requires: [
    'wgo-hung.store.FestivalStore',
    'Ext.dataview.List'
    ],
    config: {
    	iconCls: 'favorites',
    	title: 'Festivals',
    	items: [
    		{title: 'Festivals',
    		xtype: 'list',
    		//id: 'idfestivallist', //I have to remove this ID or I get errors that this ID has already been called when I return to it after going to 'Main' using 'mainbar' 'home' button
    		itemTpl:
                    '<div class="vm-festival">' +
                    '<div>' +
                    '<span class="vm-festival-title">{name}</span>' +
                    '<span class="vm-festival-timings">{period}</span>' +
                    '<div class="vm-festival-content">{details}</div>' +
                    '</div>' +
                    '</div>',
    		store:'FestivalStore',
    		onItemDisclosure: true,
            plugins: [ //Reference code from "http://stackoverflow.com/questions/7321446/sencha-list-paging-plugin"
                {
                    xclass: 'Ext.plugin.ListPaging',
                    autoPaging: true,
                    // These override the text; use CSS for styling
                    loadMoreText: 'Loading more records...',
                    noMoreRecordsText: 'All messages loaded'
                }
            ]  
    	},
    		{
    			xtype: 'header',
    			docked: 'top'
            },
            {
            	xtype: 'mainbar'
            }
            
            ]
    }
});