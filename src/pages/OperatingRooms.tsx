
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
import { Calendar as CalendarIcon, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";

// Define types
type Room = {
  id: string;
  name: string;
  type: string;
  status: "available" | "occupied" | "maintenance";
  nextAvailable?: Date;
  equipmentLevel: "basic" | "standard" | "advanced";
  capacity: number;
};

type Reservation = {
  id: string;
  roomId: string;
  date: Date;
  startTime: string;
  endTime: string;
  surgeon: string;
  patient: string;
  procedure: string;
};

const OperatingRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      name: "Bloc A",
      type: "Chirurgie générale",
      status: "available",
      equipmentLevel: "standard",
      capacity: 5,
    },
    {
      id: "2",
      name: "Bloc B",
      type: "Orthopédie",
      status: "occupied",
      nextAvailable: new Date(2023, 4, 15, 14, 0),
      equipmentLevel: "advanced",
      capacity: 4,
    },
    {
      id: "3",
      name: "Bloc C",
      type: "Cardiologie",
      status: "maintenance",
      nextAvailable: new Date(2023, 4, 20),
      equipmentLevel: "advanced",
      capacity: 6,
    },
    {
      id: "4",
      name: "Bloc D",
      type: "Neurologie",
      status: "available",
      equipmentLevel: "advanced",
      capacity: 3,
    },
    {
      id: "5",
      name: "Salle de réveil",
      type: "Post-opératoire",
      status: "available",
      equipmentLevel: "standard",
      capacity: 8,
    },
  ]);

  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      roomId: "2",
      date: new Date(2023, 4, 15, 9, 0),
      startTime: "09:00",
      endTime: "14:00",
      surgeon: "Dr. Martin",
      patient: "Jean Dupont",
      procedure: "Arthroscopie du genou",
    },
  ]);

  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false);
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | undefined>(undefined);

  const [reservationDate, setReservationDate] = useState<Date>(new Date());

  const handleAddRoom = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Create new room with form data
    const newRoom: Room = {
      id: `${rooms.length + 1}`,
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      status: "available",
      equipmentLevel: formData.get("equipmentLevel") as "basic" | "standard" | "advanced",
      capacity: parseInt(formData.get("capacity") as string, 10),
    };

    setRooms([...rooms, newRoom]);
    setIsRoomDialogOpen(false);
    toast({
      title: "Bloc opératoire ajouté",
      description: `Le bloc "${newRoom.name}" a été ajouté avec succès.`,
    });
  };

  const handleAddReservation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!selectedRoomId) return;
    
    const formData = new FormData(event.currentTarget);
    
    // Create new reservation with form data
    const newReservation: Reservation = {
      id: `${reservations.length + 1}`,
      roomId: selectedRoomId,
      date: reservationDate,
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
      surgeon: formData.get("surgeon") as string,
      patient: formData.get("patient") as string,
      procedure: formData.get("procedure") as string,
    };

    // Update room status
    const updatedRooms = rooms.map(room => {
      if (room.id === selectedRoomId) {
        return {
          ...room,
          status: "occupied" as const,
          nextAvailable: new Date(
            reservationDate.getFullYear(),
            reservationDate.getMonth(),
            reservationDate.getDate(),
            parseInt(newReservation.endTime.split(":")[0], 10),
            parseInt(newReservation.endTime.split(":")[1], 10)
          ),
        };
      }
      return room;
    });

    setRooms(updatedRooms);
    setReservations([...reservations, newReservation]);
    setIsReservationDialogOpen(false);
    toast({
      title: "Réservation créée",
      description: `La réservation pour ${newReservation.patient} a été créée avec succès.`,
    });
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = searchTerm === "" || 
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filterType || room.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const roomTypes = [...new Set(rooms.map(room => room.type))];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blocs Opératoires</h1>
            <p className="text-gray-500 mt-1">Gérez les blocs opératoires et réservations</p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={isRoomDialogOpen} onOpenChange={setIsRoomDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau bloc
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Ajouter un bloc opératoire</DialogTitle>
                  <DialogDescription>
                    Remplissez les détails du bloc opératoire ci-dessous
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddRoom} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du bloc</Label>
                    <Input id="name" name="name" placeholder="Bloc A" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de chirurgie</Label>
                    <Input id="type" name="type" placeholder="Chirurgie générale" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="equipmentLevel">Niveau d'équipement</Label>
                    <Select name="equipmentLevel" required defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basique</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="advanced">Avancé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacité (personnes)</Label>
                    <Input id="capacity" name="capacity" type="number" min="1" required defaultValue="4" />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Ajouter</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isReservationDialogOpen} onOpenChange={setIsReservationDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Réserver un bloc
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Réserver un bloc opératoire</DialogTitle>
                  <DialogDescription>
                    Planifiez une intervention chirurgicale
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddReservation} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="room">Bloc opératoire</Label>
                    <Select onValueChange={(value) => setSelectedRoomId(value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un bloc" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms
                          .filter(room => room.status !== "maintenance")
                          .map(room => (
                            <SelectItem key={room.id} value={room.id}>
                              {room.name} - {room.type}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !reservationDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {reservationDate ? format(reservationDate, "PPP") : <span>Sélectionner une date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={reservationDate}
                            onSelect={(newDate) => newDate && setReservationDate(newDate)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surgeon">Chirurgien</Label>
                      <Input id="surgeon" name="surgeon" placeholder="Dr. Nom" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Heure de début</Label>
                      <Input id="startTime" name="startTime" type="time" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">Heure de fin</Label>
                      <Input id="endTime" name="endTime" type="time" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient">Patient</Label>
                    <Input id="patient" name="patient" placeholder="Nom du patient" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="procedure">Type d'intervention</Label>
                    <Input id="procedure" name="procedure" placeholder="Description de la procédure" required />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Réserver</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des blocs opératoires</CardTitle>
            <CardDescription>
              {filteredRooms.length} blocs au total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Rechercher des blocs..."
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
                    <SelectItem value="all">Tous les types</SelectItem>
                    {roomTypes.map((type, index) => (
                      <SelectItem key={index} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Disponibilité</TableHead>
                    <TableHead>Équipement</TableHead>
                    <TableHead>Capacité</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.name}</TableCell>
                      <TableCell>{room.type}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            room.status === "available"
                              ? "bg-green-100 text-green-800"
                              : room.status === "occupied"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {room.status === "available"
                            ? "Disponible"
                            : room.status === "occupied"
                            ? "Occupé"
                            : "En maintenance"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {room.status !== "available" && room.nextAvailable
                          ? `Disponible ${format(room.nextAvailable, "dd/MM/yyyy")} à ${format(room.nextAvailable, "HH:mm")}`
                          : room.status === "available"
                          ? "Maintenant"
                          : "Non disponible"}
                      </TableCell>
                      <TableCell>
                        {room.equipmentLevel === "basic"
                          ? "Basique"
                          : room.equipmentLevel === "standard"
                          ? "Standard"
                          : "Avancé"}
                      </TableCell>
                      <TableCell>{room.capacity} pers.</TableCell>
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
              Affichage de {filteredRooms.length} sur {rooms.length} blocs
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

export default OperatingRooms;
