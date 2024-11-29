import axios from "axios";
import { API_URL } from "../constant";
import { Plan } from "../hook/usePlan";

const getPlans = async () => {
  try {
    const response = await axios.get(`${API_URL}/plan`);
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

const createPlan = async (newPlan: Plan) => {
  try {
    const response = await axios.post(`${API_URL}/plan`, newPlan);
    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Ha ocurrido un error al crear el plan", error);
    return false;
  }
};

const deletePlan = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/plan/${id}`);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Ha ocurrido un error al borrar el plan", error);
    return false;
  }
};

const incrementAmount = async (
  id: string,
  amount: number
): Promise<boolean> => {
  try {
    const response = await axios.patch(`${API_URL}/plan/${id}`, { amount });
    return response.status === 200;
  } catch (error) {
    console.error("Error al actualizar el monto del plan:", error);
    return false;
  }
};


const editPlan = async (id: Plan["id"], updatedPlan: Partial<Plan>) => {
  try {
    const response = await axios.put(`${API_URL}/plan/${id}`, updatedPlan);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update plan");
    }
  } catch (err) {
    console.log(err, "No se pudo actualizar los datos");
    throw err;
  }
};

export { getPlans, createPlan, deletePlan, incrementAmount, editPlan };
