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
                bodyStyle: 'backgroundColor: #F5F5F5;',
                width: '100%',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                style: "border-radius: 5px;",
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
                        //height: 500,
                        width: '100%',
                        bodyStyle:'background: #F5F5F5',
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
                                            margin: '0 10 20 10'
                                        },
                                        items:[
                                            {
                                                xtype: 'tagfield',
                                                name: 'diploma_ids',
                                                fieldLabel: 'Diploma *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                store: 'S_diploma',
                                                queryMode: "local",
                                                anyMatch: true,
                                                displayField: 'nome',
                                                valueField: 'id',
                                                allowBlank: false,
                                                forceSelection: true,
                                                flex: 1
                                            },
                                            {
                                                xtype: 'panel',
                                                flex: 1,
                                                layout: 'hbox',
                                                bodyStyle:'background: #FFF4E0',
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        name: 'diploma_nome',
                                                        fieldLabel: "Aggiungi altro Diploma (Una volta scritto, premere su '+')",
                                                        labelSeparator : '',
                                                        labelAlign: 'top',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        text: '+',
                                                        flex: 0.1,
                                                        margin: '24 0 0 0',
                                                        handler: function(){
                                                            var diploma_nome = Ext.ComponentQuery.query("signup_form_titoli textfield[name=diploma_nome]")[0].getValue();
                                                            if(diploma_nome.length < 5){
                                                                Ext.Msg.alert("Attenzione!","Il nome del diploma deve avere almeno 5 caratteri.");
                                                            }
                                                            else{
                                                                Ext.ComponentQuery.query("signup_form_titoli textfield[name=diploma_nome]")[0].reset();
                                                                Ext.StoreManager.lookup("S_diploma").add({nome:diploma_nome});

                                                                setTimeout(function(){
                                                                    Ext.StoreManager.lookup("S_diploma").sort('nome', 'ASC');
                                                                }, 300);

                                                                Ext.Msg.alert("Successo!","Diploma aggiunto. E' ora possibile selezionarlo.");
                                                            }
                                                        }
                                                    }
                                                ]
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
                                            margin: '0 10 20 10'
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
                                                flex: 1,
                                                validator: function (val) {
                                                    if(val.length == 0) this.reset();
                                                    return true;
                                                }
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
                                            margin: '0 10 20 10'
                                        },
                                        items:[
                                            {
                                                xtype: 'combobox',
                                                store: 'S_tipo_specializzazione',
                                                displayField: 'nome',
                                                valueField: 'nome',
                                                name: 'tipo_specializzazione',
                                                fieldLabel: 'Tipo di Specializzazione',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                forceSelection: true,
                                                queryMode: 'local',
                                                anyMatch: true,
                                                flex: 1,
                                                validator: function (val) {
                                                    if(val.length == 0) this.reset();
                                                    return true;
                                                }

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
                                            margin: '0 10 20 10'
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
                                                format: 'd-m-Y',
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
                                bodyStyle:'background: #F5F5F5',
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

                                                Ext.ComponentQuery.query("toast")[0].destroy();
                                                CL.app.getController("C_signup").redirectTo("signup_files");
                                            }
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
