Ext.define('CL.controller.C_impostazioni_generali', {
    extend: 'Ext.app.Controller',

    stores: [
        'S_impostazioni_generali'
    ],

    models: [
        'M_impostazioni_generali'
    ],

    views: [
        'impostazioni_generali.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            //DO EDIT
            'impostazioni_generali_edit button[action=do_edit]':{
                click: this.doEdit
            }

        }, this);
    },
    /////////////////////////////////////////////////


    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("impostazioni_generali_edit",{
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

        Ext.Msg.confirm('Attenzione!', "Aggiornare le Impostazioni Generali?",function(btn){
            if (btn === 'yes'){
                record.set(values);
                window.close();
                setTimeout(function(){
                    Ext.StoreManager.lookup("S_impostazioni_generali").reload();
                }, 250);
            }
        });
    }

});
