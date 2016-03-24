Ext.define('CL.store.S_tipo_laurea',{
    extend: 'Ext.data.Store',

    autoSync: true,

    model: 'CL.model.M_tipo_laurea',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'nome', direction : 'ASC' }, //lo ordiniamo per id

    proxy:{
        type:'ajax',
        api: {
            read: 'data/tipo_laurea/list.php',
            create: 'data/tipo_laurea/create.php',
            destroy: 'data/tipo_laurea/destroy.php',
            update: 'data/tipo_laurea/edit.php'
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
