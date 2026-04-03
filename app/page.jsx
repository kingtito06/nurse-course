"use client";
import Link from "next/link";
import "./styles/hero.css";

export default function Home() {
  return (
    <div>
      <main>
        <section className="hero">
          <h1>
            Become an Autonomous Nurse Practitioner
          </h1>
          <p>
            Follow a structured roadmap to go from Registered Nurse to fully licensed, independent Nurse Practitioner with full practice authority.
          </p>
          <Link href="/pricing" aria-label="Start learning">
            Start Learning
          </Link>
        </section>
      </main>
    </div>
  );
}
