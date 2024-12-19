import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AnnonceApiService } from '@/api/AnnonceApiService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from 'react-toastify';

const annoncesApiService = new AnnonceApiService();

const categories = [
  { value: 'electronics', label: 'Électronique' },
  { value: 'furniture', label: 'Meubles' },
  { value: 'clothing', label: 'Vêtements' },
  { value: 'books', label: 'Livres' },
  { value: 'sports', label: 'Sports & Loisirs' },
  { value: 'vehicles', label: 'Véhicules' },
  { value: 'property', label: 'Immobilier' },
  { value: 'other', label: 'Autre' },
];

const CreateAnnonce: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [picture, setPicture] = useState('');
  const [category, setCategory] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await annoncesApiService.createAnnonce({ title, description, price: Number(price), picture, category });
      toast.success('Annonce créée avec succès');
      navigate('/annonces');
    } catch (error) {
      console.error('Error creating annonce:', error);
      toast.error('Erreur lors de la création de l\'annonce');
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Créer une annonce</CardTitle>
        <CardDescription>Publiez votre nouvelle annonce</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Prix</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="picture">URL de l'image</Label>
            <Input
              id="picture"
              type="url"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Créer l'annonce</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateAnnonce;

