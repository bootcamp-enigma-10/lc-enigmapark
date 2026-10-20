import {
  CREATE_LOT_DELAY,
  PARK_CAR_DELAY,
  LEAVE_CAR_DELAY,
  CHECK_LOT_DELAY,
} from "../constants/parking.constant.js";
import type { ParkingActions } from "../interfaces/parking.interface.js";
import { Car } from "../models/car.model.js";
import { ParkingLot } from "../models/parking-lot.model.js";
import { waitWithCallback } from "../utils/async.util.js";

export function parkingLot(capacity: number): Promise<ParkingActions> {
  if (capacity <= 0) {
    return Promise.reject("Kapasitas parkir harus lebih dari 0");
  }

  return new Promise((resolve) => {
    const parkedCars: Car[] = [];

    waitWithCallback(CREATE_LOT_DELAY, () => {
      console.log(
        `Tempat parkir berhasil dibuat dengan kapasitas ${capacity} kendaraan`,
      );

      function park(car: Car | undefined): Promise<string> {
        return new Promise((resolvePark, rejectPark) => {
          waitWithCallback(PARK_CAR_DELAY, () => {
            if (!car || Object.values(car).some((val) => !val || String(val).trim() === "")) {
              rejectPark("Data kendaraan tidak boleh kosong atau belum diisi");
              return;
            }

            const existingCar = parkedCars.find(
              (item) => item.licensePlate === car?.licensePlate,
            );

            if (existingCar) {
              rejectPark(
                `Mobil ${car?.ownerName} dengan Nopol ${car?.licensePlate} sudah parkir sebelumnya (${car?.brand}).`,
              );
              return;
            }

            if (parkedCars.length >= capacity) {
              rejectPark(
                `Mohon maaf parkir sudah penuh (Gagal memarkirkan ${car?.brand}).`,
              );
              return;
            }

            parkedCars.push(car);
            resolvePark(
              `Mobil ${car?.ownerName} dengan Nopol ${car?.licensePlate} berhasil parkir (${car?.brand}).`,
            );
          });
        });
      }

      function leave(licensePlate: string | undefined): Promise<string> {
        return new Promise((resolveLeave, rejectLeave) => {
          waitWithCallback(LEAVE_CAR_DELAY, () => {
            if (!licensePlate || licensePlate.trim() === "") {
              rejectLeave("nomor polisi tidak boleh kosong");
              return
            }

            const carOut = parkedCars.find(
              (item) => item.licensePlate === licensePlate,
            );

            if (!carOut) {
              rejectLeave(`Mobil dengan nopol ${licensePlate} tidak ada.`);
              return
            }

            const index = parkedCars.indexOf(carOut!);
            parkedCars.splice(index, 1);
            resolveLeave(
              `Mobil ${carOut?.ownerName} dengan Nopol ${carOut?.licensePlate} sudah keluar (${carOut?.brand}).`,
            );
          });
        });
      }

      function check(): Promise<ParkingLot> {
        return new Promise((resolveCheck) => {
          waitWithCallback(CHECK_LOT_DELAY, () => {
            const remaining = capacity - parkedCars.length;
            const status = new ParkingLot(capacity, remaining, parkedCars);
            resolveCheck(status);
          });
        });
      }

      resolve({ park, leave, check });
    });
  });
}
