// alert("working");
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;


$(".btn").on("click", handler); //handler is the function which is to be called after click

var started = false;
$(document).keypress(function (){
  if(started === false){
    started = true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
})



function handler(){
  var userChosenColour = $(this).attr("id");
  // console.log(userChosenColour);

  userClickedPattern.push(userChosenColour);//Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  //console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

}

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4); //from 0 to 3
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  //jQuery to select the button with the same id as the randomChosenColour
   //since id we are selecting so we are using #
   $("#"+randomChosenColour).fadeIn(80).fadeOut(80).fadeIn(80);

   var soundFile = "sounds/"+randomChosenColour+".mp3"
   var audio = new Audio(soundFile);
   audio.play();

  return randomNumber;
}

function playSound(name){
  var soundFile = "sounds/"+name+".mp3"
  var audio = new Audio(soundFile);
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");

  setTimeout(function (){ //removing the class after the 100 ms
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){

      setTimeout(function (){
        nextSequence();
      }, 1000);
    }

  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart!")

    startOver();
  }
}


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
