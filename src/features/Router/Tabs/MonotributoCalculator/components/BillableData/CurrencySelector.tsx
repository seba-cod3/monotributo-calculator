import { isCurrencyUSDAtom } from "@/store/data";
import { useAtom } from "jotai";
import { usePostHog } from "posthog-js/react";

export const CurrencySelector = () => {
  const [isCurrencyUSD, toggleUSDCurrency] = useAtom(isCurrencyUSDAtom);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 w-full">
        <CurrencyOption
          label="USD"
          selected={isCurrencyUSD}
          toggleUSDCurrency={toggleUSDCurrency}
        />
        <CurrencyOption
          label="ARS"
          selected={!isCurrencyUSD}
          toggleUSDCurrency={toggleUSDCurrency}
        />
      </div>
    </div>
  );
};

function CurrencyOption({
  label,
  selected,
  toggleUSDCurrency,
}: {
  label: string;
  selected: boolean;
  toggleUSDCurrency: () => void;
}) {
  const posthog = usePostHog();

  const handleClick = () => {
    if (selected) return;
    toggleUSDCurrency()
    posthog.capture("monedaSeleccionada", {
      moneda: label,
    });
  }
  return (
    <button
      onClick={handleClick}
      className={`
      border border-gray-300 rounded-md p-2 transition-colors min-w-24 ${
        selected
          ? "border-green-500 bg-green-50 text-green-700 cursor-default"
          : "hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}
