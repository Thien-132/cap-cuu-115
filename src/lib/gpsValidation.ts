import { z } from 'zod';
import * as turf from '@turf/turf';

// ==========================================
// 1. CONFIGURATION & LAYERS
// ==========================================

// Hub/Dispatch Center Point (Example: Ho Chi Minh City Center)
export const DISPATCH_CENTER: [number, number] = [106.6297, 10.8231]; // [Longitude, Latitude]

// Geofencing Polygon (Example: Bounding Box for Southern Vietnam Operations)
export const ALLOWED_REGION_POLYGON = turf.polygon([[
  [105.0, 8.5],
  [108.0, 8.5],
  [108.0, 12.0],
  [105.0, 12.0],
  [105.0, 8.5]
]]);

export type ServiceType = 'emergency' | 'homecare' | 'transfer';

// Multi-layer Distance Limits (in Kilometers)
export const SERVICE_LIMITS_KM: Record<ServiceType, number> = {
  emergency: 30, // Khẩn cấp
  homecare: 200, // Điều dưỡng
  transfer: 1000 // Chuyển viện
};

// Safety buffer to handle GPS signal fluctuation jitter (50 meters)
export const GPS_JITTER_BUFFER_KM = 0.05;

// ==========================================
// 2. ZOD VALIDATION SCHEMAS
// ==========================================

export const GpsRequestSchema = z.object({
  lng: z.number().min(-180).max(180),
  lat: z.number().min(-90).max(90),
  serviceType: z.enum(['emergency', 'homecare', 'transfer']),
});

export type GpsValidationResult = 
  | { success: true; distance: number; message: string }
  | { success: false; code: 'VALIDATION_ERROR' | 'VIOLATION_GEOFENCE' | 'DISTANCE_EXCEEDED_LIMIT'; distance?: number; limit?: number; message: string; details?: any };


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
  serviceType: ServiceType
): GpsValidationResult {
  
  // STEP 1: Geofencing
  const userPoint = turf.point([userLng, userLat]);
  const isInside = turf.booleanPointInPolygon(userPoint, ALLOWED_REGION_POLYGON);
  
  if (!isInside) {
    return {
      success: false,
      code: 'VIOLATION_GEOFENCE',
      message: 'Vị trí của bạn nằm ngoài khu vực phục vụ của chúng tôi.'
    };
  }

  // STEP 2 & 3: Multi-layer Distance Calculation & Immediate Restriction Guard
  const centerPoint = turf.point(DISPATCH_CENTER);
  
  // Calculate distance using precise Haversine algorithm provided by Turf
  const distanceKm = turf.distance(centerPoint, userPoint, { units: 'kilometers' });
  
  const limitKm = SERVICE_LIMITS_KM[serviceType];
  const allowedDistanceKm = limitKm + GPS_JITTER_BUFFER_KM;

  // Strict check
  if (distanceKm >= allowedDistanceKm) {
    return {
      success: false,
      code: 'DISTANCE_EXCEEDED_LIMIT',
      distance: Number(distanceKm.toFixed(3)),
      limit: limitKm,
      message: 'Khoảng cách vượt quá giới hạn quy định của dịch vụ.'
    };
  }

  return {
    success: true,
    distance: Number(distanceKm.toFixed(3)),
    message: 'Vị trí hợp lệ, sẵn sàng phục vụ.'
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
        code: 'VALIDATION_ERROR',
        message: 'Dữ liệu tọa độ hoặc loại dịch vụ không hợp lệ.',
        details: parsed.error.issues
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
      message: 'Lỗi hệ thống khi xác thực tọa độ GPS.'
    });
  }
}
