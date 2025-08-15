"use client";
import { useState, useEffect } from "react";
import "../styles/auth.css";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Redirect if already signed in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.push("/dashboard");
      }
    };
    checkUser();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!isLogin && password !== password2) {
      setError("Passwords do not match");
      return;
    }

    if (isLogin) {
      // LOGIN
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push("/dashboard");
    } else {
      // REGISTER
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setMessage("✅ Please check your email to verify your account.");
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isLogin ? "flip" : ""}`}>
        {/* FRONT — REGISTER */}
        <div className="auth-front">
          <h2>Create Account</h2>
          {error && !isLogin && <p className="error">{error}</p>}
          {message && !isLogin && <p className="success">{message}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Re-type Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
          <p onClick={() => setIsLogin(true)}>Already have an account?</p>
        </div>

        {/* BACK — LOGIN */}
        <div className="auth-back">
          <h2>Login</h2>
          {error && isLogin && <p className="error">{error}</p>}
          {message && isLogin && <p className="success">{message}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p onClick={() => setIsLogin(false)}>Don't have an account?</p>
        </div>
      </div>
    </div>
  );
}