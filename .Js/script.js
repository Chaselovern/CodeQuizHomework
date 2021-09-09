//Setting global vars
var startTime= 60;
var questNum = 0;
var score= 0;
var total= 5;

var intervalId;

//creating timer function
function timer() {
  questNum = 0;
  startTime = 60;
  score= 0;
  document.getElementById("quizList").style.display = "block";
    intervalId = setInterval(timer2, 1000);
    console.log('timer started');
    function timer2() {
        document.getElementById("timer").innerHTML = startTime--;
        if (startTime == 0) {
          document.getElementById("timer").innerHTML = '0';
          document.getElementById("next").style.display = "none";
          loadResults(score);
          clearInterval(intervalId);
       }
    }
}


//creating question numbers and displaying questions
function currQues (questNum){
  console.log('inside curr');
  var questionText;
  var opt1Text;
  var opt2Text;
  var opt3Text;
  var opt4Text;
  var q = questions[questNum];
  questionText = q.question;
  opt1Text = q.option1;
  opt2Text = q.option2;
  opt3Text = q.option3;
  opt4Text = q.option4;

  document.getElementById("question").innerHTML = questionText;
  document.getElementById("opt1").innerHTML = opt1Text;
  document.getElementById("opt2").innerHTML = opt2Text;
  document.getElementById("opt3").innerHTML = opt3Text;
  document.getElementById("opt4").innerHTML = opt4Text;

};


//function to load the first question
function loadFirstQuestion(){
  document.getElementById("mainButtons").style.display = "block";
  document.getElementById("countdown").style.display = "block";
  document.getElementById("begin").style.display = "None";
  document.getElementById("next").innerHTML = "Next";
  document.getElementById("next").style.display = "block";
  document.getElementById("highScores").style.display = "none";
  currQues(questNum);
}

//function to load the next question
function loadNextQuestion(){
  console.log('inside loadNext');
  checkAnswer(questNum);
  questNum++;
  if (questNum == 4)
    document.getElementById("next").innerHTML = "Finish";
  if (questNum > 4)
    loadResults(score);
  else
    currQues(questNum);
}


//checking to see if the given answer is correct
function checkAnswer(questNum){
  var ans = document.getElementsByName('option');
  console.log("question number: " + questNum);
  console.log("Answer from code: " + parseInt(questions[questNum].answer) + " " + questions[questNum].answer)
  for(i = 0; i < ans.length; i++) {
    if(ans[i].checked){
      console.log("You Chose: " + i)
      if(i== parseInt(questions[questNum].answer)){
        score++;
        console.log("correct " + i)
      }else{
        startTime = startTime-10;
        document.getElementById("timer").innerHTML = startTime;
      }
    }
  }
}


//loading results on the page when quiz is finished
function loadResults(score){
  clearInterval(intervalId);
  console.log("score "+score);
  var finalScore=(score/total)*100;
  document.getElementById("quizList").style.display = "none";
  document.getElementById("Initials").style.display = "block";
  document.getElementById("next").style.display = "none";
  document.getElementById("finalScore").innerHTML = "Your Final Score is: " + finalScore;

}


//displaying your score and the highscore
function showHighScores(initials){
  document.getElementById("countdown").style.display = "none";
  document.getElementById("Initials").style.display = "none";
  document.getElementById("mainButtons").style.display = "none";
  document.getElementById("highScores").style.display = "block";
  //document.getElementById("highScores").innerHTML = "Thank you, " + initials;

  saveNewScore(initials);
}

function saveNewScore(initials){
  var scoresAray = [];
  var newScore={
    inits: initials,
    result: (score/total)*100
  };

  var highScores= localStorage.getItem("scores");

  if (highScores==null){
    scoresAray=[];
  }else{
    scoresAray = JSON.parse(highScores);
  }

  console.log(newScore);
  scoresAray.push(newScore)

  window.localStorage.setItem("scores",JSON.stringify(scoresAray))
  console.log(JSON.stringify(scoresAray))
  displayAllScores();
};


function displayAllScores(){
  var hs= localStorage.getItem("scores");
  var sa = [];
  var addScore;
  if (hs==null){
    return;
  }else{
    sa = JSON.parse(hs);
  }
  
  while (document.getElementById("highScoresList").hasChildNodes()){
    document.getElementById("highScoresList").removeChild(document.getElementById("highScoresList").firstChild);
  }

  for (i=0; i<sa.length; i++){
    addScore = document.createElement("p");
    addScore.innerHTML = sa[i].inits + " Scored: " + sa[i].result;
    document.getElementById("highScoresList").appendChild(addScore); 

  }

};