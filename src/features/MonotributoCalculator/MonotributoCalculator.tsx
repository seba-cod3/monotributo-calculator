import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";

import { getPercentageColor } from "lib/getPercentageColor";
import { MONOTRIBUTO_SCALES } from "lib/monotributoScales";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { currentScaleAtom, exchangeRatesAtom } from "store/data";
import BillableData from "./BillableData";
import { MonotributoScalesTable } from "./MonotributoScalesTable";

export const MonotributoCalculator = () => {
  const exchangeRates = useAtomValue(exchangeRatesAtom);
  const [monthlyIncome, setMonthlyIncome] = useState<string>("2000");
  const [exchangeType, setExchangeType] = useState<
    "oficial" | "blue" | "cripto"
  >("oficial");
  const [currentScale, setCurrentScale] = useAtom(currentScaleAtom);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("usd");

  const calculateAnnualARS = () => {
    const monthlyValue = parseFloat(monthlyIncome) || 0;
    if (selectedCurrency === "usd") {
      const rate = exchangeRates[exchangeType] || 1;
      return monthlyValue * rate * 12;
    } else {
      return monthlyValue * 12;
    }
  };

  const getRecommendedScale = () => {
    const annualARS = calculateAnnualARS();
    return (
      MONOTRIBUTO_SCALES.find((scale) => annualARS <= scale.limit) ||
      MONOTRIBUTO_SCALES[MONOTRIBUTO_SCALES.length - 1]
    );
  };

  const calculateMargin = () => {
    const annualARS = calculateAnnualARS();
    const recommendedScale = getRecommendedScale();
    const margin = recommendedScale.limit - annualARS;
    const marginPercentage = (margin / recommendedScale.limit) * 100;
    return { margin, marginPercentage };
  };

  const recommendedScale = getRecommendedScale();
  const { margin, marginPercentage } = calculateMargin();
  const annualARS = calculateAnnualARS();
  const monthlyTax = recommendedScale.tax;
  const annualTax = monthlyTax * 12;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Calculadora de Monotributo
        </h2>
        <p className="text-gray-600 mt-1">
          Obtene tu escala en base a tus ingresos
        </p>
      </div>

      {/* Calculator Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BillableData
            monthlyIncome={monthlyIncome}
            setMonthlyIncome={setMonthlyIncome}
            setExchangeType={setExchangeType}
            exchangeType={exchangeType}
            exchangeRates={exchangeRates}
            currentScale={currentScale}
            setCurrentScale={setCurrentScale}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />
        </div>

        {/* Results Panel */}
        <div className="flex flex-col justify-between gap-8">
          {/* Recommended Scale */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-500 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Escala Recomendada
              </h3>
            </div>

            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                {margin < 0 ? (
                  <>
                    <div className="text-xl font-bold text-red-600">
                      Responsable inscripto
                    </div>
                    <p className="text-sm text-red-700">
                      El monto supera el limite del monotributo
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-green-600">
                      {recommendedScale.scale}
                    </div>
                    <p className="text-sm text-green-700">Escala sugerida</p>
                  </>
                )}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Facturación anual:</span>
                  <span className="font-semibold">
                    ${annualARS.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Límite escala:</span>
                  <span className="font-semibold">
                    ${recommendedScale.limit.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Margen disponible:</span>
                  <div
                    className={`font-semibold w-full align-right grid justify-end ${getPercentageColor(
                      margin
                    )}`}
                  >
                    <span className="text-right">
                      ${margin.toLocaleString()}
                    </span>
                    <span className="text-right">
                      ({marginPercentage.toFixed(1)}
                      %)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Information */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Información Impositiva
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  ${monthlyTax.toLocaleString()}
                </div>
                <p className="text-sm text-blue-700">Impuesto mensual</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Anual:</span>
                  <span className="font-semibold">
                    ${annualTax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">% sobre facturación:</span>
                  <span className="font-semibold">
                    {((annualTax / annualARS) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {marginPercentage < 10 &&
            (margin > 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Atención</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Estás cerca del límite de tu escala (
                  {marginPercentage.toFixed(1)}% restante). Considera planificar
                  para el siguiente nivel.
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Alerta</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Exclusión del monotributo. Considera otras opciones como
                  Responsable Inscripto, SRL, SAS.
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Scales Table */}
      <MonotributoScalesTable recommendedScale={recommendedScale} />
    </div>
  );
};
