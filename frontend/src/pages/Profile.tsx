import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from 'react-toastify';

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const { isAuthenticated, user, edit, deleteUser } = useAuth();

    const [userData, setUserData] = useState(user);

    useEffect(() => {
        setUserData(user);
    }, [user]);

    const handleDelete = async () => {
        try {
            await deleteUser();
            setIsOpen(false);
            toast.success('Compte supprimé avec succès');
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Erreur lors de la suppression du compte');
        }
    }
    
    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Gérez vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent>
                {isAuthenticated && userData && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="userName">Nom d'utilisateur</Label>
                            <Input
                                id="userName"
                                value={userData.userName}
                                onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input
                                id="firstName"
                                value={userData.firstName}
                                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Nom</Label>
                            <Input
                                id="lastName"
                                value={userData.lastName}
                                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                        </div>
                        <Button onClick={() => edit(userData)} className="w-full">
                            Modifier
                        </Button>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button variant="destructive" className="w-full">Supprimer le compte</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Êtes-vous sûr de vouloir supprimer votre compte ?</DialogTitle>
                                    <DialogDescription>
                                        Cette action est irréversible. Toutes vos données seront supprimées définitivement.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-end space-x-2">
                                    <Button variant="outline" onClick={() => setIsOpen(false)}>Annuler</Button>
                                    <Button variant="destructive" onClick={handleDelete}>Supprimer</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default Profile;

