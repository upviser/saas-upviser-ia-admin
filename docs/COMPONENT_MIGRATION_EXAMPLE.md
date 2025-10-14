# Ejemplo de Migración de Componentes

Este documento muestra cómo migrar componentes existentes para usar el sistema multi-tenant.

## Antes (Componente Original)

```tsx
import axios from 'axios'

export const NewCategoryModal = () => {
  const generateDescription = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ai-description-category`, {
      description: newCategoryData.category,
      type: type === 'Personalizado' ? newType : type
    })
    // ... resto del código
  }

  const handleSubmit = async (e: any) => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, newCategoryData)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    // ... resto del código
  }
}
```

## Después (Componente Migrado)

```tsx
import apiClient from '@/utils/axiosConfig'

export const NewCategoryModal = () => {
  const generateDescription = async () => {
    const response = await apiClient.post('/ai-description-category', {
      description: newCategoryData.category,
      type: type === 'Personalizado' ? newType : type
    })
    // ... resto del código
  }

  const handleSubmit = async (e: any) => {
    await apiClient.post('/categories', newCategoryData)
    const response = await apiClient.get('/categories')
    // ... resto del código
  }
}
```

## Cambios Requeridos

### 1. Importación
```tsx
// Antes
import axios from 'axios'

// Después
import apiClient from '@/utils/axiosConfig'
```

### 2. Peticiones HTTP
```tsx
// Antes
await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/endpoint`, data)

// Después
await apiClient.post('/endpoint', data)
```

### 3. Headers Personalizados
```tsx
// Antes
await axios.post('/endpoint', data, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

// Después
await apiClient.post('/endpoint', data, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
```

## Beneficios de la Migración

1. **Header Automático**: El header `x-tenant-id` se agrega automáticamente
2. **Manejo de Errores**: Interceptor automático para errores 401
3. **Consistencia**: Todas las peticiones usan la misma configuración
4. **Seguridad**: Aislamiento automático por tenant

## Componentes que Necesitan Migración

Basado en la búsqueda en el código, estos componentes necesitan ser migrados:

- `components/ui/NewCategoryModal.tsx`
- `components/design/PopupNewCall.tsx`
- `components/layouts/Navbar.tsx`
- `components/product/CategoryProduct.tsx`
- Y todos los demás que usen `axios` directamente

## Script de Migración Automática

Puedes usar este script para migrar automáticamente los imports:

```bash
# Buscar y reemplazar imports de axios
find components -name "*.tsx" -exec sed -i 's/import axios from '\''axios'\''/import apiClient from '\''@\/utils\/axiosConfig'\''/g' {} \;

# Buscar y reemplazar llamadas a axios
find components -name "*.tsx" -exec sed -i 's/axios\./apiClient\./g' {} \;

# Remover URLs completas
find components -name "*.tsx" -exec sed -i 's/`\${process\.env\.NEXT_PUBLIC_API_URL}\/`//g' {} \;
```
