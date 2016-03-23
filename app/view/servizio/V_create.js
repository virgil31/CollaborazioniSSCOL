Ext.define('CL.view.servizio.V_create', {
    extend: 'Ext.window.Window',
    xtype: 'servizio_create',
    itemId: 'servizio_create_id',
    alias: 'widget.servizio_create',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Nuovo Servizio',

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
                        text: 'Crea',
                        action: 'do_create'
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
