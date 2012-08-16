Ext.define('wgo-hung.controller.UserController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            //For the matching component query / xtype, sencha will create a free function for us whose name will be get<KeyName>()            
            userlist:'userlist', //this will give the instance of 'userlist' view
            userForm:'#userForm' //this will give instance of userForm being called by its ID (Filename is AddUser.js)
        },
        control: {
            'button[action=btnAddUser]' : {tap:"showUserForm"},
            'button[action=btnBack]' : {tap:"showUserList"},
            'button[action=btnUserSubmit]' : {tap:"btnUserSubmitClick"},
            '#idUserList': {disclose: 'showEdit'} //"#idUserList" is a component query (can say dom selector)
        }
    },
    //------------------------------------------------------------------------------------------------------------------
    init: function() {
        console.log("User controller init(Start)")
        console.log("User controller init(End)")
    },
    //------------------------------------------------------------------------------------------------------------------
    showUserForm: function() {
        console.log("User controller showUserForm(Start)")
        var auv = Ext.create("wgo-hung.view.AddUser"); //create an instance of the AddUser form
        this.getUserlist().push(auv); //getUserlist refers to the UserList object which is a Navigation.View component.  We want to push(auv which is the varaible for AddUser) into the screen.
        this.toggleAddFormButtons() //When we do this, we also want to toggle the AddFormButtons which is a function defined below
        console.log("User controller showDetail(End)")
    },
    showUserList: function() {
        console.log("User controller showUserList(Start)")
        this.getUserlist().pop(); //showUserList is when we are in Form and we want to go back to Userlist.  We are going to pop the current view which is the AddUser form from the UserList Navigation container
        Ext.getCmp('idBtnAdd').show(); //This tells us to show the Add button. Unclear at this time if we need this if we already have the ToggleAddFormsButtons function
        Ext.getCmp('idBtnBack').hide(); //This tells us to hid the back button.  See comment above. We could make a real toggle? But it looks like the toggle is one way only.
        console.log("User controller showUserList(End)")
    },
    btnUserSubmitClick: function() {
        console.log("User controller btnUserSubmitClick(Start)")
        var username = Ext.getCmp('txtUser').getValue(), // Get form value by Dom identifier (this is the ID as we specified in AddUser.js view)
            password = Ext.getCmp('txtPwd').getValue(),
            email = Ext.getCmp('txtEmail').getValue(),
            id = Ext.getCmp('txtUserId').getValue() 
        Ext.getCmp('userForm').setMasked({
            xtype: 'loadmask',
            message: 'Adding New user...'
        });
        //Run with "chrome.exe --disable-web-security" to allow cross domain call (recommended for development)
        //PhoneGap supports Cross Domain.
        //Reference:
        //a) http://stackoverflow.com/questions/3102819/chrome-disable-same-origin-policy
        //b)
        //CORS / Cross Domain Request
        //JSONP
        Ext.Ajax.request({
            //url: 'http://wgo-1.apphb.com/user', 
            //http://localhost:4404/user/update/2,
            //http://wgo-hung-ror.herokuapp.com/users/saveUser'
            url: 'http://blooming-cliffs-5908.herokuapp.com/users/saveUser',
            method: 'post',
            type:'json',
            params: { //the params should match the RoR form. To check this
                id: id,
                username: username,
                password: password,
                email: email
            },
            callback: this.onAddUserCallback, //Why do we add a callback? I should read but it's to tell the client that the Server is ready to send data back? But this seems like we are calling a fn.
            scope: this //What is scope? The scope in which the action should be called.  Unclear what this means. 
        });

        //adduser
        console.log("password = [" + password + "]")
        console.log("User controller btnUserSubmitClick (End)")
    },
    //This is the Callback function which says to return to the UserList view.
    onAddUserCallback: function(options, success, response) {

        Ext.getCmp('userForm').setMasked(false);
        Ext.getStore('UserStore').load();
        //Ext.Viewport.setActiveItem(Ext.getCmp('userlist'));
        this.showUserList();

    },
    //------------------------------------------------------------------------------------------------------------------
    showEdit: function(list, record) {
    console.log("User controller showEdit(Start)")
    console.log(record.getData().id);
    var recordId = record.getData().id;  
    //Create the AddUser view and then setValues with record.get'd Data
    var auv = Ext.create("wgo-hung.view.AddUser");
        auv.setValues({
        txtUserId: record.get("id"),
        txtUser: record.get("username"),
        txtEmail: record.get("email"),
        txtPwd: record.get("password")
    });    
        var but = auv.getAt(4) //Why are we doing a getAt(4) which refers to item #4 in the AddUser.js view which is the Submit button? Just another way to do?
        but.setText("Edit") //Set the text of that button to "Edit"

        this.getUserlist().push(auv); //After setting all of the data, let's push the Edit Form view.  This is the same view as Add User view but we pre-set a few items
        this.toggleAddFormButtons()
    console.log("User controller showEdit(End)")
},
//When we call this function, we want to hide Add Button and Show the BtnBack.
toggleAddFormButtons : function(){
    Ext.getCmp('idBtnAdd').hide();
    Ext.getCmp('idBtnBack').show();
    //Ext.getCmp('btnUserSubmit').setText("");
}


});
