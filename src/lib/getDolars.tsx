type Casa =
  | "oficial"
  | "blue"
  | "bolsa"
  | "contadoconliqui"
  | "mayorista"
  | "cripto"
  | "tarjeta";

type ExchangeType = {
  compra: number;
  venta: number;
  casa: Casa;
  nombre: string;
  moneda: string;
  fechaActualizacion: string;
};

export async function GetDolars(): Promise<ExchangeType[]> {
  const response = await easyFetch<ExchangeType[]>(
    "https://dolarapi.com/v1/dolares"
  );
  return response;
}

async function easyFetch<T>(url: string): Promise<T> {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched data", data);
      return data;
    });
}
