import { Car } from "./models/car.model.js";
import { parkingLot } from "./services/parking.service.js";
import { logAction, logCheck } from "./utils/logger.util.js";

async function startParking(capacity: number): Promise<void> {
  try {
    console.log(`=== createPark -> ${capacity} (Membuat tempat parkir) ===`);
    const enigmaPark = await parkingLot(capacity);
  
    // Data mobil
    const avanza = new Car("Test21", " ", " ");
    const civic = new Car("B2021", "Blex", "Honda Civic");
    // const bmw = new Car("C012", "Clex", "BMW Series 3");
    const mercy = new Car("D0101", "Dlex", "Mercedes Benz");
    const ertiga = new Car("E5555", "Elex", "Suzuki Ertiga");
  
    // cek func
    await logAction(
      "park -> Toyota Avanza (Mobil pertama masuk)",
      enigmaPark.park(avanza),
    );
    await logCheck("check (Cek sisa slot parkir)", enigmaPark.check());
  
    await logAction(
      "park -> Honda Civic (Mobil kedua masuk)",
      enigmaPark.park(civic),
    );
    await logAction(
      "leave -> B2021 (Honda Civic keluar)",
      enigmaPark.leave("B2021"),
    );
  
    await logAction(
      "park -> BMW Series 3 (Mobil masuk)",
      enigmaPark.park(undefined),
    );
    await logAction(
      "park -> Mercedes Benz (Mobil masuk, kapasitas penuh)",
      enigmaPark.park(mercy),
    );
  
    // validasi gagal
    await logAction(
      "leave -> B2019 (Test gagal: Nopol tidak terdaftar)",
      enigmaPark.leave(" "),
    );
    await logAction(
      "park -> Suzuki Ertiga (Test gagal: Parkiran penuh)",
      enigmaPark.park(ertiga),
    );
    await logAction(
      "park -> Toyota Avanza (Test gagal: Nopol sudah parkir)",
      enigmaPark.park(avanza),
    );
    await logAction(
      "leave -> B2021 (Test gagal: Mobil sudah keluar sebelumnya)",
      enigmaPark.leave("B2021"),
    );
  
    // Cek kondisi akhir
    await logCheck("check (Cek status saat parkiran penuh)", enigmaPark.check());
    await logAction(
      "leave -> BE001 (Toyota Avanza keluar)",
      enigmaPark.leave("BE001"),
    );
    await logCheck("check (Cek status akhir parkiran)", enigmaPark.check());
  } catch (error) {
    console.log(error);
  }
}

startParking(3);
