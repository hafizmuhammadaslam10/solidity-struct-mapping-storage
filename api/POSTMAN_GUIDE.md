# Postman API Testing Guide

Complete guide for testing the StoreData API endpoints using Postman.

## Base URL
```
http://localhost:3000
```
(Change the port if you've set a different PORT in your .env file)

---

## 1. Health Check

**Endpoint:** `GET /health`

**Purpose:** Check if the server is running

**Request:**
- **Method:** `GET`
- **URL:** `http://localhost:3000/health`
- **Headers:** None required
- **Body:** None

**Expected Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2026-01-12T11:30:00.000Z"
}
```

---

## 2. Store Data on Blockchain

**Endpoint:** `POST /api/store`

**Purpose:** Store key-value pairs on the blockchain (requires gas fee)

**Request:**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/store`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
```json
{
  "key": 1,
  "value1": "Hello",
  "value2": "World"
}
```

**Example Values:**
```json
{
  "key": 1,
  "value1": "My First Value",
  "value2": "My Second Value"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Data stored successfully",
  "transactionHash": "0x1234567890abcdef...",
  "data": {
    "key": 1,
    "value1": "Hello",
    "value2": "World"
  }
}
```

**Error Response (400 Bad Request) - Missing fields:**
```json
{
  "success": false,
  "error": "Missing required fields: key, value1, and value2 are required"
}
```

**Error Response (400 Bad Request) - Invalid key:**
```json
{
  "success": false,
  "error": "key must be a non-negative number"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "error": "Failed to store data: [error details]"
}
```

**Postman Setup:**
1. Create a new request
2. Set method to `POST`
3. Enter URL: `http://localhost:3000/api/store`
4. Go to **Headers** tab and add:
   - Key: `Content-Type`
   - Value: `application/json`
5. Go to **Body** tab
6. Select **raw** and **JSON** from dropdown
7. Paste the JSON body (example above)
8. Click **Send**

---

## 3. Get Data from Blockchain

**Endpoint:** `GET /api/get/:key`

**Purpose:** Retrieve data stored on the blockchain (read-only, free)

**Request:**
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/get/1`
  - Replace `1` with the key you want to retrieve
- **Headers:** None required
- **Body:** None

**URL Examples:**
- Get data for key 1: `http://localhost:3000/api/get/1`
- Get data for key 5: `http://localhost:3000/api/get/5`
- Get data for key 100: `http://localhost:3000/api/get/100`

**Expected Response (200 OK):**
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

**Error Response (400 Bad Request) - Invalid key:**
```json
{
  "success": false,
  "error": "key must be a valid non-negative number"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "error": "Failed to get data: [error details]"
}
```

**Postman Setup:**
1. Create a new request
2. Set method to `GET`
3. Enter URL: `http://localhost:3000/api/get/1` (replace 1 with your key)
4. Click **Send**

---

## 4. Get Contract Address

**Endpoint:** `GET /api/contract-address`

**Purpose:** Get the deployed contract address

**Request:**
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/contract-address`
- **Headers:** None required
- **Body:** None

**Expected Response (200 OK):**
```json
{
  "success": true,
  "contractAddress": "0x1234567890123456789012345678901234567890"
}
```

**Postman Setup:**
1. Create a new request
2. Set method to `GET`
3. Enter URL: `http://localhost:3000/api/contract-address`
4. Click **Send**

---

## Postman Collection Summary

| # | Method | Endpoint | Purpose | Requires Body |
|---|--------|----------|---------|---------------|
| 1 | GET | `/health` | Health check | No |
| 2 | POST | `/api/store` | Store data on blockchain | Yes (JSON) |
| 3 | GET | `/api/get/:key` | Get data from blockchain | No |
| 4 | GET | `/api/contract-address` | Get contract address | No |

---

## Testing Workflow

### Step 1: Check Server Status
```
GET http://localhost:3000/health
```
✅ Should return `{"status": "ok", ...}`

### Step 2: Store Data
```
POST http://localhost:3000/api/store
Body: {
  "key": 1,
  "value1": "Test Value 1",
  "value2": "Test Value 2"
}
```
✅ Should return transaction hash

### Step 3: Retrieve Data
```
GET http://localhost:3000/api/get/1
```
✅ Should return the stored data

### Step 4: Store More Data (optional)
```
POST http://localhost:3000/api/store
Body: {
  "key": 2,
  "value1": "Another Value 1",
  "value2": "Another Value 2"
}
```

### Step 5: Get Contract Address
```
GET http://localhost:3000/api/contract-address
```
✅ Should return your contract address

---

## Common Issues

### Issue: "Cannot POST /api/store"
**Solution:** Make sure the server is running. Check with `/health` endpoint first.

### Issue: "SEPOLIA_RPC_URL is not set"
**Solution:** Make sure your `.env` file is properly configured in the `api` folder.

### Issue: "CONTRACT_ADDRESS is not set"
**Solution:** Add your deployed contract address to the `.env` file.

### Issue: Transaction fails
**Solution:** 
- Make sure your account has Sepolia ETH for gas fees
- Verify the contract address is correct
- Check that your private key is correct

### Issue: "Failed to get data"
**Solution:** 
- Make sure the key exists (you've stored data with that key)
- Verify the contract address is correct

---

## Sample Postman Collection JSON

You can import this into Postman to get all requests pre-configured:

```json
{
  "info": {
    "name": "StoreData API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/health",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["health"]
        }
      }
    },
    {
      "name": "Store Data",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"key\": 1,\n  \"value1\": \"Hello\",\n  \"value2\": \"World\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/store",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "store"]
        }
      }
    },
    {
      "name": "Get Data",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/get/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "get", "1"]
        }
      }
    },
    {
      "name": "Get Contract Address",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/contract-address",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "contract-address"]
        }
      }
    }
  ]
}
```

Save this as a `.json` file and import it into Postman via **File → Import**.