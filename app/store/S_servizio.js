Ext.define('CL.store.S_servizio',{
    extend: 'Ext.data.Store',

    autoLoad: true,
    autoSync: true,

    model: 'CL.model.M_servizio',

    remoteSort: true,
    sorters: { property: 'posizione', direction : 'ASC' }, //lo ordiniamo per id

    proxy:{
        type:'ajax',
        api: {
            read: 'data/servizio/list.php',
            create: 'data/servizio/create.php',
            destroy: 'data/servizio/destroy.php',
            update: 'data/servizio/edit.php'
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
