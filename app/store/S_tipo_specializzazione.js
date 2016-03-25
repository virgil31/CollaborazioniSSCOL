Ext.define('CL.store.S_tipo_specializzazione',{
    extend: 'Ext.data.Store',

    autoSync: true,

    model: 'CL.model.M_tipo_specializzazione',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'nome', direction : 'ASC' }, //lo ordiniamo per id

    proxy:{
        type:'ajax',
        api: {
            read: 'data/tipo_specializzazione/list.php',
            create: 'data/tipo_specializzazione/create.php',
            destroy: 'data/tipo_specializzazione/destroy.php',
            update: 'data/tipo_specializzazione/edit.php'
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
