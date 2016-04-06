Ext.define('CL.store.S_comuni',{
    extend: 'Ext.data.JsonStore',

    autoLoad: true,

    remoteSort: false, //true for server sorting
    sorters: [{
        property: 'nome',
        direction: 'ASC' // or 'ASC'
    }],

    proxy: {
        //type: 'ajax',
        url: 'data/registrazione/codice_fiscale/comuni.json',
        reader: {
            type: 'json'
        }
    },

    fields: [
        {name:'nome', type: 'string'},
        {name:'codiceCatastale', type: 'string'}
    ]

});
