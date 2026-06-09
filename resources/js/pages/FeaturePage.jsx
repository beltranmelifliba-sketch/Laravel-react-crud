import { useEffect, useState } from 'react'
import { getFeature, deleteFeature } from '../api/featureApi'

export default function FeaturePage({ featureId, onBack, onDeleted }) {
  const [feature, setFeature] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    fetchFeature()
  }, [featureId])

  const fetchFeature = async () => {
    try {
      setLoading(true)
      const res = await getFeature(featureId)
      setFeature(res.data)
    } catch (error) {
      console.error('Fetch error:', error)
      alert('Failed to load feature')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteFeature(featureId)
      alert('Feature deleted successfully')
      if (onDeleted) {
        onDeleted()
      } else if (onBack) {
        onBack()
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete feature')
    }
    setShowDeleteConfirm(false)
  }

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        Loading...
      </div>
    )
  }

  if (!feature) return <div>Feature not found.</div>

  return (
    <div style={{ padding: '40px 20px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={onBack}
          style={{
            padding: '10px 20px',
            background: '#6b7280',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Back to Features
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          style={{
            padding: '10px 20px',
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Delete Feature
        </button>
      </div>

      <div
        style={{
          background: '#fff',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,.15)'
        }}
      >
        {feature.image_url ? (
          <img
            src={feature.image_url}
            alt={feature.title || 'Feature Image'}
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '20px'
            }}
            onError={(e) => {
              console.error('Image failed:', feature.image_url)
              e.target.style.display = 'none'
            }}
          />
        ) : (
          <div
            style={{
              marginBottom: '20px',
              padding: '20px',
              background: '#f3f4f6',
              textAlign: 'center',
              borderRadius: '10px'
            }}
          >
            No image available
          </div>
        )}

        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '15px'
          }}
        >
          {feature.title}
        </h1>

        <p
          style={{
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}
        >
          {feature.description}
        </p>

        {feature.category && (
          <p style={{ color: '#888', fontSize: '14px' }}>
            Category: {feature.category.name}
          </p>
        )}
      </div>

      {showDeleteConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '25px',
              borderRadius: '10px',
              width: '400px',
              maxWidth: '90%'
            }}
          >
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this feature?</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button onClick={handleDelete} style={{ background: '#ef4444', color: '#fff' }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}