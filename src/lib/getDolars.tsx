import { TiposDeCambio } from "@/types/data";

type ExchangeType = {
  casa: TiposDeCambio;
  compra: number;
  venta: number;
  nombre: string;
  moneda: string;
  fechaActualizacion: string;
};

export async function GetDolars({
  abort,
}: {
  abort?: AbortSignal;
}): Promise<ExchangeType[]> {
  const response = await easyFetch<ExchangeType[]>(
    "https://dolarapi.com/v1/dolares",
    abort
  );
  return response;
}

async function easyFetch<T>(url: string, abort?: AbortSignal): Promise<T> {
  return fetch(url, { signal: abort })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
