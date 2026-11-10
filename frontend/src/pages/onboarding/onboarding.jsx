
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check
} from 'lucide-react';

import './onboarding.css';

const preferenceGroups = [
  {
    id: 'texture',
    title: 'What textures feel comfortable?',
    description: 'Choose the textures you usually enjoy.',
    options: ['Crunchy', 'Soft', 'Creamy', 'Smooth', 'Chewy', 'Crispy']
  },
  {
    id: 'taste',
    title: 'What flavours do you prefer?',
    description: 'There is no right or wrong answer.',
    options: ['Sweet', 'Salty', 'Sour', 'Spicy', 'Mild', 'Savoury']
  },
  {
    id: 'smell',
    title: 'What kind of smells do you prefer?',
    description: 'Think about the aromas that feel pleasant.',
    options: ['Mild', 'Fresh', 'Herbal', 'Sweet', 'Neutral', 'Strong']
  },
  {
    id: 'temperature',
    title: 'What food temperatures do you prefer?',
    description: 'Select what feels most comfortable.',
    options: ['Warm', 'Cold', 'Room temperature', 'Hot', 'Chilled']
  },
  {
    id: 'appearance',
    title: 'What food appearances do you prefer?',
    description: 'Think about how food looks on your plate.',
    options: [
      'Separate ingredients',
      'Mixed together',
      'Uniform colours',
      'Colourful plates',
      'Simple presentation'
    ]
  }
];

function Onboarding() {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive signup details from the signup page.
  const userDetails = location.state || {};

  const [preferences, setPreferences] = useState({
    texture: [],
    taste: [],
    smell: [],
    temperature: [],
    appearance: []
  });

  const [activeStep, setActiveStep] = useState(0);

  const currentGroup = preferenceGroups[activeStep];

  const togglePreference = (option) => {
    setPreferences((previous) => {
      const selected = previous[currentGroup.id];

      return {
        ...previous,
        [currentGroup.id]: selected.includes(option)
          ? selected.filter((item) => item !== option)
          : [...selected, option]
      };
    });
  };

  const finishOnboarding = () => {
    navigate('/dashboard', {
      state: {
        user: userDetails,
        preferences: preferences
      }
    });
  };

  const handleNext = () => {
    if (activeStep < preferenceGroups.length - 1) {
      setActiveStep((previous) => previous + 1);
    } else {
      finishOnboarding();
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((previous) => previous - 1);
    }
  };

  return (
    <div className="onboarding-page">

      <nav className="onboarding-nav">
        <Link to="/" className="onboarding-brand">
          <span>✳</span> spoonful
        </Link>

        <button
          className="skip-button"
          type="button"
          onClick={finishOnboarding}
        >
          Skip for now
        </button>
      </nav>

      <main className="onboarding-main">

        <div className="onboarding-intro">
          <span className="onboarding-eyebrow">
            <Sparkles size={15} />
            LET'S MAKE THIS SPACE YOURS
          </span>

          <h1>
            Getting to know
            <br />
            <span>your preferences.</span>
          </h1>

          <p>
            A few little questions will help us understand
            what makes food feel comfortable for you.
            Choose as many options as you like.
          </p>
        </div>

        <section className="preference-card">

          <div className="progress-top">
            <span>YOUR PREFERENCES</span>
            <span>
              {activeStep + 1} OF {preferenceGroups.length}
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${((activeStep + 1) / preferenceGroups.length) * 100}%`
              }}
            />
          </div>

          <div className="preference-content" key={currentGroup.id}>

            <span className="preference-category">
              STEP {activeStep + 1}
            </span>

            <h2>{currentGroup.title}</h2>

            <p>{currentGroup.description}</p>

            <div className="preference-options">
              {currentGroup.options.map((option) => {
                const selected = preferences[currentGroup.id].includes(option);

                return (
                  <button
                    key={option}
                    type="button"
                    className={`preference-option ${selected ? 'selected' : ''}`}
                    onClick={() => togglePreference(option)}
                    aria-pressed={selected}
                  >
                    <span>{option}</span>
                    {selected && <Check size={16} />}
                  </button>
                );
              })}
            </div>

            <p className="selection-hint">
              {preferences[currentGroup.id].length} selected
            </p>

          </div>

          <div className="preference-navigation">

            <button
              type="button"
              className="back-button"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <ArrowLeft size={17} />
              Back
            </button>

            <button
              type="button"
              className="continue-button"
              onClick={handleNext}
            >
              {activeStep === preferenceGroups.length - 1
                ? 'Finish'
                : 'Continue'}
              <ArrowRight size={17} />
            </button>

          </div>

        </section>

        <p className="onboarding-footer-note">
          Your preferences can always be changed later.
        </p>

      </main>

      <footer className="onboarding-bottom">
        spoonful © 2026
        <span>Made with care, one bite at a time.</span>
      </footer>

    </div>
  );
}

export default Onboarding;
