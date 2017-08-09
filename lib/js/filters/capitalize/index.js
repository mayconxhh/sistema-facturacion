// Filter Capitalize
export default function(){
	return function(text) {
		return (!!text) ? text.charAt(0).toUpperCase() + text.substr(1).toLowerCase() : '';
	}
}