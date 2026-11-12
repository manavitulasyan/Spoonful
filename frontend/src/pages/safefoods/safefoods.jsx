import { useEffect, useState } from 'react';
import {
  Heart,
  Plus,
  Search,
  Trash2,
  X,
  ArrowRight,
  Utensils,
  Sparkles
} from 'lucide-react';

import Navbar from '../../components/layout/Navbar';
import {
  getSavedFoods,
  addSavedFood,
  deleteSavedFood
} from '../../services/api';

import './safefoods.css';

const categories = ['All', 'Meals', 'Fruits', 'Snacks', 'Drinks'];

function SafeFoods() {
  const [foods, setFoods] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [newFood, setNewFood] = useState({
    name: '',
    category: 'Meals',
    note: '',
    emoji: '🍽️'
  });

  // Load saved foods from the backend.
  useEffect(() => {
    async function loadFoods() {
      try {
        setLoading(true);
        setError('');

        const data = await getSavedFoods();
        setFoods(data);
      } catch (err) {
        setError(err.message || 'Unable to load your saved foods.');
      } finally {
        setLoading(false);
      }
    }

    loadFoods();
  }, []);

  // Filter foods by category and search.
  const filteredFoods = foods.filter((food) => {
    const foodName = food.food?.name || '';

    const matchesCategory =
      activeCategory === 'All' ||
      food.food?.category === activeCategory;

    const matchesSearch = foodName
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Add a new food through the backend.
  const handleAddFood = async (e) => {
    e.preventDefault();

    if (!newFood.name.trim()) return;

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const createdFood = await addSavedFood({
        food_name: newFood.name.trim(),
        category: newFood.category,
        notes: newFood.note.trim() || null
      });

      setFoods((previous) => [...previous, createdFood]);

      setNewFood({
        name: '',
        category: 'Meals',
        note: '',
        emoji: '🍽️'
      });

      setShowForm(false);
      setSuccess('Food added to your collection!');
    } catch (err) {
      setError(err.message || 'Unable to add this food.');
    } finally {
      setSaving(false);
    }
  };

  // Delete a food through the backend.
  const handleDeleteFood = async (id) => {
    try {
      setError('');
      setSuccess('');

      await deleteSavedFood(id);

      setFoods((previous) =>
        previous.filter((food) => food.id !== id)
      );

      setSuccess('Food removed from your collection.');
    } catch (err) {
      setError(err.message || 'Unable to remove this food.');
    }
  };

  return (
    <div className="safefoods-page">
      <Navbar />

      <main className="safefoods-container">

        {/* PAGE INTRO */}
        <section className="safefoods-heading">
          <div>
            <span className="safefoods-eyebrow">
              <Heart size={15} />
              YOUR FAMILIAR FAVOURITES
            </span>

            <h1>Your safe foods.</h1>

            <p>
              A collection of foods that feel familiar,
              comfortable and right for you.
            </p>
          </div>

          <div className="safefoods-heading-decoration">♡</div>
        </section>

        {/* SUMMARY */}
        <section className="safefoods-summary">
          <div className="summary-icon">
            <Heart size={23} />
          </div>

          <div>
            <h3>{foods.length} familiar foods</h3>
            <p>Your list, your comfort, your choices.</p>
          </div>

          <Sparkles className="summary-sparkle" size={23} />
        </section>

        {/* FOOD LIST */}
        <section className="safefoods-list-section">

          <div className="safefoods-toolbar">
            <div>
              <h2>Your collection</h2>
              <p>Keep the foods you feel comfortable with close.</p>
            </div>

            <button
              type="button"
              className="add-food-button"
              onClick={() => {
                setError('');
                setSuccess('');
                setShowForm(true);
              }}
            >
              <Plus size={18} />
              Add a food
            </button>
          </div>

          {/* FEEDBACK */}
          {error && (
            <p role="alert">{error}</p>
          )}

          {success && (
            <p role="status">{success}</p>
          )}

          {/* SEARCH */}
          <div className="safefoods-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search your familiar foods..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* CATEGORY FILTERS */}
          <div className="safefoods-categories">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FOOD CARDS */}
          <div className="safefoods-grid">

            {loading ? (
              <p>Loading your familiar foods...</p>
            ) : filteredFoods.length > 0 ? (
              filteredFoods.map((item) => {
                const food = item.food || {};

                return (
                  <article className="safefood-card" key={item.id}>

                    <div className="safefood-card-top">
                      <div className="safefood-emoji">
                        🍽️
                      </div>

                      <button
                        type="button"
                        className="delete-food-button"
                        onClick={() => handleDeleteFood(item.id)}
                        aria-label={`Remove ${food.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <span className="safefood-category">
                      {food.category || 'Other'}
                    </span>

                    <h3>{food.name}</h3>

                    <p>
                      {item.notes || 'A familiar favourite'}
                    </p>

                    <div className="safefood-card-footer">
                      <Heart size={15} />
                      <span>One of your favourites</span>
                    </div>

                  </article>
                );
              })
            ) : (
              <div className="safefoods-empty">
                <Utensils size={30} />
                <h3>
                  {foods.length === 0
                    ? 'Your collection is waiting'
                    : 'No foods found'}
                </h3>
                <p>
                  {foods.length === 0
                    ? 'Add a familiar food to get started.'
                    : 'Try another search or add a new familiar food.'}
                </p>
              </div>
            )}

          </div>
        </section>

        {/* GENTLE REMINDER */}
        <section className="safefoods-reminder">
          <div className="reminder-icon">♡</div>

          <div>
            <h3>Your comfort matters.</h3>
            <p>
              There is no pressure to change your favourites
              or try something new. This space belongs to you.
            </p>
          </div>

          <ArrowRight size={19} />
        </section>

      </main>

      {/* ADD FOOD MODAL */}
      {showForm && (
        <div
          className="safefood-modal-overlay"
          onClick={() => !saving && setShowForm(false)}
        >
          <div
            className="safefood-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-food-title"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">
              <div>
                <span className="safefoods-eyebrow">
                  YOUR COLLECTION
                </span>
                <h2 id="add-food-title">Add a familiar food</h2>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
                disabled={saving}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddFood}>

              <div className="safefood-form-group">
                <label htmlFor="food-name">Food name</label>
                <input
                  id="food-name"
                  type="text"
                  placeholder="e.g. Pancakes"
                  value={newFood.name}
                  onChange={(e) =>
                    setNewFood({
                      ...newFood,
                      name: e.target.value
                    })
                  }
                  required
                  autoFocus
                />
              </div>

              <div className="safefood-form-group">
                <label htmlFor="food-category">Category</label>
                <select
                  id="food-category"
                  value={newFood.category}
                  onChange={(e) =>
                    setNewFood({
                      ...newFood,
                      category: e.target.value
                    })
                  }
                >
                  {categories
                    .filter((item) => item !== 'All')
                    .map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                </select>
              </div>

              <div className="safefood-form-group">
                <label htmlFor="food-emoji">Choose an emoji</label>
                <select
                  id="food-emoji"
                  value={newFood.emoji}
                  onChange={(e) =>
                    setNewFood({
                      ...newFood,
                      emoji: e.target.value
                    })
                  }
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

              <div className="safefood-form-group">
                <label htmlFor="food-note">
                  Why does it feel familiar? (Optional)
                </label>
                <textarea
                  id="food-note"
                  placeholder="A little note about this food..."
                  value={newFood.note}
                  onChange={(e) =>
                    setNewFood({
                      ...newFood,
                      note: e.target.value
                    })
                  }
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="save-food-button"
                disabled={saving}
              >
                <Plus size={17} />
                {saving ? 'Adding...' : 'Add to my collection'}
              </button>

            </form>

          </div>
        </div>
      )}

      <footer className="safefoods-footer">
        spoonful © 2026
        <span>Made with care, one bite at a time.</span>
      </footer>

    </div>
  );
}

export default SafeFoods;