import { InputMoneyFormat } from "@/components/InputMoneyFormat";
import { billedLastSemesterAtom } from "@/store/data";
import { useAtom } from "jotai";

export const BilledPastSemester = () => {
  const JuneOrDecember = new Date().getMonth() >= 5 ? "Junio" : "Diciembre";
  const [billedLastSemester, setBilledLastSemester] = useAtom(
    billedLastSemesterAtom
  );

  return (
    <InputMoneyFormat
      label={`Facturacion (AR$) desde ${JuneOrDecember} a la fecha`}
      description={`Ingresa tu facturación desde ${JuneOrDecember} a la fecha`}
      value={billedLastSemester}
      onChange={setBilledLastSemester}
      id="billedLastSemester"
    />
  );
};
