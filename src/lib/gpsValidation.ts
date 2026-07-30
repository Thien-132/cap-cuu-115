import { z } from "zod";
import * as turf from "@turf/turf";

// ==========================================
// 1. CONFIGURATION & LAYERS
// ==========================================

// Hub/Dispatch Center Point (Trung tâm Cấp cứu 115 Hồng Hải - TP. Đồng Xoài)
export const DISPATCH_CENTER: [number, number] = [106.9167, 11.5333]; // [Longitude, Latitude]

// Geofencing Polygon (Bounding Box for All Vietnam Territory)
export const ALLOWED_REGION_POLYGON = turf.polygon([
  [
    [102.0, 8.0],
    [112.0, 8.0],
    [112.0, 24.0],
    [102.0, 24.0],
    [102.0, 8.0],
  ],
]);

export type ServiceType = "emergency" | "homecare" | "transfer";

// Free Pickup Radius (in Kilometers)
export const FREE_PICKUP_RADIUS_KM = 6; // Miễn phí cước xe đón bệnh nhân trong bán kính 5-6km

// Multi-layer Distance Limits (in Kilometers)
export const SERVICE_LIMITS_KM: Record<ServiceType, number> = {
  emergency: 30, // Khẩn cấp
  homecare: 200, // Điều dưỡng
  transfer: 1000, // Chuyển viện
};

// Safety buffer to handle GPS signal fluctuation jitter (50 meters)
export const GPS_JITTER_BUFFER_KM = 0.05;

// ==========================================
// 2. ZOD VALIDATION SCHEMAS
// ==========================================

export const GpsRequestSchema = z.object({
  lng: z.number().min(-180).max(180),
  lat: z.number().min(-90).max(90),
  serviceType: z.enum(["emergency", "homecare", "transfer"]),
});

export type GpsValidationResult =
  | { success: true; distance: number; isFreePickup: boolean; message: string }
  | {
      success: false;
      code: "VALIDATION_ERROR" | "VIOLATION_GEOFENCE" | "DISTANCE_EXCEEDED_LIMIT";
      distance?: number;
      limit?: number;
      isFreePickup?: boolean;
      message: string;
      details?: any;
    };

// ==========================================
// 3. ROBUST VALIDATION PIPELINE
// ==========================================

/**
 * Validates GPS coordinates based on Geofencing and Multi-layer distance restrictions.
 * Executes immediately to guard the dispatch logic.
 */
export function validateGpsRequest(
  userLng: number,
  userLat: number,
  serviceType: ServiceType,
): GpsValidationResult {
  // STEP 1: Geofencing
  const userPoint = turf.point([userLng, userLat]);
  const isInside = turf.booleanPointInPolygon(userPoint, ALLOWED_REGION_POLYGON);

  if (!isInside) {
    return {
      success: false,
      code: "VIOLATION_GEOFENCE",
      message: "Vị trí của bạn nằm ngoài khu vực phục vụ của chúng tôi.",
    };
  }

  // STEP 2 & 3: Multi-layer Distance Calculation & Immediate Restriction Guard
  const centerPoint = turf.point(DISPATCH_CENTER);

  // Calculate distance using precise Haversine algorithm provided by Turf
  const distanceKm = turf.distance(centerPoint, userPoint, { units: "kilometers" });

  const limitKm = SERVICE_LIMITS_KM[serviceType];
  const allowedDistanceKm = limitKm + GPS_JITTER_BUFFER_KM;

  const isFreePickup = distanceKm <= FREE_PICKUP_RADIUS_KM;

  // Strict check
  if (distanceKm >= allowedDistanceKm) {
    return {
      success: false,
      code: "DISTANCE_EXCEEDED_LIMIT",
      distance: Number(distanceKm.toFixed(3)),
      limit: limitKm,
      isFreePickup: false,
      message: "Khoảng cách vượt quá giới hạn quy định của dịch vụ.",
    };
  }

  return {
    success: true,
    distance: Number(distanceKm.toFixed(3)),
    isFreePickup,
    message: isFreePickup
      ? "🎁 Vị trí của bạn được MIỄN PHÍ 100% cước đón bệnh nhân (Dưới 6 km)!"
      : "Vị trí hợp lệ, sẵn sàng phục vụ.",
  };
}

