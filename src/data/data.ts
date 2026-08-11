import { Truck } from "../types/truck";

export const initialTrucks: Truck[] = [
  {
    id: "1",
    plateNumber: "12345-A-6",
    color: "Blanc",
    fuelType: "diesel",
    mileage: 85000,
    status: "service",
    nextOilChangeMileage: 90000,
  },
  {
    id: "2",
    plateNumber: "67890-B-7",
    color: "Bleu",
    fuelType: "essence",
    mileage: 62000,
    status: "stopped",
    nextOilChangeMileage: 65000,
  },
  {
    id: "3",
    plateNumber: "11111-C-8",
    color: "Rouge",
    fuelType: "diesel",
    mileage: 105000,
    status: "maintenance",
    nextOilChangeMileage: 100000,
  },
  {
    id: "4",
    plateNumber: "22222-D-9",
    color: "Noir",
    fuelType: "diesel",
    mileage: 45000,
    status: "service",
    nextOilChangeMileage: 50000,
  },
];