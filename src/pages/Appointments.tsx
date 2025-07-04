
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { 
  Plus, Clock, Printer, Download, Filter, Search,
  Calendar as CalendarIcon, ArrowLeft, ArrowRight, ChevronDown, List, Grid
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { addDays, format, isSameDay, subDays, startOfWeek, endOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock data for appointments with added fields for enhanced functionality
const mockAppointments = [
  { 
    id: 1, 
    time: "09:00", 
    patient: "Marie Dupont", 
    purpose: "Consultation générale", 
    status: "Confirmé",
    duration: 30,
    phone: "06 12 34 56 78",
    email: "marie.dupont@example.com",
    notes: "Patiente présentant des symptômes de rhume",
    recurring: true,
    lastVisit: "12/04/2023"
  },
  { 
    id: 2, 
    time: "10:30", 
    patient: "Jean Lefebvre", 
    purpose: "Suivi post-opératoire", 
    status: "Confirmé",
    duration: 45,
    phone: "06 23 45 67 89",
    email: "jean.lefebvre@example.com",
    notes: "Vérification de la cicatrisation",
    recurring: false,
    lastVisit: "05/03/2023"
  },
  { 
    id: 3, 
    time: "12:00", 
    patient: "Lucie Martin", 
    purpose: "Consultation dermatologique", 
    status: "Annulé",
    duration: 30,
    phone: "06 34 56 78 90",
    email: "lucie.martin@example.com",
    notes: "A appelé pour annuler - problème de transport",
    recurring: false,
    lastVisit: "22/01/2023"
  },
  { 
    id: 4, 
    time: "14:15", 
    patient: "Thomas Bernard", 
    purpose: "Renouvellement ordonnance", 
    status: "Confirmé",
    duration: 15,
    phone: "06 45 67 89 01",
    email: "thomas.bernard@example.com",
    notes: "Traitement contre l'hypertension",
    recurring: true,
    lastVisit: "03/04/2023"
  },
  { 
    id: 5, 
    time: "15:30", 
    patient: "Sophie Dubois", 
    purpose: "Consultation urgente", 
    status: "En attente",
    duration: 30,
    phone: "06 56 78 90 12",
    email: "sophie.dubois@example.com",
    notes: "Douleurs abdominales",
    recurring: false,
    lastVisit: "Nouveau patient"
  },
  { 
    id: 6, 
    time: "16:45", 
    patient: "Paul Moreau", 
    purpose: "Suivi diabète", 
    status: "Terminé",
    duration: 30,
    phone: "06 67 89 01 23",
    email: "paul.moreau@example.com",
    notes: "Vérification des niveaux de glycémie",
    recurring: true,
    lastVisit: "15/04/2023"
  },
  { 
    id: 7, 
    time: "08:30", 
    patient: "Claire Rousseau", 
    purpose: "Vaccination", 
    status: "Confirmé",
    duration: 15,
    phone: "06 78 90 12 34",
    email: "claire.rousseau@example.com",
    notes: "Vaccin contre la grippe",
    recurring: false,
    lastVisit: "10/02/2023"
  },
];

// Time slots for the day
const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00"
];

// Types for statuses and purposes for better filtering
const statusOptions = ["Tous", "Confirmé", "En attente", "Annulé", "Terminé"];
const purposeOptions = ["Tous", "Consultation générale", "Suivi", "Urgence", "Vaccination", "Renouvellement ordonnance"];

const Appointments = () => {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState(mockAppointments);
  const [view, setView] = useState<"day" | "week">("day");
  const [displayMode, setDisplayMode] = useState<"list" | "grid">("list");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [purposeFilter, setStatusPurpose] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  
  // Calculate next 7 days for week view
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(date, { weekStartsOn: 1 }), i));

  // Navigate through dates
  const goToNextDay = () => setDate(addDays(date, 1));
  const goToPrevDay = () => setDate(subDays(date, 1));
  const goToToday = () => setDate(new Date());
  const goToNextWeek = () => setDate(addDays(date, 7));
  const goToPrevWeek = () => setDate(subDays(date, 7));

  // Filter appointments based on filters and search
  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = statusFilter === "Tous" || appointment.status === statusFilter;
    const matchesPurpose = purposeFilter === "Tous" || appointment.purpose === purposeFilter;
    const matchesSearch = 
      appointment.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPurpose && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmé": return "bg-green-100 text-green-800";
      case "En attente": return "bg-amber-100 text-amber-800";
      case "Annulé": return "bg-red-100 text-red-800";
      case "Terminé": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAppointmentForTimeSlot = (time: string, day?: Date) => {
    const currentDay = day || date;
    return appointments.find(
      app => app.time === time && 
      (!day || isSameDay(currentDay, date))
    );
  };

  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowDetailDrawer(true);
  };

  const handlePrint = () => {
    toast({
      title: "Impression en cours",
      description: "L'agenda du " + format(date, "dd/MM/yyyy") + " est en cours d'impression.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export réussi",
      description: "L'agenda a été exporté au format CSV.",
    });
  };

  const handleSendReminders = () => {
    toast({
      title: "Rappels envoyés",
      description: "Des rappels ont été envoyés à tous les patients ayant un rendez-vous demain.",
    });
  };

  // Date formatter for display
  const formatDate = (date: Date): string => {
    return format(date, "dd MMMM yyyy", { locale: fr });
  };

  return (
    <DashboardLayout>
      {/* Header section with title and action buttons */}
      <div className="container mx-auto py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rendez-vous</h1>
            <p className="text-gray-500">Gérez votre agenda et vos rendez-vous</p>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Rechercher..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            
            <Button variant="outline" size="icon">
              {displayMode === "list" ? (
                <Grid className="h-4 w-4" onClick={() => setDisplayMode("grid")} />
              ) : (
                <List className="h-4 w-4" onClick={() => setDisplayMode("list")} />
              )}
            </Button>
            
            {isMobile && (
              <Button variant="outline" size="icon" onClick={() => setShowFilterDrawer(true)}>
                <Filter className="h-4 w-4" />
              </Button>
            )}
            
            <Button variant="outline" size="icon" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon" onClick={handleExport}>
              <Download className="h-4 w-4" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "dd/MM/yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="border rounded-md pointer-events-auto"
                />
                <div className="p-3 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={goToToday}
                  >
                    Aujourd'hui
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="bg-[#0069D9]">
                  <Plus className="mr-2 h-4 w-4" /> Nouveau
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto py-4 px-6">
                  <DrawerHeader>
                    <DrawerTitle>Ajouter un rendez-vous</DrawerTitle>
                  </DrawerHeader>
                  <form className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <label htmlFor="patient" className="text-sm font-medium">Patient</label>
                      <select id="patient" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="">Sélectionner un patient</option>
                        <option value="Marie Dupont">Marie Dupont</option>
                        <option value="Jean Lefebvre">Jean Lefebvre</option>
                        <option value="Lucie Martin">Lucie Martin</option>
                        <option value="Thomas Bernard">Thomas Bernard</option>
                        <option value="Sophie Dubois">Sophie Dubois</option>
                        <option value="Paul Moreau">Paul Moreau</option>
                        <option value="Claire Rousseau">Claire Rousseau</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="date" className="text-sm font-medium">Date</label>
                      <div className="flex justify-center">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => newDate && setDate(newDate)}
                          className="border rounded-md pointer-events-auto"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="time" className="text-sm font-medium">Heure</label>
                        <select id="time" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="">Sélectionner une heure</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="duration" className="text-sm font-medium">Durée</label>
                        <select id="duration" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option value="15">15 minutes</option>
                          <option value="30" selected>30 minutes</option>
                          <option value="45">45 minutes</option>
                          <option value="60">1 heure</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="purpose" className="text-sm font-medium">Motif</label>
                      <select id="purpose" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="">Sélectionner un motif</option>
                        <option value="Consultation générale">Consultation générale</option>
                        <option value="Suivi">Suivi</option>
                        <option value="Urgence">Urgence</option>
                        <option value="Vaccination">Vaccination</option>
                        <option value="Renouvellement ordonnance">Renouvellement ordonnance</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="recurring" className="text-sm font-medium">Récurrent</label>
                      <select id="recurring" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="non">Non</option>
                        <option value="hebdomadaire">Hebdomadaire</option>
                        <option value="bimensuel">Bi-mensuel</option>
                        <option value="mensuel">Mensuel</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="note" className="text-sm font-medium">Note</label>
                      <textarea 
                        id="note" 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                        rows={3}
                        placeholder="Ajouter une note (optionnel)"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline">Annuler</Button>
                      <Button className="bg-[#0069D9]">Enregistrer</Button>
                    </div>
                  </form>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Filters only (calendar removed) */}
          <div className={`${isMobile ? "hidden" : "col-span-12 md:col-span-3"}`}>
            <div className="space-y-6">              
              {/* Filters */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Filtres</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Statut</label>
                    <select 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Motif</label>
                    <select 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={purposeFilter}
                      onChange={(e) => setStatusPurpose(e.target.value)}
                    >
                      {purposeOptions.map(purpose => (
                        <option key={purpose} value={purpose}>{purpose}</option>
                      ))}
                    </select>
                  </div>
                  <Button className="w-full" variant="outline" onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("Tous");
                    setStatusPurpose("Tous");
                  }}>
                    Réinitialiser
                  </Button>
                </CardContent>
              </Card>
              
              {/* Actions rapides */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full bg-[#0069D9]" onClick={handleSendReminders}>
                    <CalendarIcon className="mr-2 h-4 w-4" /> Envoyer rappels
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main appointment view */}
          <div className="col-span-12 md:col-span-9">
            {/* Date navigation and view toggle */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div className="flex gap-2">
                    {view === "day" ? (
                      <>
                        <Button variant="outline" size="icon" onClick={goToPrevDay}>
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={goToNextDay}>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="icon" onClick={goToPrevWeek}>
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={goToNextWeek}>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="outline" onClick={goToToday}>Aujourd'hui</Button>
                  </div>
                  
                  <div className="text-lg font-medium truncate text-center">
                    {view === "day" 
                      ? format(date, "EEEE dd MMMM yyyy", { locale: fr }) 
                      : `${format(weekDays[0], "dd")} - ${format(weekDays[6], "dd")} ${format(weekDays[0], "MMMM yyyy", { locale: fr })}`}
                  </div>
                  
                  <div className="flex gap-2">
                    <Tabs value={view} onValueChange={(v) => setView(v as "day" | "week")}>
                      <TabsList>
                        <TabsTrigger value="day">
                          <CalendarIcon className="h-4 w-4 mr-1" /> Jour
                        </TabsTrigger>
                        <TabsTrigger value="week">
                          <CalendarIcon className="h-4 w-4 mr-1" /> Semaine
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Appointment display */}
            <Card>
              <CardHeader className="bg-gray-50 border-b py-3 px-4">
                <CardTitle className="text-lg font-medium flex justify-between items-center">
                  <span>
                    {view === "day" 
                      ? `Rendez-vous du ${format(date, "dd/MM/yyyy")}`
                      : `Rendez-vous de la semaine`}
                  </span>
                  <Badge variant="outline" className="ml-2">
                    {filteredAppointments.length} RDV
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {view === "day" && (
                  <>
                    {/* List view */}
                    {displayMode === "list" && (
                      <div className="divide-y">
                        {timeSlots.map((time) => {
                          const appointment = getAppointmentForTimeSlot(time);
                          return (
                            <div key={time} className={`flex p-3 ${appointment ? "bg-gray-50" : ""}`}>
                              <div className="w-16 flex items-center justify-center font-medium text-gray-500">
                                <Clock className="h-4 w-4 mr-1" /> {time}
                              </div>
                              {appointment ? (
                                <div 
                                  className="flex-1 ml-4 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                                  onClick={() => handleAppointmentClick(appointment)}
                                >
                                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                      <h4 className="font-medium">{appointment.patient}</h4>
                                      <p className="text-sm text-gray-500">{appointment.purpose}</p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                                      <span className="text-xs text-gray-500">{appointment.duration} min</span>
                                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                        {appointment.status}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex-1 ml-4 p-2 border border-dashed border-gray-200 rounded-md flex items-center justify-center bg-white">
                                  <Drawer>
                                    <DrawerTrigger asChild>
                                      <Button variant="ghost" className="text-sm text-gray-400 hover:text-gray-700">
                                        <Plus className="h-3 w-3 mr-1" /> Disponible
                                      </Button>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                      <div className="max-w-md mx-auto py-4 px-6">
                                        <DrawerHeader>
                                          <DrawerTitle>Ajouter un rendez-vous à {time}</DrawerTitle>
                                        </DrawerHeader>
                                        <form className="space-y-4 mt-4">
                                          <div className="space-y-2">
                                            <label htmlFor="patient" className="text-sm font-medium">Patient</label>
                                            <select id="patient" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                              <option value="">Sélectionner un patient</option>
                                              <option value="Marie Dupont">Marie Dupont</option>
                                              <option value="Jean Lefebvre">Jean Lefebvre</option>
                                              <option value="Lucie Martin">Lucie Martin</option>
                                              <option value="Thomas Bernard">Thomas Bernard</option>
                                            </select>
                                          </div>
                                          <div className="space-y-2">
                                            <label htmlFor="purpose" className="text-sm font-medium">Motif</label>
                                            <select id="purpose" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                              <option value="">Sélectionner un motif</option>
                                              <option value="Consultation générale">Consultation générale</option>
                                              <option value="Suivi">Suivi</option>
                                              <option value="Urgence">Urgence</option>
                                              <option value="Vaccination">Vaccination</option>
                                              <option value="Renouvellement ordonnance">Renouvellement ordonnance</option>
                                            </select>
                                          </div>
                                          <div className="space-y-2">
                                            <label htmlFor="note" className="text-sm font-medium">Note</label>
                                            <textarea 
                                              id="note" 
                                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                                              rows={3}
                                              placeholder="Ajouter une note (optionnel)"
                                            />
                                          </div>
                                          <div className="flex justify-end gap-2 pt-4">
                                            <Button variant="outline">Annuler</Button>
                                            <Button className="bg-[#0069D9]">Enregistrer</Button>
                                          </div>
                                        </form>
                                      </div>
                                    </DrawerContent>
                                  </Drawer>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    {/* Grid view */}
                    {displayMode === "grid" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                        {filteredAppointments.map((appointment) => (
                          <Card 
                            key={appointment.id} 
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => handleAppointmentClick(appointment)}
                          >
                            <CardHeader className={`pb-2 ${getStatusColor(appointment.status)}`}>
                              <div className="flex justify-between items-center">
                                <h3 className="font-bold">{appointment.time}</h3>
                                <Badge variant="outline">
                                  {appointment.status}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-2">
                              <p className="font-medium">{appointment.patient}</p>
                              <p className="text-sm text-gray-500">{appointment.purpose}</p>
                              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                                <span>{appointment.duration} min</span>
                                {appointment.recurring && (
                                  <Badge variant="outline" className="ml-2">Récurrent</Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Card className="border-dashed cursor-pointer flex items-center justify-center h-32 hover:bg-gray-50">
                              <div className="text-center text-gray-400">
                                <Plus className="h-6 w-6 mx-auto mb-2" />
                                <p>Nouveau rendez-vous</p>
                              </div>
                            </Card>
                          </DrawerTrigger>
                          <DrawerContent>
                            <div className="max-w-md mx-auto py-4 px-6">
                              <DrawerHeader>
                                <DrawerTitle>Ajouter un rendez-vous</DrawerTitle>
                              </DrawerHeader>
                              <form className="space-y-4 mt-4">
                                <div className="space-y-2">
                                  <label htmlFor="patient" className="text-sm font-medium">Patient</label>
                                  <select id="patient" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option value="">Sélectionner un patient</option>
                                    <option value="Marie Dupont">Marie Dupont</option>
                                    <option value="Jean Lefebvre">Jean Lefebvre</option>
                                  </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label htmlFor="time" className="text-sm font-medium">Heure</label>
                                    <select id="time" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                      {timeSlots.map((time) => (
                                        <option key={time} value={time}>{time}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="space-y-2">
                                    <label htmlFor="duration" className="text-sm font-medium">Durée</label>
                                    <select id="duration" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                      <option value="15">15 min</option>
                                      <option value="30" selected>30 min</option>
                                      <option value="45">45 min</option>
                                      <option value="60">1 heure</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                  <Button variant="outline">Annuler</Button>
                                  <Button className="bg-[#0069D9]">Enregistrer</Button>
                                </div>
                              </form>
                            </div>
                          </DrawerContent>
                        </Drawer>
                      </div>
                    )}
                  </>
                )}
                
                {/* Week view */}
                {view === "week" && (
                  <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                      <div className="grid grid-cols-7 gap-1 p-2 bg-gray-50 border-b">
                        {weekDays.map((day, index) => (
                          <div key={index} className="text-center">
                            <div className="font-medium">{format(day, "EEE", { locale: fr })}</div>
                            <div className={`text-sm ${isSameDay(day, new Date()) ? "bg-[#0069D9] text-white rounded-full px-1" : ""}`}>
                              {format(day, "dd")}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="divide-y">
                        {timeSlots.map((time) => (
                          <div key={time} className="grid grid-cols-7 border-b last:border-0">
                            {weekDays.map((day, dayIndex) => {
                              const appointment = appointments.find(
                                app => app.time === time && isSameDay(day, date)
                              );
                              return (
                                <div 
                                  key={dayIndex}
                                  className={`border-r last:border-r-0 min-h-[60px] ${dayIndex === 0 ? "pl-16 relative" : "p-1"} ${appointment ? "bg-gray-50" : ""}`}
                                >
                                  {dayIndex === 0 && (
                                    <div className="absolute left-2 top-1/2 -translate-y-1/2 font-medium text-gray-500 text-xs">
                                      {time}
                                    </div>
                                  )}
                                  
                                  {appointment ? (
                                    <div 
                                      className="h-full p-1 text-xs bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 cursor-pointer transition-colors"
                                      onClick={() => handleAppointmentClick(appointment)}
                                    >
                                      <div className="font-medium truncate">{appointment.patient}</div>
                                      <div className="truncate text-gray-500">{appointment.purpose}</div>
                                    </div>
                                  ) : (
                                    <div className="h-full w-full"></div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Drawer */}
      <Drawer open={showFilterDrawer} onOpenChange={setShowFilterDrawer}>
        <DrawerContent>
          <div className="max-w-md mx-auto py-4 px-4">
            <DrawerHeader>
              <DrawerTitle>Filtres</DrawerTitle>
            </DrawerHeader>
            <div className="space-y-4">
              {/* Date Picker in mobile drawer */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Date</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={goToToday}
                    >
                      Aujourd'hui
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Choisir une date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => newDate && setDate(newDate)}
                          className="border rounded-md pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardContent>
              </Card>

              {/* Filters card in mobile drawer */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Filtres</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Statut</label>
                    <select 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Motif</label>
                    <select 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={purposeFilter}
                      onChange={(e) => setStatusPurpose(e.target.value)}
                    >
                      {purposeOptions.map(purpose => (
                        <option key={purpose} value={purpose}>{purpose}</option>
                      ))}
                    </select>
                  </div>
                  <Button className="w-full" variant="outline" onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("Tous");
                    setStatusPurpose("Tous");
                  }}>
                    Réinitialiser
                  </Button>
                  <Button className="w-full bg-[#0069D9]" onClick={() => {
                    handleSendReminders();
                    setShowFilterDrawer(false);
                  }}>
                    <CalendarIcon className="mr-2 h-4 w-4" /> Envoyer rappels
                  </Button>
                  <Button className="w-full" onClick={() => setShowFilterDrawer(false)}>
                    Fermer
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Appointment Detail Drawer */}
      <Drawer open={showDetailDrawer} onOpenChange={setShowDetailDrawer}>
        <DrawerContent>
          <div className="max-w-md mx-auto py-4 px-6">
            <DrawerHeader>
              <DrawerTitle>Détail du rendez-vous</DrawerTitle>
            </DrawerHeader>
            {selectedAppointment && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{selectedAppointment.patient}</h3>
                  <Badge className={getStatusColor(selectedAppointment.status)}>
                    {selectedAppointment.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{format(date, "dd/MM/yyyy")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Heure</p>
                    <p className="font-medium">{selectedAppointment.time} ({selectedAppointment.duration} min)</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Motif</p>
                  <p className="font-medium">{selectedAppointment.purpose}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="bg-gray-50 p-2 rounded-md">{selectedAppointment.notes || "Aucune note"}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="font-medium">{selectedAppointment.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium truncate">{selectedAppointment.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Récurrent</p>
                    <p className="font-medium">{selectedAppointment.recurring ? "Oui" : "Non"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dernière visite</p>
                    <p className="font-medium">{selectedAppointment.lastVisit}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-end gap-2 pt-4">
                  <Button 
                    variant="destructive" 
                    className="w-full sm:w-auto" 
                    onClick={() => {
                      toast({
                        title: "Rendez-vous annulé",
                        description: `Le rendez-vous avec ${selectedAppointment.patient} a été annulé.`,
                      });
                      setShowDetailDrawer(false);
                    }}
                  >
                    Annuler RDV
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      toast({
                        title: "SMS envoyé",
                        description: `Un rappel a été envoyé à ${selectedAppointment.patient}.`,
                      });
                    }}
                  >
                    Envoyer rappel
                  </Button>
                  <Button 
                    className="bg-[#0069D9] w-full sm:w-auto"
                    onClick={() => {
                      toast({
                        title: "Modification",
                        description: "Fonctionnalité de modification de rendez-vous.",
                      });
                    }}
                  >
                    Modifier
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </DashboardLayout>
  );
};

export default Appointments;
