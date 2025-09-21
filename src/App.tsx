import { Provider } from "jotai";
import { Footer, Header } from "./features";
import { Router } from "./features/Router";
import { useFetchExchangeRates } from "./hooks/useFetchExchangeRates";

function App() {
  const fetchExchangeRates = useFetchExchangeRates();
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
