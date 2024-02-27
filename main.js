let list = [];
let set = 0
let random = 0
let entry = 0
let sound = 0;
let alarm = new Audio("alarm.mp3")
let buzz = new Audio("buzz.mp3")

function start(){
  set = Number(document.getElementById("time").value);
  random = Number(document.getElementById("random").value);
  entry = Number(document.getElementById("entry").value);
  var splitterRadios = document.getElementsByName('splitter');

  for (var i = 0, length = splitterRadios.length; i < length; i++) {
    if (splitterRadios[i].checked) {
        switch(i){
          case 0:
            list = document.getElementById("list").value.split("\n");
            break;
          case 1:
            list = document.getElementById("list").value.split(" ");
            break;
          case 2:
            list = document.getElementById("list").value.split("");
            break;
        }
    }
  }
  var soundRadios = document.getElementsByName('sound');

  for (var i = 0, length = soundRadios.length; i < length; i++) {
      if (soundRadios[i].checked) {
          sound = i
          break;
      }
  }

  document.getElementById("intro").style.display = "none";
  document.getElementById("timer").style.display = "flex";

  startCountdown(generateRandomInteger());
}

function startCountdown(time){
  countdown = setInterval(function() {
    if(time <= 0) {
      clearInterval(countdown);
      document.body.style.backgroundColor = "red";
    } else {
      document.getElementById("times").innerHTML = String(time);
    }
    time--;
  }, 1000);
}

function startCountdown(time){
  countdown = setInterval(function() {
    if(time <= 0) {
      clearInterval(countdown);
      document.body.style.backgroundColor = "red";
      switch(sound){
        case 1:
          console.log("f");
          alarm.play();
          break;
        case 2:
          buzz.play();
          break;
        default:
          break;
      }
      startAnswerCountdown(entry)
    } else {
      document.getElementById("times").innerHTML = String(time);
    }
    time--;
  }, 1000);
}

function startAnswerCountdown(time) {
  let element = list.shift()
  console.log(list)
  let next = true
  if (list.length == 0){
    next = false
    element = element + " End of List, Refresh to Start Again"
  }
  countdown = setInterval(function() {
    if(time <= 0) {
      clearInterval(countdown);
      document.body.style.backgroundColor = "#242424";
      if (next) {
        startCountdown(generateRandomInteger())
      }
    } else {
      document.getElementById("times").innerHTML = element + ", " + String(time);
    }
    time--;
  }, 1000);

}

function generateRandomInteger() {
  return Math.floor(Math.random() * random + set);
}