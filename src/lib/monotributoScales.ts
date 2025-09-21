import { CategoriaMonotributo } from "types/data";

export type MonotributoScale = {
  scale: CategoriaMonotributo;
  limit: number;
  tax: number;
};

export const MONOTRIBUTO_SCALES = [
  { scale: "A", limit: 8992597.87, tax: 37085.74 },
  { scale: "B", limit: 13175201.52, tax: 42216.41 },
  { scale: "C", limit: 18473166.15, tax: 49435.58 },
  { scale: "D", limit: 22934610.05, tax: 63357.8 },
  { scale: "E", limit: 26977793.6, tax: 89714.31 },
  { scale: "F", limit: 33809379.57, tax: 112906.59 },
  { scale: "G", limit: 40431835.35, tax: 172457.38 },
  { scale: "H", limit: 61344853.64, tax: 391400.62 },
  { scale: "I", limit: 68664410.05, tax: 721650.46 },
  { scale: "J", limit: 78632948.76, tax: 874069.29 },
  { scale: "K", limit: 94805682.9, tax: 1208690.86 },
] satisfies MonotributoScale[];
