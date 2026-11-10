
import { useState } from 'react';
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
  Sparkles
} from 'lucide-react';

import Navbar from '../../components/layout/Navbar';
import './foodjournal.css';

const initialEntries = [
  {
    id: 1,
    food: 'Creamy pasta',
    date: '2026-11-09',
    feeling: 'Comfortable',
    texture: 'Creamy',
    taste: 'Mild',
    smell: 'Pleasant',
    note: 'This felt familiar and easy to enjoy.',
    emoji: '🍝'
  },
  {
    id: 2,
    food: 'Strawberries',
    date: '2026-11-08',
    feeling: 'Happy',
    texture: 'Juicy',
    taste: 'Sweet',
    smell: 'Fresh',
    note: 'Loved how fresh and refreshing they tasted.',
    emoji: '🍓'
  },
  {
    id: 3,
    food: 'Vegetable sandwich',
    date: '2026-11-07',
    feeling: 'Neutral',
    texture: 'Crunchy',
    taste: 'Savoury',
    smell: 'Mild',
    note: 'A simple meal. Nothing overwhelming.',
    emoji: '🥪'
  }
];

const feelingOptions = [
  { label: 'Comfortable', icon: Smile },
  { label: 'Happy', icon: Heart },
  { label: 'Neutral', icon: Meh },
  { label: 'Unsure', icon: Frown }
];

function FoodJournal() {
  const [entries, setEntries] = useState(initialEntries);
  const [showForm, setShowForm] = useState(false);

  const [newEntry, setNewEntry] = useState({
    food: '',
    feeling: 'Comfortable',
    texture: 'Soft',
    taste: 'Mild',
    smell: 'Pleasant',
    note: '',
    emoji: '🍽️'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewEntry((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleAddEntry = (e) => {
    e.preventDefault();

    if (!newEntry.food.trim()) return;

    const entry = {
      ...newEntry,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-CA')
    };

    setEntries((previous) => [entry, ...previous]);

    setNewEntry({
      food: '',
      feeling: 'Comfortable',
      texture: 'Soft',
      taste: 'Mild',
      smell: 'Pleasant',
      note: '',
      emoji: '🍽️'
    });

    setShowForm(false);
  };

  const handleDeleteEntry = (id) => {
    setEntries((previous) =>
      previous.filter((entry) => entry.id !== id)
    );
  };

  const formatDate = (date) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
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
              onClick={() => setShowForm(true)}
            >
              <Plus size={18} />
              Add an entry
            </button>

          </div>

          {/* TIMELINE */}
          {entries.length > 0 ? (
            <div className="journal-timeline">

              {entries.map((entry) => {
                const FeelingIcon =
                  feelingOptions.find(
                    (item) => item.label === entry.feeling
                  )?.icon || Heart;

                return (
                  <article className="journal-entry" key={entry.id}>

                    <div className="journal-date">
                      <CalendarDays size={15} />
                      {formatDate(entry.date)}
                    </div>

                    <div className="journal-entry-card">

                      <div className="journal-entry-top">

                        <div className="journal-food-info">

                          <div className="journal-food-emoji">
                            {entry.emoji}
                          </div>

                          <div>
                            <h3>{entry.food}</h3>
                            <span>Food experience</span>
                          </div>

                        </div>

                        <button
                          type="button"
                          className="delete-entry-button"
                          onClick={() => handleDeleteEntry(entry.id)}
                          aria-label={`Delete ${entry.food} entry`}
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                      <div className="journal-feeling">
                        <FeelingIcon size={16} />
                        <span>Felt {entry.feeling.toLowerCase()}</span>
                      </div>

                      <div className="journal-sensory-tags">
                        <span>Texture: {entry.texture}</span>
                        <span>Taste: {entry.taste}</span>
                        <span>Smell: {entry.smell}</span>
                      </div>

                      {entry.note && (
                        <p className="journal-entry-note">
                          "{entry.note}"
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
                onClick={() => setShowForm(true)}
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

      {/* ADD ENTRY MODAL */}
      {showForm && (
        <div
          className="journal-modal-overlay"
          onClick={() => setShowForm(false)}
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
                <h2 id="journal-modal-title">New journal entry</h2>
              </div>

              <button
                type="button"
                className="journal-modal-close"
                onClick={() => setShowForm(false)}
                aria-label="Close journal form"
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleAddEntry}>

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
                <label htmlFor="journal-emoji">Choose an emoji</label>
                <select
                  id="journal-emoji"
                  name="emoji"
                  value={newEntry.emoji}
                  onChange={handleChange}
                >
                  <option value="🍽️">🍽️ Food</option>
                  <option value="🍝">🍝 Pasta</option>
                  <option value="🥪">🥪 Sandwich</option>
                  <option value="🍓">🍓 Strawberry</option>
                  <option value="🍚">🍚 Rice</option>
                  <option value="🥗">🥗 Salad</option>
                  <option value="🍞">🍞 Bread</option>
                  <option value="🥣">🥣 Bowl</option>
                  <option value="🍎">🍎 Apple</option>
                  <option value="🥛">🥛 Milk</option>
                </select>
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

              <div className="journal-form-row">

                <div className="journal-form-group">
                  <label htmlFor="journal-texture">Texture</label>
                  <select
                    id="journal-texture"
                    name="texture"
                    value={newEntry.texture}
                    onChange={handleChange}
                  >
                    {['Soft', 'Crunchy', 'Creamy', 'Smooth', 'Chewy', 'Crispy', 'Juicy'].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div className="journal-form-group">
                  <label htmlFor="journal-taste">Taste</label>
                  <select
                    id="journal-taste"
                    name="taste"
                    value={newEntry.taste}
                    onChange={handleChange}
                  >
                    {['Mild', 'Sweet', 'Salty', 'Sour', 'Spicy', 'Savoury'].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>

              </div>

              <div className="journal-form-group">
                <label htmlFor="journal-smell">Smell</label>
                <select
                  id="journal-smell"
                  name="smell"
                  value={newEntry.smell}
                  onChange={handleChange}
                >
                  {['Pleasant', 'Fresh', 'Mild', 'Herbal', 'Strong', 'Neutral'].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="journal-form-group">
                <label htmlFor="journal-note">Anything you'd like to remember? (Optional)</label>
                <textarea
                  id="journal-note"
                  name="note"
                  rows={3}
                  placeholder="Write a little about your experience..."
                  value={newEntry.note}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="save-journal-button">
                Save my entry <Plus size={17} />
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
