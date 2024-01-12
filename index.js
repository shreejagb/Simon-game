var userClickedPattern = []

var gamePattern = []

var started = false

var level = 0

var buttonColors = [
    "red",
    "blue",
    "green",
    "yellow"
]
$(".btn").click(function(){
    var userChosenColor = this.id
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)

    // console.log(userClickedPattern)
    
    // console.log("checking the number of buttons pressed..........")
   
    if (userClickedPattern.length === level) {
        // console.log("yay! you have pressed enough buttons")
        checkAnswer()
        userClickedPattern = []
    }else{
        var newGamePattern = gamePattern.slice(0, userClickedPattern.length)

        if (newGamePattern.toString() === userClickedPattern.toString()) {
            // console.log("go on you need to click more")
            
        }else{
            // console.log("oops!!......you messed up. Reload the page")
            gameOver()
        }
    }
})

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColors[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    level++
    $("h1").text("level " + level)
    // console.log(gamePattern)
    // console.log(level)

}
function playSound(name){
    var sound = new Audio("./sounds/" + name + ".mp3")
    sound.play()
}

function animatePress(clickedColorId){
    $("#" + clickedColorId).addClass('pressed')
    setTimeout(() => {
        $("#" + clickedColorId).removeClass('pressed')
        
    }, 100);
}

$(document).keydown(function(){
    if (started === false) {
        $('h1').text("level " + level )
        nextSequence()
        started = true

    }
})

function checkAnswer(){
    // console.log("checking...if you have pressed the right button..........")
    if (gamePattern.toString() === userClickedPattern.toString()) {
        // console.log("success, you have pressed correctly")
        // console.log("On to the next one.....................")
        setTimeout(() => {
            nextSequence()
        }, 800);
        
        
    }else{
        // console.log("use your brain girls")
        gameOver()
    }
}

function gameOver(){
    playSound("wrong")
    $('h1').text("OPPS!!...Game Over..press any key to restart the game")
    started = false
    gamePattern = []
    userClickedPattern = []
    level = 0
    $("body").addClass("game-over")
    setTimeout(() => {
        $("body").removeClass("game-over")
        
    }, 200);
}