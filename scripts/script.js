let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim-Berners-Lee",
        "answer_4": "Justin Timberlake",
        "right_answer": 3,
        "question_number": 1
    },
    {    
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer_1": "&lt;iframe&gt;, &lt;frame&gt;, und &lt;frameset&gt;",
        "answer_2": "&lt;iframe&gt;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right_answer": 2,
        "question_number": 2
    },
    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 3,
        "question_number": 3
    },
    {
        "question": "Wie stellt man Text am BESTEN fett dar?",
        "answer_1": "&lt;strong&gt;",
        "answer_2": "CSS nutzen",
        "answer_3": "&lt;bold&gt",
        "answer_4": "&lt;b&gt;",
        "right_answer": 1,
        "question_number": 4
    },
    {
        "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1,
        "question_number": 5
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem Attribut title aus?",
        "answer_1": "a[title]{...",
        "answer_2": "a > title {••",
        "answer_3": "a.title {..•)",
        "answer_4": "a-title {*",
        "right_answer": 1,
        "question_number": 6
    },
    {
        "question": "Wie definiert man in JavaScript eine variable?",
        "answer_1": "let 100 - rate;",
        "answer_2": "100 = let rate;",
        "answer_3": "rate = 100;",
        "answer_4": "let rate = 100;",
        "right_answer": 4,
        "question_number": 7
    }
];


let rightAnswers = 0;
let audioSuccess = new Audio('audio/sucess.mp3');
let audioFailure = new Audio('audio/failure.mp3');


function showQuestion(i) { // show first question -> i = 0
    let width = Math.round((i / questions.length) * 100); // returns the percentage of progress: 0 / 7 = 0%
    let cardContainer = document.getElementById('card');
    cardContainer.innerHTML = '';
    
    cardContainer.innerHTML = templateQA(i);
    highlightLanguage(i);
    progressBar(width);
}


function showPrevious(i) {
    let cardContainer = document.getElementById('card');

    if (i === 0) {
        cardContainer.innerHTML = '';
        cardContainer.innerHTML = templateStart();
        highlightLanguagePrevious(i);
    } else {
        i--;
        showQuestion(i);
        highlightLanguagePrevious(i);
    }
}


function showNextQuestion(i) {
    i++;
    let width = Math.round((i / questions.length) * 100); // returns the percentage of progress: 1 / 7 = 0.142352 *100 = 14
    if (i <= 6) {
        showQuestion(i);
    } else {
        showFinish();
        progressBar(width);
        highlightLanguage(i);
    }
    if (i === 6) {
        buttonFinish();
    }
}


function showFinish() {
    let cardContainer = document.getElementById('card');
    cardContainer.innerHTML = '';

    cardContainer.innerHTML = templateFinish();
    document.getElementById('amount-right-answers').innerHTML = rightAnswers; // result of correct answers
}


function checkAnswer(selection, i) {
    if (gameIsOver(selection, i)) {
        showCorrectAnswer(selection);
    } else {
        showWrongAnswer(selection, i);
    }
    enableButton();
}


function gameIsOver(selection, i) {
    let selectionSliced = selection.slice(-1);
    let question = questions[i];
    return question['right_answer'] == selectionSliced; // returns true / false
}


function showCorrectAnswer(selection) {
    document.getElementById(selection).classList.add('answer-lightgreen'); // accessing the div
    document.getElementById(selection).firstElementChild.classList.add('answer-green'); // accessing the child element of the div
    for (let index = 1; index <= 4; index++) {
        document.getElementById(`answer_${index}`).removeAttribute("onclick");
    }
    audioSuccess.play();
    rightAnswers += 1; // adding the correct answers to variable
}


function showWrongAnswer(selection, i) {
    let question = questions[i];
    let idOfRightAnswer = `answer_${question['right_answer']}`; // we could let these let in the checkAnswer and transfer the variable to showWrongAnswer

    document.getElementById(selection).classList.add('answer-lightred');
    document.getElementById(selection).firstElementChild.classList.add('answer-red');
    document.getElementById(idOfRightAnswer).classList.add('answer-lightgreen'); // show immediately the right answer
    document.getElementById(idOfRightAnswer).firstElementChild.classList.add('answer-green');
    for (let index = 1; index <= 4; index++) {
        document.getElementById(`answer_${index}`).removeAttribute("onclick");
    }
    audioFailure.play();
}


