import { useState } from "react";
import { NavigationTabs } from "./NavigationTabs";
import {
  ExchangeRates,
  MonotributoCalculator,
  PaymentMethodGuide,
  ScaleCalculator,
} from "./Tabs";

export const Router = ({
  fetchExchangeRates,
}: {
  fetchExchangeRates: () => void;
}) => {
  const [activeTab, setActiveTab] = useState("calculator");

  return (
    <>
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "calculator" && <MonotributoCalculator />}
        {activeTab === "rates" && (
          <ExchangeRates onRefresh={fetchExchangeRates} />
        )}
        {activeTab === "guide" && <PaymentMethodGuide />}
        {activeTab === "scales" && <ScaleCalculator />}
      </main>
    </>
  );
};
