var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var questionPanel = document.querySelector(".question-panel")
var answerChoices = document.querySelector(".answer-buttons");
var question = document.querySelector(".question");
var optionA = document.getElementById("optionA");
var optionB = document.getElementById("optionB");
var optionC = document.getElementById("optionC");
var optionD = document.getElementById("optionD");
var result = document.getElementById("result");
var timer;
var timerCount;
var questionsCorrect = 0;
var questionNumber;
var initials;

// Questions as objects and their answer options
var Questions = [{
    q: "1. Which of the following are used when naming a Javascript file?",
    A: ".md",
    B: ".css",
    C: ".js",
    D: ".html",
    answer: ".js",
}, 
{
    q: "2. Which of the following tags should we put our Javascript in?",
    A: "javascript",
    B: "script",
    C: "js",
    D: "scripting",
    answer: "script",
},
{
    q: "3. How would we write 'Hello World' in a window alert?",
    A: "window.alert('Hello World')",
    B: "window.prompt('Hello World')",
    C: "window.confirm('Hello World')",
    D: "window.open('Hello World')",
    answer: "window.alert('Hello World')",
},
{
    q: "4. How do you create a function in Javascript?",
    A: "function: myFunction()",
    B: "function = myFunction()",
    C: "myFunction(): function",
    D: "function myFunction()",
    answer: "function myFunction()",
},
{
    q: "5. What do x and y represent in: myFunction(x, y)?",
    A: "function values",
    B: "function parameters",
    C: "input",
    D: "function variables",
    answer: "function parameters",
},
{
    q: "6. How does a 'loop' start?",
    A: "for (i<=5; i++)",
    B: "for (i=0; i<=5)",
    C: "for (i=0; i<=5; i++)",
    D: "for i=1 to 5",
    answer: "for (i=0; i<=5; i++)",
},
{
    q: "7. How do you add a comment in Javascript?",
    A: '"This is a comment"',
    B: "`This is a comment`",
    C: "#This is a comment",
    D: "// This is a comment",
    answer: "// This is a comment",
},
{
    q: "8. In Javascript, the expression x != y returns false if:",
    A: "the variables are equal",
    B: "x is less than y",
    C: "the variables are not equal",
    D: "none of the above",
    answer: "the variables are equal",
},
{
    q: "9. A named element in a JavaScript program that is used to store and retrieve data is a:",
    A: "variable",
    B: "string",
    C: "method",
    D: "function",
    answer: "variable",
},
{
    q: "10. In a form, if you want users to select only one option out of many, use:",
    A: "text boxes",
    B: "check boxes",
    C: "both text boxes and check boxes",
    D: "radio buttons",
    answer: "radio buttons",
},
]
// Click start to begin quiz
startButton.addEventListener("click", startGame);

// Game starts when start button is clicked
function startGame() {

    // Prevents start button from being clicked when quiz is in progress
    startButton.disabled = true;

    timerCount = 60;
    startTimer();
    questionNumber = 0;
    
        // Generate first question
        generateQuestion(questionNumber);

        // Generate answer options for first question
        generateAnswers(questionNumber);

        // Clicking an answer choice validates that answer
        answerChoices.addEventListener("click", function(event) {
            var selected = event.target;
            
            // If user clicks an answer button 
            if (selected.matches("button")) {

                // Check selected answer against question answer
                validateAnswer(selected);

                // Generate new question if there are more questions left
                if (questionNumber < Questions.length) {
                    generateQuestion(questionNumber);
                    generateAnswers(questionNumber);

                    } else {

                        // Show end screen if last question answered
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

    // Inject answer option text into each option
    optionA.innerHTML = Questions[questionNumber].A;
    optionB.innerHTML = Questions[questionNumber].B;
    optionC.textContent = Questions[questionNumber].C;
    optionD.textContent = Questions[questionNumber].D;
}

function validateAnswer (selected) {
    var answer = Questions[questionNumber].answer;

    // If user's answer is correct
    if (selected.textContent == answer) {
        result.innerHTML = "Correct! ✅";

        // Increment score
        questionsCorrect++;

        // Move onto next question
        questionNumber++;

        // If incorrect
    } else {
        result.innerHTML = "Incorrect. ❌";

        // Subtract 5 seconds from time
        timerCount -= 5;
        questionNumber++;
    }
}

// Counts timer down from 60
function startTimer() {
    
    timer = setInterval(function() {
        timerCount--;

        // Show seconds remaining
        timerElement.textContent = timerCount;

        // If timer runs out before all questions answered
        if (timerCount < 0) {
            clearInterval(timer)
            scoreScreen();
        }
    }, 1000);
}

function scoreScreen () {

    // Stop timer
    clearInterval(timer);
    timerCount = 0;

    // Alert user their quiz score
    window.alert(`You scored ${questionsCorrect} out of 10!`);

    // Ask for user initials and only accept two characters
    var initials = ""
    while (initials.length !== 2) {
        initials = window.prompt("Enter your initials below. Initials must be two characters");
        initials = initials.toUpperCase()
    }
    saveLastQuiz(questionsCorrect, initials);
}

function saveLastQuiz(questionsCorrect, initials) {

    // Store user data as an object
    var quizProfile = {
        user: initials,
        score: questionsCorrect,
    };

    // Scores are retrieved from local storage and scores array is updated either with previous scores from local storage or to an empty array if none
    scores = (JSON.parse(localStorage.getItem("scores") || '[]'));

    // Add the new quiz score to scores array
    scores.push(quizProfile);

    // Sort array by questionsCorrect from highest to low
    scores.sort((a, b) => {
        return b.score - a.score;
    });

    // Show user highest 3 quiz scores
    displayHighScores(scores);

    // Store score and intials to local storage as string
    localStorage.setItem("scores", JSON.stringify(scores));
}

// Display max three scores 
function displayHighScores(scores) {

    // If user's quiz score is only saved score
    if (scores.length == 1) {
        window.alert(`Your score\n
        ${scores[0].user} scored ${scores[0].score}`);

    // If one previously saved score
    } else if (scores.length == 2) {
        window.alert(`Top Two Students\n 
        1st: ${scores[0].user} scored ${scores[0].score}\n
        2nd: ${scores[1].user} scored ${scores[1].score}\n
        Your score: ${questionsCorrect}`);
    } else {

        // If multiple saved scores
        window.alert(`Top Three Students\n 
        1st: ${scores[0].user} scored ${scores[0].score} points\n
        2nd: ${scores[1].user} scored ${scores[1].score} points\n
        3rd: ${scores[2].user} scored ${scores[2].score} points\n
        Your score: ${questionsCorrect}`);
    }
    
}