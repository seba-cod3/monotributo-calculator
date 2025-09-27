import { FetchExchangeRates } from "@/hooks/useFetchExchangeRates";
import { activeTabAtom } from "@/store/data";
import { useAtom } from "jotai";
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
  fetchExchangeRates: FetchExchangeRates;
}) => {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  return (
    <>
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto h-[calc(100vh-160px)]">
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
