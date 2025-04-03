import { FormattedChangePW } from "./types"

export const validateUserField = (name: string, value: string) => {
    let error = ''
  
    switch (name) {
      case 'login':
        if (!value) {
          error = 'El correo es obligatorio'
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Correo electrónico no válido'
        }
  
        break
      case 'password':
        if (!value) {
            error = 'La contraseña es obligatoria'
          } else if (value.length < 6) {
            error = 'La contraseña debe tener al menos 6 caracteres'
          }
  
        break
      case 'url':
        if (!value) {
          error = 'La URL es obligatoria'
        }
  
        break
      default:
        break
    }
  
    return error
  }



  export const validateChangePWField = (name: string, value: string,formData: FormattedChangePW) => {
    let error = ''
  
    switch (name) {
      case 'login':
        if (!value) {
          error = 'El correo es obligatorio'
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Correo electrónico no válido'
        }
  
        break
      case 'password':
        if (!value) {
            error = 'La contraseña actual es obligatoria'
          } else if (value.length < 6) {
            error = 'La contraseña debe tener al menos 6 caracteres'
          }
  
        break
      case 'new-password':
        if (!value) {
          error = 'La contraseña es obligatoria'
        } else if (value.length < 6) {
          error = 'La contraseña debe tener al menos 6 caracteres'
        }
  
        break
        case 'conf-new-password':
          if (value !== formData["new-password"]) {
            error = 'Las contraseñas no coinciden'
          }
          break
      default:
        break
    }
  
    return error
  }