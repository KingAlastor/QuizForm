// Quiz Configuration with sample questions
const quizConfig = [
  {
    question: "Which of the following are programming languages?",
    answers: [
      { answer: "JavaScript", correct: true },
      { answer: "HTML", correct: false },
      { answer: "Python", correct: true },
      { answer: "CSS", correct: false }
    ]
  },
  {
    question: "What are the main components of a computer?",
    answers: [
      { answer: "CPU", correct: true },
      { answer: "RAM", correct: true },
      { answer: "Monitor", correct: false },
      { answer: "Storage", correct: true }
    ]
  },
  {
    question: "Which of these are web browsers?",
    answers: [
      { answer: "Chrome", correct: true },
      { answer: "Firefox", correct: true },
      { answer: "Photoshop", correct: false },
      { answer: "Microsoft Word", correct: false }
    ]
  },
  {
    question: "What are characteristics of good code?",
    answers: [
      { answer: "Readable", correct: true },
      { answer: "Maintainable", correct: true },
      { answer: "Complex", correct: false },
      { answer: "Efficient", correct: true }
    ]
  },
  {
    question: "Which are JavaScript frameworks/libraries?",
    answers: [
      { answer: "React", correct: true },
      { answer: "Vue.js", correct: true },
      { answer: "Bootstrap", correct: false },
      { answer: "Node.js", correct: false }
    ]
  }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = quizConfig;
}
