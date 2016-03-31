Ext.define('CL.view.impostazioni_generali.V_edit', {
    extend: 'Ext.window.Window',
    xtype: 'impostazioni_generali_edit',
    itemId: 'impostazioni_generali_edit_id',
    alias: 'widget.impostazioni_generali_edit',

    autoShow: true,
    modal: true,
    constrain: true,

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    title: 'Impostazioni Generali',

    padding: 10,
    width: 960,

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'htmleditor',
                        fieldLabel: '<b>Testo HomePage</b>',
                        labelWidth: 150,
                        labelAlign: 'top',
                        name: 'testo_home',
                        width: '100%',
                        allowBlank: false,
                        height: 400,
                        //enableColors: false,
                        enableFont: false
                        //enableFontSize: false
                    }
                ],
                buttons: [
                    {
                        text: 'Modifica',
                        action: 'do_edit'
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
