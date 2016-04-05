Ext.define('CL.view.ricerca.V_ricerca_bar', {
    extend: 'Ext.form.Panel',
    xtype: 'ricerca_bar',
    itemId: 'ricerca_bar_id',
    alias: 'widget.ricerca_bar',

    collapsedCls: 'my-collapsed-panel',
    bodyStyle: 'background: #EFF6FB',

    header: {
        style: 'background: #EFF6FB;'
    },

    width: '100%',
    height: '100%',
    //width: 960,
    //height: 600,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    defaults:{
        margin: "10 0 10 0"
    },

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'panel',
                layout: 'hbox',
                bodyStyle: 'background: transparent',
                defaults: {
                    margin: '0 10 0 10',
                    labelAlign: 'top',
                    labelWidth: 150,
                    listeners: {
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER){
                                var btn = Ext.ComponentQuery.query('ricerca_bar button[action=do_search]')[0];
                                btn.fireEvent('click',btn);
                            }
                        }
                    }
                },
                items:[
                    {
                        xtype: 'combobox',
                        name: 'esito',
                        fieldLabel: 'Esito',
                        value: 'tutti',
                        editable: false,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['value', 'label'],
                            data : [
                                {"value":"tutti",       "label":"Tutti"},
                                {"value":"",            "label":"In attesa"},
                                {"value":"accettata",   "label":"Confermate"},
                                {"value":"rifiutata",   "label":"Rifiutate"}
                            ]
                        }),
                        valueField: 'value',
                        displayField: 'label'
                    },
                    {
                        xtype: 'combobox',
                        name: 'tipo',
                        fieldLabel: 'Tipo',
                        value: 'tutti',
                        editable: false,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['value', 'label'],
                            data : [
                                {"value":"tutti",           "label":"Tutti"},
                                {"value":"ditta",           "label":"Ditte"},
                                {"value":"individuale",     "label":"Persone"}
                            ]
                        }),
                        valueField: 'value',
                        displayField: 'label'
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                bodyStyle: 'background: transparent',
                defaults: {
                    margin: '0 10 0 10',
                    labelAlign: 'top',
                    labelWidth: 150,
                    listeners: {
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER){
                                var btn = Ext.ComponentQuery.query('ricerca_bar button[action=do_search]')[0];
                                btn.fireEvent('click',btn);
                            }
                        }
                    }
                },
                items:[
                    {
                        xtype: 'textfield',
                        name: 'nome',
                        fieldLabel: 'Nome / Denominazione'
                    },
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
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                bodyStyle: 'background: transparent',
                defaults: {
                    margin: '0 10 0 10',
                    labelAlign: 'top',
                    labelWidth: 150,
                    listeners: {
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER){
                                var btn = Ext.ComponentQuery.query('ricerca_bar button[action=do_search]')[0];
                                btn.fireEvent('click',btn);
                            }
                        }
                    }
                },
                items:[
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
            },

            {
                xtype: 'panel',
                layout: 'hbox',
                bodyStyle: 'background: transparent',
                defaults: {
                    margin: '0 10 0 10',
                    labelAlign: 'top',
                    labelWidth: 150
                },
                items:[
                    {
                        xtype: 'button',
                        action: 'do_search',
                        iconCls: 'x-fa fa-search',
                        text: 'Cerca'
                    },
                    {
                        xtype: 'button',
                        text: 'Pulisci filtri',
                        iconCls: 'x-fa fa-trash',
                        handler: function(){
                            this.up('form').reset();
                            var btn = Ext.ComponentQuery.query('ricerca_bar button[action=do_search]')[0];
                            btn.fireEvent('click',btn);
                        }
                    }
                ]
            }

        ];


        this.callParent(arguments);

    }



});
