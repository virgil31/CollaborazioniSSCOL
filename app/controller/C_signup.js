Ext.define('CL.controller.C_signup', {
    extend: 'Ext.app.Controller',

    routes: {
        'signup' : 'showView'
    },

    stores: [
        //
    ],
    models: [
        //'M_generic'
    ],
    views: [
        'signup.V_form'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

        }, this);
    },
    /////////////////////////////////////////////////


    //SHOW VIEW
    showView: function(){
        if(Ext.ComponentQuery.query('signup_form').length == 0)
            Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'signup_form'});

        Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('signup_form_id');
    }



});
