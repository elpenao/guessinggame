/* **** Guessing Game Functions **** */
// Generate the Winning Number and other variables
// var game = new initiateGame();
// InitiateGame.prototype.playersGuesssubmission
// (function(){})() IIFE
var InitiateGame = function(){
	this.winningNumber = Math.floor((Math.random() * 100) + 1);
	this.totalGuesses = 0;
	this.guessList = [];
	this.guess = 0;
	console.log('game initiated');
	// Fetch the Players Guess
	return;
}

var game = new InitiateGame();


InitiateGame.prototype.playersGuessSubmission = function(){
	console.log('playersGuessSubmission ran');
	// hide all alerts
	$('.alert').hide();
	// do they have guesses remaining?
	if (this.totalGuesses < 5) {
		// get the input value
		this.guess = $('#guess').val();
		// if its a valid guess
		console.log('guess = ' + this.guess);
		if (this.guess > 0 && this.guess < 101) {
			console.log('valid');
			// if the number has already been guessed
			if ($.inArray(this.guess, this.guessList) > -1) {
				$('#silly').show();
			} else {
				// store the new guess in the array
				this.guessList.push(this.guess);
				$('.panel-footer').text(this.guessList.join(','));
				//check if its right
				this.checkGuess(this.guess);
				//calculate the total guesses update badge
				this.totalGuesses++;
				$('.badge').text(5 - this.totalGuesses);
				//set the width of the progress bar
				var width = '';
				percent = this.totalGuesses/5 * 100;
				width = 100 - percent + '%';
				$('.progress-bar').width(width);
				if (this.totalGuesses === 5){
					$('#runout').show();
				}
			}
		} else	{
			console.log("its a badguess");
			$('#badguess').show();
		}		
	} else {
		$('#runout').show();
	}
	console.log(game);
};

// Check if the Player's Guess is the winning number 

InitiateGame.prototype.checkGuess = function (num){
	// add code here
	console.log('checkGuess ran');
	if (num == this.winningNumber) {
		// load the giff
		$('.modal-body').html('<iframe src="http://giphy.com/embed/xNBcChLQt7s9a" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>');
		$("#myModal").modal({
			// dont let users click or key off modal
		});
	} else {
		this.lowerOrHigher(num);
	}
};
// Allow the "Player" to Play Again

InitiateGame.prototype.showHint = function (){
	$('#answer').text(game.winningNumber);
	$('#hintBox').show();
};
// Determine if the next guess should be a lower or higher number

InitiateGame.prototype.lowerOrHigher = function (num){
	// add code here
	console.log('lowerOrHigher ran');
	var diff = this.winningNumber - num;
	var absDiff = Math.abs(this.winningNumber - num);
	// if winning number is higher
	if ( diff > 0) {
		if (absDiff > 20) {
			$('#higher').text('Nope its higher by a lot');
		} else {
			$('#higher').text('Nope its higher by a lil');
		}
		$('#higher').show();
	} else {
		if (absDiff > 20) {
			$('#lower').text('Nope its lower by a lot');
		} else {
			$('#lower').text('Nope its lower by a lil');
		}
		$('#lower').show();
	}
	$('#guess').val('');
};

InitiateGame.prototype.playAgain = function (){
	// simply refresh the page
	// location.reload();
	// or reset everything
	console.log('playAgain ran');
	console.log(game);
	game.winningNumber = Math.floor((Math.random() * 100) + 1);
	game.totalGuesses = 0;
	game.guessList = [];
	game.guess = 0;
	console.log(game);
	$('.alert').hide();
	$('.progress-bar').width('100%');
	$('.badge').text(5);
	$('.panel-footer').text('');
	$('#guess').val('');
	$('#myModal').modal('hide');
	$('.modal-body').html('');
}

/* **** Event Listeners/Handlers ****  */
   	// listen for a button click
    $( '#go' ).on( 'click', game.playersGuessSubmission );

	// show the hint
	$( '#hint-btn' ).on( 'click', game.showHint );

	// listen for the enter key
	$( 'input' ).on('keyup',function( event ) {
		if ( event.which == 13 ) {
			console.log('enter key');
		    game.playersGuessSubmission();
		}
	});
   	$( '#play-again' ).on( 'click', game.playAgain );
   	$( '#restart' ).on( 'click', game.playAgain  );
	

// reset the game from restart link or play again button

