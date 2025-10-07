import {
  AlertCircle,
  Banknote,
  Bitcoin,
  CreditCard,
  ExternalLink,
  Info,
} from "lucide-react";
import React, { useState } from "react";


const methods = [
  {
    id: "usd",
    title: "Facturar en USD",
    subtitle: "Cuenta bancaria en dólares",
    icon: CreditCard,
    color: "bg-blue-500",
    description: "Para quien tiene cuenta en USD y quiere simplicidad",
  },
  {
    id: "crypto",
    title: "Cobrar en Crypto",
    subtitle: "Stablecoins y conversión",
    icon: Bitcoin,
    color: "bg-orange-500",
    description: "Mayor flexibilidad, requiere más pasos",
  },
  {
    id: "physical",
    title: "Obtener USD Físicos",
    subtitle: "Dólares billete legales",
    icon: Banknote,
    color: "bg-green-500",
    description: "Para quienes prefieren efectivo legal",
  },
];

const usdSteps = [
  {
    title: "Abrir cuenta en USD",
    description:
      "Necesitas una cuenta bancaria en dólares. Todos los bancos ofrecen esta opción.",
    tip: "Recomendado: Galicia, Santander o BBVA tienen buenas condiciones para cuentas en USD",
  },
  {
    title: "Recibir pagos",
    description:
      "Usa apps como DolarApp, Western Union o transferencias bancarias directas.",
    tip: "DolarApp es muy conveniente para recibir desde el exterior sin comisiones de ingreso",
  },
  {
    title: "Facturar tipo E",
    description:
      "Emite tu factura de exportación de servicios el día después de recibir el pago.",
    warning:
      "Se toma el tipo de cambio BNA comprador del día ANTERIOR a la facturación",
  },
  {
    title: "Liquidar divisas",
    description:
      "El banco no puede cobrarte por el ingreso de USD a tu cuenta.",
    tip: "Podés mantener los USD en tu cuenta o venderlos cuando convenga",
  },
];

const cryptoSteps = [
  {
    title: "Recibir crypto",
    description:
      "Recibí el pago en USDT, USDC o la stablecoin que prefieras.",
    tip: "USDT TRC-20 tiene comisiones más bajas que ERC-20",
  },
  {
    title: "Vender en Binance",
    description:
      "Transferí a Binance y vendé por pesos argentinos (ARS) en el P2P.",
    warning:
      "Verificá que el comprador tenga buena reputación antes de vender",
  },
  {
    title: "Enviar a Lemon/Belo",
    description:
      "Transfiere los pesos desde Binance a Lemon, Belo u otra fintech.",
    tip: "Lemon Cash suele tener transferencias instantáneas y sin costo",
  },
  {
    title: "Facturar",
    description:
      "Una vez que tengas los pesos en Argentina, emitís la factura tipo E.",
    warning: "Factura cuando ya tengas la plata disponible en el país",
  },
  {
    title: "Transferir al banco",
    description:
      "Enviá los pesos desde la fintech a tu cuenta bancaria tradicional.",
    tip: "Mantené registros de todos los movimientos para justificar el origen de fondos",
  },
];

const physicalSteps = [
  {
    title: "Proceso crypto inicial",
    description:
      "Seguí los primeros 3 pasos del método crypto hasta tener pesos en Argentina.",
    tip: "Este es el paso más complejo, pero te da acceso a dólares físicos legales",
  },
  {
    title: "Comprar AL30D",
    description:
      "Con los pesos, comprá bonos AL30D en tu broker (Balanz, IOL, etc.).",
    warning:
      "Verificá que el precio del MEP sea conveniente antes de comprar",
  },
  {
    title: "Vender AL30D en USD",
    description:
      "Al día siguiente, vendé los AL30D en la cotización dólar (USD).",
    tip: "Esto te da dólares 100% legales que podés retirar del banco",
  },
  {
    title: "Retirar del banco",
    description:
      "Los USD quedan en tu cuenta bancaria y podés retirarlos en efectivo.",
    tip: "Algunos bancos requieren aviso previo para retiros grandes en USD",
  },
  {
    title: "Facturar",
    description:
      "Emitís la factura tipo E para blanquear la operación fiscalmente.",
    warning: "La facturación debe coincidir con el monto que ingresó al país",
  },
];

export const PaymentMethodGuide = () => {
  const [selectedMethod, setSelectedMethod] = useState<
    "usd" | "crypto" | "physical"
  >("usd");


  const renderStepCard = (step: any, index: number) => (
    <div
      key={index}
      className="flex space-x-4 p-4 border rounded-lg bg-gray-50"
    >
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
          {index + 1}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
        <p className="text-sm text-gray-600 mb-2">{step.description}</p>
        {step.warning && (
          <div className="flex items-start space-x-2 p-2 bg-yellow-100 rounded text-yellow-800 text-xs">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>{step.warning}</span>
          </div>
        )}
        {step.tip && (
          <div className="flex items-start space-x-2 p-2 bg-blue-100 rounded text-blue-800 text-xs">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>{step.tip}</span>
          </div>
        )}
      </div>
    </div>
  );



  const getStepsForMethod = () => {
    switch (selectedMethod) {
      case "usd":
        return usdSteps;
      case "crypto":
        return cryptoSteps;
      case "physical":
        return physicalSteps;
      default:
        return [];
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Guías de Cobro</h2>
        <p className="text-gray-600 mt-1">
          Estrategias paso a paso para cobrar tus servicios del exterior
        </p>
      </div>

      {/* Method Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {methods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id as any)}
              className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                selectedMethod === method.id
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-lg ${method.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-500">{method.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{method.description}</p>
            </button>
          );
        })}
      </div>

      {/* Step-by-Step Guide */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${
                methods.find((m) => m.id === selectedMethod)?.color
              }`}
            >
              {React.createElement(
                methods.find((m) => m.id === selectedMethod)?.icon || Info,
                {
                  className: "h-5 w-5 text-white",
                }
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {methods.find((m) => m.id === selectedMethod)?.title}
              </h3>
              <p className="text-sm text-gray-600">
                Guía paso a paso para implementar esta estrategia
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {getStepsForMethod().map((step, index) =>
              renderStepCard(step, index)
            )}
          </div>
        </div>
      </div>

      <Resources />
    </div>
  );
};

const Resources = () => {

  return <div className="bg-white rounded-xl shadow-sm border p-6">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">
    📚 Recursos Útiles
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900">
        Plataformas Recomendadas
      </h4>
      <div className="space-y-2 text-sm">
        <a
          href="#"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <ExternalLink className="h-4 w-4" />
          <span>DolarApp - Para recibir USD</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Binance P2P - Trading crypto</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Lemon Cash - Fintech local</span>
        </a>
      </div>
    </div>

    <div className="space-y-3">
      <h4 className="font-medium text-gray-900">Información Legal</h4>
      <div className="space-y-2 text-sm">
        <a
          href="#"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <ExternalLink className="h-4 w-4" />
          <span>AFIP - Facturación tipo E</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Monotributo - Escalas 2025</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <ExternalLink className="h-4 w-4" />
          <span>BCRA - Regulaciones cambio</span>
        </a>
      </div>
    </div>
  </div>
</div>
}


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
