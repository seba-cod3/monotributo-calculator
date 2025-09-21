import { MONOTRIBUTO_SCALES, MonotributoScale } from "@/lib/monotributoScales";
import { currentScaleAtom } from "@/store/data";
import { CategoriaMonotributo } from "@/types/data";
import { useAtomValue } from "jotai";
import {
  CheckCircle,
  ChevronsDownUp,
  ChevronsLeftRightEllipsis,
} from "lucide-react";
import { useMemo, useState } from "react";

export const MonotributoScalesTable = ({
  recommendedScale,
}: {
  recommendedScale: MonotributoScale;
}) => {
  const currentScale = useAtomValue(currentScaleAtom);

  const scales = useMemo(() => {
    return MONOTRIBUTO_SCALES.reduce(
      (acc, currScale) => {
        if (
          currScale.scale !== recommendedScale.scale &&
          (currentScale ? currScale.scale !== currentScale : true)
        ) {
          acc.hiddenScales.push(currScale.scale);
        }
        return acc;
      },
      {
        hiddenScales: [] as CategoriaMonotributo[],
      }
    );
  }, [currentScale, recommendedScale]);

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Tabla de Escalas del Monotributo
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Límites anuales y contribuciones mensuales 2025
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader />
          <TableContent
            scales={scales}
            recommendedScale={recommendedScale}
            currentScale={currentScale}
          />
        </table>
      </div>
    </div>
  );
};

function TableHeader() {
  return (
    <thead className="bg-violet-200">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Escala
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Límite Anual
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Impuesto Mensual
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Estado
        </th>
      </tr>
    </thead>
  );
}

function TableContent({
  scales,
  recommendedScale,
  currentScale,
}: {
  scales: { hiddenScales: CategoriaMonotributo[] };
  recommendedScale: MonotributoScale;
  currentScale: CategoriaMonotributo | "";
}) {
  const [expandedSections, setExpandedSections] = useState<{
    before: boolean;
    middle: boolean;
    after: boolean;
  }>({
    before: false,
    middle: false,
    after: false,
  });

  const groupedScales = useMemo(() => {
    const visibleScales = MONOTRIBUTO_SCALES.filter(
      (scale) => !scales.hiddenScales.includes(scale.scale)
    );

    const hiddenScales = MONOTRIBUTO_SCALES.filter((scale) =>
      scales.hiddenScales.includes(scale.scale)
    );

    // Find indices of current and recommended scales
    const currentIndex = currentScale
      ? MONOTRIBUTO_SCALES.findIndex((s) => s.scale === currentScale)
      : -1;
    const recommendedIndex = MONOTRIBUTO_SCALES.findIndex(
      (s) => s.scale === recommendedScale.scale
    );

    // Determine the range of visible scales (including current and recommended)
    const visibleIndices = [currentIndex, recommendedIndex].filter(
      (i) => i !== -1
    );
    const minVisibleIndex = Math.min(...visibleIndices);
    const maxVisibleIndex = Math.max(...visibleIndices);

    const beforeScales = hiddenScales.filter((scale) => {
      const index = MONOTRIBUTO_SCALES.findIndex(
        (s) => s.scale === scale.scale
      );
      return index < minVisibleIndex;
    });

    const middleScales = hiddenScales.filter((scale) => {
      const index = MONOTRIBUTO_SCALES.findIndex(
        (s) => s.scale === scale.scale
      );
      return index > minVisibleIndex && index < maxVisibleIndex;
    });

    const afterScales = hiddenScales.filter((scale) => {
      const index = MONOTRIBUTO_SCALES.findIndex(
        (s) => s.scale === scale.scale
      );
      return index > maxVisibleIndex;
    });

    return {
      beforeScales,
      visibleScales,
      middleScales,
      afterScales,
    };
  }, [scales.hiddenScales, currentScale, recommendedScale.scale]);

  const toggleSection = (section: "before" | "middle" | "after") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Create a sorted array of all scales to render in correct order
  const renderScales = useMemo(() => {
    const allScales = MONOTRIBUTO_SCALES.map((scale) => {
      const isRecommended = scale.scale === recommendedScale.scale;
      const isCurrent = scale.scale === currentScale;
      const isHidden = scales.hiddenScales.includes(scale.scale);

      let section: "before" | "visible" | "middle" | "after" = "visible";

      if (isHidden) {
        if (groupedScales.beforeScales.some((s) => s.scale === scale.scale)) {
          section = "before";
        } else if (
          groupedScales.middleScales.some((s) => s.scale === scale.scale)
        ) {
          section = "middle";
        } else if (
          groupedScales.afterScales.some((s) => s.scale === scale.scale)
        ) {
          section = "after";
        }
      }

      return {
        scale,
        isRecommended,
        isCurrent,
        section,
      };
    });

    return allScales;
  }, [
    groupedScales,
    recommendedScale.scale,
    currentScale,
    scales.hiddenScales,
  ]);

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {renderScales.map((item, index) => {
        const { scale, isRecommended, isCurrent, section } = item;

        // Check if this is the first item of a hidden section
        const isFirstInSection = (sectionType: string) => {
          const prevItem = renderScales[index - 1];
          return (
            section === sectionType &&
            (!prevItem || prevItem.section !== sectionType)
          );
        };

        const elements = [];

        // Add expandable row if this is the first item of a hidden section
        if (
          isFirstInSection("before") &&
          groupedScales.beforeScales.length > 0
        ) {
          elements.push(
            <ExpandableRow
              key={`expand-before-${scale.scale}`}
              isExpanded={expandedSections.before}
              onToggle={() => toggleSection("before")}
              scaleCount={groupedScales.beforeScales.length}
              direction="before"
            />
          );
        }

        if (
          isFirstInSection("middle") &&
          groupedScales.middleScales.length > 0
        ) {
          elements.push(
            <ExpandableRow
              key={`expand-middle-${scale.scale}`}
              isExpanded={expandedSections.middle}
              onToggle={() => toggleSection("middle")}
              scaleCount={groupedScales.middleScales.length}
              direction="middle"
            />
          );
        }

        if (isFirstInSection("after") && groupedScales.afterScales.length > 0) {
          elements.push(
            <ExpandableRow
              key={`expand-after-${scale.scale}`}
              isExpanded={expandedSections.after}
              onToggle={() => toggleSection("after")}
              scaleCount={groupedScales.afterScales.length}
              direction="after"
            />
          );
        }

        // Add the actual row if it should be visible
        const shouldShowRow =
          section === "visible" ||
          (section === "before" && expandedSections.before) ||
          (section === "middle" && expandedSections.middle) ||
          (section === "after" && expandedSections.after);

        if (shouldShowRow) {
          elements.push(
            <TableRow
              key={scale.scale}
              scale={scale}
              isRecommended={isRecommended}
              isCurrent={isCurrent}
            />
          );
        }

        return elements;
      })}
    </tbody>
  );
}

