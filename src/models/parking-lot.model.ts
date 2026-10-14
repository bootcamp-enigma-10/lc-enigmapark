import { Car } from "./car.model.js";

export class ParkingLot {
  private _capacity: number;
  private _remaining: number;
  private _cars: Car[];

  constructor(capacity: number, remaining: number, cars: Car[]) {
    this._capacity = capacity;
    this._remaining = remaining;
    this._cars = cars;
  }

  get capacity(): number {
    return this._capacity;
  }

  set capacity(value: number) {
    this._capacity = value;
  }

  get remaining(): number {
    return this._remaining;
  }

  set remaining(value: number) {
    this._remaining = value;
  }

  get cars(): Car[] {
    return this._cars;
  }

  set cars(value: Car[]) {
    this._cars = value;
  }
}