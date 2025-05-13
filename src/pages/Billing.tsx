
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Download, Check, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DashboardLayout from "@/components/DashboardLayout";

// Mock data for invoices
const mockInvoices = [
  { 
    id: "F-2023-001", 
    date: "15/06/2023", 
    patient: "Marie Dupont", 
    amount: 45.00, 
    status: "Payée",
    paymentMethod: "Carte bancaire"
  },
  { 
    id: "F-2023-002", 
    date: "12/06/2023", 
    patient: "Jean Lefebvre", 
    amount: 60.00, 
    status: "En attente",
    paymentMethod: "-"
  },
  { 
    id: "F-2023-003", 
    date: "10/06/2023", 
    patient: "Lucie Martin", 
    amount: 25.00, 
    status: "Payée",
    paymentMethod: "Espèces"
  },
  { 
    id: "F-2023-004", 
    date: "08/06/2023", 
    patient: "Thomas Bernard", 
    amount: 45.00, 
    status: "En attente",
    paymentMethod: "-"
  },
  { 
    id: "F-2023-005", 
    date: "05/06/2023", 
    patient: "Sophie Dubois", 
    amount: 75.00, 
    status: "Payée",
    paymentMethod: "Chèque"
  },
  { 
    id: "F-2023-006", 
    date: "01/06/2023", 
    patient: "Paul Moreau", 
    amount: 45.00, 
    status: "En attente",
    paymentMethod: "-"
  },
];

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState(mockInvoices);

  const filteredInvoices = invoices.filter(
    invoice => 
      invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAsPaid = (id: string) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === id
        ? { ...invoice, status: "Payée", paymentMethod: "Carte bancaire" }
        : invoice
    ));
  };

  // Calculate totals
  const totalAmount = filteredInvoices.reduce((acc, invoice) => acc + invoice.amount, 0);
  const paidAmount = filteredInvoices
    .filter(invoice => invoice.status === "Payée")
    .reduce((acc, invoice) => acc + invoice.amount, 0);
  const pendingAmount = filteredInvoices
    .filter(invoice => invoice.status === "En attente")
    .reduce((acc, invoice) => acc + invoice.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Facturation</h1>
            <p className="text-gray-500">Gérez les factures et les paiements</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#0069D9]">
                <Plus className="mr-2 h-4 w-4" /> Nouvelle facture
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle facture</DialogTitle>
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
                    <label htmlFor="consultation" className="text-sm font-medium">Consultation</label>
                    <select id="consultation" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Sélectionner une consultation</option>
                      <option value="15/06/2023">15/06/2023 - Consultation standard</option>
                      <option value="10/06/2023">10/06/2023 - Visite de contrôle</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium">Type de prestation</label>
                    <select id="service" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Sélectionner une prestation</option>
                      <option value="Consultation standard">Consultation standard (45€)</option>
                      <option value="Consultation longue">Consultation longue (60€)</option>
                      <option value="Acte médical">Acte médical (75€)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="amount" className="text-sm font-medium">Montant</label>
                    <div className="relative">
                      <Input id="amount" type="number" placeholder="0.00" />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">€</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end gap-2">
                    <Button variant="outline">Annuler</Button>
                    <Button className="bg-[#0069D9]">Créer la facture</Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-500">Total facturé</span>
                <span className="text-3xl font-bold">{totalAmount.toFixed(2)} €</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-500">Payé</span>
                <span className="text-3xl font-bold text-green-600">{paidAmount.toFixed(2)} €</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-500">En attente</span>
                <span className="text-3xl font-bold text-amber-600">{pendingAmount.toFixed(2)} €</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Rechercher une facture..."
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
                    <th className="px-6 py-3 text-left">№ Facture</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Patient</th>
                    <th className="px-6 py-3 text-right">Montant</th>
                    <th className="px-6 py-3 text-left">Statut</th>
                    <th className="px-6 py-3 text-left">Moyen de paiement</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{invoice.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{invoice.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{invoice.patient}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">{invoice.amount.toFixed(2)} €</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          invoice.status === "Payée" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{invoice.paymentMethod}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          {invoice.status === "En attente" && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-green-600"
                              onClick={() => markAsPaid(invoice.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          {invoice.status === "En attente" && (
                            <Button variant="ghost" size="icon" className="text-blue-600">
                              <CreditCard className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredInvoices.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">Aucune facture trouvée</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