function ExpandableRow({
  isExpanded,
  onToggle,
  scaleCount,
  direction,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  scaleCount: number;
  direction: "before" | "middle" | "after";
}) {
  const getText = () => {
    const scaleText = `${scaleCount} escala${scaleCount > 1 ? "s" : ""}`;

    switch (direction) {
      case "before":
        return `Ver ${scaleText} anterior${scaleCount > 1 ? "es" : ""}`;
      case "middle":
        return `Ver ${scaleText} intermedia${scaleCount > 1 ? "s" : ""}`;
      case "after":
        return `Ver ${scaleText} posterior${scaleCount > 1 ? "es" : ""}`;
      default:
        return `Ver ${scaleText}`;
    }
  };

  return (
    <tr
      className="bg-violet-50 hover:bg-gray-100 cursor-pointer transition-colors"
      onClick={onToggle}
    >
      <td colSpan={4} className="px-2 py-0">
        <div className="flex items-center justify-start text-sm text-gray-600">
          {isExpanded ? (
            <ChevronsDownUp className="h-4 w-4 mr-2" />
          ) : (
            <ChevronsLeftRightEllipsis className="rotate-90 h-4 w-4 mr-2" />
          )}
          <span className="font-medium">{getText()}</span>
        </div>
      </td>
    </tr>
  );
}

function TableRow({
  scale,
  isRecommended,
  isCurrent,
}: {
  scale: MonotributoScale;
  isRecommended: boolean;
  isCurrent: boolean;
}) {
  return (
    <tr
      key={scale.scale}
      className={`${isRecommended ? "bg-green-50" : ""} hover:bg-gray-50`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span
            className={`font-semibold ${
              isRecommended ? "text-green-700" : "text-gray-900"
            }`}
          >
            {scale.scale}
          </span>
          {isRecommended && (
            <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${scale.limit.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${scale.tax.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isRecommended && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Recomendada
          </span>
        )}
        {isCurrent && !isRecommended && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Actual
          </span>
        )}
      </td>
    </tr>
  );
}
