export const CurrencySelector = ({
  selectedCurrency,
  setSelectedCurrency,
}: any) => {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Facturas en dolares o pesos?
      </h3>
      <div className="grid grid-cols-2 gap-4 w-full">
        <CurrencyOption
          label="USD"
          value="usd"
          selected={selectedCurrency === "usd"}
          setSelectedCurrency={setSelectedCurrency}
        />
        <CurrencyOption
          label="ARS"
          value="ars"
          selected={selectedCurrency === "ars"}
          setSelectedCurrency={setSelectedCurrency}
        />
      </div>
    </div>
  );
};

function CurrencyOption({
  label,
  value,
  selected,
  setSelectedCurrency,
}: {
  label: string;
  value: string;
  selected: boolean;
  setSelectedCurrency: (value: string) => void;
}) {
  return (
    <button
      onClick={() => setSelectedCurrency(value)}
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
