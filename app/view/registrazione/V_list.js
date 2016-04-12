Ext.define('CL.view.registrazione.V_list', {
    extend: 'Ext.window.Window',
    xtype: 'registrazione_list',
    itemId: 'registrazione_list_id',
    alias: 'widget.registrazione_list',

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    layout: 'border',

    autoShow: true,
    modal: true,
    constrain: true,

    width: '100%',
    height: '100%',
    //width: 960,
    //height: 600,

    title: 'Gestione Registrazioni',

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'grid',
                region: 'center',
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
                        if(record.get("tipo") == "ditta")
                            CL.app.getController("C_signup_firm").onEdit(this.el,record);
                        else
                            CL.app.getController("C_signup").onEdit(this.el,record);
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
                        text: 'ID',
                        dataIndex: 'id',
                        flex: 0.4,
                        renderer: function(value, metaData, record){
                            if(record.get("tipo")=="individuale")
                                return value+"U";
                            else
                                return value+"D";
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
                        text: 'Esito',
                        dataIndex: 'esito',
                        flex: 0.3,
                        renderer: function(value){
                            if(value == '')
                                return '<img src="resources/images/icon_question.png" alt=" " height="16" width="16">';
                            else if(value == 'accettata')
                                return '<img src="resources/images/icon_confirmed.png" alt=" " height="16" width="16">';
                            else
                                return '<img src="resources/images/icon_cancelled.png" alt=" " height="16" width="16">';
                        }
                    },
                    {
                        xtype:'actioncolumn',
                        width:120,
                        items: [
                            {
                                iconCls: 'x-fa fa-search',
                                tooltip: 'Informazioni',
                                handler: function(grid, rowIndex, colIndex) {
                                    var record = grid.getStore().getAt(rowIndex);
                                    if(record.get("tipo") == "ditta")
                                        CL.app.getController("C_signup_firm").onEdit(this.el,record);
                                    else
                                        CL.app.getController("C_signup").onEdit(this.el,record);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-file',
                                tooltip: 'Documenti Allegati',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    var targetEl = this.el;

                                    CL.app.getController("C_registrazione").showMenuPreviewAndDownload(targetEl,rec);
                                }
                            },
                            {
                                iconCls: 'x-fa fa-eye',
                                tooltip: 'Verdetto',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    var targetEl = this.el;

                                    if(rec.get("esito") == ""){
                                        Ext.create('Ext.window.Window',{
                                            autoShow: true,
                                            animateTarget: targetEl,
                                            modal: true,
                                            constrain: true,
                                            title: 'Esito - <b>'+rec.get('nome_grid')+'</b>',
                                            padding: 10,
                                            items:[
                                                {
                                                    xtype: 'label',
                                                    html: '<br><b>ATTENZIONE!</b> Non sarà poi più possibile modificare tale campo!<br><br>'
                                                }
                                            ],
                                            buttonAlign: 'center',
                                            buttons:[
                                                {
                                                    text: 'Accetta',
                                                    style: 'background: green; border-color: transparent;',
                                                    handler: function(btn){
                                                        Ext.Ajax.request({
                                                            url: 'data/registrazione/edit_esito.php',
                                                            params:{
                                                                tipo: rec.get("tipo"),
                                                                id: rec.get("id"),
                                                                esito: 'accettata'
                                                            },
                                                            success: function(response, opts) {
                                                                var obj = Ext.decode(response.responseText);
                                                                btn.up("window").close();
                                                            }
                                                        });
                                                    }
                                                },
                                                {
                                                    text: 'Rifiuta',
                                                    style: 'background: red; border-color: transparent;',
                                                    handler: function(btn){
                                                        Ext.Ajax.request({
                                                            url: 'data/registrazione/edit_esito.php',
                                                            params:{
                                                                tipo: rec.get("tipo"),
                                                                id: rec.get("id"),
                                                                esito: 'rifiutata'
                                                            },
                                                            success: function(response, opts) {
                                                                var obj = Ext.decode(response.responseText);
                                                                btn.up("window").close();
                                                                Ext.StoreManager.lookup("S_registrazione").reload();
                                                            }
                                                        });
                                                    }
                                                }
                                            ]
                                        });
                                    }
                                    else
                                        Ext.Msg.alert("Attenzione!","Impossibile modificare l'esito!");
                                }
                            },
                            {
                                iconCls: 'x-fa fa-trash',
                                tooltip: 'Elimina Registrazione',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);

                                    Ext.MessageBox.confirm('Attenzione', 'Eliminare una registrazione solo se in presenza di un <b>duplicato</b>! Sei sicuro di volerla eliminare?', function(btn_id){
                                        if(btn_id == "yes")
                                            Ext.StoreManager.lookup("S_registrazione").remove(rec);
                                    });

                                }
                            }
                        ]
                    }
                ]
            },
            //SOUTH/////////////////////////////////////////////////////////////////////
            {
                xtype: 'ricerca_bar',
                region: 'south',
                title: '<b>Ricerca e filtra</b>',
                collapsible: true,
                collapsed: true,
                titleCollapse: true,
                maxHeight: 400,
                height: 400
            }
        ];


        this.callParent(arguments);

    }



});
