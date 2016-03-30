Ext.define('CL.controller.C_signup_firm', {
    extend: 'Ext.app.Controller',

    routes: {
        'signup_firm' : 'showView',
        'signup_firm_profile' : 'showViewProfilo',
        'signup_firm_titles' : 'showViewTitoli',
        'signup_firm_files' : 'showViewFiles'
    },

    stores: [
        //
    ],
    models: [
        //'M_generic'
    ],
    views: [
        'signup_firm.V_form',
        'signup_firm.V_form_profilo',
        'signup_firm.V_form_files'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

        }, this);
    },
    /////////////////////////////////////////////////


    //SHOW VIEW
    showView: function(){
        try{Ext.ComponentQuery.query("toast")[0].destroy()}catch(e){}

        if(Ext.util.Cookies.get("ced_logged") !== null){
            this.redirectTo("admin_panel");
        }
        else{
            if(Ext.ComponentQuery.query('signup_firm_form').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'signup_firm_form'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('signup_firm_form_id');

            Ext.StoreManager.lookup("S_servizio").load({
                callback: function(){
                    //carico le selezioni dagli eventuali cookies
                    var servizi_selezionati = Ext.JSON.decode(Ext.util.Cookies.get("servizi_selezionati"));
                    if(servizi_selezionati!=null){
                        servizi_selezionati.forEach(function(servizio){
                            var record_servizio = Ext.StoreManager.lookup("S_servizio").getById(servizio.id);
                            Ext.ComponentQuery.query('signup_firm_form')[0].down("grid").getSelectionModel().select(record_servizio,true,true);
                            record_servizio.set({anni_esperienza: servizio.anni_esperienza});
                        });
                    }
                }
            });

        }
    },

    //SHOW VIEW PROFILO
    showViewProfilo: function(){
        try{Ext.ComponentQuery.query("toast")[0].destroy()}catch(e){}

        if(Ext.util.Cookies.get("ced_logged") !== null){
            this.redirectTo("admin_panel");
        }
        else{
            if(Ext.ComponentQuery.query('signup_firm_form_profilo').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'signup_firm_form_profilo'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('signup_firm_form_profilo_id');

            //carico gli eventuali cookies nel form
            var profilo_values = Ext.JSON.decode(Ext.util.Cookies.get("signup_firm_profilo"));
            Ext.ComponentQuery.query("signup_firm_form_profilo")[0].down('form').getForm().setValues(profilo_values);
        }
    },



    //SHOW VIEW FILEs
    showViewFiles: function(){
        try{Ext.ComponentQuery.query("toast")[0].destroy()}catch(e){}

        if(Ext.util.Cookies.get("ced_logged") !== null){
            this.redirectTo("admin_panel");
        }
        else{
            if(Ext.ComponentQuery.query('signup_firm_form_files').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'signup_firm_form_files'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('signup_firm_form_files_id');
        }
    }



});
