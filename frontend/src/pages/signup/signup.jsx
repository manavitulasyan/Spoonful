
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
import './signup.css';

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Temporary frontend flow.
    // Connect this to the FastAPI signup endpoint later.
    navigate('/onboarding', {
      state: {
        name: formData.name,
        email: formData.email
      }
    });
  };

  return (
    <div className="signup-page">

      {/* NAVBAR */}
      <nav className="signup-nav">

        <Brand to="/" className="signup-brand" />

        <p>
          Already have an account?
          <Link to="/login"> Log in</Link>
        </p>

      </nav>

      {/* MAIN CONTENT */}
      <main className="signup-main">

        {/* LEFT INTRODUCTION */}
        <section className="signup-intro">

          <span className="signup-eyebrow">
            <Sparkles size={15} />
            YOUR JOURNEY STARTS HERE
          </span>

          <h1>
            A little space
            <br />
            to feel good
            <br />
            <span>about food.</span>
          </h1>

          <p>
            Create your personal space to discover food,
            understand your preferences and explore
            new experiences at your own pace.
          </p>

          <div className="signup-note">
            <Heart size={17} />
            <span>No pressure. No judgement. Just you.</span>
          </div>

          <div className="signup-decoration">✳</div>

        </section>

        {/* SIGNUP FORM */}
        <section className="signup-form-section">

          <div className="signup-form-card">

            <span className="form-eyebrow">
              WELCOME TO SPOONFUL
            </span>

            <h2>Create your account</h2>

            <p className="form-description">
              Let's get to know you before we begin.
            </p>

            <form onSubmit={handleSubmit}>

              {/* NAME */}
              <div className="form-group">
                <label htmlFor="name">Your name</label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="form-group">
                <label htmlFor="email">Email address</label>

                <input
                  id="email"
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
              <div className="form-group">
                <label htmlFor="password">Password</label>

                <div className="password-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
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

              {/* CONFIRM PASSWORD */}
              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter your password again"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <p className="signup-message" role="alert">
                  {error}
                </p>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="signup-submit"
              >
                Create account
                <ArrowRight size={18} />
              </button>

            </form>

            <p className="signup-terms">
              By continuing, you agree to use Spoonful
              with kindness towards yourself.
            </p>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="signup-footer">
        <span>spoonful © 2026</span>
        <span>Made with care, one bite at a time.</span>
      </footer>

    </div>
  );
}

export default Signup;
