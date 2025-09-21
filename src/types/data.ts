export type CategoriaMonotributo =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K";

type DolaresEnArgentina = {
  oficial: number;
  blue: number;
  cripto: number;
  mep: number;
};
export type ExchangeRates = {
  [Dolar in keyof DolaresEnArgentina]: number;
};
