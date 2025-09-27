import { useAtomValue } from "jotai";

import { MONOTRIBUTO_SCALES } from "lib/monotributoScales";
import {
  billedLastSemesterAtom,
  exchangeRatesAtom,
  exchangeTypeAtom,
  hasTaxInscriptionAtom,
  isCurrencyUSDAtom,
  monthlyIncomeAtom,
} from "store/data";

export const useMonotributoCalculator = () => {
  /* Suscriptions */
  const exchangeRates = useAtomValue(exchangeRatesAtom);
  const isCurrencyUSD = useAtomValue(isCurrencyUSDAtom);
  const alreadyHasTaxInscription = useAtomValue(hasTaxInscriptionAtom);
  const billedLastSemester = useAtomValue(billedLastSemesterAtom);
  const monthlyIncome = useAtomValue(monthlyIncomeAtom);
  const exchangeType = useAtomValue(exchangeTypeAtom);

  /* REVISAR LOS CALCULOS, ESTAN MAL */
  /* Se crearon inicialmente para capturar los impuestos anuales, pero en el input de si tiene monotributo se pregunta por la facturacion de los ultimos 6 meses */
  /* Ya que para calcular el monotributo proximo, se necesitan solo los ultimos 6 meses */
  /* Para calcular el monotributo nuevo si que se utilizan los 12 meses ya que es una estimacion */

  /* Functions */
  const calculateAnnualARS = (subtractAlreadyBilled = true) => {
    const monthlyValue = monthlyIncome || 0;
    if (isCurrencyUSD) {
      const rate = exchangeRates[exchangeType] || 1;
      const annualValue = monthlyValue * rate * 6;
      if (!subtractAlreadyBilled) {
        return annualValue * 2;
      }
      return annualValue + billedLastSemester;
    } else {
      const annualValue = monthlyValue * 6;
      if (!subtractAlreadyBilled) {
        return annualValue * 2;
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
    margin,
    marginPercentage,
    monthlyTax: recommendedScale.tax,
    annualARS,
    recommendedScale,
  };
};
