import { useSetAtom } from "jotai";
import { GetDolars } from "lib/getDolars";
import { useEffect } from "react";
import { exchangeRatesAtom, loadingAtom } from "store/data";
import { DolaresParaCalculo } from "types/data";
import { TiposDeCambioParaCalculo } from "./../types/data";

function isTipoDeCambioParaCalculo(
  casa: string
): casa is TiposDeCambioParaCalculo {
  return ["oficial", "blue", "cripto", "mep"].includes(casa);
}

type FetchExchangeRatesProps = { abort?: AbortSignal };
export type FetchExchangeRates = (x?: FetchExchangeRatesProps) => Promise<void>;

export const useFetchExchangeRates = (): FetchExchangeRates => {
  const setExchangeRates = useSetAtom(exchangeRatesAtom);
  const setLoading = useSetAtom(loadingAtom);

  useEffect(() => {
    const abortController = new AbortController();
    fetchExchangeRates({ abort: abortController.signal });

    return () => {
      abortController.abort();
    };
  }, []);

  const fetchExchangeRates = async (props?: FetchExchangeRatesProps) => {
    setLoading(true);
    try {
      const response = await GetDolars({ abort: props?.abort });

      if (!response) {
        return;
      }
      const exchangeValues = response.reduce((acc, curr) => {
        if (curr.casa === "bolsa") {
          acc["mep"] = curr.compra ?? 0;
        } else if (isTipoDeCambioParaCalculo(curr.casa)) {
          acc[curr.casa as TiposDeCambioParaCalculo] = curr.compra ?? 0;
        }
        return acc;
      }, {} as DolaresParaCalculo);

      setExchangeRates(exchangeValues);
    } catch (error) {
      if (props?.abort && !props?.abort.aborted) {
        console.error("Error fetching exchange rates:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return fetchExchangeRates;
};
