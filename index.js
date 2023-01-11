// game variables
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
const buttonColours = ["red", "blue", "green", "yellow"];

// call nextSequence when the user presses the key for the first time only

$(document).keypress(function () {
    if (!started) {
        $("h1").html("Lets Go");
        setTimeout(function () {
            nextSequence();
        }, 1000);
        started = true;
    }
});


// Sequence maker
var randomNumber;
function nextSequence() {
    randomNumber = Math.floor(4 * Math.random());
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    level++;
    $("h1").html("Level " + level);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// adding event listener to the buttons
$(".btn").click(handleClick);


// uses the click to generate the click pattern of the user
function handleClick(event) {

    var userChosenColor = $(this).attr("id");  // dunno how but this also worked = this.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    }

    else {
        playSound("wrong");
        $("#level-title").text("Game Over, Press any key to restart.");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

// User click animation
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}



// Plays color specific music from color name
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

// Restarting the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}

