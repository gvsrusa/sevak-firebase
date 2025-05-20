// obstacle-avoidance.ts
'use server';

/**
 * @fileOverview An obstacle avoidance AI agent for autonomous tractors.
 *
 * - obstacleAvoidance - A function that handles obstacle detection and avoidance using camera feed and GPS data.
 * - ObstacleAvoidanceInput - The input type for the obstacleAvoidance function.
 * - ObstacleAvoidanceOutput - The return type for the obstacleAvoidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ObstacleAvoidanceInputSchema = z.object({
  cameraFeedDataUri: z
    .string()
    .describe(
      "A data URI of the tractor's camera feed, including MIME type and Base64 encoding (e.g., 'data:<mimetype>;base64,<encoded_data>')."
    ),
  gpsCoordinates: z
    .string()
    .describe('The current GPS coordinates of the tractor (latitude, longitude).'),
});
export type ObstacleAvoidanceInput = z.infer<typeof ObstacleAvoidanceInputSchema>;

const ObstacleAvoidanceOutputSchema = z.object({
  obstacleDetected: z.boolean().describe('Indicates whether an obstacle has been detected.'),
  obstacleType: z
    .string()
    .optional()
    .describe('The type of obstacle detected (e.g., animal, object).'),
  suggestedAction: z
    .string()
    .describe(
      'A suggested action for the tractor to take (e.g., stop, slow down, change direction).'styles.
    ),
  confidenceLevel: z.number().describe('Confidence level of obstacle detection, from 0 to 1.'),
});
export type ObstacleAvoidanceOutput = z.infer<typeof ObstacleAvoidanceOutputSchema>;

export async function obstacleAvoidance(input: ObstacleAvoidanceInput): Promise<ObstacleAvoidanceOutput> {
  return obstacleAvoidanceFlow(input);
}

const obstacleAvoidancePrompt = ai.definePrompt({
  name: 'obstacleAvoidancePrompt',
  input: {schema: ObstacleAvoidanceInputSchema},
  output: {schema: ObstacleAvoidanceOutputSchema},
  prompt: `You are an AI agent integrated into an autonomous tractor, responsible for detecting and avoiding obstacles.
  You receive a camera feed and GPS coordinates, and you must determine if there are any obstacles in the tractor's path.

  Based on the camera feed and GPS data, analyze the surroundings and identify potential obstacles such as animals, people, or unexpected objects.
  If an obstacle is detected, determine the type of obstacle and suggest an appropriate action for the tractor to take to avoid it.
  Also, provide a confidence level for your obstacle detection.

  Here is the camera feed:
  {{media url=cameraFeedDataUri}}

  Here are the GPS coordinates:
  {{gpsCoordinates}}

  Consider the GPS data in conjunction with the camera feed to improve obstacle detection accuracy.  For example, if the GPS indicates
  that the tractor is near a fence or other boundary, that should inform the obstacle detection.  If there is an animal, specify the animal type, if possible.

  Output in JSON format:
  {{output}}`,
});

const obstacleAvoidanceFlow = ai.defineFlow(
  {
    name: 'obstacleAvoidanceFlow',
    inputSchema: ObstacleAvoidanceInputSchema,
    outputSchema: ObstacleAvoidanceOutputSchema,
  },
  async input => {
    const {output} = await obstacleAvoidancePrompt(input);
    return output!;
  }
);
