# QuizForm

An interactive quiz application for learning with multiple-choice questions.

## Features

- Multiple-choice questions with checkbox selections
- Immediate feedback showing correct/incorrect answers
- Progress tracking and scoring
- Responsive design
- Easy configuration through `config.js`

## Setup

1. Open `index.html` in your web browser
2. Or use a local server:
   ```bash
   npm run dev
   # or
   npm start
   ```

## Configuration

Edit `config.js` to add your own questions. Each question should have:
- `question`: The question text
- `answers`: Array of 4 answer objects, each with:
  - `answer`: The answer text
  - `correct`: Boolean indicating if this answer is correct

## How to Use

1. Read the question
2. Select one or more answers using checkboxes
3. Click "Submit" to see results
4. Click "Next Question" to continue
5. View your final score at the end

## File Structure

- `index.html` - Main HTML file
- `style.css` - Styling
- `script.js` - Quiz logic
- `config.js` - Question configuration
- `package.json` - Project configuration