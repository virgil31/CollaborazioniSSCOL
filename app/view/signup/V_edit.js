Ext.define('CL.view.signup.V_edit', {
    extend: 'Ext.window.Window',
    xtype: 'signup_edit',
    itemId: 'signup_edit_id',
    alias: 'widget.signup_edit',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Scheda Registrazione',

    height: 640,
    width: 820,

    layout: 'fit',

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'form',
                layout: {
                    type: 'accordion',
                    titleCollapse: true,
                    animate: true,
                    activeOnTop: false
                },
                items: [

                    {
                        title: '<b>Profilo</b>',
                        layout: 'vbox',
                        defaults:{
                            labelWidth: 200,
                            readOnly: true
                        },
                        items: [
                            {
                                xtype: 'fieldset',
                                collapsible: false,
                                title: '<b>Dati Anagrafici</b>',
                                width: '100%',
                                layout: {
                                    type: 'vbox',
                                    align: 'center',
                                    pack: 'center'
                                },
                                defaults:{
                                    width: '90%',
                                    labelWidth: 150,
                                    readOnly: true
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        name: 'nome',
                                        fieldLabel: 'Nome'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'cognome',
                                        fieldLabel: 'Cognome'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'cittadinanza',
                                        fieldLabel: 'Cittadinanza'
                                    },
                                    {
                                        xtype: 'datefield',
                                        format: 'd-m-Y',
                                        name: 'data_nascita',
                                        fieldLabel: 'Data di Nascita'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'stato_nascita',
                                        fieldLabel: 'Stato di Nascita'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'citta_nascita',
                                        fieldLabel: 'Città di Nascita'
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                collapsible: false,
                                title: '<b>Residenza</b>',
                                width: '100%',
                                layout: {
                                    type: 'vbox',
                                    align: 'center',
                                    pack: 'center'
                                },
                                defaults:{
                                    width: '90%',
                                    labelWidth: 150,
                                    readOnly: true
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        name: 'indirizzo',
                                        fieldLabel: 'indirizzo'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'cap',
                                        fieldLabel: 'CAP'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'stato_residenza',
                                        fieldLabel: 'Stato di Residenza'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'citta_residenza',
                                        fieldLabel: 'Città di Residenza'
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                collapsible: false,
                                title: '<b>Contatti e Dati Fiscali</b>',
                                width: '100%',
                                layout: {
                                    type: 'vbox',
                                    align: 'center',
                                    pack: 'center'
                                },
                                defaults:{
                                    width: '90%',
                                    labelWidth: 150,
                                    readOnly: true
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        name: 'email',
                                        fieldLabel: 'Email'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'pec',
                                        fieldLabel: 'PEC'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'telefono',
                                        fieldLabel: 'Telefono'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'codice_fiscale',
                                        fieldLabel: 'Codice Fiscale'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'partita_iva',
                                        fieldLabel: 'Partita IVA'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        title: '<b>Titoli</b>',
                        width: '100%',
                        layout: {
                            type: 'vbox',
                            align: 'center'
                        },
                        defaults:{
                            width: '90%',
                            labelWidth: 150,
                            readOnly: true,
                            margin: '10 0 10 0'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'diplomi',
                                fieldLabel: 'Diplomi'
                            },
                            {
                                xtype: 'textfield',
                                name: 'laurea',
                                fieldLabel: 'Laurea'
                            },
                            {
                                xtype: 'textfield',
                                name: 'specializzazione',
                                fieldLabel: 'Specializzazione'
                            },
                            {
                                xtype: 'textfield',
                                name: 'albo',
                                fieldLabel: 'Albo'
                            },
                            {
                                xtype: 'textfield',
                                name: 'numero_albo',
                                fieldLabel: 'Numero Albo'
                            },
                            {
                                xtype: 'datefield',
                                format: 'd-m-Y',
                                name: 'data_albo',
                                fieldLabel: "Data Iscrizione",
                                margin: '0 0 10 0'
                            }
                        ]
                    },

                    {
                        title: '<b>Servizi</b>',
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'grid',
                                name: 'servizi',
                                store: Ext.create('Ext.data.Store', {
                                        fields:[ 'nome', 'anni_esperienza']
                                    }),
                                columns:[
                                    { text: '<b>Nome Servizio</b>',    dataIndex: 'nome',              flex: 10},
                                    { text: '<b>Anni Esperienza</b>',  dataIndex: 'anni_esperienza',   flex: 3}
                                ]
                            }
                        ]
                    }
                ]/*,
                buttons: [
                    {
                        text: 'Modifica',
                        action: 'do_edit'
                    }
                ]*/
            }
        ];

        this.callParent(arguments);

    }



});
