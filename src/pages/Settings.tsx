import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from "lucide-react";

export default function Settings() {
  const settingsCards = [
    {
      title: "Profile Settings",
      description: "Manage your account information and preferences",
      icon: User,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Notifications",
      description: "Configure email and push notifications",
      icon: Bell,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Security",
      description: "Password, two-factor authentication, and security logs",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Appearance",
      description: "Customize the look and feel of your dashboard",
      icon: Palette,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {settingsCards.map((setting) => (
          <Card key={setting.title} className="gradient-card border-0 shadow-medium hover:shadow-large transition-spring cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${setting.bgColor}`}>
                  <setting.icon className={`h-6 w-6 ${setting.color}`} />
                </div>
                <div>
                  <CardTitle className="text-lg">{setting.title}</CardTitle>
                  <CardDescription>{setting.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Configure
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="gradient-card border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Application Settings
          </CardTitle>
          <CardDescription>
            General application settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive email updates about your products</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="font-medium">Low Stock Alerts</h4>
                <p className="text-sm text-muted-foreground">Get notified when products are running low</p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="font-medium">Data Export</h4>
                <p className="text-sm text-muted-foreground">Export your product data</p>
              </div>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}