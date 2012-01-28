

(function() {

	var disposable = {};
		


	disposable.create = function() {
		
		var self = {},
		disposables = [];


		self.add = function(disposable) {

			if(typeof disposable == 'function') {
				
				var disposableFunc = disposable;

				disposable = {
					dispose: disposableFunc
				};
			}

			disposables.push(disposable);
			return disposable;
		};

		self.addTimeout = function(timerId) {
			return self.add({
				dispose: function() {
					clearTimeout(timerId);
				}
			});
		};

		self.addInterval = function(timerId) {
			return self.add({
				dispose: function() {
					clearInterval(timerId);
				}
			});
		};



		self.dispose = function() {
			
			for(var i = disposables.length; i--;) {
				disposables[i].dispose();
			}

			disposables = [];
		};

		return self;
	}



	if(typeof module != 'undefined') {
		module.exports = disposable;
	}

	if(typeof window != 'undefined') {
		window.disposable = disposable;
	}


})();
