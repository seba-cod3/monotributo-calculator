import { exchangeRatesAtom, loadingAtom } from "@/store/data";
import { useAtomValue } from "jotai";
import { Calculator, RefreshCw } from "lucide-react";

export const Header = ({
  fetchExchangeRates,
}: {
  fetchExchangeRates: () => void;
}) => {
  const exchangeRates = useAtomValue(exchangeRatesAtom);
  const isLoading = useAtomValue(loadingAtom);
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                MonotributoTech
              </h1>
              <p className="text-sm text-gray-500">
                Calculadora para exportadores de servicios
              </p>
            </div>
          </div>
          {/* Quick Exchange Rate Display */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">USD Blue:</span>
              <span className="font-semibold text-blue-600">
                {isLoading ? "..." : `$${exchangeRates.blue.toLocaleString()}`}
              </span>
            </div>
            <button
              onClick={fetchExchangeRates}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 text-gray-500 ${
                  isLoading ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
