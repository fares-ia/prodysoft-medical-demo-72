
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Plus, Search, Edit, Trash2, Hospital, Calendar, Users, Clipboard, CheckSquare } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";

// Types pour les blocs opératoires
interface OperatingRoom {
  id: string;
  name: string;
  type: "standard" | "specialized" | "emergency";
  capacity: number;
  equipment: string[];
  status: "available" | "occupied" | "maintenance" | "cleaning";
}

interface Surgery {
  id: string;
  roomId: string;
  patientName: string;
  doctorName: string;
  surgeryType: string;
  date: Date;
  startTime: string;
  duration: number; // en minutes
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  notes?: string;
}

const OperatingRooms = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isAddRoomDialogOpen, setIsAddRoomDialogOpen] = useState(false);
  const [isScheduleSurgeryDialogOpen, setIsScheduleSurgeryDialogOpen] = useState(false);
  const [isViewRoomDialogOpen, setIsViewRoomDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<OperatingRoom | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"rooms" | "schedule">("rooms");

  // Données fictives pour les blocs opératoires
  const [rooms, setRooms] = useState<OperatingRoom[]>([
    {
      id: "1",
      name: "Bloc A",
      type: "standard",
      capacity: 8,
      equipment: ["Moniteur cardiaque", "Ventilateur", "Système d'anesthésie", "Lampe chirurgicale"],
      status: "available"
    },
    {
      id: "2",
      name: "Bloc B",
      type: "specialized",
      capacity: 10,
      equipment: ["Robot chirurgical", "Endoscope", "Systèmes d'imagerie", "Équipement neurologique"],
      status: "occupied"
    },
    {
      id: "3",
      name: "Bloc C",
      type: "emergency",
      capacity: 6,
      equipment: ["Défibrillateur", "Moniteur multiparamétrique", "Respirateur d'urgence"],
      status: "available"
    },
    {
      id: "4",
      name: "Bloc D",
      type: "standard",
      capacity: 8,
      equipment: ["Moniteur cardiaque", "Ventilateur", "Système d'anesthésie", "Échographe"],
      status: "maintenance"
    }
  ]);

  // Données fictives pour les opérations programmées
  const [surgeries, setSurgeries] = useState<Surgery[]>([
    {
      id: "1",
      roomId: "1",
      patientName: "Marie Lambert",
      doctorName: "Dr. Pierre Dubois",
      surgeryType: "Appendicectomie",
      date: new Date(2025, 4, 16),
      startTime: "09:00",
      duration: 60,
      status: "scheduled"
    },
    {
      id: "2",
      roomId: "2",
      patientName: "Antoine Moreau",
      doctorName: "Dr. Sophie Martin",
      surgeryType: "Arthroscopie du genou",
      date: new Date(2025, 4, 16),
      startTime: "10:30",
      duration: 120,
      status: "in-progress"
    },
    {
      id: "3",
      roomId: "3",
      patientName: "Julien Bernard",
      doctorName: "Dr. Thomas Legrand",
      surgeryType: "Réduction de fracture",
      date: new Date(2025, 4, 16),
      startTime: "14:00",
      duration: 90,
      status: "scheduled"
    }
  ]);

  const handleAddRoom = () => {
    // Simulation d'ajout d'un bloc opératoire
    const newRoom: OperatingRoom = {
      id: `${rooms.length + 1}`,
      name: `Bloc ${String.fromCharCode(65 + rooms.length)}`,
      type: "standard",
      capacity: 8,
      equipment: ["Équipement standard"],
      status: "available"
    };
    
    setRooms([...rooms, newRoom]);
    setIsAddRoomDialogOpen(false);
    
    toast({
      title: "Bloc opératoire ajouté",
      description: "Le bloc opératoire a été ajouté avec succès.",
    });
  };

  const handleScheduleSurgery = () => {
    // Simulation de programmation d'une opération
    if (selectedRoomId) {
      const newSurgery: Surgery = {
        id: `${surgeries.length + 1}`,
        roomId: selectedRoomId,
        patientName: "Nouveau Patient",
        doctorName: "Dr. Médecin",
        surgeryType: "Intervention",
        date: date,
        startTime: "08:00",
        duration: 60,
        status: "scheduled"
      };
      
      setSurgeries([...surgeries, newSurgery]);
      setIsScheduleSurgeryDialogOpen(false);
      setSelectedRoomId(null);
      
      toast({
        title: "Opération programmée",
        description: "L'opération a été programmée avec succès.",
      });
    }
  };

  const handleDeleteRoom = (roomId: string) => {
    // Vérifier s'il y a des opérations programmées dans cette salle
    const hasScheduledSurgeries = surgeries.some(
      surgery => surgery.roomId === roomId && 
      (surgery.status === "scheduled" || surgery.status === "in-progress")
    );
    
    if (hasScheduledSurgeries) {
      toast({
        title: "Impossible de supprimer",
        description: "Ce bloc opératoire a des opérations programmées ou en cours.",
        variant: "destructive"
      });
      return;
    }
    
    setRooms(rooms.filter(room => room.id !== roomId));
    setSurgeries(surgeries.filter(surgery => surgery.roomId !== roomId));
    
    toast({
      title: "Bloc opératoire supprimé",
      description: "Le bloc opératoire a été supprimé avec succès.",
    });
  };

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "occupied":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "cleaning":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoomStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Disponible";
      case "occupied":
        return "Occupé";
      case "maintenance":
        return "Maintenance";
      case "cleaning":
        return "Nettoyage";
      default:
        return status;
    }
  };

  const getSurgeryStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSurgeryStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Programmée";
      case "in-progress":
        return "En cours";
      case "completed":
        return "Terminée";
      case "cancelled":
        return "Annulée";
      default:
        return status;
    }
  };

  // Filtrer les opérations pour la date sélectionnée
  const filteredSurgeries = surgeries.filter(
    surgery => surgery.date.toDateString() === date.toDateString()
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blocs Opératoires</h1>
            <p className="text-gray-500">Gérez les blocs opératoires et programmez les opérations</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={viewMode === "rooms" ? "default" : "outline"}
              className={viewMode === "rooms" ? "bg-[#0069D9]" : ""}
              onClick={() => setViewMode("rooms")}
            >
              <Hospital className="h-4 w-4 mr-2" />
              Blocs
            </Button>
            <Button 
              variant={viewMode === "schedule" ? "default" : "outline"}
              className={viewMode === "schedule" ? "bg-[#0069D9]" : ""}
              onClick={() => setViewMode("schedule")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Planning
            </Button>
            {viewMode === "rooms" ? (
              <Button onClick={() => setIsAddRoomDialogOpen(true)} className="bg-[#0069D9]">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau bloc
              </Button>
            ) : (
              <Button onClick={() => setIsScheduleSurgeryDialogOpen(true)} className="bg-[#0069D9]">
                <Plus className="h-4 w-4 mr-2" />
                Programmer
              </Button>
            )}
          </div>
        </div>

        {viewMode === "rooms" ? (
          // Vue des blocs opératoires
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map(room => (
              <Card key={room.id} className={
                room.status === "maintenance" ? "border-yellow-300" : 
                room.status === "occupied" ? "border-red-300" : ""
              }>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{room.name}</CardTitle>
                    <Badge className={getRoomStatusColor(room.status)}>
                      {getRoomStatusLabel(room.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold mb-1">Type:</p>
                      <p>
                        {room.type === "standard" ? "Standard" : 
                         room.type === "specialized" ? "Spécialisé" : "Urgence"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">Capacité:</p>
                      <p>{room.capacity} personnes</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">Équipement principal:</p>
                      <ul className="list-disc pl-5 text-sm">
                        {room.equipment.slice(0, 2).map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                        {room.equipment.length > 2 && (
                          <li className="text-gray-500">
                            + {room.equipment.length - 2} autres
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="flex gap-2 justify-between mt-4">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          setSelectedRoom(room);
                          setIsViewRoomDialogOpen(true);
                        }}
                      >
                        Détails
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          setSelectedRoomId(room.id);
                          setIsScheduleSurgeryDialogOpen(true);
                        }}
                      >
                        Programmer
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500"
                        onClick={() => handleDeleteRoom(room.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Vue du planning des opérations
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal w-[240px]"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "PPPP", { locale: fr })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Planning des opérations - {format(date, "EEEE d MMMM yyyy", { locale: fr })}</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredSurgeries.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Aucune opération programmée pour cette date
                  </div>
                ) : (
                  <div className="space-y-4 divide-y">
                    {filteredSurgeries.map(surgery => {
                      const room = rooms.find(r => r.id === surgery.roomId);
                      return (
                        <div key={surgery.id} className="pt-4 first:pt-0">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center text-white",
                                surgery.status === "in-progress" ? "bg-yellow-500" :
                                surgery.status === "completed" ? "bg-green-500" :
                                surgery.status === "cancelled" ? "bg-red-500" :
                                "bg-blue-500"
                              )}>
                                {surgery.status === "in-progress" ? (
                                  <Clock className="h-5 w-5" />
                                ) : surgery.status === "completed" ? (
                                  <CheckSquare className="h-5 w-5" />
                                ) : (
                                  <Calendar className="h-5 w-5" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-semibold">{surgery.surgeryType}</h3>
                                <div className="flex items-center text-sm text-gray-600 gap-4 mt-1">
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {surgery.startTime} ({surgery.duration} min)
                                  </div>
                                  <div className="flex items-center">
                                    <Hospital className="h-3 w-3 mr-1" />
                                    {room?.name || "Bloc inconnu"}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Badge className={getSurgeryStatusColor(surgery.status)}>
                              {getSurgeryStatusLabel(surgery.status)}
                            </Badge>
                          </div>
                          <div className="mt-2 ml-13 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">Patient:</span> {surgery.patientName}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clipboard className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">Médecin:</span> {surgery.doctorName}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Dialog pour ajouter un bloc opératoire */}
      <Dialog open={isAddRoomDialogOpen} onOpenChange={setIsAddRoomDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un bloc opératoire</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du bloc</Label>
              <Input id="name" placeholder="Bloc X" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select defaultValue="standard">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="specialized">Spécialisé</SelectItem>
                  <SelectItem value="emergency">Urgence</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacité (nombre de personnes)</Label>
              <Input id="capacity" type="number" defaultValue="8" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="equipment">Équipement (séparé par des virgules)</Label>
              <Textarea id="equipment" placeholder="Liste des équipements" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Statut initial</Label>
              <Select defaultValue="available">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="cleaning">Nettoyage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoomDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-[#0069D9]" onClick={handleAddRoom}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour programmer une opération */}
      <Dialog open={isScheduleSurgeryDialogOpen} onOpenChange={setIsScheduleSurgeryDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Programmer une opération</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="room">Bloc opératoire</Label>
              <Select defaultValue={selectedRoomId || undefined} onValueChange={setSelectedRoomId}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un bloc" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map(room => (
                    <SelectItem key={room.id} value={room.id} disabled={room.status === "maintenance"}>
                      {room.name} {room.status === "maintenance" && "- En maintenance"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="patient">Patient</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Marie Lambert</SelectItem>
                  <SelectItem value="2">Antoine Moreau</SelectItem>
                  <SelectItem value="3">Julien Bernard</SelectItem>
                  <SelectItem value="4">Sophie Petit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="doctor">Médecin</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un médecin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Dr. Pierre Dubois</SelectItem>
                  <SelectItem value="2">Dr. Sophie Martin</SelectItem>
                  <SelectItem value="3">Dr. Thomas Legrand</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="surgery-type">Type d'opération</Label>
              <Input id="surgery-type" placeholder="Type d'opération" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(date, "P", { locale: fr })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Heure</Label>
                <Select defaultValue="09:00">
                  <SelectTrigger>
                    <SelectValue placeholder="Heure de début" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">08:00</SelectItem>
                    <SelectItem value="08:30">08:30</SelectItem>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="09:30">09:30</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="10:30">10:30</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="11:30">11:30</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="14:30">14:30</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="15:30">15:30</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Durée (minutes)</Label>
              <Select defaultValue="60">
                <SelectTrigger>
                  <SelectValue placeholder="Durée estimée" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 heure</SelectItem>
                  <SelectItem value="90">1 heure 30</SelectItem>
                  <SelectItem value="120">2 heures</SelectItem>
                  <SelectItem value="180">3 heures</SelectItem>
                  <SelectItem value="240">4 heures</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Notes ou instructions spéciales" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleSurgeryDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-[#0069D9]" onClick={handleScheduleSurgery}>
              Programmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour voir les détails d'un bloc */}
      <Dialog open={isViewRoomDialogOpen} onOpenChange={setIsViewRoomDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails du bloc opératoire</DialogTitle>
          </DialogHeader>
          {selectedRoom && (
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{selectedRoom.name}</h3>
                <Badge className={getRoomStatusColor(selectedRoom.status)}>
                  {getRoomStatusLabel(selectedRoom.status)}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">Type:</p>
                <p>{
                  selectedRoom.type === "standard" ? "Standard" : 
                  selectedRoom.type === "specialized" ? "Spécialisé" : "Urgence"
                }</p>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">Capacité:</p>
                <p>{selectedRoom.capacity} personnes</p>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">Équipement:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedRoom.equipment.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">Opérations programmées aujourd'hui:</p>
                {surgeries.filter(
                  surgery => surgery.roomId === selectedRoom.id && 
                  surgery.date.toDateString() === new Date().toDateString()
                ).length === 0 ? (
                  <p className="text-gray-500">Aucune opération programmée pour aujourd'hui</p>
                ) : (
                  <ul className="list-disc pl-5 space-y-1">
                    {surgeries.filter(
                      surgery => surgery.roomId === selectedRoom.id && 
                      surgery.date.toDateString() === new Date().toDateString()
                    ).map(surgery => (
                      <li key={surgery.id}>
                        {surgery.startTime} - {surgery.surgeryType} - {surgery.patientName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              className="bg-[#0069D9]" 
              onClick={() => setIsViewRoomDialogOpen(false)}
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default OperatingRooms;
