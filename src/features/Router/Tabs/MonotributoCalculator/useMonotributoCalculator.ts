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

const MONTHS_INDEX = {
  june: 5,
  dec: 11,
};

export const useMonotributoCalculator = () => {
  /* Suscriptions */
  const exchangeRates = useAtomValue(exchangeRatesAtom);
  const isCurrencyUSD = useAtomValue(isCurrencyUSDAtom);
  const alreadyHasTaxInscription = useAtomValue(hasTaxInscriptionAtom);
  const billedLastSemester = useAtomValue(billedLastSemesterAtom);
  const monthlyIncome = useAtomValue(monthlyIncomeAtom);
  const exchangeType = useAtomValue(exchangeTypeAtom);

  /* Functions */
  const getMonthlyIncomeInARS = () => {
    const monthlyValue = monthlyIncome || 0;
    if (isCurrencyUSD) {
      const rate = exchangeRates[exchangeType] || 0;
      return monthlyValue * rate;
    }
    return monthlyValue;
  };

  const getMonthsRemainingInCurrentSemester = () => {
    const now = new Date();
    const monthIndex = now.getMonth();
    const endMonthIndex =
      monthIndex <= MONTHS_INDEX.june ? MONTHS_INDEX.june : MONTHS_INDEX.dec;

    const remainingMonths = endMonthIndex - monthIndex + 1;
    return remainingMonths;
  };

  // Projection for a full year based solely on the monthly input
  const computeProjectedAnnualGrossARS = () => {
    const monthlyARS = getMonthlyIncomeInARS();
    return monthlyARS * 12;
  };

  // Projection until the end of the current semester for users already inscribed
  const computeSemesterForecastGrossARS = () => {
    const monthsRemaining = getMonthsRemainingInCurrentSemester();
    const monthlyARS = getMonthlyIncomeInARS();
    return billedLastSemester + monthlyARS * monthsRemaining;
  };

  const getRecommendedScale = () => {
    const referenceAnnual = getReferenceGrossForRecommendation();

    return (
      MONOTRIBUTO_SCALES.find((scale) => referenceAnnual <= scale.limit) ||
      MONOTRIBUTO_SCALES[MONOTRIBUTO_SCALES.length - 1]
    );
  };

  // Single source of truth for both recommendation and margin base
  const getReferenceGrossForRecommendation = () => {
    const annualFromMonthly = computeProjectedAnnualGrossARS();
    const semesterForecast = computeSemesterForecastGrossARS();
    return alreadyHasTaxInscription ? semesterForecast : annualFromMonthly;
  };

  const calculateMargin = () => {
    const recommendedScale = getRecommendedScale();
    const baseForMargin = getReferenceGrossForRecommendation();
    const margin = recommendedScale.limit - baseForMargin;
    const marginPercentage = recommendedScale.limit
      ? (margin / recommendedScale.limit) * 100
      : 0;
    return { margin, marginPercentage };
  };

  /* Computed */
  const recommendedScale = getRecommendedScale();
  const { margin, marginPercentage } = calculateMargin();
  const annualARS = computeProjectedAnnualGrossARS();
  const referenceGrossARS = getReferenceGrossForRecommendation();

  return {
    margin,
    marginPercentage,
    monthlyTax: recommendedScale.tax,
    annualARS,
    referenceGrossARS,
    recommendedScale,
  };
};
