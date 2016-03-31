Ext.define('CL.model.M_registrazione', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',                type: 'int'},
        {name: 'nome',              type: 'string'},
        {name: 'cognome',           type: 'string'},
        {name: 'nome_ditta',        type: 'string'}    ,
        {name: 'tipo',              type: 'string'}        
    ]
});
