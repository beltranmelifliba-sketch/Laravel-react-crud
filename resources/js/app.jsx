import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import FeatureListPage from './pages/FeatureListPage'
import FeaturePage from './pages/FeaturePage'
import AddFeaturePage from './pages/AddFeaturePage'
import { getFeatures } from './api/featureApi'
import '../css/app.css'

function App() {
  const [page, setPage] = useState('home')
  const [features, setFeatures] = useState([])
  const [selectedFeatureId, setSelectedFeatureId] = useState(null)
  const [featureKey, setFeatureKey] = useState(0)

  // 🔄 FETCH FEATURES (used for refresh after delete/add)
  const fetchFeatures = async () => {
    try {
      const res = await getFeatures()
      setFeatures(res.data)
    } catch (error) {
      console.error('Fetch features error:', error)
    }
  }

  useEffect(() => {
    fetchFeatures()
  }, [featureKey])

  // ➕ refresh after add
  const handleFeatureAdded = () => {
    setFeatureKey(k => k + 1)
    setPage('features')
  }

  // 👀 view feature
  const handleViewFeature = (id) => {
    setSelectedFeatureId(id)
    setPage('feature')
  }

  // 🗑️ DELETE SUCCESS HANDLER (IMPORTANT FIX)
  const handleFeatureDeleted = () => {
    setFeatureKey(k => k + 1)   // refresh list
    setPage('features')         // go back list page
  }

  return (
    <div className="min-h-[120vh] bg-gray-50">
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-6">
          <img src="/assets/TMlogo.png" className="w-40" alt="Logo" />

          <ul className="hidden md:flex gap-10 font-semibold text-gray-800">
            <button
              onClick={() => setPage('home')}
              className={`font-semibold transition-all ${page === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Home
            </button>

            <button
              onClick={() => setPage('features')}
              className={`font-semibold transition-all ${page === 'features' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Features
            </button>

            <button
              onClick={() => setPage('add-feature')}
              className={`font-semibold transition-all ${page === 'add-feature' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Add Feature
            </button>

            <li><a href="#" className="hover:text-blue-600 transition">About</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Pages</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Blog</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Contact</a></li>
          </ul>
        </div>
      </nav>

      <div className={page !== 'home' ? 'pt-32 max-w-6xl mx-auto p-8' : ''}>
        {page === 'home' && <Home onViewFeature={handleViewFeature} />}

        {page === 'features' && (
          <FeatureListPage
            features={features}
            onDeleted={handleFeatureDeleted}   // 🔥 FIXED
            onViewFeature={handleViewFeature}
          />
        )}

        {page === 'feature' && (
          <FeaturePage
            featureId={selectedFeatureId}
            onBack={() => setPage('features')}
            onDeleted={handleFeatureDeleted}  // 🔥 FIXED
          />
        )}

        {page === 'add-feature' && (
          <AddFeaturePage onAdded={handleFeatureAdded} />
        )}
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)