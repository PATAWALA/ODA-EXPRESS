"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CurrencyCode = "USD" | "EUR" | "XOF";

const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  XOF: 600,
};

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  format: (amountUsd: number, decimals?: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  const format = useCallback(
    (amountUsd: number, decimals = 0) => {
      const value = amountUsd * EXCHANGE_RATES[currency];
      const formatted = new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);

      if (currency === "USD") return `$${formatted}`;
      if (currency === "EUR") return `${formatted} €`;
      return `${formatted} FCFA`;
    },
    [currency],
  );

  const value = useMemo(
    () => ({ currency, setCurrency, format }),
    [currency, format],
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency doit être utilisé à l'intérieur de CurrencyProvider.");
  }
  return context;
}