import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getPlans, createPlan } from "../service/PlanServices";

const MySwal = withReactContent(Swal);

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
  const [plans, setPlans] = useState<Plan[]>([]); // Array vacío inicialmente
  const [reload, setReload] = useState<boolean>(false);

  // Obtener datos al cargar o al cambiar `reload`
  useEffect(() => {
    fetchData();
  }, [reload]);

  // Función para obtener planes
  const fetchData = async () => {
    try {
      const data = await getPlans();
      if (data) {
        setPlans(data);
      } else {
        console.warn("No se obtuvieron datos de planes");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  // Crear un nuevo plan
  const createNewPlan = async (newPlan: Plan) => {
    try {
      const data = await createPlan(newPlan);
      if (data) {
        await MySwal.fire({
          title: "¡Éxito!",
          text: "El plan se creó exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        reloadData();
      } else {
        console.warn("No se pudo crear el plan");
      }
    } catch (error) {
      console.error("Error al crear el plan:", error);
      await MySwal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Error desconocido",
        icon: "error",
      });
    }
  };

  // Confirmar y manejar la creación de un plan
  const handleSubmit = async (newPlan: Plan, onClose: () => void) => {
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres agregar este plan?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await createNewPlan(newPlan);
      onClose();
    }
  };

  // Recargar datos
  const reloadData = () => {
    setReload((prev) => !prev);
  };

  return {
    plans,
    reloadData,
    createNewPlan,
    handleSubmit,
  };
};

export default usePlan;
