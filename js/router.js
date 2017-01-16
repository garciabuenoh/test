// Router is responsible for driving the application. Usually
// this means populating the necessary data into models and
// collections, and then passing those to be displayed by
// appropriate views.
	var Router = Backbone.Router.extend({
	  routes: {
		'': 'index'  // At first we display the index route
	  },

	  index: function() {	
		
		var cartoHeader = new CartoHeader();		
		cartoHeader.fetch();		

		// Pass the collection of rows to the view
		var headerView = new CartoHeaderView({model: cartoHeader});
		// And render it
		headerView.render();		
		
		
		var cartoTable = new CartoTable();		
		cartoTable.fetch();

		// Pass the collection of rows to the view
		var tableView = new CartoTableView({collection: cartoTable});
		// And render it
		tableView.render();		
		
	  }
	});

	jQuery(document).ready(function() {
	  // When the document is ready we instantiate the router
	  var router = new Router();

	  // And tell Backbone to start routing
	  Backbone.history.start();
	});