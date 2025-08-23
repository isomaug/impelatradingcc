"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { salesForecast, SalesForecastOutput } from "@/ai/flows/sales-forecast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, BarChart, Lightbulb, TrendingUp } from "lucide-react";

const FormSchema = z.object({
  historicalSalesData: z.string().min(20, "Please provide more detailed historical data."),
  marketTrends: z.string().min(10, "Please describe the market trends."),
  forecastHorizon: z.string().min(3, "Please specify a forecast horizon (e.g., 'next quarter')."),
});

export default function SalesForecaster() {
  const [isLoading, setIsLoading] = useState(false);
  const [forecast, setForecast] = useState<SalesForecastOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      historicalSalesData: "Product,Month,Sales\nWallet,Jan,150\nWallet,Feb,180\nBriefcase,Jan,80\nBriefcase,Feb,95",
      marketTrends: "Influencer marketing campaign starting next month, upcoming holiday season.",
      forecastHorizon: "Next Quarter",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setForecast(null);
    try {
      const result = await salesForecast(data);
      setForecast(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "AI Forecaster Error",
        description: "Could not generate forecast at this time. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Sales Forecaster</CardTitle>
        <CardDescription>
          Generate sales predictions based on historical data and market trends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="historicalSalesData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Historical Sales Data (CSV format)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Provide historical sales data..." className="h-32 font-code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketTrends"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Market Trends</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe current market trends..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="forecastHorizon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forecast Horizon</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Next Month', 'Next 6 Months'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Forecast
            </Button>
          </form>
        </Form>
      </CardContent>
      { (isLoading || forecast) && (
        <CardFooter className="flex flex-col items-start gap-4">
          {isLoading && (
             <p className="text-muted-foreground flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing data and generating forecast...</p>
          )}
          {forecast && (
            <div className="w-full space-y-6">
              <h3 className="text-2xl font-headline">Forecast Results</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Sales Prediction</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold">{forecast.salesPrediction}</p>
                    <p className="text-xs text-muted-foreground">Confidence: {forecast.confidenceLevel}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Key Factors</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{forecast.keyFactors}</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Recommended Actions</CardTitle>
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{forecast.recommendedActions}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
