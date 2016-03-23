Ext.define('CL.controller.C_signup', {
    extend: 'Ext.app.Controller',

    routes: {
        'signup' : 'showView',
        'signup_profile' : 'showViewprofilo'
    },

    stores: [
        //
    ],
    models: [
        //'M_generic'
    ],
    views: [
        'signup.V_form',
        'signup.V_form_profilo'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

        }, this);
    },
    /////////////////////////////////////////////////


    //SHOW VIEW
    showView: function(){
        if(Ext.util.Cookies.get("ced_logged") !== null){
            this.redirectTo("admin_panel");
        }
        else{
            if(Ext.ComponentQuery.query('signup_form').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'signup_form'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('signup_form_id');
        }
    },

    //SHOW VIEW PROFILO
    showViewprofilo: function(){
        if(Ext.util.Cookies.get("ced_logged") !== null){
            this.redirectTo("admin_panel");
        }
        else{
            if(Ext.ComponentQuery.query('signup_form_profilo').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'signup_form_profilo'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('signup_form_profilo_id');

            var profilo_values = Ext.JSON.decode(Ext.util.Cookies.get("signup_profilo"));
            Ext.ComponentQuery.query("signup_form_profilo")[0].down('form').getForm().setValues(profilo_values);
        }
    }


});
