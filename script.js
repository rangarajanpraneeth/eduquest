let currentSubject = null;
let currentQuestionIndex = 0;
let totalScore = 0;
let questionsAnswered = 0;
let selectedAnswer = null; // Track selected answer
let selectedButton = null; // Track the selected button

const subjects = {
   maths: {
      quiz: [
         { type: "image", question: "Solve the puzzle shown below:", content: "./assets/math_puzzle1.png", options: ["-7", "5", "7", "-5"], correct: "-7" },
         { type: "image", question: "Find the number", content: "./assets/math_puzzle2.png", options: ["3", "4", "5", "6"], correct: "6" },
         { type: "text", question: "What is 6 x 7?", options: ["48", "36", "42", "40"], correct: "42" },
         { type: "text", question: "What is 20 - 5?", options: ["10", "15", "12", "14"], correct: "15" },
         { type: "text", question: "What is 9 + 11?", options: ["27", "18", "20", "19"], correct: "20" },
      ]
   },
   science: {
      quiz: [
         { type: "image", question: "Identify the molecule:", content: "./assets/science_puzzle1.png", options: ["Water", "Methane", "Oxygen", "Carbon Dioxide"], correct: "Methane" },
         { type: "image", question: "Identify the missing part:", content: "./assets/science_puzzle2.png", options: ["Mitochondria", "Nucleus", "Ribosomes", "Golgi Apparatus"], correct: "Mitochondria" },
         { type: "text", question: "What is H2O?", options: ["Water", "Oxygen", "Hydrogen", "Carbon Dioxide"], correct: "Water" },
         { type: "text", question: "What planet is known as the Gas Giant?", options: ["Mars", "Saturn", "Jupiter", "Uranus"], correct: "Jupiter" },
         { type: "text", question: "What gas do plants release during photosynthesis?", options: ["Helium", "Carbon dioxide", "Nitrogen", "Oxygen"], correct: "Oxygen" },
      ]
   },


   english: {
      quiz: [
         { type: 'text', question: "What is a synonym for 'happy'?", options: ["Sad", "Elated", "Angry", "Upset"], correct: "Elated" },
         { type: 'text', question: "What is the antonym of 'quick'?", options: ["Fast", "Slow", "Rapid", "Swift"], correct: "Slow" },
         { type: 'text', question: "What is the past tense of 'run'?", options: ["Ran", "Running", "Runned", "Runs"], correct: "Ran" },
         { type: 'text', question: "What is a noun?", options: ["Person, place, or thing", "Action", "Description", "Linking"], correct: "Person, place, or thing" },
         { type: 'text', question: "What is a conjunction?", options: ["Word joining sentences", "Action", "Noun", "Verb"], correct: "Word joining sentences" },
      ]
   },
   history: {
      quiz: [
         { type: 'text', question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], correct: "George Washington" },
         { type: 'text', question: "What year did World War II end?", options: ["1942", "1945", "1950", "1939"], correct: "1945" },
         { type: 'text', question: "What was the ancient Egyptian writing system called?", options: ["Hieroglyphics", "Cuneiform", "Runes", "Pictograms"], correct: "Hieroglyphics" },
         { type: 'text', question: "Who was the leader of the Soviet Union during World War II?", options: ["Joseph Stalin", "Vladimir Lenin", "Mikhail Gorbachev", "Nikita Khrushchev"], correct: "Joseph Stalin" },
         { type: 'text', question: "What year did the Berlin Wall fall?", options: ["1989", "1990", "1987", "1985"], correct: "1989" },
      ]
   }
};

let totalRight = 0;
let totalWrong = 0;

let highestScore = 0;

function startQuiz(subject) {
   currentSubject = subject;
   currentQuestionIndex = 0;
   selectedAnswer = null; // Reset selected answer
   selectedButton = null; // Reset selected button
   showQuestion();
   document.querySelector(".quiz").style.display = "block";
}

