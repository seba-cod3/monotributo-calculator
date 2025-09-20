import { Dispatch, SetStateAction } from "react";

export const ExchangeRateSelector = ({
  setExchangeType,
  exchangeType,
  exchangeRates,
}: {
  setExchangeType: Dispatch<SetStateAction<"oficial" | "blue" | "cripto">>;
  exchangeType: string;
  exchangeRates: any;
}) => {
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
        ].map((option) => (
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
              $
              {exchangeRates[
                option.key as keyof typeof exchangeRates
              ]?.toLocaleString() || "..."}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
