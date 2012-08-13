Ext.define('wgo-hung.controller.Festival', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            //Refs enable us to do component query or query by xtype.  Sencha auto creates a function like getMain or getLoginform for us
            //<anyKey> : <object / dom identifier / xtype> is the structure for refs
            festivallist: 'festivallist'
        },
        control: {
            //Attach event handlers for controls matched by component queries
            'festivallist list': {disclose: 'showDetail'}, //"#idFestivalList" is a component query (can be a DOM selector)
        }
    },
     
    showDetail: function(list, record) {
        console.log("item disclose " + record.get('name'))
        //Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
       
        this.getFestivallist().push({
            xtype:'festivaldetail',
            title: record.get('name'),
            data: record.getData()
        })
    }
 });