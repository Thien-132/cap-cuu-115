import { supabase } from "./supabase";

export interface BookingRequest {
  id: string;
  name: string;
  phone: string;
  address: string;
  details: string;
  serviceType: string;
  createdAt: string;
  status: "new" | "processing" | "completed" | "cancelled" | "fake";
  price?: number;
}

export interface PhoneHistory {
  phone: string;
  totalBookings: number;
  cancellations: number;
  fakeReports: number;
  isBlocked: boolean;
  lastUpdated?: string;
}

export interface Ambulance {
  id: string;
  licensePlate: string;
  type: string;
  status: "available" | "in_use" | "maintenance";
}

export interface Nurse {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: "active" | "inactive";
}

// --- SYNC ENGINE ---
let isSyncing = false;

export async function syncWithSupabase() {
  if (typeof window === "undefined" || isSyncing) return;
  isSyncing = true;

  try {
    // Fetch all tables
    const [reqsRes, ambRes, nurRes, phoneRes] = await Promise.all([
      supabase.from("booking_requests").select("*").order("createdAt", { ascending: false }),
      supabase.from("ambulances").select("*"),
      supabase.from("nurses").select("*"),
      supabase.from("phone_history").select("*"),
    ]);

    if (reqsRes.data) {
      localStorage.setItem("admin_booking_requests", JSON.stringify(reqsRes.data));
    }

    if (ambRes.data) {
      localStorage.setItem("admin_ambulances", JSON.stringify(ambRes.data));
    }
    if (nurRes.data) {
      localStorage.setItem("admin_nurses", JSON.stringify(nurRes.data));
    }
    if (phoneRes.data) {
      localStorage.setItem("admin_phone_history", JSON.stringify(phoneRes.data));
    }

    window.dispatchEvent(new Event("admin_store_update"));
  } catch (err) {
    console.error("Error syncing with Supabase:", err);
  } finally {
    isSyncing = false;
  }
}

// Start sync on load
if (typeof window !== "undefined") {
  syncWithSupabase();
}

// --- BOOKING REQUESTS ---

export function getBookingRequests(): BookingRequest[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("admin_booking_requests");
  if (data) {
    try {
      return JSON.parse(data) as BookingRequest[];
    } catch (e) {
      return [];
    }
  }
  return [];
}

export async function addBookingRequest(
  request: Omit<BookingRequest, "id" | "createdAt" | "status">,
) {
  if (typeof window === "undefined") return;

  // Check if phone is blocked
  const isBlocked = await checkPhoneBlock(request.phone);
  if (isBlocked) {
    throw new Error("BLOCKED_PHONE");
  }

  // Khởi tạo lịch sử khách hàng với giá trị 0 nếu chưa có
  await initializePhoneHistory(request.phone);

  // Create object (without ID, Supabase will generate UUID)
  const newRequest = {
    ...request,
    status: "new" as const,
  };

  // Optimistic update locally with temporary ID
  const tempRequest: BookingRequest = {
    ...newRequest,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
  };

  const requests = getBookingRequests();
  requests.unshift(tempRequest);
  localStorage.setItem("admin_booking_requests", JSON.stringify(requests));
  window.dispatchEvent(new Event("admin_store_update"));

  // Push to Supabase
  const { data, error } = await supabase
    .from("booking_requests")
    .insert([newRequest])
    .select()
    .single();
  if (!error && data) {
    // Replace temp with real data
    const finalRequests = getBookingRequests().map((r) => (r.id === tempRequest.id ? data : r));
    localStorage.setItem("admin_booking_requests", JSON.stringify(finalRequests));
    window.dispatchEvent(new Event("admin_store_update"));
  }
}

