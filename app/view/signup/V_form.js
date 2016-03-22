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

    //padding: 20,

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'panel',
                bodyStyle: 'backgroundColor: rgba(255,255,255,0.75);',
                height: 600,
                width: 960,
                layout: {
                    type: 'vbox',
                    align: 'left',
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
                        xtype: 'checkbox',
                        boxLabel: "Collaborazione tecnica specialistica in fase di sviluppo della progettazione definitiva di interventi di natura archeologica e/o di scavo archeologico redatta dal personale interno della Soprintendenza"
                    },
                    {
                        xtype: 'checkbox',
                        boxLabel: "Collaborazione tecnica specialistica (archittettonica, strutturale, impiantistica, allestimenti, geologica e altro) in fase di sviluppo della progettazione definitiva ed esecutiva redatta dal personale interno della stazione appaltante"
                    }
                ]
            }

        ];

        this.callParent(arguments);

    }



});
