import { SaleSession, SessionUpdate } from "../@types/dispenser.types";

export class SaleSessions {
    private saleSessions: SaleSession[] = [];

    createSession(dispenserId: number, startTime: number): SaleSession {
        const saleSession: SaleSession = {
            id: this.saleSessions.length + 1,
            dispenserId,
            startTime,
            stopTime: null,
            duration: null,
            volume: null,
            price: null
        }

        this.saleSessions.push(saleSession);
        return saleSession;
    }

    
    getOpenSessionByDispenserId(dispenserId: number): SaleSession {
        const session = this.saleSessions.find((session) => session.dispenserId === dispenserId && session.stopTime === null);
        if (!session) {
          throw new Error('Session not found');
        }
        return session;
    }

    getSessionsByDispenserId(dispenserId: number): SaleSession[] {
        const sessions = this.saleSessions.filter((session) => session.dispenserId === dispenserId);
        return sessions;
    }

    updateSession(id: number, update: SessionUpdate) {
        let session = this.getOpenSessionByDispenserId(id);
        session.stopTime = update.stopTime;
        session.duration = update.duration;
        session.volume = update.volume;
        session.price = update.price;
    }
}