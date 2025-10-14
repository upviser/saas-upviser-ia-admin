import { getServerSession } from "next-auth/next"
import NextAuth from "next-auth"

// Función para hacer peticiones desde el servidor con tenantId
export async function apiRequest(url: string, options: RequestInit = {}) {
  const session = await getServerSession()
  
  const headers = {
    'Content-Type': 'application/json',
    ...(session?.tenantId && { 'x-tenant-id': session.tenantId }),
    ...options.headers,
  }

  return fetch(url, {
    ...options,
    headers,
  })
}

// Función para hacer peticiones desde el cliente
export function clientApiRequest(url: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  return fetch(url, {
    ...options,
    headers,
  })
}

// Hook para usar en componentes del cliente
export function useApiRequest() {
  return {
    apiRequest: clientApiRequest,
  }
}
