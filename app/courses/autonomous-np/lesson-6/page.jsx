"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { hasCourseAccess, COURSES } from "@/lib/courseAccess";
import "../../../styles/lessons.css";

export default function Lesson6() {
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
    title: "Building Your Autonomous Practice",
    content: `
      <h2>Your Journey to Independence Starts Here</h2>
      <p>Congratulations on progressing through this comprehensive course! This final lesson brings everything together and provides guidance for launching and sustaining your autonomous nurse practitioner practice.</p>
      
      <h2>Integration: Combining All Knowledge</h2>
      <p>Success requires integrating all aspects of autonomous practice:</p>
      <ul>
        <li>Applying clinical knowledge with legal requirements and regulations</li>
        <li>Balancing clinical excellence with business sustainability</li>
        <li>Managing time between patient care, documentation, and practice management</li>
        <li>Maintaining professional growth while running your practice</li>
      </ul>
      
      <h2>Action Steps for Launch</h2>
      <p>Prepare for your transition to autonomous practice:</p>
      <ul>
        <li>Research state regulations and requirements for your practice setting</li>
        <li>Develop your business plan with financial projections</li>
        <li>Secure appropriate liability insurance and malpractice coverage</li>
        <li>Establish your clinical protocols and patient care standards</li>
        <li>Build your network of collaborating physicians and healthcare providers</li>
        <li>Set up your physical space and technology infrastructure</li>
      </ul>
      
      <h2>Overcoming Common Challenges</h2>
      <p>Be prepared for obstacles and have strategies to overcome them:</p>
      <ul>
        <li>Imposter syndrome: Build confidence through evidence-based practice and mentorship</li>
        <li>Work-life balance: Establish boundaries and delegate appropriately</li>
        <li>Financial pressures: Focus on long-term sustainability over short-term profits</li>
        <li>Clinical uncertainty: Develop referral relationships and consultation networks</li>
        <li>Regulatory compliance: Stay informed through continuous professional development</li>
      </ul>
      
      <h2>Continuous Growth and Learning</h2>
      <p>Your education doesn't end with this course:</p>
      <ul>
        <li>Pursue relevant certifications and advanced credentials</li>
        <li>Attend conferences and professional development opportunities</li>
        <li>Stay current with evidence-based practice guidelines</li>
        <li>Engage in peer consultation and collaborative learning</li>
        <li>Consider mentoring other nurse practitioners on their journey</li>
      </ul>
      
      <h2>Your Success is Our Vision</h2>
      <p>We believe in your ability to become an exceptional autonomous nurse practitioner. You have gained the knowledge of licensing requirements, legal frameworks, clinical management principles, and business fundamentals. Now it's time to apply these lessons in your practice and make a difference in your patients' lives.</p>
    `
  };

  const QUIZ_QUESTIONS = [
    {
      id: 1,
      question: "What is the most important factor for successful integration of autonomous practice?",
      options: [
        "Only focusing on clinical expertise",
        "Only managing the business side",
        "Balancing clinical excellence with legal, business, and management requirements",
        "Avoiding all collaboration with other providers"
      ],
      correctAnswer: 2
    },
    {
      id: 2,
      question: "Which action step should you prioritize BEFORE launching your practice?",
      options: [
        "Start seeing patients immediately",
        "Research state regulations and develop a business plan with financial projections",
        "Purchase the most expensive equipment",
        "Avoid any planning and learn on the job"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "How should you address imposter syndrome as an autonomous NP?",
      options: [
        "Ignore it and hope it goes away",
        "Quit and choose a different career",
        "Build confidence through evidence-based practice and mentorship relationships",
        "Never question your clinical decisions"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      question: "What does continuous professional growth involve?",
      options: [
        "Nothing, you finished the course",
        "Pursuing certifications, attending conferences, and staying current with evidence",
        "Only reading textbooks",
        "Avoiding all professional development"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "Why is establishing a network of collaborating providers important?",
      options: [
        "It's not important",
        "To reduce your independence and autonomy",
        "To have consultation resources for clinical uncertainties and case management",
        "Because NPs cannot make any decisions independently"
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
        <span className="lesson-badge">Lesson 6 of 6 - Final Lesson</span>
      </div>

      {!showQuiz ? (
        <>
          <div className="lesson-content" dangerouslySetInnerHTML={{ __html: LESSON_CONTENT.content }} />
          <button className="quiz-button" onClick={() => setShowQuiz(true)}>Take Final Quiz</button>
        </>
      ) : !quizSubmitted ? (
        <>
          <div className="quiz-section">
            <h2>Final Lesson Quiz</h2>
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
            <button className="quiz-submit-button" onClick={handleQuizSubmit}>Submit Final Quiz</button>
          </div>
        </>
      ) : (
        <div className="quiz-results">
          <h3>Course Complete!</h3>
          <div className="quiz-score">{Math.round(score)}%</div>
          <p className="quiz-message">
            {score >= 70 
              ? "🎉 Congratulations! You've successfully completed the Autonomous Nurse Practitioner course. Best of luck on your journey!" 
              : "Great effort! Review the material and retake the quiz to deepen your understanding."}
          </p>
          <div className="quiz-action-buttons">
            <button className="quiz-retake-button" onClick={() => {
              setQuizSubmitted(false);
              setQuizAnswers({});
              setScore(0);
            }}>Retake Quiz</button>
            {score >= 70 && (
              <button className="quiz-next-button" onClick={() => router.push('/dashboard')}>
                Return to Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