// ==========================================
// 4. INTEGRATION EXAMPLE (EXPRESS MIDDLEWARE)
// ==========================================

/**
 * Sample Express middleware to immediately intercept and validate GPS coordinates
 * before passing the request to booking controllers.
 *
 * Usage in Route:
 *   import { validateGpsMiddleware } from './gpsValidation';
 *   router.post('/api/booking', validateGpsMiddleware, bookingController);
 */
export function validateGpsMiddleware(req: any, res: any, next: any) {
  try {
    // 1. Schema Validation
    const parsed = GpsRequestSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Dữ liệu tọa độ hoặc loại dịch vụ không hợp lệ.",
        details: parsed.error.issues,
      });
    }

    const { lng, lat, serviceType } = parsed.data;

    // 2. Run Robust GPS Validation Pipeline
    const validationResult = validateGpsRequest(lng, lat, serviceType);

    if (!validationResult.success) {
      // Return 403 Forbidden since business logic rules are violated
      return res.status(403).json(validationResult);
    }

    // 3. Attach calculated distance to request for downstream handlers
    req.validatedDistanceKm = validationResult.distance;

    // Move to actual booking logic
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi hệ thống khi xác thực tọa độ GPS.",
    });
  }
}

// ==========================================
// 5. SMART VIETNAMESE ADDRESS GEOCODER
// ==========================================

export interface GeocodeResult {
  lat: number;
  lng: number;
  displayName: string;
}

const LOCALITY_DICTIONARY: { keywords: string[]; lat: number; lng: number; name: string }[] = [
  { keywords: ["phạm văn đồng", "pham van dong"], lat: 10.8650, lng: 106.7725, name: "Đường Phạm Văn Đồng, TP. Thủ Đức, TP.HCM" },
  { keywords: ["thủ đức", "thu duc"], lat: 10.8494, lng: 106.7537, name: "TP. Thủ Đức, TP. Hồ Chí Minh" },
  { keywords: ["linh xuân", "linh xuan"], lat: 10.8841, lng: 106.7820, name: "Phường Linh Xuân, TP. Thủ Đức, TP.HCM" },
  { keywords: ["linh trung", "linh trung"], lat: 10.8686, lng: 106.7884, name: "Phường Linh Trung, TP. Thủ Đức, TP.HCM" },
  { keywords: ["hiệp bình chánh", "hiep binh chanh"], lat: 10.8350, lng: 106.7290, name: "Phường Hiệp Bình Chánh, TP. Thủ Đức" },
  { keywords: ["quận 1", "quan 1", "q1"], lat: 10.7756, lng: 106.7004, name: "Quận 1, TP. Hồ Chí Minh" },
  { keywords: ["quận 3", "quan 3", "q3"], lat: 10.7811, lng: 106.6858, name: "Quận 3, TP. Hồ Chí Minh" },
  { keywords: ["quận 5", "quan 5", "q5"], lat: 10.7540, lng: 106.6634, name: "Quận 5, TP. Hồ Chí Minh" },
  { keywords: ["quận 7", "quan 7", "q7"], lat: 10.7340, lng: 106.7218, name: "Quận 7, TP. Hồ Chí Minh" },
  { keywords: ["quận 10", "quan 10", "q10"], lat: 10.7719, lng: 106.6681, name: "Quận 10, TP. Hồ Chí Minh" },
  { keywords: ["quận 12", "quan 12", "q12"], lat: 10.8671, lng: 106.6413, name: "Quận 12, TP. Hồ Chí Minh" },
  { keywords: ["bình thạnh", "binh thanh"], lat: 10.8012, lng: 106.6983, name: "Quận Bình Thạnh, TP. Hồ Chí Minh" },
  { keywords: ["gò vấp", "go vap"], lat: 10.8387, lng: 106.6653, name: "Quận Gò Vấp, TP. Hồ Chí Minh" },
  { keywords: ["tân bình", "tan binh"], lat: 10.8014, lng: 106.6545, name: "Quận Tân Bình, TP. Hồ Chí Minh" },
  { keywords: ["tân phú", "tan phu"], lat: 10.7905, lng: 106.6280, name: "Quận Tân Phú, TP. Hồ Chí Minh" },
  { keywords: ["phú nhuận", "phu nhuan"], lat: 10.7992, lng: 106.6803, name: "Quận Phú Nhuận, TP. Hồ Chí Minh" },
  { keywords: ["bình tân", "binh tan"], lat: 10.7654, lng: 106.6027, name: "Quận Bình Tân, TP. Hồ Chí Minh" },
  { keywords: ["bình dương", "binh duong", "thủ dầu một"], lat: 10.9805, lng: 106.6519, name: "TP. Thủ Dầu Một, Bình Dương" },
  { keywords: ["dĩ an", "di an"], lat: 10.9067, lng: 106.7719, name: "TP. Dĩ An, Bình Dương" },
  { keywords: ["thuận an", "thuan an"], lat: 10.9322, lng: 106.6967, name: "TP. Thuận An, Bình Dương" },
  { keywords: ["đồng nai", "dong nai", "biên hòa", "bien hoa"], lat: 10.9574, lng: 106.8427, name: "TP. Biên Hòa, Đồng Nai" },
  { keywords: ["đồng xoài", "dong xoai", "bình phước", "binh phuoc"], lat: 11.5333, lng: 106.9167, name: "TP. Đồng Xoài, Bình Phước" },
  { keywords: ["long an", "tân an"], lat: 10.5348, lng: 106.4089, name: "TP. Tân An, Long An" },
  { keywords: ["vũng tàu", "vung tau", "bà rịa"], lat: 10.3460, lng: 107.0843, name: "TP. Vũng Tàu, Bà Rịa - Vũng Tàu" },
  { keywords: ["cần thơ", "can tho"], lat: 10.0452, lng: 105.7469, name: "TP. Cần Thơ" },
  { keywords: ["đà nẵng", "da nang"], lat: 16.0544, lng: 108.2022, name: "TP. Đà Nẵng" },
  { keywords: ["hà nội", "ha noi"], lat: 21.0285, lng: 105.8542, name: "Thủ đô Hà Nội" },
  { keywords: ["hồ chí minh", "ho chi minh", "hcm", "tphcm", "sài gòn", "sai gon"], lat: 10.8231, lng: 106.6297, name: "TP. Hồ Chí Minh" },
];