function updateProgressBar() {
   const progressBar = document.querySelector(".progress__bar");
   const totalQuestions = subjects[currentSubject].quiz.length;
   const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
   progressBar.style.width = `${progressPercentage}%`;
}

function showQuestion() {
   const subjectData = subjects[currentSubject];
   const question = subjectData.quiz[currentQuestionIndex];

   // document.querySelector(".quiz__title").textContent = `${currentSubject.charAt(0).toUpperCase() + currentSubject.slice(1)} Quiz`;
   const questionContainer = document.querySelector(".quiz__question");
   questionContainer.innerHTML = ""; // Clear previous question

   if (question.type === "text") {
      questionContainer.textContent = question.question;
   } else if (question.type === "image") {
      const questionText = document.createElement("p");
      questionText.textContent = question.question;

      const image = document.createElement("img");
      image.src = question.content;
      image.alt = "Question Image";
      image.className = "quiz__image";

      questionContainer.appendChild(questionText);
      questionContainer.appendChild(image);
   }

   const optionsContainer = document.querySelector(".quiz__choices");
   optionsContainer.innerHTML = "";
   selectedAnswer = null; // Reset selected answer for the new question

   question.options.forEach(option => {
      const button = document.createElement("button");

      button.textContent = option;
      button.className = "choice";
      button.onclick = () => selectAnswer(option, question.correct, button);
      optionsContainer.appendChild(button);
   });

   document.querySelector(".next__button").style.display = "block"; // Show the Next button
}

function selectAnswer(option, correctAnswer, button) {
   if (selectedButton) {
      selectedButton.classList.remove("selected"); // Remove "selected" class from the previously selected button
   }

   selectedButton = button;
   button.classList.add("selected"); // Add "selected" class to the current button
   selectedAnswer = option === correctAnswer; // Store whether the selected answer is correct
}

function handleNext() {
   if (selectedAnswer === null) {
      alert("Please select an answer before proceeding.");
      return;
   }

   if (selectedAnswer) {
      totalScore += 20;
      totalRight++;
   } else if (totalScore > 0) {
      totalScore -= 10; // Deduct points only if totalScore is greater than 0

      totalWrong++;
   }
   questionsAnswered++;

   

   if (totalScore > highestScore) highestScore += 20;

   updateProgress();

   updateProgressBar();


   currentQuestionIndex++;
   if (currentQuestionIndex < subjects[currentSubject].quiz.length) {
      showQuestion();
   } else {
      currentQuestionIndex++
      setTimeout(() => {
         closeQuiz();
         document.querySelector('.progress__bar').style.width = '0';
      }, 500)
   }
}

function updateProgress() {
   const progressBar = document.querySelector(".points__container");
   progressBar.textContent = `${totalScore}`;
}

function closeQuiz() {
   document.querySelector(".quiz").style.display = "none";
}

// Attach event listener to Next button
const nextButton = document.querySelector(".next__button");
nextButton.addEventListener("click", handleNext);

const closePopup = () => {
   document.querySelector('.instructions').style.display = 'none';
}

const resetScore = () => {
   totalScore = 0;
   updateProgress();
   document.querySelector('.progress__bar').style.width = '0';
   setTimeout(() => closeQuiz(), 500);
}


function showAccount() {
   document.querySelector('.acc__points').innerHTML = highestScore;
   document.querySelector('.acc__qanswered').innerHTML = questionsAnswered;
   document.querySelector('.acc__qright').innerHTML = totalRight;
   document.querySelector('.acc__qwrong').innerHTML = totalWrong;
   // document.querySelector('.').innerHTML = ;
   // document.querySelector('.').innerHTML = ;
   // document.querySelector('.').innerHTML = ;
   // document.querySelector('.').innerHTML = ;

   document.querySelector('.account').style.display = 'block';
}

function hideAccount() {
   document.querySelector('.account').style.display = 'none';
}
