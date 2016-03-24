Ext.define('CL.view.signup.V_form_titoli', {
    extend: 'Ext.panel.Panel',
    xtype: 'signup_form_titoli',
    itemId: 'signup_form_titoli_id',
    alias: 'widget.signup_form_titoli',

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
                                text: 'Titoli',
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
                        height: 500,
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
                                title: 'Diploma',
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
                                                xtype: 'tagfield',
                                                name: 'diploma_ids',
                                                fieldLabel: 'Diploma *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                forceSelection: true,
                                                flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'cognome',
                                                fieldLabel: 'Altro Diploma',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                flex: 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            //////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            {
                                xtype: 'panel',
                                title: 'Laurea',
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
                                                xtype: 'combobox',
                                                store: 'S_tipo_laurea',
                                                displayField: 'nome',
                                                valueField: 'nome',
                                                name: 'tipo_laurea',
                                                fieldLabel: 'Tipo di Laurea',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                forceSelection: true,
                                                queryMode: 'local',
                                                anyMatch: true,
                                                flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'nome_laurea',
                                                fieldLabel: 'Denominazione Laurea',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                flex: 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            //////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            {
                                xtype: 'panel',
                                title: 'Specializzazione/Dottorato',
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
                                                xtype: 'combobox',
                                                name: 'tipo_pecializzazione',
                                                fieldLabel: 'Tipo di Specializzazione',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'nome_specializzazione',
                                                fieldLabel: 'Denominazione Specializzazione/Dottorato',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                flex: 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            //////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            {
                                xtype: 'panel',
                                title: 'Iscrizione Albo Professionale',
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
                                                name: 'albo',
                                                fieldLabel: 'Albo',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'numero_albo',
                                                fieldLabel: 'Numero',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'datefield',
                                                name: 'data_albo',
                                                fieldLabel: 'Data di Iscrizione',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                flex: 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            ///////////////////////////////////////////////////////////////////////////////////////////
                            {
                                xtype:'panel',
                                type: 'hbox',
                                bodyStyle:'background: #FFF4E0',
                                items: [
                                    {
                                        xtype :'button',
                                        text: '< Indietro',
                                        margin: '30 0 0 0',
                                        padding: 20,
                                        style: 'background-color:#FF2626; text-color: white; border-color: white;',

                                        //quando voglio tornare indietro, salvo i servizi selezionati nel cookie "signup_titoli"
                                        handler: function(){
                                            var titoli_values = this.up("form").getValues();

                                            Ext.util.Cookies.set("signup_titoli",Ext.JSON.encode(titoli_values));

                                            CL.app.getController("C_signup").redirectTo("signup_profile");
                                        }
                                    },
                                    {
                                        xtype :'button',
                                        text: 'Avanti >',
                                        margin: '30 0 0 0',
                                        padding: 20,
                                        style: 'background-color:green; text-color: white; border-color: white;',

                                        //quando ho finito, salvo i servizi selezionati nel cookie "signup_titoli"
                                        handler: function(){
                                            if(this.up('form').isValid()){
                                                var titoli_values = this.up("form").getValues();

                                                Ext.util.Cookies.set("signup_titoli",Ext.JSON.encode(titoli_values));
                                            }
                                            Ext.ComponentQuery.query("toast")[0].destroy()
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }

        ];

        this.callParent(arguments);

    }



});
