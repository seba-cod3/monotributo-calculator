import { DollarSign } from "lucide-react";
import { NumberInputFormat } from "./NumberInputFormat";

type InputLabelNumberProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  id: string;
  placeholder?: string;
  description?: string;
  hasError?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
};

export const InputMoneyFormat = ({
  label,
  value,
  onChange,
  id,
  placeholder,
  description,
  hasError,
  errorMessage,
  isRequired,
}: InputLabelNumberProps) => {
  return (
    <div>
      <label
        htmlFor="billedLastSemester"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {isRequired && <span className="text-red-500 font-[100]">*</span>}
      </label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-3 h-6 w-5 text-gray-400" />
        <NumberInputFormat
          numericValue={value}
          onChange={onChange}
          id={id}
          placeholder={placeholder}
        />
      </div>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
      {hasError && (
        <div className="text-sm text-red-500 mt-1 ml-[14px] font-[100]">
          {errorMessage || "Campo obligatorio"}
        </div>
      )}
    </div>
  );
};
