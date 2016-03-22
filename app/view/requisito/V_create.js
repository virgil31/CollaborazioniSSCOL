Ext.define('CL.view.requisito.V_create', {
    extend: 'Ext.window.Window',
    xtype: 'requisito_create',
    itemId: 'requisito_create_id',
    alias: 'widget.requisito_create',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Nuovo requisito',

    padding: 10,
    width: 500,

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Nome',
                        name: 'nome',
                        width: '100%',
                        allowBlank: false
                    }
                ],
                buttons: [
                    {
                        text: 'Crea',
                        action: 'do_create'
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
