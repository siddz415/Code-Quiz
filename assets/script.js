var questionCointainer = document.querySelector('#question-container');
var startContainer = document.querySelector('.start-btn-container')
var startBtn = document.querySelector('.start-btn')
var timeEl = document.querySelector('.time-el')
var highScorebtn = document.querySelector('#home')
var goBackbtn = document.querySelector('#home')
var time = 99 // so the time starts at 99 seconds once start btn clicked
var questionCounter = 0; // number of questions finish by the user
var score = 0

var questions = [ //array of object for all 4 questions
    {
        question: ' Which of the following keywords is used to define a variable in Javascript?',
        1: 'Var',
        2: 'Let',
        3: 'Both A and B',
        4: 'None of the above',
        answer: 3,
    },

    {
        question: ' Which of the following methods is used to access HTML elements using Javascript?',
        1: 'getElementbyid()',
        2: 'getElementByClassName()',
        3: 'Both A and B',
        4: 'None of the above',
        answer: 3,
    },

    {
        question: ' Javascript is an _______ language?',
        1: 'Object-oriented',
        2: 'Object-based',
        3: 'Procedural',
        4: 'None of the above',
        answer: 1,
    },

    {
        question: ' How can a datatype be declared to be a constant type?',
        1: 'Constant',
        2: 'Let',
        3: 'Const',
        4: 'Var',
        answer: 3
    }


]

function startQuiz() {  //to start the quiz once start btn is clicked
    startContainer.classList.add('hidden')  // add hidden class
    console.log("clicked");
    displayQuestions()
    startTimer()
}

function startTimer() { //timer function
    timeEl.textContent = time

    var timeInterval = setInterval(function () {
        time--
        timeEl.textContent = time //time is defined earlier

        if (time === 0 || questionCounter === questions.length) {
            clearInterval(timeInterval)
            endQuiz()
        }
    }, 1000)
}

function endQuiz() { // endqui function to add conditions
    console.log('quiz is over')
    var endingHeader = document.createElement('h3') // creating h3 element with JS
    endingHeader.textContent = "Quiz has ended! Enter your name below"
    endingHeader.style = "color: white; width: 100%; display: flex; flex-direction: column; align-items: center; font-size: 40px"
    highScorebtn.classList.remove('hidden'); // unhide highscore button after the end of quiz
    goBackbtn.classList.remove('hidden'); // unhide goback button after the end of quiz
    var input = document.createElement('input')
    input.setAttribute('placeholder', 'Name')
    input.style = "margin-bottom: 1rem; width:15rem; padding: 1rem; font-size: 1rem;align-items: center;" //adding css through JS
    var btn = document.createElement('button')
    btn.textContent = 'SUBMIT'
    btn.style = "font-size: 1rem; padding:1rem 0; width:10rem; text-align:center; margin-bottom: 1rem; text-decoration:none; color: black; background-color: teal;"
    questionCointainer.style = "text-align: center;" // added css to the parent
    questionCointainer.append(endingHeader, input, btn)

    btn.addEventListener('click', function () {  //adding btn through addeventlistener
        var username = input.value

        var userObject = {
            name: username,
            highscore: score
        }

        var storage = JSON.parse(localStorage.getItem('quizHighscores'))
        if (storage === null) {
            storage = []
        }

        storage.push(userObject)
        localStorage.setItem('quizHighscores', JSON.stringify(storage)) //method to push quizhighscores

        window.location.href = 'highscores.html' // saving scores under highscores
    })
}

function displayQuestions() {
    questionCointainer.textContent = ""
    if (questionCounter === questions.length) {
        return
    }
    var h1Question = document.createElement('h1')
    h1Question.setAttribute('id', "question")
    h1Question.textContent = questions[questionCounter].question
    questionCointainer.append(h1Question) //append h1 elment question

    let letters = [ //number of answers
        {
            letter: "A"
        },
        {
            letter: "B"
        },
        {
            letter: "C"
        },
        {
            letter: "D"
        },
    ]

    for (var i = 0; i < 4; i++) {  // using a for loop to iterate over the array of questions
        var divChoiceContainer = document.createElement('div')
        divChoiceContainer.setAttribute('class', "choice-container")
        questionCointainer.append(divChoiceContainer)

        var prefix = document.createElement('p')
        prefix.setAttribute('class', 'choice-prefix')
        prefix.textContent = letters[i].letter
        divChoiceContainer.append(prefix)

        var choiceText = document.createElement('p')
        choiceText.setAttribute('class', 'choice-text')
        choiceText.setAttribute('data-number', i + 1)
        choiceText.textContent = questions[questionCounter][(parseInt(i) + 1).toString()]
        divChoiceContainer.append(choiceText)

        choiceText.addEventListener("click", function (event) {
            var clickedValue = event.target.dataset.number
            if (clickedValue == questions[questionCounter].answer) {
                console.log('correct')
                score += 25
            } else {
                console.log('incorrect')
                time -= 10
            }
            questionCounter++
            displayQuestions()
        })
    }
}

startBtn.addEventListener("click", startQuiz)