export async function updateBookingStatus(
  id: string,
  status: BookingRequest["status"],
  price?: number,
) {
  if (typeof window === "undefined") return;

  // Optimistic
  const requests = getBookingRequests();
  const index = requests.findIndex((r) => r.id === id);
  let targetPhone = "";

  if (index !== -1) {
    targetPhone = requests[index].phone;
    requests[index].status = status;
    if (price !== undefined) {
      requests[index].price = price;
    }
    localStorage.setItem("admin_booking_requests", JSON.stringify(requests));
    window.dispatchEvent(new Event("admin_store_update"));
  }

  // Supabase update
  if (!id.includes(".")) {
    // basic check to ensure it's not our random temp ID, though temp ID shouldn't be updated immediately
    const updateData: any = { status };
    if (price !== undefined) updateData.price = price;
    await supabase.from("booking_requests").update(updateData).eq("id", id);

    // Update phone history based on status
    if (targetPhone && (status === "completed" || status === "cancelled" || status === "fake")) {
      await updatePhoneHistoryRecord(targetPhone, status);
    }
  }
}

export async function deleteBookingRequest(id: string) {
  if (typeof window === "undefined") return;

  // Optimistic
  const requests = getBookingRequests().filter((r) => r.id !== id);
  localStorage.setItem("admin_booking_requests", JSON.stringify(requests));
  window.dispatchEvent(new Event("admin_store_update"));

  // Supabase
  await supabase.from("booking_requests").delete().eq("id", id);
}

// --- AMBULANCES ---

const INITIAL_AMBULANCES: Ambulance[] = [];

export function getAmbulances(): Ambulance[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("admin_ambulances");
  if (data) {
    try {
      return JSON.parse(data) as Ambulance[];
    } catch (e) {
      return INITIAL_AMBULANCES;
    }
  }
  localStorage.setItem("admin_ambulances", JSON.stringify(INITIAL_AMBULANCES));
  return INITIAL_AMBULANCES;
}

export async function saveAmbulance(ambulance: Ambulance | Omit<Ambulance, "id">) {
  if (typeof window === "undefined") return;
  const list = getAmbulances();

  let savedAmbulance: Ambulance;

  if ("id" in ambulance && ambulance.id) {
    // Update
    savedAmbulance = ambulance as Ambulance;
    const index = list.findIndex((a) => a.id === ambulance.id);
    if (index !== -1) {
      list[index] = savedAmbulance;
    }
    // Supabase
    await supabase.from("ambulances").update(savedAmbulance).eq("id", savedAmbulance.id);
  } else {
    // Create new
    savedAmbulance = {
      ...ambulance,
      id: Math.random().toString(36).substring(2, 9),
    };
    list.push(savedAmbulance);

    // Supabase (id will be regenerated by DB, but we do optimistic first)
    const { data, error } = await supabase.from("ambulances").insert([ambulance]).select().single();
    if (!error && data) {
      savedAmbulance = data;
      list[list.length - 1] = savedAmbulance;
    }
  }

  localStorage.setItem("admin_ambulances", JSON.stringify(list));
  window.dispatchEvent(new Event("admin_store_update"));
}

export async function deleteAmbulance(id: string) {
  if (typeof window === "undefined") return;
  const list = getAmbulances().filter((a) => a.id !== id);
  localStorage.setItem("admin_ambulances", JSON.stringify(list));
  window.dispatchEvent(new Event("admin_store_update"));

  // Supabase
  await supabase.from("ambulances").delete().eq("id", id);
}

// --- NURSES ---

const INITIAL_NURSES: Nurse[] = [];

export function getNurses(): Nurse[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("admin_nurses");
  if (data) {
    try {
      return JSON.parse(data) as Nurse[];
    } catch (e) {
      return INITIAL_NURSES;
    }
  }
  localStorage.setItem("admin_nurses", JSON.stringify(INITIAL_NURSES));
  return INITIAL_NURSES;
}

export async function saveNurse(nurse: Nurse | Omit<Nurse, "id">) {
  if (typeof window === "undefined") return;
  const list = getNurses();

  let savedNurse: Nurse;

  if ("id" in nurse && nurse.id) {
    savedNurse = nurse as Nurse;
    const index = list.findIndex((n) => n.id === nurse.id);
    if (index !== -1) {
      list[index] = savedNurse;
    }
    // Supabase
    await supabase.from("nurses").update(savedNurse).eq("id", savedNurse.id);
  } else {
    savedNurse = {
      ...nurse,
      id: Math.random().toString(36).substring(2, 9),
    };
    list.push(savedNurse);

    // Supabase
    const { data, error } = await supabase.from("nurses").insert([nurse]).select().single();
    if (!error && data) {
      savedNurse = data;
      list[list.length - 1] = savedNurse;
    }
  }

  localStorage.setItem("admin_nurses", JSON.stringify(list));
  window.dispatchEvent(new Event("admin_store_update"));
}

