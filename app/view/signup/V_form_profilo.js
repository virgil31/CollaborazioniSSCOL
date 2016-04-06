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
                        //height: 580,
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
                                            margin: '0 10 10 10'
                                        },
                                        items:[
                                            {
                                                xtype: 'combobox',
                                                name: 'sesso',
                                                fieldLabel: 'Sesso',
                                                value: 'Maschile',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                editable: false,
                                                flex: 0.4,
                                                store: Ext.create('Ext.data.Store', {
                                                    fields: ['value', 'label'],
                                                    data : [
                                                        {"value":"m",        "label":"Maschile"},
                                                        {"value":"f",       "label":"Femminile"}
                                                    ]
                                                }),
                                                valueField: 'value',
                                                displayField: 'label'
                                            },
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
                                            margin: '0 10 10 10'
                                        },
                                        items:[
                                            {
                                                xtype: 'datefield',
                                                name: 'data_nascita',
                                                fieldLabel: 'Data di Nascita *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                editable:false,
                                                format: 'd-m-Y',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'combobox',
                                                store: 'S_nazioni',
                                                displayField: 'name',
                                                valueField: 'name',
                                                queryMode: 'local',
                                                anyMatch: true,
                                                forceSelection: true,
                                                name: 'stato_nascita',
                                                fieldLabel: 'Stato di Nascita *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1
                                            },
                                            /*
                                            {
                                                xtype: 'textfield',
                                                name: 'citta_nascita',
                                                fieldLabel: 'Città di Nascita *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1
                                            }*/
                                            {
                                                xtype: 'combobox',
                                                store: 'S_comuni',
                                                displayField: 'nome',
                                                //valueField: 'codiceCatastale',
                                                valueField: 'nome',
                                                queryMode: 'local',
                                                anyMatch: true,
                                                forceSelection: true,
                                                name: 'citta_nascita',
                                                fieldLabel: 'Città di Nascita *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1,
                                                listeners: {
                                                    select: function(combo, record){
                                                        Ext.ComponentQuery.query("signup_form_profilo textfield[name=codice_comune]")[0].setValue(record.get("codiceCatastale"));
                                                    }
                                                }
                                            },
                                            //nascosto
                                            {
                                                xtype: 'textfield',
                                                name: 'codice_comune',
                                                hidden: true
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
                                            margin: '0 10 10 10'
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
                                            margin: '0 10 10 10'
                                        },
                                        items:[
                                            {
                                                xtype: 'combobox',
                                                store: 'S_nazioni',
                                                displayField: 'name',
                                                valueField: 'name',
                                                queryMode: 'local',
                                                anyMatch: true,
                                                forceSelection: true,
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
                                            margin: '0 10 10 10'
                                        },
                                        items:[
                                            {
                                                xtype: 'textfield',
                                                name: 'email',
                                                fieldLabel: 'E-mail *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                vtype: 'email',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'pec',
                                                fieldLabel: 'PEC',
                                                labelSeparator : '',
                                                vtype: 'email',
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
                                            margin: '0 10 10 10'
                                        },
                                        items:[
                                            {
                                                xtype: 'textfield',
                                                name: 'codice_fiscale',
                                                fieldLabel: 'Codice Fiscale *',
                                                labelSeparator : '',
                                                labelAlign: 'top',
                                                allowBlank: false,
                                                flex: 1,
                                                //validateOnBlur: false,
                                                //minLength: 16,
                                                //maxLength: 16,
                                                validator: function(value){
                                                    var to_return;
                                                    if(value.length != 16){
                                                        to_return = "Il Codice Fiscale deve essere di 16 cifre";
                                                    }
                                                    else{
                                                        Ext.Ajax.request({
                                                            async: false,
                                                            url: 'data/registrazione/checkDuplicatoCodiceFiscale.php',
                                                            params:{
                                                                codice_fiscale: value
                                                            },
                                                            success: function(response) {
                                                                var risposta = Ext.JSON.decode(response.responseText);

                                                                to_return = (risposta["result"]) ?  "E' già presente una registrazione legata a questo Codice Fiscale" : true ;
                                                            }
                                                        });
                                                    }
                                                    return to_return;
                                            	},
                                                listeners:{
                                                    change: function(field){
                                                        field.setValue(field.getValue().toUpperCase());
                                                    }
                                                }
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

                                        //quando voglio tornare indietro, salvo i servizi selezionati nel cookie "signup_profilo"
                                        handler: function(){
                                            var profilo_values = this.up("form").getValues();

                                            Ext.util.Cookies.set("signup_profilo",Ext.JSON.encode(profilo_values));

                                            CL.app.getController("C_signup").redirectTo("signup");
                                        }
                                    },
                                    {
                                        xtype :'button',
                                        text: 'Avanti >',
                                        margin: '30 0 0 0',
                                        padding: 20,
                                        style: 'background-color:green; text-color: white; border-color: white;',

                                        //quando ho finito, salvo i servizi selezionati nel cookie "signup_profilo"
                                        handler: function(){
                                            var this_button = this;
                                            if(this.up('form').isValid()){

                                                Ext.Ajax.request({
                                                    url: 'data/registrazione/codice_fiscale/generaCodiceFiscale.php',
                                                    params:{
                                                        cognome: Ext.ComponentQuery.query("signup_form_profilo textfield[name=cognome]")[0].getValue(),
                                                        nome: Ext.ComponentQuery.query("signup_form_profilo textfield[name=nome]")[0].getValue(),

                                                        anno: (new Date(Ext.ComponentQuery.query("signup_form_profilo datefield[name=data_nascita]")[0].getValue())).getFullYear() ,
                                                        mese: (new Date(Ext.ComponentQuery.query("signup_form_profilo datefield[name=data_nascita]")[0].getValue())).getMonth()+1 ,
                                                        giorno: (new Date(Ext.ComponentQuery.query("signup_form_profilo datefield[name=data_nascita]")[0].getValue())).getDate() ,

                                                        sesso: Ext.ComponentQuery.query("signup_form_profilo combobox[name=sesso]")[0].getValue(),
                                                        codice_comune: Ext.ComponentQuery.query("signup_form_profilo textfield[name=codice_comune]")[0].getValue()
                                                    },
                                                    success: function(response) {
                                                        var risposta = Ext.JSON.decode(response.responseText);
                                                        //è un duplicato
                                                        if(risposta["codice_fiscale"] != Ext.ComponentQuery.query("signup_form_profilo textfield[name=codice_fiscale]")[0].getValue()){
                                                            Ext.Msg.confirm( "Attenzione!", "Il codice fiscale generato dal nostro tester partendo dai dati fiscali inseriti non corrisponde a quello dichiarato. Confermare ugualmente la validità dei dati?", function(btn_id){
                                                                if(btn_id == 'yes'){
                                                                    var profilo_values = this_button.up("form").getValues();

                                                                    Ext.util.Cookies.set("signup_profilo",Ext.JSON.encode(profilo_values));

                                                                    CL.app.getController("C_signup").redirectTo("signup_titles");
                                                                }
                                                            });
                                                        }
                                                        else{
                                                            var profilo_values = this_button.up("form").getValues();

                                                            Ext.util.Cookies.set("signup_profilo",Ext.JSON.encode(profilo_values));

                                                            CL.app.getController("C_signup").redirectTo("signup_titles");
                                                        }
                                                    }
                                                });
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
