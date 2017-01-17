	
	//View responsible for rendering the table header
	var CartoHeaderView = Backbone.View.extend({
	  
	  
	  tagName: 'tr',

	  initialize: function(options) {
		  this.model = options.model;
		
		_.bindAll(this, 'render');	
		this.model.bind('change', this.render);
	  },

	  render: function() {		

		
		// Write the table columns		
		_.each(this.model.attributes, function(item, index, items){
			if(index!= 'the_geom' && index!= 'the_geom_webmercator'){
				jQuery(this.el).append(jQuery('<td><strong>' + index + '</strong></td>'));
			}		  
		},this);
		
		
		return this;
	  }
	});	


	//View responsible for rendering the table rows
	var CartoRowView = Backbone.View.extend({
		
	  tagName: 'tr',

	  initialize: function(options) {
		
		_.bindAll(this, 'render');

		// If the model changes we need to re-render
		this.model.bind('change', this.render);		
	  },

	  render: function() {		
		// Write the table columns		
		_.each(this.model.attributes, function(item, index, items){
			if(index!= 'the_geom' && index!= 'the_geom_webmercator'){
				jQuery(this.el).append(jQuery('<td>' + this.model.get(index) + '</td>'));
			}		  
		},this);
		
		return this;
	  }
	});
	

	//View responsible for rendering the whole table
	var CartoTableView = Backbone.View.extend({
		// The collection will be kept here
		collection: null,
		offset: 0,		
		el: '#tableToComplete',

		
		initialize: function(options) {
			this.collection = options.collection;
			this.offset = 0;		

			// Ensure our methods keep the `this` reference to the view itself
			_.bindAll(this, 'render');	

			// Bind collection changes to re-rendering
			this.collection.bind('reset', this.render);
			this.collection.bind('add', this.render);
			this.collection.bind('remove', this.render);		
			
			//options.vent.bind("moveNext", this.moveNext);
		
		},

		render: function() {			
			
			var headerElement = $('#headerToComplete');
			var bodyElement = $('#bodyToComplete');
			// Clear potential old entries first
			headerElement.empty();
			bodyElement.empty();
			
			var index=0;
			// Go through the collection items
			this.collection.forEach(function(item) {
				
				if(index==0)
				{					
					var itemView = new CartoHeaderView({
						model: item
					});
					headerElement.append(itemView.render().el);									
				}
					
				var itemView = new CartoRowView({
					model: item
				});
				bodyElement.append(itemView.render().el);				
				
				index++;
			});		

			waitingDialog.hide();
			
			return this;
		} 
	});
	
	//View that represent the Application. This View acts as a controller that handles events and form inputs
	var AppView = Backbone.View.extend({		
		
		tableView: null,
		offset: 0,

		
		el: '#tableViewerApp', 


		events: {
			"click #prev_btn": "prevBtnClicked",
			"click #next_btn": "nextBtnClicked",
			"click #load_btn": "loadBtnClicked"
		  },  
	  
		initialize: function(options) {
			
			this.tableView = options.tableView;			
			this.offset = 0;		
			
			_.bindAll(this, 'render','prevBtnClicked','nextBtnClicked','loadBtnClicked');			
		
		},

		render: function() {						
			
			this.tableView.render();
			waitingDialog.hide();
			return this;
		},	
		
		prevBtnClicked: function(){
			if(this.offset>=25){
				this.offset-=25;					
			
				var arguments = [];
				arguments['offset'] = this.offset;
				arguments['userName'] = this.tableView.collection.userName;
				arguments['tableName'] = this.tableView.collection.tableName;		  
				
				var newCartoTable = new CartoTable(arguments);		
				
				this.tableView.collection = newCartoTable;
				
				waitingDialog.show();
				this.tableView.collection.fetch(
					{success: this.tableView.render,
					error: this.navigationErrorHandler}
				);
			}
			
		},
		nextBtnClicked: function(){
			
			this.offset+=25;
			var arguments = [];
			arguments['offset'] = this.offset;
			arguments['userName'] = this.tableView.collection.userName;
			arguments['tableName'] = this.tableView.collection.tableName;		  
			
			var newCartoTable = new CartoTable(arguments);
			this.tableView.collection = newCartoTable;
			waitingDialog.show();
			this.tableView.collection.fetch(
				{
					success: this.tableView.render,				
					error: this.navigationErrorHandler,				
					complete: waitingDialog.hide
				}
			);
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
			this.tableView.collection = newCartoTable;
			waitingDialog.show();
			this.tableView.collection.fetch(
				{
					success: this.tableView.render,				
					error: this.loadErrorHandler,				
					complete: waitingDialog.hide
				}
			);		
			
		},
		
		successHandler: function() {
			bootstrap_alert.warning('Dataset loaded successfully', 'success', 5000);
			this.render();
		},
		
		loadErrorHandler: function(){
			
			bootstrap_alert.warning('Failed to load dataset. Recovered dataset by default', 'danger', 5000);						
			location.href = "";			
		},
		
		navigationErrorHandler: function() {
			bootstrap_alert.warning('Failed to navigate to the page', 'danger', 5000);						
		}
 
	});