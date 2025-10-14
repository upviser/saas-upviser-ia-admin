// Este archivo contiene ejemplos de middleware para el backend Node.js
// que debe implementarse en tu servidor backend

export const tenantMiddleware = `
// Middleware para extraer tenantId del header x-tenant-id
const tenantMiddleware = (req, res, next) => {
  const tenantId = req.headers['x-tenant-id'];
  
  if (!tenantId) {
    return res.status(400).json({ 
      error: 'Header x-tenant-id es requerido' 
    });
  }
  
  // Agregar tenantId al objeto request para uso posterior
  req.tenantId = tenantId;
  next();
};

// Middleware para filtrar datos por tenant
const filterByTenant = (Model) => {
  return (req, res, next) => {
    const originalFind = Model.find;
    const originalFindOne = Model.findOne;
    const originalFindById = Model.findById;
    
    // Interceptar métodos de consulta para agregar filtro por tenant
    Model.find = function(query = {}, ...args) {
      query.tenantId = req.tenantId;
      return originalFind.call(this, query, ...args);
    };
    
    Model.findOne = function(query = {}, ...args) {
      query.tenantId = req.tenantId;
      return originalFindOne.call(this, query, ...args);
    };
    
    Model.findById = function(id, ...args) {
      return originalFindOne.call(this, { _id: id, tenantId: req.tenantId }, ...args);
    };
    
    next();
  };
};

// Ejemplo de uso en rutas:
// app.use('/api', tenantMiddleware);
// app.use('/api/categories', filterByTenant(Category));
// app.use('/api/products', filterByTenant(Product));
`;

export const databaseConfig = `
// Configuración de base de datos multi-tenant
// Opción 1: Una base de datos por tenant (recomendado para escalabilidad)
const getTenantDB = (tenantId) => {
  return mongoose.createConnection(\`mongodb://localhost/tenant_\${tenantId}\`);
};

// Opción 2: Una base de datos con filtrado por tenantId
const connectToMainDB = () => {
  return mongoose.connect(process.env.MONGODB_URI);
};

// Middleware para seleccionar la base de datos correcta
const selectTenantDB = (req, res, next) => {
  req.db = getTenantDB(req.tenantId);
  next();
};
`;
