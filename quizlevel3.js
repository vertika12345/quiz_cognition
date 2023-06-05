var seconds = 0;
var quizTimerId;
var timeElement = document.getElementById("timer");
var pointsElement = document.getElementById("points");

function startTimer() {
  quizTimerId = setInterval(updateTimer, 1000);
}
function updateTimer() {
  seconds++;
  if (timeElement) {
    timeElement.textContent = formatTime(seconds);
  }
}

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  return `${padTime(minutes)}:${padTime(remainingSeconds)}`;
}

function padTime(time) {
  return time.toString().padStart(2, "0");
}

function stopTimer() {
  clearInterval(quizTimerId);
}

// Quiz logic

let questions = [
  {
    id: 1,
    question: "Solve for x: 3x + 5 = 17",
    answer: "x = 4",
    options: ["x = 3", "x = 4", "x = 5", "x = 6"],
  },
  {
    id: 2,
    question: "Simplify the expression: 2x - (4 + 3x)",
    answer: "-x + 4",
    options: ["-x - 4", "-x + 4", "-x - 7", "-x + 7"],
  },
  {
    id: 3,
    question: "What is the reciprocal of 5/6?",
    answer: "6/5",
    options: ["1/5", "5/6", "6/5", "6/7"],
  },
  {
    id: 4,
    question: "What is the product of 7 and 9?",
    answer: "63",
    options: ["14", "45", "63", "81"],
  },
  {
    id: 5,
    question: "What is the highest mountain in the world?",
    answer: "Mount Everest",
    options: [
      "Mount Kilimanjaro",
      "Mount Everest",
      "Mount Fuji",
      "Mount Rushmore",
    ],
  },
  {
    id: 6,
    question: "What is the smallest planet in our solar system?",
    answer: "Mercury",
    options: ["Mars", "Venus", "Mercury", "Pluto"],
  },
];

let question_count = 0;
let points = 0;

document.addEventListener("DOMContentLoaded", function () {
  show(question_count);
  startTimer();
});

function show(count) {
  let question = document.getElementById("questions");
  let [first, second, third, fourth] = questions[count].options;

  question.innerHTML = `<h2>Q${count + 1}. ${questions[count].question}</h2>
    <ul class="option_group">
    <li class="option">${first}</li>
    <li class="option">${second}</li>
    <li class="option">${third}</li>
    <li class="option">${fourth}</li>
    </ul>`;
  toggleActive();
}

function toggleActive() {
  let option = document.querySelectorAll("li.option");
  for (let i = 0; i < option.length; i++) {
    option[i].onclick = function () {
      for (let i = 0; i < option.length; i++) {
        if (option[i].classList.contains("active")) {
          option[i].classList.remove("active");
        }
      }
      option[i].classList.add("active");
    };
  }
}

function next() {
  if (question_count == questions.length - 1) {
    stopTimer();
    sessionStorage.setItem("timer", formatTime(seconds)); // Store the time in sessionStorage
    location.href = "final.html";
  }

  let user_answer = document.querySelector("li.option.active").innerHTML;

  if (user_answer == questions[question_count].answer) {
    points += 10;
    sessionStorage.setItem("points", points);
  }
  console.log(points);

  question_count++;
  show(question_count);
}
