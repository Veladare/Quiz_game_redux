var startQuizDiv = document.getElementById("frontpage");
var quizSection = document.getElementById("quiz");
var Timer = document.getElementById("timer");
var questionDiv = document.getElementById("questions");
var endscreenSection = document.getElementById("endscreen");
var finalScoreDiv = document.getElementById("finalScore");
var beginQuizbtn = document.getElementById("beginbtn");
var highscoreInputName = document.getElementById("initials");
var leaderboardcontainerSection = document.getElementById("leaderboardcontainer");
var leaderboardpage = document.getElementById("leaderboardpage");
var submitScoreBtn = document.getElementById("submitScore");
var showleaderboardname = document.getElementById("leaderboard-initials");
var endGameBtns = document.getElementById("endGameBtns");
var showleaderboardscore = document.getElementById("leaderboard-score");

var button1 = document.getElementById("1");
var button2 = document.getElementById("2");
var button3 = document.getElementById("3");
var button4 = document.getElementById("4");

var quizQuestions = [{
  question: "What symbol is used to give a style a global property in CSS?",
  Opt1: "!",
  Opt2: "#",
  Opt3: "*",
  Opt4: "none",
  correctAnswer: "3"},
{
   question: "how can a coder select an html id in javascript for possible modification?",
  Opt1: "getElementById",
  Opt2: "generateId",
  Opt3: "createid",
  Opt4: "none of the above",
  correctAnswer: "3"},
  {
  question: "Which of these is not an HTML tag?",
  Opt1: "button",
  Opt2: "main",
  Opt3: "input",
  Opt4: "log",
  correctAnswer: "4"},
  {
  question: "What is the command to move your local repository to your github?",
  Opt1: "git push",
  Opt2: "git commit",
  Opt3: "git pull",
  Opt4: "git git",
  correctAnswer: "1"},  
  {
  question: "When was JavaScipt Created?",
  Opt1: "1997",
  Opt2: "1995",
  Opt3: "2000",
  Opt4: "1980",
  correctAnswer: "2"},
  {
  question: "How do you add files to a folder using Git Bash",
  Opt1: "create file",
  Opt2: "mkdir",
  Opt3: ".cd",
  Opt4: ".touch",
  correctAnswer: "4"},
      
  
  ];
  
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 70;
var timerInterval;
var score = 0;
var correct;

function startQuiz(){
  startQuizDiv.style.display = "none";
    generateQuizQuestion();

    
    timerInterval = setInterval(function() {
        timeLeft--;
        Timer.textContent = "Time Remaining: " + timeLeft;
    
        if(timeLeft <= 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizSection.style.display = "block";
}

function generateQuizQuestion(){
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionDiv.textContent = currentQuestion.question;
  
    button1.textContent = currentQuestion.Opt1;
    button2.textContent = currentQuestion.Opt2;
    button3.textContent = currentQuestion.Opt3;
    button4.textContent = currentQuestion.Opt4;
  }
  function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;
    var isCorrect = answer === correct;
  
    if (isCorrect && currentQuestionIndex !== finalQuestionIndex) {
      score++;
    } else if (!isCorrect && currentQuestionIndex !== finalQuestionIndex) {
      timeLeft -= 10;
      alert("Incorrect answer! 10 seconds have been deducted from your time.");
    }
  
    currentQuestionIndex++;
    generateQuizQuestion();
  
    if (currentQuestionIndex === finalQuestionIndex) {
      showScore();
    }
  }
  


submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("please enter initials!");
        return false;
    
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
        endscreenSection.style.display = "none";
        leaderboardcontainerSection.style.display = "flex";
        leaderboardpage.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generatescores();

    }
    
});


function generatescores() {
  showleaderboardname.textContent = "";
  showleaderboardscore.textContent = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];

  
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (highscore) {
    var addName = "<div>" + highscore.name + "<div>";
    var addScore = "<div>" + highscore.score + "<div>";
    showleaderboardname.innerHTML +=  addName;
    showleaderboardscore.innerHTML += addScore;
  });
}
function showScore(){
  quizSection.style.display = "none"
  endscreenSection.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
  finalScoreDiv.textContent = "You got " + score + " correct!";
}

function showleaderboardnumber(){
    startQuizDiv.style.display = "none"
    endscreenSection.style.display = "none";
    leaderboardpage.style.display = "block";
    leaderboardcontainerSection.style.display = "flex";
    endGameBtns.style.display = "flex";

    generatescores();
}


function clearScore(){
    window.localStorage.clear();
    showleaderboardname.textContent = "";
    showleaderboardscore.textContent = "";
}


function replayQuiz(){
    leaderboardcontainerSection.style.display = "none";
    endscreenSection.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 70;
    score = 0;
    currentQuestionIndex = 0;
}



beginQuizbtn.addEventListener("click",startQuiz);