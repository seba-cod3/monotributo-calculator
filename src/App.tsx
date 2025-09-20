import {
  ArrowRightLeft,
  Calculator,
  Info,
  RefreshCw,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import ExchangeRates from "./features/ExchangeRates";
import MonotributoCalculator from "./features/MonotributoCalculator/MonotributoCalculator";
import PaymentMethodGuide from "./features/PaymentMethodGuide";
import ScaleCalculator from "./features/ScaleCalculator";
import { GetDolars } from "./lib/getDolars";

function App() {
  const [activeTab, setActiveTab] = useState("calculator");
  const [exchangeRates, setExchangeRates] = useState({
    oficial: 0,
    blue: 0,
    cripto: 0,
    mep: 0,
    loading: true,
  });

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    setExchangeRates((prev) => ({ ...prev, loading: true }));
    try {
      const response = await GetDolars();

      const exchanges = {
        oficial:
          response.find((exchange) => exchange.casa === "oficial")?.compra ?? 0,
        blue:
          response.find((exchange) => exchange.casa === "blue")?.compra ?? 0,
        cripto:
          response.find((exchange) => exchange.casa === "cripto")?.compra ?? 0,
        mep:
          response.find((exchange) => exchange.casa === "bolsa")?.compra ?? 0,
        loading: false,
      };

      setExchangeRates(exchanges);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      setExchangeRates((prev) => ({ ...prev, loading: false }));
    }
  };

  const tabs = [
    { id: "calculator", label: "Calculadora", icon: Calculator },
    { id: "rates", label: "Cotizaciones", icon: TrendingUp },
    { id: "guide", label: "Guías de Cobro", icon: Wallet },
    { id: "scales", label: "Escalas", icon: ArrowRightLeft },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
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
                  {exchangeRates.loading
                    ? "..."
                    : `$${exchangeRates.blue.toLocaleString()}`}
                </span>
              </div>
              <button
                onClick={fetchExchangeRates}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                disabled={exchangeRates.loading}
              >
                <RefreshCw
                  className={`h-4 w-4 text-gray-500 ${
                    exchangeRates.loading ? "animate-spin" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "calculator" && (
          <MonotributoCalculator exchangeRates={exchangeRates} />
        )}

        {activeTab === "rates" && (
          <ExchangeRates rates={exchangeRates} onRefresh={fetchExchangeRates} />
        )}

        {activeTab === "guide" && (
          <PaymentMethodGuide exchangeRates={exchangeRates} />
        )}

        {activeTab === "scales" && (
          <ScaleCalculator exchangeRates={exchangeRates} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Info className="h-4 w-4" />
              <span>
                Esta herramienta es solo informativa. Consulta con un contador.
              </span>
            </div>
            <p className="text-sm text-gray-400">
              © 2025 MonotributoTech - Desarrollado para la comunidad tech
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
