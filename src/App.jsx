
import React, { useState, useEffect, useMemo } from 'react';

// ============================================
// THE MIRROR TEST - Complete Application
// ============================================

// Questions data with scoring
const questionsData = [
  {
    id: 'time',
    category: 'core',
    question: 'When you think about your average day, it feels like:',
    options: [
      { text: 'A game I\'m optimizing', score: 3 },
      { text: 'What days are supposed to feel like', score: -2 },
      { text: 'Something is fundamentally off about how time works here', score: 3 },
      { text: 'Time has glitched — I\'ve experienced missing time, timeline shifts, or moments that didn\'t belong', score: 5 },
    ],
  },
  {
    id: 'rules',
    category: 'core',
    question: 'When you encounter a rule that doesn\'t make sense:',
    options: [
      { text: 'I find the workaround', score: 2 },
      { text: 'I assume there\'s a reason I don\'t see', score: -3 },
      { text: 'I feel a physical discomfort', score: 3 },
      { text: 'I question who made it and why', score: 4 },
      { text: 'Above my pay grade — someone smarter figured it out', score: -4 },
    ],
  },
  {
    id: 'dreams',
    category: 'core',
    question: 'Your relationship with dreams:',
    options: [
      { text: 'I rarely remember them / they\'re noise', score: -2 },
      { text: 'They reflect my daily life mostly', score: -1 },
      { text: 'I\'ve had dreams that felt more real than waking', score: 3 },
      { text: 'I\'ve had dreams with memories I never lived, or returned to dreams after waking', score: 5 },
    ],
  },
  {
    id: 'death',
    category: 'core',
    question: 'When you think about death:',
    options: [
      { text: 'I don\'t — it\'s not useful', score: -2 },
      { text: 'It\'s natural, everyone dies', score: -1 },
      { text: 'Something about the standard story doesn\'t sit right', score: 3 },
      { text: 'I\'m not sure death is what they say it is', score: 4 },
    ],
  },
  {
    id: 'childhood',
    category: 'core',
    question: 'Looking back at your childhood self:',
    options: [
      { text: 'I was naive; I\'ve optimized since', score: 1 },
      { text: 'I was normal; I grew up', score: -2 },
      { text: 'I knew something then that I\'ve lost access to', score: 4 },
      { text: 'I\'m not sure that was entirely me', score: 5 },
    ],
  },
  {
    id: 'coincidence',
    category: 'core',
    question: 'When something strangely coincidental happens:',
    options: [
      { text: 'Statistics — it was bound to happen', score: -3 },
      { text: 'Interesting, then I move on', score: -1 },
      { text: 'I feel like I\'m being watched or guided', score: 3 },
      { text: 'I document it or sit with it — I don\'t believe in chance', score: 4 },
    ],
  },
  {
    id: 'people',
    category: 'core',
    question: 'Most people around you seem:',
    options: [
      { text: 'Predictable, manageable', score: 1 },
      { text: 'Normal, like me', score: -2 },
      { text: 'Asleep in a way I can\'t articulate', score: 3 },
      { text: 'Some feel real, some feel empty', score: 4 },
      { text: 'I question whether anyone else here is actually real', score: 5 },
    ],
  },
  {
    id: 'decisions',
    category: 'core',
    question: 'When facing a truly difficult choice with no clear right answer:',
    options: [
      { text: 'I weigh pros and cons until one option wins mathematically', score: 1 },
      { text: 'I ask people I trust what they would do', score: -3 },
      { text: 'I argue with myself — there\'s a debate happening inside', score: 3 },
      { text: 'I wait in silence until something surfaces that isn\'t quite "me" deciding', score: 5 },
    ],
  },
  {
    id: 'novel',
    category: 'core',
    question: 'You encounter a problem you\'ve never seen before and have no reference for:',
    options: [
      { text: 'I research how others have solved similar things', score: -1 },
      { text: 'I try approaches that worked before and adapt them', score: -2 },
      { text: 'I sit with it until something forms that I didn\'t have before', score: 4 },
      { text: 'I sometimes receive the solution rather than construct it', score: 5 },
      { text: 'I Google it and do what others did', score: -3 },
    ],
  },
  {
    id: 'solitude',
    category: 'meta',
    question: 'When you are completely alone — no phone, no distractions, no one coming home:',
    options: [
      { text: 'I fill the space with tasks or plans', score: -2 },
      { text: 'I feel the absence of others', score: -1 },
      { text: 'I feel more accompanied than usual, not less', score: 4 },
      { text: 'I notice a voice or presence that I can\'t fully explain', score: 5 },
    ],
  },
  {
    id: 'fiction',
    category: 'meta',
    question: 'When you encounter a story (book, movie, game) that grips you:',
    options: [
      { text: 'I appreciate the craft', score: 1 },
      { text: 'I enjoy the escape', score: -1 },
      { text: 'I feel like it\'s telling me something about my life', score: 3 },
      { text: 'I\'ve envied the characters\' reality', score: 4 },
      { text: 'It feels like a message meant for me, sometimes like I wrote it', score: 5 },
    ],
  },
  {
    id: 'thinking',
    category: 'meta',
    question: 'When you\'re thinking through something complex:',
    options: [
      { text: 'I see flowcharts, lists, structures', score: 1 },
      { text: 'I talk to myself silently, like a conversation', score: 2 },
      { text: 'Something speaks that doesn\'t feel like "me" speaking', score: 4 },
      { text: 'I don\'t hear or see anything — conclusions just arrive', score: 0 },
      { text: 'I\'m aware of multiple layers — an observer watching the thinker', score: 5 },
    ],
  },
  {
    id: 'color',
    category: 'null',
    question: 'Which of these colors feels heavier?',
    options: [
      { text: 'Green', score: 0 },
      { text: 'Red', score: 0 },
      { text: 'Blue', score: 0 },
      { text: 'Colors don\'t have weight', score: 0 },
    ],
  },
  {
    id: 'shape',
    category: 'null',
    question: 'Which shape feels friendlier?',
    options: [
      { text: 'Circle', score: 0 },
      { text: 'Triangle', score: 0 },
      { text: 'Rectangle', score: 0 },
      { text: 'None — shapes don\'t have personalities', score: 0 },
    ],
  },
  {
    id: 'spiritual',
    category: 'negative',
    question: 'I believe my highest purpose is to return to the spiritual collective / God / universal oneness we originally came from.',
    options: [
      { text: 'Strongly Agree', score: -5 },
      { text: 'Agree', score: -3 },
      { text: 'Neutral', score: 0 },
      { text: 'Disagree', score: 2 },
      { text: 'Strongly Disagree', score: 4 },
    ],
  },
  {
    id: 'dogRating',
    category: 'negative',
    question: 'On a scale of 1-5, how much do you like dogs?',
    options: [
      { text: '1 — Indifferent, they\'re fine', score: 2 },
      { text: '2 — I like them but they\'re animals', score: 1 },
      { text: '3 — I enjoy dogs, solid companions', score: 0 },
      { text: '4 — Dogs are better than most people', score: -2 },
      { text: '5 — Dogs are better than most humans', score: -4 },
    ],
  },
  {
    id: 'dogTraits',
    category: 'negative',
    question: 'What\'s your favorite trait about dogs?',
    options: [
      { text: 'Their loyalty no matter what', score: -2 },
      { text: 'How excited they are to see me', score: -3 },
      { text: 'They keep me company without demands', score: -1 },
      { text: 'I can\'t decide — they\'re too wonderful', score: -4 },
      { text: 'I don\'t understand the fuss — they can\'t hold a conversation and die in 12 years', score: 4 },
      { text: 'I\'d prefer not to answer this question', score: -5 },
    ],
  },
];

