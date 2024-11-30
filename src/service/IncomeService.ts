import axios from "axios";
import { API_URL } from "../constant";

const IncomeService = async () => {
  try {
    const response = await axios.get(`${API_URL}/ingresos`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log(e, "error");
    return [];
  }
};

export { IncomeService };
