"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { hasCourseAccess, COURSES } from "@/lib/courseAccess";
import "../../../styles/lessons.css";

export default function Lesson5() {
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

  const LESSON_CONTENT = {
    title: "Financial and Business Planning",
    content: `
      <h2>Building a Sustainable Financial Model</h2>
      <p>Financial planning is essential for the long-term success and autonomy of your nurse practitioner practice. This lesson covers key financial considerations and business strategies.</p>
      
      <h2>Revenue Streams and Billing</h2>
      <p>Understanding multiple revenue sources ensures practice sustainability:</p>
      <ul>
        <li>Insurance billing and contract negotiations</li>
        <li>Medicare and Medicaid reimbursement rates</li>
        <li>Out-of-pocket patient payments and self-pay options</li>
        <li>Telemedicine and virtual visit billing</li>
      </ul>
      
      <h2>Cost Management and Overhead</h2>
      <p>Controlling expenses is as important as generating revenue:</p>
      <ul>
        <li>Managing office space and equipment costs</li>
        <li>Staffing and payroll budgeting</li>
        <li>Insurance, licenses, and professional development expenses</li>
        <li>Technology and electronic health record systems</li>
      </ul>
      
      <h2>Business Structure and Legal Entities</h2>
      <p>Choosing the right business structure impacts taxes and liability:</p>
      <ul>
        <li>Solo practice vs. group practice considerations</li>
        <li>Choosing between LLC, PC, or S-Corp structures</li>
        <li>Understanding liability protection and insurance requirements</li>
        <li>Tax implications of different business structures</li>
      </ul>
      
      <h2>Financial Forecasting and Planning</h2>
      <p>Strategic planning ensures long-term financial success:</p>
      <ul>
        <li>Developing realistic revenue projections</li>
        <li>Creating break-even analyses</li>
        <li>Planning for growth and expansion</li>
        <li>Building emergency funds and reserves</li>
      </ul>
      
      <h2>Professional Financial Guidance</h2>
      <p>Seeking expert advice optimizes financial outcomes:</p>
      <ul>
        <li>Working with healthcare accountants and tax professionals</li>
        <li>Consulting with healthcare lawyers and business advisors</li>
        <li>Understanding financial benchmarks in your specialty</li>
        <li>Continuous financial monitoring and adjustment</li>
      </ul>
    `
  };

  const QUIZ_QUESTIONS = [
    {
      id: 1,
      question: "What is the most important first step in financial planning for your autonomous practice?",
      options: [
        "Immediately expand your patient base",
        "Understand your revenue sources, costs, and create realistic projections",
        "Minimize all spending to maximize profit",
        "Avoid using financial advisors"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "Which business structure typically provides the best liability protection for a solo NP?",
      options: [
        "Sole proprietorship",
        "General partnership",
        "Limited Liability Company (LLC)",
        "None, liability protection is not important"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "What should be included in overhead cost management?",
      options: [
        "Only equipment costs",
        "Office space, staffing, insurance, technology, and professional development",
        "Only staff salaries",
        "Overhead costs should not be managed"
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      question: "Why is break-even analysis important for your practice?",
      options: [
        "It helps you understand when your practice becomes profitable",
        "It's not important for healthcare practices",
        "It only applies to large corporations",
        "It determines patient care quality"
      ],
      correctAnswer: 0
    },
    {
      id: 5,
      question: "Which professional advisors should an autonomous NP consult?",
      options: [
        "No advisors needed",
        "Only tax accountants",
        "Healthcare accountants, lawyers, and business advisors",
        "Only a general accountant"
      ],
      correctAnswer: 2
    }
  ];

  const handleAnswerSelect = (questionId, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerIndex
    });
  };

  const handleQuizSubmit = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const percentage = (correct / QUIZ_QUESTIONS.length) * 100;
    setScore(percentage);
    setQuizSubmitted(true);
  };

  if (loading) return <div className="lesson-container"><p>Loading...</p></div>;
  if (!hasAccess) return null;

  return (
    <div className="lesson-container">
      <button className="lesson-nav-button" onClick={() => router.back()}>← Back</button>
      
      <div className="lesson-header">
        <h1>{LESSON_CONTENT.title}</h1>
        <span className="lesson-badge">Lesson 5 of 6</span>
      </div>

      {!showQuiz ? (
        <>
          <div className="lesson-content" dangerouslySetInnerHTML={{ __html: LESSON_CONTENT.content }} />
          <button className="quiz-button" onClick={() => setShowQuiz(true)}>Take Quiz</button>
        </>
      ) : !quizSubmitted ? (
        <>
          <div className="quiz-section">
            <h2>Lesson 5 Quiz</h2>
            {QUIZ_QUESTIONS.map(q => (
              <div key={q.id} className="quiz-question">
                <p>{q.question}</p>
                {q.options.map((option, idx) => (
                  <label key={idx}>
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      checked={quizAnswers[q.id] === idx}
                      onChange={() => handleAnswerSelect(q.id, idx)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
            <button className="quiz-submit-button" onClick={handleQuizSubmit}>Submit Quiz</button>
          </div>
        </>
      ) : (
        <div className="quiz-results">
          <h3>Quiz Results</h3>
          <div className="quiz-score">{Math.round(score)}%</div>
          <p className="quiz-message">
            {score >= 70 ? "Excellent! You're ready for the final lesson." : "Keep studying and try again!"}
          </p>
          <div className="quiz-action-buttons">
            <button className="quiz-retake-button" onClick={() => {
              setQuizSubmitted(false);
              setQuizAnswers({});
              setScore(0);
            }}>Retake Quiz</button>
            {score >= 70 && (
              <button className="quiz-next-button" onClick={() => router.push('/courses/autonomous-np/lesson-6')}>
                Final Lesson →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
