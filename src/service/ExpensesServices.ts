import axios from "axios";
import { API_URL } from "../constant";
import { Gasto, Presupuesto } from "../types";

const getExpenses = async () => {
  try {
    const response = await axios.get(`${API_URL}/gastos`);
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Ha ocurrido un error al obtener la informacion", error);
    return [];
  }
};

const updateBudgetLimit = async (
  presupuestoId: Presupuesto["id"],
  gastoID: Gasto["id"],
  gastoMonto: number
) => {
  try {
   
    const response = await axios.patch(
      `${API_URL}/presupuesto/${presupuestoId}/${gastoID}`,
      {
        gastoMonto: gastoMonto, 
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el presupuesto:", error);
    throw error;
  }
};


const createExpense = async (newExpense: Gasto): Promise<Gasto> => {
  try {
    const response = await axios.post(`${API_URL}/gastos`, newExpense);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to add new expense");
    }
  } catch (err) {
    console.log(err, "No se pudo agregar el nuevo gasto");
    throw err;
  }
};

export { getExpenses, createExpense, updateBudgetLimit };
