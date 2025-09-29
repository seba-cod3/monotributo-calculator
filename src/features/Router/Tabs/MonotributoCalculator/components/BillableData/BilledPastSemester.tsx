import { InputMoneyFormat } from "@/components/InputMoneyFormat";
import { billedThisSemesterAtom } from "@/store/data";
import { useAtom } from "jotai";

export const BilledPastSemester = () => {
  const JuneOrDecember = new Date().getMonth() >= 5 ? "Junio" : "Diciembre";
  const [billedThisSemester, setBilledThisSemester] = useAtom(
    billedThisSemesterAtom
  );

  return (
    <InputMoneyFormat
      label={`Facturacion (AR$) desde ${JuneOrDecember} a la fecha`}
      description={`Ingresa tu facturación desde ${JuneOrDecember} a la fecha`}
      value={billedThisSemester}
      onChange={setBilledThisSemester}
      id="billedThisSemester"
    />
  );
};
