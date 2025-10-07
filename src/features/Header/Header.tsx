import { Calculator } from "lucide-react";

export const Header = () => {
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
                Calculadora para exportadores de servicios digitales
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
