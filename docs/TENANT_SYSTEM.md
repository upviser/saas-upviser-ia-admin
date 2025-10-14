# Sistema de Tenants

Este documento explica el sistema de tenants implementado para el registro de usuarios.

## Funcionalidades Implementadas

### 1. **Campo Subdominio en Registro**
- ✅ Agregado campo de subdominio en la página de registro
- ✅ Validación en tiempo real de disponibilidad
- ✅ Formato automático (solo letras, números y guiones)
- ✅ Verificación de longitud mínima (3 caracteres)

### 2. **API Routes**

#### **GET /api/tenants**
- Verifica disponibilidad de subdominio
- Parámetro: `?subdomain=mi-empresa`
- Respuesta: Array de tenants encontrados

#### **POST /api/tenants**
- Crea nuevo tenant
- Body: `{ tenantId: string, domain: string }`
- Valida que el subdominio no esté en uso

### 3. **Modelo Tenant**
```typescript
interface ITenant {
  _id: string
  tenantId: string
  domain: string        // ej: "mi-empresa.upviser.cl"
  subdomain: string     // ej: "mi-empresa"
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

## Flujo de Registro

### 1. **Usuario llena formulario**
- Nombre, email, contraseña, subdominio
- El subdominio se valida en tiempo real

### 2. **Verificación de disponibilidad**
- Se hace GET a `/api/tenants?subdomain=mi-empresa`
- Si no existe, el subdominio está disponible

### 3. **Creación de cuenta**
- Se genera `tenantId` único
- Se crea usuario con `tenantId`
- Se crea tenant con dominio `mi-empresa.upviser.cl`

### 4. **Inicio de sesión**
- Usuario se autentica automáticamente
- Todas las peticiones incluyen `x-tenant-id` header

## Validaciones Implementadas

### **Subdominio**
- ✅ Mínimo 3 caracteres
- ✅ Solo letras, números y guiones
- ✅ No puede estar en uso
- ✅ Se convierte automáticamente a minúsculas

### **Dominio**
- ✅ Formato: `{subdomain}.upviser.cl`
- ✅ Verificación de unicidad
- ✅ Validación de formato

## Ejemplos de Uso

### **Subdominios Válidos**
- `mi-empresa` → `mi-empresa.upviser.cl`
- `tienda123` → `tienda123.upviser.cl`
- `mi-tienda-online` → `mi-tienda-online.upviser.cl`

### **Subdominios Inválidos**
- `ab` (muy corto)
- `mi empresa` (espacios)
- `mi@empresa` (caracteres especiales)
- `mi-empresa` (ya en uso)

## Configuración del Backend

Para que funcione correctamente, el backend debe:

1. **Implementar middleware de tenant** para filtrar datos por `tenantId`
2. **Configurar DNS** para manejar subdominios dinámicos
3. **Implementar proxy** para redirigir subdominios al tenant correcto

## Próximos Pasos

1. **Configurar DNS wildcard** para `*.upviser.cl`
2. **Implementar proxy de subdominios** en el backend
3. **Agregar validaciones adicionales** (palabras reservadas, etc.)
4. **Implementar sistema de suspensión** de tenants
5. **Agregar métricas** de uso por tenant
