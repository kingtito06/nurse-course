import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import "./styles/global.css";
import "./styles/palette.css";

export const metadata = {
  title: "Nurse Course Platform",
  description: "Comprehensive course platform for nurses to become autonomous nurse practitioners with structured lessons, quizzes, and certifications.",
  keywords: "nurse practitioner, autonomous NP, nursing education, healthcare training",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1d40a4" />
      </head>
      <body>
        <NavBar />
        <main role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
