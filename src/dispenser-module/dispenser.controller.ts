// src/controllers/dispenserController.ts
import { Request, Response } from 'express';
import DispenserService from './dispenser.service';

const dispenserService = new DispenserService();

class DispenserController {
  createDispenser(req: Request, res: Response) {
    try {
      const { flow_volume } = req.body;
      const dispenser = dispenserService.createDispenser(flow_volume);
      res.status(201).json({
        status: "success",
        data: dispenser
      });
    } catch (err: any) {
      res.status(err.status).json({ error: err.message });
    }
  }

  openTap(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      dispenserService.openTap(id);
      res.sendStatus(204).json({
        status: "success"
      });
    } catch (err: any) {
      res.status(err.status).json({ error: err.message });
    }
  }

  closeTap(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      dispenserService.closeTap(id);
      res.sendStatus(204).json({
        statis: "success"
      });
    } catch (err: any) {
      res.status(err.status).json({ error: err.message });
    }
  }

  getDispenserStats(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const stats = dispenserService.getDispenserStats(id);
      res.status(200).json({
        status: "success",
        data: stats
      });
    } catch (err: any) {
      res.status(err.status).json({ error: err.message });
    }
  }

  getAllDispenserStats(req: Request, res: Response) {
    try {
      const stats = dispenserService.getAllDispenserStats();
      res.status(200).json({
        status: "success",
        data: stats
      });
    } catch (err: any) {
      res.status(err.status).json({ error: err.message });
    }
  }

  getSalesStats(req: Request, res: Response) {
    try {
      const stats = dispenserService.getSalesStats();
      res.status(200).json({
        status: "success",
        data: stats
      });
    } catch (err: any) {
      res.status(err.status).json({ error: err.message });
    }
  }
}

export default DispenserController;
