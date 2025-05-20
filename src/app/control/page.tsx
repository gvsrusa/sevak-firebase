"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Hand, Gamepad2 } from "lucide-react";
import { toast } from '@/hooks/use-toast';

export default function ManualControlPage() {
  const [currentAction, setCurrentAction] = useState<string>("Stopped");

  const handleControl = (action: string) => {
    setCurrentAction(action);
    toast({
      title: "Manual Control",
      description: `Tractor command: ${action}`,
    });
    // In a real app, this would send a command to the tractor
    console.log(`Control action: ${action}`);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Manual Control</h1>
      <Card className="max-w-md mx-auto shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <Gamepad2 className="mr-2 h-6 w-6" />
            Virtual Joystick
          </CardTitle>
          <CardDescription>
            Use the buttons below to manually control the tractor. Current action: 
            <span className="font-semibold text-accent ml-1">{currentAction}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 p-6">
          <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
            <div />
            <Button
              variant="outline"
              size="lg"
              className="aspect-square h-20 w-20 text-foreground hover:bg-accent/20"
              onClick={() => handleControl("Move Forward")}
              aria-label="Move Forward"
            >
              <ArrowUp className="h-8 w-8" />
            </Button>
            <div />

            <Button
              variant="outline"
              size="lg"
              className="aspect-square h-20 w-20 text-foreground hover:bg-accent/20"
              onClick={() => handleControl("Turn Left")}
              aria-label="Turn Left"
            >
              <ArrowLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="aspect-square h-20 w-20 text-destructive-foreground"
              onClick={() => handleControl("Stop")}
              aria-label="Stop"
            >
              <Hand className="h-8 w-8" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="aspect-square h-20 w-20 text-foreground hover:bg-accent/20"
              onClick={() => handleControl("Turn Right")}
              aria-label="Turn Right"
            >
              <ArrowRight className="h-8 w-8" />
            </Button>

            <div />
            <Button
              variant="outline"
              size="lg"
              className="aspect-square h-20 w-20 text-foreground hover:bg-accent/20"
              onClick={() => handleControl("Move Backward")}
              aria-label="Move Backward"
            >
              <ArrowDown className="h-8 w-8" />
            </Button>
            <div />
          </div>
          <Button
            variant="secondary"
            className="w-full max-w-xs text-secondary-foreground hover:bg-secondary/80"
            onClick={() => handleControl("Reset Controls")}
            aria-label="Reset Controls"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
