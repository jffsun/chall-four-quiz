var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var question = document.querySelector(".question");
var questionNumber = document.querySelector(".question-number");
var questionPanel = document.querySelector(".question-panel")
var optionA = document.getElementById("optionA");
var optionB = document.getElementById("optionB");
var optionC = document.getElementById("optionC");
var optionD = document.getElementById("optionD");
var form = document.querySelector("form");
var submit = document.getElementById("submit")
var answerButtons = document.querySelector(".btn-group-vertical");
var quizDone = false;
var timer;
var timerCount;
var questionsCorrect = 0;

// Questions as objects and their answers
var Questions = [{
    q: "What does '.js' mean at the end of the file",
    A: "1A",
    B: "1B",
    C: "1C Javascript",
    D: "1D",
    answer: "1C Javascript",
}, 
{
    q: "Question 2",
    A: "2A",
    B: "2B Answer",
    C: "2C",
    D: "2D",
    answer: "2B Answer",
},
{
    q: "Question 3",
    A: "3A",
    B: "3B Answer",
    C: "3C",
    D: "3D",
    answer: "3B Answer",
},
{
    q: "Question 4",
    A: "4A",
    B: "4B",
    C: "4C",
    D: "4D Answer",
    answer: "4D Answer",
},
{
    q: "Question 5",
    A: "5A Answer",
    B: "5B",
    C: "5C",
    D: "5D",
    answer: "5A Answer",
},
]
var questionNumber = 0;
var answer = Questions[questionNumber].answer;
var selectA = Questions[questionNumber].A;
var selectB = Questions[questionNumber].B;
var selectC = Questions[questionNumber].C;
var selectD = Questions[questionNumber].D;

// TO DO: getHighScores function from Local Storage
function init() {
    getHighScores();
    addListeners();
}

// Click start to begin quiz
startButton.addEventListener("click", startGame);

// The startGame function is called when the start button is clicked
function startGame() {

    timerCount = 30;

    // Prevents start button from being clicked when quiz is in progress
    startButton.disabled = true;
    startTimer();

    console.log("test")
    generateQuestion(questionNumber);
    console.log("test2")
    generateAnswers(questionNumber);
    console.log("test3")
    // While loop to generate the question and its four options 
    //  while (questionNumber < Questions.length) {
    //     console.log("test4")
    //     // newQuestion(questionNumber);
    //  }
}

function generateQuestion(questionNumber) {
    // Generate question at i index
    question.innerHTML = Questions[questionNumber].q
    // TO DO: Show question number
}

function generateAnswers(questionNumber) {
    optionA.innerHTML = Questions[questionNumber].A;
    optionB.innerHTML = Questions[questionNumber].B;
    optionC.textContent = Questions[questionNumber].C;
    optionD.textContent = Questions[questionNumber].D;
}

function newQuestion(questionNumber) {
    selectA = Questions[questionNumber].A;
    selectB = Questions[questionNumber].B;
    selectC = Questions[questionNumber].C;
    selectD = Questions[questionNumber].D;
    answer = Questions[questionNumber].answer;
}    

function addListeners () {
    optionA.addEventListener("click", function(event)
    { if (selectA == answer) {
        console.log("correct");
        questionsCorrect++;
        
    } else {
        console.log("incorrect");
    } questionNumber++
    selectA = Questions[questionNumber].A;
    selectB = Questions[questionNumber].B;
    selectC = Questions[questionNumber].C;
    selectD = Questions[questionNumber].D;
    answer = Questions[questionNumber].answer;
    })

     // Check B
     optionB.addEventListener("click", function(event)
     { if (selectB == answer) {
         console.log("correct");
         questionsCorrect++;
     } else {
         console.log("incorrect");
     } questionNumber++
     selectA = Questions[questionNumber].A;
     selectB = Questions[questionNumber].B;
     selectC = Questions[questionNumber].C;
     selectD = Questions[questionNumber].D;
     answer = Questions[questionNumber].answer;
     })

      // Check C
    optionC.addEventListener("click", function(event)
    { if (selectC == answer) {
        console.log("correct");
        questionsCorrect++;
    } else {
        console.log("incorrect");
    } questionNumber++
    selectA = Questions[questionNumber].A;
    selectB = Questions[questionNumber].B;
    selectC = Questions[questionNumber].C;
    selectD = Questions[questionNumber].D;
    answer = Questions[questionNumber].answer;
    })

     // Check D
     optionD.addEventListener("click", function(event)
     { if (selectD == answer) {
         console.log("correct");
         questionsCorrect++;
     } else {
         console.log("incorrect");
     } questionNumber++
     selectA = Questions[questionNumber].A;
     selectB = Questions[questionNumber].B;
     selectC = Questions[questionNumber].C;
     selectD = Questions[questionNumber].D;
     answer = Questions[questionNumber].answer;
     })
     
}

// Counts timer down from 60
function startTimer() {
    timer = setInterval(function() {
        timerCount--;

        // Show count text
        timerElement.textContent = timerCount;

        // TO DO: If user answers all questions and timer is still up
        
        // If timer runs out before all questions answered
        if (timerCount === 0) {
            scoreScreen();
            clearInterval(timer);
        }
    }, 1000);
}

function scoreScreen () {
    questionPanel.textContent = `You scored ${questionsCorrect} out of 10!`
}

// TO DO: Give score and store in Local Storage


// TO DO: correctAnswer
// function correctAnswer() {

// TO DO: incorrectAnswer
