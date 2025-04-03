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
      userName: string
      userFirstName: string
      userLastName: string
      roleName: string
      foto: string
      state: number
      clientID: number
    }
    token: string | null
    login: (
      userName: string,
      userFirstName: string,
      userLastName: string,
      roleName: string,
      token: string,
      foto: string,
      state: number,
      clientID: number | 0
    ) => void
    logout: () => void
  }