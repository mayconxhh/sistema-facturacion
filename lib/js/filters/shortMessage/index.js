// Filter of letter wanted
export default function(){
	return function(message, number){
		return (!!message) ? message.substring(0, number)+'...': '';
	}
}