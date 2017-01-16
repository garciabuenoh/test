// Router is responsible for driving the application. Usually
// this means populating the necessary data into models and
// collections, and then passing those to be displayed by
// appropriate views.
	var Router = Backbone.Router.extend({
	  routes: {
		'': 'index'  // At first we display the index route
	  },

	  index: function() {	
		
		//var vent = _.extend({}, Backbone.Events);	
		
		var cartoTable = new CartoTable();		
		cartoTable.fetch();

		// Pass the collection of rows to the view
		var view = new CartoTableView({collection: cartoTable});
		// And render it
		view.render();		
		
	  }
	});

	jQuery(document).ready(function() {
	  // When the document is ready we instantiate the router
	  var router = new Router();

	  // And tell Backbone to start routing
	  Backbone.history.start();
	});