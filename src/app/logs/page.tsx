import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText, AlertTriangle, Info, CheckCircle } from "lucide-react";

// Mock data for demonstration
const logData = [
  {
    id: "log001",
    timestamp: new Date().toISOString(),
    eventType: "Task Started",
    details: "Cutting operation initiated in Field A.",
    level: "info",
  },
  {
    id: "log002",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    eventType: "Obstacle Detected",
    details: "Animal (deer) detected at GPS: 12.9720° N, 77.5950° E. Tractor stopped.",
    level: "warning",
  },
  {
    id: "log003",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
    eventType: "Low Battery",
    details: "Battery level at 15%. Returning to home base.",
    level: "warning",
  },
  {
    id: "log004",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    eventType: "Task Completed",
    details: "Cutting operation in Field A finished. Area covered: 2.5 acres.",
    level: "success",
  },
  {
    id: "log005",
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(), // 20 minutes ago
    eventType: "System Error",
    details: "GPS signal lost. Tractor paused operation. Error Code: E-GPS-001",
    level: "error",
  },
];

function LogIcon({ level }: { level: string }) {
  switch (level) {
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "error":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    default:
      return <Info className="h-5 w-5 text-muted-foreground" />;
  }
}

export default function DataLogsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8 text-foreground flex items-center">
        <ScrollText className="mr-3 h-8 w-8 text-primary" />
        Data Logs
      </h1>
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Operational Data</CardTitle>
          <CardDescription>
            Review logged events, errors, and operational insights for farm management.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of recent operational logs.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="w-[200px] text-foreground">Timestamp</TableHead>
                <TableHead className="text-foreground">Event Type</TableHead>
                <TableHead className="text-foreground">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logData.map((log) => (
                <TableRow key={log.id}>
                  <TableCell><LogIcon level={log.level} /></TableCell>
                  <TableCell className="font-medium text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-foreground">{log.eventType}</TableCell>
                  <TableCell className="text-muted-foreground">{log.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
