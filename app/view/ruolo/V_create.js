Ext.define('CL.view.ruolo.V_create', {
    extend: 'Ext.window.Window',
    xtype: 'ruolo_create',
    itemId: 'ruolo_create_id',
    alias: 'widget.ruolo_create',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Nuovo Ruolo',

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
                    },
                    {
                        xtype: 'tagfield',
                        name: 'requisito_ids',
                        fieldLabel: 'Requisiti',
                        store: 'S_requisito',
                        width: '100%',
                        displayField: 'nome',
                        valueField: 'id',
                        queryMode: 'local',
                        filterPickList: true,
                        forceSelection: true,
                        anyMatch: true
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
