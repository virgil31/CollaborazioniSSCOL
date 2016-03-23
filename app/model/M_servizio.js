Ext.define('CL.model.M_servizio', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',            type: 'int'},
        {name: 'nome',          type: 'string'},
        {name: 'requisiti',     type: 'string'},

        {name: 'posizione',     type: 'int'}
    ]
});
