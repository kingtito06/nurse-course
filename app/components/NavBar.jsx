"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/navbar.css";
import "../styles/global.css";

const navItems = [
    {name: "Courses", href:"/courses"},
    {name: "Pricing", href:"/pricing"},
    {name: "About", href:"/about"},
    {name: "Register", href:"/register"},
    {name: "Log in", href:"/login"}
];

export default function NavBar() {
    const pathname = usePathname();
    return (
        <aside className="navWrapper">
                <div className="title">
                    <a href="/"><h3>Course Web App</h3></a>
                </div>

           
                <nav>
                    <ul className="navi">
                    {navItems.map((item) => {
                         return (                        <li key={item.href}>
                            <Link
                            className="navLink"
                                href={item.href}>
                                    {item.name}
                            </Link>
                        </li>
                        );
                    })}
                    </ul>
                    {/* <Link>My Account</Link> */}
                </nav>
        </aside>
    );
}