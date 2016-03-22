Ext.define('CL.model.M_ruolo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',                type: 'int'},
        {name: 'nome',              type: 'string'},

        {name: 'requisito_ids',     type: 'auto'}
    ]
});
