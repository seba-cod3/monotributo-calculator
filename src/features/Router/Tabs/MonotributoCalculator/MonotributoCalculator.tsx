import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";

import { MONOTRIBUTO_SCALES } from "lib/monotributoScales";
import { AlertTriangle } from "lucide-react";
import {
  billedLastSemesterAtom,
  exchangeRatesAtom,
  hasTaxInscriptionAtom,
  isCurrencyUSDAtom,
} from "store/data";

import BillableData from "./components/BillableData";
import { MonotributoScalesTable } from "./components/MonotributoScalesTable";
import { RecommendedScale } from "./components/RecommendedScale/RecommendedScale";

export const useMonotributoCalculator = () => {
  /* Suscriptions */
  const exchangeRates = useAtomValue(exchangeRatesAtom);
  const isCurrencyUSD = useAtomValue(isCurrencyUSDAtom);
  const alreadyHasTaxInscription = useAtomValue(hasTaxInscriptionAtom);
  const billedLastSemester = useAtomValue(billedLastSemesterAtom);

  /* States */
  const [monthlyIncome, setMonthlyIncome] = useState<string>("2000");
  const [exchangeType, setExchangeType] = useState<
    "oficial" | "blue" | "cripto"
  >("oficial");

  /* Functions */
  const calculateAnnualARS = (subtractAlreadyBilled = true) => {
    const monthlyValue = parseFloat(monthlyIncome) || 0;
    if (isCurrencyUSD) {
      const rate = exchangeRates[exchangeType] || 1;
      const annualValue = monthlyValue * rate * 12;
      if (!subtractAlreadyBilled) {
        return annualValue
      }
      return annualValue + billedLastSemester;
    } else {
      const annualValue = monthlyValue * 12;
      if (!subtractAlreadyBilled) {
        return annualValue;
      }
      return annualValue + billedLastSemester;
    }
  };

  const getRecommendedScale = () => {
    let annualARS = calculateAnnualARS(alreadyHasTaxInscription);
    return (
      MONOTRIBUTO_SCALES.find((scale) => annualARS <= scale.limit) ||
      MONOTRIBUTO_SCALES[MONOTRIBUTO_SCALES.length - 1]
    );
  };

  const calculateMargin = () => {
    const annualARS = calculateAnnualARS(alreadyHasTaxInscription);
    const recommendedScale = getRecommendedScale();
    const margin = recommendedScale.limit - annualARS;
    const marginPercentage = (margin / recommendedScale.limit) * 100;
    return { margin, marginPercentage };
  };

  /* Computed */
  const recommendedScale = getRecommendedScale();
  const { margin, marginPercentage } = calculateMargin();
  const annualARS = calculateAnnualARS(false);

  return {
    monthlyIncome,
    setMonthlyIncome,
    setExchangeType,
    exchangeType,
    margin,
    marginPercentage,
    monthlyTax: recommendedScale.tax,
    annualARS,
    recommendedScale,
  };
};

export const MonotributoCalculator = () => {
  const {
    margin,
    marginPercentage,
    monthlyTax,
    annualARS,
    recommendedScale,
    monthlyIncome,
    setMonthlyIncome,
    setExchangeType,
    exchangeType,
  } = useMonotributoCalculator();

  return (
    <div className="space-y-8">
      <SectionTitle />

      <HasTaxInscription />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BillableData
            monthlyIncome={monthlyIncome}
            setMonthlyIncome={setMonthlyIncome}
            setExchangeType={setExchangeType}
            exchangeType={exchangeType}
          />
        </div>

        <div className="flex flex-col justify-between gap-8">
          <RecommendedScale
            margin={margin}
            marginPercentage={marginPercentage}
            recommendedScale={recommendedScale}
            annualARS={annualARS}
          />

          <TaxInformation
            monthlyTax={monthlyTax}
            annualTax={monthlyTax * 12}
            annualARS={annualARS}
          />

          {marginPercentage < 10 && (
            <WarningCard
              isLessTanZero={margin > 0}
              marginPercentage={marginPercentage}
            />
          )}
        </div>
      </div>

      <MonotributoScalesTable recommendedScale={recommendedScale} />
    </div>
  );
};

function SectionTitle() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        Calculadora de Monotributo
      </h2>
      <p className="text-gray-600 mt-1">
        Obtene tu escala en base a tus ingresos
      </p>
    </div>
  );
}

function TaxInformation({
  monthlyTax,
  annualTax,
  annualARS,
}: {
  monthlyTax: number;
  annualTax: number;
  annualARS: number;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Información Impositiva
      </h3>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            ${monthlyTax.toLocaleString()}
          </div>
          <p className="text-sm text-blue-700">Impuesto mensual</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Anual:</span>
            <span className="font-semibold">${annualTax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">% sobre facturación:</span>
            <span className="font-semibold">
              {((annualTax / annualARS) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WarningCard({
  isLessTanZero = false,
  marginPercentage,
}: {
  isLessTanZero: boolean;
  marginPercentage: number;
}) {
  if (isLessTanZero) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <span className="font-medium text-yellow-800">Atención</span>
        </div>
        <p className="text-sm text-yellow-700">
          Estás cerca del límite de tu escala ({marginPercentage.toFixed(1)}%
          restante). Considera planificar para el siguiente nivel.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-2">
        <AlertTriangle className="h-5 w-5 text-yellow-600" />
        <span className="font-medium text-yellow-800">Alerta</span>
      </div>
      <p className="text-sm text-yellow-700">
        Exclusión del monotributo. Considera otras opciones como Responsable
        Inscripto, SRL, SAS.
      </p>
    </div>
  );
}

function HasTaxInscription() {
  const [hasTaxInscription, setHasTaxInscription] = useAtom(
    hasTaxInscriptionAtom
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label
        htmlFor="hasTaxInscription"
        className="cursor-pointer p-4 bg-white rounded-xl shadow-sm border flex items-center gap-6"
      >
        <input
          type="radio"
          name="hasTaxInscription"
          id="hasTaxInscription"
          checked={hasTaxInscription}
          onChange={() => setHasTaxInscription(true)}
          className="w-4 h-4"
        />
        <div>Ya tengo monotributo</div>
      </label>
      <label
        htmlFor="noTaxInscription"
        className="cursor-pointer p-4 bg-white rounded-xl shadow-sm border flex items-center gap-6"
      >
        <input
          type="radio"
          name="noTaxInscription"
          id="noTaxInscription"
          checked={!hasTaxInscription}
          onChange={() => setHasTaxInscription(false)}
          className="w-4 h-4"
        />
        <div>No tengo monotributo</div>
      </label>
    </div>
  );
}
