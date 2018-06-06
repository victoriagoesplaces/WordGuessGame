//Variables
//----------------------------

// array of possible movie selections- words to be guess
var movies = ["pocahontas", "mulan", "tangled", "frozen", "maleficent", "tarzan", "brave", "aladdin", "moana", "pinocchio", "hercules", 
"zootopia", "bambi", "cinderella", "fantasia", "dumbo", "bolt", "coco", "cars", "atlantis"];
// randomly selected word
var selectedMovie = ""; 
// number of letters in selected word
var lettersInWord = [];
// number of blanks for selected word-use document.getElementById("")
var numberOfBlanks = 0;
// blanks plus correctly guessed letters
var partiallySolved =[];
// incorrrect guesses
var wrongGuesses = [];

// counters- (use document.getElementById("")
var winCount = 0;
var loseCount = 0;
var guessesLeft = 12;
var correct = 0;

// functions
//-------------

// function to set up the game

//function functionName(parameters) {
	//code to be executed} 
	
function startGame()
{
	// use Math.floor(Math.random() - to make random selection of movie from movies array
	selectedMovie = movies[Math.floor(Math.random() * movies.length)];
	console.log(selectedMovie);
    
	// selected word is split into letters
	lettersInWord = selectedMovie.split("");
	console.log(lettersInWord);
    
	// number of blanks is determined
	numberOfBlanks = lettersInWord.length;

	//create a for loop to run through each letter of the seleted movie  (numberOfBlanks)
	for(var i = 0; i< numberOfBlanks; i++)
	{
		partiallySolved.push("_");
		document.getElementById("movieToGuess").innerHTML = partiallySolved;
	}
	
	// setting letters that can be used when guessing the movie
	
	letters = ["a","b","c",
					  "d","e","f",
					  "g","h","i",
					  "j","k","l",
					  "m","n","o",
					  "p","q","r",
					  "s","t","u",
					  "v","w","x",
					  "y","z"];
	
	// once variables are define updates the ids on HTML 
	document.getElementById("movieToGuess").innerHTML = partiallySolved.join(" ");
	document.getElementById("numberOfGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = loseCount;
	document.getElementById("wrongGuesses").innerHTML = wrongGuesses;
}

// function to compare letters from user to letters to be guess
//funtio =nameOfFunction(parameters)    parameters- names listed in the function definition
function compareLetters(guess)
{
				// if the letter selected is in the word 
				if(lettersInWord.indexOf(guess) > -1)
				{
					// loops one by one on the number of blanks letter
					for(var i = 0; i < numberOfBlanks; i++)
					{
						// puts letter into corresponding index of the array
						if(lettersInWord[i] === guess)
						{
							correct++;
							partiallySolved[i] = guess;
							document.getElementById("movieToGuess").innerHTML = partiallySolved.join(" ");
						}	
					}
				}
				// incorrect guesses
				else
				{
					wrongGuesses.push(guess);
					guessesLeft--;
					// updates the HTML
					document.getElementById("numberOfGuesses").innerHTML = guessesLeft;
					document.getElementById("wrongGuesses").innerHTML = wrongGuesses;
                }
			
			
		
}

// determine a win or loss
function winLose()
{
	// When number blanks if filled with right words then you win
	if(correct === numberOfBlanks)
	{
		//Counts Wins +1
		winCount++;
		//Changes HTML
		document.getElementById("winCounter").innerHTML = winCount;
		alert("You Win");
		
	}
	// When number of Guesses reaches 0 then You lose
	else if(guessesLeft === 0)
	{
		//Counts losses
		loseCount++;
		//Changes HTML
		document.getElementById("lossCounter").innerHTML = loseCount;
		alert("You Lose");
		
	}
}

// when the play again button is clicked the reset function sets up a new game
$("#resetButton").on("click", function reset()
{
	
	selectedMovie = movies[Math.floor(Math.random() * movies.length)];
	lettersInWord = selectedMovie.split("");
	numberOfBlanks = lettersInWord.length;
	
	letterGuessed = 0;
	correct = 0;
	guessesLeft = 12;
	wrongGuesses =[];
	partiallySolved =[];
	
	test=false;
	startGame();
})

// initialize game
startGame();

document.onkeyup = function(event)
{
	test = true;
	var letterGuessed = event.key;
	for(var i = 0; i < letters.length; i++)
	{	
		if(letterGuessed === letters[i] && test === true)
		{
            // removes letters already chosen so if a duplicate key is pressed it doesnt count as another guess
            var spliceLetters = letters.splice(i,1);

			compareLetters(letterGuessed);
            winLose();
		}
	}		
		
}