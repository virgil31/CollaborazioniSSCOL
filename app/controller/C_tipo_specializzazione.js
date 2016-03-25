Ext.define('CL.controller.C_tipo_specializzazione', {
    extend: 'Ext.app.Controller',

    /*routes: {
        'uffici' : 'showView'
    },*/

    stores: [
        'S_tipo_specializzazione'
    ],

    models: [
        'M_tipo_specializzazione'
    ],

    views: [
        'tipo_specializzazione.V_list',
        'tipo_specializzazione.V_create',
        'tipo_specializzazione.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            //ON CREATE
            'tipo_specializzazione_list button[action=on_create]': {
                click: this.onCreate
            },

            //DO CREATE
            'tipo_specializzazione_create button[action=do_create]':{
                click: this.doCreate
            },

            //DO EDIT
            'tipo_specializzazione_edit button[action=do_edit]':{
                click: this.doEdit
            }

        }, this);
    },
    /////////////////////////////////////////////////


    //ON DESTROY
    onDestroy: function(record){

        Ext.Msg.confirm('Attenzione!', 'Eliminare <b>'+record.get("nome")+"</b>?",function(btn){
            if (btn === 'yes')
                Ext.StoreManager.lookup("S_tipo_specializzazione").remove(record);
        });

    },


    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("tipo_specializzazione_edit",{
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

        Ext.Msg.confirm('Attenzione!', "Modificare il Tipo di Laurea?",function(btn){
            if (btn === 'yes'){
                record.set(values);
                window.close();
                setTimeout(function(){
                    Ext.StoreManager.lookup("S_tipo_specializzazione").reload();
                }, 250);
            }
        });
    },

    //ON CREATE
    onCreate: function(btn){
        Ext.widget("tipo_specializzazione_create",{
            animateTarget: btn.el
        });
    },


    //DO CREATE
    doCreate: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            values = form.getValues();

        if(form.isValid()){
            Ext.StoreManager.lookup("S_tipo_specializzazione").add(values);
            window.close();
            setTimeout(function(){
                Ext.StoreManager.lookup("S_tipo_specializzazione").reload();
            }, 250);
        }
    },


    //SHOW VIEW
    showView: function(){
        //Ext.ComponentQuery.query("window").forEach(function(win){win.destroy();});  //per eliminare le vecchie windows

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('tipo_specializzazione_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'tipo_specializzazione_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('tipo_specializzazione_list_id');

            Ext.StoreManager.lookup("S_tipo_specializzazione").loadPage(1);
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