import { DollarSign } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export const MonthlyInput = ({
  monthlyIncome,
  setMonthlyIncome,
}: {
  monthlyIncome: string;
  setMonthlyIncome: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div>
      <label
        htmlFor="monthlyIncome"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Cuanto facturas mensualmente?
      </label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="number"
          id="monthlyIncome"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Ej: 2000"
        />
      </div>
      <p className="text-sm text-gray-500 mt-1">
        {/* Ingresa tu facturación promedio mensual en {selectedCurrency} */}
        Ingresa tu facturación promedio mensual
      </p>
    </div>
  );
};
