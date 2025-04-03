export interface FormattedUser {
    id: number;
    login:string;
    password:string;
    url:string;
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