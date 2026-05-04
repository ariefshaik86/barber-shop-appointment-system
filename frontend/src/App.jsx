import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import CustomerBooking from './components/CustomerBooking'
import AdminDashboard from './components/AdminDashboard'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import SimpleTest from './components/SimpleTest'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const location = useLocation()

  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 }
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  }

 return (
  <>
    <ErrorBoundary>
      <Navbar />

      <main className="page-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <Home />
              </motion.div>
            } />

            <Route path="/booking" element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <CustomerBooking />
              </motion.div>
            } />

            <Route path="/admin" element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <AdminDashboard />
              </motion.div>
            } />

            <Route path="/about" element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <About />
              </motion.div>
            } />

            <Route path="/services" element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <Services />
              </motion.div>
            } />

            <Route path="/gallery" element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <Gallery />
              </motion.div>
            } />

            <Route path="/contact" element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <Contact />
              </motion.div>
            } />

            <Route path="/test" element={
              <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                <SimpleTest />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </ErrorBoundary>

    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="dark"
    />
  </>
);
    
      

  
}

export default App
