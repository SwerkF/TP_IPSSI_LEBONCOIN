import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnnonceApiService } from '@/api/AnnonceApiService';
import { Annonce } from '@/models/Annonce';
import Loader from '@/components/Loader/Loader';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const annoncesApiService = new AnnonceApiService();

const categories = [
  { value: '', label: 'Toutes les catégories' },
  { value: 'electronics', label: 'Électronique' },
  { value: 'furniture', label: 'Meubles' },
  { value: 'clothing', label: 'Vêtements' },
  { value: 'books', label: 'Livres' },
  { value: 'sports', label: 'Sports & Loisirs' },
  { value: 'vehicles', label: 'Véhicules' },
  { value: 'property', label: 'Immobilier' },
  { value: 'other', label: 'Autre' },
];

const Annonces: React.FC = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [filteredAnnonces, setFilteredAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchAnnonces();
  }, []);

  useEffect(() => {
    filterAnnonces();
  }, [annonces, searchTerm, selectedCategory]);

  const fetchAnnonces = async () => {
    setLoading(true);
    try {
      const response = await annoncesApiService.getAnnonces();
      if(response) {
        setAnnonces(response);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching annonces:', error);
      setLoading(false);
    }
  };

  const filterAnnonces = () => {
    let filtered = annonces;

    if (searchTerm) {
      filtered = filtered.filter(annonce => 
        annonce.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        annonce.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(annonce => annonce.category === selectedCategory);
    }

    setFilteredAnnonces(filtered);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Annonces</h2>
      <div className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label htmlFor="search">Recherche</Label>
            <Input
              id="search"
              type="text"
              placeholder="Rechercher une annonce..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-64">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.filter(category => category.value !== '').map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : filteredAnnonces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnonces.map((annonce) => (
            <Card key={annonce._id} className="overflow-hidden">
              <img src={annonce.picture} alt={annonce.title} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle>{annonce.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{annonce.price} €</p>
                <p className="text-sm text-gray-500">{categories.find(cat => cat.value === annonce.category)?.label || 'Non catégorisé'}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/annonces/${annonce._id}`}>Voir l'annonce</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">Aucune annonce trouvée</div>
      )}
    </div>
  );
};

export default Annonces;

