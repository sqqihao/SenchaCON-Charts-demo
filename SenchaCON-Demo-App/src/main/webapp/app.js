Ext.Loader.setConfig({enabled:true});
Ext.application({
	name : 'SenchaCon2013Demo',
	stores : ['GlobalSettingsStore','UserSettings1','UserSettings2','UserSettings3','UserSettings4','TempStore'],
	controllers: ['DatabaseTable', 'Pie','LineBar','Scatter','VerticalBar','HorizontalBar', 'Main', 'Init', 'GlobalSync', 'Playback', 'Settings','Radar', 'AreaBar', 'Gauge'],
	views: ['Main', 'SettingsPanel','GlobalSettingsPanel', 'AddChartPanel1', 'AddChartPanel2', 'AddChartPanel3', 'AddChartPanel4', 'Panel1', 'Panel2', 'Panel3', 'Panel4'],
    launch : function() {
    	this.creatingGraphs = false;
    	
    	this.panelSettings = new Array();
    	this.panelData = new Array();
    	this.CachedDatabaseTables = new Array();
    	
    	this.GranularityFieldStore = undefined;
    	this.DatabaseTableFieldStore = undefined;
    	
    	this.EmptyFieldStore = [{text: 'None Defined', value: 'none'}];
    	this.PanelDataFieldStore = new Array();
    	this.PanelCategoryFieldStore = new Array();
    	this.PanelCategoryFieldStoreWithTime = new Array();
    	
    	this.databaseSetting = new Array();
		this.Panels = new Array();
		this.charts = new Array();
		this.fullStores = new Array();
		this.instanceStores = new Array();
		this.sliders = new Array();
		this.loadIndex = 1;		
		this.isChartConfigured = new Array();
		for (i = 0; i < 5; i++){
			this.isChartConfigured[i] = false;
		}		
		this.groupByBarLabels =  new Array();

		//Slider fine granularity
		this.differentialMultiplier = new Array();
		for(i = 0; i < 6; i++) {
			this.differentialMultiplier[i] = 1;
		}
		
		this.startDate = new Array(); //Static start date, stays consistent as start date of range
		this.currentDate = new Array(); //Dynamic date that increments through each time step in ajax requests
		this.currentStartDate = new Array(); //Dynamic start date for global sync, changes as global synchronization arrays are generated.
		this.currentEndDate = new Array(); //Static end date, stays consistent as end date of range
		this.dateSet = new Array(); //Boolean for if date has been set for specific panel.
		this.globalDateArray = new Array(); //Array for storing date data type of chart date range
		//Initialize dateSet:
		for(i = 0; i < 6; i++) {
			this.dateSet[i] = false;
		}

		this.chartCreated = new Array(); //Boolean array for if chart has been created.
		this.newChart = new Array(); //Array for actual charts
		this.lastPlaybackAction = undefined;

		//User Selected Setting Arrays (Used for managing settings panel values and for storing selected settings)
		this.granularities = new Array();
		this.valueGranularities = new Array(); //Numeric value for granularities: Hourly = 1, Daily = 2, Weekly = 3, Monthly = 4
		this.chartTypes = new Array();
		this.xs = new Array(); //X axis
		this.ys = new Array(); //Y axis
		this.groupBys = new Array();
		this.graphTitle = new Array();
		this.numberActivePanels = '4'; // SEtting for how many panels are currently displayed on the app
		
		this.dataFieldValues = new Array();
		this.categoryFieldValues = new Array();

		this.playbackTasks = new Array();
		//Other internal working variables(Slider positions)
		this.waitvariables = new Array();
		this.currentPositions = new Array();
		this.minimumPositions = new Array();
		this.maximumPositions = new Array();

		// Single Global Setting Non Array Variables
		this.currentActivePanelIndex = 1; //Keeps track of which panel is currently selected/tapped
		this.playSpeed = 500; //Value for speed of playing charts
		this.graphMaxValueMargin = .10;
		this.animateSpeed = this.playSpeed - 100;

		// Global Sync arrays and settings:
		this.globalStartDate; //Start date for global sync
		this.globalEndDate; //End date for global sync
		this.firstGlobalDate; //Boolean, keeps track of if global sync iteration is for the first chart
		this.chartIsRunning = new Array(); //Boolean for if chart is running
		this.chartIsPaused = new Array(); //Boolean for if chart is paused
		this.globalSyncPressed = false; //Boolean for global sync mode
		this.nullSearchReturnedTrue = false; //boolean for if search through next date returned a chart
		this.globalSliderValue; // Value for global slider position
		this.finishCall; //Boolean for if search was called from a chart that just finished its date range
		this.chartSection = new Array(); //parallel array to chart lengths array, stores the chart numbers associated to its length of time steps
		this.chartLengths = new Array(); //parallel array to chart section array, stores the length of time steps associated with the running chart numbers
		//initialize chart lengths:
		for(i = 0; i < 20; i++) {
			this.chartLengths[i] = 0;
		}
		this.globalindex = 0; //Keeps track of the index of the chartsection and chartlengths current index
		this.chartsFinished = 0; //Keeps track of the number of finished charts during synchronization
		this.numberActiveCharts = 0; //Keeps track of the number of charts on the screen (always 4)
		this.chartValue = new Array(); //Keeps track of value read by jsonstore
		this.chartFinished = new Array(); //Boolean for if chart is finished during synchronization
		for(i = 0; i < 6; i++) {
			this.chartFinished[i] = false;
		}	
		this.initialPosition = new Array(); //Boolean if chart is in initial position during synchronization
		//Initialize initialposition array:
		for(i = 0; i < 6; i++) {
			this.initialPosition[i] = true; //Initialized as true
		}
		//Initialize chartisRunning array:
		for(i = 1; i < 6; i++) {
			this.chartIsRunning[i] = false;
		};
		this.globalSyncChartPositions = new Array();
		for(i = 1; i < 6; i++) {
			this.globalSyncChartPositions[i] = new Array();
		};
		//arrays for fixing order:

		//this.groupByValueBar = new Array();
		this.groupByValueBar = ["groupByBar1", "groupByBar2", "groupByBar3", "groupByBar4", "Other"];
		this.fixOrder = new Array(); //String that is passed to servlet, fixes order of 1st dimension category field

		//max axes arrays:
		this.Xmax = new Array(); //Max value for x axis
		this.Ymax = new Array(); //Max value for y axis
		this.XmaxReceived = new Array(); //Boolean for if x max data is received
		this.YmaxReceived = new Array(); //Boolean for if y max data is received
		
		this.setDefaultValues = function(){
			for(i = 0; i < 6; i++) {
				this.databaseSetting[i] = 'demo_data';
				this.granularities[i] = 'Daily';
				this.valueGranularities[i] = 2;
				this.chartTypes[i] = 'pie';
				this.xs[i] = 'none';
				this.ys[i] = 'none';
				this.chartCreated[i] = false;
				this.startDate[i] = new Date();
				this.startDate[i].setHours(0,0,0,0);
				this.startDate[i].setFullYear(this.startDate[i].getFullYear() - 2);
				this.startDate[i].setDate(this.startDate[i].getDate() - 3);
				this.currentEndDate[i] = new Date();
				this.currentEndDate[i].setHours(0,0,0,0);
				this.currentEndDate[i].setFullYear(this.currentEndDate[i].getFullYear() - 2);
				this.graphTitle[i] = 'Title';
				this.XmaxReceived[i] = false;
				this.YmaxReceived[i] = false;
			}
			this.jsonstore = new Array(); 
			this.numberActivePanels = '4';
			this.currentActivePanelIndex = 1;
			this.playSpeed = 3200;
	    	this.dataFieldValues = new Array();
			this.categoryFieldValues = new Array();
	    	
	    	// Panel 1
	    	this.granularities[1] = 'Daily';
			this.valueGranularities[1] = 2;
			this.chartTypes[1] = 'pie';
			this.xs[1] = 'data_4';
			this.ys[1] = 'none';
			this.groupBys[1] = 'category_b';
			this.startDate[1] = new Date('2011-02-01');
			this.currentEndDate[1] = new Date('2011-02-20');

			// Panel 2
			this.granularities[2] = 'Daily';
			this.valueGranularities[2] = 2;
			this.chartTypes[2] = 'verticalbar';
			this.xs[2] = 'date';
			this.ys[2] = 'data_1';
			this.groupBys[2] = 'category_b';
			this.startDate[2] = new Date('2011-02-01');
			this.currentEndDate[2] = new Date('2011-02-20');
			
			// Panel 3
			this.granularities[3] = 'Daily';
			this.valueGranularities[3] = 2;
			this.chartTypes[3] = 'scatter';
			this.xs[3] = 'data_3';
			this.ys[3] = 'data_4';
			this.groupBys[3] = 'none';
			this.startDate[3] = new Date('2011-02-01');
			this.currentEndDate[3] = new Date('2011-02-20');
			
			// Panel 4
			this.granularities[4] = 'Daily';
			this.valueGranularities[4] = 2;
			this.chartTypes[4] = 'line';
			this.xs[4] = 'category_b';
			this.ys[4] = 'data_1';
			this.groupBys[4] = 'category_d';
			this.startDate[4] = new Date('2011-02-01');
			this.currentEndDate[4] = new Date('2011-02-20');
		};
		this.setDefaultValues();
		
		//Load views:
		Ext.get('loading').setVisible(false);
		
		Ext.Viewport.add({
    	   	xtype: 'senchademomain'
    	});	
		
		Ext.Viewport.add({
			xtype: 'settingspanel'
		});
		Ext.Viewport.add({
			xtype: 'globalsettingspanel'
		});
    	
    	for (i = 0; i < 6; i++){
			this.sliders[i] = Ext.ComponentQuery.query('slider'+i)[0];
		}
	}
});