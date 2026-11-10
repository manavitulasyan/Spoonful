
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, Leaf } from 'lucide-react';

import Brand from '../../components/layout/Brand';
import './landing.css';
import heroImage from '../../assets/spoonful-hero.png';
function Landing() {
  return (
    <div className="landing-page">

      {/* NAVBAR */}
      <nav className="landing-nav">

        <Brand to="/" className="brand" />

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#how-it-works">How it works</a>
          <a href="#explore">Explore</a>
        </div>

        <Link to="/signup" className="nav-button">
          Get started <ArrowRight size={16} />
        </Link>

      </nav>

      {/* HERO SECTION */}
      <main>

        <section className="hero-section">

          <div className="hero-content">

            <span className="eyebrow">
              <Sparkles size={15} />
              A MORE COMFORTABLE WAY TO EXPLORE FOOD
            </span>

            <h1>
              Food should feel
              <br />
              <span>comfortable.</span>
            </h1>

            <p className="hero-description">
              Your relationship with food is personal.
              Spoonful gives you a gentle space to explore
              flavours, understand your sensory preferences
              and discover food at your own pace.
            </p>

            <div className="hero-actions">
              <Link to="/signup" className="hero-button">
                Begin your journey
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="hero-note">
              <Heart size={16} />
              A space without pressure or judgement.
            </div>

          </div>

          <div className="hero-visual">

            <div className="visual-card">

              <div className="visual-card-top">
                <span>YOUR LITTLE FOOD SPACE</span>
                <span className="visual-sparkle">✳</span>
              </div>

              <div className="hero-visual">
  <div className="visual-card">
    <img
      src={heroImage}
      alt="A comforting bowl of spaghetti with a blue fork and gingham napkin"
      className="hero-food-image"
    />
  </div>
</div>

              <div className="visual-card-bottom">
                <div>
                  <h3>Explore what feels good.</h3>
                  <p>One little step at a time.</p>
                </div>

                <div className="visual-heart">
                  <Heart size={21} />
                </div>
              </div>

            </div>

            <div className="floating-note">
              <Leaf size={17} />
              <span>Made for your comfort</span>
            </div>

          </div>

        </section>

        {/* ABOUT SECTION */}
        <section className="about-section" id="about">

          <span className="section-eyebrow">
            A LITTLE ABOUT US
          </span>

          <h2>
            Food exploration,
            <br />
            <span>on your own terms.</span>
          </h2>

          <p>
            Everyone experiences food differently. Its texture,
            smell, taste, temperature and appearance can shape
            how comfortable we feel around it. Spoonful helps
            you understand those preferences without making
            food exploration feel overwhelming.
          </p>

        </section>

        {/* HOW IT WORKS */}
        <section className="how-section" id="how-it-works">

          <div className="section-heading">
            <span className="section-eyebrow">YOUR JOURNEY</span>
            <h2>Small steps, meaningful discoveries.</h2>
            <p>
              Everything begins with understanding what feels
              right for you.
            </p>
          </div>

          <div className="steps-grid">

            <div className="step-card">
              <span className="step-number">01</span>
              <div className="step-icon">♡</div>
              <h3>Understand yourself</h3>
              <p>
                Explore your sensory preferences and discover
                what makes food comfortable for you.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number">02</span>
              <div className="step-icon">✳</div>
              <h3>Find your familiar foods</h3>
              <p>
                Keep track of foods you enjoy and experiences
                that feel familiar and reassuring.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number">03</span>
              <div className="step-icon">↗</div>
              <h3>Explore at your pace</h3>
              <p>
                Discover recipes and ingredients that align
                with your preferences, one step at a time.
              </p>
            </div>

          </div>

        </section>

        {/* EXPLORE SECTION */}
        <section className="explore-section" id="explore">

          <div className="explore-content">

            <span className="section-eyebrow">
              A SPACE THAT'S YOURS
            </span>

            <h2>
              There's no right way
              <br />
              to experience food.
            </h2>

            <p>
              Whether you want to stick with familiar favourites
              or discover something new, Spoonful is here to
              make the experience a little more comfortable.
            </p>

            <Link to="/signup" className="explore-button">
              Get started with Spoonful
              <ArrowRight size={17} />
            </Link>

          </div>

          <div className="explore-decoration">
            <span>♡</span>
            <p>Take it one bite at a time.</p>
          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="landing-footer">

        <Brand to="/" className="footer-brand" />

        <p>Made with care, one bite at a time.</p>

        <span>© 2026 Spoonful</span>

      </footer>

    </div>
  );
}

export default Landing;
