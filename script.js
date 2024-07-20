const questions = [
	{
		image: "resources/Angry as fuk cat.png",
		answers: ["Floppa", "Angry as fuck cat", "Spoingus"],
		correct: 1,
	},
	{
		image: "resources/Beluga.png",
		answers: ["Beluga", "Spoingus", "Hecker"],
		correct: 0,
	},
	{
		image: "resources/Bingus.png",
		answers: ["Bingus", "Maxwell", "Smudge"],
		correct: 0,
	},
	{
		image: "resources/Floppa.png",
		answers: ["Bingus", "Zabloing", "Floppa"],
		correct: 2,
	},
	{
		image: "resources/Hecker.png",
		answers: ["Smudge", "Hecker", "Michael"],
		correct: 1,
	},
	{
		image: "resources/Maxwell.png",
		answers: ["Maxwell", "Michael", "Smudge"],
		correct: 0,
	},
	{
		image: "resources/Michael.png",
		answers: ["Floppa", "Spoingus", "Michael"],
		correct: 2,
	},
	{
		image: "resources/Smudge.png",
		answers: ["Smudge", "Spoingus", "Zabloing"],
		correct: 0,
	},
	{
		image: "resources/Spoingus.png",
		answers: ["Michael", "Spoingus", "Maxwell"],
		correct: 1,
	},
	{
		image: "resources/Zabloing.png",
		answers: ["Zabloing", "Smudge", "Floppa"],
		correct: 0,
	},
];

let currentQuestionIndex = 0;
let score = 0;
let totalAnswered = 0;
let selectedAnswerIndex = null;

const imageElement = document.querySelector(".image");
const questionTitleElement = document.querySelector(".question-title");
const answerButtons = document.querySelectorAll(".answers-div button");
const countElement = document.querySelector(".count");
const nextButton = document.querySelector(".next");
const previousButton = document.querySelector(".previous");
const resultDiv = document.querySelector(".results-div");
const answeredQuestionsDiv = document.querySelector(".answered-questions-div");
const answeredElement = document.querySelector(".answered");
const scoreElement = document.querySelector(".score");
const restartButton = document.querySelector(".restart-btn");
const showResultsButton = document.querySelector(".show-results-btn");
const meowSound = document.getElementById("meowSound");

function loadQuestion(index) {
	const question = questions[index];
	imageElement.src = question.image;
	questionTitleElement.textContent = "Who is this?";
	answerButtons.forEach((button, i) => {
		button.textContent = `${String.fromCharCode(97 + i)}. ${
			question.answers[i]
		}`;
		button.style.backgroundColor = "";
		button.style.color = "";
		button.onclick = () => {
			selectedAnswerIndex = i;
			answerButtons.forEach((btn) => {
				btn.style.backgroundColor = "";
				btn.style.color = "";
			});
			button.style.backgroundColor = "#80573a";
			button.style.color = "#efe3b8";
		};
	});
	countElement.textContent = `${index + 1}/${questions.length}`;
	if (index === questions.length - 1) {
		nextButton.textContent = "Show Results";
	} else {
		nextButton.textContent = "Next";
	}
	if (index === 0) {
		previousButton.style.color = "#fff";
	} else {
		previousButton.style.color = "#efe3b8";
	}
}

function nextQuestion() {
	if (selectedAnswerIndex !== null) {
		if (selectedAnswerIndex === questions[currentQuestionIndex].correct) {
			score++;
		}
		totalAnswered++;
		selectedAnswerIndex = null;

		if (currentQuestionIndex < questions.length - 1) {
			currentQuestionIndex++;
			loadQuestion(currentQuestionIndex);
		} else {
			showAnsweredQuestions();
		}
	} else {
		alert("Please select an answer before proceeding.");
	}
}

function previousQuestion() {
	if (currentQuestionIndex > 0) {
		currentQuestionIndex--;
		loadQuestion(currentQuestionIndex);
	}
}

function showAnsweredQuestions() {
	answeredQuestionsDiv.style.display = "block";
	answeredElement.textContent = `You have answered ${totalAnswered} questions`;
	document.querySelector(".game-div").style.display = "none";
}

function showResults() {
	localStorage.setItem("score", score);
	localStorage.setItem("total", questions.length);

	window.location.href = "results.html";
}

function restartGame() {
	score = 0;
	totalAnswered = 0;
	currentQuestionIndex = 0;
	resultDiv.style.display = "none";
	answeredQuestionsDiv.style.display = "none";
	document.querySelector(".game-div").style.display = "flex";
	loadQuestion(currentQuestionIndex);
}

nextButton.addEventListener("click", () => {
	if (currentQuestionIndex === questions.length - 1) {
		showResults();
	} else {
		nextQuestion();
	}
});

previousButton.addEventListener("click", previousQuestion);
restartButton.addEventListener("click", restartGame);
if (showResultsButton) {
	showResultsButton.addEventListener("click", showResults);
}

imageElement.addEventListener("mouseover", () => {
	meowSound.play();
});

imageElement.addEventListener("mouseout", () => {
	meowSound.pause();
	meowSound.currentTime = 0;
});
window.addEventListener("beforeunload", (event) => {
	event.preventDefault();
	event.returnValue =
		"Are you sure you want to leave? You will lose all your progress";
});

loadQuestion(currentQuestionIndex);
