import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  Settings, 
  Bell, 
  Info, 
  HelpCircle,
  Shield,
  Bluetooth,
  Battery
} from "lucide-react";

export default function More() {
  const menuItems = [
    {
      icon: Settings,
      title: "Settings",
      description: "App preferences and configuration",
      onClick: () => console.log('Open settings'),
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Battery alerts and device updates",
      onClick: () => console.log('Open notifications'),
    },
    {
      icon: Bluetooth,
      title: "BLE Settings",
      description: "Bluetooth connection preferences",
      onClick: () => console.log('Open BLE settings'),
    },
    {
      icon: Battery,
      title: "Battery Management",
      description: "Configure low battery thresholds",
      onClick: () => console.log('Open battery settings'),
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Data protection and permissions",
      onClick: () => console.log('Open privacy settings'),
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "FAQs and contact support",
      onClick: () => console.log('Open help'),
    },
    {
      icon: Info,
      title: "About",
      description: "App version and information",
      onClick: () => console.log('Open about'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-6 space-y-6 max-w-7xl mx-auto pb-24">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">More</h1>
            <p className="text-muted-foreground">Settings and preferences</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="p-4 hover-elevate active-elevate-2 cursor-pointer"
                onClick={item.onClick}
                data-testid={`menu-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Search Sticker Manager</p>
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
          <p className="text-xs text-muted-foreground mt-2">
            BLE asset tracking solution
          </p>
        </Card>
      </div>
    </div>
  );
}
