Ext.define('CL.controller.C_signup', {
    extend: 'Ext.app.Controller',

    routes: {
        'signup' : 'showView',
        'signup_profile' : 'showViewProfilo',
        'signup_titles' : 'showViewTitoli',
        'signup_files' : 'showViewFiles'
    },

    stores: [
        //
    ],
    models: [
        //'M_generic'
    ],
    views: [
        'signup.V_form',
        'signup.V_form_profilo',
        'signup.V_form_titoli',
        'signup.V_form_files'
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
            if(Ext.ComponentQuery.query('signup_form').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'signup_form'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('signup_form_id');



            Ext.StoreManager.lookup("S_servizio").load({
                callback: function(){
                    //carico le selezioni dagli eventuali cookies
                    var servizi_selezionati = Ext.JSON.decode(Ext.util.Cookies.get("servizi_selezionati"));
                    if(servizi_selezionati!=null){
                        servizi_selezionati.forEach(function(servizio){
                            var record_servizio = Ext.StoreManager.lookup("S_servizio").getById(servizio.id);
                            Ext.ComponentQuery.query('signup_form')[0].down("grid").getSelectionModel().select(record_servizio,true,true);
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
            if(Ext.ComponentQuery.query('signup_form_profilo').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'signup_form_profilo'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('signup_form_profilo_id');

            //carico gli eventuali cookies nel form
            var profilo_values = Ext.JSON.decode(Ext.util.Cookies.get("signup_profilo"));
            Ext.ComponentQuery.query("signup_form_profilo")[0].down('form').getForm().setValues(profilo_values);
        }
    },


    //SHOW VIEW TITOLI
    showViewTitoli: function(){
        try{Ext.ComponentQuery.query("toast")[0].destroy()}catch(e){}

        if(Ext.util.Cookies.get("ced_logged") !== null){
            this.redirectTo("admin_panel");
        }
        else{
            if(Ext.ComponentQuery.query('signup_form_titoli').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'signup_form_titoli'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('signup_form_titoli_id');

            Ext.StoreManager.lookup("S_tipo_laurea").load({
                params:{
                    flag_full: true
                }
            });
            Ext.StoreManager.lookup("S_tipo_specializzazione").load({
                params:{
                    flag_full: true
                }
            });
            Ext.StoreManager.lookup("S_diploma").load({
                params:{
                    flag_full: true
                }
            });

            Ext.toast({
                html: "Nel caso il candidato avesse più lauree o più specializzazioni, inserisca negli appositi campi solo quella più attinente alla tipologia di servizio professionale prescelto, riportando gli altri titoli nell'allegato CV che sarà sempre consultato per valutare adeguatamente le capacità e le competenze del candidato.",
                title: 'Attenzione',
                width: 600,
                align: 't',
                //closable: true,
                listeners:{
                    beforeclose: function(){return false;}
                }
            });

            //carico gli eventuali cookies nel form
            var titoli_values = Ext.JSON.decode(Ext.util.Cookies.get("signup_titoli"));

            setTimeout(function(){
                Ext.ComponentQuery.query("signup_form_titoli")[0].down('form').getForm().setValues(titoli_values);
            },250);

        }
    },


    //SHOW VIEW FILEs
    showViewFiles: function(){
        try{Ext.ComponentQuery.query("toast")[0].destroy()}catch(e){}

        if(Ext.util.Cookies.get("ced_logged") !== null){
            this.redirectTo("admin_panel");
        }
        else{
            if(Ext.ComponentQuery.query('signup_form_files').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'signup_form_files'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('signup_form_files_id');
        }
    }



});
