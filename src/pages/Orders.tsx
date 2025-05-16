
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Package, Plus, Search, Filter } from "lucide-react";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [newOrder, setNewOrder] = useState({
    reference: "",
    supplierName: "",
    category: "Médicaments",
    items: "",
    totalAmount: "",
    status: "En attente",
  });

  // Demo data for orders
  const ordersData = [
    {
      id: 1,
      reference: "CMD-2025-001",
      date: "12/05/2025",
      supplierName: "PharmaPlus",
      category: "Médicaments",
      items: "Antibiotiques, Analgésiques",
      totalAmount: "2,450.00 €",
      status: "Livré",
    },
    {
      id: 2,
      reference: "CMD-2025-002",
      date: "15/05/2025",
      supplierName: "MedEquip",
      category: "Matériel médical",
      items: "Stéthoscopes, Tensiomètres",
      totalAmount: "1,830.00 €",
      status: "En cours",
    },
    {
      id: 3,
      reference: "CMD-2025-003",
      date: "18/05/2025",
      supplierName: "BioChem",
      category: "Laboratoire",
      items: "Réactifs, Tubes de prélèvement",
      totalAmount: "3,120.00 €",
      status: "En attente",
    },
    {
      id: 4,
      reference: "CMD-2025-004",
      date: "20/05/2025",
      supplierName: "CleanMed",
      category: "Hygiène",
      items: "Désinfectants, Gants, Masques",
      totalAmount: "1,250.00 €",
      status: "Livré",
    },
    {
      id: 5,
      reference: "CMD-2025-005",
      date: "22/05/2025",
      supplierName: "MedEquip",
      category: "Matériel médical",
      items: "Moniteur cardiaque, Pompe à perfusion",
      totalAmount: "5,680.00 €",
      status: "En cours",
    },
    {
      id: 6,
      reference: "CMD-2025-006",
      date: "24/05/2025",
      supplierName: "PharmaPlus",
      category: "Médicaments",
      items: "Antidépresseurs, Antihypertenseurs",
      totalAmount: "2,890.00 €",
      status: "En attente",
    },
  ];

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Commande créée",
      description: `La commande ${newOrder.reference} a été créée avec succès.`,
    });
    // Reset form (in a real app, would add to orders)
    setNewOrder({
      reference: "",
      supplierName: "",
      category: "Médicaments",
      items: "",
      totalAmount: "",
      status: "En attente",
    });
  };

  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || order.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livré":
        return "bg-green-100 text-green-800";
      case "En cours":
        return "bg-blue-100 text-blue-800";
      case "En attente":
        return "bg-amber-100 text-amber-800";
      case "Annulé":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des commandes</h1>
            <p className="text-gray-500">Gérez vos commandes et suivez leur statut</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#0069D9]">
                <Plus className="mr-2 h-4 w-4" /> Nouvelle commande
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle commande</DialogTitle>
                <DialogDescription>
                  Remplissez les informations pour passer une nouvelle commande auprès d'un fournisseur.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleOrderSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reference">Référence</Label>
                      <Input
                        id="reference"
                        value={newOrder.reference}
                        onChange={(e) => setNewOrder({ ...newOrder, reference: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Select
                        value={newOrder.category}
                        onValueChange={(value) => setNewOrder({ ...newOrder, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Médicaments">Médicaments</SelectItem>
                          <SelectItem value="Matériel médical">Matériel médical</SelectItem>
                          <SelectItem value="Laboratoire">Laboratoire</SelectItem>
                          <SelectItem value="Hygiène">Hygiène</SelectItem>
                          <SelectItem value="Bureautique">Bureautique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supplierName">Fournisseur</Label>
                    <Input
                      id="supplierName"
                      value={newOrder.supplierName}
                      onChange={(e) => setNewOrder({ ...newOrder, supplierName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="items">Articles</Label>
                    <Input
                      id="items"
                      value={newOrder.items}
                      onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalAmount">Montant total</Label>
                    <Input
                      id="totalAmount"
                      value={newOrder.totalAmount}
                      onChange={(e) => setNewOrder({ ...newOrder, totalAmount: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={newOrder.status}
                      onValueChange={(value) => setNewOrder({ ...newOrder, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="En attente">En attente</SelectItem>
                        <SelectItem value="En cours">En cours</SelectItem>
                        <SelectItem value="Livré">Livré</SelectItem>
                        <SelectItem value="Annulé">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-[#0069D9]">Créer la commande</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Liste des commandes</CardTitle>
            <CardDescription>
              Gérez et suivez toutes les commandes passées auprès de vos fournisseurs.
            </CardDescription>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Rechercher une commande..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Statut</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="En attente">En attente</SelectItem>
                    <SelectItem value="En cours">En cours</SelectItem>
                    <SelectItem value="Livré">Livré</SelectItem>
                    <SelectItem value="Annulé">Annulé</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Package className="mr-2 h-4 w-4" />
                    <span>Catégorie</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="Médicaments">Médicaments</SelectItem>
                    <SelectItem value="Matériel médical">Matériel médical</SelectItem>
                    <SelectItem value="Laboratoire">Laboratoire</SelectItem>
                    <SelectItem value="Hygiène">Hygiène</SelectItem>
                    <SelectItem value="Bureautique">Bureautique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Fournisseur</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Articles</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.reference}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.supplierName}</TableCell>
                        <TableCell>{order.category}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>{order.totalAmount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        Aucune commande trouvée.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
