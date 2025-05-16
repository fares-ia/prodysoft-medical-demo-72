
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Plus, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";

// Define types
type Order = {
  id: string;
  reference: string;
  supplier: string;
  category: string;
  date: string;
  total: string;
  status: "pending" | "delivered" | "canceled";
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      reference: "CMD-2023-001",
      supplier: "MediSupplies",
      category: "Médicaments",
      date: "15/04/2023",
      total: "2,560.00 €",
      status: "delivered",
    },
    {
      id: "2",
      reference: "CMD-2023-002",
      supplier: "LabEquip",
      category: "Équipement",
      date: "22/04/2023",
      total: "12,750.00 €",
      status: "pending",
    },
    {
      id: "3",
      reference: "CMD-2023-003",
      supplier: "CleanMed",
      category: "Produits d'entretien",
      date: "28/04/2023",
      total: "890.00 €",
      status: "delivered",
    },
    {
      id: "4",
      reference: "CMD-2023-004",
      supplier: "MediSupplies",
      category: "Consommables",
      date: "03/05/2023",
      total: "3,210.00 €",
      status: "canceled",
    },
    {
      id: "5",
      reference: "CMD-2023-005",
      supplier: "PharmaDirect",
      category: "Médicaments",
      date: "10/05/2023",
      total: "4,750.00 €",
      status: "pending",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | undefined>(undefined);

  const handleAddOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Create new order with form data
    const newOrder: Order = {
      id: `${orders.length + 1}`,
      reference: `CMD-2023-00${orders.length + 1}`,
      supplier: formData.get("supplier") as string,
      category: formData.get("category") as string,
      date: new Date().toLocaleDateString("fr-FR"),
      total: `${formData.get("total")} €`,
      status: "pending",
    };

    setOrders([...orders, newOrder]);
    setIsDialogOpen(false);
    toast({
      title: "Commande créée",
      description: `La commande ${newOrder.reference} a été créée avec succès.`,
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === "" || 
      order.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filterCategory || order.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(orders.map(order => order.category))];
  const suppliers = [...new Set(orders.map(order => order.supplier))];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Commandes</h1>
            <p className="text-gray-500 mt-1">Gérez les commandes de fournitures et équipements</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle commande
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle commande</DialogTitle>
                <DialogDescription>
                  Remplissez les détails de la commande ci-dessous
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddOrder} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Fournisseur</Label>
                    <Select name="supplier" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un fournisseur" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((supplier, index) => (
                          <SelectItem key={index} value={supplier}>
                            {supplier}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category, index) => (
                          <SelectItem key={index} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="items">Articles</Label>
                  <div className="border rounded-md p-4 space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <Input placeholder="Nom de l'article" />
                      <Input type="number" placeholder="Quantité" />
                      <Input placeholder="Prix unitaire" />
                    </div>
                    <Button type="button" variant="outline" className="w-full">
                      + Ajouter un article
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input id="notes" name="notes" placeholder="Notes supplémentaires" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total">Montant total (€)</Label>
                  <Input id="total" name="total" type="text" placeholder="0.00" required />
                </div>
                <DialogFooter>
                  <Button type="submit">Créer la commande</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des commandes</CardTitle>
            <CardDescription>
              {filteredOrders.length} commandes au total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Rechercher des commandes..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <Select onValueChange={(val) => setFilterCategory(val === "all" ? undefined : val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrer par catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {category}
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
                    <TableHead>Référence</TableHead>
                    <TableHead>Fournisseur</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.reference}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>{order.category}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status === "delivered"
                            ? "Livrée"
                            : order.status === "pending"
                            ? "En attente"
                            : "Annulée"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Voir
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
              Affichage de {filteredOrders.length} sur {orders.length} commandes
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

export default Orders;
