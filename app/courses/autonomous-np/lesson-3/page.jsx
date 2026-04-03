"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { hasCourseAccess, COURSES } from "@/lib/courseAccess";
import "../../../styles/hero.css";
import "../../../styles/cards.css";
import "../../../styles/lessons.css";

const LESSON_CONTENT = {
  title: "Legal and Regulatory Compliance",
  content: `
    <h2>State Practice Laws</h2>
    <p>NP practice authority varies significantly by state. Some states grant full independent practice authority, while others require some level of physician collaboration or supervision. Understanding your state's specific requirements is critical.</p>
    
    <h2>Prescriptive Authority</h2>
    <p>Prescription privileges vary by state and may be limited to certain drug classes. You must obtain a state-issued prescriber number or DEA number. Some states require NP boards to grant prescriptive authority separately from licensure.</p>
    
    <h2>Collaborative Agreements</h2>
    <p>Even in autonomous practice states, many insurers and hospital privileges require collaborative agreements with physicians. These should clearly define the scope of practice and communication protocols while protecting your independence.</p>
    
    <h2>Liability and Malpractice Insurance</h2>
    <ul>
      <li>Obtain occurrence-based malpractice coverage</li>
      <li>Coverage should include tail coverage if you change insurance</li>
      <li>Ensure adequate coverage limits ($1-3 million recommended)</li>
      <li>Consider employment agreements carefully regarding liability coverage</li>
    </ul>
    
    <h2>Compliance and Documentation</h2>
    <p>Maintain comprehensive clinical documentation to demonstrate quality care and protect against liability. Follow state nursing board requirements and health information standards (HIPAA).</p>
  `
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Is NP practice authority the same in all states?",
    options: [
      "Yes, it's standardized nationally",
      "No, it varies significantly by state",
      "Only in the Northeast",
      "Only in Western states"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "What type of malpractice insurance is recommended for independent practice?",
    options: [
      "Claims-made coverage only",
      "Occurrence-based coverage",
      "No insurance needed",
      "Employer coverage only"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is a collaborative agreement?",
    options: [
      "A contract between two NPs only",
      "A document defining scope of practice with a physician partner",
      "A government-issued license",
      "Insurance documentation"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What is recommended malpractice insurance coverage limit?",
    options: [
      "$100,000",
      "$500,000",
      "$1-3 million",
      "$5 million"
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "Which federal regulation impacts NP clinical documentation?",
    options: [
      "HIPAA",
      "OSHA",
      "FDA",
      "AMA guidelines"
    ],
    correctAnswer: 0
  }
];

export default function Lesson3() {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const checkAccess = async () => {
      const access = await hasCourseAccess(COURSES.AUTONOMOUS_NP);
      if (!access) {
        router.push("/pricing");
        return;
      }
      setHasAccess(true);
      setLoading(false);
    };
    checkAccess();
  }, [router]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answerIndex });
  };

  const handleQuizSubmit = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(Math.round((correctCount / QUIZ_QUESTIONS.length) * 100));
    setQuizSubmitted(true);
  };

  if (loading) return null;
  if (!hasAccess) return null;

  return (
    <div>
      <main>
        <div className="lesson-container">
          <button className="lesson-nav-button" onClick={() => router.push("/courses/autonomous-np")}>
            ← Back to Lessons
          </button>

          <section>
            <div className="lesson-header">
              <h1>Lesson 3: {LESSON_CONTENT.title}</h1>
            </div>
            
            {!showQuiz ? (
              <>
                <div 
                  className="lesson-content"
                  dangerouslySetInnerHTML={{ __html: LESSON_CONTENT.content }}
                />
                <button className="quiz-button" onClick={() => setShowQuiz(true)}>
                  Take Mini Quiz
                </button>
              </>
            ) : (
              <div className="quiz-section">
                <h2>Mini Quiz - Lesson 3</h2>
                {!quizSubmitted ? (
                  <div>
                    {QUIZ_QUESTIONS.map((question, index) => (
                      <div key={question.id} className="quiz-question">
                        <p>{index + 1}. {question.question}</p>
                        <div>
                          {question.options.map((option, optIndex) => (
                            <label key={optIndex}>
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={optIndex}
                                checked={quizAnswers[question.id] === optIndex}
                                onChange={() => handleAnswerSelect(question.id, optIndex)}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button className="quiz-submit-button" onClick={handleQuizSubmit}>
                      Submit Quiz
                    </button>
                  </div>
                ) : (
                  <div className="quiz-results">
                    <h3>Quiz Results</h3>
                    <div className="quiz-score">{score}%</div>
                    <p className="quiz-message">
                      {score >= 70 ? "✅ Passed! Great job!" : "⚠️ Please review the material and try again."}
                    </p>
                    <div className="quiz-action-buttons">
                      {score >= 70 && (
                        <button
                          className="quiz-next-button"
                          onClick={() => router.push("/courses/autonomous-np/lesson-4")}
                        >
                          Next Lesson →
                        </button>
                      )}
                      <button
                        className="quiz-retake-button"
                        onClick={() => {
                          setShowQuiz(false);
                          setQuizAnswers({});
                          setQuizSubmitted(false);
                        }}
                      >
                        Retake Quiz
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
