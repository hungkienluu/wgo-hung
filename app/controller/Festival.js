Ext.define('wgo-hung.controller.Festival', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            //For the matching component query / xtype, sencha will create a free function for us whose name will be get<KeyName>()
           //main: 'main', //this will give the instance of 'main' view
            festivallist:'festivallist', //this will give the instance of 'festivallist' view
            festivalform: '#festivalForm'
        },
        control: {
            'button[action=btnAddFestival]' : {tap:"showFestivalForm"},
            'button[action=btnBackFestival]' : {tap:"showFestivalList"},
            'button[action=btnFestivalSubmit]' : {tap:"btnFestivalSubmitClick"},
            '#idFestivalList': {disclose: 'showEdit'} //"#idFestivalList" is a component query (can say dom selector)
        }
    },
    //------------------------------------------------------------------------------------------------------------------
    init: function() {
        console.log("Festival controller init(Start)")
        console.log("Festival controller init(End)")
    },
    //------------------------------------------------------------------------------------------------------------------
    showFestivalForm: function() {
        console.log("Festival controller showFestivalForm(Start)")
        var addingFestival = Ext.create("wgo-hung.view.AddFestival"); //create an instance of the AddFestival form
        this.getFestivallist().push(addingFestival); 
        this.toggleAddFormButtons() //When we do this, we also want to toggle the AddFormButtons which is a function defined below
        console.log("Festival controller showDetail(End)")
    },
    showFestivalList: function() {
        console.log("User controller showFestivalList(Start)")
        this.getFestivallist().pop(); //showUserList is when we are in Form and we want to go back to Userlist.  We are going to pop the current view which is the AddUser form from the UserList Navigation container
        Ext.getCmp('idBtnAddFestival').show(); //This tells us to show the Add button. Unclear at this time if we need this if we already have the ToggleAddFormsButtons function
        Ext.getCmp('idBtnBackFestival').hide(); //This tells us to hid the back button.  See comment above. We could make a real toggle? But it looks like the toggle is one way only.
        console.log("User controller showFestivalList(End)")
    },
    btnFestivalSubmitClick: function() {
        console.log("Festival controller btnFestivalSubmitClick(Start)")

        Ext.getCmp('festivalForm').setMasked({
            xtype: 'loadmask',
            message: 'Adding New user...'
        });
        
        var id = Ext.getCmp('txtFestivalId').getValue();    

        if(id==''){ //if record ID on form is blank (we got this with getCmp above) then make it a POST
        this.PostAjaxRequest();
        } 
    else{
        this.PutAjaxRequest();
        };
        //adduser
        console.log("title = [" + name + "]")
        console.log("Festival controller btnFestivalSubmitClick (End)")
    
},

//This is function is a POST method to our backend server.
    PostAjaxRequest: function(options, success, response) {
        var id = Ext.getCmp('txtFestivalId').getValue(),
            name = Ext.getCmp('txtFestivalName').getValue(),
            details = Ext.getCmp('txtFestivalDetails').getValue(),
            city = Ext.getCmp('txtFestivalCity').getValue(),
            period = Ext.getCmp('txtFestivalPeriod').getValue(),
            timings = Ext.getCmp('txtFestivalTiming').getValue(),
            telephone = Ext.getCmp('txtFestivalTelephone').getValue() 
        Ext.Ajax.request({
            url: 'http://blooming-cliffs-5908.herokuapp.com/festivals.json',
            //url: 'http://localhost:3000/festivals.json',
            method: 'POST',
            type:'json',
            params: {
                'id': id,
                'name': name,
                'details': details,
                'city': city,
                'period': period,
                'timings': timings,
                'telephone': telephone
            },
            callback: this.onAddFestivalCallback, //Why do we add a callback? I should read but it's to tell the client that the Server is ready to send data back? But this seems like we are calling a fn.
            scope: this //What is scope? The scope in which the action should be called.  Unclear what this means. 
        });
},

//This is function is a PUT method to our backend server.
    PutAjaxRequest:function(options, success, response) {
        var id = Ext.getCmp('txtFestivalId').getValue(),
            name = Ext.getCmp('txtFestivalName').getValue(),
            details = Ext.getCmp('txtFestivalDetails').getValue(),
            city = Ext.getCmp('txtFestivalCity').getValue(),
            period = Ext.getCmp('txtFestivalPeriod').getValue(),
            timings = Ext.getCmp('txtFestivalTiming').getValue(),
            telephone = Ext.getCmp('txtFestivalTelephone').getValue()     

        Ext.Ajax.request({
            url: 'http://blooming-cliffs-5908.herokuapp.com/festivals/' + id + '.json',
            //url: 'http://localhost:3000/festivals/' + id + '.json',
            method: 'PUT',
            type:'json',
            params: {
                'id': id,
                'name': name,
                'details': details,
                'city': city,
                'period': period,
                'timings': timings,
                'telephone': telephone
            },
            callback: this.onAddFestivalCallback, //Why do we add a callback? I should read but it's to tell the client that the Server is ready to send data back? But this seems like we are calling a fn.
            scope: this //What is scope? The scope in which the action should be called.  Unclear what this means. 
        });
},
    //This is the Callback function which says to return to the UserList view.
    onAddFestivalCallback: function(options, success, response) {

        Ext.getCmp('festivalForm').setMasked(false);
        Ext.getStore('FestivalStore').load();
        //Ext.Viewport.setActiveItem(Ext.getCmp('userlist'));
        this.showFestivalList();

    },
    //------------------------------------------------------------------------------------------------------------------
    showEdit: function(list, record) {
    console.log("Festival controller showEdit(Start)")
    console.log(record.getData().id);
    var recordId = record.getData().id;  
    //Create the AddUser view and then setValues with record.get'd Data
    var auv = Ext.create("wgo-hung.view.AddFestival");
        auv.setValues({
        txtFestivalId: record.get("id"), //this is the same id that RoR uses.  We are using it to populate the Sencha form (hidden ID field).
        txtFestivalName: record.get("name"),
        txtFestivalDetails: record.get("details"),
        txtFestivalCity: record.get("city"),
        txtFestivalPeriod: record.get("period"),
        txtFestivalTiming: record.get("timings"),
        txtFestivalTelephone: record.get("telephone")
    });    
        var but = auv.getAt(7); //Why are we doing a getAt(4) which refers to item #4 in the AddUser.js view which is the Submit button? Just another way to do?
        but.setText("Edit"); //Set the text of that button to "Edit"

        this.getFestivallist().push(auv); //After setting all of the data, let's push the Edit Form view.  This is the same view as Add User view but we pre-set a few items
        this.toggleAddFormButtons()
    console.log("Festival controller showEdit(End)")
},
//When we call this function, we want to hide Add Button and Show the BtnBack.
toggleAddFormButtons : function(){
    Ext.getCmp('idBtnAddFestival').hide();
    Ext.getCmp('idBtnBackFestival').show();
    //Ext.getCmp('btnUserSubmit').setText("");
}

});