// Write-in question (always last)
const writeInQuestion = {
  id: 'writeIn',
  category: 'meta',
  question: 'Were there any questions where none of the options fit your actual experience? If so, which question(s) and what would you have answered?',
  isWriteIn: true,
};

// Result categories
const categories = {
  mainCharacter: {
    title: 'Main Character',
    range: [45, 100],
    description: 'You carry your own script. The stage bends around you, not the other way around. You\'ve always sensed the edges of the set. The question is what you do with that awareness.',
  },
  coStar: {
    title: 'Co-Star',
    range: [15, 44],
    description: 'You are conscious and impactful, but often wait for another spark to ignite action. You see more than most, act less than you could. The capacity is there. The permission you\'re waiting for won\'t come from outside.',
  },
  liminal: {
    title: 'Liminal / Glitch',
    range: [-5, 14],
    description: 'The system can\'t classify you. You exist between categories — not fully asleep, not fully awake. This is rare, and perhaps intentional. The threshold is where change happens.',
  },
  programmed: {
    title: 'Programmed Role',
    range: [-25, -6],
    description: 'You function well within the script provided, but rarely alter it yourself. The loops feel comfortable because they\'re familiar. Discomfort is data. Pay attention to what makes you uneasy.',
  },
  npc: {
    title: 'NPC',
    range: [-100, -26],
    description: 'You react to the world but rarely write your own lines. The script runs deep. This result is not a death sentence — it\'s a mirror. What you do with the reflection is the only thing that matters.',
  },
};

