import { useEffect, useState } from 'react';
import {
  BookOpen,
  Plus,
  CalendarDays,
  Heart,
  Smile,
  Meh,
  Frown,
  X,
  Trash2,
  Sparkles,
  Pencil
} from 'lucide-react';

import Navbar from '../../components/layout/Navbar';
import {
  getJournalEntries,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry
} from '../../services/api';

import './foodjournal.css';

const feelingOptions = [
  { label: 'Comfortable', icon: Smile, rating: 5 },
  { label: 'Happy', icon: Heart, rating: 4 },
  { label: 'Neutral', icon: Meh, rating: 3 },
  { label: 'Unsure', icon: Frown, rating: 2 }
];

const emptyEntry = {
  food: '',
  feeling: 'Comfortable',
  note: ''
};

function getFeelingFromRating(rating) {
  if (rating >= 5) return 'Comfortable';
  if (rating === 4) return 'Happy';
  if (rating === 3) return 'Neutral';
  return 'Unsure';
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function FoodJournal() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newEntry, setNewEntry] = useState(emptyEntry);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load journal history from the backend.
  useEffect(() => {
    async function loadEntries() {
      try {
        setLoading(true);
        setError('');

        const data = await getJournalEntries();
        setEntries(data);
      } catch (err) {
        setError(err.message || 'Unable to load your journal.');
      } finally {
        setLoading(false);
      }
    }

    loadEntries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewEntry((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const resetForm = () => {
    setNewEntry(emptyEntry);
    setEditingId(null);
    setShowForm(false);
  };

  // Open the form for a new entry.
  const openNewEntryForm = () => {
    setError('');
    setSuccess('');
    setNewEntry(emptyEntry);
    setEditingId(null);
    setShowForm(true);
  };

  // Open the form with an existing entry's information.
  const handleEditEntry = (entry) => {
    setError('');
    setSuccess('');

    setNewEntry({
      food: entry.food_name,
      feeling: getFeelingFromRating(entry.rating || 3),
      note: entry.notes || ''
    });

    setEditingId(entry.id);
    setShowForm(true);
  };

  // Create or update an entry.
  const handleSaveEntry = async (e) => {
    e.preventDefault();

    if (!newEntry.food.trim()) return;

    const selectedFeeling = feelingOptions.find(
      (item) => item.label === newEntry.feeling
    );

    const payload = {
      food_name: newEntry.food.trim(),
      rating: selectedFeeling?.rating ?? 3,
      notes: newEntry.note.trim() || null
    };

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      if (editingId !== null) {
        const updatedEntry = await updateJournalEntry(
          editingId,
          payload
        );

        setEntries((previous) =>
          previous.map((entry) =>
            entry.id === editingId ? updatedEntry : entry
          )
        );

        setSuccess('Your journal entry has been updated.');
      } else {
        const createdEntry = await createJournalEntry(payload);

        setEntries((previous) =>
          [createdEntry, ...previous].sort(
            (a, b) =>
              new Date(b.experienced_at) -
              new Date(a.experienced_at)
          )
        );

        setSuccess('Your journal entry has been saved.');
      }

      resetForm();
    } catch (err) {
      setError(err.message || 'Unable to save your journal entry.');
    } finally {
      setSaving(false);
    }
  };

  // Delete an entry from the backend.
  const handleDeleteEntry = async (id) => {
    try {
      setError('');
      setSuccess('');

      await deleteJournalEntry(id);

      setEntries((previous) =>
        previous.filter((entry) => entry.id !== id)
      );

      setSuccess('Your journal entry has been deleted.');
    } catch (err) {
      setError(err.message || 'Unable to delete this entry.');
    }
  };

  return (
    <div className="foodjournal-page">

      <Navbar />

      <main className="foodjournal-container">

        {/* PAGE HEADING */}
        <section className="journal-heading">
          <div>
            <span className="journal-eyebrow">
              <BookOpen size={15} />
              YOUR PERSONAL FOOD DIARY
            </span>

            <h1>Your food journey.</h1>

            <p>
              A little space to reflect on your experiences,
              notice what feels good and celebrate little moments.
            </p>
          </div>

          <div className="journal-heading-decoration">
            <BookOpen size={39} />
          </div>
        </section>

        {/* INTRO BANNER */}
        <section className="journal-welcome">
          <div className="journal-welcome-icon">
            <Heart size={24} />
          </div>

          <div>
            <h2>Every experience is worth remembering.</h2>
            <p>
              This is not about getting things right.
              It is about understanding yourself a little better.
            </p>
          </div>

          <Sparkles className="journal-sparkle" size={23} />
        </section>

        {/* JOURNAL SECTION */}
        <section className="journal-entries-section">

          <div className="journal-toolbar">
            <div>
              <span className="journal-section-tag">YOUR MEMORIES</span>
              <h2>Recent experiences</h2>
              <p>Look back at your food experiences, one day at a time.</p>
            </div>

            <button
              type="button"
              className="add-journal-button"
              onClick={openNewEntryForm}
            >
              <Plus size={18} />
              Add an entry
            </button>
          </div>

          {error && (
            <p role="alert">{error}</p>
          )}

          {success && (
            <p role="status">{success}</p>
          )}

          {/* TIMELINE */}
          {loading ? (
            <p>Loading your journal entries...</p>
          ) : entries.length > 0 ? (
            <div className="journal-timeline">

              {entries.map((entry) => {
                const feeling = getFeelingFromRating(entry.rating || 3);

                const FeelingIcon =
                  feelingOptions.find(
                    (item) => item.label === feeling
                  )?.icon || Heart;

                return (
                  <article className="journal-entry" key={entry.id}>

                    <div className="journal-date">
                      <CalendarDays size={15} />
                      {formatDate(entry.experienced_at)}
                    </div>

                    <div className="journal-entry-card">

                      <div className="journal-entry-top">

                        <div className="journal-food-info">
                          <div className="journal-food-emoji">
                            🍽️
                          </div>

                          <div>
                            <h3>{entry.food_name}</h3>
                            <span>Food experience</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            className="delete-entry-button"
                            onClick={() => handleEditEntry(entry)}
                            aria-label={`Edit ${entry.food_name} entry`}
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            className="delete-entry-button"
                            onClick={() => handleDeleteEntry(entry.id)}
                            aria-label={`Delete ${entry.food_name} entry`}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>

                      </div>

                      <div className="journal-feeling">
                        <FeelingIcon size={16} />
                        <span>Felt {feeling.toLowerCase()}</span>
                      </div>

                      <div className="journal-sensory-tags">
                        <span>Rating: {entry.rating ?? 'Not rated'}/5</span>
                      </div>

                      {entry.notes && (
                        <p className="journal-entry-note">
                          "{entry.notes}"
                        </p>
                      )}

                    </div>

                  </article>
                );
              })}

            </div>
          ) : (
            <div className="journal-empty">
              <BookOpen size={35} />
              <h3>Your journal starts here.</h3>
              <p>
                Add your first food experience whenever you feel ready.
              </p>

              <button
                type="button"
                onClick={openNewEntryForm}
              >
                <Plus size={17} />
                Add your first entry
              </button>
            </div>
          )}

        </section>

        {/* REMINDER */}
        <section className="journal-reminder">
          <span>♡</span>
          <div>
            <h3>Be gentle with yourself.</h3>
            <p>
              Every experience is valid. You do not need to
              explain, compare or judge your food journey.
            </p>
          </div>
        </section>

      </main>

      {/* ADD / EDIT ENTRY MODAL */}
      {showForm && (
        <div
          className="journal-modal-overlay"
          onClick={() => !saving && resetForm()}
        >
          <div
            className="journal-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="journal-modal-title"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="journal-modal-header">
              <div>
                <span className="journal-section-tag">
                  A MOMENT TO YOURSELF
                </span>
                <h2 id="journal-modal-title">
                  {editingId !== null
                    ? 'Edit journal entry'
                    : 'New journal entry'}
                </h2>
              </div>

              <button
                type="button"
                className="journal-modal-close"
                onClick={resetForm}
                aria-label="Close journal form"
                disabled={saving}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEntry}>

              <div className="journal-form-group">
                <label htmlFor="journal-food">What did you eat?</label>
                <input
                  id="journal-food"
                  type="text"
                  name="food"
                  placeholder="e.g. A bowl of pasta"
                  value={newEntry.food}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>

              <div className="journal-form-group">
                <label>How did you feel?</label>

                <div className="journal-feeling-options">
                  {feelingOptions.map(({ label, icon: Icon }) => (
                    <button
                      type="button"
                      key={label}
                      className={
                        newEntry.feeling === label ? 'selected' : ''
                      }
                      onClick={() =>
                        setNewEntry((previous) => ({
                          ...previous,
                          feeling: label
                        }))
                      }
                    >
                      <Icon size={16} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="journal-form-group">
                <label htmlFor="journal-note">
                  Anything you'd like to remember? (Optional)
                </label>
                <textarea
                  id="journal-note"
                  name="note"
                  rows={3}
                  placeholder="Write a little about your experience..."
                  value={newEntry.note}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="save-journal-button"
                disabled={saving}
              >
                {saving
                  ? 'Saving...'
                  : editingId !== null
                    ? 'Update my entry'
                    : 'Save my entry'}
                <Plus size={17} />
              </button>

            </form>

          </div>
        </div>
      )}

      <footer className="foodjournal-footer">
        spoonful © 2026
        <span>Made with care, one bite at a time.</span>
      </footer>

    </div>
  );
}

export default FoodJournal;