import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CostCalculator } from "@/components/CostCalculator";
import { RiskMatrix } from "@/components/RiskMatrix";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, 
  Battery, 
  Bluetooth, 
  Zap, 
  Shield,
  Package,
  DollarSign,
  AlertTriangle
} from "lucide-react";

export default function Documentation() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-6 space-y-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-2">Project Documentation</h1>
          <p className="text-muted-foreground">Complete working plan for Search Sticker</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="technical" data-testid="tab-technical">Technical</TabsTrigger>
            <TabsTrigger value="cost" data-testid="tab-cost">Cost</TabsTrigger>
            <TabsTrigger value="risks" data-testid="tab-risks">Risks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Concept & Use Cases
              </h2>
              <p className="text-muted-foreground mb-4">
                A low-cost adhesive 'search sticker' with BLE + IR sensor, powered by coin cell battery.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge>Offices</Badge>
                  <span className="text-sm">Asset finding and equipment tracking</span>
                </div>
                <div className="flex items-start gap-3">
                  <Badge>Factories</Badge>
                  <span className="text-sm">Tool tracking and inventory management</span>
                </div>
                <div className="flex items-start gap-3">
                  <Badge>Luxury Shops</Badge>
                  <span className="text-sm">Anti-tamper and security monitoring</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">High-Level Components</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Cpu className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">BLE SoC (nRF52 family)</p>
                    <p className="text-sm text-muted-foreground">Nordic Semiconductor chip</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">IR Sensor</p>
                    <p className="text-sm text-muted-foreground">Reflective or PIR detection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Battery className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">CR2032 Button Cell</p>
                    <p className="text-sm text-muted-foreground">225 mAh capacity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Adhesive Design</p>
                    <p className="text-sm text-muted-foreground">Thin PCB + laminate</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Bluetooth className="h-5 w-5" />
                Mobile App Features
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Scan & list stickers with real-time updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Show battery %, last seen timestamp, and RSSI signal strength</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>'Find' feature triggers LED blink for physical location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Optional cloud logging via Firebase for multi-device sync</span>
                </li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-4 mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Electronics & Firmware
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <div className="p-3 rounded-md bg-muted/50">
                  <p className="font-medium text-foreground mb-1">Power Management</p>
                  <p className="text-sm">Deep sleep default, wake on IR interrupt</p>
                </div>
                <div className="p-3 rounded-md bg-muted/50">
                  <p className="font-medium text-foreground mb-1">Communication</p>
                  <p className="text-sm">Event-driven BLE advertisements</p>
                </div>
                <div className="p-3 rounded-md bg-muted/50">
                  <p className="font-medium text-foreground mb-1">Battery Monitoring</p>
                  <p className="text-sm">Real-time measurement via ADC</p>
                </div>
                <div className="p-3 rounded-md bg-muted/50">
                  <p className="font-medium text-foreground mb-1">Optimization</p>
                  <p className="text-sm">Firmware optimizations for µA-level consumption</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Battery className="h-5 w-5" />
                Power & Lifespan
              </h2>
              <p className="text-muted-foreground mb-4">CR2032 ~225 mAh capacity estimates:</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-md bg-chart-2/10">
                  <div>
                    <p className="font-medium">5 µA average consumption</p>
                    <p className="text-sm text-muted-foreground">Deep sleep optimized</p>
                  </div>
                  <Badge variant="default">~5 years</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-md bg-chart-3/10">
                  <div>
                    <p className="font-medium">20 µA average consumption</p>
                    <p className="text-sm text-muted-foreground">Moderate usage</p>
                  </div>
                  <Badge variant="default">~1.2 years</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-md bg-chart-4/10">
                  <div>
                    <p className="font-medium">100 µA average consumption</p>
                    <p className="text-sm text-muted-foreground">Heavy usage</p>
                  </div>
                  <Badge variant="destructive">~3 months</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                → Optimize with sleep modes + pulsed IR + short BLE bursts
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Mechanical Design
              </h2>
              <div className="space-y-3">
                <div className="p-3 rounded-md border">
                  <p className="font-medium mb-1">Thin Sticker SKU</p>
                  <p className="text-sm text-muted-foreground">Industrial adhesive for offices</p>
                </div>
                <div className="p-3 rounded-md border">
                  <p className="font-medium mb-1">Rugged SKU</p>
                  <p className="text-sm text-muted-foreground">Polycarbonate housing for factories</p>
                </div>
                <div className="p-3 rounded-md border">
                  <p className="font-medium mb-1">Tamper-Resistant</p>
                  <p className="text-sm text-muted-foreground">Enhanced security for luxury retail</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="cost" className="space-y-4 mt-6">
            <CostCalculator />

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Cost Breakdown (excluding app)
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-md bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Prototype</p>
                    <p className="text-2xl font-bold">₹640</p>
                    <p className="text-xs text-muted-foreground mt-1">per unit (10 units)</p>
                  </div>
                  <div className="p-4 rounded-md bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Pilot</p>
                    <p className="text-2xl font-bold">₹370</p>
                    <p className="text-xs text-muted-foreground mt-1">per unit (200 units)</p>
                  </div>
                  <div className="p-4 rounded-md bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Mass Production</p>
                    <p className="text-2xl font-bold">₹210</p>
                    <p className="text-xs text-muted-foreground mt-1">per unit (10k units)</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Costs decrease with volume due to economies of scale, bulk component purchasing, 
                  and optimized manufacturing processes.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="risks" className="space-y-4 mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Key Challenges
              </h2>
              <p className="text-muted-foreground mb-4">
                Understanding and mitigating risks is critical for successful deployment. 
                Each challenge has corresponding solutions to ensure project viability.
              </p>
            </Card>

            <RiskMatrix />

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Mitigation Strategies</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Deep-sleep firmware:</strong> Reduces 
                  power consumption to 5µA average for extended battery life.
                </p>
                <p>
                  <strong className="text-foreground">Tiered SKUs:</strong> Multiple product 
                  variants address different use cases and price points.
                </p>
                <p>
                  <strong className="text-foreground">BLE-WiFi gateways:</strong> Extend range 
                  and reduce interference in large facilities.
                </p>
                <p>
                  <strong className="text-foreground">Rotating IDs:</strong> Enhanced privacy 
                  through dynamic Bluetooth identifiers.
                </p>
                <p>
                  <strong className="text-foreground">Pre-certified modules:</strong> Reduce 
                  certification costs and time-to-market.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
