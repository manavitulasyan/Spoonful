
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  ArrowRight,
  Clock3,
  Plus,
  Smile,
  Meh,
  CloudSun
} from 'lucide-react';

import Navbar from '../../components/layout/Navbar';
import './dashboard.css';

function Dashboard() {
    const location = useLocation();

const user = location.state?.user || {};
const preferences = location.state?.preferences || {};

const displayName = user.name || 'there';
  const [feeling, setFeeling] = useState('');

  const feelings = [
    { label: 'Comfortable', icon: Smile },
    { label: 'Neutral', icon: Meh },
    { label: 'Unsure', icon: CloudSun }
  ];

  return (
    <div className="dashboard-page">

      <Navbar />

      <main className="dashboard-container">

        {/* WELCOME */}
        <section className="dashboard-heading">
          <div>
            <span className="dashboard-eyebrow">
              <Sparkles size={15} /> YOUR PERSONAL FOOD SPACE
            </span>

            <h1>A little space, just for you, {displayName}.</h1>

            <p>
              Explore food, celebrate little steps,
              and move at your own pace.
            </p>
          </div>

          <div className="welcome-decoration">✳</div>
        </section>

        {/* DAILY CHECK-IN */}
        <section className="checkin-section">
          <div className="checkin-content">
            <span className="section-tag">TODAY'S CHECK-IN</span>

            <h2>How does food feel today?</h2>

            <p>
              Take a moment to check in with yourself.
              There are no right or wrong answers.
            </p>

            <div className="feeling-options">
              {feelings.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  className={`feeling-button ${
                    feeling === label ? 'selected' : ''
                  }`}
                  onClick={() => setFeeling(label)}
                >
                  <Icon size={19} />
                  {label}
                </button>
              ))}
            </div>

            {feeling && (
              <p className="checkin-feedback">
                <Heart size={15} />
                Thanks for checking in. Take things at your own pace.
              </p>
            )}
          </div>

          <div className="checkin-decoration">
            <span>♡</span>
            <p>Every feeling is welcome here.</p>
          </div>
        </section>

        {/* SAFE FOODS */}
        <section className="dashboard-section">

          <div className="section-heading">
            <div>
              <span className="section-tag">YOUR FAMILIAR FAVOURITES</span>
              <h2>Your safe foods</h2>
              <p>Foods that feel familiar and comfortable.</p>
            </div>

            <Link to="/safefoods" className="view-link">
              View all <ArrowRight size={16} />
            </Link>
          </div>

          <div className="food-preview-grid">

            <div className="food-preview-card">
              <div className="food-emoji">🍝</div>
              <div>
                <h3>Pasta</h3>
                <span>Familiar favourite</span>
              </div>
              <Heart size={17} />
            </div>

            <div className="food-preview-card">
              <div className="food-emoji">🥪</div>
              <div>
                <h3>Sandwich</h3>
                <span>Easy and familiar</span>
              </div>
              <Heart size={17} />
            </div>

            <Link to="/safefoods" className="add-food-card">
              <Plus size={23} />
              <span>Add a familiar food</span>
            </Link>

          </div>
        </section>

        {/* EXPLORE */}
        <section className="dashboard-section">

          <div className="section-heading">
            <div>
              <span className="section-tag">A LITTLE SOMETHING NEW</span>
              <h2>Explore at your pace</h2>
              <p>Curiosity begins with small steps.</p>
            </div>

            <Link to="/recipes" className="view-link">
              Explore recipes <ArrowRight size={16} />
            </Link>
          </div>

          <div className="explore-banner">
            <div>
              <Sparkles size={20} />
              <h3>Something new, without the pressure.</h3>
              <p>
                Discover recipes and ingredients based on
                the sensory preferences you choose.
              </p>
              <Link to="/recipes" className="explore-button">
                Discover recipes <ArrowRight size={16} />
              </Link>
            </div>

            <div className="explore-illustration">🥗</div>
          </div>

        </section>

        {/* JOURNAL */}
        <section className="journal-shortcut">
          <div className="journal-icon">
            <Clock3 size={23} />
          </div>

          <div>
            <h3>Your food journey, one day at a time.</h3>
            <p>Reflect, record and celebrate your experiences.</p>
          </div>

          <Link to="/journal" className="journal-link">
            Open journal <ArrowRight size={17} />
          </Link>
        </section>

      </main>

      <footer className="dashboard-footer">
        spoonful © 2026
        <span>Made with care, one bite at a time.</span>
      </footer>

    </div>
  );
}

export default Dashboard;
