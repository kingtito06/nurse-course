"use client"
import Link from "next/link";
import "../styles/hero.css";
import "../styles/cards.css";

export default function Course() {
  return (
    <div>
      <main>
        <section className="hero">
          <h1>
            Empower Your Practice.
          </h1>
          <p>
            Master the skills to work independently and build your own healthcare practice with our courses on becoming an autonomous nurse practitioner and setting up primary care.
          </p>
        </section>

        <section className="cards">
          <div className="card">
            <h3>
              How to Become an Autonomous Nurse Practitioner
            </h3>
            <p>
              Unlock your full potential as a healthcare professional. This comprehensive 6-lesson course guides you step-by-step through the requirements, legal considerations, clinical management, and best practices to operate independently as a Nurse Practitioner. Perfect for those ready to advance their career and expand their scope of practice.
            </p>
            <Link href="/courses/autonomous-np" aria-label="Explore autonomous nurse practitioner course">
              Start Learning
            </Link>
          </div>

          <div className="card">
            <h3>
              How to Set Up Primary Care
            </h3>
            <p>
              Learn how to launch and manage a thriving primary care practice from the ground up. From choosing the right location and managing patient flow to handling billing and compliance, this course equips you with the tools to succeed in today's healthcare landscape.
            </p>
            <Link href="/pricing" aria-label="View pricing for primary care setup course">
              Learn More
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
