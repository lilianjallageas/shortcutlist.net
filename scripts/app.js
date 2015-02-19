
/**
 * Infos
 * ==============
 * Unicode values:
 * ⌘ => &#8984;
 * ⌥ => &#8997;
 * ⇧ => &#8679;
 * ⇥ => &#8677;
 * left arrow  => &#8592;
 * up arrow    => &#8593;
 * right arrow => &#8594;
 * down arrow  => &#8595;
 */

/**
 * App Module 
 */
var app = angular.module('app', []);


/**
 * Running the Application 
 */
// app.run(function ($shortcuts) { });
	

/**
 * Controller
 */
app.controller('shortcutsController', function($scope,$http) {

	// Loading the shortcuts from the JSON file
	$http.get("json/shortcuts.json").success(function(data) {
		$scope.shortcuts = data.shortcuts
		console.log($scope.shortcuts);
	});
});


/**
 * Filter 
 */
app.filter('unsafe', function($sce) {
	return function(val) {
		return $sce.trustAsHtml(val);
	};
});