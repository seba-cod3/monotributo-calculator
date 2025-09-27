import { CategoriaMonotributo } from "@/types/data";
import { useAtom, useAtomValue } from "jotai";
import { MONOTRIBUTO_SCALES } from "lib/monotributoScales";
import { currentScaleAtom, hasTaxInscriptionAtom } from "store/data";
import { BilledPastSemester } from "./BilledPastSemester";
import { CurrencySelector } from "./CurrencySelector";
import { ExchangeRateSelector } from "./ExchangeRateSelector";
import { MonthlyInput } from "./MonthlyInput";

const BillableData = ({
  monthlyIncome,
  setMonthlyIncome,
  setExchangeType,
  exchangeType,
}: any) => {
  const [currentScale, setCurrentScale] = useAtom(currentScaleAtom);
  const alreadyHasTaxInscription = useAtomValue(hasTaxInscriptionAtom);
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Datos de Facturación
      </h3>

      <div className="space-y-6">
        <CurrencySelector />
        {alreadyHasTaxInscription && <BilledPastSemester />}
        <MonthlyInput
          monthlyIncome={monthlyIncome}
          setMonthlyIncome={setMonthlyIncome}
        />

        <ExchangeRateSelector
          setExchangeType={setExchangeType}
          exchangeType={exchangeType}
        />

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
            onChange={(e) =>
              setCurrentScale(e.target.value as CategoriaMonotributo)
            }
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
