import axios from "axios";
import { API_URL } from "../constant";

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

export { getExpenses };