export async function geocodeAddressSmart(rawInput: string): Promise<GeocodeResult> {
  const normalized = rawInput
    .replace(/Boulevard|Blvd/gi, "Đường")
    .replace(/Street|Str/gi, "Đường")
    .replace(/Road|Rd/gi, "Đường")
    .replace(/Avenue|Ave/gi, "Đại lộ")
    .replace(/Khu phố \d+/gi, "")
    .replace(/Khu phố/gi, "")
    .replace(/Tổ \d+/gi, "")
    .replace(/Ấp \d+/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  const fetchOsm = async (query: string) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query + ", Việt Nam"
        )}&limit=1`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);
      const data = await res.json();
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          displayName: data[0].display_name,
        };
      }
    } catch {
      // ignore fetch errors for quick fallback
    }
    return null;
  };

  // Step 1: Query exact input
  let res = await fetchOsm(rawInput);
  if (res) return res;

  // Step 2: Query normalized input
  if (normalized !== rawInput) {
    res = await fetchOsm(normalized);
    if (res) return res;
  }

  // Step 3: Query parts after commas if present
  if (rawInput.includes(",")) {
    const parts = rawInput.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 1) {
      const subQuery = parts.slice(-2).join(", ");
      res = await fetchOsm(subQuery);
      if (res) return res;
    }
  }

  // Step 4: Fallback to dictionary matching
  const lowerInput = rawInput.toLowerCase();
  for (const item of LOCALITY_DICTIONARY) {
    if (item.keywords.some((kw) => lowerInput.includes(kw))) {
      return {
        lat: item.lat,
        lng: item.lng,
        displayName: `${rawInput} (Vị trí: ${item.name})`,
      };
    }
  }

  // Step 5: Ultimate fallback to HCMC Center
  return {
    lat: DISPATCH_CENTER[1],
    lng: DISPATCH_CENTER[0],
    displayName: `${rawInput} (Khu vực TP. Hồ Chí Minh)`,
  };
}
