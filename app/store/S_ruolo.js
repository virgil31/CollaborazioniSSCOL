Ext.define('CL.store.S_ruolo',{
    extend: 'Ext.data.Store',

    //autoLoad: true,
    autoSync: true,

    model: 'CL.model.M_ruolo',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'nome', direction : 'ASC' }, //lo ordiniamo per id

    proxy:{
        type:'ajax',
        api: {
            read: 'data/ruolo/list.php',
            create: 'data/ruolo/create.php',
            destroy: 'data/ruolo/destroy.php',
            update: 'data/ruolo/edit.php'
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
