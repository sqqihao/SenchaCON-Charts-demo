Ext.define('ReplayAnalytics.controller.AreaBar', {
	extend : 'Ext.app.Controller',
	xtype: 'areabarcontroller',
	config: {
		refs: {
			'loginController': 'logincontroller',
			'mainController': 'maincontroller',
		}
	},
	
	launch: function(){
	},
	
	createAreaChart: function(store,chartIndex,groupByBarArray) {
		var obj = ReplayAnalytics.app.newChart[ReplayAnalytics.app.currentActivePanelIndex];
		if (obj != undefined){
			if (obj.getLegend() != undefined){
				obj.getLegend().destroy();
			}		
			obj.destroy();
		}
		if (groupByBarArray == undefined){
			this.createAreaChartGroupByNone(store,chartIndex);
		}
		else {
			ReplayAnalytics.app.groupByValueBar = new Array();
			for (i = 0; i < groupByBarArray.length; i++){
				ReplayAnalytics.app.groupByValueBar[i] = 'groupByBar' + (i+1);
			}
			if (groupByBarArray.length != 0 && groupByBarArray[groupByBarArray.length - 1] != 'other'){
				groupByBarArray[groupByBarArray.length] = "Other";
				ReplayAnalytics.app.groupByValueBar[ReplayAnalytics.app.groupByValueBar] = "Other";
			}	
			if (groupByBarArray.length == 2){
				this.createAreaChartGroupBy1(store,chartIndex, groupByBarArray);
			} else if (groupByBarArray.length == 3){
				this.createAreaChartGroupBy2(store,chartIndex, groupByBarArray);
			} else if (groupByBarArray.length == 4){
				this.createAreaChartGroupBy3(store,chartIndex, groupByBarArray);
			} else if (groupByBarArray.length == 5){
				this.createAreaChartGroupBy4(store,chartIndex, groupByBarArray);
			}			
		}		
	},
	
	createAreaChartGroupByNone: function(store,chartIndex) {
		ReplayAnalytics.app.newChart[ReplayAnalytics.app.currentActivePanelIndex] = Ext.create("Ext.chart.CartesianChart", {
		    id: 'chart'+ReplayAnalytics.app.currentActivePanelIndex,
		    flex: 1,
		    store: store,
		    shadow: true,
		    insetPadding: {top: 15, left: 0, right: 0, bottom: 25},
		    animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
		    innerPadding: {top: 15, left: 0, right: 0, bottom: 25},
		    interactions: ['panzoom'],
		    legend: {
		        position: 'right',
		        width: 80
		    },
	    	axes: [
	    	       {
	    	    	   	type: 'numeric',
	    	    	   	position: 'left',
	    	    	   	style: {
	    	    	   		strokeStyle: 'black',
	    	    	   		shadowColor: 'black',    	    	   	
	    	       		},
	    	    	   	label: {fontFamily: 'Helvetica', color: '#4270A2'},
	    	       		fields: ReplayAnalytics.app.dataFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	    	    	   	minimum: 0,
	    	    	   	maximum: ReplayAnalytics.app.Ymax[ReplayAnalytics.app.currentActivePanelIndex],
	    	    	   	title: {
	   						text: ReplayAnalytics.app.dataFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	   						strokeStyle: '#4270A2',
	   						fillStyle: '#4270A2',
	   						shadowColor: 'black',
	   					},	   					
	    	       },
	    	       {
	    	    	   	type: 'category',
	    	    	   	position: 'bottom',
	    	    	   	label: {fontFamily: 'Helvetica', color: '#4270A2'},
	    	       		fields: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	    	    	   	style: {
	    	    	   		strokeStyle: 'black',
	    	    	   		shadowColor: 'black',
	    	       		},
	    	       		title: {
	   						text: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	   						strokeStyle: '#4270A2',
	   						fillStyle: '#4270A2',
	   						shadowColor: 'black',	    	    	   	
	   					},
	    	       }
	    	    ],
	    	    series: [
	    	             {
	    	            	 type: 'area',
	    	            	 xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	    	            	 yField: ReplayAnalytics.app.dataFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	    	            	 axis: 'bottom',
	    	            	 highlight: true,
	    	            	 showInLegend: false,
	    	            	 shadow: true,
	    	            	 animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
	    	            	 style: {
	    	            		 	//fill: "#115fa6",
	    	            		 	stroke: "#115fa6",
	    	            	 		fillOpacity: 0,
	    	            	 		lineWidth: 3,
	    	            	 		smooth: true,
	    	             	 },
	    	             	 subStyle: {
	    	             			fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
	    	             	 }
	    	              }
	    	           ]
		});
	},		
	
	createAreaChartGroupBy1: function(store, chartIndex, groupByBarArray){
		ReplayAnalytics.app.newChart[ReplayAnalytics.app.currentActivePanelIndex] = Ext.create("Ext.chart.CartesianChart", {
		    id: 'chart'+ReplayAnalytics.app.currentActivePanelIndex,
		    flex: 1,
		    store: store,
		    shadow: true,
		    insetPadding: {top: 15, left: 0, right: 0, bottom: 25},
		    interactions: ['panzoom'],
		    legend: {
		        position: 'right',
		        width: 80
		    },
		    animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
		    legend: {
	            position: 'right'
	        },
	    	axes: [
	    	       {
	    	    	   	type: 'numeric',
	    	    	   	position: 'left',
	    	    	   	style: {
	    	    	   		strokeStyle: 'black',
	    	    	   		shadowColor: 'black',    	    	   	
	    	       		},
	    	    	   	label: {fontFamily: 'Helvetica', color: '#4270A2'},
	    	       		//fields: groupByBarArray,
	    	       		minimum: 0,
	    	    	   	maximum: ReplayAnalytics.app.Ymax[ReplayAnalytics.app.currentActivePanelIndex],
	    	    	   	title: {
	   						text: ReplayAnalytics.app.dataFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	   						strokeStyle: '#4270A2',
	   						fillStyle: '#4270A2',
	   						shadowColor: 'black',
	   					},	   					
	    	       },
	    	       {
	    	    	   	type: 'category',
	    	    	   	position: 'bottom',
	    	    	   	label: {fontFamily: 'Helvetica', color: '#4270A2'},
	    	       		fields: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	    	    	   	style: {
	    	    	   		strokeStyle: 'black',
	    	    	   		shadowColor: 'black',
	    	       		},
	    	       		title: {
	   						text: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	   						strokeStyle: '#4270A2',
	   						fillStyle: '#4270A2',
	   						shadowColor: 'black',	    	    	   	
	   					},
	    	       }
	    	    ],
	    	    series: [
	    	             {
   	    	            	 type: 'area',
   	    	            	 xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
   	    	            	 yField: ReplayAnalytics.app.groupByValueBar[0],
   	    	            	 title: groupByBarArray[0],
   	    	            	 axis: 'bottom',
   	    	            	 highlight: true,
   	    	            	 showInLegend: true,
   	    	            	 shadow: true,
   	    	            	 animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
   	    	            	 style: {
    	            		 	//fill: "#115fa6",
    	            		 	stroke: "#115fa6",
    	            	 		fillOpacity: 0,
    	            	 		lineWidth: 3,
    	            	 		smooth: true,
   	    	            	 },
   	    	              subStyle: {
   	    	                fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
   	    	            },

   	    	            	 marker: {
   	    	            		 type: 'circle',
   	    	            		 radius: 4,
   	    	            		 lineWidth: 3
   	    	            	 }  	    	             	 
   	    	              },
   	    	              {
   	    	            	  type: 'area',
   	    	            	  xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
   	    	            	  yField: ReplayAnalytics.app.groupByValueBar[1],
   	    	            	  title: groupByBarArray[1],
   	    	            	  axis: 'bottom',
   	    	            	  highlight: true,
   	    	            	  showInLegend: true,
   	    	            	  shadow: true,
   	    	            	  animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
   	    	            	  style: {
   	    	            		  //fill: "#94ae0a",
   	    	            		  stroke: "#94ae0a",
   	    	            		  fillOpacity: 0,
   	    	            		  lineWidth: 3,
   	    	            		  smooth: true,
   	    	            	  }, 
   	    	            	  subStyle: {
   	    	                   fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
   	    	               },

   	    	            	  marker: {
   	    	            		type: 'circle',
   	    	            		radius: 4,
   	    	            		lineWidth: 3
   	    	            	  }
	    	              },	    	                 	    	              
   	    	           ]
		});	
	},
	
	createAreaChartGroupBy2: function(store, chartIndex, groupByBarArray){
		ReplayAnalytics.app.newChart[ReplayAnalytics.app.currentActivePanelIndex] = Ext.create("Ext.chart.CartesianChart", {
		    id: 'chart'+ReplayAnalytics.app.currentActivePanelIndex,
		    flex: 1,
		    store: store,
		    shadow: true,
		    insetPadding: {top: 15, left: 0, right: 0, bottom: 25},
		    interactions: ['panzoom'],
		    legend: {
		        position: 'right',
		        width: 80
		    },
		    animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
		    legend: {
	            position: 'right'
	        },
	    	axes: [
	    	       {
	    	    	   	type: 'numeric',
	    	    	   	position: 'left',
	    	    	   	style: {
	    	    	   		strokeStyle: 'black',
	    	    	   		shadowColor: 'black',    	    	   	
	    	       		},
	    	    	   	label: {fontFamily: 'Helvetica', color: '#4270A2'},
	    	       		//fields: groupByBarArray,
	    	       		minimum: 0,
	    	    	   	maximum: ReplayAnalytics.app.Ymax[ReplayAnalytics.app.currentActivePanelIndex],
	    	    	   	title: {
	   						text: ReplayAnalytics.app.dataFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	   						strokeStyle: '#4270A2',
	   						fillStyle: '#4270A2',
	   						shadowColor: 'black',
	   					},	   					
	    	       },
	    	       {
	    	    	   	type: 'category',
	    	    	   	position: 'bottom',
	    	    	   	label: {fontFamily: 'Helvetica', color: '#4270A2'},
	    	       		fields: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	    	    	   	style: {
	    	    	   		strokeStyle: 'black',
	    	    	   		shadowColor: 'black',
	    	       		},
	    	       		title: {
	   						text: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	   						strokeStyle: '#4270A2',
	   						fillStyle: '#4270A2',
	   						shadowColor: 'black',	    	    	   	
	   					},
	    	       }
	    	    ],
	    	    series: [
	    	             {
   	    	            	 type: 'area',
   	    	            	 xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
   	    	            	 yField: ReplayAnalytics.app.groupByValueBar[0],
   	    	            	 title: groupByBarArray[0],
   	    	            	 axis: 'bottom',
   	    	            	 highlight: true,
   	    	            	 showInLegend: true,
   	    	            	 shadow: true,
   	    	            	 animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
   	    	            	 style: {
    	            		 	//fill: "#115fa6",
    	            		 	stroke: "#115fa6",
    	            	 		fillOpacity: 0,
    	            	 		lineWidth: 3,
    	            	 		smooth: true,
   	    	            	 },
   	    	              subStyle: {
   	    	                fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
   	    	            },

   	    	            	 marker: {
   	    	            		 type: 'circle',
   	    	            		 radius: 4,
   	    	            		 lineWidth: 3
   	    	            	 }  	    	             	 
   	    	              },
   	    	              {
   	    	            	  type: 'area',
   	    	            	  xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
   	    	            	  yField: ReplayAnalytics.app.groupByValueBar[1],
   	    	            	  title: groupByBarArray[1],
   	    	            	  axis: 'bottom',
   	    	            	  highlight: true,
   	    	            	  showInLegend: true,
   	    	            	  shadow: true,
   	    	            	  animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
   	    	            	  style: {
   	    	            		  //fill: "#94ae0a",
   	    	            		  stroke: "#94ae0a",
   	    	            		  fillOpacity: 0,
   	    	            		  lineWidth: 3,
   	    	            		  smooth: true,
   	    	            	  }, 
   	    	            	  subStyle: {
   	    	                   fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
   	    	               },

   	    	            	  marker: {
   	    	            		type: 'circle',
   	    	            		radius: 4,
   	    	            		lineWidth: 3
   	    	            	  }
	    	              },
	    	              {
   	    	            	 type: 'area',
   	    	            	 xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
   	    	            	 yField: ReplayAnalytics.app.groupByValueBar[2],
   	    	            	 title: groupByBarArray[2],
   	    	            	 axis: 'bottom',
   	    	            	 highlight: true,
   	    	            	 showInLegend: true,
   	    	            	 shadow: true,
   	    	            	 animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
   	    	            	 style: {
    	            		 	//fill: "#a61120",
    	            		 	stroke: "#a61120",
    	            	 		fillOpacity: 0,
    	            	 		lineWidth: 3,
    	            	 		smooth: true,
   	    	            	 }, 
   	    	              subStyle: {
   	    	                fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
   	    	            },

   	    	            	 marker: {
   	    	            		 type: 'circle',
   	    	            		 radius: 4,
   	    	            		 lineWidth: 3
   	    	            	 }
   	    	              },   	    	                	    	              
   	    	           ]
		});	
	},
	
	createAreaChartGroupBy3: function(store, chartIndex, groupByBarArray){
		ReplayAnalytics.app.newChart[ReplayAnalytics.app.currentActivePanelIndex] = Ext.create("Ext.chart.CartesianChart", {
		    id: 'chart'+ReplayAnalytics.app.currentActivePanelIndex,
		    flex: 1,
		    store: store,
		    shadow: true,
		    insetPadding: {top: 15, left: 0, right: 0, bottom: 25},
		    interactions: ['panzoom'],
		    animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
		    legend: {
		        position: 'right',
		        width: 80
		    },
	    	axes: [
	    	       {
	    	    	   	type: 'numeric',
	    	    	   	position: 'left',
	    	    	   	style: {
	    	    	   		strokeStyle: 'black',
	    	    	   		shadowColor: 'black',    	    	   	
	    	       		},
	    	    	   	label: {fontFamily: 'Helvetica', color: '#4270A2'},
	    	       		//fields: groupByBarArray,
	    	       		minimum: 0,
	    	    	   	maximum: ReplayAnalytics.app.Ymax[ReplayAnalytics.app.currentActivePanelIndex],
	    	    	   	title: {
	   						text: ReplayAnalytics.app.dataFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	   						strokeStyle: '#4270A2',
	   						fillStyle: '#4270A2',
	   						shadowColor: 'black',
	   					},	   					
	    	       },
	    	       {
	    	    	   	type: 'category',
	    	    	   	position: 'bottom',
	    	    	   	label: {fontFamily: 'Helvetica', color: '#4270A2'},
	    	       		fields: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	    	    	   	style: {
	    	    	   		strokeStyle: 'black',
	    	    	   		shadowColor: 'black',
	    	       		},
	    	       		
	    	       		title: {
	   						text: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	   						strokeStyle: '#4270A2',
	   						fillStyle: '#4270A2',
	   						shadowColor: 'black',	    	    	   	
	   					},
	    	       }
	    	    ],
	    	    series: [
	    	             {
   	    	            	 type: 'area',
   	    	            	 xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
   	    	            	 yField: ReplayAnalytics.app.groupByValueBar[0],
   	    	            	 title: groupByBarArray[0],
   	    	            	 axis: 'bottom',
   	    	            	 highlight: true,
   	    	            	 showInLegend: true,
   	    	            	 shadow: true,
   	    	            	 animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
   	    	            	 style: {
    	            		 	//fill: "#115fa6",
    	            		 	stroke: "#115fa6",
    	            	 		fillOpacity: 0,
    	            	 		lineWidth: 3,
    	            	 		smooth: true,
   	    	            	 },
   	    	              subStyle: {
   	    	                fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
   	    	            },

   	    	            	 marker: {
   	    	            		 type: 'circle',
   	    	            		 radius: 4,
   	    	            		 lineWidth: 3
   	    	            	 }  	    	             	 
   	    	              },
   	    	              {
   	    	            	  type: 'area',
   	    	            	  xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
   	    	            	  yField: ReplayAnalytics.app.groupByValueBar[1],
   	    	            	  title: groupByBarArray[1],
   	    	            	  axis: 'bottom',
   	    	            	  highlight: true,
   	    	            	  showInLegend: true,
   	    	            	  shadow: true,
   	    	            	  animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
   	    	            	  style: {
   	    	            		  //fill: "#94ae0a",
   	    	            		  stroke: "#94ae0a",
   	    	            		  fillOpacity: 0,
   	    	            		  lineWidth: 3,
   	    	            		  smooth: true,
   	    	            	  }, 
   	    	            	  subStyle: {
   	    	                   fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
   	    	               },

   	    	            	  marker: {
   	    	            		type: 'circle',
   	    	            		radius: 4,
   	    	            		lineWidth: 3
   	    	            	  }
	    	              },
	    	              {
   	    	            	 type: 'area',
   	    	            	 xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
   	    	            	 yField: ReplayAnalytics.app.groupByValueBar[2],
   	    	            	 title: groupByBarArray[2],
   	    	            	 axis: 'bottom',
   	    	            	 highlight: true,
   	    	            	 showInLegend: true,
   	    	            	 shadow: true,
   	    	            	 animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
   	    	            	 style: {
    	            		 	//fill: "#a61120",
    	            		 	stroke: "#a61120",
    	            	 		fillOpacity: 0,
    	            	 		lineWidth: 3,
    	            	 		smooth: true,
   	    	            	 }, 
   	    	              subStyle: {
   	    	                fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
   	    	            },

   	    	            	 marker: {
   	    	            		 type: 'circle',
   	    	            		 radius: 4,
   	    	            		 lineWidth: 3
   	    	            	 }
   	    	              },
   	    	              {
	    	            	 type: 'area',
	    	            	 xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	    	            	 yField: ReplayAnalytics.app.groupByValueBar[3],
	    	            	 title: groupByBarArray[3],
	    	            	 axis: 'bottom',
	    	            	 highlight: true,
	    	            	 showInLegend: true,
	    	            	 shadow: true,
	    	            	 animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
	    	            	 style: {
	    	            		 //fill: "#ff8809",
	    	            		 stroke: "#ff8809",
	    	            		 fillOpacity: 0,
	    	            		 lineWidth: 3,
	    	            		 smooth: true,
	    	            	 },
	    	            	  subStyle: {
	    	                      fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
	    	                  },

	    	            	 marker: {
	    	                     type: 'circle',
	    	                     radius: 4,
	    	                     lineWidth: 3
	    	                 }
	    	              },   	    	              
   	    	           ]
		});	
	},
	
	createAreaChartGroupBy4: function(store, chartIndex, groupByBarArray){
		ReplayAnalytics.app.newChart[ReplayAnalytics.app.currentActivePanelIndex] = Ext.create("Ext.chart.CartesianChart", {
		    id: 'chart'+ReplayAnalytics.app.currentActivePanelIndex,
		    flex: 1,
		    store: store,
		    shadow: true,
		    insetPadding: {top: 15, left: 0, right: 0, bottom: 25},
		    interactions: ['panzoom'],
		    legend: {
		        position: 'right',
		        width: 80
		    },
		    animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
		    legend: {
	            position: 'right'
	        },
	    	axes: [
	    	       {
	    	    	   	type: 'numeric',
	    	    	   	position: 'left',
	    	    	   	style: {
	    	    	   		strokeStyle: 'black',
	    	    	   		//shadowColor: 'black',    	    	   	
	    	       		},
	    	    	   	label: {fontFamily: 'Helvetica', color: '#4270A2'},
	    	       		fields: groupByBarArray,
	    	       		minimum: 0,
	    	    	   	maximum: ReplayAnalytics.app.Ymax[ReplayAnalytics.app.currentActivePanelIndex],
	    	    	   	title: {
	   						text: ReplayAnalytics.app.dataFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	   						strokeStyle: '#4270A2',
	   						fillStyle: '#4270A2',
	   						shadowColor: 'black',
	   					},	   					
	    	       },
	    	       {
	    	    	   	type: 'category',
	    	    	   	position: 'bottom',
	    	    	   	label: {fontFamily: 'Helvetica', color: '#4270A2'},
	    	       		fields: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	    	    	   	style: {
	    	    	   		strokeStyle: 'black',
	    	    	   		shadowColor: 'black',
	    	       		},
	    	       		title: {
	   						text: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	   						strokeStyle: '#4270A2',
	   						fillStyle: '#4270A2',
	   						shadowColor: 'black',	    	    	   	
	   					},
	    	       }
	    	    ],
	    	    series: [
	    	             {
   	    	            	 type: 'area',
   	    	            	 xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
   	    	            	 yField: ReplayAnalytics.app.groupByValueBar[0],
   	    	            	 title: groupByBarArray[0],
   	    	            	 axis: 'bottom',
   	    	            	 highlight: true,
   	    	            	 showInLegend: true,
   	    	            	 shadow: true,
   	    	            	 animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
   	    	            	 style: {
    	            		 	//fill: "#115fa6",
    	            		 	stroke: "#115fa6",
    	            	 		fillOpacity: 0,
    	            	 		lineWidth: 3,
    	            	 		smooth: true,
   	    	            	 },
   	    	              subStyle: {
   	    	                fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
   	    	            },

   	    	            	 marker: {
   	    	            		 type: 'circle',
   	    	            		 radius: 4,
   	    	            		 lineWidth: 3
   	    	            	 }  	    	             	 
   	    	              },
   	    	              {
   	    	            	  type: 'area',
   	    	            	  xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
   	    	            	  yField: ReplayAnalytics.app.groupByValueBar[1],
   	    	            	  title: groupByBarArray[1],
   	    	            	  axis: 'bottom',
   	    	            	  highlight: true,
   	    	            	  showInLegend: true,
   	    	            	  shadow: true,
   	    	            	  animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
   	    	            	  style: {
   	    	            		  //fill: "#94ae0a",
   	    	            		  stroke: "#94ae0a",
   	    	            		  fillOpacity: 0,
   	    	            		  lineWidth: 3,
   	    	            		  smooth: true,
   	    	            	  }, 
   	    	            	  subStyle: {
   	    	                   fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
   	    	               },

   	    	            	  marker: {
   	    	            		type: 'circle',
   	    	            		radius: 4,
   	    	            		lineWidth: 3
   	    	            	  }
	    	              },
	    	              {
   	    	            	 type: 'area',
   	    	            	 xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
   	    	            	 yField: ReplayAnalytics.app.groupByValueBar[2],
   	    	            	 title: groupByBarArray[2],
   	    	            	 axis: 'bottom',
   	    	            	 highlight: true,
   	    	            	 showInLegend: true,
   	    	            	 shadow: true,
   	    	            	 animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
   	    	            	 style: {
    	            		 	//fill: "#a61120",
    	            		 	stroke: "#a61120",
    	            	 		fillOpacity: 0,
    	            	 		lineWidth: 3,
    	            	 		smooth: true,
   	    	            	 }, 
   	    	              subStyle: {
   	    	                fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
   	    	            },
   	    	            	 marker: {
   	    	            		 type: 'circle',
   	    	            		 radius: 4,
   	    	            		 lineWidth: 3
   	    	            	 }
   	    	              },
   	    	              {
	    	            	 type: 'area',
	    	            	 xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	    	            	 yField: ReplayAnalytics.app.groupByValueBar[3],
	    	            	 title: groupByBarArray[3],
	    	            	 axis: 'bottom',
	    	            	 highlight: true,
	    	            	 showInLegend: true,
	    	            	 shadow: true,
	    	            	 animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
	    	            	 style: {
	    	            		 //fill: "#ff8809",
	    	            		 stroke: "#ff8809",
	    	            		 fillOpacity: 0,
	    	            		 lineWidth: 3,
	    	            		 smooth: true,
	    	            	 },
	    	            	  subStyle: {
	    	                      fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
	    	                  },

	    	            	 marker: {
	    	                     type: 'circle',
	    	                     radius: 4,
	    	                     lineWidth: 3
	    	                 }
	    	              },  
	    	              {
	    	            	 type: 'area',
	    	            	 xField: ReplayAnalytics.app.categoryFieldValues[ReplayAnalytics.app.currentActivePanelIndex],
	    	            	 yField: ReplayAnalytics.app.groupByValueBar[4],
	    	            	 title: groupByBarArray[4],
	    	            	 axis: 'bottom',
	    	            	 highlight: true,
	    	            	 showInLegend: true,
	    	            	 shadow: true,
	    	            	 animate: { duration: ReplayAnalytics.app.animateSpeed, delay: ReplayAnalytics.app.animateSpeed/2, easing: 'ease' },
	    	            	 style: {
	    	            		 //fill: "#ff8809",
	    	            		 stroke: "#ff8809",
	    	            		 fillOpacity: 0,
	    	            		 lineWidth: 3,
	    	            		 smooth: true,
	    	            	 },
	    	            	  subStyle: {
	    	                      fill: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
	    	                  },

	    	            	 marker: {
	    	                     type: 'circle',
	    	                     radius: 4,
	    	                     lineWidth: 3
	    	                 }
		    	           },
   	    	           ]
		});	
	},
});