"use client"
import "../styles/hero.css";
import "../styles/about.css";

export default function About () {
    return (
        <div id="about">
            <main>
           <section className="hero">
                <h1>
                  Learn. Grow. Take Charge of Your Healthcare Career.
                </h1>
                <p>
                  Our platform empowers healthcare professionals to advance their skills with practical, self-paced courses.
                </p>
           </section>

            <section>
                <h1>
                  Our Mission
                </h1>
                <p>
                  We believe that becoming an autonomous nurse practitioner or mastering primary care shouldn’t be limited by traditional classroom constraints. Our goal is to provide accessible, high-quality courses that help healthcare providers gain confidence, knowledge, and real-world skills. Whether you’re looking to lead independently in patient care or build a strong foundation in primary care practices, our courses guide you step by step.
                </p>
           </section>

            <section>
                <h1>
                  Our Courses
                </h1>
                <ul>
                    <li>
                        <h5>How to Be an Autonomous Nurse Practitioner</h5>
                        <p>Learn advanced clinical skills, decision-making strategies, and leadership essentials to practice independently and confidently.</p>
                    </li>
                    <li>
                        <h5>How to Set Up Primary Care</h5>
                        <p>A practical guide to establishing, managing, and running a primary care practice efficiently, from patient workflows to administrative tasks.</p>
                    </li>
                </ul>

           </section>

           <section>
            <h1>Our Values</h1>
                <ul>
                    <li>
                        <h5>Excellence</h5>
                        <p>We provide top-tier, practical content for healthcare professionals.</p>
                    </li>
                    <li>
                        <h5>Accessibility</h5>
                        <p>Learn anytime, anywhere, at your own pace.</p>
                    </li>
                    <li>
                        <h5>Empowerment</h5>
                        <p>Equip yourself with the skills to take control of your career.</p>
                    </li>
                    <li>
                        <h5>Support</h5>
                        <p>Join a community of learners and healthcare leaders.</p>
                    </li>
                </ul>
           </section>
           <section>
            <h1>Are you ready to advance your healthcare career?</h1>
            <a>
                Explore Courses
            </a>
           </section>
            </main>
        </div>


    );


}