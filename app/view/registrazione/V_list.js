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

    width: 960,
    height: 600,

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
                        //text: 'Tipo',
                        dataIndex: 'tipo',
                        flex: 0.1,
                        renderer: function(value){
                            if(value == 'individuale')
                                return '<img src="resources/images/icon_user.png" alt=" " height="16" width="16">';
                            else
                                return '<img src="resources/images/icon_firm.png" alt=" " height="16" width="16">';
                        }
                    },
                    {
                        text: 'Nome',
                        dataIndex: 'nome_grid',
                        flex: 2
                    },
                    {
                        xtype: 'datecolumn',
                        text: 'Registrata il',
                        format:'d-m-Y',
                        dataIndex: 'data_registrazione',
                        flex: 2
                    },
                    {
                        xtype:'actioncolumn',
                        width:80,
                        items: [
                            {
                                iconCls: 'x-fa fa-search',
                                tooltip: 'Informazioni',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    //CL.app.getController("C_registrazione").onEdit(this.el,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-file',
                                tooltip: 'Documenti Allegati',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    //CL.app.getController("C_registrazione").onEdit(this.el,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-eye',
                                tooltip: 'Verdetto',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    //CL.app.getController("C_registrazione").onEdit(this.el,rec);
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
