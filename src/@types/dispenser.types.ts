// src/types/dispenser.ts
export interface Dispenser {
    id: number;
    flow_volume: number;
    isOpen: boolean;
  }
  
  export interface DispenserStats {
    id: number;
    totalVolume: number;
    duration: number;
    totalSale: number;
    timesUsed: number;
  }

  export interface SalesStats {
    dispenserCount: number;
    totalVolume: number;
    totalDuration: number;
    totalSale: number;
    timesUsed: number;
  }

  export interface SaleSession {
    id: number;
    dispenserId: number;
    startTime: number;
    stopTime: number | null;
    duration: number | null;
    volume: number | null;
    price: number | null;
  }

  export interface SessionUpdate {
    stopTime: number;
    duration: number;
    volume: number;
    price: number;
  }
  