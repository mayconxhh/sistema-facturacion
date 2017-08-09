// Import of filters
import capitalizeFilter from './capitalize'
import initialsFilter from './initials'
import shortMessageFilter from './shortMessage'

export default function(){
	var app = angular.module('facturacionApp');

	// Filter personalizated of aplication
	app.filter('capitalize', capitalizeFilter)
	app.filter('initials', initialsFilter)
	app.filter('shortMessage', shortMessageFilter)
}