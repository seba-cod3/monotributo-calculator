import { useEffect, useRef, useState } from "react";

export const NumberInputFormat = ({
  numericValue,
  onChange,
  id,
  placeholder = "6.820.000",
}: {
  numericValue: number;
  onChange: (value: number) => void;
  id: string;
  placeholder?: string;
}) => {
  const [displayValue, setDisplayValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const formatNumber = (value: number): string => {
    return Intl.NumberFormat("es-AR").format(value);
  };

  useEffect(() => {
    if (numericValue === 0) {
      setDisplayValue("");
    } else {
      setDisplayValue(formatNumber(numericValue));
    }
  }, [numericValue]);

  const parseInputValue = (inputValue: string): number => {
    const cleanValue = inputValue.replace(/[^\d]/g, "");

    const numericValue = parseInt(cleanValue) || 0;

    return numericValue;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cursorPosition = e.target.selectionStart || 0;

    // Extraer el valor numérico
    const numericValue = parseInputValue(inputValue);

    // Actualizar el estado con el valor numérico
    onChange(numericValue);

    // Formatear el valor para mostrar
    const formattedValue = numericValue === 0 ? "" : formatNumber(numericValue);
    setDisplayValue(formattedValue);

    // Restaurar la posición del cursor después del formateo
    setTimeout(() => {
      if (inputRef.current) {
        const newLength = formattedValue.length;
        const oldLength = inputValue.length;
        const lengthDiff = newLength - oldLength;
        const newCursorPosition = Math.max(0, cursorPosition + lengthDiff);
        inputRef.current.setSelectionRange(
          newCursorPosition,
          newCursorPosition
        );
      }
    }, 0);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        id={id}
        value={displayValue}
        onChange={handleInputChange}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder={placeholder}
        inputMode="numeric"
      />
    </div>
  );
};
