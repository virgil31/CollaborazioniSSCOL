Ext.define('CL.view.bbar.V_bbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'bbar',
    itemId: 'bbar_id',
    alias: 'widget.bbar',

    height: 88,
	style: 'background: #333333',

	items: [
		'->',
        /*
		{
			html: '<marquee behavior="scroll" scrollamount="5" direction="left" width="900">'+
				'Hello darkness, my old friend, I\'ve come to talk with you again, Because a vision softly creeping, Left its seeds while I was sleeping, And the vision that was planted in my brain Still remains Within the sound of silence. In restless dreams I walked alone Narrow streets of cobblestone, \'Neath the halo of a street lamp, I turned my collar to the cold and damp When my eyes were stabbed by the flash of a neon light That split the night And touched the sound of silence. And in the naked light I saw Ten thousand people, maybe more. People talking without speaking, People hearing without listening, People writing songs that voices never share And no one dared Disturb the sound of silence. "Fools," said I, "You do not know. Silence like a cancer grows. Hear my words that I might teach you. Take my arms that I might reach you." But my words like silent raindrops fell And echoed in the wells of silence And the people bowed and prayed To the neon god they made. And the sign flashed out its warning In the words that it was forming. And the sign said, "The words of the prophets are written on the subway walls And tenement halls And whispered in the sounds of silence."'+
				'</marquee>',
			hidden: Ext.util.Cookies.get("ced_logged") === null
		},*/
		'->'
	]


});
