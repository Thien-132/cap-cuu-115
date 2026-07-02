export interface BookingRequest {
  id: string;
  name: string;
  phone: string;
  address: string;
  details: string;
  serviceType: string;
  createdAt: string;
  status: 'new' | 'processing' | 'completed' | 'cancelled';
  price?: number; // Optional price for completed services to calculate revenue
}

export interface Ambulance {
  id: string;
  licensePlate: string;
  type: string;
  status: 'available' | 'in_use' | 'maintenance';
}

export interface Nurse {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: 'active' | 'inactive';
}

// --- BOOKING REQUESTS ---

export function getBookingRequests(): BookingRequest[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('admin_booking_requests');
  if (data) {
    try {
      return JSON.parse(data) as BookingRequest[];
    } catch (e) {
      return [];
    }
  }
  return [];
}

export function addBookingRequest(request: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) {
  if (typeof window === 'undefined') return;
  const requests = getBookingRequests();
  const newRequest: BookingRequest = {
    ...request,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  requests.unshift(newRequest);
  localStorage.setItem('admin_booking_requests', JSON.stringify(requests));
  window.dispatchEvent(new Event('admin_store_update'));
}

export function updateBookingStatus(id: string, status: BookingRequest['status'], price?: number) {
  if (typeof window === 'undefined') return;
  const requests = getBookingRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index !== -1) {
    requests[index].status = status;
    if (price !== undefined) {
      requests[index].price = price;
    }
    localStorage.setItem('admin_booking_requests', JSON.stringify(requests));
    window.dispatchEvent(new Event('admin_store_update'));
  }
}

export function deleteBookingRequest(id: string) {
  if (typeof window === 'undefined') return;
  const requests = getBookingRequests().filter(r => r.id !== id);
  localStorage.setItem('admin_booking_requests', JSON.stringify(requests));
  window.dispatchEvent(new Event('admin_store_update'));
}

// --- AMBULANCES ---

const INITIAL_AMBULANCES: Ambulance[] = [
  { id: '1', licensePlate: '51F-123.45', type: 'Xe cấp cứu tiêu chuẩn', status: 'available' },
  { id: '2', licensePlate: '51F-678.90', type: 'Xe cứu thương ICU', status: 'in_use' },
  { id: '3', licensePlate: '51F-111.22', type: 'Xe chuyển viện', status: 'maintenance' },
];

export function getAmbulances(): Ambulance[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('admin_ambulances');
  if (data) {
    try {
      return JSON.parse(data) as Ambulance[];
    } catch (e) {
      return INITIAL_AMBULANCES;
    }
  }
  // Initialize with dummy data if empty
  localStorage.setItem('admin_ambulances', JSON.stringify(INITIAL_AMBULANCES));
  return INITIAL_AMBULANCES;
}

export function saveAmbulance(ambulance: Ambulance) {
  if (typeof window === 'undefined') return;
  const list = getAmbulances();
  const index = list.findIndex(a => a.id === ambulance.id);
  if (index >= 0) {
    list[index] = ambulance;
  } else {
    list.unshift(ambulance);
  }
  localStorage.setItem('admin_ambulances', JSON.stringify(list));
  window.dispatchEvent(new Event('admin_store_update'));
}

export function deleteAmbulance(id: string) {
  if (typeof window === 'undefined') return;
  const list = getAmbulances().filter(a => a.id !== id);
  localStorage.setItem('admin_ambulances', JSON.stringify(list));
  window.dispatchEvent(new Event('admin_store_update'));
}

// --- NURSES ---

const INITIAL_NURSES: Nurse[] = [
  { id: '1', name: 'Nguyễn Thị Hoa', role: 'Điều dưỡng trưởng', phone: '0901234567', status: 'active' },
  { id: '2', name: 'Trần Văn Bình', role: 'Nhân viên y tế', phone: '0901112223', status: 'active' },
];

export function getNurses(): Nurse[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('admin_nurses');
  if (data) {
    try {
      return JSON.parse(data) as Nurse[];
    } catch (e) {
      return INITIAL_NURSES;
    }
  }
  localStorage.setItem('admin_nurses', JSON.stringify(INITIAL_NURSES));
  return INITIAL_NURSES;
}

export function saveNurse(nurse: Nurse) {
  if (typeof window === 'undefined') return;
  const list = getNurses();
  const index = list.findIndex(n => n.id === nurse.id);
  if (index >= 0) {
    list[index] = nurse;
  } else {
    list.unshift(nurse);
  }
  localStorage.setItem('admin_nurses', JSON.stringify(list));
  window.dispatchEvent(new Event('admin_store_update'));
}

export function deleteNurse(id: string) {
  if (typeof window === 'undefined') return;
  const list = getNurses().filter(n => n.id !== id);
  localStorage.setItem('admin_nurses', JSON.stringify(list));
  window.dispatchEvent(new Event('admin_store_update'));
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith('admin_')) {
      window.dispatchEvent(new Event('admin_store_update'));
    }
  });
}
