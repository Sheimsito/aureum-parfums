import { CartProvider } from './context/CartContext'
import { NavigationProvider, useNavigation } from './context/NavigationContext'
import { LandingPage } from './pages/LandingPage'
import { CatalogPage } from './pages/CatalogPage'
import { AboutPage } from './pages/AboutPage'
import './App.css'

function AppContent() {
  const { page } = useNavigation()

  if (page === 'catalog') return <CatalogPage />
  if (page === 'about') return <AboutPage />
  return <LandingPage />
}

function App() {
  return (
    <CartProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </CartProvider>
  )
}

export default App
