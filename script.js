// Grab HTML elements
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