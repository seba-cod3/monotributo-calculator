import {
  exchangeRatesAtom,
  exchangeTypeAtom,
  isCurrencyUSDAtom,
} from "@/store/data";
import { useAtom, useAtomValue } from "jotai";

export const ExchangeRateSelector = () => {
  const isCurrencyUSD = useAtomValue(isCurrencyUSDAtom);
  const exchangeRates = useAtomValue(exchangeRatesAtom);
  const [exchangeType, setExchangeType] = useAtom(exchangeTypeAtom);
  if (!isCurrencyUSD) return null;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tipo de cambio para el cálculo
      </label>
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            key: "oficial",
            label: "BNA Oficial",
            desc: "Facturación tipo E",
          },
          {
            key: "blue",
            label: "Dólar Blue",
            desc: "Referencia mercado",
          },
          {
            key: "cripto",
            label: "Dólar Cripto",
            desc: "Stablecoins",
          },
        ].map((option) => {
          if (option.key === "oficial") {
          }
          const rate = exchangeRates[option.key as keyof typeof exchangeRates];
          return (
            <button
              key={option.key}
              onClick={() => setExchangeType(option.key as any)}
              className={`p-3 rounded-lg border text-left transition-colors ${
                exchangeType === option.key
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="font-medium text-sm">{option.label}</div>
              <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
              <div className="text-sm font-semibold mt-2">
                ${rate?.toLocaleString() || "..."}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
