import { useState, useEffect } from "react";
import {
  createExpense,
  getAmountExpenses,
  getExpenses,
  updateBudgetLimit,
} from "../service/ExpensesServices";
import { Gasto } from "../types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useBudget from "./useBudget";
const MySwal = withReactContent(Swal);

const useExpenses = () => {
  const [expense, setExpense] = useState<Gasto[]>([]);
  const [amountExpense, setAmountExpense] = useState(0);
  const { budget } = useBudget();

  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    fetchExpense();
    AmountExpense();
  }, [reload]);

  const fetchExpense = async () => {
    try {
      const data = await getExpenses();
      if (data) {
        setExpense(data);
      } else {
        console.warn("No se obtuvieron datos de gastos");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  const AmountExpense = async () => {
    try {
      const data = await getAmountExpenses();
      if (data) {
        setAmountExpense(data);
      } else {
        console.warn("No se obtuvieron datos de gastos");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const createNewExpense = async (newExpense: Gasto) => {
    try {
      const presupuesto = budget.find(
        (b) => b.id === newExpense.presupuesto_id
      );

      if (!presupuesto) {
        throw new Error("Presupuesto no encontrado");
      }

      const deuda = Math.max(0, newExpense.monto - presupuesto.limite);
      const montoRestante = Math.max(0, presupuesto.limite - newExpense.monto);

      const estado = deuda > 0 ? 2 : 1;

      const expenseWithDetails = {
        ...newExpense,
        estado,
        deuda,
        montoRestante,
      };

      console.log("gasto", montoRestante);

      const data = await createExpense(expenseWithDetails);

      if (data) {
        const gastoId = data.id;

        await updateBudgetLimit(
          newExpense.presupuesto_id,
          gastoId,
          newExpense.monto
        );

        await MySwal.fire({
          title: "¡Éxito!",
          text: deuda
            ? "El gasto se creó con deuda pendiente."
            : "El gasto se creó exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        reloadData();
      } else {
        console.warn("No se pudo crear el gasto");
      }
    } catch (error) {
      console.error("Error al crear el gasto:", error);
    }
  };

  return {
    expense,
    reloadData,
    createNewExpense,
    amountExpense
  };
};

export default useExpenses;
