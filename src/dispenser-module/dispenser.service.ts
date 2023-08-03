// src/services/dispenserService.ts
import { Dispenser, DispenserStats, SalesStats, SessionUpdate } from '../@types/dispenser.types';
import { DispenserRepository } from './dispenser.repository';
import { SaleSessions } from './sale-session.repository';

const salesSessionRepository = new SaleSessions();
const price_per_ml = 0.1; //Dollars per milliliter
const dispenserRepository = new DispenserRepository();

class DispenserService {

  createDispenser(flow_volume: number): Dispenser {
    const dispenser = dispenserRepository.createDispenser(flow_volume);
    return dispenser;
  }

  openTap(id: number): string {
    const startTime = Date.now();
    const opened = dispenserRepository.updateTap(id, true);
    if (opened) salesSessionRepository.createSession(id, startTime);
    return "success";
  }

  closeTap(id: number): string {
    const stopTime = Date.now();
    const dispenser = dispenserRepository.getDispenserById(id);
    dispenserRepository.updateTap(id, false)
    
    const session = salesSessionRepository.getOpenSessionByDispenserId(id);
    const duration = (stopTime - session.startTime) / 1000;
    const volume = duration * dispenser.flow_volume;
    const price = volume * price_per_ml;
    const update: SessionUpdate = {
      stopTime, duration, price, volume
    };
    salesSessionRepository.updateSession(id, update);
    return "success";
  }

  getAllDispenserStats(): DispenserStats[] {
    const stats: DispenserStats[] = [];
    dispenserRepository.getAllDispensers().forEach((dispenser) => {
      stats.push(this.getDispenserStats(dispenser.id))
    });

    return stats
  }

  getDispenserStats(id: number): DispenserStats {
    const time = Date.now();
    const dispenser = dispenserRepository.getDispenserById(id);
    const stats: DispenserStats = {
      id,
      totalVolume: 0,
      duration: 0,
      totalSale: 0,
      timesUsed: 0
    }
    const sessions = salesSessionRepository.getSessionsByDispenserId(id);
    stats.timesUsed = sessions.length;
    sessions.forEach((session) => {
      if (session.volume !== null && session.price !== null && session.duration !== null) {
        stats.totalVolume += session.volume;
        stats.totalSale += session.price;
        stats.duration += session.duration;
      } else {
        let tempDuration = (time - session.startTime)/1000;
        let tempVolume = tempDuration * dispenser.flow_volume;
        let tempPrice = tempVolume * price_per_ml;
        stats.totalVolume += tempVolume;
        stats.totalSale += tempPrice;
      }
    })

    return stats;
  }

  getSalesStats(): SalesStats {
    const stats: SalesStats = {
      totalVolume: 0,
      totalDuration: 0,
      totalSale: 0,
      timesUsed: 0
    }
    dispenserRepository.getAllDispensers().forEach((dispenser) => {
      const dispenserStats = this.getDispenserStats(dispenser.id);
      stats.totalVolume += dispenserStats.totalVolume;
      stats.totalSale += dispenserStats.totalSale;
      stats.timesUsed += dispenserStats.timesUsed;
      stats.totalDuration += dispenserStats.duration;
    });

    return stats
  }

}

export default DispenserService;
