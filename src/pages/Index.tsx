
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center border-b pb-6">
          <div className="flex justify-center mb-4">
            <img src="/placeholder.svg" alt="Prodysoft Medical" width={80} height={80} className="text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#0069D9]">Portail Médical</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
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
            <Button type="submit" className="w-full bg-[#0069D9] hover:bg-blue-700">
              Se connecter
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4 text-sm text-gray-500">
          Prototype développé par Prodysoft – Tous droits réservés
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
