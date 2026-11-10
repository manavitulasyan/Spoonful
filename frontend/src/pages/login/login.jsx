
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Heart,
  Sparkles
} from 'lucide-react';

import Brand from '../../components/layout/Brand';
import './login.css';

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please enter your email and password.');
      return;
    }

    // Temporary frontend flow.
    // Real login authentication will be connected to FastAPI later.
    navigate('/dashboard');
  };

  return (
    <div className="login-page">

      {/* NAVBAR */}
      <nav className="login-nav">

        <Brand to="/" className="login-brand" />

        <p>
          New to Spoonful?
          <Link to="/signup"> Create an account</Link>
        </p>

      </nav>

      {/* MAIN CONTENT */}
      <main className="login-main">

        {/* LEFT INTRODUCTION */}
        <section className="login-intro">

          <span className="login-eyebrow">
            <Sparkles size={15} />
            WELCOME BACK
          </span>

          <h1>
            Your little
            <br />
            food space
            <br />
            <span>missed you.</span>
          </h1>

          <p>
            Pick up where you left off. Your familiar
            favourites, food discoveries and personal
            journey are waiting for you.
          </p>

          <div className="login-note">
            <Heart size={17} />
            <span>There's always room to begin again.</span>
          </div>

          <div className="login-decoration">✳</div>

        </section>

        {/* LOGIN FORM */}
        <section className="login-form-section">

          <div className="login-form-card">

            <span className="login-form-eyebrow">
              YOUR PERSONAL SPACE
            </span>

            <h2>Welcome back</h2>

            <p className="login-description">
              Log in to continue your Spoonful journey.
            </p>

            <form onSubmit={handleSubmit}>

              {/* EMAIL */}
              <div className="login-form-group">
                <label htmlFor="login-email">
                  Email address
                </label>

                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="login-form-group">
                <label htmlFor="login-password">
                  Password
                </label>

                <div className="login-password-wrapper">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword
                      ? <EyeOff size={18} />
                      : <Eye size={18} />
                    }
                  </button>
                </div>
              </div>

            

              {/* ERROR */}
              {error && (
                <p className="login-error" role="alert">
                  {error}
                </p>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                className="login-submit"
              >
                Log in
                <ArrowRight size={18} />
              </button>

            </form>

            <div className="login-divider">
              <span>OR</span>
            </div>

            <p className="login-signup-prompt">
              Don't have an account?
              <Link to="/signup"> Sign up</Link>
            </p>

            <p className="login-terms">
              Your journey, your pace. Always.
            </p>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="login-footer">
        <span>spoonful © 2026</span>
        <span>Made with care, one bite at a time.</span>
      </footer>

    </div>
  );
}

export default Login;
