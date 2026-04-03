"use client";
import Link from "next/link";
import "../styles/footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/courses">Courses</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Learning</h4>
          <ul>
            <li><Link href="/courses">Browse Courses</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Account</h4>
          <ul>
            <li><Link href="/signup">Sign Up</Link></li>
            <li><Link href="/signup">Login</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@nursecourse.com</p>
          <p>Support 24/7 available</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Nurse Course Platform. All rights reserved.</p>
      </div>
    </footer>
  );
}
