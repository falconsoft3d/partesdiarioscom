import { CreateEmpleadoConfig } from "@/util/types";

export const guardarEmpleadoConfig = async (data: CreateEmpleadoConfig) => {
    console.log("ssss");
    
    try {
        const response = await fetch('/api/empleado-config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        console.log(response);
        
        if (!response.ok) throw new Error('Error saving data');
        
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Save failed:', error);
        throw error;
    }
  };