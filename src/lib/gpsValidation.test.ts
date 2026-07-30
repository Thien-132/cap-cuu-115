import { validateGpsRequest, DISPATCH_CENTER } from "./gpsValidation";

function runTests() {
  console.log("=== BẮT ĐẦU KIỂM THỬ TỰ ĐỘNG BÁN KÍNH PHẠM VI (GPS VALIDATION) ===");

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string) {
    total++;
    if (condition) {
      console.log(`✅ PASSED: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAILED: ${testName}`);
    }
  }

  // TEST 1: Tọa độ ngay trung tâm TP.HCM (Quận 1 - 106.7009, 10.7769)
  const t1 = validateGpsRequest(106.7009, 10.7769, "emergency");
  assert(t1.success === true && (t1.distance ?? 999) < 15, "Tọa độ Quận 1 (TP.HCM) thuộc bán kính cấp cứu 30km");

  // TEST 2: Tọa độ Biên Hòa, Đồng Nai (106.8244, 10.9575) ~20-25km
  const t2 = validateGpsRequest(106.8244, 10.9575, "emergency");
  assert(t2.success === true && (t2.distance ?? 0) <= 30, "Tọa độ Biên Hòa thuộc bán kính cấp cứu (<=30km)");

  // TEST 3: Tọa độ Vũng Tàu (107.0843, 10.3460) ~95km -> Vượt quá 30km cấp cứu
  const t3 = validateGpsRequest(107.0843, 10.3460, "emergency");
  assert(t3.success === false && t3.code === "DISTANCE_EXCEEDED_LIMIT", "Tọa độ Vũng Tàu vượt quá bán kính cấp cứu 30km");

  // TEST 4: Tọa độ Vũng Tàu cho dịch vụ Điều dưỡng (200km) -> Hợp lệ
  const t4 = validateGpsRequest(107.0843, 10.3460, "homecare");
  assert(t4.success === true && (t4.distance ?? 0) <= 200, "Tọa độ Vũng Tàu hợp lệ cho dịch vụ Điều dưỡng (<=200km)");

  // TEST 5: Tọa độ Hà Nội (105.8542, 21.0285) -> Ngoài polygon geofence Miền Nam
  const t5 = validateGpsRequest(105.8542, 21.0285, "emergency");
  assert(t5.success === false && t5.code === "VIOLATION_GEOFENCE", "Tọa độ Hà Nội bị chặn bởi Geofence khu vực phía Nam");

  // TEST 6: Tọa độ gần trung tâm TP.HCM (106.6350, 10.8200 - ~0.7km) -> Đón bệnh MIỄN PHÍ (<=6km)
  const t6 = validateGpsRequest(106.6350, 10.8200, "emergency");
  assert(t6.success === true && t6.isFreePickup === true, "Tọa độ gần trung tâm (<6km) nhận ưu đãi MIỄN PHÍ đón bệnh 100%");

  // TEST 7: Tọa độ > 6km (~25km) -> Không miễn phí cước đón
  const t7 = validateGpsRequest(106.8244, 10.9575, "emergency");
  assert(t7.success === true && t7.isFreePickup === false, "Tọa độ > 6km (>6km) không thuộc diện miễn phí cước đón");

  console.log(`\n=== KẾT QUẢ KIỂM THỬ: ${passed}/${total} TESTS THÀNH CÔNG ===`);

  if (passed !== total) {
    process.exit(1);
  }
}

runTests();
