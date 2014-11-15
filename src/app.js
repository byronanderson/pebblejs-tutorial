var UI = require('ui');
var ajax = require('ajax');
var _ = require('underscore');
var jQuery = require('jquery');
var $ = jQuery;
var Backbone = require('backbone');


var urlError = function() {
  throw new Error('A "url" property or function must be specified');
};

var methodMap = {
  'create': 'POST',
  'update': 'PUT',
  'patch':  'PATCH',
  'delete': 'DELETE',
  'read':   'GET'
};

console.log("$.Deferred", $.Deferred);

Backbone.sync = function(method, model, options) {
  var type = methodMap[method];

  // Default options, unless specified.
  if (!options) {
    options = {};
  }

  // Default JSON-request options.
  var params = {method: type, type: 'json'};

  // Ensure that we have a URL.
  if (!options.url) {
    params.url = _.result(model, 'url') || urlError();
  }

  // Ensure that we have the appropriate request data.
  if (options.data === null && model && (method === 'create' || method === 'update' || method === 'patch')) {
    params.data = options.attrs || model.toJSON(options);
  }

  // Make the request, allowing the user to override any Ajax options.
  params = _.extend(params, options);
  var xhr = options.xhr = ajax(params, params.success, params.error);
  model.trigger('request', model, xhr, options);
  return xhr;
};

var MealPlan = Backbone.Model.extend({
  url: "http://ip.jsontest.com/"
});

var mealPlan = new MealPlan({id: 1});
console.log("fetch", mealPlan.fetch);
mealPlan.fetch().then(function() {
console.log(mealPlan.get('ip'));
});


// Create a Card with title and subtitle
var card = new UI.Card({
  title: 'Grocery List',
  subtitle: 'Fetching...'
});

// Display the Card
card.show();

// // Construct URL
// var mealPlanId = 1;
// var mealPlanURL = 'http://food.programmingsimplicity.com/meal_plans/' + mealPlanId;

// // Make the request
// ajax(
//   {
//     url: mealPlanURL,
//     type: 'json'
//   },
//   function(data) {
//     // Success!
//     console.log("Successfully fetched weather data!");

//     // Extract data
//     var location = data.name;
//     var temperature = Math.round(data.main.temp - 273.15) + "C";

//     // Always upper-case first letter of description
//     var description = data.weather[0].description;
//     description = description.charAt(0).toUpperCase() + description.substring(1);

//     // Show to user
//     card.subtitle(location + ", " + temperature);
//     card.body(description);
//   },
//   function(error) {
//     // Failure!
//     console.log('Failed fetching weather data: ' + error);
//   }
// );
