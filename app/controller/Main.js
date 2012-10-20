Ext.define('wgo-hung.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginForm:'login' // <anyKey> : <object/dom identifier> this will freely create a function called get<AnyKey>()
            // We can also use xtype i.e. loginForm:'login'
        },
        control: {
            //Attach event handlers for controls matched by component queries. In this case button whose action="btnLoginSubmit" is queried
            // and for the query result, event handler function "submitLoginForm" is attached
            'button[action=btnLoginSubmit]' : {tap:"submitLoginForm"}, //Uses ComponentQuery selector to find the matching
            'button[action=btnDashboardClick]' : {tap:"btnDashboardClick"} //Uses ComponentQuery selector to find the matching
        }
    },
    //------------------------------------------------------------------------------------------------------------------
    init: function() {
        console.log("Main controller init(Start)");
        console.log("Main controller init(End)");
    },
    //------------------------------------------------------------------------------------------------------------------
    //Event Handler for login button tap action
    submitLoginForm:function(){
        console.log("login button tap event (Start)");
        // Mask the viewport
        Ext.Viewport.mask();
        var form = this.getLoginForm(); //We got this for free through refs above
        //get username and password from form elements
        var user = form.getValues().txtUserName;
        var pwd = form.getValues().txtPassword;
        console.log("Before Form Submit")

        //POST request to auth_token service
        Ext.Ajax.request({
            url: 'http://enigmatic-beyond-3653.herokuapp.com/api/v1/tokens.json',
            method: 'POST',
            type: 'json',
            params: {
                username: user,
                password: pwd
            },
            callback: this.onAuthenticateCallback,
            scope: this
        });

        //console.log("login button tap event (End)");
    },
    //------------------------------------------------------------------------------------------------------------------
    //Event Handler Home dashboard button
    btnDashboardClick:function(){
        console.log("btnDashboardClick (Start)")
        Ext.getCmp('idMain').setActiveItem(2,{type: 'slide', direction: 'right'}).getTabBar().show();
        console.log("btnDashboardClick (End)")
    },
    onAuthenticateCallback: function(options, success, response) {
        var authToken = JSON.parse(response.responseText);
        if(success == true){
            Ext.Viewport.unmask();
            localStorage.setItem('auth_token', authToken.token);
            // wgo-hung.app.token = localStorage.getItem('auth_token');
            // wgo-hung.app.token = authToken.token;
            // console.log("Global Variable Token : "+wgo-hung.app.token);
            Ext.Viewport.setActiveItem({xtype:'main'},{type: 'slide', direction: 'right'});
        }
        else{
            Ext.Viewport.unmask();
            Ext.Msg.alert("Unauthorized Access");
        }
    }
});
