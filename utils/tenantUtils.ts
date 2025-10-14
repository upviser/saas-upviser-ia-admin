/**
 * Utilidades para manejo de tenants
 */

/**
 * Genera un tenantId único
 * Formato: tenant_[timestamp]_[random]
 */
export const generateTenantId = (): string => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 9)
  return `tenant_${timestamp}_${random}`
}

/**
 * Valida si un tenantId tiene el formato correcto
 */
export const isValidTenantId = (tenantId: string): boolean => {
  const tenantRegex = /^tenant_\d+_[a-z0-9]+$/
  return tenantRegex.test(tenantId)
}

/**
 * Extrae el timestamp de un tenantId
 */
export const getTenantTimestamp = (tenantId: string): number | null => {
  const match = tenantId.match(/^tenant_(\d+)_/)
  return match ? parseInt(match[1]) : null
}
