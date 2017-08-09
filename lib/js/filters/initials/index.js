// Filter part of text wanted
export default function(){
	return function(text, first, second){
		return (!!text) ? text.substring(first,second) : '';
	}
}