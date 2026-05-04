import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const About = () => {
  const [activeTab, setActiveTab] = useState('story')

  const team = [
    {
      name: 'Rajesh Kumar',
      position: 'Master Barber',
      experience: '15+ years',
      specialty: 'Traditional & Modern Cuts',
      image: '👨‍🦰',
      bio: 'Expert in classic cuts with modern styling techniques. Trained in London and Paris.',
      certifications: ['Master Barber Certification', 'Advanced Styling Diploma'],
      specialties: ['Classic Fade', 'Modern Texturing', 'Beard Design']
    },
    {
      name: 'Amit Sharma',
      position: 'Senior Barber',
      experience: '10+ years',
      specialty: 'Beard Design & Styling',
      image: '🧔‍♂️',
      bio: 'Specialist in beard grooming and facial hair styling. Precision artist with attention to detail.',
      certifications: ['Beard Styling Expert', 'Men\'s Grooming Specialist'],
      specialties: ['Beard Sculpting', 'Hot Towel Shave', 'Facial Treatments']
    },
    {
      name: 'Vikram Singh',
      position: 'Expert Barber',
      experience: '8+ years',
      specialty: 'Hot Towel Shaves',
      image: '👨‍🦱',
      bio: 'Traditional shaving expert with modern techniques. Luxury experience specialist.',
      certifications: ['Traditional Shaving Master', 'Luxury Grooming Certificate'],
      specialties: ['Hot Towel Shave', 'Straight Razor', 'Facial Massage']
    },
    {
      name: 'Karan Patel',
      position: 'Barber',
      experience: '5+ years',
      specialty: 'Kids & Family Cuts',
      image: '👨‍🦰',
      bio: 'Family-friendly barber with patience and skill. Great with kids of all ages.',
      certifications: ['Family Grooming Specialist', 'Child-Friendly Service'],
      specialties: ['Kids Cuts', 'Family Packages', 'Quick Trims']
    }
  ]

  const milestones = [
    { year: '2011', achievement: 'Established Premium Barber Shop', description: 'Started with a single chair and a vision for excellence' },
    { year: '2015', achievement: 'Expanded to 8 expert barbers', description: 'Grew our team with talented professionals' },
    { year: '2018', achievement: 'Served 10,000+ happy customers', description: 'Reached a major milestone in customer satisfaction' },
    { year: '2021', achievement: 'Introduced luxury grooming packages', description: 'Added premium services for discerning clients' },
    { year: '2024', achievement: 'Launched online booking system', description: 'Modernized our booking experience for convenience' },
    { year: '2026', achievement: 'Awarded Best Barber Shop', description: 'Recognized for exceptional service and quality' }
  ]

  const awards = [
    { name: 'Best Barber Shop 2026', organization: 'City Business Awards', icon: '🏆' },
    { name: 'Excellence in Service', organization: 'Customer Choice Awards', icon: '⭐' },
    { name: 'Top Rated Grooming', organization: 'Industry Professionals', icon: '👑' }
  ]

  const tabs = [
    { id: 'story', label: 'Our Story', icon: '📖' },
    { id: 'team', label: 'Our Team', icon: '👥' },
    { id: 'mission', label: 'Mission', icon: '🎯' },
    { id: 'awards', label: 'Awards', icon: '🏆' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Helmet>
        <title>About Us - Premium Barber Shop</title>
        <meta name="description" content="Learn about Premium Barber Shop - our story, expert team, and commitment to excellence in grooming services." />
      </Helmet>

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
              About Premium Barber Shop
            </h1>
            <p className="lead mb-4" style={{ color: 'var(--text-secondary)' }}>
              Where Tradition Meets Modern Excellence in Grooming
            </p>
            <div className="glass-card d-inline-block">
              <p className="mb-0">
                Founded in 2011, Premium Barber Shop has been the cornerstone of 
                quality grooming in our community. We blend traditional barbering techniques 
                with modern styles to deliver exceptional experiences for every client.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-4">
        <div className="container">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`btn ${
                    activeTab === tab.id 
                      ? 'btn-gold' 
                      : 'btn-outline-gold'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="me-2">{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'story' && (
          <motion.div
            key="story"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <section className="py-5">
              <div className="container">
                <div className="row align-items-center">
                  <motion.div
                    className="col-md-6"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="mb-4" style={{ color: 'var(--accent-gold)' }}>Our Story</h2>
                    <div className="glass-card">
                      <p className="mb-3">
                        Premium Barber Shop began as a small chair in 2011 with a simple mission: 
                        provide exceptional grooming services that make every client feel confident and look their best.
                      </p>
                      <p className="mb-3">
                        Over the years, we've grown from a single-chair operation to a premier 
                        grooming destination, serving thousands of satisfied customers across the city.
                      </p>
                      <p>
                        Our commitment to quality, hygiene, and customer satisfaction has remained unchanged 
                        since day one. We believe that every haircut is not just a service - it's an 
                        experience that should leave you feeling refreshed and confident.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="col-md-6"
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="mb-4" style={{ color: 'var(--accent-gold)' }}>Our Values</h2>
                    <div className="glass-card">
                      <div className="mb-3">
                        <h5 className="text-gold mb-2">🎯 Excellence</h5>
                        <p>We never compromise on quality. Every service is delivered with precision and attention to detail.</p>
                      </div>
                      <div className="mb-3">
                        <h5 className="text-gold mb-2">🤝 Trust</h5>
                        <p>Building lasting relationships with our clients through consistent, reliable service.</p>
                      </div>
                      <div className="mb-3">
                        <h5 className="text-gold mb-2">🌟 Innovation</h5>
                        <p>Combining traditional techniques with modern trends and premium products.</p>
                      </div>
                      <div>
                        <h5 className="text-gold mb-2">❤️ Care</h5>
                        <p>Every client deserves personalized attention and a comfortable, welcoming atmosphere.</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'team' && (
          <motion.div
            key="team"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <section className="py-5" style={{ background: 'rgba(212, 175, 55, 0.05)' }}>
              <div className="container">
                <motion.div
                  className="text-center mb-5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="mb-4" style={{ color: 'var(--accent-gold)' }}>Meet Our Expert Team</h2>
                  <p className="lead" style={{ color: 'var(--text-secondary)' }}>
                    Talented professionals dedicated to your grooming needs
                  </p>
                </motion.div>

                <div className="row g-4">
                  {team.map((member, index) => (
                    <motion.div
                      key={member.name}
                      className="col-md-6"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <div className="glass-card h-100">
                        <div className="text-center mb-3">
                          <div style={{ fontSize: '4rem' }}>{member.image}</div>
                        </div>
                        <h4 className="text-center mb-2" style={{ color: 'var(--accent-gold)' }}>
                          {member.name}
                        </h4>
                        <p className="text-center text-secondary mb-2">{member.position}</p>
                        <p className="text-center mb-3">
                          <span className="badge bg-gold text-dark px-3 py-2">
                            {member.experience} experience
                          </span>
                        </p>
                        <p className="text-center text-secondary mb-3">{member.bio}</p>
                        <div className="text-center">
                          <h6 className="text-gold mb-2">Certifications:</h6>
                          <div className="mb-2">
                            {member.certifications.map((cert, i) => (
                              <span key={i} className="badge bg-secondary me-1 mb-1">{cert}</span>
                            ))}
                          </div>
                          <h6 className="text-gold mb-2">Specialties:</h6>
                          <div>
                            {member.specialties.map((spec, i) => (
                              <span key={i} className="badge bg-gold text-dark me-1 mb-1">{spec}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'mission' && (
          <motion.div
            key="mission"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <section className="py-5">
              <div className="container">
                <motion.div
                  className="text-center mb-5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="mb-4" style={{ color: 'var(--accent-gold)' }}>Our Mission & Vision</h2>
                  <p className="lead" style={{ color: 'var(--text-secondary)' }}>
                    Guiding principles that drive our commitment to excellence
                  </p>
                </motion.div>

                <div className="row g-4">
                  <motion.div
                    className="col-md-6"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="glass-card h-100">
                      <h3 className="text-gold mb-3">🎯 Our Mission</h3>
                      <p className="mb-3">
                        To provide exceptional grooming services that exceed client expectations 
                        through skilled craftsmanship, premium products, and personalized attention.
                      </p>
                      <ul className="list-unstyled">
                        <li className="mb-2">✓ Deliver consistent, high-quality service</li>
                        <li className="mb-2">✓ Create a welcoming, comfortable atmosphere</li>
                        <li className="mb-2">✓ Stay current with industry trends and techniques</li>
                        <li className="mb-2">✓ Build lasting relationships with our clients</li>
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div
                    className="col-md-6"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="glass-card h-100">
                      <h3 className="text-gold mb-3">🌟 Our Vision</h3>
                      <p className="mb-3">
                        To be the premier destination for men's grooming in our community, 
                        setting the standard for excellence and innovation in barber services.
                      </p>
                      <ul className="list-unstyled">
                        <li className="mb-2">✓ Lead the industry in service quality</li>
                        <li className="mb-2">✓ Expand our services and offerings</li>
                        <li className="mb-2">✓ Train the next generation of master barbers</li>
                        <li className="mb-2">✓ Give back to our community</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'awards' && (
          <motion.div
            key="awards"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <section className="py-5" style={{ background: 'rgba(212, 175, 55, 0.05)' }}>
              <div className="container">
                <motion.div
                  className="text-center mb-5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="mb-4" style={{ color: 'var(--accent-gold)' }}>Awards & Recognition</h2>
                  <p className="lead" style={{ color: 'var(--text-secondary)' }}>
                    Honored for our commitment to excellence
                  </p>
                </motion.div>

                <div className="row g-4 mb-5">
                  {awards.map((award, index) => (
                    <motion.div
                      key={award.name}
                      className="col-md-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <div className="glass-card text-center h-100">
                        <div className="mb-3" style={{ fontSize: '3rem' }}>{award.icon}</div>
                        <h5 className="text-gold mb-2">{award.name}</h5>
                        <p className="text-secondary">{award.organization}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="mb-4" style={{ color: 'var(--accent-gold)' }}>Our Journey</h3>
                  <p className="lead mb-4" style={{ color: 'var(--text-secondary)' }}>
                    Key milestones in our growth story
                  </p>
                </motion.div>

                <div className="row g-4">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      className="col-md-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <div className="glass-card text-center h-100">
                        <div className="text-gold fw-bold mb-2" style={{ fontSize: '2rem' }}>
                          {milestone.year}
                        </div>
                        <h6 className="text-gold mb-2">{milestone.achievement}</h6>
                        <p className="text-secondary small">{milestone.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default About
