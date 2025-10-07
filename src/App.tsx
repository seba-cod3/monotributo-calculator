import { Provider, useAtomValue } from "jotai";
import { Footer, Header } from "./features";
import { Router } from "./features/Router";
import { useFetchExchangeRates } from "./hooks/useFetchExchangeRates";
import { loadingAtom } from "./store/data";

function App() {
  useFetchExchangeRates();
  const isLoading = useAtomValue(loadingAtom);
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <Router />
      <Footer />
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Provider>
      <App />
    </Provider>
  );
}