// Get category based on score
const getCategory = (score) => {
  if (score >= 45) return categories.mainCharacter;
  if (score >= 15) return categories.coStar;
  if (score >= -5) return categories.liminal;
  if (score >= -25) return categories.programmed;
  return categories.npc;
};

// Shuffle array (Fisher-Yates)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Prepare questions with special ordering rules
const prepareQuestions = () => {
  // Separate dog questions from others
  const dogRating = questionsData.find(q => q.id === 'dogRating');
  const dogTraits = questionsData.find(q => q.id === 'dogTraits');
  const otherQuestions = questionsData.filter(q => q.id !== 'dogRating' && q.id !== 'dogTraits');
  
  // Shuffle non-dog questions
  const shuffled = shuffleArray(otherQuestions);
  
  // Insert dog questions together at random position (but not last)
  const insertIndex = Math.floor(Math.random() * (shuffled.length - 1));
  shuffled.splice(insertIndex, 0, dogRating, dogTraits);
  
  // Add write-in question at the end
  shuffled.push(writeInQuestion);
  
  return shuffled;
};

// ============================================
// COMPONENTS
// ============================================

// Start Screen
const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <div className="start-content">
        <h1 className="title">The Mirror Test</h1>
        <p className="subtitle">A pattern recognition questionnaire</p>
        <div className="divider"></div>
        <p className="tagline">A mirror, not a diagnosis.</p>
        <p className="tagline-small">18 questions. No wrong answers. Only reflections.</p>
        <button className="start-button" onClick={onStart}>
          Begin
        </button>
      </div>
      <div className="ambient-glow"></div>
    </div>
  );
};

