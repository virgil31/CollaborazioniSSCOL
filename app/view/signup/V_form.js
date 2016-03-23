Ext.define('CL.view.signup.V_form', {
    extend: 'Ext.panel.Panel',
    xtype: 'signup_form',
    itemId: 'signup_form_id',
    alias: 'widget.signup_form',

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
                width: '100%',
                layout: {
                    type: 'vbox',
                    align: 'left',
                    pack: 'center'
                },
                bbar: [
                    '->',
                    {
                        xtype:'panel',
                        items: [
                            {
                                xtype :'button',
                                text: 'Avanti >',
                                padding: 20,
                                style: 'background-color:green; text-color: white; border-color: white;',
                                handler: function(){
                                    var servizi_selezionati = this.up('signup_form').down('grid').getSelection();
                                    if(servizi_selezionati.length < 1 || servizi_selezionati.length > 3)
                                        Ext.Msg.alert("Attenzione!","Per proseguire bisogna selezionare da 1 a 3 servizi.");
                                    else{
                                        servizi_selezionati.forEach(function(servizio){
                                            alert("Selezionato servizio: "+servizio.get("id")+" (anni esperienza: "+servizio.get("anni_esperienza")+")");
                                        });
                                    }
                                }
                            }
                        ]
                    },

                    '->'
                ],
                tbar: [
                    {
                        xtype: 'toolbar',
                        width: '100%',
                        items: [
                            '->',
                            {
                                xtype: 'label',
                                text: 'Servizi tecnici e collaborazioni tecniche specialistiche',
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
                        xtype: 'grid',
                        scrollable: "vertical",
                        height: 550,
                        store: 'S_servizio',
                        width: '100%',
                        viewConfig:{
                            markDirty:false
                        },
                        plugins: [
                            {
                                ptype: 'rowexpander',
                                rowBodyTpl: ['{requisiti}']
                            }
                        ],
                        selModel: {
                            selType: 'checkboxmodel',
                            mode: 'SIMPLE',
                            showHeaderCheckbox: false,
                            listeners: {
                                deselect: function( me, record, index, eOpts ){
                                    record.set({
                                        anni_esperienza: ""
                                    });
                                },
                                beforeselect: function( me, record, index, eOpts ){
                                    //NON PIu DI 3 SELEZIONI
                                    if(me.getSelection().length == 3){
                                        Ext.Msg.alert("Attenzione!","E' possibile selezionare massimo 3 servizi.");
                                        return false;
                                    }

                                    //Altrimenti chiedo gli anni di esperienza
                                    Ext.create("Ext.window.Window",{
                                        title: 'Informazioni Richieste',
                                        modal: true,
                                        autoShow: true,
                                        constrain: true,
                                        resizable: false,
                                        closable: false,
                                        width: 200,
                                        items: [
                                            {
                                                xtype: 'form',
                                                padding: 10,
                                                items: [
                                                    {
                                                        xtype: 'combobox',
                                                        labelAlign: 'top',
                                                        fieldLabel: 'Anni Esperienza',
                                                        emptyText: 'Anni esperienza',
                                                        editable: false,
                                                        queryMode: 'local',
                                                        displayField: 'name',
                                                        valueField: 'value',
                                                        value: 1,
                                                        store: {
                                                            data:[
                                                                {"value":1, "name":"Meno di 2"},
                                                                {"value":2, "name":"2 - 5"},
                                                                {"value":3, "name":"5 - 10"},
                                                                {"value":4, "name":"Più di 10"}
                                                            ]
                                                        }
                                                    }
                                                ],
                                                buttons: [
                                                    {
                                                        text:'Conferma',
                                                        handler: function(){
                                                            var anni_esperienza = this.up('window').down("combobox").getRawValue();
                                                            record.set({
                                                                anni_esperienza: anni_esperienza
                                                            });
                                                            this.up('window').close();
                                                        }
                                                    }
                                                ]
                                            }
                                        ]


                                    });
                                }
                            }
                        },
                        columns: [
                            {
                                text: 'Servizio',
                                dataIndex: 'nome',
                                flex: 10,
                                renderer: function(value,metaData){
                                    metaData.style="color: #9C1414; font-weight: bold";
                                    return value;
                                }
                            },
                            {
                                dataIndex: 'anni_esperienza',
                                text: 'Anni Esperienza',
                                flex: 2
                            }
                        ]
                    }
                ]
            }

        ];

        this.callParent(arguments);

    }



});
