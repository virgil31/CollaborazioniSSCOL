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

    doSearch: function(){
        alert("todo");
    }

});
