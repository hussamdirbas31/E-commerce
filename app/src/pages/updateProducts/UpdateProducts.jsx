import React, { useContext, useEffect } from 'react'
import Context from '../../context/Context'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const UpdateProducts = () => {
  const context = useContext(Context)
  const { mode, products, setProducts, updateProduct, loading } = context
  const { id } = useParams()
  const navigate = useNavigate()

  // Colors matching the design system
  const colors = {
    primary: '#800020',
    primaryHover: '#5c0018',
    background: mode === 'light' ? '#f9f9f9' : '#0a0a0a',
    text: mode === 'light' ? '#333333' : '#f5f5f5',
    inputBg: mode === 'light' ? '#ffffff' : '#1a1a1a',
    inputBorder: mode === 'light' ? '#e0e0e0' : '#2a2a2a',
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProduct(products)
  }

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0)
  }, [])

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ 
        backgroundColor: colors.background,
        overflow: 'hidden'
      }}
    >
      <div 
        className="w-full h-full flex items-center justify-center p-6"
      >
        <div 
          className="w-full max-w-2xl bg-opacity-90 p-8 rounded-xl shadow-2xl"
          style={{
            backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(20, 20, 20, 0.95)',
            border: `1px solid ${colors.inputBorder}`,
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <h1 
            className="text-center text-3xl font-bold mb-8"
            style={{ color: colors.primary }}
          >
            Update Product
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div>
                  <label className="block mb-2" style={{ color: colors.text }}>Product Title</label>
                  <input
                    type="text"
                    onChange={(e) => setProducts({ ...products, title: e.target.value })}
                    value={products.title}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-opacity-50 transition-all"
                    style={{
                      backgroundColor: colors.inputBg,
                      borderColor: colors.inputBorder,
                      color: colors.text,
                      outline: 'none',
                      focusRing: colors.primary
                    }}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2" style={{ color: colors.text }}>Price</label>
                  <input
                    type="number"
                    name="price"
                    onChange={(e) => setProducts({ ...products, price: e.target.value })}
                    value={products.price}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-opacity-50 transition-all"
                    style={{
                      backgroundColor: colors.inputBg,
                      borderColor: colors.inputBorder,
                      color: colors.text,
                      outline: 'none',
                      focusRing: colors.primary
                    }}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2" style={{ color: colors.text }}>Image URL</label>
                  <input
                    type="url"
                    name="imageurl"
                    onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                    value={products.imageUrl}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-opacity-50 transition-all"
                    style={{
                      backgroundColor: colors.inputBg,
                      borderColor: colors.inputBorder,
                      color: colors.text,
                      outline: 'none',
                      focusRing: colors.primary
                    }}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block mb-2" style={{ color: colors.text }}>Category</label>
                  <input
                    type="text"
                    name="category"
                    onChange={(e) => setProducts({ ...products, category: e.target.value })}
                    value={products.category}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-opacity-50 transition-all"
                    style={{
                      backgroundColor: colors.inputBg,
                      borderColor: colors.inputBorder,
                      color: colors.text,
                      outline: 'none',
                      focusRing: colors.primary
                    }}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2" style={{ color: colors.text }}>Description</label>
                  <textarea
                    rows="5"
                    name="description"
                    onChange={(e) => setProducts({ ...products, description: e.target.value })}
                    value={products.description}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-opacity-50 transition-all"
                    style={{
                      backgroundColor: colors.inputBg,
                      borderColor: colors.inputBorder,
                      color: colors.text,
                      outline: 'none',
                      focusRing: colors.primary
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 rounded-lg font-bold transition-all hover:opacity-90"
                style={{
                  backgroundColor: colors.inputBorder,
                  color: colors.text
                }}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg font-bold text-lg transition-all hover:opacity-90"
                style={{
                  backgroundColor: loading ? colors.inputBorder : colors.primary,
                  color: '#ffffff'
                }}
              >
                {loading ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProducts