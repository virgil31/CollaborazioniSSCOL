Ext.define('CL.view.diploma.V_create', {
    extend: 'Ext.window.Window',
    xtype: 'diploma_create',
    itemId: 'diploma_create_id',
    alias: 'widget.diploma_create',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Nuovo Diploma',

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