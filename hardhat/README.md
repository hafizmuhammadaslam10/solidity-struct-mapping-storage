# StoreData - Smart Contract Key-Value Storage

A production-ready Solidity smart contract project for storing and retrieving key-value pairs on the Ethereum blockchain, built with Hardhat 3 and TypeScript.

## 🚀 Project Overview

This project implements a decentralized data storage solution using a smart contract that allows users to store and retrieve structured data (key-value pairs) on the blockchain. The contract supports storing pairs of string values mapped to unique integer keys, providing a simple yet powerful data storage mechanism.

## ✨ Features

- **Key-Value Storage**: Store and retrieve data pairs using integer keys
- **Gas-Optimized**: Solidity compiler optimizations enabled for efficient contract execution
- **Type-Safe Development**: Full TypeScript integration for enhanced developer experience
- **Multi-Network Support**: Configured for Sepolia testnet deployment and local development
- **OP Chain Support**: Includes Optimism (OP) chain simulation capabilities
- **Automated Deployment**: Hardhat Ignition module for streamlined contract deployment

## 🛠️ Technologies & Tools

- **Solidity** `^0.8.28` - Smart contract development
- **Hardhat** `^3.1.3` - Ethereum development framework
- **TypeScript** `~5.8.0` - Type-safe JavaScript
- **Viem** `^2.44.1` - TypeScript Ethereum library
- **Hardhat Ignition** - Contract deployment system
- **Node.js Test Runner** - Native testing framework

## 📋 Contract Details

### StoreData Contract

The `StoreData` contract provides the following functionality:

- **`storeData(uint _key, string _value1, string _value2)`**: Stores a data item with two string values at a given key
- **`getData(uint _key)`**: Retrieves the stored data item for a given key
- **`data`**: Public mapping that allows direct access to stored data items

### Contract Structure

```solidity
struct DataItem {
    string value1;
    string value2;
}
```

## 🔧 Setup & Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hardhat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (optional, for testnet deployment)
   
   Create a `.env` file in the root directory:
   ```env
   SEPOLIA_RPC_URL=your_sepolia_rpc_url
   SEPOLIA_PRIVATE_KEY=your_private_key
   ```

## 🚀 Usage

### Compile Contracts

```bash
npx hardhat compile
```

### Run Tests

Run all tests:
```bash
npx hardhat test
```

### Deploy to Sepolia Testnet

1. Ensure your `.env` file is configured with valid credentials
2. Make sure your wallet has Sepolia ETH for gas fees
3. Deploy the contract:
   ```bash
   npm run deploy
   ```

   Or manually:
   ```bash
   npx hardhat ignition deploy ignition/modules/StoreData.ts --network sepolia
   ```

### Local Development

For local network deployment:
```bash
npx hardhat ignition deploy ignition/modules/StoreData.ts
```

## 📁 Project Structure

```
hardhat/
├── contracts/          # Solidity smart contracts
│   └── StoreData.sol   # Main storage contract
├── scripts/            # Utility scripts
│   └── send-op-tx.ts   # Optimism chain transaction example
├── ignition/           # Deployment modules
│   └── modules/
│       └── StoreData.ts # Deployment configuration
├── test/               # Test files
├── hardhat.config.ts   # Hardhat configuration
└── package.json        # Project dependencies
```

## 🔒 Security Considerations

- The contract uses Solidity version `^0.8.28` with built-in overflow protection
- Compiler optimizations are enabled for gas efficiency
- Public mappings allow for transparent data access
- Consider adding access control mechanisms for production use

## 🧪 Testing

The project is configured with:
- Foundry-compatible Solidity unit tests
- TypeScript integration tests using Node.js native test runner
- Viem for Ethereum interaction testing

## 📝 License

This project is provided as-is for portfolio demonstration purposes.

## 🤝 Contributing

This is a portfolio project. For questions or collaboration opportunities, please reach out through Upwork.

## 📞 Contact

Available for blockchain development projects on Upwork. Specialized in:
- Smart contract development (Solidity)
- Hardhat framework & tooling
- TypeScript/JavaScript blockchain integration
- Ethereum & EVM-compatible chains
- Contract deployment & testing

---

**Built with ❤️ using Hardhat 3 Beta**
