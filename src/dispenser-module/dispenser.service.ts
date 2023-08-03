// src/services/dispenserService.ts
import { Dispenser, DispenserStats, SalesStats, SessionUpdate } from '../@types/dispenser.types';
import { AppError } from '../utils/AppError';
import { DispenserRepository } from './dispenser.repository';
import { SaleSessions } from './sale-session.repository';

const salesSessionRepository = new SaleSessions();
const pricePerMl = 0.1;
const dispenserRepository = new DispenserRepository();

class DispenserService {
  private dispensers: Dispenser[] = [];

  createDispenser(flow_volume: number): Dispenser {
    const dispenser: Dispenser = {
      id: this.dispensers.length + 1,
      flow_volume,
      isOpen: false,
    };
    this.dispensers.push(dispenser);
    return dispenser;
  }

  openTap(id: number): void {
    const startTime = Date.now();
    const dispenser = this.getDispenserById(id);
    if (dispenser.isOpen) throw new AppError('Dispenser is already in use', 400);
    dispenser.isOpen = true;
    salesSessionRepository.createSession(id, startTime);
  }

  closeTap(id: number): void {
    const stopTime = Date.now();
    const dispenser = this.getDispenserById(id);
    if (!dispenser.isOpen) throw new AppError('Dispenser is not currently in use', 400);
    
    const session = salesSessionRepository.getOpenSessionByDispenserId(id);
    const duration = (stopTime - session.startTime) / 3600;
    const volume = duration * dispenser.flow_volume;
    const price = volume * pricePerMl;
    const update: SessionUpdate = {
      stopTime, duration, price, volume
    };
    salesSessionRepository.updateSession(id, update)
  }

  getDispenserStats(id: number): DispenserStats {
    const time = Date.now();
    const dispenser = this.getDispenserById(id);
    const stats: DispenserStats = {
      id,
      totalVolume: 0,
      totalSale: 0,
      timesUsed: 0
    }
    const sessions = salesSessionRepository.getSessionsByDispenserId(id);
    stats.timesUsed = sessions.length;
    sessions.forEach((session) => {
      if (session.volume !== null && session.price !== null) {
        stats.totalVolume += session.volume;
        stats.totalSale += session.price;
      } else {
        let tempVolume = ((time - session.startTime)/3600) * dispenser.flow_volume;
        let tempPrice = tempVolume * pricePerMl;
        stats.totalVolume += tempVolume;
        stats.totalSale += tempPrice;
      }
    })

    return stats;
  }

  getSalesStats(): SalesStats {
    const stats: SalesStats = {
      totalVolume: 0,
      totalSale: 0,
      timesUsed: 0
    }
    this.dispensers.forEach((dispenser) => {
      const dispenserStats = this.getDispenserStats(dispenser.id);
      stats.totalVolume += dispenserStats.totalVolume;
      stats.totalSale += dispenserStats.totalSale;
      stats.timesUsed += dispenserStats.timesUsed;
    });

    return stats
  }

  private getDispenserById(id: number): Dispenser {
    const dispenser = this.dispensers.find((dispenser) => dispenser.id === id);
    if (!dispenser) {
      throw new Error('Dispenser not found');
    }
    return dispenser;
  }
}

export default DispenserService;
