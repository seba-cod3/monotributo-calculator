import { billedLastSemesterAtom } from "@/store/data";
import { useAtom } from "jotai";
import { DollarSign } from "lucide-react";

export const BilledPastSemester = () => {
  const JuneOrDecember = new Date().getMonth() >= 5 ? "Junio" : "Diciembre";
  const [billedLastSemester, setBilledLastSemester] = useAtom(billedLastSemesterAtom);

  return (
    <div>
      <label
        htmlFor="monthlyIncome"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
         Facturacion (AR$) desde {JuneOrDecember} a la fecha
      </label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="number"
          id="billedLastSemester"
                  value={billedLastSemester}
                  onChange={(e) => setBilledLastSemester(Number(e.target.value))}

          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="6.820.000"
        />
      </div>
      <p className="text-sm text-gray-500 mt-1">
        {/* Ingresa tu facturación promedio mensual en {selectedCurrency} */}
        Ingresa tu facturación promedio mensual
      </p>
    </div>
  );
};
