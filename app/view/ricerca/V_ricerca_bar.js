Ext.define('CL.view.ricerca.V_ricerca_bar', {
    extend: 'Ext.form.Panel',
    xtype: 'ricerca_bar',
    itemId: 'ricerca_bar_id',
    alias: 'widget.ricerca_bar',

    collapsedCls: 'my-collapsed-panel',
    bodyStyle: 'background: #FFEEDA',

    header: {
        style: 'background: #D5DEFF;'
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
                    labelAlign: 'right',
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
                        fieldLabel: 'Esito'
                    },
                    {
                        xtype: 'combobox',
                        name: 'tipo',
                        fieldLabel: 'Tipo'
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                bodyStyle: 'background: transparent',
                defaults: {
                    labelAlign: 'right',
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
                    labelAlign: 'right',
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
                    labelAlign: 'right',
                    labelWidth: 150
                },
                items:[
                    {
                        xtype: 'button',
                        action: 'do_search',
                        iconCls: 'x-fa fa-search',
                        text: 'Cerca',
                        margin: '0 20 0 0'
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
