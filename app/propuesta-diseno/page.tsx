"use client"
import { useState, useEffect } from 'react'
import { 
  FiTrendingUp, 
  FiUsers, 
  FiDollarSign, 
  FiShoppingCart, 
  FiBarChart, 
  FiSettings, 
  FiBell, 
  FiSearch,
  FiMenu,
  FiX,
  FiChevronRight,
  FiActivity,
  FiTarget,
  FiZap,
  FiGlobe,
  FiMail,
  FiMessageCircle,
  FiCalendar,
  FiFileText,
  FiPieChart,
  FiRefreshCw,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiDownload,
  FiUpload,
  FiFilter,
  FiGrid,
  FiList,
  FiStar,
  FiHeart,
  FiShare2,
  FiCopy,
  FiExternalLink,
  FiLock,
  FiUnlock,
  FiShield,
  FiAward,
  FiGift,
  FiTruck,
  FiCreditCard,
  FiSmartphone,
  FiMonitor,
  FiTablet,
  FiWifi,
  FiCloud,
  FiDatabase,
  FiServer,
  FiCpu,
  FiHardDrive,
  FiLayers,
  FiBox,
  FiPackage,
  FiTag,
  FiPercent,
  FiTrendingDown,
  FiMinus,
  FiCheck,
  FiX as FiXIcon,
  FiAlertCircle,
  FiInfo,
  FiCheckCircle,
  FiClock,
  FiCalendar as FiCalendarIcon,
  FiMapPin,
  FiPhone,
  FiMail as FiMailIcon,
  FiUser,
  FiUserCheck,
  FiUserX,
  FiUserPlus,
  FiLogOut,
  FiLogIn,
  FiKey,
  FiEye as FiEyeIcon,
  FiEyeOff,
  FiSun,
  FiMoon,
  FiToggleLeft,
  FiToggleRight,
  FiVolume2,
  FiVolumeX,
  FiPlay,
  FiPause,
  FiSkipForward,
  FiSkipBack,
  FiRepeat,
  FiShuffle,
  FiMaximize,
  FiMinimize,
  FiMove,
  FiRotateCw,
  FiRotateCcw,
  FiZoomIn,
  FiZoomOut,
  FiCamera,
  FiImage,
  FiVideo,
  FiMusic,
  FiHeadphones,
  FiMic,
  FiMicOff,
  FiRadio,
  FiTv,
  FiBook,
  FiBookOpen,
  FiBookmark,
  FiArchive,
  FiFolder,
  FiFolderPlus,
  FiFolderMinus,
  FiFile,
  FiFilePlus,
  FiFileMinus
} from 'react-icons/fi'

