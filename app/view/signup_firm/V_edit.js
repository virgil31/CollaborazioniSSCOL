Ext.define('CL.view.signup_firm.V_edit', {
    extend: 'Ext.window.Window',
    xtype: 'signup_firm_edit',
    itemId: 'signup_firm_edit_id',
    alias: 'widget.signup_firm_edit',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Scheda Registrazione',

    height: 600,
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
                        title: 'Profilo',
                        layout: 'vbox',
                        defaults:{
                            labelWidth: 200,
                            readOnly: true
                        },
                        items: [
                            {
                                xtype: 'fieldset',
                                collapsible: false,
                                title: 'Rappresentante (Persona Fisica)',
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
                                        fieldLabel: 'Nome',
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'cognome',
                                        fieldLabel: 'Cognome',
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'email',
                                        fieldLabel: 'Email',
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'codice_fiscale',
                                        fieldLabel: 'Codice Fiscale',
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                collapsible: false,
                                title: 'Studio / Associazione',
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
                                        name: 'nome_ditta',
                                        fieldLabel: 'Denominazione',
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'indirizzo',
                                        fieldLabel: 'Indirizzo',
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'cap',
                                        fieldLabel: 'CAP',
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'stato_sede_legale',
                                        fieldLabel: 'Stato Sede Legale'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'citta_sede_legale',
                                        fieldLabel: 'Città Sede Legale'
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                collapsible: false,
                                title: 'Contatti',
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
                                        name: 'email_ditta',
                                        fieldLabel: 'Email',
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'pec',
                                        fieldLabel: 'PEC',
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'telefono',
                                        fieldLabel: 'Telefono',
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'partita_iva',
                                        fieldLabel: 'Partita IVA'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'codice_fiscale',
                                        fieldLabel: 'Codice Fiscale'
                                    }
                                ]
                            }
                        ]
                    },

                    {
                        title: 'Servizi',
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
