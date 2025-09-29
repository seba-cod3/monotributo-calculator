import { currentScaleAtom, hasTaxInscriptionAtom } from "@/store/data";
import { useAtomValue } from "jotai";
import { getPercentageColor } from "lib/getPercentageColor";
import { MonotributoScale } from "lib/monotributoScales";
import { CheckCircle } from "lucide-react";

export const RecommendedScale = ({
  margin,
  marginPercentage,
  recommendedScale,
  annualARS,
  referenceGrossARS,
}: {
  margin: number;
  marginPercentage: number;
  recommendedScale: MonotributoScale;
  annualARS: number;
  referenceGrossARS?: number;
}) => {
  const hasTaxInscription = useAtomValue(hasTaxInscriptionAtom);
  const currentScale = useAtomValue(currentScaleAtom);
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-green-500 p-2 rounded-lg">
          <CheckCircle className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Escala Recomendada
        </h3>
      </div>

      <div className="space-y-4">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          {margin < 0 ? (
            <>
              <div className="text-xl font-bold text-red-600">
                Responsable inscripto
              </div>
              <p className="text-sm text-red-700">
                El monto supera el limite del monotributo
              </p>
            </>
          ) : (
            <>
              <div className="text-3xl font-bold text-green-600">
                {recommendedScale.scale}
              </div>
              <p className="text-sm text-green-700">
                {currentScale === recommendedScale.scale
                  ? "Escala actual"
                  : "Escala sugerida"}
              </p>
            </>
          )}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {hasTaxInscription
                ? "Proyección final de semestre"
                : "Facturación anual"}
              :
            </span>
            {hasTaxInscription ? (
              <span className="font-semibold">
                ${referenceGrossARS?.toLocaleString() ?? "-"}
              </span>
            ) : annualARS ? (
              <span className="font-semibold">
                ${annualARS.toLocaleString()}
              </span>
            ) : (
              <span className="font-light text-xs m-[auto,_0] text-right text-gray-500">
                Ingresa una facturacion mensual
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Límite escala:</span>
            <span className="font-semibold">
              ${recommendedScale.limit.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              {margin < 0
                ? "Facturación excedida por"
                : hasTaxInscription
                ? "Restante facturación"
                : "Margen disponible"}
              :
            </span>
            <div
              className={`font-semibold w-full align-right grid justify-end ${getPercentageColor(
                margin
              )}`}
            >
              <span className="text-right">${margin.toLocaleString()}</span>
              <span className="text-right">
                ({marginPercentage.toFixed(1)}
                %)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
