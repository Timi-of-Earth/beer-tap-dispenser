import { Dispenser } from "../@types/dispenser.types";

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
}