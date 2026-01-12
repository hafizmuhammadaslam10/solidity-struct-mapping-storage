import { Router, Request, Response } from "express";
import { contractService } from "../services/contractService.js";

const router = Router();

/**
 * POST /api/store
 * Store data on the blockchain
 * Body: { key: number, value1: string, value2: string }
 */
router.post("/store", async (req: Request, res: Response) => {
  try {
    const { key, value1, value2 } = req.body;

    // Validate input
    if (key === undefined || value1 === undefined || value2 === undefined) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: key, value1, and value2 are required",
      });
    }

    if (typeof key !== "number" || key < 0) {
      return res.status(400).json({
        success: false,
        error: "key must be a non-negative number",
      });
    }

    if (typeof value1 !== "string" || typeof value2 !== "string") {
      return res.status(400).json({
        success: false,
        error: "value1 and value2 must be strings",
      });
    }

    const txHash = await contractService.storeData(key, value1, value2);

    res.json({
      success: true,
      message: "Data stored successfully",
      transactionHash: txHash,
      data: {
        key,
        value1,
        value2,
      },
    });
  } catch (error) {
    console.error("Error in /store endpoint:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

/**
 * GET /api/get/:key
 * Get data from the blockchain
 * Params: key (number)
 */
router.get("/get/:key", async (req: Request, res: Response) => {
  try {
    const key = parseInt(req.params.key, 10);

    if (isNaN(key) || key < 0) {
      return res.status(400).json({
        success: false,
        error: "key must be a valid non-negative number",
      });
    }

    const data = await contractService.getData(key);

    res.json({
      success: true,
      data: {
        key,
        ...data,
      },
    });
  } catch (error) {
    console.error("Error in /get endpoint:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

/**
 * GET /api/contract-address
 * Get the contract address
 */
router.get("/contract-address", async (req: Request, res: Response) => {
  try {
    const address = contractService.getContractAddress();
    res.json({
      success: true,
      contractAddress: address,
    });
  } catch (error) {
    console.error("Error getting contract address:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

export default router;