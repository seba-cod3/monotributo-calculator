import { Info } from "lucide-react";

export const Footer = () => {
  return (
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
  );
};
