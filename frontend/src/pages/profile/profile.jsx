import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getProfile,
  updateProfile,
  getPreferences,
  getSavedFoods,
  getJournalEntries,
  logoutUser,
} from '../../services/api';

// Keep your existing icon imports if your original file uses them.

const preferenceGroups = [
  { title: 'Texture', key: 'texture_preferences' },
  { title: 'Taste', key: 'taste_preferences' },
  { title: 'Smell', key: 'smell_sensitivity' },
  { title: 'Temperature', key: 'temperature_preferences' },
  { title: 'Appearance', key: 'appearance_preferences' },
];

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [preferences, setPreferences] = useState({});
  const [savedFoods, setSavedFoods] = useState([]);
  const [journalCount, setJournalCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    async function loadProfileData() {
      try {
        setLoading(true);
        setError('');

        const results = await Promise.allSettled([
          getProfile(),
          getPreferences(),
          getSavedFoods(),
          getJournalEntries(),
        ]);

        if (results[0].status === 'rejected') {
          throw results[0].reason;
        }

        const profileData = results[0].value;

        setProfile(profileData);
        setEditForm({
          name: profileData.name || '',
          email: profileData.email || '',
        });

        setPreferences(
          results[1].status === 'fulfilled'
            ? results[1].value
            : {}
        );

        setSavedFoods(
          results[2].status === 'fulfilled'
            ? results[2].value
            : []
        );

        setJournalCount(
          results[3].status === 'fulfilled'
            ? results[3].value.length
            : 0
        );
      } catch (err) {
        setError(err.message || 'Unable to load your profile.');
      } finally {
        setLoading(false);
      }
    }

    loadProfileData();
  }, []);

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError('');
      setSuccessMessage('');

      const updatedProfile = await updateProfile({
        name: editForm.name.trim(),
        email: editForm.email.trim(),
      });

      setProfile(updatedProfile);
      setEditForm({
        name: updatedProfile.name,
        email: updatedProfile.email,
      });

      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Unable to update your profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login', { replace: true });
  };

  if (loading) {
    return <div className="profile-page">Loading your profile...</div>;
  }

  if (error && !profile) {
    return (
      <div className="profile-page">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Profile header */}
      <section className="profile-header">
        <div className="profile-avatar">
          {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>

        <div className="profile-info">
          <h1>{profile?.name}</h1>
          <p>{profile?.email}</p>
        </div>

        <button
          className="edit-profile-btn"
          onClick={() => {
            setEditForm({
              name: profile?.name || '',
              email: profile?.email || '',
            });
            setIsEditing(true);
          }}
        >
          Edit Profile
        </button>
      </section>

      {error && <p className="error-message">{error}</p>}
      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}

      {/* Profile statistics */}
      <section className="profile-stats">
        <div className="stat-card">
          <h2>{savedFoods.length}</h2>
          <p>Saved Foods</p>
        </div>

        <div className="stat-card">
          <h2>{journalCount}</h2>
          <p>Journal Entries</p>
        </div>

        <div className="stat-card">
          <h2>
            {preferenceGroups.filter(
              (group) => preferences[group.key]
            ).length}
          </h2>
          <p>Preference Areas</p>
        </div>
      </section>

      {/* Sensory preferences */}
      <section className="profile-section">
        <h2>My Sensory Preferences</h2>

        <div className="preferences-grid">
          {preferenceGroups.map((group) => (
            <div className="preference-card" key={group.key}>
              <h3>{group.title}</h3>
              <p>
                {preferences[group.key] || 'Not set yet'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Saved foods */}
      <section className="profile-section">
        <h2>My Saved Foods</h2>

        {savedFoods.length === 0 ? (
          <p>You haven't saved any foods yet.</p>
        ) : (
          <div className="saved-foods-list">
            {savedFoods.map((item) => (
              <div className="saved-food-item" key={item.id}>
                <span>🍽️</span>
                <span>{item.food?.name || 'Food'}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Journey section */}
      <section className="profile-section">
        <h2>Your Spoonful Journey</h2>
        <p>
          Keep exploring foods, recording your experiences, and
          discovering your preferences.
        </p>
      </section>

      {/* Edit profile modal */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Profile</h2>

            <form onSubmit={handleSaveProfile}>
              <label htmlFor="profile-name">Name</label>
              <input
                id="profile-name"
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                minLength={2}
                maxLength={100}
                required
              />

              <label htmlFor="profile-email">Email</label>
              <input
                id="profile-email"
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                required
              />

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logout */}
      <button className="logout-btn" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default Profile;