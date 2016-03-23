Ext.define('CL.controller.C_home', {
    extend: 'Ext.app.Controller',

    routes: {
        'home' : 'showView'
    },

    stores: [
        //
    ],
    models: [
        //
    ],
    views: [
        'home.V_home'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            // TEST WINDOW
            'home button[action=test_window]':{
                click: this.testWindow
            },

            //GO TO OTHER VIEW
            'home button[action=go_to_second_view]':{
                click: this.goToSecondView
            }


        }, this);
    },
    /////////////////////////////////////////////////

    //ROUTES

    showView: function(){
        if(Ext.util.Cookies.get("ced_logged") !== null){
            this.redirectTo("admin_panel");
        }
        else{
            if(Ext.ComponentQuery.query('home').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'home'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('home_id');
        }

    },

    /////////////////////////////////////////////////


    //DO LOGOUT
    doLogout: function () {
        // Remove the localStorage key/value
        localStorage.removeItem('TutorialLoggedIn');

        this.redirectTo('login');
    }    


});
