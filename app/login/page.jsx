import "../styles/global.css";
import "../styles/hero.css";
import "../styles/pricing.css";

export default function Login () { 
    return (
    <div>
            <main className="login">
                <form>
                    <input type="text" placeholder="email">

                    </input>
                    <input type="password" placeholder="password">
                    </input>

                </form>
            </main>

        </div>
        );



}