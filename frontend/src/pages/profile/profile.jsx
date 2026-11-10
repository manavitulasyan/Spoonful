
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  UserRound,
  Heart,
  Utensils,
  BookOpen,
  Pencil,
  Save,
  X,
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';

import Navbar from '../../components/layout/Navbar';
import './profile.css';

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user || {};

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user.name || 'Spoonful User',
    email: user.email || 'hello@example.com',
    bio: 'Exploring food, one experience at a time.'
  });

  const preferences = location.state?.preferences || {};

  const [editData, setEditData] = useState(profile);

  const preferenceGroups = [
    { title: 'Texture', key: 'texture' },
    { title: 'Taste', key: 'taste' },
    { title: 'Smell', key: 'smell' },
    { title: 'Temperature', key: 'temperature' },
    { title: 'Appearance', key: 'appearance' }
  ];

  const savedFoods = ['Creamy pasta', 'Strawberries', 'Sandwich'];
  const journalCount = 3;

  const getPreferenceText = (value) => {
    if (!value) return 'Not added yet';

    if (Array.isArray(value)) {
      return value.length ? value.join(', ') : 'Not added yet';
    }

    return value;
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(editData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="profile-page">

      <Navbar />

      <main className="profile-container">

        {/* PAGE HEADING */}
        <section className="profile-heading">
          <span className="profile-eyebrow">
            <UserRound size={15} />
            YOUR PERSONAL SPACE
          </span>

          <h1>Your profile.</h1>

          <p>
            A little overview of you, your preferences
            and everything you've explored with Spoonful.
          </p>
        </section>

        {/* PROFILE CARD */}
        <section className="profile-main-card">

          <div className="profile-avatar">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <div className="profile-main-info">
            <span className="profile-member-label">
              SPOONFUL MEMBER
            </span>

            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
            <span className="profile-bio">{profile.bio}</span>
          </div>

          <button
            type="button"
            className="edit-profile-button"
            onClick={() => {
              setEditData(profile);
              setIsEditing(true);
            }}
          >
            <Pencil size={16} />
            Edit profile
          </button>

        </section>

        {/* PROFILE STATS */}
        <section className="profile-stats">

          <div className="profile-stat-card">
            <div className="profile-stat-icon">
              <Heart size={20} />
            </div>
            <div>
              <h3>{savedFoods.length}</h3>
              <p>Familiar foods</p>
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-icon">
              <BookOpen size={20} />
            </div>
            <div>
              <h3>{journalCount}</h3>
              <p>Journal entries</p>
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-icon">
              <Utensils size={20} />
            </div>
            <div>
              <h3>5</h3>
              <p>Preference areas</p>
            </div>
          </div>

        </section>

        {/* SENSORY PREFERENCES */}
        <section className="profile-section">

          <div className="profile-section-heading">
            <div>
              <span className="profile-section-eyebrow">
                WHAT FEELS RIGHT
              </span>
              <h2>Your sensory preferences</h2>
              <p>
                Your preferences help Spoonful make
                food exploration feel more comfortable.
              </p>
            </div>

            <Sparkles size={23} />
          </div>

          <div className="preference-grid">

            {preferenceGroups.map((group) => {
              const selected = preferences[group.key];

              return (
                <div className="preference-card" key={group.key}>
                  <span>{group.title}</span>

                  <p>
                    {getPreferenceText(selected)}
                  </p>
                </div>
              );
            })}

          </div>

          <button
            type="button"
            className="preference-edit-link"
            onClick={() => navigate('/onboarding')}
          >
            Update my preferences
            <ChevronRight size={17} />
          </button>

        </section>

        {/* SAVED FOODS */}
        <section className="profile-section">

          <div className="profile-section-heading">
            <div>
              <span className="profile-section-eyebrow">
                YOUR COMFORT CORNER
              </span>
              <h2>Familiar foods</h2>
              <p>
                Foods you've kept close along your journey.
              </p>
            </div>

            <Heart size={23} />
          </div>

          <div className="profile-food-list">

            {savedFoods.map((food, index) => {
              const emojis = ['🍝', '🍓', '🥪'];

              return (
                <div className="profile-food-item" key={food}>
                  <span className="profile-food-emoji">
                    {emojis[index]}
                  </span>

                  <span>{food}</span>

                  <Heart size={16} />
                </div>
              );
            })}

          </div>

          <button
            type="button"
            className="preference-edit-link"
            onClick={() => navigate('/safefoods')}
          >
            View all familiar foods
            <ChevronRight size={17} />
          </button>

        </section>

        {/* JOURNEY BANNER */}
        <section className="profile-journey-banner">
          <div>
            <span>YOUR JOURNEY, YOUR PACE</span>
            <h2>There's no right way to explore food.</h2>
            <p>
              Keep discovering what works for you.
              Every little experience counts.
            </p>

            <button
              type="button"
              onClick={() => navigate('/recipes')}
            >
              Explore recipes
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="profile-journey-decoration">
            ✳
          </div>
        </section>

        {/* ACCOUNT ACTIONS */}
        <section className="profile-account-section">

          <h2>Account</h2>

          <button
            type="button"
            className="profile-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Log out
          </button>

        </section>

      </main>

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div
          className="profile-modal-overlay"
          onClick={() => setIsEditing(false)}
        >
          <div
            className="profile-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="profile-modal-header">
              <div>
                <span className="profile-section-eyebrow">
                  YOUR ACCOUNT
                </span>
                <h2 id="profile-modal-title">Edit profile</h2>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                aria-label="Close edit profile"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile}>

              <div className="profile-form-group">
                <label htmlFor="profile-name">Your name</label>
                <input
                  id="profile-name"
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="profile-form-group">
                <label htmlFor="profile-email">Email address</label>
                <input
                  id="profile-email"
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="profile-form-group">
                <label htmlFor="profile-bio">A little about you</label>
                <textarea
                  id="profile-bio"
                  name="bio"
                  rows={3}
                  value={editData.bio}
                  onChange={handleEditChange}
                />
              </div>

              <button
                type="submit"
                className="profile-save-button"
              >
                <Save size={17} />
                Save changes
              </button>

            </form>

          </div>
        </div>
      )}

      <footer className="profile-footer">
        spoonful © 2026
        <span>Made with care, one bite at a time.</span>
      </footer>

    </div>
  );
}

export default Profile;
