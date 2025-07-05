let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");

let questionCount = 0;
let scoreCount = 0;
let count = 11;
let countdown;

const quizArray = [
  {
    question: "Which is the most widely spoken language in the world?",
    options: ["Spanish", "Mandarin", "English", "German"],
    correct: "Mandarin",
  },
  {
    question: "Which is the only continent in the world without a desert?",
    options: ["North America", "Asia", "Africa", "Europe"],
    correct: "Europe",
  },
  {
    question: "Who invented Computer?",
    options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
    correct: "Charles Babbage",
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Rome", "Paris"],
    correct: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Giraffe", "Elephant", "Blue Whale", "Hippopotamus"],
    correct: "Blue Whale",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"],
    correct: "Carbon Dioxide",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correct: "Au",
  },
];

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

nextBtn.addEventListener("click", () => {
  questionCount += 1;
  nextBtn.disabled = true;

  if (questionCount === quizArray.length) {
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    userScore.innerHTML = "Your score is " + scoreCount + " out of " + quizArray.length;
  } else {
    countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " questions";
    quizDisplay(questionCount);
    count = 11;
    clearInterval(countdown);
    timerDisplay();
  }
});

const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count === 0) {
      clearInterval(countdown);
      autoRevealAnswer();
      setTimeout(() => nextBtn.click(), 1000);
    }
  }, 1000);
};

function autoRevealAnswer() {
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  options.forEach((element) => {
    if (element.innerText === quizArray[questionCount].correct) {
      element.classList.add("correct");
    }
    element.disabled = true;
  });
}

const quizDisplay = (index) => {
  let quizCards = document.querySelectorAll(".container-mid");
  quizCards.forEach((card) => card.classList.add("hide"));
  quizCards[index].classList.remove("hide");
  nextBtn.disabled = false;
};

function quizCreator() {
  const shuffledQuiz = [...quizArray].sort(() => Math.random() - 0.5);

  shuffledQuiz.forEach((item) => {
    item.options.sort(() => Math.random() - 0.5);

    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerText = item.question;
    div.appendChild(question_DIV);

    item.options.forEach((optionText) => {
      let btn = document.createElement("button");
      btn.classList.add("option-div");
      btn.innerText = optionText;
      btn.addEventListener("click", () => checker(btn, item.correct));
      div.appendChild(btn);
    });

    quizContainer.appendChild(div);
  });
}

function checker(userOption, correctAnswer) {
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  if (userSolution === correctAnswer) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText === correctAnswer) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countdown);

  options.forEach((element) => {
    element.disabled = true;
  });
}

function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  quizCreator();
  countOfQuestion.innerHTML = "1 of " + quizArray.length + " questions";
  quizDisplay(questionCount);
  timerDisplay();
}

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer
