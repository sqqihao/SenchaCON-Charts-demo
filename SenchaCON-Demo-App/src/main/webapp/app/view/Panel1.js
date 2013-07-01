Ext.define('ReplayAnalytics.view.Panel1', {
	extend: 'Ext.Panel',
	xtype: 'panel1',
	fullscreen: true,
	config: {
		id: 'Panel1',
		layout: {type: 'vbox', pack: 'center'},
    	flex: 1,
    	style: 'padding-bottom:20px; background-color: white; color:black',
    	items: [
{
	xtype: 'addchartpanel1',
	fullscreen: true,
	width:'100%',
	height:'100%',
},
    	       /*{
    	        	xtype: 'carousel',
    	        	id: 'carousel1',
    	        	direction: 'horizontal',
    	        	fullscreen: true,
    	        	cls: 'carousel-style',
    	        	width: '100%',
    	        	 hidden: true,
    	        	height: '100%',
    	        	items: [
    	        	        {
    	        	        	xtype: 'addchartpanel1',
    	        	        },    	        	        
    	        	       ]
    	        }*/
    	]
	}
});