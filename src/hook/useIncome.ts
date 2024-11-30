import { IncomeService } from "../service/IncomeService";
import { useEffect, useState } from "react";
import { Ingreso } from "../types";

const useIncome = () => {
  const [income, setIncome] = useState<Ingreso[]>([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchIncome();
  }, [reload]);

  const fetchIncome = async () => {
    try {
      const response = await IncomeService();
      setIncome(response);
    } catch (e) {
      console.log(e, "error al obtener los ingresos");
    }
  };
  const reloadIncome = () => {
    setReload((prev) => !prev);
  };

  return { income, reloadIncome };
};

export default useIncome;
