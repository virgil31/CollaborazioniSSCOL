Ext.define('CL.controller.C_requisito', {
    extend: 'Ext.app.Controller',

    /*routes: {
        'uffici' : 'showView'
    },*/

    stores: [
        'S_requisito'
    ],

    models: [
        'M_requisito'
    ],

    views: [
        'requisito.V_list',
        'requisito.V_create',
        'requisito.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            //ON CREATE
            'requisito_list button[action=on_create]': {
                click: this.onCreate
            },

            //DO CREATE
            'requisito_create button[action=do_create]':{
                click: this.doCreate
            },

            //DO EDIT
            'requisito_edit button[action=do_edit]':{
                click: this.doEdit
            }

        }, this);
    },
    /////////////////////////////////////////////////


    //ON DESTROY
    onDestroy: function(record){

        Ext.Msg.confirm('Attenzione!', 'Eliminare <b>'+record.get("nome")+"</b>?",function(btn){
            if (btn === 'yes')
                Ext.StoreManager.lookup("S_requisito").remove(record);
        });

    },


    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("requisito_edit",{
            animateTarget: animateTargetEl
        });

        win.down("form").loadRecord(record);
    },

    //DO EDIT
    doEdit: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            record = form.getRecord(),
            values = form.getValues();

        Ext.Msg.confirm('Attenzione!', "Modificare l'requisito?",function(btn){
            if (btn === 'yes'){
                record.set(values);
                window.close();
                Ext.StoreManager.lookup("S_requisito").reload();
            }
        });
    },

    //ON CREATE
    onCreate: function(btn){
        Ext.widget("requisito_create",{
            animateTarget: btn.el
        });
    },


    //DO CREATE
    doCreate: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            values = form.getValues();

        if(form.isValid()){
            Ext.StoreManager.lookup("S_requisito").add(values);
            window.close();
            setTimeout(function(){
                Ext.StoreManager.lookup("S_requisito").reload();
            }, 250);
        }
    },


    //SHOW VIEW
    showView: function(){
        //Ext.ComponentQuery.query("window").forEach(function(win){win.destroy();});  //per eliminare le vecchie windows

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('requisito_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'requisito_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('requisito_list_id');

            Ext.StoreManager.lookup("S_requisito").loadPage(1);
            Ext.StoreManager.lookup("S_sede").load({
                params: {
                    flag_full: true
                }
            });
        }
        else
            this.redirectTo('login');
    }



});
