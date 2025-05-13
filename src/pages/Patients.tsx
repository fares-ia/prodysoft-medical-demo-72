
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash, Eye } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock data for patients
const mockPatients = [
  { id: 1, name: "Marie Dupont", age: 42, dossier: "P-2023-001", lastVisit: "12/04/2023", status: "Régulier" },
  { id: 2, name: "Jean Lefebvre", age: 65, dossier: "P-2023-002", lastVisit: "18/05/2023", status: "Suivi" },
  { id: 3, name: "Lucie Martin", age: 29, dossier: "P-2023-003", lastVisit: "03/06/2023", status: "Nouveau" },
  { id: 4, name: "Thomas Bernard", age: 51, dossier: "P-2023-004", lastVisit: "25/05/2023", status: "Régulier" },
  { id: 5, name: "Sophie Dubois", age: 38, dossier: "P-2023-005", lastVisit: "14/06/2023", status: "Régulier" },
  { id: 6, name: "Paul Moreau", age: 72, dossier: "P-2023-006", lastVisit: "30/05/2023", status: "Urgent" },
  { id: 7, name: "Emma Petit", age: 31, dossier: "P-2023-007", lastVisit: "10/06/2023", status: "Nouveau" },
  { id: 8, name: "Marc Leroy", age: 45, dossier: "P-2023-008", lastVisit: "07/06/2023", status: "Régulier" },
];

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState(mockPatients);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.dossier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setPatients(patients.filter(patient => patient.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
            <p className="text-gray-500">Gérez les dossiers des patients</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#0069D9]">
                <Plus className="mr-2 h-4 w-4" /> Nouveau patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau patient</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Formulaire de création d'un nouveau patient (démonstration uniquement).
                </p>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstname" className="text-sm font-medium">Prénom</label>
                      <Input id="firstname" placeholder="Prénom" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastname" className="text-sm font-medium">Nom</label>
                      <Input id="lastname" placeholder="Nom" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="birthdate" className="text-sm font-medium">Date de naissance</label>
                    <Input id="birthdate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="email@exemple.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                    <Input id="phone" placeholder="06 12 34 56 78" />
                  </div>
                  <div className="pt-4 flex justify-end gap-2">
                    <Button variant="outline">Annuler</Button>
                    <Button className="bg-[#0069D9]">Enregistrer</Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Rechercher un patient..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left">Nom</th>
                    <th className="px-6 py-3 text-left">Âge</th>
                    <th className="px-6 py-3 text-left">№ Dossier</th>
                    <th className="px-6 py-3 text-left">Dernière visite</th>
                    <th className="px-6 py-3 text-left">Statut</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{patient.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{patient.age} ans</td>
                      <td className="px-6 py-4 whitespace-nowrap">{patient.dossier}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{patient.lastVisit}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          patient.status === "Urgent" ? "bg-red-100 text-red-800" :
                          patient.status === "Nouveau" ? "bg-green-100 text-green-800" :
                          patient.status === "Suivi" ? "bg-amber-100 text-amber-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500"
                            onClick={() => handleDelete(patient.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPatients.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">Aucun patient trouvé</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Patients;
