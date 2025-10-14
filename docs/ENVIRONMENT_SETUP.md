# Configuración de Entorno

Para solucionar los problemas de callback URL, asegúrate de tener estas variables de entorno configuradas:

## Variables de Entorno Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=tu-clave-secreta-aqui

# API Configuration  
NEXT_PUBLIC_API_URL=http://localhost:4000

# Facebook SDK (si lo usas)
NEXT_PUBLIC_FB_APP_ID=tu-facebook-app-id
```

## Solución de Problemas de Callback URL

### 1. Verificar NEXTAUTH_URL
Asegúrate de que `NEXTAUTH_URL` coincida con el puerto que estás usando:
- Si usas `localhost:3001` → `NEXTAUTH_URL=http://localhost:3001`
- Si usas `localhost:3000` → `NEXTAUTH_URL=http://localhost:3000`

### 2. Verificar NEXTAUTH_SECRET
Genera una clave secreta segura:
```bash
openssl rand -base64 32
```

### 3. Reiniciar el Servidor
Después de cambiar las variables de entorno:
```bash
npm run dev
# o
yarn dev
```

## Configuración de NextAuth

Los cambios realizados en `app/api/auth/[...nextauth]/route.ts` incluyen:

1. **Callback de redirección personalizado** para evitar callbacks problemáticos
2. **Estrategia de sesión JWT** para mejor rendimiento
3. **Configuración de secret** para seguridad

## Configuración del Navbar

Los cambios en `components/layouts/Navbar.tsx` incluyen:

1. **Rutas públicas definidas** para evitar redirecciones innecesarias
2. **Mejor manejo de rutas** de autenticación
3. **Prevención de bucles** de redirección

## Pruebas

Después de aplicar estos cambios:

1. Accede a `http://localhost:3001`
2. Deberías ver la página de inicio de sesión sin callbacks
3. Navega entre `/ingresar` y `/registro` sin problemas
4. Las redirecciones automáticas solo ocurren para rutas protegidas
