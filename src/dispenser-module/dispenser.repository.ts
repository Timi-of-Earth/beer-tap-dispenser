import { Dispenser } from "../@types/dispenser.types";
import { AppError } from "../utils/AppError";

export class DispenserRepository {
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

    getDispenserById(id: number): Dispenser {
        const dispenser = this.dispensers.find((dispenser) => dispenser.id === id);
        if (!dispenser) {
          throw new AppError('Dispenser not found', 404);
        }
        return dispenser;
    }

    updateTap(id: number, isOpen: boolean): boolean {
        const dispenser = this.getDispenserById(id);
        if (dispenser.isOpen === isOpen) throw new AppError(`Dispenser is already ${dispenser.isOpen? "open" : "closed"}`, 400)
        dispenser.isOpen = isOpen;
        return true;
    }

    getAllDispensers(): Dispenser[] {
        return this.dispensers;
    }
}