
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Shield, LogIn, Hospital } from "lucide-react";

const Login = () => {
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
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-blue-50 to-white">
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Hospital className="h-10 w-10 text-[#0069D9]" aria-label="Hospital icon" />
            <h1 className="text-2xl font-bold text-[#0069D9] ml-2">Prodysoft Medical</h1>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Connexion au portail médical</h2>
          <p className="text-gray-600 mb-8">
            Accédez à votre espace sécurisé pour gérer votre établissement de santé
            avec notre plateforme complète et intuitive.
          </p>
        
          <Card className="shadow-lg">
            <CardHeader className="space-y-1 pb-2">
              <div className="flex justify-center">
                <Shield className="h-10 w-10 text-[#0069D9]" />
              </div>
              <CardTitle className="text-2xl font-bold text-center text-[#0069D9]">Authentification</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
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
                    className="h-11"
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
                    className="h-11"
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Se souvenir de moi</span>
                  </label>
                  <a href="#" className="text-[#0069D9] hover:underline">Mot de passe oublié?</a>
                </div>
                <Button type="submit" size="lg" className="w-full mt-2 bg-[#0069D9] hover:bg-blue-700">
                  <LogIn className="mr-2 h-5 w-5" /> Se connecter
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-center">
                <p className="text-sm font-medium text-gray-700 mb-2">Identifiants de démonstration:</p>
                <div className="text-sm text-gray-600">
                  <p>Email: <span className="font-mono bg-blue-100 px-2 py-1 rounded">admin@prodysoft.com</span></p>
                  <p className="mt-1">Mot de passe: <span className="font-mono bg-blue-100 px-2 py-1 rounded">admin123</span></p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <p className="text-sm text-gray-500">
                Première connexion? <a href="#" className="text-[#0069D9] font-semibold hover:underline">Contactez votre administrateur</a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Section droite avec image */}
      <div className="hidden md:block flex-1 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-90"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <h3 className="text-3xl font-bold mb-6">La gestion hospitalière réinventée</h3>
          <p className="text-xl mb-8 text-center">
            Notre plateforme tout-en-un vous permet d'optimiser chaque aspect de votre établissement de santé.
          </p>
          <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
            <div className="bg-white/10 backdrop-filter backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold mb-2">Gestion des patients</h4>
              <p className="text-sm">Suivi médical complet et dossiers centralisés</p>
            </div>
            <div className="bg-white/10 backdrop-filter backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold mb-2">Blocs opératoires</h4>
              <p className="text-sm">Planification optimisée des interventions</p>
            </div>
            <div className="bg-white/10 backdrop-filter backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold mb-2">Ressources médicales</h4>
              <p className="text-sm">Gestion efficace du personnel et matériel</p>
            </div>
            <div className="bg-white/10 backdrop-filter backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-bold mb-2">Facturation</h4>
              <p className="text-sm">Traitement rapide et sécurisé des paiements</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 text-white/70 text-sm">
          <p>© 2025 Prodysoft Medical</p>
        </div>
        
        <img 
          src="https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
          alt="Personnel médical" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />
      </div>
    </div>
  );
};

export default Login;
