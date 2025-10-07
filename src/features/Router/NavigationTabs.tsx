import {
  ArrowRightLeft,
  Calculator,
  Menu,
  TrendingUp,
  X
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const tabs = [
  { id: "calculator", label: "Calculadora", icon: Calculator },
  { id: "rates", label: "Cotizaciones", icon: TrendingUp },
  // { id: "guide", label: "Guías de Cobro", icon: Wallet },
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
    <>
      <nav className="hidden md:block bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-x-8 flex">
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
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-4 block md:hidden">
          <NavMenuContent activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </nav>
    </>
  );
};

function NavMenuContent({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (tabId: string) => {
    setIsOpen(false);
    setActiveTab(tabId);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const navMenuContent = document.getElementById("nav-menu-content");
    if (navMenuContent && !navMenuContent.contains(e.currentTarget as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative group" id="nav-menu-content">
      <button
        className="flex items-center space-x-2 rounded-lg border border-gray-300 p-2"
        onClick={(e) => {
          e.stopPropagation;
          setIsOpen((v) => !v);
        }}
      >
        <div className="pointer-events-none">
          {!isOpen ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
        </div>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-[250px] bg-white shadow-lg rounded-lg p-4 z-10 shadow-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleClick(tab.id)}
              className={`tracking-wide block w-full text-lg text-left ${
                activeTab === tab.id
                  ? "text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
