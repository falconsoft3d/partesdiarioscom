export interface FormattedUser {
    id?: number;
    login:string;
    password:string;
    url:string;
}

export interface FormattedUserNew {
  id?: number;
  usuario:string;
  password:string;
  url:string;
}

export interface FormattedComentarios {
  id?: number;
  comentario:string;
  id_usuario:number;
  createdDate:Date;
}

export interface FormattedFotos {
  id?: number;
  foto:string;
  observacion:string;
  id_usuario:number;
  createdDate:Date;
}

export interface FormattedChangePW {
    "login":string;
    "password":string;
    "new-password":string;
    "conf-new-password"?:string;
}

export interface ApiResponse {
    jsonrpc: string;
    id:string;
    result:ResultResponse;
    
}
export interface ResultResponse {
status:string
}

export interface AuthContextProps {
    isAuthenticated: boolean
    user: {
      partesDiarios_usuario: string
      partesDiarios_contrasena: string
      partesDiarios_url: string
     
    }
    token: string | null
    login: (
      partesDiarios_usuario: string,
      partesDiarios_contrasena: string,
      partesDiarios_url: string,
     
    ) => void
    logout: () => void
  }

  export interface Empleado {
    id: number;
    nombre: string;
    edad?: number;
    puesto?: string;
  } 


  /**
 * Representa la configuración principal del sistema con sus relaciones
 */
export interface IConfiguracion {
  /**
   * ID único de la configuración (autoincremental)
   */
  id: number;
  
  /**
   * ID relacionado a ODT (Orden de Trabajo)
   */
  odtId: number;
  
  /**
   * ID relacionado a PSP (Proceso de Servicio Profesional)
   */
  pspId: number;
  
  /**
   * ID relacionado al presupuesto
   */
  budgetId: number;
  
  /**
   * Código identificador de la ODT
   */
  codeOdt: string;
  
  /**
   * Código identificador del PSP
   */
  codePsp: string;
  
  /**
   * Código identificador del presupuesto
   */
  codeBudget: string;
  
  /**
   * Nombre descriptivo de la configuración
   */
  denominacion: string;
  
  /**
   * ID del usuario relacionado (clave foránea)
   */
  userId: number;
}

/**
 * Tipo para crear una nueva configuración (sin el ID autogenerado)
 */
export type CreateConfig = Omit<IConfiguracion, 'id'>;

/**
 * Tipo para actualizar una configuración (todos los campos opcionales excepto el ID)
 */
export type UpdateConfig = Partial<CreateConfig> & { id: number };

export interface EmpleadoConfig {
  id: number;
  empleado_id: number;
  configuracion_id: number;
  valor: string;
  created_at?: Date;
}

export interface CreateEmpleadoConfig {
  empleado_id: number;
  configuracion_id: number;
  valor: string;
}