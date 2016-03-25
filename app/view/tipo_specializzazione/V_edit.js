Ext.define('CL.view.tipo_specializzazione.V_edit', {
    extend: 'Ext.window.Window',
    xtype: 'tipo_specializzazione_edit',
    itemId: 'tipo_specializzazione_edit_id',
    alias: 'widget.tipo_specializzazione_edit',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Modifica il Tipo di Laurea',

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
                        text: 'Modifica',
                        action: 'do_edit'
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
