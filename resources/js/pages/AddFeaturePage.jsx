import { useState } from 'react'
import { createFeature } from '../api/featureApi'

export default function AddFeaturePage({ onAdded }) {
  const [form, setForm] = useState({
    title: '',
    description: ''
  })

  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (!file) return

    setImageFile(file)
    setPreview(URL.createObjectURL(file))

    console.log('Selected file:', file)
  }

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      alert('Please enter a title')
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()

      formData.append('title', form.title)
      formData.append('description', form.description)

      if (imageFile) {
        formData.append('image', imageFile)
      }

      console.log('===== FORMDATA =====')

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1])
      }

      const response = await createFeature(formData)

      console.log('API Response:', response)

      alert('Feature added successfully!')

      setForm({
        title: '',
        description: ''
      })

      setImageFile(null)
      setPreview('')

      if (onAdded) {
        onAdded()
      }
    } catch (error) {
      console.error(error)

      alert(
        error?.response?.data?.message ||
        error?.message ||
        'Failed to save feature'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#2178e1',
        padding: '40px 20px'
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}
      >
        <h1
          style={{
            fontSize: '42px',
            fontWeight: '700',
            marginBottom: '30px',
            color: '#fff'
          }}
        >
          Add Feature
        </h1>

        <div
          style={{
            background: '#fff',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,.15)'
          }}
        >
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Feature Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value
                })
              }
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <textarea
              rows="5"
              placeholder="Feature Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value
                })
              }
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {preview && (
            <div
              style={{
                marginBottom: '20px'
              }}
            >
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: '100%',
                  maxHeight: '250px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  border: '1px solid #ddd'
                }}
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              background: '#4f46e5',
              color: '#fff',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Saving...' : 'Save Feature'}
          </button>
        </div>
      </div>
    </div>
  )
}