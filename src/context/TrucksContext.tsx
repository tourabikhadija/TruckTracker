import { createContext, useContext, useState, ReactNode } from "react";
import { Truck, TruckStatus } from "../types/truck";
import { initialTrucks } from "../data/data";

interface TrucksContextType {
  trucks: Truck[];
  addTruck: (truck: Truck) => void;
  updateTruck: (id: string, updatedData: Partial<Truck>) => void;
  deleteTruck: (id: string) => void;
  changeStatus: (id: string, newStatus: TruckStatus) => void;
}

const TrucksContext = createContext<TrucksContextType | undefined>(undefined);

interface TrucksProviderProps {
  children: ReactNode;
}

export function TrucksProvider({ children }: TrucksProviderProps) {
  const [trucks, setTrucks] = useState<Truck[]>(initialTrucks);

  const addTruck = (truck: Truck) => {
    setTrucks((currentTrucks) => [...currentTrucks, truck]);
  };

  const updateTruck = (id: string, updatedData: Partial<Truck>) => {
    setTrucks((currentTrucks) =>
      currentTrucks.map((truck) =>
        truck.id === id
          ? { ...truck, ...updatedData }
          : truck
      )
    );
  };

  const deleteTruck = (id: string) => {
    setTrucks((currentTrucks) =>
      currentTrucks.filter((truck) => truck.id !== id)
    );
  };

  const changeStatus = (id: string, newStatus: TruckStatus) => {
    setTrucks((currentTrucks) =>
      currentTrucks.map((truck) =>
        truck.id === id
          ? { ...truck, status: newStatus }
          : truck
      )
    );
  };

  return (
    <TrucksContext.Provider
      value={{
        trucks,
        addTruck,
        updateTruck,
        deleteTruck,
        changeStatus,
      }}
    >
      {children}
    </TrucksContext.Provider>
  );
}

export function useTrucks(): TrucksContextType {
  const context = useContext(TrucksContext);

  if (!context) {
    throw new Error("useTrucks must be used inside TrucksProvider");
  }

  return context;
}