
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Clock3,
  Heart,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
  X
} from 'lucide-react';

import Navbar from '../../components/layout/Navbar';
import './recipes.css';

const sampleRecipes = [
  {
    id: 1,
    name: 'Creamy White Sauce Pasta',
    category: 'Comfort Meals',
    time: '25 min',
    difficulty: 'Easy',
    texture: 'Creamy · Smooth',
    taste: 'Mild · Savoury',
    description: 'A gentle, creamy pasta for a familiar and comforting meal.',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700',
    ingredients: ['Pasta', 'Milk', 'Butter', 'Cheese', 'Garlic']
  },
  {
    id: 2,
    name: 'Fresh Strawberry Bowl',
    category: 'Fruits',
    time: '10 min',
    difficulty: 'Easy',
    texture: 'Juicy · Soft',
    taste: 'Sweet · Fresh',
    description: 'A simple fruit bowl with fresh and naturally sweet flavours.',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=700',
    ingredients: ['Strawberries', 'Banana', 'Yoghurt', 'Honey']
  },
  {
    id: 3,
    name: 'Avocado Toast',
    category: 'Breakfast',
    time: '15 min',
    difficulty: 'Easy',
    texture: 'Crispy · Creamy',
    taste: 'Mild · Savoury',
    description: 'Crunchy toast paired with a smooth and creamy topping.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700',
    ingredients: ['Bread', 'Avocado', 'Lemon', 'Salt', 'Pepper']
  },
  {
    id: 4,
    name: 'Vegetable Fried Rice',
    category: 'Comfort Meals',
    time: '20 min',
    difficulty: 'Easy',
    texture: 'Soft · Slightly crunchy',
    taste: 'Savoury · Mild',
    description: 'A familiar rice dish with lightly cooked vegetables.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=700',
    ingredients: ['Rice', 'Carrot', 'Beans', 'Spring onion', 'Soy sauce']
  },
  {
    id: 5,
    name: 'Blueberry Smoothie',
    category: 'Drinks',
    time: '5 min',
    difficulty: 'Easy',
    texture: 'Smooth · Creamy',
    taste: 'Sweet · Mild',
    description: 'A cool and smooth drink made with berries and yoghurt.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=700',
    ingredients: ['Blueberries', 'Banana', 'Yoghurt', 'Milk']
  },
  {
    id: 6,
    name: 'Classic Pancakes',
    category: 'Breakfast',
    time: '20 min',
    difficulty: 'Easy',
    texture: 'Soft · Fluffy',
    taste: 'Sweet · Mild',
    description: 'Soft, fluffy pancakes for a simple breakfast.',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=700',
    ingredients: ['Flour', 'Milk', 'Egg', 'Sugar', 'Butter']
  }
];

const categories = [
  'All',
  'Breakfast',
  'Comfort Meals',
  'Fruits',
  'Drinks'
];

