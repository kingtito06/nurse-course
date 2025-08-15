"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import "../styles/navbar.css";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsSignedIn(!!data.user);
    };
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session?.user);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // redirect after logout
  };

  const navItems = [
    { name: "Courses", href: "/courses" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    // Conditional button
    isSignedIn
      ? pathname === "/dashboard" || pathname.startsWith("/dashboard/")
        ? { name: "Logout", onClick: handleLogout, className: "logout" }
        : { name: "Learn", href: "/dashboard", className: "dashboard" }
      : { name: "Sign Up", href: "/signup", className: "sign-up" },
  ];

  return (
    <aside className="navWrapper">
      <div className="title">
        <Link href={`/`}>
          <h3 className="desktop-title">Course Web App</h3>
        </Link>
      </div>

      <nav className="navMenu">
        <ul className="navi">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.href ? (
                <Link className={`navLink ${item.className || ""}`} href={item.href}>
                  {item.name}
                </Link>
              ) : (
                <button className={`navLink ${item.className || ""}`} onClick={item.onClick}>
                  {item.name}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}