// $(".red").on("click", function(){
//     $("#level-title").css("color","red");
// });

const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPatterns = [];
var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        nextLevel();
        started = true;
    }
});


$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");

    userClickedPatterns.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAns(userClickedPatterns.length - 1);

});

function checkAns(currentLevel) {
    var i = currentLevel;
    if (gamePattern[i] == userClickedPatterns[i]) {
        console.log("success");
        if (userClickedPatterns.length == gamePattern.length) {
            setTimeout(function () {
                nextLevel();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("GAME OVER ! Enter any key to restart");
        startOver();
    }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern.length = 0;

}



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextLevel() {
    level++;
    userClickedPatterns.length = 0;

    $("h1").text("Level " + level);
    var randomNo = Math.floor(Math.random() * 4);
    gamePattern.push(buttonColors[randomNo]);

    $("#" + buttonColors[randomNo]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(buttonColors[randomNo]);



}