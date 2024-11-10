/*პირველი დავალება*/ /////////////////////////////////////
const textElement = document.getElementById("text");
const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", () => {
  textElement.style.display = "none";
});
/*მეორე დავალება*/ /////////////////////////////////////

const cardElement = document.createElement("div");
cardElement.id = "card";

const title = document.createElement("h2");

const linkTag = document.createElement("a");
linkTag.href = "#";

cardElement.append(title, linkTag);

document.body.appendChild(cardElement);
console.log(cardElement);

/*მესამე დავალება*/ /////////////////////////////////////
const questions = [
  {
    question: "რომელია საქართველოს დედაქალაქი?",
    answers: [
      { text: "გორი", correct: false },
      { text: "ზუგდიდი", correct: false },
      { text: "თბილისი", correct: true },
      { text: "ზესტაფონი", correct: false },
    ],
  },
  {
    question: "რომელია საფრანგეთის დედაქალაქი?",
    answers: [
      { text: "პარიზი", correct: true },
      { text: "ბათუმი", correct: false },
      { text: "რომი", correct: false },
      { text: "ნიუ-იორკი", correct: false },
    ],
  },
  {
    question: "რომელია ესპანეთის დედაქალაქი?",
    answers: [
      { text: "პარიზი", correct: false },
      { text: "მადრიდი", correct: true },
      { text: "ჭიათურა", correct: false },
      { text: "თბილისი", correct: false },
    ],
  },
  {
    question: "რომელია იტალიის დედაქალაქი?",
    answers: [
      { text: "პეკინი", correct: false },
      { text: "ბერლინი", correct: false },
      { text: "ვაშინტონი", correct: false },
      { text: "რომი", correct: true },
    ],
  },
];

const questionElement = document.getElementById("questions");
const answerBtns = document.getElementById("answerButtons");
const nextBtn = document.getElementById("nextBtn");
const displayScore = document.getElementById("score");
const screSpace = document.getElementById("scoreSpace");

// console.log(questionElement, answerBtns, nextBtn); ///

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
  displayScore.innerHTML = score;
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement("button");
    console.log(button); ////
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtns.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
  displayScore.style.display = "flex";
  screSpace.style.display = "flex";
}
function resetState() {
  nextBtn.style.display = "none";
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

function selectAnswer(el) {
  console.log(el);
  let selectedBtn = el.target;
  //   let isCorrect = selectedBtn.dataset.answer === "true";

  if (el.target.dataset.correct === "true") {
    selectedBtn.classList.add("correct-answer");
    score++;
  } else {
    selectedBtn.classList.add("incorrect-answer");
  }

  Array.from(answerBtns.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct-answer");
    } else {
      button.disabled = true;
    }
  });
  nextBtn.style.display = "flex";
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleChange();
  } else {
    startQuiz();
  }
});

function handleChange() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    displayScore.innerHTML = score;
  } else {
    displayScore.style.display = "none";
    screSpace.style.display = "none";
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `თქვენი შედეგია ${score}/${questions.length}`;
  nextBtn.innerHTML = "კიდევ ცადეთ";
  nextBtn.style.display = "flex";
}

startQuiz();