function enableButton() {
    let nextButton = document.getElementById('next-button');
    nextButton.disabled = false;
}


function highlightLanguage(i) {
    let elementHTML = document.getElementById('html');
    let elementJS = document.getElementById('JS');
    let elementCSS = document.getElementById('CSS');

    if ([0,1,2,3,4].includes(i)) {
        elementHTML.classList.add('font-white');
    }
    if (i === 5) {
        elementHTML.classList.remove('font-white');
        elementCSS.classList.add('font-white');
    } 
    if (i === 6) {
        elementCSS.classList.remove('font-white');
        elementJS.classList.add('font-white');
    } else {
        elementJS.classList.remove('font-white');
    }
}


function highlightLanguagePrevious(i) {
    let elementHTML = document.getElementById('html');
    let elementCSS = document.getElementById('CSS');
    let quizStartContainer = document.getElementById('quiz-start');

    if (quizStartContainer) {
        elementHTML.classList.remove('font-white');
    } 
    if (i === 4) {
        elementCSS.classList.remove('font-white')
    }
}


function progressBar(width) {
    let progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${width}%`;
}


function restartQuiz() {
    rightAnswers = 0;
    showQuestion(0);
}


function buttonFinish() {
    let buttonNext = document.getElementById('next-button');
    buttonNext.innerHTML = 'Abschliessen';
}


function templateQA(i) {
    return `
        <h5 class="card-title mt-4">${questions[i]['question']}</h5>
        <div class="card-answers">
            <div onclick="checkAnswer('answer_1', ${i})" id="answer_1" class="card mb-3 card-answer">
                <div class="card-option">
                    A
                </div>
                <div class="card-body pd_75">
                    ${questions[i]['answer_1']}
                </div>
            </div>
            <div onclick="checkAnswer('answer_2', ${i})" id="answer_2" class="card mb-3 card-answer">
                <div class="card-option">
                    B
                </div>
                <div class="card-body pd_75">
                    ${questions[i]['answer_2']}
                </div>
            </div>
            <div onclick="checkAnswer('answer_3', ${i})" id="answer_3" class="card mb-3 card-answer">
                <div class="card-option">
                    C
                </div>
                <div class="card-body pd_75">
                    ${questions[i]['answer_3']}
                </div>
            </div>
            <div onclick="checkAnswer('answer_4', ${i})" id="answer_4" class="card card-answer">
                <div class="card-option">
                    D
                </div>
                <div class="card-body pd_75">
                    ${questions[i]['answer_4']}
                </div>
            </div>
        </div>
        
        <div class="question-footer mt-2">
            <button onclick="showPrevious(${i})" type="button" class="btn btn-primary">Zurück</button>
            <span><strong>${questions[i]['question_number']}</strong> von <strong>${questions.length}</strong> Fragen</span>
            <button onclick="showNextQuestion(${i})" id="next-button" type="button" class="btn btn-primary" disabled>Nächste Frage</button>
        </div>
    `;
}


function templateStart() {
    return `
        <div id="quiz-start" class="card-image-container">
            <img class="card-image" src="img/Quizapp-blue/bg b.png" alt="Bild vom Quiz">
            <h5 class="quiz-greeting">Welcome to<br>
                The Awesome HTML Quiz
            </h5>
            <div class="btn-container">
                <button onclick="showQuestion(0)" class="btn btn-primary btn-primary--start">Quiz starten</button>
            </div>
        </div>
    `;
}


function templateFinish() {
    return /*html*/ `
        <div class=card-finish-container>
            <div class="card-finish-circle">
                <img class="card-finish-image" src="../img/quizapp-blue/group 5.png" alt="Bild für erfolgreiches Beenden des Quiz">
                <h5 class="quiz-finish-title">HTML QUIZ<br>BEENDET</h5>
                <div class="quiz-score-wrapper">
                    <span class="quiz-score-text">DEIN SCORE</span>
                    <span class="quiz-score"><span id="amount-right-answers">x</span>/${questions.length}</span>
                </div>
                <div class="quiz-finish-btn-container">
                    <button class="btn-finish">TEILEN</button>
                </div>
                <span onclick="restartQuiz()" class="quiz-finish-replay">REPLAY</span>
            </div>
        </div>
    `;
}