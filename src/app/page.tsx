import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tractor, BatteryFull, MapPin, Wifi, WifiOff } from "lucide-react";
import Image from 'next/image';

export default function DashboardPage() {
  // Mock data - in a real app, this would come from an API or state management
  const tractorStatus = {
    online: true,
    currentActivity: "Idle",
    task: "None",
  };
  const batteryLevel = 78; // Percentage
  const location = {
    latitude: "12.9716° N",
    longitude: "77.5946° E",
    mapPreviewUrl: "https://placehold.co/600x400.png",
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tractor Status Card */}
        <Card className="shadow-lg rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-primary">Tractor Status</CardTitle>
            <Tractor className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-2">
              {tractorStatus.online ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}
              <p className={`text-xl font-bold ${tractorStatus.online ? 'text-green-600' : 'text-red-600'}`}>
                {tractorStatus.online ? "Online" : "Offline"}
              </p>
            </div>
            <p className="text-md text-muted-foreground">Activity: {tractorStatus.currentActivity}</p>
            <p className="text-md text-muted-foreground">Current Task: {tractorStatus.task}</p>
          </CardContent>
        </Card>

        {/* Battery Level Card */}
        <Card className="shadow-lg rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-primary">Battery Level</CardTitle>
            <BatteryFull className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">{batteryLevel}%</div>
            <Progress value={batteryLevel} aria-label={`${batteryLevel}% battery remaining`} className="h-3 [&>div]:bg-primary" />
            <p className="text-xs text-muted-foreground mt-1">
              {batteryLevel > 20 ? "Sufficient charge for operations." : "Low battery. Consider charging."}
            </p>
          </CardContent>
        </Card>

        {/* Location Card */}
        <Card className="shadow-lg rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-primary">Current Location</CardTitle>
            <MapPin className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-md font-semibold text-foreground">Lat: {location.latitude}</p>
            <p className="text-md font-semibold text-foreground mb-3">Lon: {location.longitude}</p>
            <div className="aspect-video w-full overflow-hidden rounded-md">
              <Image
                src={location.mapPreviewUrl}
                alt="Map preview of tractor location"
                width={600}
                height={400}
                className="object-cover w-full h-full"
                data-ai-hint="map terrain"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
