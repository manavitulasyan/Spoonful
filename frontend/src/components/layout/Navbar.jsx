
import { NavLink } from 'react-router-dom';
import {
  Home,
  Heart,
  Utensils,
  BookOpen,
  UserRound
} from 'lucide-react';

import Brand from './Brand';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="app-navbar">

      <Brand to="/dashboard" />

      <div className="app-nav-links">
        <NavLink to="/dashboard">
          <Home size={17} /> Home
        </NavLink>

        <NavLink to="/safefoods">
          <Heart size={17} /> Safe Foods
        </NavLink>

        <NavLink to="/recipes">
          <Utensils size={17} /> Explore
        </NavLink>

        <NavLink to="/journal">
          <BookOpen size={17} /> Journal
        </NavLink>

        <NavLink to="/profile">
          <UserRound size={17} /> Profile
        </NavLink>
      </div>

    </nav>
  );
}

export default Navbar;
