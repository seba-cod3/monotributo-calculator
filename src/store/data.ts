import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { CategoriaMonotributo, ExchangeRates } from "types/data";

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
} satisfies ExchangeRates;

export const exchangeRatesAtom = atomWithStorage<ExchangeRates>(
  "exchangeRates",
  INITIAL_EXCHANGE_RATES
);

export const loadingAtom = atom(true);
