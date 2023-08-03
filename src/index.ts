// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import DispenserController from './dispenser-module/dispenser.controller';

const app = express();
const port = 3000;

app.use(bodyParser.json());

const dispenserController = new DispenserController();

app.post('/dispenser', dispenserController.createDispenser);
app.post('/dispenser/:id/open', dispenserController.openTap);
app.post('/dispenser/:id/close', dispenserController.closeTap);
app.get('/dispenser/:id/dispenser-stats', dispenserController.getDispenserStats);
app.get('/sales-stats', dispenserController.getSalesStats);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
