//base model
var CartoRow = Backbone.Model.extend({  
  validate: function(attributes) {    
    // All validations passed, don't return anything
  }
});

// Model for the header
var CartoHeader = Backbone.Model.extend({  
	
	url: 'https://$userName$.carto.com/api/v1/sql?q=select%20*%20from%20$tableName$%20limit%201',

	initialize: function(options) {
		this.userName = 'documentation';
		this.tableName = 'buildings_1854';		
		if(options!=null){
			if(options.userName!=null){
				this.userName = options.userName;				
			}
			
			if(options.tableName!=null){
				this.tableName = options.tableName;				
			}			
		}
		this.url = this.url.replace('$userName$', this.userName);
		this.url = this.url.replace('$tableName$', this.tableName);		
	  },  
  
	parse: function(data) {
		return data.fields;
	},
  
	validate: function(attributes) {    
		// All validations passed, don't return anything
	}
});

// CartoTable collection
var CartoTable = Backbone.Collection.extend({	
  
  
	url: 'https://$userName$.carto.com/api/v1/sql?q=select%20*%20from%20$tableName$%20limit%2025%20offset%20$offset$',
	model: CartoRow, 

	initialize: function(options) {
		this.userName = 'documentation';
		this.tableName = 'buildings_1854';
		this.offset = 0;
		if(options!=null){
			if(options.userName!=null){
				this.userName = options.userName;				
			}
			
			if(options.tableName!=null){
				this.tableName = options.tableName;				
			}
			
			if(options.offset!=null){
				this.offset = options.offset;				
			}
		}
		this.url = this.url.replace('$userName$', this.userName);
		this.url = this.url.replace('$tableName$', this.tableName);
		this.url = this.url.replace('$offset$', this.offset);
	  },  
  
  parse: function(data) {
    return data.rows;
  } 
  
});