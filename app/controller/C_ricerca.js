Ext.define('CL.controller.C_ricerca', {
    extend: 'Ext.app.Controller',

    stores: [
        //
    ],
    models: [
        //
    ],
    views: [
        'ricerca.V_ricerca_bar'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({
            'ricerca_bar button[action=do_search]':{
                click: this.doSearch
            }
        }, this);
    },
    /////////////////////////////////////////////////

    doSearch: function(btn){
        var form = btn.up("form").getForm(),
            values = form.getValues();

        var store = Ext.ComponentQuery.query("registrazione_list grid")[0].getStore();
        store.proxy.extraParams.query_params = Ext.JSON.encode(values);
        store.loadPage(1);
    }

});
