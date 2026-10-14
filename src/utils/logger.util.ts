import type { CheckOutput } from "../interfaces/parking.interface.js";
import type { ParkingLot } from "../models/parking-lot.model.js";

// func untuk menjalankan park atau leave dengan try-catch
export async function logAction(
  commandTitle: string,
  action: Promise<string>,
): Promise<void> {
  console.log(`\n=== ${commandTitle}`);
  try {
    const message = await action;
    console.log(message);
  } catch (error) {
    console.log(error);
  }
}

// func untuk menampilkan status check
export async function logCheck(
  commandTitle: string,
  checkPromise: Promise<ParkingLot>,
): Promise<void> {
  console.log(`\n=== ${commandTitle}`);
  try {
    const result = await checkPromise;
    const output: CheckOutput = {
      capacity: result.capacity,
      remaining: result.remaining,
      parkedCars: result.cars.map((car) => car.brand),
    };
    console.log(output);
  } catch (error) {
    console.log(error);
  }
}
