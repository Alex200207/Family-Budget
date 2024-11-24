import { useState } from "react";
import { useEffect } from "react";
import { Presupuesto} from "../types";
import { getBudget } from "../service/BudgetServices";

const useBudget = () => {
  const [budget, setBudget] = useState<Presupuesto[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      const data = await getBudget();
      if (data) {
        setBudget(data);
      } else {
        console.warn("No se obtuvieron datos de usuarios");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  return {
    budget,
    reloadData,
  };
};
export default useBudget;
