
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, FileText, CreditCard } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  trend, 
  color 
}: { 
  icon: React.ElementType; 
  title: string; 
  value: string; 
  trend?: string; 
  color: string;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && <p className="text-xs text-green-500 mt-1">{trend}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  // Mock data for upcoming appointments
  const upcomingAppointments = [
    { id: 1, patient: "Marie Dupont", time: "09:00", type: "Consultation" },
    { id: 2, patient: "Jean Lefebvre", time: "10:30", type: "Suivi" },
    { id: 3, patient: "Lucie Martin", time: "14:15", type: "Urgence" },
    { id: 4, patient: "Thomas Bernard", time: "16:45", type: "Consultation" },
  ];

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, type: "Consultation", patient: "Sophie Dubois", date: "Il y a 1 heure" },
    { id: 2, type: "Facturation", patient: "Paul Moreau", date: "Il y a 3 heures" },
    { id: 3, type: "Nouveau Patient", patient: "Emma Petit", date: "Il y a 5 heures" },
    { id: 4, type: "Ordonnance", patient: "Marc Leroy", date: "Hier, 18:30" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Bonjour, Dr Lefèvre</h1>
          <p className="text-gray-500">Voici un aperçu de votre activité pour aujourd'hui</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            title="Patients Total"
            value="1,248"
            trend="+12% ce mois"
            color="bg-blue-500"
          />
          <StatCard
            icon={Calendar}
            title="Rendez-vous aujourd'hui"
            value="8"
            color="bg-green-500"
          />
          <StatCard
            icon={FileText}
            title="Consultations en attente"
            value="3"
            color="bg-amber-500"
          />
          <StatCard
            icon={CreditCard}
            title="Factures impayées"
            value="5"
            trend="3,240 €"
            color="bg-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Rendez-vous à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        {appointment.patient.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium">{appointment.patient}</h4>
                        <p className="text-sm text-gray-500">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{appointment.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Activités récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start border-b pb-3 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-3">
                      {activity.type.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.type}</h4>
                      <p className="text-sm">{activity.patient}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
