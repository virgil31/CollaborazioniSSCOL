Ext.define('CL.model.M_registrazione', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',                type: 'int'},
        {name: 'nome',              type: 'string'},
        {name: 'cognome',           type: 'string'},
        {name: 'nome_ditta',        type: 'string'},
        {name: 'tipo',              type: 'string'},
        {name: 'data_registrazione',              type: 'date'},

        {name:'url_curriculum',                 type: 'string'},
        {name:'url_documento_identita',         type: 'string'},
        {name:'url_referenze_professionali',    type: 'string'},
        {name:'url_dichiarazione_sostitutiva',  type: 'string'}
    ]
});
