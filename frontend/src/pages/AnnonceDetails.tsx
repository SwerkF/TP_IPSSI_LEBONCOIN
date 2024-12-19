import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AnnonceApiService } from '@/api/AnnonceApiService';
import Loader from '@/components/Loader/Loader';
import { Annonce } from '@/models/Annonce';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

const AnnonceDetails: React.FC = () => {
  const [annonce, setAnnonce] = useState<Annonce | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState('');
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnnonce();
  }, [id]);

  const fetchAnnonce = async () => {
    setLoading(true);
    try {
      const response = await annoncesApiService.getAnnonce(id!);
      if(response) {
        setAnnonce(response);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching annonce details:', error);
      setLoading(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !annonce) {
      navigate('/login');
      return;
    }

    try {
      await annoncesApiService.editAnnonce(id!, annonce);
      setIsOpen('');
      navigate('/annonces');
    } catch (error) {
      console.error('Error updating annonce:', error);
    }
  }

  const handleDelete = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await annoncesApiService.deleteAnnonce(id!);
      navigate('/annonces');
    } catch (error) {
      console.error('Error deleting annonce:', error);
    }
  };

  const getCategoryLabel = (value: string) => {
    const category = categories.find(cat => cat.value === value);
    return category ? category.label : 'Non spécifié';
  };

  if (loading) {
    return <Loader />;
  }

  if (!annonce) {
    return <div>Annonce non trouvée</div>;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{annonce.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <img src={annonce.picture} alt={annonce.title} className="w-full h-64 object-cover rounded-md" />
        <p className="text-2xl font-semibold">{annonce.price} €</p>
        <p><strong>Catégorie:</strong> {getCategoryLabel(annonce.category)}</p>
        <p>{annonce.description}</p>
      </CardContent>
      {isAuthenticated && (
        <CardFooter className="space-x-2">
          <Dialog open={isOpen === 'edit'} onOpenChange={(open) => setIsOpen(open ? 'edit' : '')}>
            <DialogTrigger asChild>
              <Button variant="outline">Modifier</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier l'annonce</DialogTitle>
                <DialogDescription>Apportez les modifications nécessaires à votre annonce.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleEdit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    value={annonce.title}
                    onChange={(e) => setAnnonce({ ...annonce, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={annonce.description}
                    onChange={(e) => setAnnonce({ ...annonce, description: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Prix</Label>
                  <Input
                    id="price"
                    type="number"
                    value={annonce.price}
                    onChange={(e) => setAnnonce({ ...annonce, price: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select 
                    value={annonce.category} 
                    onValueChange={(value) => setAnnonce({ ...annonce, category: value })}
                  >
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
                    value={annonce.picture}
                    onChange={(e) => setAnnonce({ ...annonce, picture: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit">Enregistrer</Button>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog open={isOpen === 'delete'} onOpenChange={(open) => setIsOpen(open ? 'delete' : '')}>
            <DialogTrigger asChild>
              <Button variant="destructive">Supprimer</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Supprimer l'annonce</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est irréversible.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsOpen('')}>Annuler</Button>
                <Button variant="destructive" onClick={handleDelete}>Supprimer</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );
}

export default AnnonceDetails;

