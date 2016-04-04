Ext.define('CL.view.ricerca.V_ricerca_bar', {
    extend: 'Ext.panel.Panel',
    xtype: 'ricerca_bar',
    itemId: 'ricerca_bar_id',
    alias: 'widget.ricerca_bar',

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    width: '100%',
    height: '100%',
    //width: 960,
    //height: 600,

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'button',
                text: 'asd'
            }
        ];


        this.callParent(arguments);

    }



});
