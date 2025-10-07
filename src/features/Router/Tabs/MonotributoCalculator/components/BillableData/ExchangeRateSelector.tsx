import {
  exchangeRatesAtom,
  exchangeTypeAtom,
  isCurrencyUSDAtom,
} from "@/store/data";
import { useAtom, useAtomValue } from "jotai";
import { usePostHog } from "posthog-js/react";

const BLUE_DOLLAR = {
  label: "Dólar Blue",
  desc: "Referencia mercado",
};

export const ExchangeRateSelector = () => {
  const isCurrencyUSD = useAtomValue(isCurrencyUSDAtom);
  const exchangeRates = useAtomValue(exchangeRatesAtom);
  const [exchangeType, setExchangeType] = useAtom(exchangeTypeAtom);
  const posthog = usePostHog();

  if (!isCurrencyUSD) return null;
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Selecciona un tipo de cambio
      </h3>
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          {
            key: "oficial",
            label: "Dolar Oficial",
          },
          {
            key: "cripto",
            label: "Dólar Cripto",
          },
        ].map((option) => {
          const rate = exchangeRates[option.key as keyof typeof exchangeRates];
          return (
            <button
              key={option.key}
              disabled={option.key === "blue"}
              onClick={() => {
                setExchangeType(option.key as any)
                posthog.capture("tipoDeCambioSeleccionado", {
                  tipoDeCambio: option.key,
                })
              }}
              className={`flex flex-col justify-around p-3 rounded-lg border text-left transition-colors ${
                exchangeType === option.key
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="font-medium text-sm">{option.label}</div>
              <div className="text-sm font-semibold mt-2">
                ${rate?.toLocaleString() || "..."}
              </div>
            </button>
          );
        })}
        <div className="p-3 rounded-lg border text-left transition-colors border-gray-100 disabled text-gray-500">
          <div className="font-medium text-sm">{BLUE_DOLLAR.label}</div>
          <div className="text-xs text-gray-500 mt-1">{BLUE_DOLLAR.desc}</div>
          <div className="text-sm font-semibold mt-2">
            ${exchangeRates["blue"]?.toLocaleString() || "..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export function OpcionesDeFacturacionDoc() {
  return (
    <div className="border border-gray-300 p-2 rounded-lg mt-4">
      <label className="block text-sm font-medium text-gray-500 mb-2">
        Opciones de facturación
      </label>
      <div>
        <p>
          Facturacion dolar Oficial {" > "} dinero a una cuenta bancaria en USD
        </p>
        <p>
          Facturacion dolar Cripto {" > "} AR$ en cuenta (bancaria o digital)
        </p>
      </div>
    </div>
  );
}
