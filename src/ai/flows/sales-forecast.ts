// Sales forecasting flow.

'use server';

/**
 * @fileOverview Provides sales predictions and forecasting based on historical sales data and market trends.
 *
 * - salesForecast - A function that handles the sales forecasting process.
 * - SalesForecastInput - The input type for the salesForecast function.
 * - SalesForecastOutput - The return type for the salesForecast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SalesForecastInputSchema = z.object({
  historicalSalesData: z
    .string()
    .describe(
      'Historical sales data, preferably in CSV format, including dates, product IDs, and sales figures.'
    ),
  marketTrends: z
    .string()
    .describe(
      'Description of current market trends affecting the product sales.'
    ),
  forecastHorizon: z
    .string()
    .describe(
      'The time horizon for the sales forecast, e.g., next month, next quarter, next year.'
    ),
});
export type SalesForecastInput = z.infer<typeof SalesForecastInputSchema>;

const SalesForecastOutputSchema = z.object({
  salesPrediction: z
    .string()
    .describe('Predicted sales figures for the specified forecast horizon.'),
  confidenceLevel: z
    .string()
    .describe(
      'Confidence level of the sales prediction (e.g., High, Medium, Low).'
    ),
  keyFactors: z
    .string()
    .describe(
      'Key factors influencing the sales prediction, such as seasonality or market trends.'
    ),
  recommendedActions: z
    .string()
    .describe(
      'Recommended actions based on the sales forecast, such as adjusting inventory or marketing strategies.'
    ),
});
export type SalesForecastOutput = z.infer<typeof SalesForecastOutputSchema>;

export async function salesForecast(input: SalesForecastInput): Promise<SalesForecastOutput> {
  return salesForecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'salesForecastPrompt',
  input: {schema: SalesForecastInputSchema},
  output: {schema: SalesForecastOutputSchema},
  prompt: `You are an AI Sales Assistant that provides sales predictions and forecasting based on historical sales data and market trends.

  Analyze the provided historical sales data, current market trends, and the specified forecast horizon to generate a sales forecast. Provide a confidence level for the prediction, identify key influencing factors, and recommend actions based on the forecast.

  Historical Sales Data: {{{historicalSalesData}}}
  Market Trends: {{{marketTrends}}}
  Forecast Horizon: {{{forecastHorizon}}}

  Provide the sales prediction, confidence level, key factors, and recommended actions.
  `,
});

const salesForecastFlow = ai.defineFlow(
  {
    name: 'salesForecastFlow',
    inputSchema: SalesForecastInputSchema,
    outputSchema: SalesForecastOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
