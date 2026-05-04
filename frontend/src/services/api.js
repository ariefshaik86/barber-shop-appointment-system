import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Helper
const unwrap = (promise) => promise.then(res => res.data)

// ================= BOOKINGS =================
export const bookingsAPI = {
  getAll: () => unwrap(api.get('/bookings')),
  getById: (id) => unwrap(api.get(`/bookings/${id}`)),
  create: (booking) => unwrap(api.post('/bookings', booking)),

  // ✅ FINAL FIX (MATCHES YOUR BACKEND)
  updateStatus: (id, status) =>
    unwrap(api.put(`/bookings/${id}/status`, { status })),

  delete: (id) => unwrap(api.delete(`/bookings/${id}`)),
  getByStatus: (status) => unwrap(api.get(`/bookings/status/${status}`)),
  getByBarber: (barberName) => unwrap(api.get(`/bookings/barber/${barberName}`)),
}

// ================= BARBERS =================
export const barbersAPI = {
  getAll: () => unwrap(api.get('/barbers')),
  getById: (id) => unwrap(api.get(`/barbers/${id}`)),
  create: (barber) => unwrap(api.post('/barbers', barber)),
  delete: (id) => unwrap(api.delete(`/barbers/${id}`)),
}

// ================= SERVICES =================
export const servicesAPI = {
  getAll: () => unwrap(api.get('/services')),
  getById: (id) => unwrap(api.get(`/services/${id}`)),
  create: (service) => unwrap(api.post('/services', service)),
  update: (id, service) => unwrap(api.put(`/services/${id}`, service)),
  delete: (id) => unwrap(api.delete(`/services/${id}`)),
}

// ================= TIMESLOTS =================
export const timeSlotsAPI = {
  getAll: () => unwrap(api.get('/timeslots')),
  getById: (id) => unwrap(api.get(`/timeslots/${id}`)),
  create: (timeSlot) => unwrap(api.post('/timeslots', timeSlot)),
  toggleAvailability: (id) => unwrap(api.put(`/timeslots/${id}/toggle`)),
  delete: (id) => unwrap(api.delete(`/timeslots/${id}`)),
}

// ================= ERROR HANDLER =================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default api