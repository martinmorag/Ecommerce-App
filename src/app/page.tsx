import Image from "next/image";
import Link from "next/link";
import './index.css'

export default async function Home() {
    return (
        <main className="landing-page">
            <div className="form-wrapper">
                <Image
                    className="landing-img"
                    src="/hero-image.jpg"
                    alt="hero image"
                    width={400}
                    height={800}
                />
                {
                    'login' === "login" &&
                  <form className="login-form">
                    <Image
                      src="/logo.png"
                      alt="logo"
                      width={150}
                      height={150}
                    />
                    <Link style={{color: 'white', backgroundColor: 'green', padding: '10px 20px'}} href={'/store'}>Sign in</Link>
                  </form>
                }
            </div>
        </main>
    );
}
