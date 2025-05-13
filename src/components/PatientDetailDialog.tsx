
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer, Edit, FileText, Calendar, CreditCard } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PatientDetailProps {
  isOpen: boolean;
  onClose: () => void;
  patient: {
    id: number;
    name: string;
    age: number;
    dossier: string;
    lastVisit: string;
    status: string;
    address?: string;
    email?: string;
    phone?: string;
    bloodType?: string;
    allergies?: string[];
    history?: Array<{
      date: string;
      type: string;
      description: string;
    }>;
    prescriptions?: Array<{
      id: number;
      date: string;
      medication: string;
      dosage: string;
      duration: string;
    }>;
    appointments?: Array<{
      id: number;
      date: string;
      time: string;
      reason: string;
      status: string;
    }>;
    bills?: Array<{
      id: number;
      date: string;
      amount: string;
      status: string;
    }>;
  } | null;
}

const PatientDetailDialog: React.FC<PatientDetailProps> = ({ isOpen, onClose, patient }) => {
  if (!patient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 text-xl">
              {patient.name.charAt(0)}
            </div>
            <div>
              <div>{patient.name}</div>
              <div className="text-sm font-normal text-gray-500 mt-1">
                Dossier: {patient.dossier} | Âge: {patient.age} ans
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="pt-4">
          <div className="flex justify-end gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={() => console.log("Imprimer")}>
              <Printer className="h-4 w-4 mr-1" /> Imprimer
            </Button>
            <Button variant="outline" size="sm" onClick={() => console.log("Exporter")}>
              <Download className="h-4 w-4 mr-1" /> Exporter
            </Button>
            <Button size="sm" className="bg-[#0069D9]">
              <Edit className="h-4 w-4 mr-1" /> Modifier
            </Button>
          </div>

          <Tabs defaultValue="info">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
              <TabsTrigger value="prescriptions">Ordonnances</TabsTrigger>
              <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
              <TabsTrigger value="billing">Facturation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium">Photo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AspectRatio ratio={1/1} className="bg-gray-100 rounded-md overflow-hidden">
                        <div className="h-full w-full flex items-center justify-center text-4xl text-gray-400 font-light">
                          {patient.name.charAt(0)}
                        </div>
                      </AspectRatio>
                    </CardContent>
                  </Card>
                </div>
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium">Informations personnelles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                          <dd className="mt-1">{patient.name}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Âge</dt>
                          <dd className="mt-1">{patient.age} ans</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                          <dd className="mt-1">{patient.phone || "06 12 34 56 78"}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Email</dt>
                          <dd className="mt-1">{patient.email || "email@exemple.com"}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Adresse</dt>
                          <dd className="mt-1">{patient.address || "15 rue de la Paix, 75002 Paris"}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Groupe sanguin</dt>
                          <dd className="mt-1">{patient.bloodType || "O+"}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Allergies</dt>
                          <dd className="mt-1">
                            {patient.allergies && patient.allergies.length > 0 ? (
                              <div className="flex gap-1 flex-wrap">
                                {patient.allergies.map((allergy, index) => (
                                  <span key={index} className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-xs">
                                    {allergy}
                                  </span>
                                ))}
                              </div>
                            ) : "Aucune allergie connue"}
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md font-medium">Informations médicales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Dossier médical</h4>
                    <p className="mt-1">
                      Patient suivi depuis {new Date().getFullYear() - 3}. Traitement régulier pour l'hypertension.
                      Dernière visite médicale: {patient.lastVisit}.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Notes importantes</h4>
                    <p className="mt-1">
                      Patient à rappeler pour suivi de son traitement contre l'hypertension.
                      Prévoir un contrôle de routine dans les 3 mois.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Documents associés</h4>
                    <div className="mt-1 grid grid-cols-1 gap-2">
                      <Button variant="outline" size="sm" className="justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Résultats analyse sang - 05/04/2023.pdf
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Radiographie thoracique - 12/11/2022.pdf
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Historique des consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {(patient.history || [
                      {date: "15/06/2023", type: "Consultation", description: "Examen de routine. Tension artérielle normale."},
                      {date: "03/03/2023", type: "Urgence", description: "Douleurs abdominales. Prescription d'antispasmodiques."},
                      {date: "14/12/2022", type: "Consultation", description: "Renouvellement traitement hypertension."},
                      {date: "30/09/2022", type: "Suivi", description: "Contrôle tension artérielle. Valeurs dans la norme."},
                    ]).map((item, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                        </div>
                        <div className="pb-6">
                          <div className="flex items-center mb-1">
                            <span className="text-sm font-medium">{item.date}</span>
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.type === "Urgence" ? "bg-red-100 text-red-800" :
                              item.type === "Suivi" ? "bg-amber-100 text-amber-800" :
                              "bg-blue-100 text-blue-800"
                            }`}>
                              {item.type}
                            </span>
                          </div>
                          <p className="text-gray-700">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prescriptions">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Ordonnances</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(patient.prescriptions || [
                      {id: 1, date: "15/06/2023", medication: "Amlodipine 5mg", dosage: "1 comprimé", duration: "Matin, 3 mois"},
                      {id: 2, date: "15/06/2023", medication: "Paracetamol 1000mg", dosage: "1 comprimé", duration: "Si douleur, max 3/jour, 7 jours"},
                      {id: 3, date: "03/03/2023", medication: "Spasfon", dosage: "2 comprimés", duration: "3 fois par jour, 5 jours"},
                    ]).map((prescription, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{prescription.medication}</h4>
                              <p className="text-sm text-gray-500">
                                {prescription.dosage} - {prescription.duration}
                              </p>
                            </div>
                            <span className="text-sm text-gray-500">{prescription.date}</span>
                          </div>
                          <div className="flex justify-end mt-2">
                            <Button variant="ghost" size="sm" className="text-green-600">
                              <Download className="h-4 w-4 mr-1" /> Télécharger PDF
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Printer className="h-4 w-4 mr-1" /> Imprimer
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Rendez-vous</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(patient.appointments || [
                      {id: 1, date: "18/07/2023", time: "09:15", reason: "Consultation de routine", status: "À venir"},
                      {id: 2, date: "15/06/2023", time: "10:30", reason: "Suivi traitement", status: "Terminé"},
                      {id: 3, date: "03/03/2023", time: "16:45", reason: "Urgence - Douleurs", status: "Terminé"},
                    ]).map((appointment, index) => (
                      <div key={index} className="flex items-start border-b last:border-0 pb-4 last:pb-0">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{appointment.date} - {appointment.time}</h4>
                              <p className="text-sm text-gray-700">{appointment.reason}</p>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              appointment.status === "À venir" ? "bg-green-100 text-green-800" :
                              appointment.status === "Annulé" ? "bg-red-100 text-red-800" :
                              "bg-blue-100 text-blue-800"
                            }`}>
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Factures</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(patient.bills || [
                      {id: 1, date: "15/06/2023", amount: "25,00 €", status: "Payé"},
                      {id: 2, date: "03/03/2023", amount: "75,00 €", status: "Payé"},
                      {id: 3, date: "14/12/2022", amount: "25,00 €", status: "En attente"},
                    ]).map((bill, index) => (
                      <div key={index} className="flex items-start border-b last:border-0 pb-4 last:pb-0">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">Facture #{bill.id}</h4>
                              <p className="text-sm text-gray-700">Date: {bill.date}</p>
                            </div>
                            <div className="text-right">
                              <span className="font-medium">{bill.amount}</span>
                              <span className={`block mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                bill.status === "Payé" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                              }`}>
                                {bill.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailDialog;
