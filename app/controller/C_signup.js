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

            //carico le selezioni dagli eventuali cookies
            var servizi_selezionati = Ext.JSON.decode(Ext.util.Cookies.get("servizi_selezionati"));

            Ext.StoreManager.lookup("S_servizio").load({
                callback: function(){
                    servizi_selezionati.forEach(function(servizio){
                        var record_servizio = Ext.StoreManager.lookup("S_servizio").getById(servizio.id);
                        Ext.ComponentQuery.query('signup_form')[0].down("grid").getSelectionModel().select(record_servizio,true,true);
                        record_servizio.set({anni_esperienza: servizio.anni_esperienza});
                    });
                }
            });

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

            //carico gli eventuali cookies nel form
            var profilo_values = Ext.JSON.decode(Ext.util.Cookies.get("signup_profilo"));
            Ext.ComponentQuery.query("signup_form_profilo")[0].down('form').getForm().setValues(profilo_values);
        }
    }


});
