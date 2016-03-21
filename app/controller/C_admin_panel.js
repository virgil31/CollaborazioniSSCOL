Ext.define('CL.controller.C_admin_panel', {
    extend: 'Ext.app.Controller',

    routes: {
        'admin_panel' : 'showView'
    },

    stores: [
        //
    ],
    models: [
        'M_generic'
    ],
    views: [
        'admin_panel.V_admin_panel'
        //'admin_panel.V_create',
        //'admin_panel.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

        }, this);
    },
    /////////////////////////////////////////////////


    //SHOW VIEW
    showView: function(){
        //Ext.ComponentQuery.query("window").forEach(function(win){win.destroy();});  //per eliminare le vecchie windows

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('admin_panel').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'admin_panel'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('admin_panel_id');
        }
        else
            this.redirectTo('login');
    }



});
