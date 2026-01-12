# Store Key-Pairs - Blockchain Data Storage Project

A full-stack blockchain application for storing and retrieving key-value pairs on the Ethereum blockchain. This project consists of a Solidity smart contract with access control, events, and validations, along with a RESTful API for interacting with the contract.

## 📁 Project Structure

```
store-key-pairs/
├── hardhat/          # Smart contract development and deployment
│   ├── contracts/    # Solidity contracts
│   ├── scripts/      # Utility scripts
│   ├── ignition/     # Deployment modules
│   └── test/         # Contract tests
├── api/              # RESTful API server
│   └── src/          # API source code
│       ├── routes/   # API routes
│       ├── services/ # Business logic
│       └── config/   # Configuration files
└── README.md         # This file
```

## ✨ Features

### Smart Contract (`hardhat/`)
- **Access Control**: Owner-only functions with `onlyOwner` modifier
- **Events**: `DataStored` and `OwnershipTransferred` events for tracking
- **Validations**: Input validation with `require` statements
- **NatSpec Documentation**: Comprehensive inline documentation
- **Ownership Management**: Transfer ownership functionality

### API Server (`api/`)
- **RESTful Endpoints**: Store and retrieve data via HTTP API
- **Error Handling**: Comprehensive error handling and validation
- **TypeScript**: Fully typed codebase
- **Express.js**: Fast and lightweight web framework

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- Sepolia testnet RPC URL (for deployment)
- Sepolia ETH (for gas fees)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd store-key-pairs
   ```

2. **Install Hardhat dependencies**
   ```bash
   cd hardhat
   npm install
   ```

3. **Install API dependencies**
   ```bash
   cd ../api
   npm install
   ```

### Configuration

#### Hardhat Configuration

Create a `.env` file in the `hardhat/` directory:

```env
SEPOLIA_RPC_URL=your_sepolia_rpc_url_here
SEPOLIA_PRIVATE_KEY=your_private_key_here
```

#### API Configuration

Create a `.env` file in the `api/` directory (or copy from `env.template`):

```env
SEPOLIA_RPC_URL=your_sepolia_rpc_url_here
CONTRACT_ADDRESS=0xYourDeployedContractAddress
PRIVATE_KEY=your_private_key_here
PORT=3000
```

## 📖 Usage

### 1. Deploy the Smart Contract

```bash
cd hardhat
npm run deploy
```

This will deploy the `StoreData` contract to Sepolia testnet. Save the deployed contract address.

### 2. Update API Configuration

Update the `CONTRACT_ADDRESS` in `api/.env` with the deployed contract address.

### 3. Start the API Server

```bash
cd api
npm run dev
```

The API will be available at `http://localhost:3000`

## 🔌 API Endpoints

### Health Check
```
GET /health
```

### Store Data
```
POST /api/store
Content-Type: application/json

{
  "key": 1,
  "value1": "Hello",
  "value2": "World"
}
```

### Get Data
```
GET /api/get/:key
```

### Get Contract Address
```
GET /api/contract-address
```

For detailed API documentation, see [api/README.md](api/README.md)

## 📝 Smart Contract Details

### Contract: StoreData

**Functions:**
- `storeData(uint _key, string _value1, string _value2)` - Store data (owner only)
- `getData(uint _key)` - Retrieve stored data
- `transferOwnership(address newOwner)` - Transfer contract ownership (owner only)

**Events:**
- `DataStored(uint indexed key, string value1, string value2, address indexed caller)`
- `OwnershipTransferred(address indexed previousOwner, address indexed newOwner)`

**Access Control:**
- Only the contract owner can call `storeData` and `transferOwnership`
- All users can read data via `getData`

**Validations:**
- Values cannot be empty strings
- Ownership transfer requires valid non-zero address
- Data existence check for retrieval

For detailed contract documentation, see [hardhat/README.md](hardhat/README.md)

## 🛠️ Development

### Compile Contracts
```bash
cd hardhat
npx hardhat compile
```

### Run Tests
```bash
cd hardhat
npx hardhat test
```

### Build API
```bash
cd api
npm run build
```

### Type Check
```bash
cd api
npm run type-check
```

## 📚 Documentation

- [Hardhat Project README](hardhat/README.md) - Smart contract development guide
- [API README](api/README.md) - API usage and endpoints
- [Postman Guide](api/POSTMAN_GUIDE.md) - API testing with Postman

## 🔒 Security Features

- **Access Control**: Owner-only write operations
- **Input Validation**: Prevents empty values and invalid addresses
- **Solidity 0.8.28**: Built-in overflow protection
- **Gas Optimizations**: Compiler optimizations enabled

## 🧪 Testing

The project includes:
- Smart contract unit tests (Hardhat)
- API integration testing capabilities
- Transaction simulation before execution

## 📦 Technologies

### Smart Contract Stack
- Solidity ^0.8.28
- Hardhat ^3.1.3
- TypeScript ~5.8.0
- Viem ^2.44.1
- Hardhat Ignition

### API Stack
- Express.js ^4.18.2
- TypeScript ~5.8.0
- Viem ^2.44.1
- CORS support

## 🤝 Contributing

This is a portfolio project. For questions or collaboration opportunities, please reach out.

## 📄 License

This project is provided as-is for demonstration purposes.

## 📞 Support

For issues or questions:
1. Check the individual README files in `hardhat/` and `api/` directories
2. Review the setup guide in `COMPLETE_SETUP_GUIDE.txt`
3. Check API documentation in `api/POSTMAN_GUIDE.md`

---

**Built with ❤️ using Hardhat 3 and Express.js**
