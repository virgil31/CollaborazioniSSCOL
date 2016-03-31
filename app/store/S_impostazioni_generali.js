Ext.define('CL.store.S_impostazioni_generali',{
    extend: 'Ext.data.Store',

    autoLoad: true,
    autoSync: true,

    model: 'CL.model.M_impostazioni_generali',

    proxy:{
        type:'ajax',
        api: {
            read: 'data/impostazioni_generali/list.php',
            create: 'data/impostazioni_generali/create.php',
            destroy: 'data/impostazioni_generali/destroy.php',
            update: 'data/impostazioni_generali/edit.php'
        },

        reader:{
            type:'json',
            rootProperty:'result'
        },

        writer: {
            type: 'json',
            encode: true,
            rootProperty: 'data',
            writeAllFields: true
        }
    }

});
