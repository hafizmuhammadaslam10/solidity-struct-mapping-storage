import { createPublicClient, createWalletClient, http, Address } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import dotenv from "dotenv";
import { storeDataABI } from "../config/contractABI.js";

// Load environment variables
dotenv.config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as Address;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!SEPOLIA_RPC_URL) {
  throw new Error("SEPOLIA_RPC_URL is not set in environment variables");
}

if (!CONTRACT_ADDRESS) {
  throw new Error("CONTRACT_ADDRESS is not set in environment variables");
}

if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not set in environment variables");
}

// Create HTTP transport with timeout configuration
const httpTransport = http(SEPOLIA_RPC_URL, {
  timeout: 30000, // 30 seconds timeout
  retryCount: 3, // Retry up to 3 times
  retryDelay: 1000, // Wait 1 second between retries
});

// Create public client for read operations
const publicClient = createPublicClient({
  chain: sepolia,
  transport: httpTransport,
});

// Create wallet client for write operations
const account = privateKeyToAccount(`0x${PRIVATE_KEY.replace(/^0x/, "")}` as `0x${string}`);
const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: httpTransport,
});

export class ContractService {
  /**
   * Store data on the blockchain
   * @param key - The key to store the data under
   * @param value1 - First value to store
   * @param value2 - Second value to store
   * @returns Transaction hash
   */
  async storeData(key: number, value1: string, value2: string): Promise<string> {
    try {
      // Check account balance first
      let balance;
      try {
        balance = await publicClient.getBalance({ address: account.address });
        console.log(`Account balance: ${balance.toString()} wei (${(Number(balance) / 1e18).toFixed(6)} ETH)`);
      } catch (error: any) {
        if (error?.message?.includes("timeout") || error?.shortMessage?.includes("timeout")) {
          throw new Error(
            "RPC request timed out. This could be due to:\n" +
            "1. Network connectivity issues\n" +
            "2. Infura service being slow or unavailable\n" +
            "3. Rate limiting on your Infura endpoint\n\n" +
            "Please try again later or check your network connection."
          );
        }
        throw error;
      }
      
      if (balance === 0n) {
        throw new Error("Account has zero balance. Please fund your account with Sepolia ETH.");
      }

      // Check if contract exists at the address
      let code;
      try {
        code = await publicClient.getBytecode({ address: CONTRACT_ADDRESS });
      } catch (error: any) {
        if (error?.message?.includes("timeout") || error?.shortMessage?.includes("timeout")) {
          throw new Error("RPC request timed out while checking contract. Please try again.");
        }
        throw error;
      }
      
      if (!code || code === "0x") {
        throw new Error(`No contract found at address ${CONTRACT_ADDRESS}. Please verify the contract address is correct.`);
      }
      
      console.log(`Contract found at ${CONTRACT_ADDRESS}, code length: ${code.length} bytes`);
      
      // Try to verify the contract has the expected function by attempting a read
      // Note: getData might revert for non-existent keys, which is expected behavior
      // We'll skip this check as it's not critical and might fail for valid contracts

      // Simulate the transaction first to catch revert reasons
      let simulationFailed = false;
      let simulationError: any = null;
      
      try {
        await publicClient.simulateContract({
          address: CONTRACT_ADDRESS,
          abi: storeDataABI,
          functionName: "storeData",
          args: [BigInt(key), value1, value2],
          account: account.address,
        });
        console.log("Transaction simulation successful");
      } catch (simulateError: any) {
        simulationFailed = true;
        simulationError = simulateError;
        
        // Helper function to safely stringify objects with BigInt values
        const safeStringify = (obj: any, indent = 2): string => {
          return JSON.stringify(obj, (key, value) => {
            if (typeof value === 'bigint') {
              return value.toString();
            }
            return value;
          }, indent);
        };
        
        try {
          console.warn("Transaction simulation failed - Full error:", safeStringify(simulateError));
        } catch (stringifyError) {
          // If stringify still fails, log individual properties
          console.warn("Transaction simulation failed - Error message:", simulateError?.message);
          console.warn("Error shortMessage:", simulateError?.shortMessage);
          console.warn("Error name:", simulateError?.name);
        }
        
        // Check for timeout errors - these are critical
        if (simulateError?.message?.includes("timeout") || simulateError?.shortMessage?.includes("timeout")) {
          throw new Error("RPC request timed out during transaction simulation. Please try again.");
        }
        
        // For other simulation errors, log a warning but continue
        // Sometimes simulation can fail even when the actual transaction would succeed
        console.warn("⚠️  Warning: Transaction simulation failed, but proceeding with transaction attempt.");
        console.warn("This might be a simulation issue. The transaction will be attempted anyway.");
      }

      // Estimate gas
      let gasEstimate;
      try {
        gasEstimate = await publicClient.estimateContractGas({
          address: CONTRACT_ADDRESS,
          abi: storeDataABI,
          functionName: "storeData",
          args: [BigInt(key), value1, value2],
          account: account.address,
        });
        console.log(`Estimated gas: ${gasEstimate.toString()}`);
      } catch (error: any) {
        if (error?.message?.includes("timeout") || error?.shortMessage?.includes("timeout")) {
          throw new Error("RPC request timed out during gas estimation. Please try again.");
        }
        
        // If simulation failed and gas estimation also fails, provide detailed error
        if (simulationFailed) {
          let revertReason = "Unknown revert reason";
          if (simulationError?.cause?.data?.message) {
            revertReason = simulationError.cause.data.message;
          } else if (simulationError?.cause?.message) {
            revertReason = simulationError.cause.message;
          } else if (simulationError?.message) {
            revertReason = simulationError.message;
          } else if (simulationError?.shortMessage) {
            revertReason = simulationError.shortMessage;
          }
          
          throw new Error(`Transaction would revert: ${revertReason}\n\n` +
            `Contract: ${CONTRACT_ADDRESS}\n` +
            `Function: storeData(${key}, "${value1}", "${value2}")\n` +
            `Account: ${account.address}\n\n` +
            `Both simulation and gas estimation failed, indicating the transaction will revert.\n` +
            `Possible causes:\n` +
            `1. Contract ABI mismatch - The deployed contract may have a different interface\n` +
            `2. Contract doesn't exist at this address\n` +
            `3. Contract has been self-destructed or upgraded\n` +
            `4. Network mismatch - Contract may be on a different network\n` +
            `5. The contract at this address may have different logic than expected`);
        }
        
        throw error;
      }

      // Check if balance is sufficient for gas
      let gasPrice;
      try {
        gasPrice = await publicClient.getGasPrice();
      } catch (error: any) {
        if (error?.message?.includes("timeout") || error?.shortMessage?.includes("timeout")) {
          throw new Error("RPC request timed out while getting gas price. Please try again.");
        }
        throw error;
      }
      
      const estimatedCost = gasEstimate * gasPrice;
      if (balance < estimatedCost) {
        throw new Error(
          `Insufficient balance. Need ${(Number(estimatedCost) / 1e18).toFixed(6)} ETH for gas, but have ${(Number(balance) / 1e18).toFixed(6)} ETH.`
        );
      }

      // Execute the transaction
      let hash;
      try {
        hash = await walletClient.writeContract({
          address: CONTRACT_ADDRESS,
          abi: storeDataABI,
          functionName: "storeData",
          args: [BigInt(key), value1, value2],
        });
      } catch (error: any) {
        if (error?.message?.includes("timeout") || error?.shortMessage?.includes("timeout")) {
          throw new Error("RPC request timed out while sending transaction. Please try again.");
        }
        throw error;
      }

      // Wait for transaction receipt
      let receipt;
      try {
        receipt = await publicClient.waitForTransactionReceipt({ hash });
      } catch (error: any) {
        if (error?.message?.includes("timeout") || error?.shortMessage?.includes("timeout")) {
          throw new Error(
            `Transaction was sent (hash: ${hash}) but waiting for receipt timed out. ` +
            `Please check the transaction status on a block explorer.`
          );
        }
        throw error;
      }
      
      if (receipt.status === "reverted") {
        throw new Error("Transaction was reverted. Check the transaction on a block explorer for details.");
      }

      // If simulation failed but transaction succeeded, log a note
      if (simulationFailed) {
        console.log("✅ Transaction succeeded despite simulation failure - this was likely a simulation issue.");
      }

      return receipt.transactionHash;
    } catch (error) {
      console.error("Error storing data:", error);
      
      // If it's already a formatted error, re-throw it
      if (error instanceof Error && error.message.includes("RPC request timed out")) {
        throw error;
      }
      
      // Check for timeout in the error chain
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes("timeout") || errorMessage.includes("took too long")) {
        throw new Error(
          "RPC request timed out. This could be due to:\n" +
          "1. Network connectivity issues\n" +
          "2. Infura service being slow or unavailable\n" +
          "3. Rate limiting on your Infura endpoint\n\n" +
          "Please try again later or check your network connection."
        );
      }
      
      throw new Error(`Failed to store data: ${errorMessage}`);
    }
  }

  /**
   * Get data from the blockchain
   * @param key - The key to retrieve data for
   * @returns Object containing value1 and value2
   */
  async getData(key: number): Promise<{ value1: string; value2: string }> {
    try {
      const result = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: storeDataABI,
        functionName: "getData",
        args: [BigInt(key)],
      });

      return {
        value1: result[0],
        value2: result[1],
      };
    } catch (error) {
      console.error("Error getting data:", error);
      throw new Error(`Failed to get data: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get contract address
   * @returns The contract address
   */
  getContractAddress(): string {
    return CONTRACT_ADDRESS;
  }
}

export const contractService = new ContractService();