"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { hasCourseAccess, COURSES } from "@/lib/courseAccess";
import "../../../styles/hero.css";
import "../../../styles/cards.css";
import "../../../styles/lessons.css";

const LESSON_CONTENT = {
  title: "Understanding Nurse Practitioner Roles",
  content: `
    <h2>What is a Nurse Practitioner?</h2>
    <p>A Nurse Practitioner (NP) is an advanced practice nurse with specialized education and clinical experience. NPs are qualified to assess patient needs, order diagnostic tests, prescribe medications, and manage acute and chronic illnesses.</p>
    
    <h2>Historical Context</h2>
    <p>The NP role emerged in the 1960s as a response to a physician shortage. Today, NPs are recognized as independent healthcare providers in many states, with the ability to practice autonomously without physician supervision.</p>
    
    <h2>Core Competencies</h2>
    <ul>
      <li>Advanced assessment and diagnosis</li>
      <li>Clinical decision-making based on evidence</li>
      <li>Patient education and health promotion</li>
      <li>Prescriptive authority</li>
      <li>Care coordination and collaboration</li>
      <li>Leadership and quality improvement</li>
    </ul>
    
    <h2>Types of NPs</h2>
    <p><strong>Family/Primary Care NP:</strong> Provides care across the lifespan in primary care settings</p>
    <p><strong>Acute Care NP:</strong> Specializes in hospital and intensive care settings</p>
    <p><strong>Specialty NPs:</strong> Focus on specific patient populations (pediatric, psychiatric, oncology, etc.)</p>
  `
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "When did the Nurse Practitioner role first emerge?",
    options: [
      "1940s",
      "1960s",
      "1980s",
      "2000s"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which of the following is a core competency of a Nurse Practitioner?",
    options: [
      "Exclusively ordering tests without clinical assessment",
      "Advanced assessment and diagnosis",
      "Working only under direct physician supervision",
      "Limited prescriptive authority"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What type of NP specializes in hospital and intensive care settings?",
    options: [
      "Family/Primary Care NP",
      "Psychiatric NP",
      "Acute Care NP",
      "Oncology NP"
    ],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "The NP role emerged primarily in response to what?",
    options: [
      "Oversupply of physicians",
      "Nursing shortage",
      "Physician shortage",
      "Government mandate"
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "Which is NOT mentioned as a core NP competency?",
    options: [
      "Advanced assessment and diagnosis",
      "Care coordination",
      "Building construction",
      "Patient education"
    ],
    correctAnswer: 2
  }
];

export default function Lesson1() {
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
              <h1>Lesson 1: {LESSON_CONTENT.title}</h1>
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
                <h2>Mini Quiz - Lesson 1</h2>
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
                          onClick={() => router.push("/courses/autonomous-np/lesson-2")}
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
