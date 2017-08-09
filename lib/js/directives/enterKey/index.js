export default function(){
	return function(scope, element, attrs){
		element.bind("keydown keypress", function(ev){
			if (ev.which === 13) {
				scope.$apply(function(){
					scope.$eval(attrs.enterKey);
				});

				ev.preventDefault();
			}
		});
	};
};