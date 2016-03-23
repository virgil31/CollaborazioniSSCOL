Ext.define('CL.model.M_servizio', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',            type: 'int'},
        {name: 'nome',          type: 'string'},
        {name: 'nome_per_grid', type: 'string'},   
        {name: 'requisiti',     type: 'string'},

        {name: 'posizione',     type: 'int'}
    ]
});
