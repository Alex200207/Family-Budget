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
}



export { getPlans, createPlan };
