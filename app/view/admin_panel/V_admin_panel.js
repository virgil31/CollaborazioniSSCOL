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
                                text: 'Pannello Amministrativo Collaboratori',
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
                            /*{
                                xtype: 'button',
                                text: 'Gestione Requisiti',
                                margin: '0 0 10 0',
                                handler: function(){
                                    Ext.widget("requisito_list",{
                                        animateTarget: this.el
                                    });

                                    Ext.StoreManager.lookup("S_requisito").loadPage(1);
                                }
                            },
                            {
                                xtype: 'button',
                                text: 'Gestione Ruoli',
                                margin: '10 0 10 0',
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
                            },*/
                            {
					        	xtype: 'button',
                                text: 'Logout',
					        	tooltip: 'Esci',
					        	action: 'do_logout',
					        	padding: 10,
					        	iconCls: 'x-fa fa-remove',
					        	//hidden: Ext.util.Cookies.get('ced_logged') == null,
                                style: 'background: #D92B26;border-color: brown',
                                handler: function(){
                                    Ext.util.Cookies.clear("ced_logged");
                                    CL.app.getController("C_tbar").redirectTo('home');
                                    location.reload();
                                }
					        },
                            {xtype: 'menuseparator',width:'95%',margin: '10 0 0 0'},
                            {
                                xtype: 'button',
                                text: 'Impostazioni Generali',
                                margin: '10 0 0 0',
                                handler: function(){
                                    var rec = Ext.StoreManager.lookup("S_impostazioni_generali").getAt(0);
                                    CL.app.getController("C_impostazioni_generali").onEdit(this.el,rec);
                                }
                            },
                            {
                                xtype: 'button',
                                text: 'Gestione Servizi',
                                margin: '10 0 0 0',
                                handler: function(){

                                    Ext.widget("servizio_list",{
                                        animateTarget: this.el,
                                        record: Ext.StoreManager.lookup("C_impostazioni_generali").getAt(0)
                                    });

                                    Ext.StoreManager.lookup("S_servizio").load();
                                }
                            },
                            {
                                xtype: 'button',
                                text: 'Gestione Registrazioni',
                                margin: '10 0 0 0',
                                disabled: true
                                /*handler: function(){

                                    Ext.widget("servizio_list",{
                                        animateTarget: this.el
                                    });

                                    Ext.StoreManager.lookup("S_servizio").load();
                                }*/
                            },
                            {xtype: 'menuseparator',width:'95%',margin: '10 0 0 0'},
                            {
                                xtype: 'button',
                                text: 'Gestione Tipi di Laurea',
                                margin: '10 0 0 0',
                                handler: function(){

                                    Ext.widget("tipo_laurea_list",{
                                        animateTarget: this.el
                                    });

                                    Ext.StoreManager.lookup("S_tipo_laurea").loadPage(1);
                                }
                            },
                            {
                                xtype: 'button',
                                text: 'Gestione Diplomi',
                                margin: '10 0 0 0',
                                handler: function(){

                                    Ext.widget("diploma_list",{
                                        animateTarget: this.el
                                    });

                                    Ext.StoreManager.lookup("S_diploma").loadPage(1);
                                }
                            },
                            {
                                xtype: 'button',
                                text: 'Gestione Tipi di Specializzazione',
                                margin: '10 0 0 0',
                                handler: function(){

                                    Ext.widget("tipo_specializzazione_list",{
                                        animateTarget: this.el
                                    });

                                    Ext.StoreManager.lookup("S_tipo_specializzazione").loadPage(1);
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
