
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";

// Types pour les fournisseurs
type SupplierCategory = "medical" | "medication" | "laboratory" | "office" | "maintenance" | "food" | "other";

interface Supplier {
  id: string;
  name: string;
  category: SupplierCategory;
  contact: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
}

const categoryLabels: Record<SupplierCategory, string> = {
  medical: "Équipement médical",
  medication: "Médicaments",
  laboratory: "Laboratoire",
  office: "Fournitures de bureau",
  maintenance: "Maintenance",
  food: "Alimentation",
  other: "Autre"
};

const Suppliers = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Données fictives pour les fournisseurs
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { 
      id: "1", 
      name: "MediTech Solutions", 
      category: "medical", 
      contact: "Jean Durant", 
      email: "contact@meditech.fr", 
      phone: "01 23 45 67 89", 
      address: "15 rue des Innovations, 75001 Paris",
      status: "active" 
    },
    { 
      id: "2", 
      name: "PharmaPlus", 
      category: "medication", 
      contact: "Sophie Martin", 
      email: "s.martin@pharmaplus.fr", 
      phone: "01 34 56 78 90", 
      address: "45 avenue de la Santé, 69002 Lyon",
      status: "active" 
    },
    { 
      id: "3", 
      name: "LabEquip", 
      category: "laboratory", 
      contact: "Thomas Bernard", 
      email: "contact@labequip.fr", 
      phone: "01 45 67 89 01", 
      address: "23 boulevard des Sciences, 33000 Bordeaux",
      status: "active"
    },
    { 
      id: "4", 
      name: "BureauPro", 
      category: "office", 
      contact: "Émilie Petit", 
      email: "service@bureaupro.fr", 
      phone: "01 56 78 90 12", 
      address: "8 rue du Commerce, 59000 Lille",
      status: "inactive" 
    },
    { 
      id: "5", 
      name: "CleanMed", 
      category: "maintenance", 
      contact: "Paul Dubois", 
      email: "contact@cleanmed.fr", 
      phone: "01 67 89 01 23", 
      address: "34 rue de la Propreté, 44000 Nantes",
      status: "active" 
    }
  ]);

  const handleCreateSupplier = () => {
    // Simulation de création de fournisseur
    const newSupplier: Supplier = {
      id: `${suppliers.length + 1}`,
      name: "Nouveau Fournisseur",
      category: "other",
      contact: "Contact",
      email: "contact@nouveau.fr",
      phone: "01 23 45 67 89",
      address: "Adresse",
      status: "active"
    };
    
    setSuppliers([...suppliers, newSupplier]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Fournisseur ajouté",
      description: "Le nouveau fournisseur a été ajouté avec succès.",
    });
  };

  const handleEditSupplier = () => {
    if (selectedSupplier) {
      setSuppliers(suppliers.map(supplier => 
        supplier.id === selectedSupplier.id ? selectedSupplier : supplier
      ));
      setIsEditDialogOpen(false);
      setSelectedSupplier(null);
      
      toast({
        title: "Fournisseur modifié",
        description: "Les informations ont été mises à jour.",
      });
    }
  };

  const handleDeleteSupplier = (supplierId: string) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
    
    toast({
      title: "Fournisseur supprimé",
      description: "Le fournisseur a été supprimé avec succès.",
    });
  };

  // Filtrer les fournisseurs par catégorie et recherche
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesCategory = activeCategory === "all" || supplier.category === activeCategory;
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        supplier.contact.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fournisseurs</h1>
            <p className="text-gray-500">Gérez les fournisseurs pour votre établissement</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-[#0069D9]">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau fournisseur
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Liste des fournisseurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
              <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveCategory}>
                <TabsList className="grid grid-cols-4 sm:grid-cols-7 w-full sm:w-auto">
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="medical">Médical</TabsTrigger>
                  <TabsTrigger value="medication">Médicaments</TabsTrigger>
                  <TabsTrigger value="laboratory">Laboratoire</TabsTrigger>
                  <TabsTrigger value="office">Bureau</TabsTrigger>
                  <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                  <TabsTrigger value="other">Autres</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="relative w-full sm:w-64">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  className="pl-9"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email / Téléphone</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        Aucun fournisseur trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">
                            {categoryLabels[supplier.category]}
                          </Badge>
                        </TableCell>
                        <TableCell>{supplier.contact}</TableCell>
                        <TableCell>
                          <div>{supplier.email}</div>
                          <div className="text-sm text-gray-500">{supplier.phone}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            supplier.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }>
                            {supplier.status === "active" ? "Actif" : "Inactif"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => {
                                setSelectedSupplier(supplier);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-red-500"
                              onClick={() => handleDeleteSupplier(supplier.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog pour créer un nouveau fournisseur */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un fournisseur</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du fournisseur</Label>
              <Input id="name" placeholder="Nom de l'entreprise" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Équipement médical</SelectItem>
                  <SelectItem value="medication">Médicaments</SelectItem>
                  <SelectItem value="laboratory">Laboratoire</SelectItem>
                  <SelectItem value="office">Fournitures de bureau</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="food">Alimentation</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact">Nom du contact</Label>
              <Input id="contact" placeholder="Nom et prénom" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@exemple.fr" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" placeholder="01 23 45 67 89" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Textarea id="address" placeholder="Adresse complète" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-[#0069D9]" onClick={handleCreateSupplier}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour modifier un fournisseur */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier le fournisseur</DialogTitle>
          </DialogHeader>
          {selectedSupplier && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nom du fournisseur</Label>
                <Input 
                  id="edit-name" 
                  value={selectedSupplier.name}
                  onChange={(e) => setSelectedSupplier({...selectedSupplier, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-category">Catégorie</Label>
                <Select 
                  defaultValue={selectedSupplier.category}
                  onValueChange={(value) => setSelectedSupplier({...selectedSupplier, category: value as SupplierCategory})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Équipement médical</SelectItem>
                    <SelectItem value="medication">Médicaments</SelectItem>
                    <SelectItem value="laboratory">Laboratoire</SelectItem>
                    <SelectItem value="office">Fournitures de bureau</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="food">Alimentation</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-contact">Nom du contact</Label>
                <Input 
                  id="edit-contact" 
                  value={selectedSupplier.contact}
                  onChange={(e) => setSelectedSupplier({...selectedSupplier, contact: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input 
                    id="edit-email" 
                    type="email" 
                    value={selectedSupplier.email}
                    onChange={(e) => setSelectedSupplier({...selectedSupplier, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Téléphone</Label>
                  <Input 
                    id="edit-phone" 
                    value={selectedSupplier.phone}
                    onChange={(e) => setSelectedSupplier({...selectedSupplier, phone: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-address">Adresse</Label>
                <Textarea 
                  id="edit-address" 
                  value={selectedSupplier.address}
                  onChange={(e) => setSelectedSupplier({...selectedSupplier, address: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-status">Statut</Label>
                <Select 
                  defaultValue={selectedSupplier.status}
                  onValueChange={(value) => setSelectedSupplier({...selectedSupplier, status: value as "active" | "inactive"})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-[#0069D9]" onClick={handleEditSupplier}>
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Suppliers;
