import { exchangeRatesAtom, loadingAtom } from "@/store/data";
import { DolaresParaCalculo } from "@/types/data";
import { useAtomValue } from "jotai";
import {
  ArrowUpDown,
  Banknote,
  Bitcoin,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Fragment } from "react/jsx-runtime";

const rateCards = [
  {
    title: "Dólar Oficial",
    type: "oficial",
    icon: Banknote,
    color: "bg-blue-500",
    description: "Usado para facturación tipo E al día anterior",
  },
  {
    title: "Dólar Blue",
    type: "blue",
    icon: DollarSign,
    color: "bg-green-500",
    description: "Cotización del mercado informal",
  },
  {
    title: "Dólar Cripto",
    type: "cripto",
    icon: Bitcoin,
    color: "bg-orange-500",
    description: "USDT/USDC promedio en exchanges",
  },
  {
    title: "Dólar MEP",
    type: "mep",
    icon: ArrowUpDown,
    color: "bg-purple-500",
    description: "Dolar bolsa",
  },
];

export const ExchangeRates = () => {
  const rates = useAtomValue(exchangeRatesAtom);
  const isLoading = useAtomValue(loadingAtom);

  const calculateGap = (rate1: number, rate2: number) => {
    return (((rate1 - rate2) / rate2) * 100).toFixed(1);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Cotizaciones del Dólar
          </h2>
          <p className="text-gray-600 mt-1">
            Actualizaciones en tiempo real para tu planificación fiscal
          </p>
        </div>
      </div>

      {/* Exchange Rate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rateCards.map((card, index) => {
          const Icon = card.icon;
          const rateValue =
            card.type === "mep"
              ? rates.mep
              : rates?.[card.type as keyof DolaresParaCalculo];
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1 text-green-500">
                    {card.type !== "oficial" && (
                      <Fragment>
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-xs font-medium">
                          {calculateGap(rateValue, rates.oficial)}%
                        </span>
                      </Fragment>
                    )}
                  </div>
                </div>

                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900">{card.title}</h3>
                </div>

                <div className="mb-3">
                  <span className="text-2xl font-bold text-gray-900">
                    {isLoading ? "..." : `$${rateValue?.toLocaleString()}`}
                  </span>
                </div>

                <p className="text-xs text-gray-500">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
