Ext.define('CL.view.admin_panel.V_admin_panel', {
    extend: 'Ext.panel.Panel',
    xtype: 'admin_panel',
    itemId: 'admin_panel_id',
    alias: 'widget.admin_panel',

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
                bodyStyle: 'backgroundColor: rgba(255,255,255,0.75);',
                height: 600,
                width: 960,
                tbar: [
                    {
                        xtype: 'toolbar',
                        width: '100%',
                        items: [
                            '->',
                            {
                                xtype: 'label',
                                text: 'Pannello Amministrativo di Gestione',
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
                                xtype: 'button',
                                text: 'Gestione Ruoli',
                                handler: function(){
                                    Ext.widget("ruolo_list",{
                                        animateTarget: this.el
                                    });

                                    Ext.StoreManager.lookup("S_ruolo").loadPage(1);
                                    Ext.StoreManager.lookup("S_requisito").load({
                                        params:{
                                            flag_full: true
                                        }
                                    });
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
