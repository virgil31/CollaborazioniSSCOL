Ext.define('CL.store.S_registrazione',{
    extend: 'Ext.data.Store',

    autoSync: true,

    model: 'CL.model.M_registrazione',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'nome_grid', direction : 'ASC' }, //lo ordiniamo per id

    proxy:{
        type:'ajax',
        api: {
            read: 'data/registrazione/list.php',
            create: 'data/registrazione/create.php',
            destroy: 'data/registrazione/destroy.php',
            update: 'data/registrazione/edit.php'
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
