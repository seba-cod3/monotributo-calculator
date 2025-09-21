import { Provider, useSetAtom } from "jotai";
import { GetDolars } from "lib/getDolars";
import { useEffect } from "react";
import { Footer, Header } from "./features";
import { Router } from "./features/Router";
import { exchangeRatesAtom, loadingAtom } from "./store/data";

function App() {
  const setExchangeRates = useSetAtom(exchangeRatesAtom);
  const setLoading = useSetAtom(loadingAtom);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    setExchangeRates((prev) => ({ ...prev, loading: true }));
    try {
      const response = await GetDolars();

      const exchanges = {
        oficial:
          response.find((exchange) => exchange.casa === "oficial")?.compra ?? 0,
        blue:
          response.find((exchange) => exchange.casa === "blue")?.compra ?? 0,
        cripto:
          response.find((exchange) => exchange.casa === "cripto")?.compra ?? 0,
        mep:
          response.find((exchange) => exchange.casa === "bolsa")?.compra ?? 0,
      };

      setExchangeRates(exchanges);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      setExchangeRates((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <Provider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header fetchExchangeRates={fetchExchangeRates} />
        <Router fetchExchangeRates={fetchExchangeRates} />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
