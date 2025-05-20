"use client"; // Needs to be client for react-hook-form

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

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
                        <Input placeholder="e.g., POLYGON((lat1 lon1, lat2 lon2, ...))" {...field} className="bg-background"/>
                      </FormControl>
                      <FormDescription>
                        Define the boundary for the autonomous cutting operation.
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
                        Set the location where harvested material should be dropped off.
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
                        The starting and ending point for the tractor.
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

        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Map Interface</CardTitle>
            <CardDescription>
              Visually define task areas on the map. (Interactive map coming soon)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full min-h-[300px] aspect-video">
             <Image
                src="https://placehold.co/800x600.png"
                alt="Placeholder map interface"
                width={800}
                height={600}
                className="object-contain w-full h-full rounded-md"
                data-ai-hint="farm map"
              />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
