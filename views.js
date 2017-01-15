	// Views are responsible for rendering stuff on the screen (well,
	// into the DOM).
	//
	// Typically views are instantiated for a model or a collection,
	// and they watch for change events in those in order to automatically
	// update the data shown on the screen.
	
	var headerView = Backbone.View.extend({
	  // Each row will be shown as a table row
	  tagName: 'tr',

	  initialize: function(options) {
		// Ensure our methods keep the `this` reference to the view itself
		_.bindAll(this, 'render');

		// If the model changes we need to re-render
		this.model.bind('change', this.render);
	  },

	  render: function() {
		// Clear existing row data if needed
		jQuery(this.el).empty();

		// Write the table columns		
		_.each(this.model.attributes, function(item, index, items){
			if(!index.contains('the_geom')){
				jQuery(this.el).append(jQuery('<td>' + index + '</td>'));
			}		  
		},this);
		

		return this;
	  }
	});


	var CartoRowView = Backbone.View.extend({
	  // Each row will be shown as a table row
	  tagName: 'tr',

	  initialize: function(options) {
		// Ensure our methods keep the `this` reference to the view itself
		_.bindAll(this, 'render');

		// If the model changes we need to re-render
		this.model.bind('change', this.render);
	  },

	  render: function() {
		// Clear existing row data if needed
		jQuery(this.el).empty();

		// Write the table columns
		
		_.each(this.model.attributes, function(item, index, items){
			if(index!= 'the_geom' && index!= 'the_geom_webmercator'){
				jQuery(this.el).append(jQuery('<td>' + this.model.get(index) + '</td>'));
			}		  
		},this);
		//jQuery(this.el).append(jQuery('<td>' + this.model.get('cartodb_id') + '</td>'));
		//jQuery(this.el).append(jQuery('<td>' + this.model.get('street') + '</td>'));
		//jQuery(this.el).append(jQuery('<td>' + this.model.get('comment') + '</td>'));

		return this;
	  }
	});

	var CartoTableView = Backbone.View.extend({
	// The collection will be kept here
	collection: null,
	offset: 0,

	// The people list view is attached to the table body
	el: '#tableViewerApp', 


	events: {
		"click .prev_btn": "prevBtnClicked",
		"click .next_btn": "nextBtnClicked",
		"click #load_btn": "loadBtnClicked"
	  },  
  
	initialize: function(options) {
		this.collection = options.collection;
		this.offset = 0;		

		// Ensure our methods keep the `this` reference to the view itself
		_.bindAll(this, 'render','prevBtnClicked','nextBtnClicked','loadBtnClicked');	

		// Bind collection changes to re-rendering
		this.collection.bind('reset', this.render);
		this.collection.bind('add', this.render);
		this.collection.bind('remove', this.render);		
		
		//options.vent.bind("moveNext", this.moveNext);
	
	},

	render: function() {
		var headerElement = $('#headerToComplete');
		
		var element = $('#bodyToComplete');
		// Clear potential old entries first
		element.empty();

		// Go through the collection items
		this.collection.forEach(function(item) {

			// Instantiate a CartoRow view for each
			var itemView = new CartoRowView({
				model: item
			});

			// Render the CartoTable, and append its element
			// to the table
			element.append(itemView.render().el);
		});		

		return this;
	},	
	
	
	prevBtnClicked: function(){
		if(this.offset>=25){
			this.offset-=25;			
		}
		
		var arguments = [];
		arguments['offset'] = this.offset;
		arguments['userName'] = this.collection.userName;
		arguments['tableName'] = this.collection.tableName;		  
		
		var newCartoTable = new CartoTable(arguments);		
		
		this.collection = newCartoTable;
		this.collection = newCartoTable;
		this.collection.fetch({success: this.render});	
		
	},
	nextBtnClicked: function(){
		
		this.offset+=25;
		var arguments = [];
		arguments['offset'] = this.offset;
		arguments['userName'] = this.collection.userName;
		arguments['tableName'] = this.collection.tableName;		  
		
		var newCartoTable = new CartoTable(arguments);
		this.collection = newCartoTable;
		this.collection.fetch({success: this.render});		
	},
  
	loadBtnClicked: function(){
		var userName = $("#userName_in").val();
		var tableName = $("#tableName_in").val();

		var arguments = [];
	 
		if(userName.length>0){
			arguments['userName'] = userName;		  
		}
		if(tableName.length>0){
			arguments['tableName'] = tableName;		  
		}

		this.offset = 0;
		var newCartoTable = new CartoTable(arguments);				
		this.collection = newCartoTable;
		this.collection.fetch({success: this.render});
	}
 
});