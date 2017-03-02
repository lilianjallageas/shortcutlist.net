
/**
 * ============================
 * ========== Infos ===========
 * ============================
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
 * ============================
 */
var app = angular.module('app', ['ngRoute','pascalprecht.translate']);


/**
 * Controller
 * ============================
 */
app.controller('shortcutsController', function($scope,$http,$location,$anchorScroll,$translate) {

	// Loading the shortcuts from the JSON file
	$http.get("app/json/shortcuts.json").success(function(data) {
		$scope.shortcuts = data.shortcuts;
	});

	// Function that enables the change of language
	$scope.changeLanguage = function(langKey) {
		$translate.use(langKey);
	};

	// Function that allows the navigation to anchors in the page
	$scope.gotoAnchor = function(anchor) {
		$location.hash(anchor);
		$anchorScroll.yOffset = 65; // offset for the nav-bar
		$anchorScroll();
	};

});


/**
 * Routes
 * ============================
 */
app.config(function($routeProvider) {
	$routeProvider
	// route for the home page
	.when('/', {
		templateUrl : 'app/templates/shortcuts.tpl.html',
		controller  : 'shortcutsController'
	})
});


/**
 * Directives
 * ============================
 */
app.directive('shortcutArray', function() {
	return {
		restrict: "E",
		replace: true,
		templateUrl: 'app/templates/shortcut-array.tpl.html',
		scope: {
			shortcuts:  "=shortcuts",
			title:      "@title",
			os:         "@os",
			use:        "@use"
		},
		link: function (scope, element, attrs) {}
	};
});


/**
 * Filter 
 * ============================
 */
app.filter('unsafe', function($sce) {
	return function(val) {
		// Used to replace the unicode value of special characters 
		// by the special characters themselves 
		return $sce.trustAsHtml(val);
	};
});


/**
 * Configuration of Translate 
 * ============================
 */
app.config(['$translateProvider', function ($translateProvider) {
	$translateProvider.useStaticFilesLoader({
		prefix: 'app/json/lang/locale-',
		suffix: '.json'
	});
	$translateProvider.preferredLanguage('en');
}]);
