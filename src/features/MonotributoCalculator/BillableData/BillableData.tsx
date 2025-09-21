import { MONOTRIBUTO_SCALES } from "lib/monotributoScales";
import { CurrencySelector } from "./CurrencySelector";
import { ExchangeRateSelector } from "./ExchangeRateSelector";
import { MonthlyInput } from "./MonthlyInput";

const BillableData = ({
  monthlyIncome,
  setMonthlyIncome,
  setExchangeType,
  exchangeType,
  exchangeRates,
  currentScale,
  setCurrentScale,
  selectedCurrency,
  setSelectedCurrency,
}: any) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Datos de Facturación
      </h3>

      <div className="space-y-6">
        <CurrencySelector
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
        />
        {/* Monthly USD Input */}
        <MonthlyInput
          monthlyIncome={monthlyIncome}
          setMonthlyIncome={setMonthlyIncome}
        />

        {/* Exchange Rate Selection */}
        {selectedCurrency === "usd" && (
          <ExchangeRateSelector
            setExchangeType={setExchangeType}
            exchangeType={exchangeType}
            exchangeRates={exchangeRates}
          />
        )}

        {/* Current Scale Input */}
        <div>
          <label
            htmlFor="currentScale"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Escala actual (opcional)
          </label>
          <select
            id="currentScale"
            value={currentScale}
            onChange={(e) => setCurrentScale(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Seleccionar escala actual</option>
            {MONOTRIBUTO_SCALES.map((scale) => (
              <option key={scale.scale} value={scale.scale}>
                Escala {scale.scale} - ${scale.tax.toLocaleString()}/mes
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BillableData;
