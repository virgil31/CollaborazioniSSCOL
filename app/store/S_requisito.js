Ext.define('CL.store.S_requisito',{
    extend: 'Ext.data.Store',

    //autoLoad: true,
    autoSync: true,

    model: 'CL.model.M_requisito',

    pageSize: 50,

    remoteSort: true,
    sorters: { property: 'nome', direction : 'ASC' }, //lo ordiniamo per id

    proxy:{
        type:'ajax',
        api: {
            read: 'data/requisito/list.php',
            create: 'data/requisito/create.php',
            destroy: 'data/requisito/destroy.php',
            update: 'data/requisito/edit.php'
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
