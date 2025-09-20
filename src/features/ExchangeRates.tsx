import React from 'react';
import { TrendingUp, TrendingDown, RefreshCw, DollarSign, Bitcoin, Banknote, ArrowUpDown } from 'lucide-react';

interface ExchangeRatesProps {
  rates: {
    oficial: number;
    blue: number;
    cripto: number;
    mep: number;
    loading: boolean;
  };
  onRefresh: () => void;
}

const ExchangeRates: React.FC<ExchangeRatesProps> = ({ rates, onRefresh }) => {
  const rateCards = [
    {
      title: 'Dólar Oficial (BNA)',
      subtitle: 'Tipo de cambio comprador',
      value: rates.oficial,
      icon: Banknote,
      color: 'bg-blue-500',
      description: 'Usado para facturación tipo E al día anterior'
    },
    {
      title: 'Dólar Blue',
      subtitle: 'Mercado paralelo',
      value: rates.blue,
      icon: DollarSign,
      color: 'bg-green-500',
      description: 'Cotización del mercado informal'
    },
    {
      title: 'Dólar Cripto',
      subtitle: 'Stable coins',
      value: rates.cripto,
      icon: Bitcoin,
      color: 'bg-orange-500',
      description: 'USDT/USDC promedio en exchanges'
    },
    {
      title: 'Dólar MEP',
      subtitle: 'Mercado electrónico',
      value: rates.mep,
      icon: ArrowUpDown,
      color: 'bg-purple-500',
      description: 'AL30D - Para arbitraje legal'
    }
  ];

  const calculateGap = (rate1: number, rate2: number) => {
    return ((rate1 - rate2) / rate2 * 100).toFixed(1);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cotizaciones del Dólar</h2>
          <p className="text-gray-600 mt-1">Actualizaciones en tiempo real para tu planificación fiscal</p>
        </div>
        <button
          onClick={onRefresh}
          disabled={rates.loading}
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${rates.loading ? 'animate-spin' : ''}`} />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Exchange Rate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rateCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-medium">+2.3%</span>
                  </div>
                </div>
                
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900">{card.title}</h3>
                  <p className="text-sm text-gray-500">{card.subtitle}</p>
                </div>
                
                <div className="mb-3">
                  <span className="text-2xl font-bold text-gray-900">
                    {rates.loading ? '...' : `$${card.value.toLocaleString()}`}
                  </span>
                </div>
                
                <p className="text-xs text-gray-500">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gap Analysis */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Análisis de Brechas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">Blue vs Oficial</span>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-blue-600">
              +{rates.loading ? '...' : calculateGap(rates.blue, rates.oficial)}%
            </span>
            <p className="text-xs text-blue-700 mt-1">Brecha cambiaria</p>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-orange-900">Cripto vs Blue</span>
              <TrendingDown className="h-4 w-4 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-orange-600">
              {rates.loading ? '...' : calculateGap(rates.cripto, rates.blue)}%
            </span>
            <p className="text-xs text-orange-700 mt-1">Diferencial cripto</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-900">MEP vs Blue</span>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">
              {rates.loading ? '...' : calculateGap(rates.mep, rates.blue)}%
            </span>
            <p className="text-xs text-purple-700 mt-1">Oportunidad arbitraje</p>
          </div>
        </div>
      </div>

      {/* Trading Tips */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Tips de Arbitraje</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">MEP Inverso</h4>
            <p className="text-sm text-gray-600">
              Si el MEP está por debajo del blue, podes comprar AL30D en pesos y vender en USD para obtener dólares legales.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Timing de Facturación</h4>
            <p className="text-sm text-gray-600">
              Monitoreá el tipo de cambio BNA para facturar en momentos favorables, recordá que se toma el del día anterior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRates;