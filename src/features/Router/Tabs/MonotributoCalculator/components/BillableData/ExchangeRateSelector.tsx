import {
  exchangeRatesAtom,
  exchangeTypeAtom,
  hasTaxInscriptionAtom,
  isCurrencyUSDAtom,
} from "@/store/data";
import { useAtom, useAtomValue } from "jotai";
import { ExternalLink } from "lucide-react";

function TooltipContent({
  text,
  iconFalse,
}: {
  text: string;
  iconFalse?: boolean;
}) {
  return (
    <div className="absolute bottom-6 center hidden group-hover:block">
      <div
        className={`min-w-40 grid items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-gray-300 ${
          !iconFalse ? "grid-cols-[minmax(130px,_280px),_20px]" : ""
        }`}
      >
        <p className="text-md text-gray-500">{text}</p>
        {!iconFalse && <ExternalLink className="w-3 h-3 justify-self-end" />}
      </div>
    </div>
  );
}

function Tooltip({
  children,
  text,
  iconFalse,
}: {
  children: React.ReactNode;
  text: string;
  iconFalse?: boolean;
}) {
  return (
    <div className="relative group inline-block">
      <TooltipContent text={text} iconFalse={iconFalse} />
      {children}
    </div>
  );
}

const BLUE_DOLLAR = {
  label: "Dólar Blue",
  desc: "Referencia mercado",
};

export const ExchangeRateSelector = () => {
  const isCurrencyUSD = useAtomValue(isCurrencyUSDAtom);
  const exchangeRates = useAtomValue(exchangeRatesAtom);
  const [exchangeType, setExchangeType] = useAtom(exchangeTypeAtom);
  const hasTaxInscription = useAtomValue(hasTaxInscriptionAtom);
  if (!isCurrencyUSD) return null;
  return (
    <div>
      {!hasTaxInscription && <TipoDeCambioDoc />}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          {
            key: "oficial",
            label: "BNA Oficial",
          },
          {
            key: "cripto",
            label: "Dólar Cripto",
          },
        ].map((option) => {
          const rate = exchangeRates[option.key as keyof typeof exchangeRates];
          return (
            <button
              key={option.key}
              disabled={option.key === "blue"}
              onClick={() => setExchangeType(option.key as any)}
              className={`flex flex-col justify-around p-3 rounded-lg border text-left transition-colors ${
                exchangeType === option.key
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="font-medium text-sm">{option.label}</div>
              <div className="text-sm font-semibold mt-2">
                ${rate?.toLocaleString() || "..."}
              </div>
            </button>
          );
        })}
        <div className="p-3 rounded-lg border text-left transition-colors border-gray-100 disabled text-gray-500">
          <div className="font-medium text-sm">{BLUE_DOLLAR.label}</div>
          <div className="text-xs text-gray-500 mt-1">{BLUE_DOLLAR.desc}</div>
          <div className="text-sm font-semibold mt-2">
            ${exchangeRates["blue"]?.toLocaleString() || "..."}
          </div>
        </div>
      </div>
      <OpcionesDeFacturacionDoc />
    </div>
  );
};

function OpcionesDeFacturacionDoc() {
  return (
    <div className="border border-gray-300 p-2 rounded-lg mt-4">
      <label className="block text-sm font-medium text-gray-500 mb-2">
        Opciones de facturación
      </label>
      <div>
        <p>
          Facturacion dolar Oficial {" > "} dinero a una cuenta bancaria en USD
        </p>
        <p>
          Facturacion dolar Cripto {" > "} AR$ en cuenta (bancaria o digital)
        </p>
      </div>
    </div>
  );
}

function TipoDeCambioDoc() {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tipo de cambio para el cálculo, explicado en criollo
      </label>
      <div>
        Exportando servicios digitales desde hay varias opciones para poder
        realizar la facturación correspondiente.
        <p>
          <b>Dolar Oficial</b>: desde la{" "}
          <Tooltip text="Ir al sitio de BCRA">
            <a
              className="inline-block text-blue-500 hover:text-blue-700 underline hover-pointer"
              href="https://www.bcra.gob.ar/Pdfs/comytexord/A8330.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              comunicacion del <strong>BCRA "A" 8330</strong>
            </a>
          </Tooltip>{" "}
          , se elimina un limite que habia. Podes ingresar dolares a una cuenta
          bancaria de misma denominacion{" "}
          <Tooltip text="Ir al Blog del contador">
            <a
              className="inline-block text-blue-500 hover:text-blue-700 underline hover-pointer"
              href="https://blogdelcontador.com.ar/news-46233-exportaciones-de-servicios-como-cobrar-en-dolares-sin-limites-y-condiciones-del-nuevo-regimen-del-bcra"
              target="_blank"
              rel="noopener noreferrer"
            >
              sin que el banco te pida que los liquides
            </a>
          </Tooltip>
          , como sucedia antes.
        </p>
        <br />
        El monotributo tiene un monto maximo en pesos pasado el monto hay otro
        tipo de inscripcion llamada Responsable Inscripto (y tambien existen{" "}
        <Tooltip iconFalse text="S.R.L., S.A., S.A.S.">
          Personas Jurídicas
        </Tooltip>
        ). El monotributo paga un monto fijo, se basa en una categoria y se
        revisa cada 6 meses. Se suma todo lo facturado en los ultimos 12 meses y
        se lo compara con el valor del{" "}
        <Tooltip text="Ver escalas del monotributo en el sitio de ARCA">
          <a
            className="inline-block text-blue-500 hover:text-blue-700 underline hover-pointer"
            href="https://www.arca.gob.ar/monotributo/categorias.asp#:~:text=Categ.-,Ingresos%20brutos%20(*),-Sup.%20Afectada%20(**)"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ingreso Bruto
          </a>
        </Tooltip>{" "}
        de la categoria. AFIP te avisa en{" "}
        <Tooltip text="Ir al sitio del Monotributo">
          <a
            className="inline-block text-blue-500 hover:text-blue-700 underline hover-pointer"
            href="https://monotributo.afip.gob.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            su sitio
          </a>
        </Tooltip>{" "}
        si necesitas cambiar de categoria.
        <br />
        <br />
        Para facturar dolar digital necesitas:
        <div className="list-disc list-inside space-y-1 pl-2 mt-2 mb-2">
          <li>Monotributo</li>
          <li>
            Una Actividad Economica que permita la exportacion de servicios
          </li>
          <li>Una cuenta en USD en el banco</li>
        </div>
        <div className="border border-gray-300 p-2 rounded-lg">
          <i>En algunas provincias hay costos extras, variados.</i>
          <i>
            Si te encontras radicado en CABA podes tramitar el certificado
            "MiPyme" que te permite evitar el pago de Ingresos Brutos de la
            ciudad.
          </i>
        </div>
      </div>
    </>
  );
}
