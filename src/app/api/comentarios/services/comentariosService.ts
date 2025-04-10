import { FormattedComentarios } from './../../../../util/types';


  
  export const guardarComentarios = async (data: FormattedComentarios) => {
console.log(data);

    try {
      const response = await fetch("/api/comentarios", {
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
  