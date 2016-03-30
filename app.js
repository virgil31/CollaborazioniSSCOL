Ext.application({
    extend: 'Ext.app.Application',

    name: 'CL',

    requires: [
        'CL.view.utils.SRCComponent',
        'Ext.window.Toast'
    ],

    stores:[
        'S_nazioni' //JsonStore
    ],

    controllers: [
        'C_not_found',
        'C_login',
        'C_home',

        'C_bbar',
        'C_tbar',

        'C_admin_panel',

        'C_ruolo',      //
        'C_requisito',  //

        'C_signup',
        'C_servizio',
        'C_tipo_laurea',
        'C_diploma',
        'C_tipo_specializzazione',

        'C_activate'
    ],

    // vv ROUTING

    defaultToken : 'home', //se arrivo www.miosito.it ==> www.miosito.it/#home

    // Quando nessuna route è stata trovata
    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onUnmatchedRoute'
            }
        }
    },

    onUnmatchedRoute: function(hash) {
        //this.redirectTo('not_found');
        if(Ext.ComponentQuery.query('not_found').length == 0)
            Ext.ComponentQuery.query('viewport panel[name=card]')[0].add({xtype: 'not_found'});

        Ext.ComponentQuery.query('viewport panel[name=card]')[0].getLayout().setActiveItem('not_found_id');
    },

    // ^^

    launch: function () {

        var item = document.getElementById("img_loader_id");
        item.parentNode.removeChild(item);


        this.applyOverrides();

        //previene la creazione dei context menu del browser
        //Ext.getDoc().on('contextmenu', function(ev) {
        //     ev.preventDefault();
        //});


        Ext.create('Ext.container.Viewport',{
            layout: 'fit',
            items:[
                {
                    xtype: 'panel',
                    scrollable: true,
                    bodyStyle: "background: url('resources/images/background.jpg');background-repeat: no-repeat;background-position: 0 0;background-size: cover;",
                    tbar: Ext.widget('tbar'),
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            name: 'card',
                            layout: 'card',
                            width: 960,
                            minHeight: window.innerHeight-88-88,
                            bodyStyle: 'backgroundColor: transparent'
                        }
                    ],
                    bbar: Ext.widget('bbar')
                }
            ]
        });

        window.onresize = function(){
            Ext.ComponentQuery.query('viewport panel[name=card]')[0].minHeight = window.innerHeight-88-88;
        }
    },


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    applyOverrides: function () {
        //override messaggio EN -> ITA
        Ext.override(Ext.form.field.VTypes,{
            emailText: 'Inserire una e-mail valida.',
        });
        Ext.override(Ext.form.field.Text,{
            blankText: 'Campo richiesto',
            minLengthText: 'La lunghezza minima di questo campo è {0}',
            maxLengthText: 'La lunghezza massima di questo campo è {0}'
        });


        /*
         fade animation card layout
         */
        Ext.override(Ext.layout.container.Card, {
            setActiveItem: function (newCard) {

                var me = this,
                    owner = me.owner,
                    oldCard = me.activeItem,
                    rendered = owner.rendered,
                    newIndex;

                newCard = me.parseActiveItem(newCard);
                newIndex = owner.items.indexOf(newCard);

                // If the card is not a child of the owner, then add it.
                // Without doing a layout!
                if (newIndex === -1) {
                    newIndex = owner.items.items.length;
                    Ext.suspendLayouts();
                    newCard = owner.add(newCard);
                    Ext.resumeLayouts();
                }

                // Is this a valid, different card?
                if (newCard && oldCard !== newCard) {
                    // Fire the beforeactivate and beforedeactivate events on the cards
                    if (newCard.fireEvent('beforeactivate', newCard, oldCard) === false) {
                        return false;
                    }
                    if (oldCard && oldCard.fireEvent('beforedeactivate', oldCard, newCard) === false) {
                        return false;
                    }

                    if (rendered) {
                        Ext.suspendLayouts();

                        // If the card has not been rendered yet, now is the time to do so.
                        if (!newCard.rendered) {
                            me.renderItem(newCard, me.getRenderTarget(), owner.items.length);
                        }

                        var handleNewCard = function () {
                            // Make sure the new card is shown
                            if (newCard.hidden) {
                                newCard.show();
                            }

                            if (!newCard.tab) {
                                var newCardEl = newCard.getEl();
                                newCardEl.dom.style.opacity = 1;
                                if (newCardEl.isStyle('display', 'none')) {
                                    newCardEl.setDisplayed('');
                                } else {
                                    newCardEl.show();
                                }
                            }

                            // Layout needs activeItem to be correct, so set it if the show has not been vetoed
                            if (!newCard.hidden) {
                                me.activeItem = newCard;
                            }
                            Ext.resumeLayouts(true);
                        };

                        var handleOldCard = function () {
                            if (me.hideInactive) {
                                oldCard.hide();
                                oldCard.hiddenByLayout = true;
                            }
                            oldCard.fireEvent('deactivate', oldCard, newCard);
                        };

                        if (oldCard && !newCard.tab) {
                            var oldCardEl = oldCard.getEl();
                            oldCardEl.fadeOut({
                                callback: function () {
                                    handleOldCard();
                                    handleNewCard();
                                    Ext.ComponentQuery.query('viewport panel')[0].body.scrollTo('top',0);                    //AGGIUNTA PER LO SCROLL TOP
                                }
                            });

                        } else if (oldCard) {
                            handleOldCard();
                            handleNewCard();
                        } else {
                            handleNewCard();
                        }

                    } else {
                        me.activeItem = newCard;
                    }

                    newCard.fireEvent('activate', newCard, oldCard);

                    return me.activeItem;
                }
                return false;
            }
        });
        //^^ fade animation card layout
    }
});
