// Quiz Application Logic
class QuizApp {
    constructor() {
        this.questions = quizConfig;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.isAnswerRevealed = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadQuestion();
    }

    bindEvents() {
        const form = document.getElementById('quiz-form');
        const submitBtn = document.getElementById('submit-btn');
        const restartBtn = document.getElementById('restart-btn');

        form.addEventListener('submit', (e) => this.handleSubmit(e));
        restartBtn.addEventListener('click', () => this.restartQuiz());
    }

    loadQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        const questionText = document.getElementById('question-text');
        const answersContainer = document.getElementById('answers-container');
        const questionCounter = document.getElementById('question-counter');
        const progressFill = document.getElementById('progress-fill');
        const submitBtn = document.getElementById('submit-btn');

        // Update question text
        questionText.textContent = question.question;
        
        // Update progress
        questionCounter.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        const progressPercentage = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        progressFill.style.width = `${progressPercentage}%`;

        // Clear previous answers
        answersContainer.innerHTML = '';

        // Create shuffled answers with original indices
        const shuffledAnswers = this.shuffleAnswers(question.answers);

        // Create answer elements
        shuffledAnswers.forEach((answerData, displayIndex) => {
            const answerItem = document.createElement('div');
            answerItem.className = 'answer-item';
            answerItem.innerHTML = `
                <input type="checkbox" id="answer-${displayIndex}" name="answer" value="${answerData.originalIndex}">
                <label for="answer-${displayIndex}">${answerData.answer}</label>
            `;
            answersContainer.appendChild(answerItem);

            // Add click event to the entire answer item
            answerItem.addEventListener('click', (e) => {
                if (e.target.type !== 'checkbox') {
                    const checkbox = answerItem.querySelector('input[type="checkbox"]');
                    checkbox.checked = !checkbox.checked;
                }
                this.updateAnswerItemStyle(answerItem, answerItem.querySelector('input[type="checkbox"]').checked);
            });

            // Add change event to checkbox
            const checkbox = answerItem.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', (e) => {
                this.updateAnswerItemStyle(answerItem, e.target.checked);
            });
        });

        // Reset button text and state
        submitBtn.textContent = 'Submit';
        submitBtn.disabled = false;
        this.isAnswerRevealed = false;

        // Add fade-in animation
        document.querySelector('.question-container').classList.add('fade-in');
        setTimeout(() => {
            document.querySelector('.question-container').classList.remove('fade-in');
        }, 500);
    }

    // Fisher-Yates shuffle algorithm to randomize answers
    shuffleAnswers(answers) {
        // Create array with answers and their original indices
        const answersWithIndices = answers.map((answer, index) => ({
            ...answer,
            originalIndex: index
        }));

        // Shuffle the array
        for (let i = answersWithIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answersWithIndices[i], answersWithIndices[j]] = [answersWithIndices[j], answersWithIndices[i]];
        }

        return answersWithIndices;
    }

    updateAnswerItemStyle(answerItem, isChecked) {
        if (isChecked) {
            answerItem.classList.add('user-selected');
        } else {
            answerItem.classList.remove('user-selected');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (!this.isAnswerRevealed) {
            this.revealAnswers();
        } else {
            this.nextQuestion();
        }
    }

    revealAnswers() {
        const question = this.questions[this.currentQuestionIndex];
        const answerItems = document.querySelectorAll('.answer-item');
        const checkedAnswers = document.querySelectorAll('input[name="answer"]:checked');
        const submitBtn = document.getElementById('submit-btn');

        // Check if any answers are selected
        if (checkedAnswers.length === 0) {
            alert('Please select at least one answer.');
            return;
        }

        // Get user's answers (these are the original indices)
        const userAnswers = Array.from(checkedAnswers).map(input => parseInt(input.value));
        
        // Calculate score for this question
        let isCorrect = this.checkAnswer(userAnswers, question.answers);
        if (isCorrect) {
            this.score++;
        }

        // Reveal correct/incorrect answers
        answerItems.forEach((item, displayIndex) => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const originalIndex = parseInt(checkbox.value); // Get the original index
            const isAnswerCorrect = question.answers[originalIndex].correct;
            const isUserSelected = checkbox.checked;

            // Disable checkbox
            checkbox.disabled = true;

            // Apply styling based on correctness
            if (isAnswerCorrect) {
                item.classList.add('correct');
            } else if (isUserSelected) {
                item.classList.add('incorrect');
            }

            // Remove user-selected class
            item.classList.remove('user-selected');
        });

        // Update submit button
        if (this.currentQuestionIndex < this.questions.length - 1) {
            submitBtn.textContent = 'Next Question';
        } else {
            submitBtn.textContent = 'View Results';
        }

        this.isAnswerRevealed = true;
    }

    checkAnswer(userAnswers, correctAnswers) {
        // Get indices of correct answers
        const correctIndices = correctAnswers
            .map((answer, index) => answer.correct ? index : -1)
            .filter(index => index !== -1);

        // Check if user selected exactly the correct answers
        if (userAnswers.length !== correctIndices.length) {
            return false;
        }

        // Check if all user answers are correct
        return userAnswers.every(answer => correctIndices.includes(answer));
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.questions.length) {
            this.loadQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        const formContainer = document.getElementById('quiz-form');
        const resultsContainer = document.getElementById('results-container');
        const finalScore = document.getElementById('final-score');

        // Hide form and show results
        formContainer.style.display = 'none';
        resultsContainer.style.display = 'block';

        // Calculate percentage
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        // Update score display
        finalScore.innerHTML = `
            Your score: <strong>${this.score}/${this.questions.length}</strong> (${percentage}%)
        `;

        // Add performance message
        let message = '';
        if (percentage >= 80) {
            message = '🎉 Excellent work!';
        } else if (percentage >= 60) {
            message = '👍 Good job!';
        } else {
            message = '📚 Keep studying!';
        }
        
        finalScore.innerHTML += `<br><span style="font-size: 1.2em; margin-top: 10px; display: block;">${message}</span>`;
    }

    restartQuiz() {
        // Reset quiz state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.isAnswerRevealed = false;

        // Show form and hide results
        document.getElementById('quiz-form').style.display = 'block';
        document.getElementById('results-container').style.display = 'none';

        // Load first question
        this.loadQuestion();
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});
