import { FetchExchangeRates } from "@/hooks/useFetchExchangeRates";
import { exchangeRatesAtom, loadingAtom } from "@/store/data";
import { DolaresParaCalculo } from "@/types/data";
import { useAtomValue } from "jotai";
import {
  ArrowUpDown,
  Banknote,
  Bitcoin,
  DollarSign,
  RefreshCw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Fragment } from "react/jsx-runtime";

const rateCards = [
  {
    title: "Dólar Oficial (BNA)",
    subtitle: "Tipo de cambio comprador",
    type: "oficial",
    icon: Banknote,
    color: "bg-blue-500",
    description: "Usado para facturación tipo E al día anterior",
  },
  {
    title: "Dólar Blue",
    subtitle: "Mercado paralelo",
    type: "blue",
    icon: DollarSign,
    color: "bg-green-500",
    description: "Cotización del mercado informal",
  },
  {
    title: "Dólar Cripto",
    subtitle: "Stable coins",
    type: "cripto",
    icon: Bitcoin,
    color: "bg-orange-500",
    description: "USDT/USDC promedio en exchanges",
  },
  {
    title: "Dólar MEP",
    subtitle: "Mercado electrónico",
    type: "mep",
    icon: ArrowUpDown,
    color: "bg-purple-500",
    description: "AL30D - Para arbitraje legal",
  },
];
interface ExchangeRatesProps {
  onRefresh: FetchExchangeRates;
}

export const ExchangeRates = ({ onRefresh }: ExchangeRatesProps) => {
  const rates = useAtomValue(exchangeRatesAtom);
  const isLoading = useAtomValue(loadingAtom);

  console.log("rates", rates);
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
        <button
          onClick={() => onRefresh()}
          disabled={isLoading}
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          <span>Actualizar</span>
        </button>
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
                  <p className="text-sm text-gray-500">{card.subtitle}</p>
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

      {/* Gap Analysis */}
      {/* TODO llevar esto a un componente y hacer calculos mejores */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Análisis de Brechas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">
                Blue vs Oficial
              </span>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">
              +{isLoading ? "..." : calculateGap(rates.blue, rates.oficial)}%
            </span>
            <p className="text-xs text-blue-700 mt-1">Brecha cambiaria</p>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-orange-900">
                Cripto vs Blue
              </span>
              <TrendingDown className="h-4 w-4 text-orange-600" />
            </div>
            {/* TODO: Manejar los colores de acuerdo al gap */}
            <span className="text-2xl font-bold text-orange-600">
              {isLoading ? "..." : calculateGap(rates.cripto, rates.blue)}%
            </span>
            <p className="text-xs text-orange-700 mt-1">Diferencial cripto</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-900">
                MEP vs Blue
              </span>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">
              {isLoading ? "..." : calculateGap(rates.mep, rates.blue)}%
            </span>
            <p className="text-xs text-purple-700 mt-1">
              {/* TODO: Verificar si eliminamos esto, hay una nueva normativa que no permite comprar por 90 dias si es que se adquirio dolar oficial */}
              Oportunidad arbitraje
            </p>
          </div>
        </div>
      </div>

      {/* No tiene sentido esta seccion, yo no tengo este conocimiento, pero la card se ve buena */}
      {/* <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💡 Tips de Arbitraje
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">MEP Inverso</h4>
            <p className="text-sm text-gray-600">
              Si el MEP está por debajo del blue, podes comprar AL30D en pesos y
              vender en USD para obtener dólares legales.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Timing de Facturación
            </h4>
            <p className="text-sm text-gray-600">
              Monitoreá el tipo de cambio BNA para facturar en momentos
              favorables, recordá que se toma el del día anterior.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};
