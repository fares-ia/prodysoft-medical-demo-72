
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash, Eye, Download, Printer, UserPlus, FileText } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import PatientDetailDialog from "@/components/PatientDetailDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for patients
const mockPatients = [
  { id: 1, name: "Marie Dupont", age: 42, dossier: "P-2023-001", lastVisit: "12/04/2023", status: "Régulier", 
    email: "marie.dupont@email.com", phone: "06 12 34 56 78", bloodType: "A+",
    allergies: ["Pénicilline", "Arachides"], 
    address: "23 avenue Victor Hugo, 75016 Paris" },
  { id: 2, name: "Jean Lefebvre", age: 65, dossier: "P-2023-002", lastVisit: "18/05/2023", status: "Suivi", 
    email: "jean.lefebvre@email.com", phone: "06 23 45 67 89", bloodType: "O+",
    allergies: ["Aspirine"], 
    address: "8 rue du Commerce, 75015 Paris" },
  { id: 3, name: "Lucie Martin", age: 29, dossier: "P-2023-003", lastVisit: "03/06/2023", status: "Nouveau", 
    email: "lucie.martin@email.com", phone: "06 34 56 78 90", bloodType: "B-",
    allergies: [], 
    address: "45 boulevard Haussmann, 75009 Paris" },
  { id: 4, name: "Thomas Bernard", age: 51, dossier: "P-2023-004", lastVisit: "25/05/2023", status: "Régulier", 
    email: "thomas.bernard@email.com", phone: "06 45 67 89 01", bloodType: "AB+",
    allergies: ["Lactose", "Gluten"], 
    address: "12 rue de Rivoli, 75004 Paris" },
  { id: 5, name: "Sophie Dubois", age: 38, dossier: "P-2023-005", lastVisit: "14/06/2023", status: "Régulier", 
    email: "sophie.dubois@email.com", phone: "06 56 78 90 12", bloodType: "A-",
    allergies: [], 
    address: "67 avenue des Champs-Élysées, 75008 Paris" },
  { id: 6, name: "Paul Moreau", age: 72, dossier: "P-2023-006", lastVisit: "30/05/2023", status: "Urgent", 
    email: "paul.moreau@email.com", phone: "06 67 89 01 23", bloodType: "O-",
    allergies: ["Sulfamides"], 
    address: "34 rue Saint-Antoine, 75004 Paris" },
  { id: 7, name: "Emma Petit", age: 31, dossier: "P-2023-007", lastVisit: "10/06/2023", status: "Nouveau", 
    email: "emma.petit@email.com", phone: "06 78 90 12 34", bloodType: "B+",
    allergies: [], 
    address: "56 rue Oberkampf, 75011 Paris" },
  { id: 8, name: "Marc Leroy", age: 45, dossier: "P-2023-008", lastVisit: "07/06/2023", status: "Régulier", 
    email: "marc.leroy@email.com", phone: "06 90 12 34 56", bloodType: "A+",
    allergies: ["Iode"], 
    address: "89 rue de la Roquette, 75011 Paris" },
];

