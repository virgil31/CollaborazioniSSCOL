Ext.define('CL.store.S_nazioni',{
    extend: 'Ext.data.JsonStore',

    autoLoad: true,

    proxy: {
        //type: 'ajax',
        url: 'data/nazioni/list.json',
        reader: {
            type: 'json'
        }
    },

    fields: [
        {name:'name', type: 'string'},
        {name:'code', type: 'string'}
    ]

});
