import { ArrowRightLeft, Calculator, TrendingUp, Wallet } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const tabs = [
  { id: "calculator", label: "Calculadora", icon: Calculator },
  { id: "rates", label: "Cotizaciones", icon: TrendingUp },
  { id: "guide", label: "Guías de Cobro", icon: Wallet },
  { id: "scales", label: "Escalas", icon: ArrowRightLeft },
];

export const NavigationTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  return (
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
                {/* <span className="hidden  sm:block">{tab.label}</span> */}
                <span className="ellipsis">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
