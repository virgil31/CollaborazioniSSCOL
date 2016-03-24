Ext.define('CL.view.signup.V_form_profilo', {
    extend: 'Ext.panel.Panel',
    xtype: 'signup_form_profilo',
    itemId: 'signup_form_profilo_id',
    alias: 'widget.signup_form_profilo',

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    layout:{
        type: 'vbox',
        pack: 'center'
    },

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'panel',
                bodyStyle: 'backgroundColor: rgba(255,255,255,0.75);',
                width: '100%',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                tbar: [
                    {
                        xtype: 'toolbar',
                        width: '100%',
                        items: [
                            '->',
                            {
                                xtype: 'label',
                                text: 'Profilo',
                                style:{
                                    color: '#42403E',
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
                        xtype:'form',
                        height: 580,
                        width: '100%',
                        bodyStyle:'background: #FFF4E0',
                        padding: 10,
                        layout: {
                            type: 'vbox',
                            align: 'center'
                            //pack: 'center'
                        },
                        items: [
                            {
                                xtype: 'panel',
                                title: 'Dati Anagrafici',
                                width: '100%',
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype:'panel',
                                        layout: 'hbox',
                                        width: '100%',
                                        bodyStyle:'background: #FFF4E0',
                                        defaults:{
                                            margin: '0 10 0 10'
                                        },
                                        items:[
                                            {
                                                xtype: 'textfield',
                                                name: 'nome',
                                                fieldLabel: 'Nome *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'cognome',
                                                fieldLabel: 'Cognome *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'cittadinanza',
                                                fieldLabel: 'Cittadinanza *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1
                                            }
                                        ]
                                    },
                                    {
                                        xtype:'panel',
                                        layout: 'hbox',
                                        width: '100%',
                                        bodyStyle:'background: #FFF4E0',
                                        defaults:{
                                            margin: '0 10 0 10'
                                        },
                                        items:[
                                            {
                                                xtype: 'datefield',
                                                name: 'data_nascita',
                                                fieldLabel: 'Data di Nascita *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'stato_nascita',
                                                fieldLabel: 'Stato di Nascita *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'citta_nascita',
                                                fieldLabel: 'Città di Nascita *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            //////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            {
                                xtype: 'panel',
                                title: 'Residenza',
                                width: '100%',
                                layout: 'vbox',
                                margin: '10 0 0 0',
                                items: [
                                    {
                                        xtype:'panel',
                                        layout: 'hbox',
                                        width: '100%',
                                        bodyStyle:'background: #FFF4E0',
                                        defaults:{
                                            margin: '0 10 0 10'
                                        },
                                        items:[
                                            {
                                                xtype: 'textfield',
                                                name: 'indirizzo',
                                                fieldLabel: 'Indirizzo *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'cap',
                                                fieldLabel: 'CAP *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 0.1
                                            }
                                        ]
                                    },
                                    {
                                        xtype:'panel',
                                        layout: 'hbox',
                                        width: '100%',
                                        bodyStyle:'background: #FFF4E0',
                                        defaults:{
                                            margin: '0 10 0 10'
                                        },
                                        items:[
                                            {
                                                xtype: 'textfield',
                                                name: 'stato_residenza',
                                                fieldLabel: 'Stato di Residenza *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'citta_residenza',
                                                fieldLabel: 'Città di Residenza *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            //////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            {
                                xtype: 'panel',
                                title: 'Contatti',
                                width: '100%',
                                layout: 'vbox',
                                margin: '10 0 0 0',
                                items: [
                                    {
                                        xtype:'panel',
                                        layout: 'hbox',
                                        width: '100%',
                                        bodyStyle:'background: #FFF4E0',
                                        defaults:{
                                            margin: '0 10 0 10'
                                        },
                                        items:[
                                            {
                                                xtype: 'textfield',
                                                name: 'email',
                                                fieldLabel: 'E-mail *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'pec',
                                                fieldLabel: 'PEC',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'telefono',
                                                fieldLabel: 'Telefono *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            //////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            {
                                xtype: 'panel',
                                title: 'Dati Fiscali',
                                width: '100%',
                                layout: 'vbox',
                                margin: '10 0 0 0',
                                items: [
                                    {
                                        xtype:'panel',
                                        layout: 'hbox',
                                        width: '100%',
                                        bodyStyle:'background: #FFF4E0',
                                        defaults:{
                                            margin: '0 10 0 10'
                                        },
                                        items:[
                                            {
                                                xtype: 'textfield',
                                                name: 'codice_fiscale',
                                                fieldLabel: 'Codice Fiscale *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'partita_iva',
                                                fieldLabel: 'Partita IVA',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                flex: 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype :'button',
                                text: 'Avanti >',
                                margin: '30 0 0 0',
                                padding: 20,
                                style: 'background-color:green; text-color: white; border-color: white;',

                                //quando ho finito, salvo i servizi selezionati nel cookie "signup_profilo"
                                handler: function(){
                                    var profilo_values = this.up("form").getValues();

                                    Ext.util.Cookies.set("signup_profilo",Ext.JSON.encode(profilo_values));
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