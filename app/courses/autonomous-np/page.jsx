"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { hasCourseAccess, COURSES } from "@/lib/courseAccess";
import "../../styles/hero.css";
import "../../styles/cards.css";
import "../../styles/lessons.css";

const LESSONS = [
  {
    id: "lesson-1",
    title: "Understanding Nurse Practitioner Roles",
    description: "Learn the fundamentals of nurse practitioner practice and regulatory landscape."
  },
  {
    id: "lesson-2",
    title: "Licensure and Certification Requirements",
    description: "Explore the steps needed to obtain your NP license and certifications."
  },
  {
    id: "lesson-3",
    title: "Legal and Regulatory Compliance",
    description: "Master the legal framework for autonomous NP practice in your state."
  },
  {
    id: "lesson-4",
    title: "Clinical Practice Management",
    description: "Develop skills for managing your patient care and clinical operations."
  },
  {
    id: "lesson-5",
    title: "Financial and Business Planning",
    description: "Create a sustainable business model for your autonomous practice."
  },
  {
    id: "lesson-6",
    title: "Building Your Autonomous Practice",
    description: "Final steps to launching and growing your independent NP practice."
  }
];

export default function AutonomousNPCourse() {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div>
        <main>
          <section className="my-learning">
            <h1>Loading course...</h1>
          </section>
        </main>
      </div>
    );
  }

  if (!hasAccess) {
    return null;
  }

  return (
    <div>
      <main>
        <section className="my-learning">
          <div className="course-intro">
            <h1>How to Become an Autonomous Nurse Practitioner</h1>
            <p>Complete all 6 lessons and quizzes to master autonomous NP practice</p>
          </div>
        </section>

        <section className="courses-grid" style={{ padding: "2rem" }}>
          {LESSONS.map((lesson, index) => (
            <div key={lesson.id} className="course-card">
              <div className="lesson-badge">
                Lesson {index + 1} of 6
              </div>
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
              <button onClick={() => router.push(`/courses/autonomous-np/${lesson.id}`)}>
                Start Lesson
              </button>
            </div>
          ))}
        </section>
      </main>
      <footer></footer>
    </div>
  );
}
