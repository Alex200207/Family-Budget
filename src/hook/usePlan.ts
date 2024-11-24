import { useState, useEffect } from "react";
import { getPlans ,createPlan} from "../service/PlanServices";

export interface Plan {
  id: number;
  monto: number;
  fecha_limite?: Date;
  objetivo: string;
  actual: number;
  meta: number;
  usuario_id: number;
  descripcion: string;
}

const usePlan = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      const data = await getPlans();
      if (data) {
        setPlans(data);
      } else {
        console.warn("No se obtuvieron datos de usuarios");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const createNewPlan = async (newPlan: Plan) => {
    try {
      const data = await createPlan(newPlan);
      if (data) {
        reloadData();
      } else {
        console.warn("No se pudo crear el plan");
      }
    } catch (error) {
      console.error("Error al crear el plan:", error);
    }
  }

  
  

  const reloadData = () => {
    setReload((prev) => !prev);
  };
  return {
    plans,
    reloadData,
    createNewPlan,
  };
};

export default usePlan;
