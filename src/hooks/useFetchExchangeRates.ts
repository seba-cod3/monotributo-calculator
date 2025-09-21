import { useSetAtom } from "jotai";
import { GetDolars } from "lib/getDolars";
import { useEffect } from "react";
import { exchangeRatesAtom, loadingAtom } from "store/data";
import { ExchangeRates } from "types/data";

export const useFetchExchangeRates = () => {
  const setExchangeRates = useSetAtom(exchangeRatesAtom);
  const setLoading = useSetAtom(loadingAtom);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    setExchangeRates((prev) => ({ ...prev, loading: true }));
    try {
      const response = await GetDolars();

      if (!response) {
        return;
      }
      const exchangeValues = response.reduce((acc, curr) => {
        /* @ts-ignore */
        acc[curr.casa] = curr.compra ?? 0;
        return acc;
      }, {} as ExchangeRates);

      setExchangeRates(exchangeValues);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      setExchangeRates((prev) => ({ ...prev, loading: false }));
    }
  };

  return fetchExchangeRates;
};
