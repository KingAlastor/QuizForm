const fs = require('fs');
const path = require('path');

function convertQuizFile() {
  const inputFilePath = path.join(__dirname, 'kysimused.txt');
  const outputFilePath = path.join(__dirname, 'kysimused_js.js');

  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    const lines = data.split(/\r?\n/);
    const quiz = [];
    let currentQuestion = null;

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('Q:')) {
        if (currentQuestion) {
          quiz.push(currentQuestion);
        }
        currentQuestion = {
          question: trimmedLine.substring(3).trim(),
          answers: [],
        };
      } else if (trimmedLine.startsWith('•') && currentQuestion) {
        let answerText = trimmedLine.substring(1).trim();
        let isCorrect = false;

        if (answerText.endsWith('(true)')) {
          answerText = answerText.slice(0, -6).trim();
          isCorrect = true;
        }

        currentQuestion.answers.push({
          answer: answerText,
          correct: isCorrect,
        });
      }
    }

    if (currentQuestion) {
      quiz.push(currentQuestion);
    }

    const outputContent = `const quizData = ${JSON.stringify(
      quiz,
      null,
      2
    )};\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = quizData;\n}\n`;

    fs.writeFile(outputFilePath, outputContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing the file:', err);
        return;
      }
      console.log('Successfully converted to kysimused_js.js');
    });
  });
}

convertQuizFile();
