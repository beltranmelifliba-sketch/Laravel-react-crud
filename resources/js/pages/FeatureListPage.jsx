import { useState } from 'react'
import { deleteFeature } from '../api/featureApi'

export default function FeatureListPage({ features = [], onDeleted, onViewFeature }) {
  const [deleteId, setDeleteId] = useState(null)

  const confirmDelete = async () => {
    await deleteFeature(deleteId)
    setDeleteId(null)
    onDeleted()
  }

  const getImageUrl = (feature) => {
    return (
      feature.image_url ||
      feature.image ||
      feature.featured_image ||
      feature.imageUrl ||
      feature.thumbnail ||
      feature._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
      ''
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f5f5',
        padding: '30px 20px'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '32px',
            fontWeight: '700',
            color: '#222'
          }}
        >
          Features
        </h1>

        {features.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              color: '#777'
            }}
          >
            No features found.
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}
          >
            {features.map((feature) => {
              const imageUrl = getImageUrl(feature)

              return (
                <div
                  key={feature.id}
                  style={{
                    background: '#fff',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer'
                  }}
                  onClick={() => onViewFeature && onViewFeature(feature.id)}
                >
                  {/* IMAGE */}
                  <div
                    style={{
                      height: '220px',
                      background: '#f9fafb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={feature.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          console.log('Image failed:', imageUrl)
                          e.target.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          color: '#999',
                          fontSize: '14px'
                        }}
                      >
                        No Image Available
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div
                    style={{
                      padding: '20px',
                      flex: 1
                    }}
                  >
                    <h3
                      style={{
                        margin: '0 0 10px',
                        fontSize: '20px',
                        color: '#222'
                      }}
                    >
                      {feature.title}
                    </h3>

                    <p
                      style={{
                        color: '#666',
                        lineHeight: '1.6',
                        margin: 0
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div
                    style={{
                      padding: '15px',
                      borderTop: '1px solid #eee',
                      display: 'flex',
                      gap: '10px',
                      justifyContent: 'center'
                    }}
                  >
                    <button
                      onClick={() => onViewFeature && onViewFeature(feature.id)}
                      style={{
                        background: '#3b82f6',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 18px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      View
                    </button>
                 
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {deleteId && (
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

              <p>
                Are you sure you want to delete this feature?
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px'
                }}
              >
                <button
                  onClick={() => setDeleteId(null)}
                  style={{
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  style={{
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}