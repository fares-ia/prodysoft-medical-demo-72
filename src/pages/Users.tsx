
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Edit, Trash2, UserCog, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";

// Définir les types pour le rôle utilisateur
type UserRole = "admin" | "medecin" | "infirmier" | "reception" | "comptabilite" | "pharmacien" | "technicien";

// Structure de données pour un utilisateur
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  specialty?: string;
  status: "active" | "inactive" | "pending";
  lastLogin?: string;
}

const roleLabels: Record<UserRole, string> = {
  admin: "Administrateur",
  medecin: "Médecin",
  infirmier: "Infirmier",
  reception: "Réceptionniste",
  comptabilite: "Comptabilité",
  pharmacien: "Pharmacien",
  technicien: "Technicien"
};

const roleColors: Record<UserRole, string> = {
  admin: "bg-purple-100 text-purple-800",
  medecin: "bg-blue-100 text-blue-800", 
  infirmier: "bg-green-100 text-green-800",
  reception: "bg-yellow-100 text-yellow-800",
  comptabilite: "bg-pink-100 text-pink-800",
  pharmacien: "bg-indigo-100 text-indigo-800",
  technicien: "bg-orange-100 text-orange-800"
};

const Users = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showMedicalSpecialty, setShowMedicalSpecialty] = useState(false);

  // Données utilisateurs fictives
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "David Lefèvre", email: "david.lefevre@prodysoft.com", role: "admin", status: "active", lastLogin: "2025-05-16 09:23" },
    { id: "2", name: "Marie Laurent", email: "m.laurent@clinique.fr", role: "medecin", specialty: "Cardiologie", status: "active", lastLogin: "2025-05-15 14:35" },
    { id: "3", name: "Pierre Dubois", email: "p.dubois@clinique.fr", role: "medecin", specialty: "Pédiatrie", status: "active", lastLogin: "2025-05-14 11:05" },
    { id: "4", name: "Sophie Moreau", email: "s.moreau@clinique.fr", role: "infirmier", status: "active", lastLogin: "2025-05-16 08:15" },
    { id: "5", name: "Julien Martin", email: "j.martin@clinique.fr", role: "reception", status: "active", lastLogin: "2025-05-16 07:50" },
    { id: "6", name: "Christine Bernard", email: "c.bernard@clinique.fr", role: "comptabilite", status: "inactive", lastLogin: "2025-05-10 16:23" }
  ]);

  const handleRoleChange = (value: string) => {
    setShowMedicalSpecialty(value === "medecin");
  };

  const handleCreateUser = () => {
    // Simulation de création d'utilisateur
    const newUser: User = {
      id: `${users.length + 1}`,
      name: "Nouvel Utilisateur",
      email: "nouvel.utilisateur@clinique.fr",
      role: "reception" as UserRole,
      status: "pending",
    };
    
    setUsers([...users, newUser]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Utilisateur créé avec succès",
      description: "Un email avec les instructions de connexion a été envoyé.",
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé avec succès.",
    });
  };

  const handleEditUser = () => {
    if (selectedUser) {
      setUsers(users.map(user => user.id === selectedUser.id ? selectedUser : user));
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      
      toast({
        title: "Utilisateur modifié",
        description: "Les informations ont été mises à jour.",
      });
    }
  };

  const resetUserPassword = (userId: string) => {
    // Simulation de réinitialisation de mot de passe
    toast({
      title: "Mot de passe réinitialisé",
      description: "Un email avec le nouveau mot de passe a été envoyé.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
            <p className="text-gray-500">Gérez les utilisateurs et leurs accès au système</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-[#0069D9]">
            <UserPlus className="h-4 w-4 mr-2" />
            Nouvel utilisateur
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Liste des utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Dernière connexion</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={roleColors[user.role]}>
                          {roleLabels[user.role]}
                          {user.specialty && ` - ${user.specialty}`}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          user.status === "active" ? "bg-green-100 text-green-800" : 
                          user.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                          "bg-gray-100 text-gray-800"
                        }>
                          {user.status === "active" ? "Actif" : 
                           user.status === "pending" ? "En attente" : "Inactif"}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin || "Jamais"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => {
                              setSelectedUser(user);
                              setIsEditDialogOpen(true);
                              setShowMedicalSpecialty(user.role === "medecin");
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => resetUserPassword(user.id)}
                          >
                            <UserCog className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog pour créer un nouvel utilisateur */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">Prénom</Label>
                <Input id="firstname" placeholder="Prénom" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Nom</Label>
                <Input id="lastname" placeholder="Nom" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Select onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="medecin">Médecin</SelectItem>
                  <SelectItem value="infirmier">Infirmier</SelectItem>
                  <SelectItem value="reception">Réceptionniste</SelectItem>
                  <SelectItem value="comptabilite">Comptabilité</SelectItem>
                  <SelectItem value="pharmacien">Pharmacien</SelectItem>
                  <SelectItem value="technicien">Technicien</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {showMedicalSpecialty && (
              <div className="space-y-2">
                <Label htmlFor="specialty">Spécialité médicale</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiologie">Cardiologie</SelectItem>
                    <SelectItem value="dermatologie">Dermatologie</SelectItem>
                    <SelectItem value="gastroenterologie">Gastro-entérologie</SelectItem>
                    <SelectItem value="neurologie">Neurologie</SelectItem>
                    <SelectItem value="obstetrique">Obstétrique</SelectItem>
                    <SelectItem value="ophtalmologie">Ophtalmologie</SelectItem>
                    <SelectItem value="pediatrie">Pédiatrie</SelectItem>
                    <SelectItem value="psychiatrie">Psychiatrie</SelectItem>
                    <SelectItem value="radiologie">Radiologie</SelectItem>
                    <SelectItem value="urologie">Urologie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-500">Un mot de passe temporaire sera généré et envoyé par email</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-[#0069D9]" onClick={handleCreateUser}>
              Créer l'utilisateur
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour modifier un utilisateur */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-firstname">Prénom</Label>
                  <Input 
                    id="edit-firstname" 
                    value={selectedUser.name.split(' ')[0]}
                    onChange={(e) => setSelectedUser({
                      ...selectedUser, 
                      name: e.target.value + ' ' + selectedUser.name.split(' ')[1]
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-lastname">Nom</Label>
                  <Input 
                    id="edit-lastname" 
                    value={selectedUser.name.split(' ')[1] || ''}
                    onChange={(e) => setSelectedUser({
                      ...selectedUser, 
                      name: selectedUser.name.split(' ')[0] + ' ' + e.target.value
                    })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Rôle</Label>
                <Select 
                  defaultValue={selectedUser.role}
                  onValueChange={(value: string) => {
                    setShowMedicalSpecialty(value === "medecin");
                    setSelectedUser({...selectedUser, role: value as UserRole, specialty: value === "medecin" ? selectedUser.specialty : undefined});
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="medecin">Médecin</SelectItem>
                    <SelectItem value="infirmier">Infirmier</SelectItem>
                    <SelectItem value="reception">Réceptionniste</SelectItem>
                    <SelectItem value="comptabilite">Comptabilité</SelectItem>
                    <SelectItem value="pharmacien">Pharmacien</SelectItem>
                    <SelectItem value="technicien">Technicien</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {showMedicalSpecialty && (
                <div className="space-y-2">
                  <Label htmlFor="edit-specialty">Spécialité médicale</Label>
                  <Select 
                    defaultValue={selectedUser.specialty}
                    onValueChange={(value) => setSelectedUser({...selectedUser, specialty: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une spécialité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiologie">Cardiologie</SelectItem>
                      <SelectItem value="dermatologie">Dermatologie</SelectItem>
                      <SelectItem value="gastroenterologie">Gastro-entérologie</SelectItem>
                      <SelectItem value="neurologie">Neurologie</SelectItem>
                      <SelectItem value="obstetrique">Obstétrique</SelectItem>
                      <SelectItem value="ophtalmologie">Ophtalmologie</SelectItem>
                      <SelectItem value="pediatrie">Pédiatrie</SelectItem>
                      <SelectItem value="psychiatrie">Psychiatrie</SelectItem>
                      <SelectItem value="radiologie">Radiologie</SelectItem>
                      <SelectItem value="urologie">Urologie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="edit-status">Statut</Label>
                <Select 
                  defaultValue={selectedUser.status}
                  onValueChange={(value: string) => setSelectedUser({...selectedUser, status: value as "active" | "inactive" | "pending"})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-[#0069D9]" onClick={handleEditUser}>
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Users;
