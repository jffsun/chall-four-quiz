var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var question = document.querySelector(".question");
var result = document.querySelector(".result")
var questionPanel = document.querySelector(".question-panel")
var optionA = document.getElementById('optionA');
var optionB = document.getElementById('optionB');
var optionC = document.getElementById('optionC');
var optionD = document.getElementById('optionD');


var quizDone = false;
var timer;
var timerCount;
questionsCorrect = 0;

// Questions as objects and their answers
const Questions = [{
    id: 0,
    q: "What does '.js' mean at the end of the file",
    a: [{ text: "A", isCorrect: false },
        { text: "B", isCorrect: false },
        { text: "Javascript", isCorrect: true },
        { text: "D", isCorrect: false }
    ]

},
{
    id: 1,
    q: "What is question number 2?",
    a: [{ text: "Javascript", isCorrect: true },
        { text: "B", isCorrect: false },
        { text: "C", isCorrect: false },
        { text: "D", isCorrect: false }
    ]

},
{
    id: 2,
    q: "What is question number 3?",
    a: [{ text: "Javascript", isCorrect: false },
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }
    ]

},  
{
    id: 3,
    q: "What is question number 4?",
    a: [{ text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "Javascript", isCorrect: true },
        { text: "", isCorrect: true }
    ]

},  
{
    id: 4,
    q: "What is question number 5?",
    a: [{ text: "", isCorrect: false },
        { text: "Javascript", isCorrect: true },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }
    ]

},  
{
    id: 5,
    q: "What does '.js' mean at the end of the file",
    a: [{ text: "Javascript", isCorrect: true },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }
    ]

},  
]
// Click start to begin quiz
startButton.addEventListener("click", startGame);

// TO DO: getHighScores function from Local Storage
function init() {
    getHighScores();
}

// The startGame function is called when the start button is clicked
function startGame() {
    quizDone = false;
    timerCount = 10;
    // Prevents start button from being clicked when quiz is in progress
    startButton.disabled = true;
    startTimer();
    generateQuestion();
    generateAnswers();
}

// startTimer function decreases time and gives quiz score if done early
function startTimer() {
    timer = setInterval(function() {
        timerCount--;

        // Add timerCount text to HTML #Element
        timerElement.textContent = timerCount;

        // TO DO: If user answers all questions and timer is still up
        
        // If timer runs out before all questions answered
        if (timerCount === 0) {
            // scoreScreen();
            clearInterval(timer);
        }
    }, 1000);
}

// TO DO: generateQuestion function
function generateQuestion() {
    for (i=0; i < Questions.length; i++)
    // Add to the question line: the question text at 0th index
    question.innerHTML = Questions.q;
}
    // - generateQuestionNum

// TO DO: generateAnswers function
function generateAnswers() {
    optionA.innerHTML = Questions[id].a[0].text;
    optionB.innerHTML = Questions[id].a[1].text;
    optionC.innerHTML = Questions[id].a[2].text;
    optionD.innerHTML = Questions[id].a[3].text;        
}

function scoreScreen () {
    questionPanel.textContent = `You scored ${questionsCorrect} out of 10!`
}

// TO DO: Give score to User at end of quiz 


// TO DO: correctAnswer
// function correctAnswer() {
//     optionA.value = Questions[(id)].a[0].isCorrect;
//     optionB.value = Questions[id].a[1].isCorrect;
//     optionC.value = Questions[id].a[2].isCorrect;
//     optionD.value = Questions[id].a[3].isCorrect;

//         if (optionA)
//     })
    
// }

// TO DO: incorrectAnswer





// TO DO: Store quiz score to Local Storage