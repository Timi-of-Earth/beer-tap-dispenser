import DispenserService from "../dispenser-module/dispenser.service";


describe('Dispenser Service', () => {
  let dispenserService: DispenserService;

  beforeEach(() => {
    dispenserService = new DispenserService();
  });

  it('should create a dispenser', () => {
    const flow_volume = 50;
    const dispenser = dispenserService.createDispenser(flow_volume);

    expect(dispenser.id).toBe(1);
    expect(dispenser.flow_volume).toBe(flow_volume);
    expect(dispenser.isOpen).toBe(false);
  });

  it('should open a tap', () => {
    const dispenser = dispenserService.createDispenser(50);
    dispenserService.openTap(dispenser.id);

    expect(dispenser.isOpen).toBe(true);
  });

  it('should close a tap', () => {
    const dispenser = dispenserService.createDispenser(50);
    dispenserService.openTap(dispenser.id);
    dispenserService.closeTap(dispenser.id);

    expect(dispenser.isOpen).toBe(false);
  });

  it('should throw an error when dispenser is not found', () => {
    expect(() => dispenserService.getDispenserStats(999)).toThrow('Dispenser not found');
  });
});
