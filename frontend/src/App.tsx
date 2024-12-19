import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Annonces from './pages/Annonces';
import CreateAnnonce from './pages/CreateAnnonce';
import AnnonceDetails from './pages/AnnonceDetails';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <div className="app min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="container mx-auto mt-4 p-4">
            <Routes>
              <Route path="/" element={<Annonces />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/annonces" element={<Annonces />} />
              <Route path="/annonces/create" element={<CreateAnnonce />} />
              <Route path="/annonces/:id" element={<AnnonceDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;

