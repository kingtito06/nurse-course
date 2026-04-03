"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../styles/auth.css";
import { supabase } from "@/lib/supabaseClient";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initReset = async () => {
      setError(null);
      const url = new URL(window.location.href);
      const hashParams = new URLSearchParams(url.hash.startsWith("#") ? url.hash.slice(1) : url.hash);

      const type = url.searchParams.get("type") || hashParams.get("type");
      const code = url.searchParams.get("code") || hashParams.get("code");
      const token_hash = url.searchParams.get("token_hash") || hashParams.get("token_hash");
      const access_token = url.searchParams.get("access_token") || hashParams.get("access_token");
      const refresh_token = url.searchParams.get("refresh_token") || hashParams.get("refresh_token");

      if (type === "recovery" && code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          setHasSession(true);
          setInitializing(false);
          return;
        }
      }

      if (type === "recovery" && token_hash) {
        const { error } = await supabase.auth.verifyOtp({ type: "recovery", token_hash });
        if (!error) {
          setHasSession(true);
          setInitializing(false);
          return;
        }
      }

      if (type === "recovery" && access_token && refresh_token) {
        await supabase.auth.setSession({ access_token, refresh_token });
        setHasSession(true);
        setInitializing(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setHasSession(true);
      } else {
        setError("Invalid or expired reset link. Please request a new password reset email.");
      }

      setInitializing(false);
    };

    initReset();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated successfully! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 2000);
    }
    setLoading(false);
  };

  if (initializing) {
    return <div className="auth-container"><div className="auth-card"><div className="auth-front"><h2>Loading...</h2></div></div></div>;
  }

  if (!hasSession) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-front">
            <h2>Reset Password</h2>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            <button type="button" onClick={() => router.push("/forgot-password")}>Request New Reset Email</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-front">
          <h2>Set New Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}