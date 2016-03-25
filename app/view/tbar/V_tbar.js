Ext.define('CL.view.tbar.V_tbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'tbar',
    itemId: 'tbar_id',
    alias: 'widget.tbar',

    height: 88,
	style: 'background: #333333',

	initComponent: function() {
		var this_view = this;

		this_view.items = [
			'->',
		    {
		        xtype: 'toolbar',
		        width: 960,
		        style: "background-color: transparent; border:none;",
		        items:[
		            {
		                xtype: 'button',
		                width: 60,
		                height: 60,
		                style: "background-image: url('resources/images/logos/logo-red.png') !important; " +
		                    "background-size: 100% 100%;" +
		                    "border-color: transparent;" +
		                    "background-color: transparent;" +
		                    "background-repeat: no-repeat;",
		                handler: function () {
		                    window.location.href = window.location.pathname + "#home";
		                    location.reload();
		                }
		            },
		            {
		                xtype: 'label',
                        text: 'Soprintendenza Speciale per il Colosseo, il MNR e l\'Area Archeologica di Roma',
		                margin: '0 0 0 10',
                        style:{
                            color: 'white',
                            fontSize: '17px',
                            fontWeight: 'bold'
                        }
		            },
		            '->',
                    {
		            	xtype: 'form',
	    		        bodyStyle: "background-color: transparent;",

		            	items: [
							{
					        	xtype: 'button',
					        	text: 'Pannello Amministrativo',
					        	action: 'go_to_login',
					        	iconCls: 'x-fa fa-star',
					        	padding: 10,
					        	margin: '0 2 0 0',
					        	hidden: Ext.util.Cookies.get('ced_logged') != null,
                                handler: function(){CL.app.getController("C_home").redirectTo("login")},
                                style: 'background: #D92B26;border-color: brown'
					        }
		            	]
		            },
		            {
		            	xtype: 'form',
	    		        bodyStyle: "background-color: transparent;",

		            	items: [
							{
					        	xtype: 'button',
					        	tooltip: 'Esci',
					        	action: 'do_logout',
					        	iconCls: 'x-fa fa-remove',
					        	hidden: Ext.util.Cookies.get('ced_logged') == null
					        }
		            	]
		            }
		        ]
		    },
		    '->'
		]


		this.callParent(arguments);
    }

});
