Ext.define('CL.view.registrazione.V_list', {
    extend: 'Ext.window.Window',
    xtype: 'registrazione_list',
    itemId: 'registrazione_list_id',
    alias: 'widget.registrazione_list',

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

    title: 'Gestione Registrazioni',

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'grid',
                border: true,
                store: 'S_registrazione',
                height: '98%',
                flex: 60,
                autoscroll: true,
                overflowX: 'hidden',
                overflowY: 'auto',

                disableSelection: true,

                dockedItems: [{
                    xtype: 'pagingtoolbar',
                    store: 'S_registrazione', // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                }],

                listeners: {
                    itemdblclick: function( grid, record, item, index, e, eOpts ){
                        CL.app.getController("C_registrazione").onEdit(item,record);
                    }
                },

                columns: [
                    {
                        text: 'Tipo',
                        dataIndex: 'tipo',
                        flex: 0.3
                    },
                    {
                        text: 'Nome',
                        dataIndex: 'nome_grid',
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
                                    CL.app.getController("C_registrazione").onEdit(this.el,rec);
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
