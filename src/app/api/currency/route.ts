
import { NextResponse } from 'next/server';

// In a real application, you would fetch this from a live currency API.
// For this prototype, we're using static rates.
// Base currency is ZAR.
const exchangeRates = {
  ZAR: 1,
  USD: 0.054, // 1 ZAR = 0.054 USD
  EUR: 0.050, // 1 ZAR = 0.050 EUR
};

export async function GET() {
  try {
    return NextResponse.json({
      base: 'ZAR',
      rates: exchangeRates,
    });
  } catch (error) {
    return new NextResponse('Error fetching exchange rates', { status: 500 });
  }
}
