import NavBar from "./components/NavBar.jsx";
import "./styles/global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        { children }
      </body>
    </html>
  );
}
