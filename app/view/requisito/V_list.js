Ext.define('CL.view.requisito.V_list', {
    extend: 'Ext.window.Window',
    xtype: 'requisito_list',
    itemId: 'requisito_list_id',
    alias: 'widget.requisito_list',

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },

    autoShow: true,
    modal: true,
    constrain: true,

    width: 700,
    height: 500,

    title: 'Requisiti',

    tbar: [
        '->',
        {
            xtype: 'panel',
            items: [
                {
                    xtype: 'button',
                    text: '+ Aggiungi',
                    action: 'on_create'
                }
            ]
        },
        '->'
    ],

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'grid',
                border: true,
                store: 'S_requisito',
                height: '98%',
                flex: 60,
                autoscroll: true,
                overflowX: 'hidden',
                overflowY: 'auto',

                disableSelection: true,

                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'S_requisito', // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                }],

                listeners: {
                    itemdblclick: function( grid, record, item, index, e, eOpts ){
                        CL.app.getController("C_requisito").onEdit(item,record);
                    }
                },

                columns: [
                    {
                        text: 'Nome',
                        dataIndex: 'nome',
                        flex: 2
                    },
                    {
                        xtype:'actioncolumn',
                        width:50,
                        items: [
                            {
                                iconCls: 'x-fa fa-edit',
                                tooltip: 'Modifica',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_requisito").onEdit(this.el,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                tooltip: 'Elimina',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_requisito").onDestroy(rec);
                                }
                            }
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
