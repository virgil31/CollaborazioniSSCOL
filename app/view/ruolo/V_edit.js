Ext.define('CL.view.ruolo.V_edit', {
    extend: 'Ext.window.Window',
    xtype: 'ruolo_edit',
    itemId: 'ruolo_edit_id',
    alias: 'widget.ruolo_edit',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Modifica Ruolo',

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
                        text: 'Modifica',
                        action: 'do_edit'
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
