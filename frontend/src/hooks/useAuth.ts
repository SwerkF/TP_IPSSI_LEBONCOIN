import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/models/User';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:8081/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8081/users/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      fetchUserData(token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await axios.post('http://localhost:8081/users/register', userData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      fetchUserData(token);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const edit = async (userData: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch('http://localhost:8081/users', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      toast.success('Informations mises à jour avec succès');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Erreur lors de la mise à jour des informations');
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  }

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:8081/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('token');
      toast.success('Compte supprimé avec succès');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Erreur lors de la suppression du compte');
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  }

  return { isAuthenticated, user, setUser, login, register, logout, edit, deleteUser };
};

