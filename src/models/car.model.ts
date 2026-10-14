export class Car {
    private _licensePlate: string;
    private _ownerName: string;
    private _brand: string;
  
    constructor(licensePlate: string, ownerName: string, brand: string) {
      this._licensePlate = licensePlate;
      this._ownerName = ownerName;
      this._brand = brand;
    }
  
    get licensePlate(): string {
      return this._licensePlate;
    }
  
    set licensePlate(value: string) {
      this._licensePlate = value;
    }
  
    get ownerName(): string {
      return this._ownerName;
    }
  
    set ownerName(value: string) {
      this._ownerName = value;
    }
  
    get brand(): string {
      return this._brand;
    }
  
    set brand(value: string) {
      this._brand = value;
    }
  }