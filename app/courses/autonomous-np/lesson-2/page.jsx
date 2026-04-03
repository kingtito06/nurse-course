"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { hasCourseAccess, COURSES } from "@/lib/courseAccess";
import "../../../styles/hero.css";
import "../../../styles/cards.css";
import "../../../styles/lessons.css";

const LESSON_CONTENT = {
  title: "Licensure and Certification Requirements",
  content: `
    <h2>Educational Requirements</h2>
    <p>To become a Nurse Practitioner, you must first be a licensed Registered Nurse (RN) with at least one year of clinical nursing experience. Then, you must complete a graduate-level NP program accredited by ACEN or CCNE.</p>
    
    <h2>Master's Degree Programs</h2>
    <p>Most NP programs require completion of a Master's degree or Doctor of Nursing Practice (DNP). Programs typically include:</p>
    <ul>
      <li>Advanced pharmacology</li>
      <li>Advanced physiology and pathophysiology</li>
      <li>Advanced health assessment</li>
      <li>Clinical practice courses (500-1000+ hours)</li>
      <li>Research and evidence-based practice</li>
    </ul>
    
    <h2>Certification Exams</h2>
    <p>After graduation, you must pass a certification exam to become a nationally certified NP. Major certifying bodies include:</p>
    <ul>
      <li><strong>AANP:</strong> American Association of Nurse Practitioners</li>
      <li><strong>ANCC:</strong> American Nurses Credentialing Center</li>
      <li><strong>AAPA:</strong> American Academy of Physician Assistants</li>
    </ul>
    
    <h2>State Licensure</h2>
    <p>NP licensure varies by state. Some states require independent state licensure as an NP, while others license NPs through the RN license. Check your state's nursing board for specific requirements.</p>
  `
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the minimum clinical nursing experience required before NP school?",
    options: [
      "No experience needed",
      "6 months",
      "1 year",
      "2 years"
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which credential is NOT typically required for NP certification?",
    options: [
      "RN license",
      "Master's or DNP degree",
      "Certification exam",
      "Medical degree (MD)"
    ],
    correctAnswer: 3
  },
  {
    id: 3,
    question: "How many clinical practice hours are typically required in NP programs?",
    options: [
      "100-200 hours",
      "300-400 hours",
      "500-1000+ hours",
      "2000+ hours"
    ],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "Which organization is a major NP certifying body?",
    options: [
      "AANP",
      "ANCC",
      "Both A and B",
      "Neither A nor B"
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "NP licensure requirements are the same in all states.",
    options: [
      "True",
      "False"
    ],
    correctAnswer: 1
  }
];

export default function Lesson2() {
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
              <h1>Lesson 2: {LESSON_CONTENT.title}</h1>
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
                <h2>Mini Quiz - Lesson 2</h2>
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
                          onClick={() => router.push("/courses/autonomous-np/lesson-3")}
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
