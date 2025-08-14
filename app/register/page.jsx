import "../styles/global.css";
import "../styles/hero.css";
import "../styles/pricing.css";

export default function Register () { 

    return (
    <div>
            <main className="register">
                <form>
                    <input type="text" placeholder="email">

                    </input>
                    <input type="password" placeholder="password">

                    </input>
                    <input type="password" placeholder="re-type password">

                    </input>
                </form>
            </main>

        </div>
        );



}