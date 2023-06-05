var timerId;
var seconds = 0;

function startTimer() {
  timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  seconds++;
  var timerElement = document.getElementById("timer");
  if (timerElement) {
    timerElement.textContent = formatTime(seconds);
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
  clearInterval(timerId);
}

// Quiz logic

let questions = [
  {
    id: 1,
    question:
      "If the letters of the word 'GARDEN' are rearranged, which of the following words can be formed?",
    answer: "DANGER",
    options: ["ANGER", "GRAND", "GRADE", "DANGER"],
  },
  {
    id: 2,
    question:
      "If the letters of the word 'CHARM' are rearranged, which of the following words can be formed?",
    answer: "MARCH",
    options: ["RANCH", "CRASH", "MARCH", "CHART"],
  },
  {
    id: 3,
    question: "Which of the following words is spelled correctly?",
    answer: "Puzzle",
    options: [" Pazzle", " Puzzle", "Puzl", "Puzzl"],
  },
  {
    id: 4,
    question: "Which of the following words means the same as 'abundant'?",
    answer: "Plentiful",
    options: ["Scarce", "Sparse", "Plentiful", "Limited"],
  },
  {
    id: 5,
    question: "If 'EARTH' is coded as 'HAEJW', what is the code for 'SUNRISE'?",
    answer: "YVQLWUE",
    options: ["XVQLWVD", "YVPLWUE", "YVQLWUE", "XVPLWVD"],
  },
  {
    id: 6,
    question: "If 'PAPER' is coded as 'RCQFS', what is the code for 'GLASS'?",
    answer: " HMTBU",
    options: ["HMVBT", "HNUAU", "HMTBU", "HNUBT"],
  },
  {
    id: 7,
    question: "If 'BLACK' is coded as 'HCOFP', what is the code for 'WHITE'?",
    answer: "DJFSN",
    options: ["AKJSD", " DJFSN ", "AKMSE", "DJJQE"],
  },
  {
    id: 8,
    question: "Which of the following words means the same as 'quarrel'?",
    answer: "Fight",
    options: ["Fight", "Apologize", " Agree", "Compliment"],
  },
  {
    id: 9,
    question: "Which of the following words is spelled incorrectly?",
    answer: "Mischeif",
    options: ["Privilege", "Mischeif", "Disappear", "Necessary"],
  },
  {
    id: 10,
    question: "Which of the following words means the opposite of calm?",
    answer: "Agitated",
    options: ["Peaceful", "Quiet", "Agitated", "Tranquil"],
  },
];

let question_count = 0;
let points = 0;

window.onload = function () {
  show(question_count);
  startTimer();
};

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
    location.href = "finallevel2.html";
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