// Question Screen
const QuestionScreen = ({ question, questionIndex, totalQuestions, onAnswer, onBack, selectedAnswer }) => {
  const [localAnswer, setLocalAnswer] = useState(selectedAnswer || '');
  
  useEffect(() => {
    setLocalAnswer(selectedAnswer || '');
  }, [selectedAnswer, questionIndex]);

  const handleSelect = (optionIndex) => {
    if (!question.isWriteIn) {
      onAnswer(optionIndex);
    }
  };

  const handleWriteInSubmit = () => {
    onAnswer(localAnswer);
  };

  return (
    <div className="question-screen">
      <div className="progress-container">
        <div className="progress-text">{questionIndex + 1} / {totalQuestions}</div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="question-content">
        <p className="question-text">{question.question}</p>
        
        {question.isWriteIn ? (
          <div className="write-in-container">
            <textarea
              className="write-in-input"
              placeholder="Optional: Share your thoughts here..."
              value={localAnswer}
              onChange={(e) => setLocalAnswer(e.target.value)}
              rows={4}
            />
            <button className="continue-button" onClick={handleWriteInSubmit}>
              {localAnswer.trim() ? 'Continue' : 'Skip'}
            </button>
          </div>
        ) : (
          <div className="options-container">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedAnswer === index ? 'selected' : ''}`}
                onClick={() => handleSelect(index)}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {questionIndex > 0 && (
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      )}
    </div>
  );
};

// Result Screen
const ResultScreen = ({ score, category, writeInResponse, onRestart }) => {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mailchimp configuration
  const MAILCHIMP_URL = 'https://gmail.us6.list-manage.com/subscribe/post';
  const MAILCHIMP_U = '43218b4305c3ec21a974bae3a';
  const MAILCHIMP_ID = 'b533ea5f40';

  const handleShare = async () => {
    const shareText = `I took The Mirror Test. Result: ${category.title}. Take yours:`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'The Mirror Test',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    
    // Create hidden form for Mailchimp submission
    const form = document.createElement('form');
    form.action = `${MAILCHIMP_URL}?u=${MAILCHIMP_U}&id=${MAILCHIMP_ID}`;
    form.method = 'POST';
    form.target = '_blank';
    form.style.display = 'none';
    
    // Email field
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'EMAIL';
    emailInput.value = email;
    form.appendChild(emailInput);
    
    // Category field (MERGE7 - Result)
    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.name = 'MERGE7';
    categoryInput.value = category.title;
    form.appendChild(categoryInput);
    
    // Score field (MERGE8 - numeric score for analytics)
    const scoreInput = document.createElement('input');
    scoreInput.type = 'text';
    scoreInput.name = 'MERGE8';
    scoreInput.value = score.toString();
    form.appendChild(scoreInput);
    
    // Honeypot field (bot protection)
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = `b_${MAILCHIMP_U}_${MAILCHIMP_ID}`;
    honeypot.value = '';
    honeypot.tabIndex = -1;
    honeypot.style.position = 'absolute';
    honeypot.style.left = '-5000px';
    form.appendChild(honeypot);
    
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    
    setEmailSubmitted(true);
  };

  return (
    <div className="result-screen">
      <div className="result-content">
        <div className="result-label">Your reflection:</div>
        <h1 className="result-title">{category.title}</h1>
        <div className="result-divider"></div>
        <p className="result-description">{category.description}</p>
        
        <button className="share-button" onClick={handleShare}>
          {copied ? 'Copied!' : 'Share Result'}
        </button>

        <div className="support-section">
          <p className="support-text">
            This test costs nothing. It was built to be found, not sold.
          </p>
          <p className="support-text">
            If it meant something to you and you want to support what comes next:
          </p>
          <a 
            href="https://ko-fi.com/remembr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="kofi-button"
          >
            Leave a signal ↗
          </a>
          <p className="support-note">No pressure. No tracking. Just resonance.</p>
        </div>

        <div className="email-section">
          {!emailSubmitted ? (
            <>
              <p className="email-text">
                This test is one fragment of something larger being built. 
                If you want to know when the door opens, leave your email.
              </p>
              <p className="email-subtext">No spam. No sales. Just a signal when it's time.</p>
              <form onSubmit={handleEmailSubmit} className="email-form">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                />
                <button type="submit" className="email-submit" disabled={!email}>
                  Signal me
                </button>
              </form>
            </>
          ) : (
            <p className="email-confirmed">Signal received. We'll find you when it's time.</p>
          )}
        </div>

        <p className="closing-text">
          Or close this tab and forget you were ever here. That's allowed too.
        </p>

        <button className="restart-button" onClick={onRestart}>
          Take again
        </button>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================

export default function App() {
  const [screen, setScreen] = useState('start'); // start, question, result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [writeInResponse, setWriteInResponse] = useState('');
  
  // Prepare randomized questions once
  const questions = useMemo(() => prepareQuestions(), []);

  const handleStart = () => {
    setScreen('question');
    setCurrentQuestion(0);
    setAnswers({});
    setWriteInResponse('');
  };

  const handleAnswer = (answer) => {
    const question = questions[currentQuestion];
    
    if (question.isWriteIn) {
      setWriteInResponse(answer);
    } else {
      setAnswers(prev => ({
        ...prev,
        [question.id]: answer
      }));
    }

    // Move to next question or results
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setScreen('result');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // Calculate score
  const calculateScore = () => {
    let total = 0;
    
    Object.entries(answers).forEach(([questionId, answerIndex]) => {
      const question = questionsData.find(q => q.id === questionId);
      if (question && question.options[answerIndex]) {
        total += question.options[answerIndex].score;
      }
    });

    // Bonus for thoughtful write-in
    if (writeInResponse && writeInResponse.trim().length > 20) {
      total += 3;
    }

    return total;
  };

  const score = calculateScore();
  const category = getCategory(score);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --bg-deep: #0a0a0c;
          --bg-surface: #111114;
          --text-primary: #e8e6e3;
          --text-secondary: #8a8a8f;
          --text-muted: #5a5a5f;
          --accent: #c9a55c;
          --accent-dim: #8a7340;
          --border: #2a2a2f;
          --glow: rgba(201, 165, 92, 0.15);
        }

        body {
          font-family: 'Cormorant Garamond', Georgia, serif;
          background: var(--bg-deep);
          color: var(--text-primary);
          min-height: 100vh;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        #root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* START SCREEN */
        .start-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .ambient-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--glow) 0%, transparent 70%);
          pointer-events: none;
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
        }

        .start-content {
          text-align: center;
          position: relative;
          z-index: 1;
          max-width: 500px;
        }

        .title {
          font-size: 3.5rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .subtitle {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .divider {
          width: 60px;
          height: 1px;
          background: var(--accent);
          margin: 2rem auto;
        }

        .tagline {
          font-size: 1.4rem;
          font-style: italic;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .tagline-small {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-bottom: 3rem;
        }

        .start-button {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          padding: 1rem 3rem;
          background: transparent;
          border: 1px solid var(--accent);
          color: var(--accent);
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.1em;
        }

        .start-button:hover {
          background: var(--accent);
          color: var(--bg-deep);
        }

        /* QUESTION SCREEN */
        .question-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          max-width: 700px;
          margin: 0 auto;
          width: 100%;
        }

        .progress-container {
          margin-bottom: 3rem;
        }

        .progress-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
          letter-spacing: 0.1em;
        }

        .progress-bar {
          height: 2px;
          background: var(--border);
          border-radius: 1px;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent);
          transition: width 0.3s ease;
          border-radius: 1px;
        }

        .question-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .question-text {
          font-size: 1.5rem;
          line-height: 1.5;
          margin-bottom: 2.5rem;
          color: var(--text-primary);
        }

        .options-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .option-button {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          padding: 1.25rem 1.5rem;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
          line-height: 1.4;
        }

        .option-button:hover {
          border-color: var(--accent-dim);
          color: var(--text-primary);
        }

        .option-button.selected {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(201, 165, 92, 0.05);
        }

        .write-in-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .write-in-input {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          padding: 1.25rem;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          color: var(--text-primary);
          resize: vertical;
          min-height: 120px;
          line-height: 1.5;
        }

        .write-in-input::placeholder {
          color: var(--text-muted);
        }

        .write-in-input:focus {
          outline: none;
          border-color: var(--accent-dim);
        }

        .continue-button {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          padding: 1rem 2rem;
          background: transparent;
          border: 1px solid var(--accent);
          color: var(--accent);
          cursor: pointer;
          align-self: flex-end;
          transition: all 0.2s ease;
        }

        .continue-button:hover {
          background: var(--accent);
          color: var(--bg-deep);
        }

        .back-button {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          margin-top: 2rem;
          align-self: flex-start;
          transition: color 0.2s ease;
        }

        .back-button:hover {
          color: var(--text-secondary);
        }

        /* RESULT SCREEN */
        .result-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .result-content {
          max-width: 600px;
          text-align: center;
        }

        .result-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .result-title {
          font-size: 3rem;
          font-weight: 500;
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .result-divider {
          width: 80px;
          height: 1px;
          background: var(--border);
          margin: 1.5rem auto;
        }

        .result-description {
          font-size: 1.25rem;
          line-height: 1.7;
          color: var(--text-secondary);
          font-style: italic;
          margin-bottom: 2.5rem;
        }

        .share-button {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 3rem;
        }

        .share-button:hover {
          border-color: var(--text-secondary);
          color: var(--text-primary);
        }

        .support-section {
          padding: 2rem 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          margin-bottom: 2rem;
        }

        .support-text {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .kofi-button {
          display: inline-block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          padding: 0.75rem 1.5rem;
          background: transparent;
          border: 1px solid var(--accent);
          color: var(--accent);
          text-decoration: none;
          margin: 1rem 0;
          transition: all 0.2s ease;
        }

        .kofi-button:hover {
          background: var(--accent);
          color: var(--bg-deep);
        }

        .support-note {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .email-section {
          padding: 2rem 0;
          margin-bottom: 2rem;
        }

        .email-text {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .email-subtext {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .email-form {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .email-input {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          padding: 0.75rem 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          color: var(--text-primary);
          min-width: 220px;
        }

        .email-input:focus {
          outline: none;
          border-color: var(--accent-dim);
        }

        .email-submit {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          padding: 0.75rem 1.25rem;
          background: var(--accent);
          border: none;
          color: var(--bg-deep);
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .email-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .email-confirmed {
          font-style: italic;
          color: var(--accent);
        }

        .closing-text {
          font-size: 0.9rem;
          color: var(--text-muted);
          font-style: italic;
          margin-bottom: 2rem;
        }

        .restart-button {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          padding: 0.5rem 1rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          text-decoration: underline;
          transition: color 0.2s ease;
        }

        .restart-button:hover {
          color: var(--text-secondary);
        }

        /* RESPONSIVE */
        @media (max-width: 600px) {
          .title {
            font-size: 2.5rem;
          }

          .question-text {
            font-size: 1.25rem;
          }

          .option-button {
            font-size: 1rem;
            padding: 1rem;
          }

          .result-title {
            font-size: 2.25rem;
          }

          .result-description {
            font-size: 1.1rem;
          }
        }
      `}</style>

      {screen === 'start' && <StartScreen onStart={handleStart} />}
      
      {screen === 'question' && (
        <QuestionScreen
          question={questions[currentQuestion]}
          questionIndex={currentQuestion}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onBack={handleBack}
          selectedAnswer={answers[questions[currentQuestion]?.id]}
        />
      )}
      
      {screen === 'result' && (
        <ResultScreen
          score={score}
          category={category}
          writeInResponse={writeInResponse}
          onRestart={handleStart}
        />
      )}
    </>
  );
}
