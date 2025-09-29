import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { CategoriaMonotributo, DolaresParaCalculo } from "types/data";

export const currentScaleAtom = atomWithStorage<CategoriaMonotributo | "">(
  "currentScale",
  ""
);

export const activeTabAtom = atomWithStorage<string>("activeTab", "calculator");

export const INITIAL_EXCHANGE_RATES = {
  oficial: 0,
  blue: 0,
  cripto: 0,
  mep: 0,
} satisfies DolaresParaCalculo;

export const exchangeRatesAtom = atom<DolaresParaCalculo>(
  INITIAL_EXCHANGE_RATES
);

export const loadingAtom = atom(true);

export const isCurrencyUSDAtom = atom(true, (get, set, nextValue?: boolean) => {
  const current = get(isCurrencyUSDAtom);
  set(isCurrencyUSDAtom, nextValue ?? !current);
});

export const hasTaxInscriptionAtom = atomWithStorage(
  "hasTaxInscription",
  false
);

export const billedThisSemesterAtom = atomWithStorage("billedThisSemester", 0);
export const monthlyIncomeAtom = atomWithStorage("monthlyIncome", 0);

export const exchangeTypeAtom = atom<keyof DolaresParaCalculo>(
  "oficial" as const
);
