Ext.define('CL.view.home.V_home', {
    extend: 'Ext.panel.Panel',
    xtype: 'home',
    itemId: 'home_id',
    alias: 'widget.home',

    bodyStyle: 'backgroundColor: transparent',  //per rendere il corpo invisibile

    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
    },

    initComponent: function() {
        var this_view = this;

        this_view.items = [
            {
                xtype: 'panel',
                bodyStyle: 'backgroundColor: rgba(255,255,255,0.75);',
                width: 940,
                tbar: [
                    {
                        xtype: 'toolbar',
                        width: '100%',
                        items: [
                            '->',
                            {
                                xtype: 'label',
                                text: 'Archivio Collaboratori',
                                style:{
                                    color: '#9C1413',
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
                        xtype:'panel',
                        bodyStyle: 'backgroundColor: transparent',
                        padding: 10,
                        layout: {
                            type: 'vbox',
                            align: 'center',
                            pack: 'center'
                        },
                        items: [
                            {
                                html: "<div style=\"text-align: center;color: #3993D4; font-size: 16px; font-weight: bold\">Per essere inserito nell’elenco dei professionisti per attività di collaborazione con<br> la Soprintendenza Speciale per il Colosseo, il MNR e l'Area Archeologica<br> di Roma occorre seguire i seguenti passi:",
                                bodyStyle: 'background: transparent;',
                                width: '100%'
                            },
                            {
                                html: '<ol><li>scaricare e compilare il seguente documento <a href="/resources/form.xlsx">Scheda Referenze Professionali</a> </li><li>scegliere l’attività professionale per la quale si propone la collaborazione (min. 1 max 5);</li<li>inserire i dati anagrafici per creare il proprio profilo;</li><li>selezionare i titoli di studio posseduti dalla lista o utilizzando il campo libero per i titoli non presenti;</li<li>caricare gli allegati: Curriculum Vitae in formato europeo (file pdf o Word) e fotocopia digitalizzata di un documento di riconoscimento valido (file jpg, png o pdf);</li><li>confermare i dati inseriti;</li><li>si riceverà immediatamente una prima mail contenente un link da confermare;</li><li>si riceverà una seconda mail di conferma dell’iscrizione nell’elenco con il riepilogo di tutti i dati registrati e con un codice identificativo personale e un indirizzo mail da utilizzare per tutte le successive comunicazioni con la Soprintendenza.</li></ol>',
                                bodyStyle: 'background: transparent;',
                                width: '70%'
                            },
                            {
                                html: '<a href="#registrazione_individuale" style="color: #08c; font-size: 24px; font-weight: bold;">Procedura di registrazione - Individuale</a>',
                                bodyStyle: 'background: transparent;',
                                margin: '20 0 0 0'
                            },
                            {
                                html: '<a href="#registrazione_ditta" style="color: #08c; font-size: 24px; font-weight: bold;">Procedura di registrazione - Studi e Associazioni</a>',
                                bodyStyle: 'background: transparent;',
                                margin: '20 0 10 0'
                            }
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);

    }



});
