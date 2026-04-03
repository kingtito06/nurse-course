"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { hasCourseAccess, COURSES } from "@/lib/courseAccess";
import "../../../styles/lessons.css";

export default function Lesson4() {
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
    title: "Clinical Practice Management",
    content: `
      <h2>Building Your Clinical Practice Foundation</h2>
      <p>As an autonomous nurse practitioner, successful clinical management requires strategic planning, strong organizational systems, and best practices in patient care delivery. This lesson covers essential aspects of managing a clinical practice.</p>
      
      <h2>Patient Flow and Scheduling Systems</h2>
      <p>Efficient patient scheduling is critical for practice success. Key considerations include:</p>
      <ul>
        <li>Implementing electronic health record (EHR) systems for efficient scheduling</li>
        <li>Balancing appointment types and patient acuity levels</li>
        <li>Managing walk-in patients and emergencies</li>
        <li>Scheduling time for documentation and follow-up communications</li>
      </ul>
      
      <h2>Clinical Protocols and Standardization</h2>
      <p>Developing clinical protocols ensures consistent, quality care:</p>
      <ul>
        <li>Creating evidence-based clinical protocols for common presentations</li>
        <li>Establishing referral criteria and processes</li>
        <li>Implementing quality improvement measures</li>
        <li>Maintaining compliance with state and federal healthcare regulations</li>
      </ul>
      
      <h2>Team Communication and Collaboration</h2>
      <p>Building effective teams that support autonomous practice:</p>
      <ul>
        <li>Collaborating with other healthcare providers</li>
        <li>Managing medical assistants and support staff</li>
        <li>Establishing clear communication protocols</li>
        <li>Creating a culture of continuous improvement</li>
      </ul>
      
      <h2>Documentation Best Practices</h2>
      <p>Proper documentation is essential for legal protection and continuity of care:</p>
      <ul>
        <li>Comprehensive and timely note-taking in EHR systems</li>
        <li>Meeting legal requirements for documentation</li>
        <li>Maintaining confidentiality and HIPAA compliance</li>
        <li>Using documentation for clinical decision support</li>
      </ul>
    `
  };

  const QUIZ_QUESTIONS = [
    {
      id: 1,
      question: "Which of the following is most important when scheduling patients in an autonomous practice?",
      options: [
        "Scheduling all patients back-to-back to maximize efficiency",
        "Balancing appointment types, patient acuity, and allowing time for documentation",
        "Allowing only 15 minutes per patient regardless of complexity",
        "Scheduling all patients during specific hours only"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "What is the primary purpose of developing clinical protocols?",
      options: [
        "To restrict clinical decision-making",
        "To ensure consistent, evidence-based care and regulatory compliance",
        "To reduce patient autonomy in treatment decisions",
        "To standardize all patient encounters identically"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "When managing a clinical team, what is a critical communication element?",
      options: [
        "Minimal staff interaction to improve efficiency",
        "Clear communication protocols that define roles and expectations",
        "All decisions made independently by the NP",
        "No need for established procedures"
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      question: "Which aspect of documentation is mandatory for legal protection?",
      options: [
        "Brief, minimal documentation to save time",
        "Comprehensive, timely documentation that meets legal and clinical standards",
        "Documentation only for abnormal findings",
        "Documentation completed weeks after patient encounters"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "How should an autonomous NP establish clinical protocols?",
      options: [
        "Copy protocols from other practices without modification",
        "Develop evidence-based protocols tailored to their patient population and practice setting",
        "Follow only their personal experience without evidence",
        "Avoid protocols to maintain complete clinical independence"
      ],
      correctAnswer: 1
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
        <span className="lesson-badge">Lesson 4 of 6</span>
      </div>

      {!showQuiz ? (
        <>
          <div className="lesson-content" dangerouslySetInnerHTML={{ __html: LESSON_CONTENT.content }} />
          <button className="quiz-button" onClick={() => setShowQuiz(true)}>Take Quiz</button>
        </>
      ) : !quizSubmitted ? (
        <>
          <div className="quiz-section">
            <h2>Lesson 4 Quiz</h2>
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
            {score >= 70 ? "Great job! You've passed this lesson." : "Keep studying and try again!"}
          </p>
          <div className="quiz-action-buttons">
            <button className="quiz-retake-button" onClick={() => {
              setQuizSubmitted(false);
              setQuizAnswers({});
              setScore(0);
            }}>Retake Quiz</button>
            {score >= 70 && (
              <button className="quiz-next-button" onClick={() => router.push('/courses/autonomous-np/lesson-5')}>
                Next Lesson →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
