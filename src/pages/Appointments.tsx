
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Plus, Clock } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

// Mock data for appointments
const mockAppointments = [
  { id: 1, time: "09:00", patient: "Marie Dupont", purpose: "Consultation", status: "Confirmé" },
  { id: 2, time: "10:30", patient: "Jean Lefebvre", purpose: "Suivi", status: "Confirmé" },
  { id: 3, time: "12:00", patient: "Lucie Martin", purpose: "Consultation", status: "Annulé" },
  { id: 4, time: "14:15", patient: "Thomas Bernard", purpose: "Consultation", status: "Confirmé" },
  { id: 5, time: "15:30", patient: "Sophie Dubois", purpose: "Urgence", status: "En attente" },
  { id: 6, time: "16:45", patient: "Paul Moreau", purpose: "Suivi", status: "Terminé" },
];

// Time slots for the day
const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00"
];

const Appointments = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState(mockAppointments);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmé": return "bg-green-100 text-green-800";
      case "En attente": return "bg-amber-100 text-amber-800";
      case "Annulé": return "bg-red-100 text-red-800";
      case "Terminé": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAppointmentForTimeSlot = (time: string) => {
    return appointments.find(appointment => appointment.time === time);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rendez-vous</h1>
            <p className="text-gray-500">Gérez votre agenda et vos rendez-vous</p>
          </div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="bg-[#0069D9]">
                <Plus className="mr-2 h-4 w-4" /> Nouveau rendez-vous
              </Button>
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
                      <option value="Lucie Martin">Lucie Martin</option>
                      <option value="Thomas Bernard">Thomas Bernard</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">Date</label>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => newDate && setDate(newDate)}
                        className="rounded-md border shadow"
                      />
                    </div>
                  </div>
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
                    <label htmlFor="purpose" className="text-sm font-medium">Motif</label>
                    <select id="purpose" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Sélectionner un motif</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Suivi">Suivi</option>
                      <option value="Urgence">Urgence</option>
                      <option value="Autre">Autre</option>
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Calendrier</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                <h3 className="font-medium">Légende</h3>
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-sm">Confirmé</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="text-sm">En attente</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-sm">Annulé</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                  <span className="text-sm">Terminé</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">
                  Rendez-vous du {date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="divide-y p-0">
              {timeSlots.map((time) => {
                const appointment = getAppointmentForTimeSlot(time);
                return (
                  <div key={time} className={`flex p-2 ${appointment ? "bg-gray-50" : ""}`}>
                    <div className="w-16 flex items-center justify-center font-medium text-gray-500">
                      <Clock className="h-4 w-4 mr-1" /> {time}
                    </div>
                    {appointment ? (
                      <div className="flex-1 ml-4 p-2">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h4 className="font-medium">{appointment.patient}</h4>
                            <p className="text-sm text-gray-500">{appointment.purpose}</p>
                          </div>
                          <span className={`mt-2 md:mt-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 ml-4 p-2 border border-dashed border-gray-200 rounded-md flex items-center justify-center bg-white">
                        <span className="text-sm text-gray-400">Disponible</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
