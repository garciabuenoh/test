	// Router is responsible for driving the application. Usually
	// this means populating the necessary data into models and
	// collections, and then passing those to be displayed by
	// appropriate views.
	var Router = Backbone.Router.extend({
	  routes: {
		'': 'index'  // At first we display the index route
	  },

	  index: function() {		
		
		waitingDialog.show();
		
		var cartoTable = new CartoTable();		
		cartoTable.fetch();
		
		var tableView = new CartoTableView({collection: cartoTable});		
		
		var appView = new AppView({tableView: tableView});
		appView.render();
		
	  }
	});

	jQuery(document).ready(function() {
	  // When the document is ready we instantiate the router
	  var router = new Router();

	  // And tell Backbone to start routing
	  Backbone.history.start();
	});