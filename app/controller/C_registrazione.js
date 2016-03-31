Ext.define('CL.controller.C_registrazione', {
    extend: 'Ext.app.Controller',

    /*routes: {
        'uffici' : 'showView'
    },*/

    stores: [
        'S_registrazione'
    ],

    models: [
        'M_registrazione'
    ],

    views: [
        'registrazione.V_list',
        'registrazione.V_create',
        'registrazione.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            //ON CREATE
            'registrazione_list button[action=on_create]': {
                click: this.onCreate
            },

            //DO CREATE
            'registrazione_create button[action=do_create]':{
                click: this.doCreate
            },

            //DO EDIT
            'registrazione_edit button[action=do_edit]':{
                click: this.doEdit
            }

        }, this);
    },
    /////////////////////////////////////////////////



    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("registrazione_edit",{
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
                    Ext.StoreManager.lookup("S_registrazione").reload();
                }, 250);
            }
        });
    },

    //ON CREATE
    onCreate: function(btn){
        Ext.widget("registrazione_create",{
            animateTarget: btn.el
        });
    },


    //DO CREATE
    doCreate: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            values = form.getValues();

        if(form.isValid()){
            Ext.StoreManager.lookup("S_registrazione").add(values);
            window.close();
            setTimeout(function(){
                Ext.StoreManager.lookup("S_registrazione").reload();
            }, 250);
        }
    },


    //SHOW VIEW
    showView: function(){
        //Ext.ComponentQuery.query("window").forEach(function(win){win.destroy();});  //per eliminare le vecchie windows

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('registrazione_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'registrazione_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('registrazione_list_id');

            Ext.StoreManager.lookup("S_registrazione").loadPage(1);
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
