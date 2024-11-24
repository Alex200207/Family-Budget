import { useState, useEffect } from "react";
import { getExpenses } from "../service/ExpensesServices";
import { Gasto } from "../types";

const useExpenses = () => {
  const [expense, setExpense] = useState<Gasto[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      const data = await getExpenses();
      if (data) {
        setExpense(data);
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
    expense,
    reloadData,
  };
};

export default useExpenses;
