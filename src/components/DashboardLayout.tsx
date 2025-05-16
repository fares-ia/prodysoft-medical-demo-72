
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  CreditCard, 
  Settings, 
  LogOut, 
  Menu, 
  UserPlus,
  Package,
  Hospital,
  Briefcase,
  Ambulance,
  Folder
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type SidebarItemProps = {
  icon: React.ElementType;
  text: string;
  to: string;
  active: boolean;
};

const SidebarItem = ({ icon: Icon, text, to, active }: SidebarItemProps) => (
  <Link to={to} className="w-full">
    <Button
      variant="ghost"
      className={`w-full justify-start mb-1 ${
        active ? "bg-blue-100 text-[#0069D9]" : "text-gray-700 hover:bg-blue-50"
      }`}
    >
      <Icon className="mr-2 h-5 w-5" />
      <span>{text}</span>
    </Button>
  </Link>
);

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden mr-2" 
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/dashboard" className="flex items-center">
            <img src="/placeholder.svg" alt="Logo" className="h-8 w-8 mr-2" />
            <span className="font-bold text-lg text-[#0069D9]">Prodysoft Medical</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout} 
            className="text-gray-600 hover:text-red-600"
          >
            <LogOut className="h-4 w-4 mr-1" /> Déconnexion
          </Button>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r w-64 flex-shrink-0 flex flex-col transition-all duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static h-[calc(100vh-4rem)] z-10`}
        >
          <div className="p-4 flex-1 overflow-auto">
            <nav className="space-y-1">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2 mb-2">
                Principal
              </p>
              <SidebarItem
                icon={Home}
                text="Tableau de bord"
                to="/dashboard"
                active={location.pathname === "/dashboard"}
              />
              <SidebarItem
                icon={Users}
                text="Patients"
                to="/patients"
                active={location.pathname.startsWith("/patients")}
              />
              <SidebarItem
                icon={Calendar}
                text="Rendez-vous"
                to="/appointments"
                active={location.pathname.startsWith("/appointments")}
              />
              <SidebarItem
                icon={FileText}
                text="Consultations"
                to="/consultations"
                active={location.pathname.startsWith("/consultations")}
              />
              
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">
                Administration
              </p>
              <SidebarItem
                icon={UserPlus}
                text="Utilisateurs"
                to="/users"
                active={location.pathname.startsWith("/users")}
              />
              <SidebarItem
                icon={Hospital}
                text="Blocs Opératoires"
                to="/operating-rooms"
                active={location.pathname.startsWith("/operating-rooms")}
              />
              <SidebarItem
                icon={Briefcase}
                text="Services"
                to="/services"
                active={location.pathname.startsWith("/services")}
              />
              
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">
                Logistique
              </p>
              <SidebarItem
                icon={Folder}
                text="Fournisseurs"
                to="/suppliers"
                active={location.pathname.startsWith("/suppliers")}
              />
              <SidebarItem
                icon={Package}
                text="Commandes"
                to="/orders"
                active={location.pathname.startsWith("/orders")}
              />
              <SidebarItem
                icon={Ambulance}
                text="Flotte"
                to="/fleet"
                active={location.pathname.startsWith("/fleet")}
              />
              
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">
                Finance
              </p>
              <SidebarItem
                icon={CreditCard}
                text="Facturation"
                to="/billing"
                active={location.pathname.startsWith("/billing")}
              />
              
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">
                Système
              </p>
              <SidebarItem
                icon={Settings}
                text="Paramètres"
                to="/settings"
                active={location.pathname.startsWith("/settings")}
              />
            </nav>
          </div>
          <div className="p-4 border-t text-xs text-center text-gray-500">
            Prototype développé par Prodysoft<br/>
            Tous droits réservés
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
