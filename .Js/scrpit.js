var startTime=60;
var qNum = 0;

var dispTime;
function timer() {
    dispTime = setInterval(timer2, 1000);
    function timer2() {
        document.getElementById("timer").innerHTML = startTime--;
        if (startTime == 0) {
        clearInterval(dispTime);
       }
    }
}

function currQues (questNum){
  var q = questions[questNum];
  questionEl.textContent = (questNum + 1) + '. ' + q.question;
  opt1.textContent = q.option1;
  opt2.textContent = q.option2;
  opt3.textContent = q.option3;
  opt4.textContent = q.option4;
};