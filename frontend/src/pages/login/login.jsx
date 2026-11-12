import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Heart,
  Sparkles
} from 'lucide-react';

import Brand from '../../components/layout/Brand';
import {
  loginUser,
  getCurrentUser,
  getPreferences,
  logoutUser
} from '../../services/api';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: location.state?.email || '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError('');

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      setError('Please enter both your email address and password.');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Authenticate the user.
      await loginUser({
  email,
  password
});

// Get the logged-in user.
const user = await getCurrentUser();

// Check whether onboarding preferences exist.
try {
  await getPreferences();

  // Existing user who has completed onboarding.
  navigate('/dashboard', {
    replace: true,
    state: { user }
  });

} catch (preferenceError) {
  const message = preferenceError.message?.toLowerCase() || '';

  if (
    message.includes('not found') ||
    message.includes('404')
  ) {
    // New user who has not completed onboarding.
    navigate('/onboarding', {
      replace: true,
      state: { user }
    });
  } else {
    throw preferenceError;
  }
}

    } catch (err) {
      // Remove a token if authentication or token verification failed.
      logoutUser();

      const message = err.message?.toLowerCase() || '';

      if (
        message.includes('failed to fetch') ||
        message.includes('networkerror') ||
        message.includes('load failed')
      ) {
        setError(
          'Unable to connect to Spoonful. Please check that the backend server is running.'
        );
      } else if (
        message.includes('401') ||
        message.includes('incorrect') ||
        message.includes('invalid email') ||
        message.includes('invalid credentials') ||
        message.includes('password')
      ) {
        setError(
          'Invalid email or password. Please check your details or sign up if you are new to Spoonful.'
        );
      } else {
        setError(
          err.message || 'Login failed. Please try again.'
        );
      }

    } finally {
      setLoading(false);
    }
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

            {location.state?.message && (
              <p className="login-success" role="status">
                {location.state.message}
              </p>
            )}

            <form onSubmit={handleSubmit} noValidate>

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
                  aria-invalid={!!error}
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
                    aria-invalid={!!error}
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

              {/* ERROR MESSAGE */}
              {error && (
                <p className="login-error" role="alert">
                  {error}
                </p>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log in'}

                {!loading && <ArrowRight size={18} />}
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