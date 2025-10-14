import axios from 'axios'
import { getSession } from 'next-auth/react'

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar el header x-tenant-id automáticamente
apiClient.interceptors.request.use(
  async (config) => {
    // Solo agregar el header si estamos en el cliente
    if (typeof window !== 'undefined') {
      const session = await getSession()
      if (session?.tenantId) {
        config.headers['x-tenant-id'] = session.tenantId
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar respuestas
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Manejar errores de autenticación
    if (error.response?.status === 401) {
      // Redirigir al login si no está autenticado
      if (typeof window !== 'undefined') {
        window.location.href = '/ingresar'
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
