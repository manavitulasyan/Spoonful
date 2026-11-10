
import { Routes, Route } from 'react-router-dom';

import Landing from './pages/landing/landing';
import Signup from './pages/signup/signup';
import Login from './pages/login/login';
import Onboarding from './pages/onboarding/onboarding';
import Dashboard from './pages/dashboard/dashboard';
import Recipes from './pages/recipes/recipes';
import SafeFoods from './pages/safefoods/safefoods';
import FoodJournal from './pages/foodjournal/foodjournal';
import Profile from './pages/profile/profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/safefoods" element={<SafeFoods />} />
      <Route path="/journal" element={<FoodJournal />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
