import { InputMoneyFormat } from "@/components/InputMoneyFormat";
import {
  exchangeRatesAtom,
  exchangeTypeAtom,
  isCurrencyUSDAtom,
  monthlyIncomeAtom,
} from "@/store/data";
import { useAtom, useAtomValue } from "jotai";

export const MonthlyInput = () => {
  const [monthlyIncome, setMonthlyIncome] = useAtom(monthlyIncomeAtom);
  const isCurrencyUSD = useAtomValue(isCurrencyUSDAtom);
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-2">
      <InputMoneyFormat
        label="Cuanto facturas mensualmente?"
        description="Ingresa tu facturación promedio mensual"
        value={monthlyIncome}
        onChange={setMonthlyIncome}
        id="monthlyIncome"
        placeholder="527.000"
        />
      {isCurrencyUSD && <ShowValueInARS monthlyIncome={monthlyIncome} />}
    </div>
  );
};

function ShowValueInARS({ monthlyIncome }: { monthlyIncome: number }) {
  const exchangeType = useAtomValue(exchangeTypeAtom);
  const exchangeRates = useAtomValue(exchangeRatesAtom);
  const rate = Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(exchangeRates[exchangeType] * monthlyIncome);
  return (
    <p className="text-right text-sm text-green-700 font-[200] w-content">
      <span className="font-[100] text-gray-500">en AR$</span>
      <br /> {rate}
    </p>
  );
}
