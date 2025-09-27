import { SectionTitle } from "@/components/SectionTitle";
import { exchangeRatesAtom } from "@/store/data";
import { useAtomValue } from "jotai";
import { AlertTriangle } from "lucide-react";
import { useMonotributoCalculator } from "./MonotributoCalculator/useMonotributoCalculator";

export const MONOTRIBUTO_SCALES = [
  {
    categoryType: "A",
    limit: 8992597.87,
    tax: 37085.74,
    color: "bg-green-100 text-green-800",
  },
  {
    categoryType: "B",
    limit: 13175201.52,
    tax: 42216.41,
    color: "bg-green-100 text-green-800",
  },
  {
    categoryType: "C",
    limit: 18473166.15,
    tax: 49435.58,
    color: "bg-blue-100 text-blue-800",
  },
  {
    categoryType: "D",
    limit: 22934610.05,
    tax: 63357.8,
    color: "bg-blue-100 text-blue-800",
  },
  {
    categoryType: "E",
    limit: 26977793.6,
    tax: 89714.31,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    categoryType: "F",
    limit: 33809379.57,
    tax: 112906.59,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    categoryType: "G",
    limit: 40431835.35,
    tax: 172457.38,
    color: "bg-orange-100 text-orange-800",
  },
  {
    categoryType: "H",
    limit: 61344853.64,
    tax: 391400.62,
    color: "bg-orange-100 text-orange-800",
  },
  {
    categoryType: "I",
    limit: 68664410.05,
    tax: 721650.46,
    color: "bg-red-100 text-red-800",
  },
  {
    categoryType: "J",
    limit: 78632948.76,
    tax: 874069.29,
    color: "bg-red-100 text-red-800",
  },
  {
    categoryType: "K",
    limit: 94805682.9,
    tax: 1208690.86,
    color: "bg-red-100 text-red-800",
  },
];

export const ScaleCalculator = () => {
  const exchangeRates = useAtomValue(exchangeRatesAtom);
  const { recommendedScale, margin } = useMonotributoCalculator();

  // Formatters for numbers
  const formatCurrency = (amount: number, currency: "USD" | "ARS") => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateMaxUSDForScale = (limit: number, exchangeRate: number) => {
    return Math.floor(limit / (exchangeRate * 12));
  };

  const calculateMaxARSForScale = (scale: string) => {
    const scaleData = MONOTRIBUTO_SCALES.find((s) => s.categoryType === scale);
    if (!scaleData) return 0;
    return Math.floor(scaleData.limit / 12);
  };

  return (
    <div>
      <SectionTitle
        title="Escalas por facturacion"
        description="Costo mensual y facturaciones maximas mensuales en AR$ y USD"
      />
      <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
        <div
          className={
            "grid grid-cols-[repeat(auto-fill,_minmax(min(400px,_500px),_1fr))] gap-8"
          }
        >
          {MONOTRIBUTO_SCALES.map((scale) => {
            const maxUSDOfficial = calculateMaxUSDForScale(
              scale.limit,
              exchangeRates.oficial
            );
            const maxUSDBlue = calculateMaxUSDForScale(
              scale.limit,
              exchangeRates.blue
            );
            const maxUSDCripto = calculateMaxUSDForScale(
              scale.limit,
              exchangeRates.cripto
            );
            const maxARS = calculateMaxARSForScale(scale.categoryType);

            const isCurrentScale =
              scale.categoryType === recommendedScale.scale;

            return (
              <div
                key={scale.categoryType}
                className={`p-4 rounded-lg border-2 max-h-max ${
                  isCurrentScale ? "border-blue-500" : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${scale.color}`}
                    >
                      Escala {scale.categoryType}
                    </span>
                    {isCurrentScale && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Recomendada
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(scale.tax, "ARS")}/mes
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Facturación máxima en pesos */}
                  <div className="bg-gray-50 p-1 rounded-md">
                    <div className="text-sm text-gray-600 mb-1">En pesos:</div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(maxARS, "ARS")}
                    </div>
                  </div>
                  {/* Facturación máxima en USD */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="bg-green-50 p-1 rounded-md">
                      <div className="text-gray-600 mb-1">Oficial:</div>
                      <div className="font-semibold text-green-700">
                        {formatCurrency(maxUSDOfficial, "USD")}
                      </div>
                    </div>
                    <div className="bg-blue-50 p-1 rounded-md">
                      <div className="text-gray-600 mb-1">Blue:</div>
                      <div className="font-semibold text-blue-700">
                        {formatCurrency(maxUSDBlue, "USD")}
                      </div>
                    </div>
                    <div className="bg-purple-50 p-1 rounded-md">
                      <div className="text-gray-600 mb-1">Cripto:</div>
                      <div className="font-semibold text-purple-700">
                        {formatCurrency(maxUSDCripto, "USD")}
                      </div>
                    </div>
                  </div>
                </div>

                {isCurrentScale && margin < 0 && (
                  <div className="mt-3 flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-2 rounded-md">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Insuficiente para tu facturación recomendada</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
