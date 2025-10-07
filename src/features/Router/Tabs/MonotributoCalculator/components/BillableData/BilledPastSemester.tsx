import { InputMoneyFormat } from "@/components/InputMoneyFormat";
import { billedThisSemesterAtom } from "@/store/data";
import { useAtom } from "jotai";

export const BilledPastSemester = () => {
  const lastRecategorization = new Date().getMonth() >= 5 ? "Enero" : "Julio del año pasado";
  const [billedThisSemester, setBilledThisSemester] = useAtom(
    billedThisSemesterAtom
  );

  return (
    <InputMoneyFormat
      label={`Facturacion (AR$) desde ${lastRecategorization} a la fecha`}
      description={`Ingresa tu facturación desde la ultima recategorización`}
      value={billedThisSemester}
      onChange={setBilledThisSemester}
      id="billedThisSemester"
    />
  );
};
