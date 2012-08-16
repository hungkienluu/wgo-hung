Ext.define("wgo-hung.view.AddFestival", {
    extend: "Ext.form.Panel",
    xtype: 'addfestival',
    id: 'festivalForm',
    config: {
        cls:"vm-form",  //this class will override sencha's form background color to white",
        scrollable:true,
        items: [
            {
                xtype: 'textfield',
                name: 'txtFestivalId', // We use this to get the values from the form object i.e. form.getValues().txtUserName
                id: 'txtFestivalId',
                labelWidth:'0%',
                cls:"vm-txt-usrid", //this will decorate the text box with "user" icon and also round bord the form control
                ClearIcon: false,
                hidden:true, //why is there a hidden field here?
                disabled:true,                
                style: 'align: center'
            },
            {
                xtype: 'textfield',
                name: 'txtFestivalName', // We use this to get the values from the form object i.e. form.getValues().txtUserName
                id: 'txtFestivalName',
                labelWidth:'0%',
                ClearIcon: false,
                style: 'align: center'
            },
            {
                xtype: 'textfield',
                name: 'txtFestivalDetails', // We use this to get the values from the form object i.e. form.getValues().txtUserName
                id: 'txtFestivalDetails',
                labelWidth:'0%',
                ClearIcon: false,
                placeHolder: 'Enter your Festival Details',
                style: 'align: center'
            },
            {
                xtype: 'textfield',
                name: 'txtFestivalCity', // We use this to get the values from the form object i.e. form.getValues().txtEmail
                id: 'txtFestivalCity',
                labelWidth:'0%',
                ClearIcon: false,
                placeHolder: 'Enter the City',
                style: 'align: center'
            },
            {
                xtype: 'textfield',
                name: 'txtFestivalPeriod', // We use this to get the values from the form object i.e. form.getValues().txtEmail
                id: 'txtFestivalPeriod',
                labelWidth:'0%',
                ClearIcon: false,
                placeHolder: 'Enter the Period',
                style: 'align: center'
            },         
            {
                xtype: 'textfield',
                name: 'txtFestivalTiming', // We use this to get the values from the form object i.e. form.getValues().txtEmail
                id: 'txtFestivalTiming',
                labelWidth:'0%',
                ClearIcon: false,
                placeHolder: 'Enter the Time',
                style: 'align: center'
            },
            {
                xtype: 'numberfield',
                name: 'txtFestivalTelephone',
                id: 'txtFestivalTelephone',
                labelWidth:'0%',
                ClearIcon: false,
                placeHolder: 'Enter the Phone Number'
            },
            {
                xtype: 'button',
                name: 'btnFestivalSubmit',
                id:'btnFestivalSubmit',
                action: 'btnFestivalSubmit', //Find button by action name inside the controller to attach event handlers
                text: 'Submit Festival',
                width:"100%",
                ui: 'confirm' //Green Theme
            }
        ]
    },
    initialize: function() {
        console.log("User View Initialize (Start)")
        console.log("User View Initialize (End)")
    }
});
