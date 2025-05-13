
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FileText, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DashboardLayout from "@/components/DashboardLayout";

// Mock data for consultations
const mockConsultations = [
  { 
    id: 1, 
    date: "15/06/2023", 
    patient: "Marie Dupont", 
    motif: "Douleurs abdominales", 
    diagnostic: "Gastro-entérite",
    prescription: true
  },
  { 
    id: 2, 
    date: "14/06/2023", 
    patient: "Jean Lefebvre", 
    motif: "Suivi traitement hypertension", 
    diagnostic: "Tension stabilisée",
    prescription: true
  },
  { 
    id: 3, 
    date: "12/06/2023", 
    patient: "Lucie Martin", 
    motif: "Toux persistante", 
    diagnostic: "Bronchite aigüe",
    prescription: true
  },
  { 
    id: 4, 
    date: "10/06/2023", 
    patient: "Thomas Bernard", 
    motif: "Visite de contrôle", 
    diagnostic: "RAS",
    prescription: false
  },
  { 
    id: 5, 
    date: "08/06/2023", 
    patient: "Sophie Dubois", 
    motif: "Mal de dos", 
    diagnostic: "Contracture musculaire lombaire",
    prescription: true
  },
  { 
    id: 6, 
    date: "05/06/2023", 
    patient: "Paul Moreau", 
    motif: "Suivi diabète", 
    diagnostic: "Glycémie à surveiller",
    prescription: true
  },
];

const Consultations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [consultations, setConsultations] = useState(mockConsultations);

  const filteredConsultations = consultations.filter(
    consultation => 
      consultation.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.motif.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.diagnostic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Consultations</h1>
            <p className="text-gray-500">Gérez les consultations et ordonnances</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#0069D9]">
                <Plus className="mr-2 h-4 w-4" /> Nouvelle consultation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle consultation</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <form className="space-y-4">
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
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="motif" className="text-sm font-medium">Motif de consultation</label>
                    <Input id="motif" placeholder="Motif de la consultation" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="diagnostic" className="text-sm font-medium">Diagnostic</label>
                    <Input id="diagnostic" placeholder="Diagnostic" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                    <textarea 
                      id="notes" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                      rows={3}
                      placeholder="Notes sur la consultation"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ordonnance</label>
                    <div className="border rounded-md p-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="medication" className="text-sm font-medium">Médicament</label>
                          <Input id="medication" placeholder="Nom du médicament" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="dosage" className="text-sm font-medium">Dosage</label>
                            <Input id="dosage" placeholder="Ex: 1 comprimé" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="frequency" className="text-sm font-medium">Fréquence</label>
                            <Input id="frequency" placeholder="Ex: 3 fois par jour" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="duration" className="text-sm font-medium">Durée</label>
                          <Input id="duration" placeholder="Ex: 7 jours" />
                        </div>
                        <Button variant="outline" className="w-full">
                          <Plus className="mr-2 h-4 w-4" /> Ajouter un médicament
                        </Button>
                      </div>
                    </div>
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
            placeholder="Rechercher une consultation..."
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
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Patient</th>
                    <th className="px-6 py-3 text-left">Motif</th>
                    <th className="px-6 py-3 text-left">Diagnostic</th>
                    <th className="px-6 py-3 text-center">Ordonnance</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredConsultations.map((consultation) => (
                    <tr key={consultation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{consultation.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{consultation.patient}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{consultation.motif}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{consultation.diagnostic}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {consultation.prescription ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Oui
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Non
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                          {consultation.prescription && (
                            <Button variant="ghost" size="icon" className="text-green-600">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredConsultations.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">Aucune consultation trouvée</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Consultations;