export default function PropuestaDiseno() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [animatedNumbers, setAnimatedNumbers] = useState({
    revenue: 0,
    users: 0,
    orders: 0,
    conversion: 0
  })

  const stats = [
    { 
      title: 'Ingresos Totales', 
      value: '$2,847,392', 
      change: '+12.5%', 
      trend: 'up',
      icon: FiDollarSign,
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      title: 'Usuarios Activos', 
      value: '24,847', 
      change: '+8.2%', 
      trend: 'up',
      icon: FiUsers,
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      title: 'Órdenes', 
      value: '1,847', 
      change: '+15.3%', 
      trend: 'up',
      icon: FiShoppingCart,
      color: 'from-purple-500 to-pink-600'
    },
    { 
      title: 'Tasa de Conversión', 
      value: '3.24%', 
      change: '+2.1%', 
      trend: 'up',
      icon: FiTarget,
      color: 'from-orange-500 to-red-600'
    }
  ]

  const recentActivities = [
    { id: 1, type: 'sale', user: 'María González', action: 'Completó una compra', amount: '$299', time: '2 min ago', status: 'success' },
    { id: 2, type: 'user', user: 'Carlos Ruiz', action: 'Se registró en la plataforma', amount: '', time: '5 min ago', status: 'info' },
    { id: 3, type: 'support', user: 'Ana Martínez', action: 'Envió un mensaje de soporte', amount: '', time: '12 min ago', status: 'warning' },
    { id: 4, type: 'sale', user: 'Luis Pérez', action: 'Inició un pago', amount: '$149', time: '18 min ago', status: 'pending' },
    { id: 5, type: 'review', user: 'Sofia Chen', action: 'Dejó una reseña 5 estrellas', amount: '', time: '25 min ago', status: 'success' }
  ]

  const quickActions = [
    { title: 'Nuevo Producto', icon: FiPlus, color: 'bg-blue-500' },
    { title: 'Ver Estadísticas', icon: FiBarChart, color: 'bg-green-500' },
    { title: 'Gestionar Usuarios', icon: FiUsers, color: 'bg-purple-500' },
    { title: 'Configuración', icon: FiSettings, color: 'bg-orange-500' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
    setAnimatedNumbers(prev => ({
      revenue: Math.min(prev.revenue + 1000, 2847392),
      users: Math.min(prev.users + 50, 24847),
      orders: Math.min(prev.orders + 10, 1847),
      conversion: Math.min(prev.conversion + 0.01, 3.24)
    }))
  }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50 backdrop-blur-lg bg-opacity-95`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiMenu className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <FiZap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    AdminPro
                  </h1>
                  <p className="text-sm text-gray-500">Panel Administrativo</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className={`pl-10 pr-4 py-2 rounded-xl border-0 ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all`}
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <FiBell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Dark Mode Toggle */}
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">JD</span>
                </div>
                <div className="hidden md:block">
                  <p className="font-semibold">Jorge Tapia</p>
                  <p className="text-sm text-gray-500">Administrador</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed lg:translate-x-0 z-40 w-64 h-full ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r border-gray-200 dark:border-gray-700 transition-transform duration-300`}>
          <div className="p-6">
            <div className="space-y-2">
              {[
                { name: 'Dashboard', icon: FiBarChart, active: true },
                { name: 'Productos', icon: FiPackage },
                { name: 'Usuarios', icon: FiUsers },
                { name: 'Ventas', icon: FiDollarSign },
                { name: 'Analytics', icon: FiTrendingUp },
                { name: 'Mensajes', icon: FiMessageCircle },
                { name: 'Configuración', icon: FiSettings }
              ].map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    item.active 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {item.active && <FiChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">¡Bienvenido de vuelta! 👋</h2>
            <p className="text-gray-600 dark:text-gray-400">Aquí tienes un resumen de tu negocio hoy</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1">
                    {stat.trend === 'up' ? (
                      <FiTrendingUp className="w-4 h-4" />
                    ) : (
                      <FiTrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-white text-opacity-80">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center p-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{action.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Actividad Reciente</h3>
                <button className="text-blue-500 hover:text-blue-600 font-medium">Ver todo</button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.status === 'success' ? 'bg-green-100 text-green-600' :
                      activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      activity.status === 'info' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {activity.type === 'sale' && <FiDollarSign className="w-5 h-5" />}
                      {activity.type === 'user' && <FiUser className="w-5 h-5" />}
                      {activity.type === 'support' && <FiMessageCircle className="w-5 h-5" />}
                      {activity.type === 'review' && <FiStar className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    {activity.amount && (
                      <span className="font-semibold text-green-600">{activity.amount}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Rendimiento</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium">7D</button>
                  <button className="px-3 py-1 text-gray-500 rounded-lg text-sm">30D</button>
                  <button className="px-3 py-1 text-gray-500 rounded-lg text-sm">90D</button>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                <div className="text-center">
                  <FiBarChart className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Gráfico de rendimiento</p>
                  <p className="text-sm text-gray-500">Los datos se cargarán aquí</p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6">Características Avanzadas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* AI Insights */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <FiZap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold">IA Insights</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Análisis inteligente de tus datos con recomendaciones automáticas</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Optimización de precios detectada</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Oportunidad de venta identificada</span>
                  </div>
                </div>
              </div>

              {/* Real-time Analytics */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <FiActivity className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold">Analytics en Tiempo Real</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Monitoreo en vivo de métricas y KPIs importantes</p>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">+23</div>
                    <div className="text-xs text-gray-500">Usuarios online</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">$1.2k</div>
                    <div className="text-xs text-gray-500">Ventas hoy</div>
                  </div>
                </div>
              </div>

              {/* Automation Hub */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <FiTarget className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold">Centro de Automatización</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Automatiza tareas repetitivas y mejora la eficiencia</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Marketing</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Seguimiento de Leads</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
