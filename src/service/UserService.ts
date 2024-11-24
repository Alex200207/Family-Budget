import axios from "axios";
import { API_URL } from "../constant";

const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/usuario`);
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

export { getUsers };
