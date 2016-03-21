Ext.define('CL.view.home.V_home', {
    extend: 'Ext.panel.Panel',
    xtype: 'home',
    itemId: 'home_id',
    alias: 'widget.home',

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'form',
                title: 'Archivio Collaboratori',
                titleAlign: 'center',
                width: 940,
                height: 500
            }
        ];

        this.callParent(arguments);

    }



});
