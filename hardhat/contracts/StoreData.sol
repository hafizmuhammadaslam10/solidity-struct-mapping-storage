// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.28;

/**
 * @title StoreData
 * @author Your Name
 * @notice A contract for storing and retrieving key-value pairs of string data
 * @dev This contract implements access control, events, and input validation
 */
contract StoreData {
    /// @notice Owner of the contract
    address public owner;

    /**
     * @notice Structure to store a data item with two string values
     * @param value1 First string value
     * @param value2 Second string value
     */
    struct DataItem {
        string value1;
        string value2;
    }

    /// @notice Mapping from key to DataItem
    mapping(uint => DataItem) public data;

    /**
     * @notice Event emitted when data is stored
     * @param key The key used to store the data
     * @param value1 First string value that was stored
     * @param value2 Second string value that was stored
     * @param caller Address that called the storeData function
     */
    event DataStored(
        uint indexed key,
        string value1,
        string value2,
        address indexed caller
    );

    /**
     * @notice Event emitted when ownership is transferred
     * @param previousOwner Address of the previous owner
     * @param newOwner Address of the new owner
     */
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @notice Modifier to restrict access to owner only
     * @dev Reverts if called by any account other than the owner
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "StoreData: caller is not the owner");
        _;
    }

    /**
     * @notice Constructor that sets the contract deployer as the owner
     * @dev Emits OwnershipTransferred event
     */
    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    /**
     * @notice Store data with a given key
     * @dev Only the owner can call this function. Validates that values are not empty.
     * @param _key The key to store the data under
     * @param _value1 First string value to store
     * @param _value2 Second string value to store
     * @custom:emits DataStored Emitted when data is successfully stored
     */
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

    /**
     * @notice Retrieve data stored at a given key
     * @param _key The key to retrieve data for
     * @return value1 First string value stored at the key
     * @return value2 Second string value stored at the key
     */
    function getData(uint _key) public view returns (string memory, string memory) {
        require(bytes(data[_key].value1).length > 0 || bytes(data[_key].value2).length > 0, 
                "StoreData: data does not exist for this key");
        return (data[_key].value1, data[_key].value2);
    }

    /**
     * @notice Transfer ownership of the contract to a new address
     * @dev Can only be called by the current owner
     * @param newOwner Address of the new owner
     * @custom:emits OwnershipTransferred Emitted when ownership is transferred
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "StoreData: new owner is the zero address");
        require(newOwner != owner, "StoreData: new owner is the same as current owner");
        
        address oldOwner = owner;
        owner = newOwner;
        
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}
