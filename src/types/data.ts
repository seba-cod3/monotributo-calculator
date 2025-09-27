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

export type TiposDeCambio =
  | "oficial"
  | "blue"
  | "bolsa"
  | "contadoconliqui"
  | "mayorista"
  | "cripto"
  | "tarjeta";

export type TiposDeCambioParaCalculo = "oficial" | "blue" | "cripto" | "mep";

export type DolaresParaCalculo = {
  [x in TiposDeCambioParaCalculo]: number;
};

export type DolaresEnArgentina = {
  [x in TiposDeCambio]: number;
};

export type Currency = "usd" | "ars";
