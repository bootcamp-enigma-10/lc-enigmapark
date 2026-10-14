import type { Car } from "../models/car.model.js";
import type { ParkingLot } from "../models/parking-lot.model.js";

export interface ParkingActions {
  park: (car: Car | undefined) => Promise<string>;
  leave: (licensePlate: string | undefined) => Promise<string>;
  check: () => Promise<ParkingLot>;
}

export interface CheckOutput {
  capacity: number;
  remaining: number;
  parkedCars: string[];
}