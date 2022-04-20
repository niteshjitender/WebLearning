const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainer = document.getElementById('question-container');

// Added click listener 
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

let shuffleQuestions, currentQuestionIndex;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

function startGame() {
    console.log('Started');
    // Hiding button when clicked by adding hide class to it
    startButton.classList.add('hide');
    // negative/ postive number can be used to sort the array in particular way
    // we using random that gives us value 0-1 if subtract 0.5 from it we get both positive and negative values
    shuffleQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    // Unhinding question container by removing the hide class
    questionContainer.classList.remove('hide');
    setNextQuestion();
}


function setNextQuestion() {
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    //Array.from converting this to array so we can use forEach
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if(shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    }
    else{
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add('correct');
    }
    else{
        element.classList.add('wrong');
    }
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'Who is the best YouTuber?',
        answers: [
            { text: 'Web Dev Simplified', correct: true },
            { text: 'Traversy Media', correct: true },
            { text: 'Dev Ed', correct: true },
            { text: 'Fun Fun Function', correct: true }
        ]
    },
    {
        question: 'Is web development fun?',
        answers: [
            { text: 'Kinda', correct: false },
            { text: 'YES!!!', correct: true },
            { text: 'Um no', correct: false },
            { text: 'IDK', correct: false }
        ]
    },
    {
        question: 'What is 4 * 2?',
        answers: [
            { text: '6', correct: false },
            { text: '8', correct: true }
        ]
    }

]