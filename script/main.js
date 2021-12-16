let breadcrumbs = document.querySelector('.breadcrumbs-item.current');
let mainTitle = document.querySelector('.form-title');
let resultTitle = document.querySelector('.result-title');
let allQuestions = {};
let arrayPosition = {};
let questionNumber = {};
let i = 1;

mainTitle.onkeydown = function(e) {
    if(e.key == 'Enter') {
        this.blur();
        breadcrumbs.innerHTML = this.innerHTML;
        resultTitle.innerHTML = this.innerHTML;
    } else {
        breadcrumbs.innerHTML = this.innerHTML;
        resultTitle.innerHTML = this.innerHTML;
    };
};

let navIcons = document.querySelectorAll('.icons')
for(let icon of navIcons) {
    icon.addEventListener('click', function(e) {
        if(!(e.target.closest('.is-active'))) {
            document.querySelector('.is-active')?.classList.remove('is-active');
        }
        this.classList.add('is-active');
    })
}

let addQuestion = document.querySelector('.add-question');
addQuestion.addEventListener('click', function() {
    let questionBox = document.querySelector('.question-container');
    const newQuestion = 
    `<li class="question">
    <p class="add-answer">Dodaj odgovor</p>
    <p class="multi-choice"></p>
    <p class="mutli-choice-text">Višestruki odabir</p>
    <button class="close-question">X</button>
    <p class="question-title">Pitanje ${i}</p>
    <div class="answer">
        <input id="odg1-${i+1}" class="answer-input" name="answer-${i+1}" type="checkbox" value="odg1">
        <label for="odg1-${i+1}" class="answer-label">Odgovor 1</label>
        <button class="close">X</button>
        <br>
    </div>
    <div class="answer">
        <input id="odg2-${i+1}" class="answer-input" name="answer-${i+1}" type="checkbox" value="odg2">
        <label for="odg2-${i+1}" class="answer-label">Odgovor 2</label>
        <button class="close">X</button>
    </div>
    </li>`;
    i++
    questionBox.insertAdjacentHTML('beforeend', newQuestion);
    allQuestions = document.querySelectorAll('.question');
    questionNumber = allQuestions.length - 1;
    editableQuestion();
    addNewAnswer();
    multiChoice();
});

allQuestions = document.querySelectorAll('.question');
questionNumber = allQuestions.length - 1;
editableQuestion();
addNewAnswer();
multiChoice();

function editableQuestion() {
    for(let question of allQuestions) {
        question.addEventListener('click', function() {
            document.querySelector('.edit-mode')?.classList.remove('edit-mode');
            this.classList.add('edit-mode');
            this.querySelector('.question-title').setAttribute('contenteditable', 'true');
            for(let answer of this.querySelectorAll('.answer')) {
                answer.querySelector('label').setAttribute('contenteditable', 'true');
                answer.querySelector('input').disabled = true;
                const close = answer.querySelector('.close');
                close.addEventListener('click', function() {
                    this.parentElement.remove();
                });
            };
            this.querySelector('.close-question').addEventListener('click', function() {
                this.parentElement.remove();
            });
            let questionArray = Array.prototype.slice.call(document.getElementById('question-container').children)
            let questionArraySelected = document.getElementsByClassName('edit-mode')[0];
            arrayPosition = questionArray.indexOf(questionArraySelected);
        });
    };
};

document.addEventListener('click', function(e) {
    if(!(e.target.closest('.edit-mode')) && !(e.target.closest('.answer'))) {
        document.querySelector('.edit-mode')?.classList.remove('edit-mode');
        let pero = document.querySelectorAll('.answer');
        for(let iva of pero) {
            iva.querySelector('.answer label').setAttribute('contenteditable', 'false');
            iva.querySelector('.answer input').disabled = false;
        }
    } else {
    }
});

function addNewAnswer() {
    let addAnswer = document.querySelectorAll('.add-answer')[questionNumber];
    addAnswer.addEventListener('click', function() {
        let currentQuestion = document.querySelector('.edit-mode');
        let allAnswers = currentQuestion.querySelectorAll('.answer').length;
        const newAnswer = `
        <div class="answer">
        <input id="odg${allAnswers + 1}-${arrayPosition + 1}" class="answer-input" name="answer-${arrayPosition + 1}" type="checkbox" value="odg${allAnswers + 1}">
        <label for="odg${allAnswers + 1}-${arrayPosition + 1}" class="answer-label">Novi odgovor</label>
        <button class="close">X</button>
        </div>`;
        currentQuestion.insertAdjacentHTML('beforeend', newAnswer);
        addAnswer.removeEventListener('click', addNewAnswer);
    });
};

function multiChoice() {
    let multiChoice = document.querySelectorAll('.multi-choice')[questionNumber];
    multiChoice.addEventListener('click', function() {
        let currentElement = document.querySelector('.question.edit-mode');
        let allInput = currentElement.querySelectorAll('.answer-input');
        this.classList.toggle('checked')
        if(allInput[0].getAttribute('type') == 'checkbox') {
            for(let input of allInput) {
                input.setAttribute('type', 'radio');
            }
        } else {
            for(let input of allInput) {
                input.setAttribute('type', 'checkbox');
            };
        };
    });
};
