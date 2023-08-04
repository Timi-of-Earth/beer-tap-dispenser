# beer-tap-dispenser
# Self-Service Beer Tap Dispensers API

This API allows organizers to set up self-service bar counters at festivals, enabling attendees to serve themselves beer.

## Setup and Installation

1. Clone the repository: `git clone https://github.com/beer-tap-dispenser.git`
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Start the server: `npm start`

## Endpoints

### Create a Dispenser

- Endpoint: `POST /dispenser`
- Request Body: `{ "flow_volume": 50 }`
- Response: `{ "id": 1, "flow_volume": 50, "isOpen": false }`
- Description: Create a dispenser with the specified flow volume.

### Open a Tap

- Endpoint: `POST /dispenser/:id/open`
- Response: `success`
- Description: Opens the tap of the dispenser with the given ID, starting to count the flow and total spend.

### Close a Tap

- Endpoint: `POST /dispenser/:id/close`
- Response: `success`
- Description: Closes the tap of the dispenser with the given ID, stopping the flow count.

### Get Dispenser Stats

- Endpoint: `GET /dispenser/:id/stats`
- Response: `{ "id": 1, "totalVolume": 50, "totalSale": "1.23", "timesUsed": 1, "duration": 12 }`
- Description: Get statistics for the dispenser with the given ID, including the total amount spent, number of times used, total time the tap was open and the total volume of beer dispensed.


### Get All Dispenser Stats

- Endpoint: `GET /dispenser/stats`
- Response: `[{ "id": 1, "totalVolume": 50, "totalSale": "1.23", "timesUsed": 1, "duration": 12 }]`
- Description: Get statistics for all the available dispensers.

### Get Sales Stats

- Endpoint: `GET /sales-stats`
- Response: `{ "dispenserCount": 3, "totalVolume": 50, "totalSale": "8.23", "timesUsed": 5, "totalDuration": 39 }`
- Description: Get sales statistics for the business, including the number of dispensers, the total number of purchses (times used), the total amount spent and the total volume of beer sold.

## Additional Notes

- The flow_volume is in milliliters per second (mL/s).
- The total amount is calculated based on the flow_volume and the time the tap was open.
- For simplification, an in memory DB is used.
- Price of beer per mL is hard coded as $0.1 per mL. This for simplification sake. It should can be stpred in the enviroment or in config or dynamically set from the client.
