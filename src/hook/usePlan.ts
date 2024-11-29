import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  getPlans,
  createPlan,
  deletePlan,
  incrementAmount,
  editPlan,
} from "../service/PlanServices";

const MySwal = withReactContent(Swal);

export interface Plan {
  id: number;
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
        console.warn("No se obtuvieron datos de planes");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

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

  const deletePlans = async (id: string) => {
    try {
      const data = await deletePlan(id);

      if (data) {
        await MySwal.fire({
          title: "¡Éxito!",
          text: "El plan se eliminó exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.warn("No se pudo eliminar el plan");
      }
    } catch (error) {
      console.error("Error al eliminar el plan:", error);
      await MySwal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Error desconocido",
        icon: "error",
      });
    }
  };

  const incrementAmounts = async (id: string, amount: number) => {
    try {
      const success = await incrementAmount(id, amount);
      if (success) {
        await MySwal.fire({
          title: "¡Éxito!",
          text: "El monto se incrementó exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        reloadData();
      } else {
        throw new Error("No se pudo incrementar el monto.");
      }
    } catch (error) {
      console.error("Error al incrementar el monto:", error);
      await MySwal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Error desconocido",
        icon: "error",
      });
    }
  };

  const editPlanData = async (id: Plan["id"], updatedPlan: Plan) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas guardar los cambios realizados en este Plan?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar cambios",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await editPlan(id, updatedPlan);
        Swal.fire("Guardado!", "Los cambios han sido guardados.", "success");
        const planData = await getPlans();
        setPlans(planData);
      } catch (error) {
        Swal.fire("Error!", "No se pudieron guardar los cambios.", "error");
        console.error("Error al editar el Plan:", error);
      }
    } else {
      Swal.fire("Cancelado", "Los cambios no han sido guardados", "info");
    }
  };

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  return {
    plans,
    reloadData,
    createNewPlan,
    handleSubmit,
    deletePlans,
    incrementAmounts,
    editPlanData,
  };
};

export default usePlan;
