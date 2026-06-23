// Grab HTML elements
const homePage = document.getElementById('home-page');
const questionPage = document.getElementById('question-page');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const topicTitle = document.getElementById('topic-title');
const questionTitle = document.getElementById('question-title');
const timerDisplay = document.getElementById('timer');

let quizData = {}; 
let timerInterval;

// Fetch the external JSON "database" when the page loads
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        quizData = data; 
        console.log("Database loaded successfully!");
    })
    .catch(error => console.error("Error loading the quiz database:", error));

// Function to handle the 3-minute (180 seconds) countdown timer
function startTimer() {
    let duration = 180; // 3 minutes in seconds
    
    timerInterval = setInterval(() => {
        let minutes = parseInt(duration / 60, 10);
        let seconds = parseInt(duration % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDisplay.textContent = minutes + ":" + seconds;

        if (--duration < 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's Up!";
            timerDisplay.style.color = "red";
        }
    }, 1000);
}

// Logic to pick random topic -> random question & show new page
startBtn.addEventListener('click', () => {
    const topics = Object.keys(quizData);
    if (topics.length === 0) {
        alert("Database is still loading, please wait a second.");
        return;
    }
    
    // 1. Randomly select a main topic
    const randomTopicIndex = Math.floor(Math.random() * topics.length);
    const selectedTopicName = topics[randomTopicIndex];
    
    // 2. Get the array of questions for that selected topic
    const questionsList = quizData[selectedTopicName];
    
    // 3. Randomly select a question from that specific topic's array
    const randomQuestionIndex = Math.floor(Math.random() * questionsList.length);
    const selectedQuestion = questionsList[randomQuestionIndex];
    
    // 4. Populate the question page elements
    topicTitle.textContent = selectedTopicName;
    questionTitle.textContent = selectedQuestion.title;
    
    // 5. Switch pages (hide home, show question page)
    homePage.classList.add('hidden');
    questionPage.classList.remove('hidden');
    
    // 6. Start the 3-minute timer
    startTimer();
});

// Logic to go back to the main page
backBtn.addEventListener('click', () => {
    // Stop the timer immediately so it doesn't run in the background
    clearInterval(timerInterval);
    
    // Reset timer display text and color for the next time
    timerDisplay.textContent = "03:00";
    timerDisplay.style.color = "";

    // Switch pages (show home, hide question page)
    questionPage.classList.add('hidden');
    homePage.classList.remove('hidden');
});// Grab HTML elements
const startBtn = document.getElementById('start-btn');
const quizDisplay = document.getElementById('quiz-display');
const topicTitle = document.getElementById('topic-title');
const questionTitle = document.getElementById('question-title');

let quizData = {}; // This will hold the data fetched from JSON

// Fetch the external JSON "database" when the page loads
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        quizData = data; // Store the loaded data into our variable
        console.log("Database loaded successfully!");
    })
    .catch(error => console.error("Error loading the quiz database:", error));

// Logic to pick random topic -> random question
startBtn.addEventListener('click', () => {
    // Make sure data is loaded before allowing clicks
    const topics = Object.keys(quizData);
    if (topics.length === 0) {
        alert("Database is still loading, please wait a second.");
        return;
    }
    
    // 1. Randomly select a main topic
    const randomTopicIndex = Math.floor(Math.random() * topics.length);
    const selectedTopicName = topics[randomTopicIndex];
    
    // 2. Get the array of questions for that selected topic
    const questionsList = quizData[selectedTopicName];
    
    // 3. Randomly select a question from that specific topic's array
    const randomQuestionIndex = Math.floor(Math.random() * questionsList.length);
    const selectedQuestion = questionsList[randomQuestionIndex];
    
    // 4. Display the chosen topic and question on the webpage
    topicTitle.textContent = selectedTopicName;
    questionTitle.textContent = selectedQuestion.title;
    
    // Reveal the hidden result box
    quizDisplay.classList.remove('hidden');
});
