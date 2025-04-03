import { useRouter } from 'next/navigation' // Importa el router de Next.js para redirigir

import type { InternalAxiosRequestConfig, AxiosError } from 'axios'
import axios from 'axios'

import Swal from 'sweetalert2'

import { useAuth } from '../context/AuthContext' // Importa el hook para obtener el token

// Define un tipo para la respuesta de error
interface ErrorResponse {
  message: string

  // Agrega otras propiedades según la respuesta de error que esperas
}

const useHttpCustomService = () => {
  const { token, logout } = useAuth() // Obtén el token y la función de logout del contexto de autenticación
  const router = useRouter() // Inicializa el router

  // Crea una instancia de axios con configuración personalizada
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_DEV || 'https://test-codemon.demos-odoo.com',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Interceptor para agregar el token a cada solicitud
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (token !== null || token !== '') {
        console.log('Token presente:', token) // Añade esto para depurar
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  // Interceptor para manejar errores
  axiosInstance.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      const { response } = error

      // Manejo de errores
      console.log(response)

      if (response) {
        if (response.status === 401) {
          // Si el error es 401 (no autorizado), redirige al login
          Swal.fire({
            title: 'Sesión expirada, por favor inicia sesión nuevamente',
            icon: 'warning',
            toast: true,
            position: 'top-end',
            showCloseButton: true,
            timer: 3000,
            timerProgressBar: true
          })

          logout() // Opcional: Llama a la función de logout para limpiar el estado
          router.push('/login') // Redirige al usuario a la página de login
        } else {
          const errorData = response.data as ErrorResponse // Aplica el tipo definido

          Swal.fire({
            title: 'IVM.httpError: ' + (errorData.message || 'Error desconocido'),
            icon: 'error',
            position: 'top-end', // Cambia la posición según lo necesites
            toast: true,
            showCloseButton: true,
            timer: 3000,
            timerProgressBar: true
          })
        }
      }

      return Promise.reject(error)
    }
  )

  // Métodos HTTP con axios
  const get = async <T>(url: string, config?: Partial<InternalAxiosRequestConfig>): Promise<T> => {
    const response = await axiosInstance.get<T>(url, config)

    return response.data
  }

  const post = async <T, D>(url: string, data: D): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data)

    return response.data // Aquí response.data debería tener el tipo correcto
  }

  const postData = async <T, D>(url: string, data: D, config?: Partial<InternalAxiosRequestConfig>): Promise<T> => {
    const headers = {
      ...config?.headers,
      'Content-Type': 'multipart/form-data'
    }

    const response = await axiosInstance.post<T>(url, data, {
      ...config,
      headers
    })

    return response.data
  }

  const put = async <T, D>(url: string, data: D): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data)

    return response.data // Aquí response.data debería tener el tipo correcto
  }

  const remove = async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.delete<T>(url)

    return response.data // Aquí response.data debería tener el tipo correcto
  }

  return { get, post, postData, put, delete: remove }
}

export default useHttpCustomService
