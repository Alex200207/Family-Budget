import { useState, useEffect } from "react";
import {
  createExpense,
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
  const { budget } = useBudget();
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
        console.warn("No se obtuvieron datos de gastos");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  const createNewExpense = async (newExpense: Gasto) => {
    try {
      const presupuesto = budget.find(
        (b) => b.id === newExpense.presupuesto_id
      );

      if (!presupuesto) {
        throw new Error("Presupuesto no encontrado");
      }

      // Verifica si hay suficiente presupuesto
      const deuda = Math.max(0, newExpense.monto - presupuesto.limite);
      const montoRestante = Math.max(0, presupuesto.limite - newExpense.monto);

      const estado = deuda > 0 ? 2 : 1; // 2 = pendiente, 1 = pagado

      const expenseWithDetails = {
        ...newExpense,
        estado,
        deuda,
      };

      // Enviar el gasto al backend
      const data = await createExpense(expenseWithDetails);

      if (data) {
        // Actualiza el límite del presupuesto solo si no genera deuda
        if (montoRestante > 0) {
          await updateBudgetLimit(
            newExpense.presupuesto_id,
            newExpense.id,
            montoRestante
          );
        }

        // Mostrar alerta de éxito
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
  };
};

export default useExpenses;