function Recipes() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = useMemo(() => {
    return sampleRecipes.filter((recipe) => {
      const matchesCategory =
        activeCategory === 'All' || recipe.category === activeCategory;

      const searchText = search.toLowerCase();

      const matchesSearch =
        recipe.name.toLowerCase().includes(searchText) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchText)
        );

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const toggleSaved = (id) => {
    setSavedRecipes((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  return (
    <div className="recipes-page">
      <Navbar />

      <main className="recipes-container">

        {/* PAGE INTRO */}
        <section className="recipes-heading">
          <div>
            <span className="recipes-eyebrow">
              <Sparkles size={15} />
              A LITTLE SOMETHING NEW
            </span>

            <h1>Explore at your pace.</h1>

            <p>
              Discover recipes that match what feels comfortable
              to you. There is no rush to try anything new.
            </p>
          </div>

          <div className="recipes-heading-decoration">✳</div>
        </section>

        {/* SEARCH */}
        <section className="recipe-discovery">

          <div className="recipe-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search recipes or ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* FILTERS */}
          <div className="recipe-filter-heading">
            <div>
              <SlidersHorizontal size={16} />
              <span>Explore by category</span>
            </div>

            <span>{filteredRecipes.length} recipes</span>
          </div>

          <div className="recipe-categories">
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

        </section>

        {/* RECIPE GRID */}
        <section className="recipe-results">

          <div className="recipe-results-heading">
            <div>
              <span className="recipes-section-tag">YOUR DISCOVERY SPACE</span>
              <h2>Recipes to explore</h2>
            </div>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="recipe-grid">

              {filteredRecipes.map((recipe) => (
                <article className="recipe-card" key={recipe.id}>

                  <div className="recipe-image-wrapper">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="recipe-image"
                      loading="lazy"
                    />

                    <button
                      type="button"
                      className={`recipe-save-button ${
                        savedRecipes.includes(recipe.id) ? 'saved' : ''
                      }`}
                      onClick={() => toggleSaved(recipe.id)}
                      aria-label={
                        savedRecipes.includes(recipe.id)
                          ? 'Remove saved recipe'
                          : 'Save recipe'
                      }
                    >
                      <Heart
                        size={19}
                        fill={
                          savedRecipes.includes(recipe.id)
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    </button>

                    <span className="recipe-category-label">
                      {recipe.category}
                    </span>
                  </div>

                  <div className="recipe-card-content">

                    <h3>{recipe.name}</h3>

                    <p className="recipe-description">
                      {recipe.description}
                    </p>

                    <div className="recipe-meta">
                      <span>
                        <Clock3 size={14} />
                        {recipe.time}
                      </span>

                      <span>{recipe.difficulty}</span>
                    </div>

                    <div className="recipe-tags">
                      <span>{recipe.texture}</span>
                      <span>{recipe.taste}</span>
                    </div>

                    <button
                      type="button"
                      className="recipe-view-button"
                      onClick={() => setSelectedRecipe(recipe)}
                    >
                      View recipe <ArrowRight size={16} />
                    </button>

                  </div>

                </article>
              ))}

            </div>
          ) : (
            <div className="recipes-empty">
              <Search size={32} />
              <h3>No recipes found</h3>
              <p>Try another search or choose a different category.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setActiveCategory('All');
                }}
              >
                Clear filters
              </button>
            </div>
          )}

        </section>

        {/* GENTLE REMINDER */}
        <section className="recipes-reminder">
          <div className="recipes-reminder-icon">♡</div>

          <div>
            <h3>Explore without expectations.</h3>
            <p>
              You can save a recipe, come back to it later,
              or simply enjoy discovering what's out there.
            </p>
          </div>
        </section>

      </main>

      {/* RECIPE DETAILS MODAL */}
      {selectedRecipe && (
        <div
          className="recipe-modal-overlay"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="recipe-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="recipe-modal-title"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="recipe-modal-close"
              onClick={() => setSelectedRecipe(null)}
              aria-label="Close recipe details"
            >
              <X size={20} />
            </button>

            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="recipe-modal-image"
            />

            <div className="recipe-modal-content">

              <span className="recipes-section-tag">
                {selectedRecipe.category}
              </span>

              <h2 id="recipe-modal-title">
                {selectedRecipe.name}
              </h2>

              <p>{selectedRecipe.description}</p>

              <div className="recipe-modal-meta">
                <span><Clock3 size={15} /> {selectedRecipe.time}</span>
                <span>{selectedRecipe.difficulty}</span>
              </div>

              <h3>Ingredients</h3>

              <ul className="recipe-ingredients">
                {selectedRecipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>

              <div className="recipe-modal-tags">
                <span>{selectedRecipe.texture}</span>
                <span>{selectedRecipe.taste}</span>
              </div>

              <button
                type="button"
                className="recipe-modal-save"
                onClick={() => toggleSaved(selectedRecipe.id)}
              >
                <Heart
                  size={17}
                  fill={
                    savedRecipes.includes(selectedRecipe.id)
                      ? 'currentColor'
                      : 'none'
                  }
                />
                {savedRecipes.includes(selectedRecipe.id)
                  ? 'Saved to favourites'
                  : 'Save this recipe'}
              </button>

            </div>

          </div>
        </div>
      )}

      <footer className="recipes-footer">
        spoonful © 2026
        <span>Made with care, one bite at a time.</span>
      </footer>

    </div>
  );
}

export default Recipes;
