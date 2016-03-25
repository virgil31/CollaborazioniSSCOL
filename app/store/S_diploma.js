Ext.define('CL.store.S_diploma',{
    extend: 'Ext.data.Store',

    autoSync: true,

    model: 'CL.model.M_diploma',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'nome', direction : 'ASC' }, //lo ordiniamo per id

    proxy:{
        type:'ajax',
        api: {
            read: 'data/diploma/list.php',
            create: 'data/diploma/create.php',
            destroy: 'data/diploma/destroy.php',
            update: 'data/diploma/edit.php'
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
