
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ambulance, Plus, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";

// Define types
type Vehicle = {
  id: string;
  registration: string;
  type: "ambulance" | "service" | "logistics";
  model: string;
  year: string;
  status: "available" | "maintenance" | "in_use";
  lastCheckup: string;
  driver?: string;
};

const Fleet = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      registration: "AB-123-CD",
      type: "ambulance",
      model: "Mercedes Sprinter",
      year: "2021",
      status: "available",
      lastCheckup: "10/05/2023",
      driver: "Jean Dupont"
    },
    {
      id: "2",
      registration: "EF-456-GH",
      type: "ambulance",
      model: "Renault Master",
      year: "2020",
      status: "in_use",
      lastCheckup: "15/04/2023",
      driver: "Sophie Martin"
    },
    {
      id: "3",
      registration: "IJ-789-KL",
      type: "service",
      model: "Peugeot 308",
      year: "2022",
      status: "available",
      lastCheckup: "01/05/2023",
      driver: ""
    },
    {
      id: "4",
      registration: "MN-012-OP",
      type: "logistics",
      model: "Citroën Jumper",
      year: "2019",
      status: "maintenance",
      lastCheckup: "20/03/2023"
    },
    {
      id: "5",
      registration: "QR-345-ST",
      type: "service",
      model: "Volkswagen Caddy",
      year: "2021",
      status: "available",
      lastCheckup: "05/05/2023"
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | undefined>(undefined);

  const handleAddVehicle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Create new vehicle with form data
    const newVehicle: Vehicle = {
      id: `${vehicles.length + 1}`,
      registration: formData.get("registration") as string,
      type: formData.get("type") as "ambulance" | "service" | "logistics",
      model: formData.get("model") as string,
      year: formData.get("year") as string,
      status: "available",
      lastCheckup: new Date().toLocaleDateString("fr-FR"),
      driver: formData.get("driver") as string || undefined,
    };

    setVehicles([...vehicles, newVehicle]);
    setIsDialogOpen(false);
    toast({
      title: "Véhicule ajouté",
      description: `Le véhicule ${newVehicle.registration} a été ajouté à la flotte.`,
    });
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = searchTerm === "" || 
      vehicle.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filterType || vehicle.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const getVehicleTypeName = (type: string) => {
    switch (type) {
      case "ambulance": return "Ambulance";
      case "service": return "Véhicule de service";
      case "logistics": return "Véhicule logistique";
      default: return type;
    }
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case "available": return "Disponible";
      case "maintenance": return "En maintenance";
      case "in_use": return "En service";
      default: return status;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Flotte de véhicules</h1>
            <p className="text-gray-500 mt-1">Gérez les ambulances et véhicules de service</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un véhicule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Ajouter un véhicule</DialogTitle>
                <DialogDescription>
                  Complétez les informations du véhicule ci-dessous
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddVehicle} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="registration">Immatriculation</Label>
                    <Input id="registration" name="registration" placeholder="AB-123-CD" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de véhicule</Label>
                    <Select name="type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ambulance">Ambulance</SelectItem>
                        <SelectItem value="service">Véhicule de service</SelectItem>
                        <SelectItem value="logistics">Véhicule logistique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">Modèle</Label>
                    <Input id="model" name="model" placeholder="Marque et modèle" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Année</Label>
                    <Input id="year" name="year" placeholder="2023" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driver">Conducteur attitré (optionnel)</Label>
                  <Input id="driver" name="driver" placeholder="Nom du conducteur" />
                </div>
                <DialogFooter>
                  <Button type="submit">Ajouter le véhicule</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des véhicules</CardTitle>
            <CardDescription>
              {filteredVehicles.length} véhicules au total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Rechercher des véhicules..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <Select onValueChange={(val) => setFilterType(val === "all" ? undefined : val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrer par type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les véhicules</SelectItem>
                    <SelectItem value="ambulance">Ambulances</SelectItem>
                    <SelectItem value="service">Véhicules de service</SelectItem>
                    <SelectItem value="logistics">Véhicules logistiques</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Immatriculation</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Modèle</TableHead>
                    <TableHead>Année</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Dernier contrôle</TableHead>
                    <TableHead>Conducteur</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.registration}</TableCell>
                      <TableCell>{getVehicleTypeName(vehicle.type)}</TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            vehicle.status === "available"
                              ? "bg-green-100 text-green-800"
                              : vehicle.status === "in_use"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {getStatusName(vehicle.status)}
                        </span>
                      </TableCell>
                      <TableCell>{vehicle.lastCheckup}</TableCell>
                      <TableCell>{vehicle.driver || "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-gray-500">
              Affichage de {filteredVehicles.length} sur {vehicles.length} véhicules
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Précédent
              </Button>
              <Button variant="outline" size="sm" disabled>
                Suivant
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Fleet;
