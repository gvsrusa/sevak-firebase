"use client"; // Needs to be client for react-hook-form

import { useState } from "react"; // Import useState
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InteractiveMap, { MapMode } from "@/components/ui/InteractiveMap"; // Import MapMode

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Map, Navigation, Home } from "lucide-react";

const taskFormSchema = z.object({
  cuttingArea: z.string().min(5, { message: "Cutting area coordinates must be defined." }),
  dropOffPoint: z.string().min(5, { message: "Drop-off point coordinates must be defined." }),
  homeBase: z.string().min(5, { message: "Home base coordinates must be defined." }),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

export default function TaskManagementPage() {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      cuttingArea: "",
      dropOffPoint: "",
      homeBase: "",
    },
  });

  const [currentMapMode, setCurrentMapMode] = useState<MapMode>("cuttingArea");

  // Watch form values to pass to the map
  const cuttingAreaValue = form.watch("cuttingArea");
  const dropOffPointValue = form.watch("dropOffPoint");
  const homeBaseValue = form.watch("homeBase");

  function onSubmit(data: TaskFormValues) {
    toast({
      title: "Task Definition Submitted",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-background p-4">
          <code className="text-foreground">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log("Task data:", data);
    // Here you would typically send data to a backend or manage state
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Task Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Define Task Areas</CardTitle>
            <CardDescription>
              Specify the coordinates for the cutting area, drop-off point, and home base for the autonomous task.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="cuttingArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground flex items-center">
                        <Map className="mr-2 h-5 w-5 text-muted-foreground" />
                        Cutting Area Coordinates
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., POLYGON((lat1 lon1, ...))" {...field} className="bg-background"/>
                      </FormControl>
                      <FormDescription>
                        Define the boundary for cutting. You can also draw this on the map.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropOffPoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground flex items-center">
                        <Navigation className="mr-2 h-5 w-5 text-muted-foreground" />
                        Drop-off Point Coordinates
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., POINT(lat lon)" {...field} className="bg-background"/>
                      </FormControl>
                      <FormDescription>
                        Set the drop-off location. You can also set this on the map.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="homeBase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground flex items-center">
                        <Home className="mr-2 h-5 w-5 text-muted-foreground" />
                        Home Base Coordinates
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., POINT(lat lon)" {...field} className="bg-background"/>
                      </FormControl>
                      <FormDescription>
                        Set the home base location. You can also set this on the map.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                  Save Task Definition
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl flex flex-col"> {/* Added flex flex-col */}
          <CardHeader>
            <CardTitle className="text-xl text-primary">Map Interface</CardTitle>
            <CardDescription>
              Select a mode below, then draw on the map. Click the shape again to delete it.
            </CardDescription>
            <div className="flex space-x-2 pt-2">
              <Button
                variant={currentMapMode === "cuttingArea" ? "default" : "outline"}
                onClick={() => setCurrentMapMode("cuttingArea")}
              >
                Define Cutting Area
              </Button>
              <Button
                variant={currentMapMode === "dropOffPoint" ? "default" : "outline"}
                onClick={() => setCurrentMapMode("dropOffPoint")}
              >
                Set Drop-off
              </Button>
              <Button
                variant={currentMapMode === "homeBase" ? "default" : "outline"}
                onClick={() => setCurrentMapMode("homeBase")}
              >
                Set Home Base
              </Button>
            </div>
          </CardHeader>
          {/* Ensure CardContent takes remaining space */}
          <CardContent className="flex-grow flex items-center justify-center h-full min-h-[300px] aspect-video">
            <InteractiveMap
              className="w-full h-full rounded-md"
              currentMode={currentMapMode}
              onSetCuttingArea={(coords) => form.setValue("cuttingArea", coords, { shouldValidate: true, shouldDirty: true })}
              onSetDropOffPoint={(coords) => form.setValue("dropOffPoint", coords, { shouldValidate: true, shouldDirty: true })}
              onSetHomeBase={(coords) => form.setValue("homeBase", coords, { shouldValidate: true, shouldDirty: true })}
              initialCuttingArea={cuttingAreaValue}
              initialDropOffPoint={dropOffPointValue}
              initialHomeBase={homeBaseValue}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
