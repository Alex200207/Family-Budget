import { useState, useEffect } from "react";
import { getUsers} from "../service/UserService";


export interface Usuario{
  id: number;
  nombres: string;
  apellidos: string;
  rol:number;
}


const usePlan = () => {
  const [users, setUser] = useState<Usuario[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      const data = await getUsers();
      if (data) {
        setUser(data);
      } else {
        console.warn("No se obtuvieron datos de usuarios");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const reloadData = () => {
    setReload((prev) => !prev);
  };
  return {
    users,
    reloadData,
  };
};

export default usePlan;
