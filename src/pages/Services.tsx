
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Plus,
  Edit,
  Trash2,
  Users,
  Briefcase,
  Search,
  UserPlus,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Types pour les services
interface Service {
  id: string;
  name: string;
  description: string;
  head: string;
  headId: string;
  staffCount: number;
  location: string;
  extension: string;
  email: string;
}

interface Staff {
  id: string;
  name: string;
  role: string;
  serviceId: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  status: "active" | "leave" | "training";
}

const Services = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddStaffDialogOpen, setIsAddStaffDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState<"services" | "staff">("services");

  // Données fictives pour les services
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Cardiologie",
      description: "Service spécialisé dans le diagnostic et le traitement des maladies cardiovasculaires.",
      head: "Dr. Robert Martin",
      headId: "u1",
      staffCount: 8,
      location: "Bâtiment A, 2ème étage",
      extension: "2201",
      email: "cardiologie@clinique.fr"
    },
    {
      id: "2",
      name: "Pédiatrie",
      description: "Service de soins médicaux destinés aux nourrissons, enfants et adolescents.",
      head: "Dr. Marie Laurent",
      headId: "u2",
      staffCount: 12,
      location: "Bâtiment B, Rez-de-chaussée",
      extension: "1101",
      email: "pediatrie@clinique.fr"
    },
    {
      id: "3",
      name: "Neurologie",
      description: "Service spécialisé dans le diagnostic et le traitement des troubles du système nerveux.",
      head: "Dr. Thomas Legrand",
      headId: "u3",
      staffCount: 6,
      location: "Bâtiment A, 3ème étage",
      extension: "2301",
      email: "neurologie@clinique.fr"
    },
    {
      id: "4",
      name: "Radiologie",
      description: "Service d'imagerie médicale pour le diagnostic et le traitement des maladies.",
      head: "Dr. Sophie Dubois",
      headId: "u4",
      staffCount: 10,
      location: "Bâtiment C, 1er étage",
      extension: "3101",
      email: "radiologie@clinique.fr"
    },
    {
      id: "5",
      name: "Urgences",
      description: "Service d'accueil et de prise en charge des situations médicales urgentes.",
      head: "Dr. Jean Moreau",
      headId: "u5",
      staffCount: 15,
      location: "Bâtiment A, Rez-de-chaussée",
      extension: "1001",
      email: "urgences@clinique.fr"
    }
  ]);

  // Données fictives pour le personnel
  const [staffList, setStaffList] = useState<Staff[]>([
    {
      id: "s1",
      name: "Dr. Robert Martin",
      role: "Chef de service",
      serviceId: "1",
      email: "r.martin@clinique.fr",
      phone: "0123456789",
      status: "active"
    },
    {
      id: "s2",
      name: "Dr. Isabelle Leroy",
      role: "Cardiologue",
      serviceId: "1",
      email: "i.leroy@clinique.fr",
      phone: "0123456790",
      status: "active"
    },
    {
      id: "s3",
      name: "Julien Petit",
      role: "Infirmier",
      serviceId: "1",
      email: "j.petit@clinique.fr",
      phone: "0123456791",
      status: "leave"
    },
    {
      id: "s4",
      name: "Dr. Marie Laurent",
      role: "Chef de service",
      serviceId: "2",
      email: "m.laurent@clinique.fr",
      phone: "0123456792",
      status: "active"
    },
    {
      id: "s5",
      name: "Dr. Paul Fournier",
      role: "Pédiatre",
      serviceId: "2",
      email: "p.fournier@clinique.fr",
      phone: "0123456793",
      status: "active"
    },
    {
      id: "s6",
      name: "Claire Dupont",
      role: "Infirmière",
      serviceId: "2",
      email: "c.dupont@clinique.fr",
      phone: "0123456794",
      status: "active"
    },
    {
      id: "s7",
      name: "Dr. Thomas Legrand",
      role: "Chef de service",
      serviceId: "3",
      email: "t.legrand@clinique.fr",
      phone: "0123456795",
      status: "active"
    }
  ]);

  const handleCreateService = () => {
    // Simulation de création d'un service
    const newService: Service = {
      id: `${services.length + 1}`,
      name: "Nouveau Service",
      description: "Description du nouveau service",
      head: "À assigner",
      headId: "",
      staffCount: 0,
      location: "À définir",
      extension: "0000",
      email: "nouveau@clinique.fr"
    };
    
    setServices([...services, newService]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Service créé",
      description: "Le nouveau service a été créé avec succès.",
    });
  };

  const handleEditService = () => {
    if (selectedService) {
      setServices(services.map(service => 
        service.id === selectedService.id ? selectedService : service
      ));
      setIsEditDialogOpen(false);
      setSelectedService(null);
      
      toast({
        title: "Service modifié",
        description: "Les informations ont été mises à jour.",
      });
    }
  };

  const handleDeleteService = (serviceId: string) => {
    // Vérifier s'il y a du personnel dans ce service
    const hasStaff = staffList.some(staff => staff.serviceId === serviceId);
    
    if (hasStaff) {
      toast({
        title: "Impossible de supprimer",
        description: "Ce service a du personnel actif. Veuillez d'abord réaffecter le personnel.",
        variant: "destructive"
      });
      return;
    }
    
    setServices(services.filter(service => service.id !== serviceId));
    
    toast({
      title: "Service supprimé",
      description: "Le service a été supprimé avec succès.",
    });
  };

  const handleAddStaff = () => {
    // Simulation d'ajout de personnel
    const newStaff: Staff = {
      id: `s${staffList.length + 1}`,
      name: "Nouveau Membre",
      role: "À définir",
      serviceId: selectedTab || "1",
      email: "nouveau.membre@clinique.fr",
      phone: "0100000000",
      status: "active"
    };
    
    setStaffList([...staffList, newStaff]);
    setIsAddStaffDialogOpen(false);
    
    // Mettre à jour le compteur de personnel du service
    setServices(services.map(service => {
      if (service.id === selectedTab) {
        return {
          ...service,
          staffCount: service.staffCount + 1
        };
      }
      return service;
    }));
    
    toast({
      title: "Personnel ajouté",
      description: "Le nouveau membre du personnel a été ajouté au service.",
    });
  };

  // Filtrer les services par recherche
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtrer le personnel par service sélectionné
  const filteredStaff = staffList.filter(staff =>
    selectedTab ? staff.serviceId === selectedTab : true
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Services</h1>
            <p className="text-gray-500">Gérez les services et le personnel de la clinique</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={currentView === "services" ? "default" : "outline"} 
              className={currentView === "services" ? "bg-[#0069D9]" : ""}
              onClick={() => setCurrentView("services")}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Services
            </Button>
            <Button 
              variant={currentView === "staff" ? "default" : "outline"}
              className={currentView === "staff" ? "bg-[#0069D9]" : ""}
              onClick={() => setCurrentView("staff")}
            >
              <Users className="h-4 w-4 mr-2" />
              Personnel
            </Button>
            {currentView === "services" ? (
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-[#0069D9]">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau service
              </Button>
            ) : (
              <Button onClick={() => setIsAddStaffDialogOpen(true)} className="bg-[#0069D9]">
                <UserPlus className="h-4 w-4 mr-2" />
                Ajouter personnel
              </Button>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            {currentView === "staff" && (
              <Tabs defaultValue={selectedTab || "all"} onValueChange={setSelectedTab}>
                <TabsList>
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  {services.map(service => (
                    <TabsTrigger key={service.id} value={service.id}>
                      {service.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
          </div>
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

        {currentView === "services" ? (
          // Vue des services
          <div className="space-y-6">
            {filteredServices.length === 0 ? (
              <Card className="py-8">
                <CardContent className="text-center text-gray-500">
                  Aucun service ne correspond à votre recherche
                </CardContent>
              </Card>
            ) : (
              filteredServices.map(service => (
                <Card key={service.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{service.name}</CardTitle>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedService(service);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold mb-1">Description:</p>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <p className="text-sm">
                            <span className="font-semibold">Personnel:</span> {service.staffCount} membres
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-500" />
                          <p className="text-sm">
                            <span className="font-semibold">Chef de service:</span> {service.head}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <p className="text-sm">
                            <span className="font-semibold">Localisation:</span> {service.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <p className="text-sm">
                            <span className="font-semibold">Extension téléphonique:</span> {service.extension}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <p className="text-sm">
                            <span className="font-semibold">Email:</span> {service.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        ) : (
          // Vue du personnel
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Liste du personnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          Aucun membre du personnel trouvé
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredStaff.map(staff => {
                        const service = services.find(s => s.id === staff.serviceId);
                        return (
                          <TableRow key={staff.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                                  {staff.avatarUrl && <AvatarImage src={staff.avatarUrl} />}
                                </Avatar>
                                <div className="font-medium">{staff.name}</div>
                              </div>
                            </TableCell>
                            <TableCell>{staff.role}</TableCell>
                            <TableCell>{service?.name || "Non assigné"}</TableCell>
                            <TableCell>
                              <div>{staff.email}</div>
                              <div className="text-sm text-gray-500">{staff.phone}</div>
                            </TableCell>
                            <TableCell>
                              <Badge className={
                                staff.status === "active" ? "bg-green-100 text-green-800" :
                                staff.status === "leave" ? "bg-yellow-100 text-yellow-800" :
                                "bg-blue-100 text-blue-800"
                              }>
                                {staff.status === "active" ? "Actif" :
                                 staff.status === "leave" ? "Congé" : "Formation"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialog pour créer un service */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Créer un nouveau service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du service</Label>
              <Input id="name" placeholder="Nom du service" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Description du service" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="head">Chef de service</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un chef de service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="u1">Dr. Robert Martin</SelectItem>
                  <SelectItem value="u2">Dr. Marie Laurent</SelectItem>
                  <SelectItem value="u3">Dr. Thomas Legrand</SelectItem>
                  <SelectItem value="u4">Dr. Sophie Dubois</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Localisation</Label>
              <Input id="location" placeholder="Bâtiment, étage" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="extension">Extension téléphonique</Label>
                <Input id="extension" placeholder="Ex: 2201" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="service@clinique.fr" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-[#0069D9]" onClick={handleCreateService}>
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour modifier un service */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier le service</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nom du service</Label>
                <Input 
                  id="edit-name" 
                  value={selectedService.name}
                  onChange={(e) => setSelectedService({...selectedService, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input 
                  id="edit-description" 
                  value={selectedService.description}
                  onChange={(e) => setSelectedService({...selectedService, description: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-head">Chef de service</Label>
                <Select 
                  defaultValue={selectedService.headId}
                  onValueChange={(value) => {
                    const headName = value === "u1" ? "Dr. Robert Martin" :
                               value === "u2" ? "Dr. Marie Laurent" :
                               value === "u3" ? "Dr. Thomas Legrand" :
                               value === "u4" ? "Dr. Sophie Dubois" : "À assigner";
                    setSelectedService({...selectedService, headId: value, head: headName});
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un chef de service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="u1">Dr. Robert Martin</SelectItem>
                    <SelectItem value="u2">Dr. Marie Laurent</SelectItem>
                    <SelectItem value="u3">Dr. Thomas Legrand</SelectItem>
                    <SelectItem value="u4">Dr. Sophie Dubois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-location">Localisation</Label>
                <Input 
                  id="edit-location" 
                  value={selectedService.location}
                  onChange={(e) => setSelectedService({...selectedService, location: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-extension">Extension téléphonique</Label>
                  <Input 
                    id="edit-extension" 
                    value={selectedService.extension}
                    onChange={(e) => setSelectedService({...selectedService, extension: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input 
                    id="edit-email" 
                    type="email" 
                    value={selectedService.email}
                    onChange={(e) => setSelectedService({...selectedService, email: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-[#0069D9]" onClick={handleEditService}>
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour ajouter du personnel */}
      <Dialog open={isAddStaffDialogOpen} onOpenChange={setIsAddStaffDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un membre du personnel</DialogTitle>
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
              <Label htmlFor="role">Rôle</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chef">Chef de service</SelectItem>
                  <SelectItem value="medecin">Médecin</SelectItem>
                  <SelectItem value="infirmier">Infirmier</SelectItem>
                  <SelectItem value="aide">Aide-soignant</SelectItem>
                  <SelectItem value="secretaire">Secrétaire médical</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <Select defaultValue={selectedTab || undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@clinique.fr" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" placeholder="01 23 45 67 89" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="leave">Congé</SelectItem>
                  <SelectItem value="training">Formation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddStaffDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-[#0069D9]" onClick={handleAddStaff}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Services;
