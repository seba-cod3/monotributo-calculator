import { exchangeRatesAtom } from "@/store/data";
import { useAtomValue } from "jotai";
import {
  AlertTriangle,
  BarChart3,
  Calculator,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { CurrencySelector } from "./MonotributoCalculator/components/BillableData/CurrencySelector";

export const ScaleCalculator = () => {
  const exchangeRates = useAtomValue(exchangeRatesAtom);

  const [targetUSD, setTargetUSD] = useState<string>("0");
  const [billedLastSemester, setBilledLastSemester] = useState<string>("0");
  const [currentScale, setCurrentScale] = useState<string>("C");
  const [projectionMonths, setProjectionMonths] = useState<string>("12");

  const MONOTRIBUTO_SCALES = [
    {
      scale: "A",
      limit: 8992597.87,
      tax: 37085.74,
      color: "bg-green-100 text-green-800",
    },
    {
      scale: "B",
      limit: 13175201.52,
      tax: 42216.41,
      color: "bg-green-100 text-green-800",
    },
    {
      scale: "C",
      limit: 18473166.15,
      tax: 49435.58,
      color: "bg-blue-100 text-blue-800",
    },
    {
      scale: "D",
      limit: 22934610.05,
      tax: 63357.8,
      color: "bg-blue-100 text-blue-800",
    },
    {
      scale: "E",
      limit: 26977793.6,
      tax: 89714.31,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      scale: "F",
      limit: 33809379.57,
      tax: 112906.59,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      scale: "G",
      limit: 40431835.35,
      tax: 172457.38,
      color: "bg-orange-100 text-orange-800",
    },
    {
      scale: "H",
      limit: 61344853.64,
      tax: 391400.62,
      color: "bg-orange-100 text-orange-800",
    },
    {
      scale: "I",
      limit: 68664410.05,
      tax: 721650.46,
      color: "bg-red-100 text-red-800",
    },
    {
      scale: "J",
      limit: 78632948.76,
      tax: 874069.29,
      color: "bg-red-100 text-red-800",
    },
    {
      scale: "K",
      limit: 94805682.9,
      tax: 1208690.86,
      color: "bg-red-100 text-red-800",
    },
  ];

  const calculateMaxUSDForScale = (scale: string, exchangeRate: number) => {
    const scaleData = MONOTRIBUTO_SCALES.find((s) => s.scale === scale);
    if (!scaleData) return 0;
    return Math.floor(scaleData.limit / (exchangeRate * 12));
  };

  const calculateRequiredScale = (monthlyUSD: number, exchangeRate: number) => {
    const annualPesos = monthlyUSD * exchangeRate * 12;
    return (
      MONOTRIBUTO_SCALES.find((scale) => annualPesos <= scale.limit) ||
      MONOTRIBUTO_SCALES[MONOTRIBUTO_SCALES.length - 1]
    );
  };

  const generateProjection = () => {
    const monthlyUSD = parseFloat(targetUSD) || 0;
    const months = parseInt(projectionMonths) || 12;
    const projection = [];

    for (let i = 1; i <= months; i++) {
      const monthlyAmount = monthlyUSD;
      const cumulativeUSD = monthlyAmount * i;
      const cumulativePesos = cumulativeUSD * exchangeRates.oficial;
      const requiredScale = MONOTRIBUTO_SCALES.find(
        (scale) => cumulativePesos <= scale.limit
      );

      projection.push({
        month: i,
        monthlyUSD: monthlyAmount,
        cumulativeUSD,
        cumulativePesos,
        requiredScale:
          requiredScale || MONOTRIBUTO_SCALES[MONOTRIBUTO_SCALES.length - 1],
        exceeded: !requiredScale,
      });
    }

    return projection;
  };

  const projection = generateProjection();
  const monthlyUSD = parseFloat(targetUSD) || 0;

  const JuneOrDecember = new Date().getMonth() >= 5 ? "Junio" : "Diciembre";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Planificador de Escalas
        </h2>
        <p className="text-gray-600 mt-1">
          Proyecta tu crecimiento y planifica cambios de escala
        </p>
      </div>

      {/* Configuration Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Configuración de Proyección
            </h3>
            <CurrencySelector />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="billedLastSemester"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Facturacion (AR$) desde {JuneOrDecember} a la fecha
                </label>
                <input
                  type="number"
                  id="billedLastSemester"
                  value={billedLastSemester}
                  onChange={(e) => setBilledLastSemester(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="3000"
                />
              </div>
              <div>
                <label
                  htmlFor="targetUSD"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Objetivo mensual USD
                </label>
                <input
                  type="number"
                  id="targetUSD"
                  value={targetUSD}
                  onChange={(e) => setTargetUSD(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="3000"
                />
              </div>

              <div>
                <label
                  htmlFor="currentScale"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Escala actual
                </label>
                <select
                  id="currentScale"
                  value={currentScale}
                  onChange={(e) => setCurrentScale(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {MONOTRIBUTO_SCALES.map((scale) => (
                    <option key={scale.scale} value={scale.scale}>
                      Escala {scale.scale}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="projectionMonths"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Proyección (meses)
                </label>
                <input
                  type="number"
                  id="projectionMonths"
                  value={projectionMonths}
                  onChange={(e) => setProjectionMonths(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="1"
                  max="24"
                />
              </div>
            </div>
          </div>

          {/* Scale Capacity Analysis */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Capacidad por Escala
            </h3>

            <div className="space-y-4">
              {MONOTRIBUTO_SCALES.map((scale) => {
                const maxUSDOfficial = calculateMaxUSDForScale(
                  scale.scale,
                  exchangeRates.oficial
                );
                const maxUSDCripto = calculateMaxUSDForScale(
                  scale.scale,
                  exchangeRates.cripto
                );
                const isCurrentScale = scale.scale === currentScale;
                const canFitTarget = monthlyUSD <= maxUSDOfficial;

                return (
                  <div
                    key={scale.scale}
                    className={`p-4 rounded-lg border-2 ${
                      isCurrentScale
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${scale.color}`}
                        >
                          Escala {scale.scale}
                        </span>
                        {isCurrentScale && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Actual
                          </span>
                        )}
                        {canFitTarget && !isCurrentScale && monthlyUSD > 0 && (
                          <Target className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${scale.tax.toLocaleString()}/mes
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">
                          Máximo USD (oficial):
                        </span>
                        <span className="font-semibold ml-2">
                          ${maxUSDOfficial.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          Máximo USD (cripto):
                        </span>
                        <span className="font-semibold ml-2">
                          ${maxUSDCripto.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {!canFitTarget && monthlyUSD > 0 && (
                      <div className="mt-2 flex items-center space-x-2 text-red-600 text-sm">
                        <AlertTriangle className="h-4 w-4" />
                        <span>
                          Insuficiente para tu objetivo de $
                          {monthlyUSD.toLocaleString()}/mes
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Análisis Rápido
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-900">
                    Escala Requerida
                  </span>
                  <Calculator className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {
                    calculateRequiredScale(monthlyUSD, exchangeRates.oficial)
                      .scale
                  }
                </div>
                <p className="text-xs text-green-700 mt-1">
                  Para ${monthlyUSD.toLocaleString()}/mes
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">
                    Impuesto Anual
                  </span>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  $
                  {(
                    calculateRequiredScale(monthlyUSD, exchangeRates.oficial)
                      .tax * 12
                  ).toLocaleString()}
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  {(
                    ((calculateRequiredScale(monthlyUSD, exchangeRates.oficial)
                      .tax *
                      12) /
                      (monthlyUSD * exchangeRates.oficial * 12)) *
                    100
                  ).toFixed(1)}
                  % de facturación
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-900">
                    Margen Disponible
                  </span>
                  <BarChart3 className="h-4 w-4 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  $
                  {(
                    calculateRequiredScale(monthlyUSD, exchangeRates.oficial)
                      .limit -
                    monthlyUSD * exchangeRates.oficial * 12
                  ).toLocaleString()}
                </div>
                <p className="text-xs text-orange-700 mt-1">
                  Espacio antes del límite
                </p>
              </div>
            </div>
          </div>

          {/* Growth Warning */}
          {projection.some((p) => p.exceeded) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Atención</span>
              </div>
              <p className="text-sm text-yellow-700">
                Con tu objetivo actual, excederás el límite del monotributo en
                el mes {projection.find((p) => p.exceeded)?.month}. Considera
                ajustar tu estrategia o prepararte para el régimen general.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Projection Timeline */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Proyección de Crecimiento
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Evolución proyectada de tu facturación y escalas requeridas
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  USD Mensual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  USD Acumulado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pesos Acumulados
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Escala Requerida
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projection.map((month) => (
                <tr
                  key={month.month}
                  className={month.exceeded ? "bg-red-50" : "hover:bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {month.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${month.monthlyUSD.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${month.cumulativeUSD.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${month.cumulativePesos.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${month.requiredScale.color}`}
                    >
                      {month.requiredScale.scale}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {month.exceeded ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Excede límite
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Dentro del límite
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
