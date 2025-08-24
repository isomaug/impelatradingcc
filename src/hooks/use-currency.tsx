
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";

export type Currency = "ZAR" | "USD" | "EUR" | "KES" | "UGX" | "TZS" | "RWF" | "BIF";

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatCurrency: (amountInZAR: number) => string;
  rates: ExchangeRates;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const currencySymbols: { [key in Currency]: string } = {
  ZAR: "R",
  USD: "$",
  EUR: "€",
  KES: "KSh ",
  UGX: "UGX ",
  TZS: "TSh ",
  RWF: "FRw ",
  BIF: "FBu ",
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>("ZAR");
  const [rates, setRates] = useState<ExchangeRates>({ ZAR: 1, USD: 0.054, EUR: 0.050, KES: 7.0, UGX: 205.0, TZS: 140.0, RWF: 70.0, BIF: 155.0 });
  
  useEffect(() => {
    // Attempt to get currency from localStorage
    try {
      const savedCurrency = localStorage.getItem("currency") as Currency | null;
      if (savedCurrency && Object.keys(currencySymbols).includes(savedCurrency)) {
        setCurrency(savedCurrency);
      }
    } catch (error) {
      console.error("Failed to parse currency from localStorage", error);
    }
    
    // Fetch latest rates from mock API
    const fetchRates = async () => {
        try {
            const response = await fetch('/api/currency');
            if (!response.ok) throw new Error('Failed to fetch rates');
            const data = await response.json();
            setRates(data.rates);
        } catch (error) {
            console.error("Could not fetch exchange rates, using default.", error);
        }
    };
    
    fetchRates();
  }, []);

  useEffect(() => {
    // Save currency to localStorage whenever it changes
    localStorage.setItem("currency", currency);
  }, [currency]);
  
  const formatCurrency = useMemo(() => (amountInZAR: number) => {
    const rate = rates[currency] || 0;
    const convertedAmount = amountInZAR * rate;
    const symbol = currencySymbols[currency];

    const isShillingOrFranc = ["KES", "UGX", "TZS", "RWF", "BIF"].includes(currency);

    if (isShillingOrFranc) {
        return `${symbol}${Math.round(convertedAmount).toLocaleString()}`;
    }
    return `${symbol}${convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, [currency, rates]);

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, formatCurrency, rates }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
