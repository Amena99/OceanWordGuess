
//Declare Variables
// The array of words for the hangman game.
var words = ["Kelp", "Seagrass", "Coral", "Shellfish", "Octopus", "Seahorse", "Shore", "Algae"];
//var currentword = words[Math.floor(Math.random() * words.length)];
var currentword = "";
//Please note: I experience a bug where despite having Math.random the game keeps generating the same word.
//I suspect that it is generating a random number for the index only once and running that several times.
//I tried to fix it by declaring it in my startWord() function below, but that created additional bugs. 
//I will continue to try to fix it, but am turning it in in this condition. 
var answerArray = [];
var remainingLetters = 0;
var str_wrong = "";
var wrongl = [];
var score = 0;
var guessesremaining = 10;
var guessesrem = $("<div></div>");
var scorekeep2 = $("<div></div>");
var guesspermit = true;


//Main Program
//Before game begins: display word as blanks, 10 guesses remaining, score equal to zero, and call function start game.

guessesrem.text(guessesremaining);
$("#guessesr").append(guessesrem);
scorekeep2.text(score);
$("#score").append(scorekeep2);
startWord();
startgame();

//Main game function

function play(guess) {

    console.log(guess);
    currentword = currentword.toLowerCase();
    var foundLetter = false;
    var wordcomplete = false;

    if (currentword.includes(guess) && guesspermit === true) {

        for (i = 0; i < currentword.length; i++) {
            console.log(currentword[i] + " " + guess + " " + answerArray[i] + " ");
            if (currentword.charAt(i) === guess && answerArray[i] === " _ ") {

                answerArray[i] = guess;
                remainingLetters--;
                foundLetter = true;  //setting this boolean to true when all the spots where the entered letter is found have been filled in. 
            }
        }
        $("#word").text(answerArray.join(" "));
        if (foundLetter) {
            scorekeep();
        };
    }

    else {
        if (guessesremaining > 0 && guesspermit === true && wrongl.indexOf(guess) === -1 && remainingLetters > 0) {
            wrongl.push(guess);
            console.log(guess);
            console.log(wrongl);
            $("#wrong-letters").text(wrongl.join(" "));
            $(wrongl).push("");
            guessesremaining--;
            guessesrem.text(guessesremaining);
            scorekeep();
        }

        if (guessesremaining < 1) {
            guesspermit = false;
            console.log(guessesremaining + " " + guesspermit);
        }
    }
};

//Function to start game sequence
function startgame() {
    $(this).keypress(function (event) {
        play(event.key);
    })
};

//Function to display new word dashes
function startWord() {
    //$("#word").text(" ");
    answerArray = [];
    currentword = words[Math.floor(Math.random() * words.length)];
    remainingLetters = currentword.length;
    console.log("logging currentword in startWord() : " + currentword + " and remaining Letters: " + remainingLetters);
    for (var i = 0; i < currentword.length; i++) {
        answerArray[i] = " _ ";
        $("#word").text(answerArray.join(" "));
    }
};

//Function to increment score when all letters in word are found
function scorekeep() {
    if (remainingLetters < 1) {
        console.log("remaining letters:" + remainingLetters + " score:" + score);
        score++;
        const alertTimeout = setTimeout(alertPlayer, 500);
        scorekeep2.text(score);
        $(".score").append(scorekeep2);
        wordcomplete = true;  
    }
};

//Alert Player
function alertPlayer(){
    alert("Nice Job! You scored a point!");
}

//Reset Button
$("#playagain").on("click", function () {
    startWord();
    resetvalues();
    //switch startWord() to top so that currentWord is updated before resetValues() is called.
});

//Function to reset values to begin next game sequence
function resetvalues() {
    guessesremaining = 10;
    remainingLetters = currentword.length;
    guessesrem.text(guessesremaining);
    wrongl = [];
    $("#wrong-letters").text(wrongl);
    guesspermit = true;
};

