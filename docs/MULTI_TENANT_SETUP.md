# Configuración Multi-Tenant

Este documento explica cómo está configurado el sistema multi-tenant y cómo usarlo.

## Cambios Realizados

### 1. Modelo ShopLogin
- ✅ Agregado campo `tenantId` al modelo `ShopLogin`
- ✅ Campo requerido para identificar el tenant de cada usuario

### 2. NextAuth Configuration
- ✅ Modificado `app/api/auth/[...nextauth]/route.ts` para incluir `tenantId` en la sesión
- ✅ Actualizado `interfaces/next-auth.d.ts` para tipar el `tenantId` en la sesión

### 3. Middleware
- ✅ Creado `middleware.ts` que agrega automáticamente el header `x-tenant-id` a todas las peticiones
- ✅ Protege rutas que requieren autenticación

### 4. Utilidades
- ✅ `hooks/useTenant.ts` - Hook para acceder al tenantId en componentes
- ✅ `utils/apiClient.ts` - Funciones para hacer peticiones con tenantId
- ✅ `utils/axiosConfig.ts` - Configuración de axios con interceptor automático
- ✅ `utils/backendMiddleware.ts` - Ejemplos de middleware para el backend

## Cómo Usar

### En Componentes del Cliente
```tsx
import { useTenant } from '../hooks/useTenant'
import apiClient from '../utils/axiosConfig'

export default function MyComponent() {
  const { tenantId, isAuthenticated } = useTenant()
  
  const fetchData = async () => {
    // El header x-tenant-id se agrega automáticamente
    const response = await apiClient.get('/api/data')
    return response.data
  }
  
  return (
    <div>
      {isAuthenticated && <p>Tenant ID: {tenantId}</p>}
    </div>
  )
}
```

### En Server Components
```tsx
import { apiRequest } from '../utils/apiClient'

export default async function ServerComponent() {
  // El tenantId se obtiene de la sesión automáticamente
  const response = await apiRequest('/api/data')
  const data = await response.json()
  
  return <div>{data}</div>
}
```

### En API Routes
```tsx
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const tenantId = request.headers.get('x-tenant-id')
  
  if (!tenantId) {
    return Response.json({ error: 'Tenant ID requerido' }, { status: 400 })
  }
  
  // Usar tenantId para filtrar datos
  const data = await getDataByTenant(tenantId)
  return Response.json(data)
}
```

## Configuración del Backend

### 1. Middleware de Tenant
```javascript
const tenantMiddleware = (req, res, next) => {
  const tenantId = req.headers['x-tenant-id'];
  
  if (!tenantId) {
    return res.status(400).json({ 
      error: 'Header x-tenant-id es requerido' 
    });
  }
  
  req.tenantId = tenantId;
  next();
};
```

### 2. Filtrado Automático por Tenant
```javascript
const filterByTenant = (Model) => {
  return (req, res, next) => {
    const originalFind = Model.find;
    
    Model.find = function(query = {}, ...args) {
      query.tenantId = req.tenantId;
      return originalFind.call(this, query, ...args);
    };
    
    next();
  };
};
```

### 3. Uso en Rutas
```javascript
app.use('/api', tenantMiddleware);
app.use('/api/categories', filterByTenant(Category));
app.use('/api/products', filterByTenant(Product));
```

## Migración de Datos

Para migrar datos existentes al sistema multi-tenant:

1. **Asignar tenantId a usuarios existentes**:
```javascript
// Script de migración
const users = await ShopLogin.find({ tenantId: { $exists: false } });
for (const user of users) {
  user.tenantId = generateTenantId(); // Tu lógica para generar ID
  await user.save();
}
```

2. **Agregar tenantId a todos los modelos**:
```javascript
// Ejemplo para el modelo Category
const CategorySchema = new mongoose.Schema({
  tenantId: { type: String, required: true },
  name: String,
  // ... otros campos
});
```

## Consideraciones de Seguridad

1. **Validación de Tenant**: Siempre validar que el usuario solo acceda a datos de su tenant
2. **Headers Requeridos**: Todas las peticiones deben incluir el header `x-tenant-id`
3. **Filtrado Automático**: Implementar filtrado automático en el backend para prevenir acceso cruzado entre tenants

## Próximos Pasos

1. Implementar el middleware en el backend Node.js
2. Migrar todos los modelos para incluir `tenantId`
3. Actualizar todas las consultas de base de datos para filtrar por tenant
4. Probar el sistema con múltiples tenants
5. Implementar políticas de aislamiento de datos
