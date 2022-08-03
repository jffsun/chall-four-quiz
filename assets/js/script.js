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
var answerChoices = document.querySelector(".btn-group-vertical");
var quizDone = false;
var timer;
var timerCount;
var questionsCorrect = 0;
var questionNumber;
var verticalButtons = document.querySelector(".btn-group-vertical")

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
// var answer = Questions[questionNumber].answer;
// var selectA = Questions[questionNumber].A;
// var selectB = Questions[questionNumber].B;
// var selectC = Questions[questionNumber].C;
// var selectD = Questions[questionNumber].D;

// TO DO: getHighScores function from Local Storage
function init() {
    getHighScores();
    addListeners();
    
}

// Click start to begin quiz
startButton.addEventListener("click", startGame);

// The startGame function is called when the start button is clicked
function startGame() {
    timerCount = 60;

    // Prevents start button from being clicked when quiz is in progress
    startButton.disabled = true;
    startTimer();
    console.log("game start");
    questionNumber = 0;
    
        generateQuestion(questionNumber);
        console.log("question number " + questionNumber + " displayed");

        generateAnswers(questionNumber);
        console.log("answer options for " + questionNumber + " displayed");

        // 
        answerChoices.addEventListener("click", function(event) {
            var selected = event.target;
            
            // If user clicks a button
            if (selected.matches("button")) {
                validateAnswer(selected);
                generateQuestion(questionNumber);
                generateAnswers(questionNumber);
            }
        }) 
        if (questionNumber == 5) {
            scoreScreen();
        }  
}

function generateQuestion(questionNumber) {
    // Inject question at questionNumber to the Question Line
    question.innerHTML = Questions[questionNumber].q;
    // TO DO: Show question number
}

function generateAnswers(questionNumber) {
    // Inject option choices at questionNumber to each answer button
    optionA.innerHTML = Questions[questionNumber].A;
    optionB.innerHTML = Questions[questionNumber].B;
    optionC.textContent = Questions[questionNumber].C;
    optionD.textContent = Questions[questionNumber].D;
}

function validateAnswer (selected) {
    var answer = Questions[questionNumber].answer;
    if (selected.textContent == answer) {
        console.log("correct");
        questionsCorrect++;
        questionNumber++;
    } else {
        console.log("incorrect");

        // Lose 5 seconds if answer is incorrect
        timerCount -= 5;
        questionNumber++;
    }
}

function nextQuestion() {
    questionNumber++;
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
            clearInterval(timer);
            scoreScreen();
        }
    }, 1000);
}

function scoreScreen () {
    questionPanel.textContent = `You scored ${questionsCorrect} out of 10!`
}

// TO DO: Give score and store in Local Storage
