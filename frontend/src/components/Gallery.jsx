import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)

  const categories = [
    { id: 'all', name: 'All Photos', icon: '📸' },
    { id: 'shop', name: 'Shop Interior', icon: '🏠' },
    { id: 'work', name: 'Our Work', icon: '✂️' },
    { id: 'team', name: 'Team', icon: '👥' }
  ]

  const galleryImages = [
    {
      id: 1,
      category: 'shop',
      title: 'Premium Barber Chairs',
      description: 'Luxury leather chairs for ultimate comfort',
      thumbnail: 'https://picsum.photos/400/300?random=1'
    },
    {
      id: 2,
      category: 'shop',
      title: 'Modern Reception',
      description: 'Welcoming space with premium amenities',
      thumbnail: 'https://picsum.photos/400/300?random=2'
    },
    {
      id: 3,
      category: 'shop',
      title: 'Grooming Station',
      description: 'Professional equipment for perfect cuts',
      thumbnail: 'https://picsum.photos/400/300?random=3'
    },
    {
      id: 4,
      category: 'work',
      title: 'Classic Fade',
      description: 'Precision fade with modern styling',
      thumbnail: 'https://picsum.photos/400/300?random=4'
    },
    {
      id: 5,
      category: 'work',
      title: 'Beard Design',
      description: 'Professional beard shaping service',
      thumbnail: 'https://picsum.photos/400/300?random=5'
    },
    {
      id: 6,
      category: 'work',
      title: 'Hot Towel Shave',
      description: 'Traditional luxury shaving experience',
      thumbnail: 'https://picsum.photos/400/300?random=6'
    },
    {
      id: 7,
      category: 'work',
      title: 'Executive Package',
      description: 'Complete grooming transformation',
      thumbnail: 'https://picsum.photos/400/300?random=7'
    },
    {
      id: 8,
      category: 'team',
      title: 'Master Barbers',
      description: 'Our expert team in action',
      thumbnail: 'https://picsum.photos/400/300?random=8'
    },
    {
      id: 9,
      category: 'team',
      title: 'Training Session',
      description: 'Continuous skill development',
      thumbnail: 'https://picsum.photos/400/300?random=9'
    }
  ]

  const filteredImages = galleryImages.filter(image => {
    if (selectedCategory === 'all') return true
    return image.category === selectedCategory
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, var(--primary-black) 0%, var(--secondary-black) 100%)' }}>
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="display-2 fw-bold mb-4" style={{ color: 'var(--accent-gold)' }}>
              Our Gallery
            </h1>
            <p className="lead" style={{ color: 'var(--text-secondary)' }}>
              Showcase of our premium services and expert work
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4">
        <div className="container">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`btn ${
                    selectedCategory === category.id 
                      ? 'btn-gold' 
                      : 'btn-outline-gold'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="me-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="col-md-6 col-lg-4 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="glass-card gallery-item h-100">
                  <div 
                    className="gallery-image-container"
                    onClick={() => setSelectedImage(image)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={image.thumbnail}
                      alt={image.title}
                      className="img-fluid gallery-image"
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    <div className="gallery-overlay">
                      <div className="gallery-overlay-content">
                        <h6 className="text-white mb-2">{image.title}</h6>
                        <p className="text-white mb-0 small">{image.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h6 className="text-gold mb-2">{image.title}</h6>
                    <p className="text-secondary small mb-0">{image.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          className="image-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h5 className="text-gold mb-2">{selectedImage.title}</h5>
                <p className="text-secondary mb-0">{selectedImage.description}</p>
              </div>
              <button 
                className="btn btn-outline-gold btn-sm"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>
            <img
              src={selectedImage.thumbnail}
              alt={selectedImage.title}
              className="img-fluid rounded"
              style={{ maxHeight: '500px' }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Gallery Styles */}
      <style jsx>{`
        .gallery-item {
          overflow: hidden;
        }
        
        .gallery-image-container {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
        }
        
        .gallery-image {
          transition: transform 0.3s ease;
        }
        
        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .gallery-image-container:hover .gallery-overlay {
          opacity: 1;
        }
        
        .gallery-overlay-content {
          padding: 1rem;
          text-align: center;
        }
        
        .image-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: pointer;
        }
        
        .modal-content {
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: 15px;
          padding: 1.5rem;
          max-width: 90%;
          max-height: 90%;
          overflow: auto;
        }
      `}</style>
    </motion.div>
  )
}

export default Gallery
