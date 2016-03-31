Ext.define('CL.controller.C_activate', {
    extend: 'Ext.app.Controller',

    routes: {
        'activate/:individuale_o_ditta/:unique_seed' : 'showView'
    },

    stores: [
        //
    ],
    models: [
        //
    ],
    views: [
        'activate.V_activate'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

        }, this);
    },
    /////////////////////////////////////////////////


    //ROUTES
    showView: function(param1,param2){


        if(Ext.ComponentQuery.query('activate').length == 0)
            Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'activate'});

        Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('activate_id');

        Ext.Ajax.request({
            url: 'data/activate/activate.php',
            method: 'POST',
            params:{
                type: param1,
                unique_seed: param2
            },
            success: function(response, opts) {
                var risposta = Ext.JSON.decode(response.responseText);
                if(risposta["success"]){
                    Ext.ComponentQuery.query('activate label[name=esito_registrazione]')[0].setStyle("color","green");
                    Ext.ComponentQuery.query('activate label[name=esito_registrazione]')[0].setText("Registrazione correttamente confermata e attivata.")
                }
                else{
                    Ext.ComponentQuery.query('activate label[name=esito_registrazione]')[0].setStyle("color","brown");
                    Ext.ComponentQuery.query('activate label[name=esito_registrazione]')[0].setText("Errore durante l'attivazione. Si è pregati di ripetere la registrazione.")
                }
            }
        });



    }


});