// Groupes de patients fictifs
const patientGroups = [
  { id: 1, name: "Patients hypertendus", count: 24, color: "bg-blue-500" },
  { id: 2, name: "Patients diabétiques", count: 18, color: "bg-green-500" },
  { id: 3, name: "Patients cardiaques", count: 12, color: "bg-red-500" },
  { id: 4, name: "Femmes enceintes", count: 6, color: "bg-purple-500" },
  { id: 5, name: "Enfants <12 ans", count: 15, color: "bg-yellow-500" },
];

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.dossier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setPatients(patients.filter(patient => patient.id !== id));
    toast({
      title: "Patient supprimé",
      description: "Le patient a été supprimé avec succès."
    });
  };

  const viewPatientDetail = (patient: typeof mockPatients[0]) => {
    setSelectedPatient(patient);
    setDetailDialogOpen(true);
  };

  const handleExportCSV = () => {
    toast({
      title: "Export en cours",
      description: "Le fichier CSV des patients a été généré."
    });
  };

  const handlePrint = () => {
    toast({
      title: "Impression en cours",
      description: "La liste des patients est en cours d'impression."
    });
  };

  const handleImportPatients = () => {
    toast({
      title: "Import des patients",
      description: "Fonctionnalité d'import des patients simulée."
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
            <p className="text-gray-500">Gérez les dossiers des patients</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleImportPatients}>
              <UserPlus className="mr-2 h-4 w-4" /> Importer
            </Button>
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="mr-2 h-4 w-4" /> Exporter CSV
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" /> Imprimer
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#0069D9]">
                  <Plus className="mr-2 h-4 w-4" /> Nouveau patient
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau patient</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Tabs defaultValue="info">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="info">Informations personnelles</TabsTrigger>
                      <TabsTrigger value="medical">Informations médicales</TabsTrigger>
                    </TabsList>
                    <TabsContent value="info" className="space-y-4 mt-4">
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
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="birthdate" className="text-sm font-medium">Date de naissance</label>
                          <Input id="birthdate" type="date" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="gender" className="text-sm font-medium">Sexe</label>
                          <select id="gender" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="">Sélectionner</option>
                            <option value="M">Homme</option>
                            <option value="F">Femme</option>
                            <option value="O">Autre</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" type="email" placeholder="email@exemple.com" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                        <Input id="phone" placeholder="06 12 34 56 78" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="address" className="text-sm font-medium">Adresse</label>
                        <Input id="address" placeholder="Adresse" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2 col-span-1">
                          <label htmlFor="postalCode" className="text-sm font-medium">Code postal</label>
                          <Input id="postalCode" placeholder="Code postal" />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <label htmlFor="city" className="text-sm font-medium">Ville</label>
                          <Input id="city" placeholder="Ville" />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="medical" className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="bloodType" className="text-sm font-medium">Groupe sanguin</label>
                          <select id="bloodType" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="">Sélectionner</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="insuranceNumber" className="text-sm font-medium">N° Sécurité sociale</label>
                          <Input id="insuranceNumber" placeholder="N° Sécurité sociale" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="allergies" className="text-sm font-medium">Allergies</label>
                        <Input id="allergies" placeholder="Allergies (séparées par des virgules)" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="medicalHistory" className="text-sm font-medium">Antécédents médicaux</label>
                        <textarea 
                          id="medicalHistory"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          rows={3}
                          placeholder="Antécédents médicaux importants"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="currentMedication" className="text-sm font-medium">Médicaments actuels</label>
                        <textarea 
                          id="currentMedication"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          rows={3}
                          placeholder="Médicaments pris actuellement"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="doctorNotes" className="text-sm font-medium">Notes du médecin</label>
                        <textarea 
                          id="doctorNotes"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          rows={3}
                          placeholder="Notes confidentielles du médecin"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="documents" className="text-sm font-medium">Documents médicaux</label>
                        <Input id="documents" type="file" multiple />
                        <p className="text-xs text-gray-500 mt-1">Formats acceptés: PDF, JPG, PNG (max 5MB)</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                  <div className="pt-4 flex justify-end gap-2">
                    <Button variant="outline">Annuler</Button>
                    <Button className="bg-[#0069D9]" onClick={() => {
                      toast({
                        title: "Patient ajouté",
                        description: "Le nouveau patient a été créé avec succès."
                      });
                    }}>Enregistrer</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-md font-medium">Groupes de patients</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {patientGroups.map((group) => (
                    <div key={group.id} className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${group.color} mr-3`}></div>
                        <span>{group.name}</span>
                      </div>
                      <span className="text-sm bg-gray-100 px-2 py-0.5 rounded-full">{group.count}</span>
                    </div>
                  ))}
                  <div className="py-3 px-4 text-sm text-blue-600 hover:bg-gray-50 cursor-pointer">
                    <Plus className="h-4 w-4 inline mr-1" /> Créer un groupe
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-md font-medium">Documents récents</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="py-3 px-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">Rapport mensuel.pdf</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">15/06/2023</p>
                  </div>
                  <div className="py-3 px-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">Liste patients.xlsx</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">12/06/2023</p>
                  </div>
                  <div className="py-3 px-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">Statistiques T2.docx</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">05/06/2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-4">
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
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
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-[#0069D9]" : ""}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-[#0069D9]" : ""}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                {viewMode === "list" ? (
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
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => viewPatientDetail(patient)}
                                >
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
                ) : (
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredPatients.map((patient) => (
                        <Card key={patient.id} className="border overflow-hidden">
                          <div className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg font-semibold">
                                {patient.name.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">{patient.name}</h3>
                                <p className="text-sm text-gray-500">{patient.age} ans | {patient.dossier}</p>
                                <div className="mt-1">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    patient.status === "Urgent" ? "bg-red-100 text-red-800" :
                                    patient.status === "Nouveau" ? "bg-green-100 text-green-800" :
                                    patient.status === "Suivi" ? "bg-amber-100 text-amber-800" :
                                    "bg-blue-100 text-blue-800"
                                  }`}>
                                    {patient.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 text-sm">
                              <p className="truncate text-gray-500">{patient.email}</p>
                              <p className="truncate text-gray-500">{patient.phone}</p>
                              <p className="truncate text-gray-700 mt-1">Dernière visite: {patient.lastVisit}</p>
                            </div>
                            <div className="flex justify-end mt-3 gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => viewPatientDetail(patient)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Voir
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Éditer
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                    {filteredPatients.length === 0 && (
                      <div className="text-center py-10">
                        <p className="text-gray-500">Aucun patient trouvé</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Patient Detail Dialog */}
      <PatientDetailDialog 
        isOpen={detailDialogOpen} 
        onClose={() => setDetailDialogOpen(false)} 
        patient={selectedPatient} 
      />
    </DashboardLayout>
  );
};

export default Patients;
