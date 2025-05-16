
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Shield, HeartPulse, Clock, Users, Stethoscope, Building, FileText, Hospital } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm py-4 fixed w-full z-10">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Hospital className="h-10 w-10 text-[#0069D9]" aria-label="Hospital icon" />
            <h1 className="text-xl font-bold text-[#0069D9] ml-2">Prodysoft Medical</h1>
          </div>
          <div>
            <Button 
              className="bg-[#0069D9] hover:bg-blue-700" 
              size="lg"
              onClick={() => navigate('/login')}
            >
              Découvrir <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section with Full Screen Image */}
        <div className="relative h-screen">
          <img 
            src="https://images.unsplash.com/photo-1589279003513-467d320f47eb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Professionnel de santé utilisant un ordinateur" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white">
                <h2 className="text-5xl font-bold mb-6 animate-fade-in">La solution de référence pour la gestion hospitalière</h2>
                <p className="text-xl mb-8 animate-fade-in">
                  Prodysoft Medical transforme la façon dont les établissements de santé gèrent leurs opérations quotidiennes, 
                  offrant une plateforme complète et intuitive pour tous vos besoins.
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-[#0069D9] hover:bg-blue-50 animate-fade-in"
                  onClick={() => navigate('/login')}
                >
                  Découvrir <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Une solution complète pour votre établissement de santé</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Notre plateforme offre tous les outils nécessaires pour optimiser vos opérations quotidiennes et améliorer la qualité des soins.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-blue-100 w-fit mb-4">
                  <Users className="h-6 w-6 text-[#0069D9]" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Gestion des patients</h4>
                <p className="text-gray-600">
                  Dossiers médicaux électroniques complets, historiques des consultations et suivi personnalisé de chaque patient.
                </p>
              </div>
              
              <div className="p-6 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-blue-100 w-fit mb-4">
                  <Stethoscope className="h-6 w-6 text-[#0069D9]" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Blocs opératoires</h4>
                <p className="text-gray-600">
                  Planification avancée des interventions chirurgicales et gestion optimisée des salles d'opération.
                </p>
              </div>
              
              <div className="p-6 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-blue-100 w-fit mb-4">
                  <Building className="h-6 w-6 text-[#0069D9]" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Gestion par services</h4>
                <p className="text-gray-600">
                  Organisation par unités spécialisées pour une coordination optimale entre les différents départements de votre établissement.
                </p>
              </div>
              
              <div className="p-6 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-blue-100 w-fit mb-4">
                  <HeartPulse className="h-6 w-6 text-[#0069D9]" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Suivi médical avancé</h4>
                <p className="text-gray-600">
                  Outils de surveillance et d'analyse pour un suivi précis de l'état de santé des patients.
                </p>
              </div>
              
              <div className="p-6 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-blue-100 w-fit mb-4">
                  <FileText className="h-6 w-6 text-[#0069D9]" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Facturation intelligente</h4>
                <p className="text-gray-600">
                  Système de facturation automatisé avec suivi des paiements et génération de rapports financiers.
                </p>
              </div>
              
              <div className="p-6 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 rounded-full bg-blue-100 w-fit mb-4">
                  <Clock className="h-6 w-6 text-[#0069D9]" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Planification optimisée</h4>
                <p className="text-gray-600">
                  Gestion intelligente des rendez-vous et des ressources pour maximiser l'efficacité opérationnelle.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action - Changed background to white */}
        <div className="py-16 bg-white text-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-6">Prêt à transformer votre établissement de santé ?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Rejoignez plus de 300 établissements qui font confiance à Prodysoft Medical pour optimiser leur gestion quotidienne.
            </p>
            <Button 
              size="lg" 
              className="bg-[#0069D9] hover:bg-blue-700 text-white"
              onClick={() => navigate('/login')}
            >
              Découvrir dès maintenant <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="bg-[#e5e7eb] text-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold mb-4">À propos</h4>
              <p className="text-gray-600">
                Prodysoft Medical développe des solutions innovantes pour la gestion des établissements de santé.
                Notre mission est d'améliorer la qualité des soins à travers des outils numériques performants.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Accueil</a></li>
                <li><a href="#" className="hover:text-gray-900">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-gray-900">Tarifs</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Email: contact@prodysoft.com</li>
                <li>Tél France/WhatsApp: +33 7 71 68 59 90</li>
                <li>Tél Algérie: +213 6 59 61 43 77</li>
                <li>Adresses: Bejaia, Alger et Paris</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-300 text-center text-gray-500">
            <p>© 2025 Prodysoft Medical. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
