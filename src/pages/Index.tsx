
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CheckCircle, Shield, HeartPulse, Clock, Users } from "lucide-react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@prodysoft.com" && password === "admin123") {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur le portail médical",
      });
      setIsLoggedIn(true);
    } else {
      toast({
        title: "Échec de la connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/placeholder.svg" alt="Prodysoft Medical" width={40} height={40} className="text-blue-600" />
            <h1 className="text-xl font-bold text-[#0069D9] ml-2">Prodysoft Medical</h1>
          </div>
          <div>
            <Button variant="ghost" className="text-gray-600 mr-2">À propos</Button>
            <Button variant="ghost" className="text-gray-600 mr-2">Fonctionnalités</Button>
            <Button variant="ghost" className="text-gray-600 mr-2">Contact</Button>
            <Button className="bg-[#0069D9] hover:bg-blue-700">Démo</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">La solution complète pour la gestion de votre clinique</h2>
            <p className="text-lg text-gray-600 mb-6">
              Prodysoft Medical offre une plateforme intégrée qui optimise tous les aspects de la gestion clinique, 
              de la prise de rendez-vous à la gestion des ressources hospitalières.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" className="bg-[#0069D9] hover:bg-blue-700">
                Commencer <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Demander une démo
              </Button>
            </div>
            <div className="flex items-center text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span>Utilisé par plus de 300 établissements de santé</span>
            </div>
          </div>
          <div className="flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Gestion de clinique" 
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
        </div>

        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Une solution complète pour votre établissement de santé</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Notre plateforme offre tous les outils nécessaires pour optimiser vos opérations quotidiennes et améliorer la qualité des soins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <Card className="border-t-4 border-t-[#0069D9]">
            <CardHeader>
              <div className="p-3 rounded-full bg-blue-100 w-fit">
                <Users className="h-6 w-6 text-[#0069D9]" />
              </div>
              <CardTitle className="text-xl mt-4">Gestion des patients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Gérez efficacement les dossiers patients, les rendez-vous et les suivis médicaux pour offrir des soins personnalisés.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-[#0069D9]">
            <CardHeader>
              <div className="p-3 rounded-full bg-blue-100 w-fit">
                <HeartPulse className="h-6 w-6 text-[#0069D9]" />
              </div>
              <CardTitle className="text-xl mt-4">Suivi médical avancé</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Assurez un suivi précis de l'état de santé des patients avec nos outils de surveillance et d'analyse.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-[#0069D9]">
            <CardHeader>
              <div className="p-3 rounded-full bg-blue-100 w-fit">
                <Clock className="h-6 w-6 text-[#0069D9]" />
              </div>
              <CardTitle className="text-xl mt-4">Planification optimisée</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Organisez efficacement les rendez-vous, les opérations et l'utilisation des blocs opératoires.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 mb-20">
          <Tabs defaultValue="connexion" className="max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="connexion">Connexion</TabsTrigger>
              <TabsTrigger value="demo">Demander une démo</TabsTrigger>
            </TabsList>
            <TabsContent value="connexion">
              <Card>
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    <Shield className="h-12 w-12 text-[#0069D9]" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#0069D9]">Portail Médical</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="exemple@prodysoft.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Se souvenir de moi</span>
                      </label>
                      <a href="#" className="text-[#0069D9] hover:underline">Mot de passe oublié?</a>
                    </div>
                    <Button type="submit" className="w-full bg-[#0069D9] hover:bg-blue-700">
                      Se connecter
                    </Button>
                  </form>
                  <div className="text-center mt-4 text-sm text-gray-600">
                    <p>Identifiants de démonstration:</p>
                    <p>Email: admin@prodysoft.com</p>
                    <p>Mot de passe: admin123</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="demo">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Demandez une démonstration</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="prenom">Prénom</Label>
                        <Input id="prenom" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nom">Nom</Label>
                        <Input id="nom" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-demo">Email professionnel</Label>
                      <Input id="email-demo" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="etablissement">Établissement</Label>
                      <Input id="etablissement" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input id="telephone" type="tel" required />
                    </div>
                    <Button type="submit" className="w-full bg-[#0069D9] hover:bg-blue-700">
                      Demander une démo
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold mb-4">À propos</h4>
              <p className="text-gray-300">
                Prodysoft Medical développe des solutions innovantes pour la gestion des établissements de santé.
                Notre mission est d'améliorer la qualité des soins à travers des outils numériques performants.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Accueil</a></li>
                <li><a href="#" className="hover:text-white">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white">Tarifs</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>contact@prodysoft.com</li>
                <li>+33 1 23 45 67 89</li>
                <li>123 Avenue des Cliniques</li>
                <li>75001 Paris, France</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 Prodysoft Medical. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
