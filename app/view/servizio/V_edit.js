Ext.define('CL.view.servizio.V_edit', {
    extend: 'Ext.window.Window',
    xtype: 'servizio_edit',
    itemId: 'servizio_edit_id',
    alias: 'widget.servizio_edit',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Modifica Servizio',

    padding: 10,
    width: 850,

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'numberfield',
                        name: 'posizione',
                        fieldLabel: 'Posizione',
                        minValue:1,
                        allowBlank: false,
                        width: '100%',
                        emptyText: 'Posizione nella lista dei servizi'
                    },
                    {
                        xtype: 'textareafield',
                        fieldLabel: 'Nome',
                        name: 'nome',
                        emptyText: 'Nome del servizio',
                        width: '100%',
                        allowBlank: false
                    },
                    {
                        xtype: 'htmleditor',
                        fieldLabel: 'Requisiti',
                        name: 'requisiti',
                        width: '100%',
                        allowBlank: false,
                        enableColors: false,
                        enableFont: false,
                        enableFontSize: false
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
