Ext.define("SenchaCon2013Demo.store.UserSettings3", {
	extend : 'Ext.data.Store',
	requires: ['SenchaCon2013Demo.model.UserSettings'],
	config: {
		model: 'SenchaCon2013Demo.model.UserSettings',
		proxy: {
			type: 'localstorage',
			id: 'usersettings3'
		}
	}
})