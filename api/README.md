# StoreData API

RESTful API for interacting with the StoreData smart contract deployed on Sepolia testnet.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Contract deployed on Sepolia testnet
- Sepolia RPC URL (e.g., from Infura, Alchemy, or public endpoint)
- Private key of an account with Sepolia ETH for gas fees

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `api` directory (copy from `.env.example`):
```bash
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
CONTRACT_ADDRESS=0xYourDeployedContractAddress
SEPOLIA_RPC_URL=your_SEPOLIA_RPC_URL_here
PORT=3000
```

## Configuration

Update the `.env` file with your values:

- `SEPOLIA_RPC_URL`: Your Sepolia RPC endpoint URL
- `CONTRACT_ADDRESS`: The address of your deployed StoreData contract
- `SEPOLIA_RPC_URL`: Your private key (without 0x prefix, or with it - both work)
- `PORT`: Server port (default: 3000)

## Running the API

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and timestamp.

### Store Data
```
POST /api/store
Content-Type: application/json

Body:
{
  "key": 1,
  "value1": "Hello",
  "value2": "World"
}
```

Response:
```json
{
  "success": true,
  "message": "Data stored successfully",
  "transactionHash": "0x...",
  "data": {
    "key": 1,
    "value1": "Hello",
    "value2": "World"
  }
}
```

### Get Data
```
GET /api/get/:key
```

Example: `GET /api/get/1`

Response:
```json
{
  "success": true,
  "data": {
    "key": 1,
    "value1": "Hello",
    "value2": "World"
  }
}
```

### Get Contract Address
```
GET /api/contract-address
```

Response:
```json
{
  "success": true,
  "contractAddress": "0x..."
}
```

## Error Responses

All endpoints return error responses in the following format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Integration with Hardhat Project

This API uses the same contract ABI from the Hardhat project. The contract should be deployed on Sepolia testnet before using this API.

To deploy the contract:
```bash
cd hardhat
npm run deploy
```

After deployment, update the `CONTRACT_ADDRESS` in the `.env` file with the deployed contract address.

## Example Usage

### Using curl

Store data:
```bash
curl -X POST http://localhost:3000/api/store \
  -H "Content-Type: application/json" \
  -d '{"key": 1, "value1": "Hello", "value2": "World"}'
```

Get data:
```bash
curl http://localhost:3000/api/get/1
```

### Using JavaScript/TypeScript

```javascript
// Store data
const response = await fetch('http://localhost:3000/api/store', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    key: 1,
    value1: 'Hello',
    value2: 'World'
  })
});

const result = await response.json();
console.log(result);

// Get data
const getResponse = await fetch('http://localhost:3000/api/get/1');
const data = await getResponse.json();
console.log(data);
```

## Notes

- Make sure your account has sufficient Sepolia ETH for gas fees
- The `storeData` operation requires a transaction and will consume gas
- The `getData` operation is a read-only call and is free
- All transactions are executed on Sepolia testnet