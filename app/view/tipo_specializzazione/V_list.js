Ext.define('CL.view.tipo_specializzazione.V_list', {
    extend: 'Ext.window.Window',
    xtype: 'tipo_specializzazione_list',
    itemId: 'tipo_specializzazione_list_id',
    alias: 'widget.tipo_specializzazione_list',

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },

    autoShow: true,
    modal: true,
    constrain: true,

    width: 460,
    height: 400,

    title: 'Gestione Tipi di Specializzazione',

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
                store: 'S_tipo_specializzazione',
                height: '98%',
                flex: 60,
                autoscroll: true,
                overflowX: 'hidden',
                overflowY: 'auto',

                disableSelection: true,

                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'S_tipo_specializzazione', // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                }],

                listeners: {
                    itemdblclick: function( grid, record, item, index, e, eOpts ){
                        CL.app.getController("C_tipo_specializzazione").onEdit(item,record);
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
                                    CL.app.getController("C_tipo_specializzazione").onEdit(this.el,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                tooltip: 'Elimina',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    CL.app.getController("C_tipo_specializzazione").onDestroy(rec);
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