export async function deleteNurse(id: string) {
  if (typeof window === "undefined") return;
  const list = getNurses().filter((n) => n.id !== id);
  localStorage.setItem("admin_nurses", JSON.stringify(list));
  window.dispatchEvent(new Event("admin_store_update"));

  // Supabase
  await supabase.from("nurses").delete().eq("id", id);
}

// --- PHONE HISTORY ---

export function getPhoneHistory(): PhoneHistory[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("admin_phone_history");
  if (data) {
    try {
      return JSON.parse(data) as PhoneHistory[];
    } catch (e) {
      return [];
    }
  }
  return [];
}

export async function checkPhoneBlock(phone: string): Promise<boolean> {
  const history = getPhoneHistory();
  const record = history.find((h) => h.phone === phone);
  return record ? record.isBlocked : false;
}

export async function initializePhoneHistory(phone: string) {
  const historyList = getPhoneHistory();
  let record = historyList.find((h) => h.phone === phone);

  if (!record) {
    record = {
      phone,
      totalBookings: 0,
      cancellations: 0,
      fakeReports: 0,
      isBlocked: false,
      lastUpdated: new Date().toISOString(),
    };
    historyList.push(record);
    localStorage.setItem("admin_phone_history", JSON.stringify(historyList));
    window.dispatchEvent(new Event("admin_store_update"));

    const { error } = await supabase.from("phone_history").upsert({
      phone: record.phone,
      totalBookings: record.totalBookings,
      cancellations: record.cancellations,
      fakeReports: record.fakeReports,
      isBlocked: record.isBlocked,
      lastUpdated: record.lastUpdated,
    });
    if (error) console.error("Error initializing phone history", error);
  }
}

export async function updatePhoneHistoryRecord(
  phone: string,
  action: "completed" | "cancelled" | "fake",
) {
  const historyList = getPhoneHistory();
  let record = historyList.find((h) => h.phone === phone);

  if (!record) {
    record = {
      phone,
      totalBookings: 0,
      cancellations: 0,
      fakeReports: 0,
      isBlocked: false,
    };
    historyList.push(record);
  }

  if (action === "completed") record.totalBookings += 1;
  if (action === "cancelled") record.cancellations += 1;
  if (action === "fake") {
    record.fakeReports += 1;
    // Tự động chặn nếu >= 3 lần báo giả
    if (record.fakeReports >= 3) {
      record.isBlocked = true;
    }
  }

  record.lastUpdated = new Date().toISOString();
  localStorage.setItem("admin_phone_history", JSON.stringify(historyList));
  window.dispatchEvent(new Event("admin_store_update"));

  // Sync with Supabase (Upsert logic)
  const { error } = await supabase.from("phone_history").upsert({
    phone: record.phone,
    totalBookings: record.totalBookings,
    cancellations: record.cancellations,
    fakeReports: record.fakeReports,
    isBlocked: record.isBlocked,
    lastUpdated: record.lastUpdated,
  });
  if (error) console.error("Error upserting phone history", error);
}

export async function togglePhoneBlock(phone: string, isBlocked: boolean) {
  const historyList = getPhoneHistory();
  let record = historyList.find((h) => h.phone === phone);
  if (!record) {
    record = { phone, totalBookings: 0, cancellations: 0, fakeReports: 0, isBlocked };
    historyList.push(record);
  } else {
    record.isBlocked = isBlocked;
  }

  record.lastUpdated = new Date().toISOString();
  localStorage.setItem("admin_phone_history", JSON.stringify(historyList));
  window.dispatchEvent(new Event("admin_store_update"));

  const { error } = await supabase.from("phone_history").upsert({
    phone: record.phone,
    isBlocked: record.isBlocked,
    lastUpdated: record.lastUpdated,
  });
  if (error) console.error("Error toggling phone block", error);
}
