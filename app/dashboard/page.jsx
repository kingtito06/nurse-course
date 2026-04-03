"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { getUserCourseAccess, COURSES, COURSE_NAMES } from "@/lib/courseAccess";
import "../styles/hero.css";
import "../styles/cards.css";

export default function Dashboard() {
  const router = useRouter();
  const [courseAccess, setCourseAccess] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/signup");
        return;
      }

      // Fetch user's course access
      const access = await getUserCourseAccess();
      setCourseAccess(access);
      setLoading(false);
    };
    checkUser();
  }, [router]);

  // Get courses the user has access to
  const accessibleCourses = Object.entries(courseAccess)
    .filter(([courseId, hasAccess]) => hasAccess)
    .map(([courseId]) => ({
      id: courseId,
      name: COURSE_NAMES[courseId] || courseId
    }));

  if (loading) {
    return (
      <div>
        <main>
          <section className="my-learning">
            <h1>My Learning Dashboard</h1>
            <p>Loading your courses...</p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div>
      <main>
        <section className="my-learning">
          <h1>My Learning Dashboard</h1>
          {accessibleCourses.length > 0 ? (
            <div className="courses-grid">
              {accessibleCourses.map((course) => (
                <div key={course.id} className="course-card">
                  <h3>{course.name}</h3>
                  <p>Start learning this course</p>
                  <button onClick={() => router.push(`/courses/${course.id}`)}>
                    Continue Learning
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-courses">
              <p>You don't have access to any courses yet.</p>
              <button onClick={() => router.push("/pricing")}>
                Browse Courses
              </button>
            </div>
          )}
        </section>
      </main>
      <footer></footer>
    </div>
  );
}
