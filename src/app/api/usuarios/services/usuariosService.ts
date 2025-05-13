import { FormattedUserNew } from './../../../../util/types';


  
  export const guardarUsuario = async (data: FormattedUserNew) => {

    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log(result);
      
      if (!response.ok) throw new Error(result.error || "Error al guardar usuario");
  
      return result;
    } catch (error) {
      console.error("Error en guardarUsuario:", error);
      throw error;
    }
  };
  

  export const modificarUsuario = async (id: number, data: Partial<FormattedUserNew>) => {
    try {
      const response = await fetch(`/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log(result);
  
      if (!response.ok) throw new Error(result.error || "Error al modificar usuario");
  
      return result;
    } catch (error) {
      console.error("Error en modificarUsuario:", error);
      throw error;
    }
  };