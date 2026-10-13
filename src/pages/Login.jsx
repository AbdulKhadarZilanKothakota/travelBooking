import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Compass,
  Mail,
  Lock,
  UserRound,
  Eye,
  EyeOff
} from "lucide-react";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (isSignup && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 4) {
      setError("Password must contain at least 4 characters.");
      return;
    }

    const existingUser = sessionStorage.getItem("exploreIndiaUser");

    if (!isSignup && !existingUser) {
      setError("Please sign up first to create a demo account.");
      return;
    }

    if (!isSignup && existingUser) {
      const savedUser = JSON.parse(existingUser);

      if (savedUser.email !== email) {
        setError("No demo account found for this email. Please sign up.");
        return;
      }
    }

    const user = {
      name: isSignup ? name.trim() : JSON.parse(existingUser).name,
      email
    };

    sessionStorage.setItem(
      "exploreIndiaUser",
      JSON.stringify(user)
    );

    // Refresh so the Navbar updates immediately
    window.location.href = "/profile";
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="auth-visual-content">
          <span className="auth-logo">
            <Compass size={30} />
          </span>

          <span className="eyebrow">EXPLORE INDIA</span>

          <h1>Your next adventure is waiting.</h1>

          <p>
            Discover beautiful destinations, explore travel options,
            and manage your journeys in one place.
          </p>
        </div>
      </section>

      <section className="auth-form-side">
        <form className="auth-form" onSubmit={handleSubmit}>
          <span className="eyebrow">
            {isSignup ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}
          </span>

          <h2>
            {isSignup ? "Sign up for Explore India" : "Login to your account"}
          </h2>

          <p className="auth-subtitle">
            {isSignup
              ? "Enter your details to get started."
              : "Enter your email and password to continue."}
          </p>

          {isSignup && (
            <label>
              Full name
              <div className="auth-input">
                <UserRound size={18} />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </label>
          )}

          <label>
            Email address
            <div className="auth-input">
              <Mail size={18} />

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>

          <label>
            Password
            <div className="auth-input">
              <Lock size={18} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={4}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="button auth-submit">
            {isSignup ? "Create Account" : "Login"}
          </button>

          <p className="auth-switch">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
                setPassword("");
              }}
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>

          <Link to="/" className="auth-home-link">
            ← Back to Home
          </Link>

          <p className="auth-disclaimer">
            Demo authentication only. No real account or secure password
            verification is configured.
          </p>
        </form>
      </section>
    </main>
  );
}
