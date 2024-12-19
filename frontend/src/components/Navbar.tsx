import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Le Bon Coin</Link>
        <div>
          <Link to="/annonces" className="text-white mr-4">Annonces</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-white mr-4">Profil</Link>
              <Link to="/annonces/create" className="text-white mr-4">Créer une annonce</Link>
              <button onClick={logout} className="text-white">Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">Connexion</Link>
              <Link to="/register" className="text-white">Inscription</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

