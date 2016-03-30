Ext.define('CL.view.activate.V_activate', {
    extend: 'Ext.panel.Panel',
    xtype: 'activate',
    itemId: 'activate_id',
    alias: 'widget.activate',

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'panel',
                style: "border-radius: 5px;",
                bodyStyle: 'backgroundColor: rgba(255,255,255,0.75);',
                //width: 940,
                tbar: [
                    {
                        xtype: 'toolbar',
                        width: '100%',
                        items: [
                            '->',
                            {
                                xtype: 'label',
                                text: 'Conferma Registrazione',
                                style:{
                                    color: '#9C1413',
                                    fontSize: '22px',
                                    fontWeight: 'bold'
                                }
                            },
                            '->'
                        ]
                    }
                ],
                items: [
                    {
                        xtype:'panel',
                        bodyStyle: 'backgroundColor: transparent',
                        padding: 10,
                        layout: {
                            type: 'vbox',
                            align: 'center',
                            pack: 'center'
                        },
                        items: [
                            {
                                xtype: 'label',
                                name: 'esito_registrazione',
                                //text: 'Registrazione correttamente confermata e attivata.',
                                style:{
                                    color: 'green',
                                    //fontSize: '22px',
                                    fontWeight: 'bold'
                                }
                            },
                            {
                                xtype: 'button',
                                padding: 5,
                                margin: '15 0 0 0',
                                text: 'Ritorna alla home',
                                handler: function(){
                                    CL.app.getController("C_activate").redirectTo("home");
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
