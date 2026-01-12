<div align="center">

# 🔐 Store Key-Pairs Blockchain

### **Enterprise-Grade Blockchain Data Storage Solution**

[![Solidity](https://img.shields.io/badge/Solidity-0.8.28-blue?logo=solidity)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-3.1.3-yellow?logo=ethereum)](https://hardhat.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18-green?logo=express)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**A production-ready, full-stack blockchain application for secure key-value pair storage on Ethereum**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API Reference](#-api-endpoints)

---

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [API Endpoints](#-api-endpoints)
- [Smart Contract](#-smart-contract)
- [Security](#-security)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Documentation](#-documentation)

---

## 🎯 Overview

**Store Key-Pairs** is a comprehensive blockchain solution that enables secure, decentralized storage of key-value pairs on the Ethereum blockchain. Built with enterprise-grade security practices, this project combines a robust Solidity smart contract with a modern RESTful API, providing a complete end-to-end solution for blockchain data management.

### Key Highlights

✨ **Production-Ready** - Battle-tested code with comprehensive error handling  
🔒 **Secure by Design** - Access control, input validation, and security best practices  
📊 **Event-Driven** - Complete audit trail with blockchain events  
🚀 **Developer-Friendly** - TypeScript throughout, comprehensive documentation  
⚡ **Gas Optimized** - Efficient smart contract design for cost-effective operations  

---

## ✨ Features

### 🔐 Smart Contract Features

| Feature | Description |
|---------|-------------|
| **🔑 Access Control** | Owner-only write operations with `onlyOwner` modifier |
| **📢 Event Logging** | `DataStored` and `OwnershipTransferred` events for complete transparency |
| **✅ Input Validation** | Comprehensive `require` statements preventing invalid data |
| **📝 NatSpec Documentation** | Industry-standard inline documentation for all functions |
| **👤 Ownership Management** | Secure ownership transfer functionality |

### 🌐 API Server Features

| Feature | Description |
|---------|-------------|
| **🔄 RESTful Architecture** | Clean, intuitive REST API design |
| **🛡️ Error Handling** | Comprehensive error handling with detailed messages |
| **📘 Type Safety** | Full TypeScript implementation for reliability |
| **⚡ High Performance** | Express.js for fast, lightweight operations |
| **🔍 Transaction Simulation** | Pre-flight checks before blockchain transactions |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Applications                       │
│              (Web Apps, Mobile Apps, etc.)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP/REST API
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    API Server (Express.js)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Routes     │  │   Services   │  │   Config     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Viem / RPC Calls
                         │
┌────────────────────────▼────────────────────────────────────┐
│              Ethereum Sepolia Testnet                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         StoreData Smart Contract                     │   │
│  │  • storeData() - Owner only                          │   │
│  │  • getData() - Public read                           │   │
│  │  • transferOwnership() - Owner only                  │   │
│  │  • Events: DataStored, OwnershipTransferred          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)
- **Sepolia Testnet RPC URL** - Get from [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/)
- **Sepolia ETH** - Get from [Sepolia Faucet](https://sepoliafaucet.com/)

### Installation Steps

#### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd store-key-pairs
```

#### 2️⃣ Install Dependencies

**Install Hardhat dependencies:**
```bash
cd hardhat
npm install
```

**Install API dependencies:**
```bash
cd ../api
npm install
```

#### 3️⃣ Configure Environment Variables

**Hardhat Configuration** (`hardhat/.env`):
```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
SEPOLIA_PRIVATE_KEY=your_private_key_here
```

**API Configuration** (`api/.env`):
```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
CONTRACT_ADDRESS=0xYourDeployedContractAddress
PRIVATE_KEY=your_private_key_here
PORT=3000
```

> ⚠️ **Security Note**: Never commit `.env` files to version control. They are already included in `.gitignore`.

#### 4️⃣ Deploy Smart Contract

```bash
cd hardhat
npm run deploy
```

> 💡 **Tip**: Save the deployed contract address from the output.

#### 5️⃣ Update API Configuration

Update `CONTRACT_ADDRESS` in `api/.env` with your deployed contract address.

#### 6️⃣ Start API Server

```bash
cd api
npm run dev
```

🎉 **Success!** Your API is now running at `http://localhost:3000`

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/health` | Health check endpoint | ❌ No |
| `POST` | `/api/store` | Store key-value pair | ✅ Yes (Owner) |
| `GET` | `/api/get/:key` | Retrieve data by key | ❌ No |
| `GET` | `/api/contract-address` | Get contract address | ❌ No |

### 📝 Detailed Endpoint Documentation

#### 1. Health Check

Check if the API server is running.

```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

#### 2. Store Data

Store a key-value pair on the blockchain. **Requires contract owner account.**

```http
POST /api/store
Content-Type: application/json
```

**Request Body:**
```json
{
  "key": 1,
  "value1": "Hello",
  "value2": "World"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Data stored successfully",
  "transactionHash": "0x1234...abcd",
  "data": {
    "key": 1,
    "value1": "Hello",
    "value2": "World"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

---

#### 3. Get Data

Retrieve stored data by key.

```http
GET /api/get/:key
```

**Example:**
```http
GET /api/get/1
```

**Success Response (200):**
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

**Error Response (404):**
```json
{
  "success": false,
  "error": "Data does not exist for this key"
}
```

---

#### 4. Get Contract Address

Retrieve the deployed contract address.

```http
GET /api/contract-address
```

**Response:**
```json
{
  "success": true,
  "contractAddress": "0x1234567890abcdef..."
}
```

---

### 🧪 Testing with cURL

**Store Data:**
```bash
curl -X POST http://localhost:3000/api/store \
  -H "Content-Type: application/json" \
  -d '{
    "key": 1,
    "value1": "Hello",
    "value2": "World"
  }'
```

**Get Data:**
```bash
curl http://localhost:3000/api/get/1
```

**Health Check:**
```bash
curl http://localhost:3000/health
```

---

## 📝 Smart Contract

### Contract: `StoreData`

A production-ready Solidity smart contract for storing key-value pairs on Ethereum.

### 📋 Contract Functions

#### `storeData(uint _key, string _value1, string _value2)`
Stores a data item with two string values at a given key.

- **Access**: Owner only (`onlyOwner` modifier)
- **Validations**: 
  - `value1` cannot be empty
  - `value2` cannot be empty
- **Emits**: `DataStored` event

```solidity
function storeData(
    uint _key,
    string memory _value1,
    string memory _value2
) public onlyOwner {
    require(bytes(_value1).length > 0, "StoreData: value1 cannot be empty");
    require(bytes(_value2).length > 0, "StoreData: value2 cannot be empty");
    
    data[_key] = DataItem(_value1, _value2);
    emit DataStored(_key, _value1, _value2, msg.sender);
}
```

#### `getData(uint _key)`
Retrieves stored data for a given key.

- **Access**: Public (read-only)
- **Validations**: Checks if data exists for the key

```solidity
function getData(uint _key) public view returns (string memory, string memory) {
    require(
        bytes(data[_key].value1).length > 0 || bytes(data[_key].value2).length > 0,
        "StoreData: data does not exist for this key"
    );
    return (data[_key].value1, data[_key].value2);
}
```

#### `transferOwnership(address newOwner)`
Transfers contract ownership to a new address.

- **Access**: Owner only
- **Validations**:
  - New owner cannot be zero address
  - New owner must be different from current owner

```solidity
function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0), "StoreData: new owner is the zero address");
    require(newOwner != owner, "StoreData: new owner is the same as current owner");
    
    address oldOwner = owner;
    owner = newOwner;
    emit OwnershipTransferred(oldOwner, newOwner);
}
```

### 📢 Events

#### `DataStored`
Emitted when data is successfully stored.

```solidity
event DataStored(
    uint indexed key,
    string value1,
    string value2,
    address indexed caller
);
```

#### `OwnershipTransferred`
Emitted when contract ownership is transferred.

```solidity
event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
);
```

### 🔐 Access Control

| Function | Access Level | Description |
|----------|-------------|-------------|
| `storeData` | Owner Only | Only contract owner can store data |
| `getData` | Public | Anyone can read stored data |
| `transferOwnership` | Owner Only | Only owner can transfer ownership |
| `owner` | Public | Public variable to check current owner |

---

## 🔒 Security

### Security Features

| Feature | Implementation | Benefit |
|---------|---------------|---------|
| **Access Control** | `onlyOwner` modifier | Prevents unauthorized write operations |
| **Input Validation** | `require` statements | Prevents invalid or malicious data |
| **Solidity Version** | 0.8.28 | Built-in overflow/underflow protection |
| **Gas Optimization** | Compiler optimizations | Reduces transaction costs |
| **Event Logging** | Indexed events | Complete audit trail on blockchain |
| **Zero Address Check** | Ownership transfer validation | Prevents contract lockout |

### Security Best Practices

✅ **Implemented:**
- Owner-only write operations
- Input validation for all user inputs
- Zero address checks
- Empty string validation
- Event logging for all state changes

⚠️ **Recommendations for Production:**
- Consider implementing upgradeable contracts (Proxy pattern)
- Add rate limiting for API endpoints
- Implement API authentication/authorization
- Add comprehensive test coverage
- Consider multi-signature wallet for ownership

---

## 💻 Technology Stack

### Smart Contract Stack

<div align="center">

| Technology | Version | Purpose |
|------------|---------|---------|
| **Solidity** | ^0.8.28 | Smart contract language |
| **Hardhat** | ^3.1.3 | Development framework |
| **TypeScript** | ~5.8.0 | Type-safe development |
| **Viem** | ^2.44.1 | Ethereum TypeScript library |
| **Hardhat Ignition** | ^3.0.6 | Deployment system |

</div>

### API Stack

<div align="center">

| Technology | Version | Purpose |
|------------|---------|---------|
| **Express.js** | ^4.18.2 | Web framework |
| **TypeScript** | ~5.8.0 | Type-safe development |
| **Viem** | ^2.44.1 | Blockchain interaction |
| **CORS** | ^2.8.5 | Cross-origin resource sharing |
| **dotenv** | ^17.2.3 | Environment variable management |

</div>

---

## 📁 Project Structure

```
store-key-pairs/
│
├── 📁 hardhat/                    # Smart Contract Development
│   ├── 📁 contracts/
│   │   └── 📄 StoreData.sol       # Main smart contract
│   ├── 📁 scripts/
│   │   └── 📄 send-op-tx.ts       # Utility scripts
│   ├── 📁 ignition/
│   │   └── 📁 modules/
│   │       └── 📄 StoreData.ts    # Deployment configuration
│   ├── 📁 test/                   # Contract tests
│   ├── 📄 hardhat.config.ts       # Hardhat configuration
│   └── 📄 package.json
│
├── 📁 api/                        # RESTful API Server
│   ├── 📁 src/
│   │   ├── 📁 routes/
│   │   │   └── 📄 dataRoutes.ts   # API route handlers
│   │   ├── 📁 services/
│   │   │   └── 📄 contractService.ts  # Business logic
│   │   ├── 📁 config/
│   │   │   └── 📄 contractABI.ts  # Contract ABI
│   │   └── 📄 index.ts            # API entry point
│   ├── 📄 env.template            # Environment template
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
│
├── 📄 .gitignore                  # Git ignore rules
├── 📄 README.md                   # This file
└── 📄 COMPLETE_SETUP_GUIDE.txt    # Detailed setup guide
```

---

## 🛠️ Development

### Compile Smart Contracts

```bash
cd hardhat
npx hardhat compile
```

### Run Contract Tests

```bash
cd hardhat
npx hardhat test
```

### Build API

```bash
cd api
npm run build
```

### Type Check API

```bash
cd api
npm run type-check
```

### Development Mode (API)

```bash
cd api
npm run dev
```

### Production Mode (API)

```bash
cd api
npm run build
npm start
```

---

## 📚 Documentation

### 📖 Additional Documentation

- **[Hardhat README](hardhat/README.md)** - Detailed smart contract development guide
- **[API README](api/README.md)** - Complete API documentation and examples
- **[Postman Guide](api/POSTMAN_GUIDE.md)** - API testing with Postman
- **[Setup Guide](COMPLETE_SETUP_GUIDE.txt)** - Comprehensive setup instructions

### 🔗 External Resources

- [Solidity Documentation](https://docs.soliditylang.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Viem Documentation](https://viem.sh/)
- [Express.js Documentation](https://expressjs.com/)
- [Ethereum Sepolia Testnet](https://sepolia.dev/)

---

## 🎯 Use Cases

This project is ideal for:

- ✅ **Decentralized Data Storage** - Store key-value pairs on blockchain
- ✅ **Audit Trails** - Complete event logging for compliance
- ✅ **Access Control** - Owner-only write operations
- ✅ **API Integration** - RESTful API for easy integration
- ✅ **Learning & Development** - Production-ready codebase for learning

---

## 🤝 Contributing

This is a portfolio project demonstrating enterprise-grade blockchain development practices. For questions, suggestions, or collaboration opportunities, please reach out.

---

## 📄 License

This project is provided as-is for demonstration and portfolio purposes.

---

## 📞 Support & Contact

### Getting Help

1. 📖 Check the [API README](api/README.md) for API-specific questions
2. 📖 Review the [Hardhat README](hardhat/README.md) for contract development
3. 📖 Consult the [Setup Guide](COMPLETE_SETUP_GUIDE.txt) for installation issues
4. 📖 See [Postman Guide](api/POSTMAN_GUIDE.md) for API testing

### Common Issues

| Issue | Solution |
|-------|----------|
| Contract deployment fails | Check RPC URL and private key in `.env` |
| API connection errors | Verify `CONTRACT_ADDRESS` is correct |
| Transaction reverts | Ensure account has sufficient Sepolia ETH |
| Type errors | Run `npm install` in both directories |

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Built with ❤️ using Hardhat 3, Express.js, and TypeScript**

[⬆ Back to Top](#-store-key-pairs-blockchain)

</div>
