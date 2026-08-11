export type TruckStatus = "service" | "stopped" | "maintenance";

export type FuelType = "diesel" | "essence" | "electric" | "hybrid";

export interface Truck {
  id: string;
  plateNumber: string;
  color: string;
  fuelType: FuelType;
  mileage: number;
  status: TruckStatus;
  nextOilChangeMileage: number;
}