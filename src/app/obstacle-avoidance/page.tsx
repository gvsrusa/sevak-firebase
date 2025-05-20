"use client";

import { useState, type ChangeEvent } from 'react';
import { obstacleAvoidance, type ObstacleAvoidanceInput, type ObstacleAvoidanceOutput } from '@/ai/flows/obstacle-avoidance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea'; // Using Textarea for GPS for more space
import Image from 'next/image';
import { AlertCircle, CheckCircle, Zap, ShieldAlert, Brain, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function ObstacleAvoidancePage() {
  const [cameraFeedDataUri, setCameraFeedDataUri] = useState<string | null>(null);
  const [gpsCoordinates, setGpsCoordinates] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<ObstacleAvoidanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCameraFeedDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCameraFeedDataUri(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cameraFeedDataUri || !gpsCoordinates) {
      toast({
        title: "Input Missing",
        description: "Please provide both camera feed and GPS coordinates.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const input: ObstacleAvoidanceInput = { cameraFeedDataUri, gpsCoordinates };
      const result = await obstacleAvoidance(input);
      setAnalysisResult(result);
      toast({
        title: "Analysis Complete",
        description: result.obstacleDetected ? "Obstacle detected!" : "No obstacle detected.",
      });
    } catch (err) {
      console.error("Obstacle avoidance error:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8 text-foreground flex items-center">
        <ShieldAlert className="mr-3 h-8 w-8 text-primary" />
        Obstacle Avoidance
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Input Data</CardTitle>
            <CardDescription>Upload camera feed and enter GPS coordinates for analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="cameraFeed" className="text-foreground">Camera Feed (Image)</Label>
                <Input
                  id="cameraFeed"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 bg-background file:text-primary file:font-semibold"
                />
                {cameraFeedDataUri && (
                  <div className="mt-4 border border-border rounded-md p-2 bg-muted/50">
                    <Image
                      src={cameraFeedDataUri}
                      alt="Camera feed preview"
                      width={200}
                      height={150}
                      className="object-contain rounded max-h-[150px] w-auto mx-auto"
                    />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="gpsCoordinates" className="text-foreground">GPS Coordinates</Label>
                <Textarea
                  id="gpsCoordinates"
                  value={gpsCoordinates}
                  onChange={(e) => setGpsCoordinates(e.target.value)}
                  placeholder="e.g., 40.7128° N, 74.0060° W"
                  rows={2}
                  className="mt-1 bg-background"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze for Obstacles
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Analysis Result</CardTitle>
            <CardDescription>AI-powered obstacle detection insights.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px]">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg">Processing data, please wait...</p>
              </div>
            )}
            {error && (
              <div className="flex flex-col items-center justify-center h-full text-destructive">
                <AlertCircle className="h-12 w-12 mb-4" />
                <p className="text-lg font-semibold">Error during analysis</p>
                <p className="text-sm text-center">{error}</p>
              </div>
            )}
            {!isLoading && !error && !analysisResult && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Zap className="h-12 w-12 mb-4" />
                <p className="text-lg">Submit data to see analysis results.</p>
              </div>
            )}
            {analysisResult && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-semibold text-foreground flex items-center">
                    {analysisResult.obstacleDetected ? (
                      <AlertCircle className="mr-2 h-5 w-5 text-destructive" />
                    ) : (
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    )}
                    Obstacle Detected:
                  </h3>
                  <p className={`text-lg font-bold ${analysisResult.obstacleDetected ? 'text-destructive' : 'text-green-600'}`}>
                    {analysisResult.obstacleDetected ? 'Yes' : 'No'}
                  </p>
                </div>
                {analysisResult.obstacleDetected && (
                  <div>
                    <h3 className="text-md font-semibold text-foreground">Obstacle Type:</h3>
                    <p className="text-muted-foreground">{analysisResult.obstacleType || 'N/A'}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-md font-semibold text-foreground">Suggested Action:</h3>
                  <p className="text-muted-foreground">{analysisResult.suggestedAction}</p>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-foreground">Confidence Level:</h3>
                  <p className="text-muted-foreground">{(analysisResult.confidenceLevel * 100).toFixed(1)}%</p>
                </div>
              </div>
            )}
          </CardContent>
          {analysisResult && (
            <CardFooter>
              <p className="text-xs text-muted-foreground">Analysis based on provided camera feed and GPS data.</p>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
