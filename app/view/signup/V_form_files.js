Ext.define('CL.view.signup.V_form_files', {
    extend: 'Ext.panel.Panel',
    xtype: 'signup_form_files',
    itemId: 'signup_form_files_id',
    alias: 'widget.signup_form_files',

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    layout:{
        type: 'vbox',
        pack: 'center',
        align: 'center'
    },

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'panel',
                bodyStyle: 'backgroundColor: rgba(255,255,255,0.75);',
                width: '50%',
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
                                text: 'Allegati',
                                style:{
                                    color: '#42403E',
                                    fontSize: '20px',
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
                        bodyStyle:'background: #FFF4E0',
                        padding: 10,
                        width: "100%",
                        layout: {
                            type: 'vbox',
                            align: 'center',
                            pack: 'center'
                        },
                        items: [
                            ///////////////////////////////////////////////////////////////////////////////////////////
                            {
                                xtype:'panel',
                                width: "80%",
                                bodyStyle:'background: #FFF4E0',
                                //margin: '0 0 0 100',
                                items:[
                                    {
                                        xtype: 'filefield',
                                        name: 'curriculum',
                                        fieldLabel: "<b>Curriculum Vitae</b> (<i>pdf</i>)",
                                        labelAlign: 'top',
                                        allowBlank: false,
                                        buttonText: 'Seleziona file...',
                                        width: "100%",
                                        listeners: {
                                            change: function(fld, value) {
                                                var newValue = value.replace(/C:\\fakepath\\/g, '');
                                                fld.setRawValue(newValue);
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'filefield',
                                        name: 'documento_identita',
                                        fieldLabel: "<b>Documento d'Identità</b>  (<i>pdf</i>)",
                                        labelAlign: 'top',
                                        allowBlank: false,
                                        buttonText: 'Seleziona file...',
                                        width: "100%",
                                        listeners: {
                                            change: function(fld, value) {
                                                var newValue = value.replace(/C:\\fakepath\\/g, '');
                                                fld.setRawValue(newValue);
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'filefield',
                                        name: 'referenze_professionali',
                                        fieldLabel: "<b>Scheda Referenze Professionali</b> (<i>xls</i>)",
                                        labelAlign: 'top',
                                        allowBlank: false,
                                        buttonText: 'Seleziona file...',
                                        width: "100%",
                                        listeners: {
                                            change: function(fld, value) {
                                                var newValue = value.replace(/C:\\fakepath\\/g, '');
                                                fld.setRawValue(newValue);
                                            }
                                        }
                                    }
                                ]
                            },


                            {
                                xtype:'panel',
                                type: 'hbox',
                                bodyStyle:'background: #FFF4E0',
                                items: [
                                    {
                                        xtype :'button',
                                        text: '< Indietro',
                                        margin: '30 0 30 0',
                                        padding: 20,
                                        style: 'background-color:#FF2626; text-color: white; border-color: white;',

                                        handler: function(){
                                            CL.app.getController("C_signup").redirectTo("signup_titles");
                                        }
                                    },
                                    {
                                        xtype :'button',
                                        text: 'Avanti >',
                                        margin: '30 0 30 0',
                                        padding: 20,
                                        style: 'background-color:green; text-color: white; border-color: white;',

                                        handler: function(){
                                            var servizi_selezionati = {servizi_selezionati: Ext.JSON.decode(Ext.util.Cookies.get("servizi_selezionati"))};
                                            var profilo_values = Ext.JSON.decode(Ext.util.Cookies.get("signup_profilo"));
                                            var titoli_values = Ext.JSON.decode(Ext.util.Cookies.get("signup_titoli"));
                                            var files_values = this.up("form").getValues();

                                            var full_form_values = Object.assign(servizi_selezionati, profilo_values, titoli_values, files_values);

                                            var form = this.up('form');

                                            if(form.isValid()){
                                                Ext.Msg.confirm('Attenzione!', 'Confermare la registrazione e caricare i documenti?',
                                                function(btn) {
                                                    if (btn === 'yes') {
                                                        console.log("form values :vv:");
                                                        console.log(full_form_values);

                                                        form.submit({
                                                            params: {
                                                                data: Ext.JSON.encode(full_form_values)
                                                            },
                                                            url: 'data/signup/signup_and_upload.php',
                                                            waitMsg: 'registrazione in corso...',
                                                            success: function(fp, o) {
                                                                //elimino cookie dei forms
                                                                /*
                                                                Ext.util.Cookies.clear("servizi_selezionati");
                                                                Ext.util.Cookies.clear("signup_profilo");
                                                                Ext.util.Cookies.clear("signup_titoli");
                                                                */

                                                                Ext.Msg.alert('Perfetto!', "Registrazione completata! A breve riceverà una mail di attivazione su <b>"+full_form_values.email+"</b>", function(){
                                                                    CL.app.getController("C_signup").redirectTo("home");
                                                                    location.reload();
                                                                });


                                                            },
                                                            failure: function(){
                                                                alert("BAD");
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                            else{
                                                Ext.Msg.alert('Attenzione!', "Allegare <b>tutti</b> i documenti richiesti.");
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
