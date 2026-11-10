
import { Link } from 'react-router-dom';
import spoonfulLogo from '../../assets/spoonful-logo-transparent.png';
import './Navbar.css';

function Brand({ to = '/', className = '' }) {
  return (
    <Link
      to={to}
      className={`app-brand ${className}`}
    >
      <img
        src={spoonfulLogo}
        alt="Spoonful logo"
        className="brand-logo"
      />

      <span>spoonful</span>
    </Link>
  );
}

export default Brand;
