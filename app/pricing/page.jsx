"use client"
import "../styles/hero.css";
import "../styles/pricing.css";

export default function Pricing () {
    return (
        <div>
            <main>
           <section className="hero">
                <h1>
                  Invest in Your Career. Transform Your Future.
                </h1>
                <p>
                  Get started for free, then unlock advanced training at your own pace.
                </p>
                <a>
                  Start Free Course
                </a>
           </section>

           <div className="pricing-wrapper">

           <section className="course1">
            <div className="glass-card">
                <h1>
                    How to Become an Autonomous Nurse Practitioner
                </h1>
                <p>
                    Learn the foundational steps to becoming an autonomous nurse practitioner, including licensing, legal requirements, and patient care strategies.
                </p>
                <a>
                    Start for Free
                </a>
            </div>

           </section>

           
            
                <h1 className="course-title">How to Set Up Primary Care</h1>
            
            
        <section className="course2">
            <div className="glass-card">
                <h1>
                    Primary Care Setup – Phase Access
                </h1>
                <p>
                    $99 per phase
                </p>
                <ul>
                    <li>Buy only the phases you need</li>
                    <li>Step-by-step clinic setup guidance</li>
                    <li>Templates, workflows, and compliance guides</li>
                </ul>
                <a>
                    Choose Your Phase
                </a>
            </div>

            <div className="glass-card">
                <h1>
                    Primary Care Setup – Complete Bundle
                </h1>
                <p>
                    $249 one-time payment (Save $48!)
                </p>
                <ul>
                    <li>Includes ALL phases, present and future updates</li>
                    <li>One-time payment saves you money</li>
                    <li>Priority support + bonus materials</li>
                </ul>
                <a>
                    Get the Bundle
                </a>
            </div>


           </section>

        </div>

            </main>
        </div>


    );


}