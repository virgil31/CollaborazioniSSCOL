Ext.define('CL.controller.C_registrazione', {
    extend: 'Ext.app.Controller',

    /*routes: {
        'uffici' : 'showView'
    },*/

    stores: [
        'S_registrazione'
    ],

    models: [
        'M_registrazione'
    ],

    views: [
        'registrazione.V_list',
        'registrazione.V_create',
        'registrazione.V_edit'
    ],

    /////////////////////////////////////////////////
    init: function () {
        this.control({

            //ON CREATE
            'registrazione_list button[action=on_create]': {
                click: this.onCreate
            },

            //DO CREATE
            'registrazione_create button[action=do_create]':{
                click: this.doCreate
            },

            //DO EDIT
            'registrazione_edit button[action=do_edit]':{
                click: this.doEdit
            }

        }, this);
    },
    /////////////////////////////////////////////////



    //ON EDIT
    onEdit: function(animateTargetEl,record){
        var win = Ext.widget("registrazione_edit",{
            animateTarget: animateTargetEl
        });

        win.down("form").loadRecord(record);
    },

    //DO EDIT
    doEdit: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            record = form.getRecord(),
            values = form.getValues();

        Ext.Msg.confirm('Attenzione!', "Modificare il Tipo di Laurea?",function(btn){
            if (btn === 'yes'){
                record.set(values);
                window.close();
                setTimeout(function(){
                    Ext.StoreManager.lookup("S_registrazione").reload();
                }, 250);
            }
        });
    },

    //ON CREATE
    onCreate: function(btn){
        Ext.widget("registrazione_create",{
            animateTarget: btn.el
        });
    },


    //DO CREATE
    doCreate: function(btn){
        var window = btn.up('window'),
            form = window.down("form").getForm(),
            values = form.getValues();

        if(form.isValid()){
            Ext.StoreManager.lookup("S_registrazione").add(values);
            window.close();
            setTimeout(function(){
                Ext.StoreManager.lookup("S_registrazione").reload();
            }, 250);
        }
    },


    //SHOW VIEW
    showView: function(){
        //Ext.ComponentQuery.query("window").forEach(function(win){win.destroy();});  //per eliminare le vecchie windows

        if(Ext.util.Cookies.get("ced_logged") !== null){
            if(Ext.ComponentQuery.query('registrazione_list').length == 0)
                Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'registrazione_list'});

            Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('registrazione_list_id');

            Ext.StoreManager.lookup("S_registrazione").loadPage(1);
            Ext.StoreManager.lookup("S_sede").load({
                params: {
                    flag_full: true
                }
            });
        }
        else
            this.redirectTo('login');
    },

    showMenuPreviewAndDownload: function(targetEl,record_registrazione){
        Ext.create("Ext.window.Window",{
            autoShow: true,
            animateTarget: targetEl,
            modal: true,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            title: 'Documenti <b>'+record_registrazione.get("nome_grid")+"</b>",
            padding: 10,
            width: 275,
            defaults:{margin: '10 0 10 0'},
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    flex: 1,
                    items: [
                        {
                            xtype: 'label',
                            text: 'Curriculum Vitae',
                            margin: '5 20 0 0',
                            width: 150
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            tooltip: 'Anteprima',
                            margin: '0 20 0 0',
                            handler: function(){CL.app.getController("C_preview").showWindowPreview(this.el,record_registrazione.get("url_curriculum"));}
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Scarica',
                            iconCls: 'x-fa fa-download',
                            handler: function(){
                                Ext.create('Ext.Component', {
                                    renderTo: Ext.getBody(),
                                    cls: 'x-hidden',
                                    autoEl: {
                                        tag: 'iframe',
                                        src: 'data/preview/download_single.php?file_url='+record_registrazione.get("url_curriculum")+'&file_name='+record_registrazione.get("nome_grid")+'-CV'
                                    }
                                });
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    flex: 1,
                    items: [
                        {
                            xtype: 'label',
                            text: "Documento d'Identità",
                            margin: '5 20 0 0',
                            width: 150
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Anteprima',
                            iconCls: 'x-fa fa-search',
                            margin: '0 20 0 0',
                            handler: function(){CL.app.getController("C_preview").showWindowPreview(this.el,record_registrazione.get("url_documento_identita"));}
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Scarica',
                            iconCls: 'x-fa fa-download',
                            handler: function(){
                                Ext.create('Ext.Component', {
                                    renderTo: Ext.getBody(),
                                    cls: 'x-hidden',
                                    autoEl: {
                                        tag: 'iframe',
                                        src: 'data/preview/download_single.php?file_url='+record_registrazione.get("url_documento_identita")+'&file_name='+record_registrazione.get("nome_grid")+'-Documento_Identita'
                                    }
                                });
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    flex: 1,
                    items: [
                        {
                            xtype: 'label',
                            text: 'Referenze Professionali',
                            margin: '5 20 0 0',
                            width: 150
                        },
                        {
                            xtype: 'button',
                            //disabled: true,
                            iconCls: 'x-fa fa-search',
                            tooltip: 'Anteprima',
                            margin: '0 20 0 0',
                            handler: function(){CL.app.getController("C_preview").showWindowPreview(this.el,record_registrazione.get("url_referenze_professionali"));}
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Scarica',
                            iconCls: 'x-fa fa-download',
                            handler: function(){
                                Ext.create('Ext.Component', {
                                    renderTo: Ext.getBody(),
                                    cls: 'x-hidden',
                                    autoEl: {
                                        tag: 'iframe',
                                        src: 'data/preview/download_single.php?file_url='+record_registrazione.get("url_referenze_professionali")+'&file_name='+record_registrazione.get("nome_grid")+'-Referenze_Professionali'
                                    }
                                });
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    flex: 1,
                    items: [
                        {
                            xtype: 'label',
                            text: 'Dichiarazione Sostitutiva',
                            margin: '5 20 0 0',
                            width: 150
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Anteprima',
                            iconCls: 'x-fa fa-search',
                            margin: '0 20 0 0',
                            handler: function(){CL.app.getController("C_preview").showWindowPreview(this.el,record_registrazione.get("url_dichiarazione_sostitutiva"));}
                        },
                        {
                            xtype: 'button',
                            tooltip: 'Scarica',
                            iconCls: 'x-fa fa-download',
                            handler: function(){
                                Ext.create('Ext.Component', {
                                    renderTo: Ext.getBody(),
                                    cls: 'x-hidden',
                                    autoEl: {
                                        tag: 'iframe',
                                        src: 'data/preview/download_single.php?file_url='+record_registrazione.get("url_dichiarazione_sostitutiva")+'&file_name='+record_registrazione.get("nome_grid")+'-Dichiarazione_Sostitutiva'
                                    }
                                });
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: 'Scarica Archivio ZIP',
                    iconCls: 'x-fa fa-archive',
                    style: 'background: green; border-color: transparent;',
                    handler: function(){
                        Ext.create('Ext.Component', {
                            renderTo: Ext.getBody(),
                            cls: 'x-hidden',
                            autoEl: {
                                tag: 'iframe',
                                src: 'data/preview/download_zip.php?tipo='+record_registrazione.get("tipo")+'&registrazione_id='+record_registrazione.get("id")
                            }
                        });
                    }
                }
            ]
        });
    }


});
