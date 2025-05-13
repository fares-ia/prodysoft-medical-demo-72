
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/DashboardLayout";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-500">Gérez les paramètres de votre compte et de la clinique</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start bg-blue-50 text-[#0069D9]">
                    Informations personnelles
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Sécurité
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Paramètres de la clinique
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Intégrations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold">
                      DL
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Modifier la photo
                      </Button>
                      <p className="text-xs mt-1 text-gray-500">
                        JPG, GIF ou PNG. Taille max 1MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstname">Prénom</Label>
                      <Input id="firstname" defaultValue="David" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname">Nom</Label>
                      <Input id="lastname" defaultValue="Lefèvre" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="david.lefevre@prodysoft.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" defaultValue="06 12 34 56 78" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="speciality">Spécialité</Label>
                    <Input id="speciality" defaultValue="Médecine générale" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse professionnelle</Label>
                    <Input id="address" defaultValue="15 rue de la Paix" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postalcode">Code postal</Label>
                      <Input id="postalcode" defaultValue="75002" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input id="city" defaultValue="Paris" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biographie</Label>
                    <textarea 
                      id="bio" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                      rows={4}
                      defaultValue="Médecin généraliste diplômé de la faculté de médecine de Paris. Plus de 15 ans d'expérience dans le suivi de patients de tous âges."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-[#0069D9]">Enregistrer les modifications</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
