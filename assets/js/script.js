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
var scoreList = document.querySelector(".score-list")

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

function init() {
    getScores();
}

init();

function getScores() {
    // Get stored data from local storage and parse into array elements
    var storedQuizProfiles = JSON.parse(localStorage.getItem("quizProfile"));
    
    // If there are quizProfiles to retrieve, then update scores array
    if (storedQuizProfiles !== null) {
        scores = storedQuizProfiles;
        
    } else {
        scores = [];
        return;
    }

}

function renderScores() {
    todoList.innerHTML = "";

  // Add text to #todoCount. Displays the length of the todo array
  todoCountSpan.textContent = todos.length;
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
    
        // Generate first question
        generateQuestion(questionNumber);
        console.log("question displayed");

        // Generate first question's answers
        generateAnswers(questionNumber);
        console.log("answer options displayed");

        // Click answer button validates that answer
        answerChoices.addEventListener("click", function(event) {
            var selected = event.target;
            
            // If user clicks an answer button 
            if (selected.matches("button")) {

                // Check selected answer against question answer
                validateAnswer(selected);

                // Generate new question if length of questions not reached
                if (questionNumber < Questions.length) {
                    generateQuestion(questionNumber);
                    generateAnswers(questionNumber);

                    } else {

                        // Show end screen after last question answered
                        scoreScreen();
                    }
            }
        }) 
}

function generateQuestion(questionNumber) {

    // Inject question text to question element
    question.innerHTML = Questions[questionNumber].q;
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

// Counts timer down from 60
function startTimer() {
    timer = setInterval(function() {
        timerCount--;

        // Show count text
        timerElement.textContent = timerCount;

        // If timer runs out before all questions answered
        if (timerCount === 0) {
            scoreScreen();
        }
    }, 1000);
}

function scoreScreen () {
    clearInterval(timer);
    window.alert(`You scored ${questionsCorrect} out of 10!`);

    // Ask for user initials and only accept two characters
    var initials = ""
    while (initials.length !== 2) {
        initials = window.prompt("Enter your initials below. Initials must be two characters");
    }
    saveLastQuiz(questionsCorrect, initials);
}

function displayHighScores(scores) {
    for (i=0; i < scores.length; i++) {
        if (i > 2) {
            break;
        }
        console.log(scores[i]);
    }
}

function saveLastQuiz(questionsCorrect, initials) {
    var quizProfile = {
        user: initials,
        score: questionsCorrect,
    };
    scores = (JSON.parse(localStorage.getItem("scores")||'[]'));
    scores.push(quizProfile);
    scores.sort((a, b) => {
        return b.score - a.score;
    });
    displayHighScores(scores);
    // Store score and intials to local storage
    localStorage.setItem("scores", JSON.stringify(scores));
}