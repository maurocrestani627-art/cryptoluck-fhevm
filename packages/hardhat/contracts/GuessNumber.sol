// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, externalEuint32, ebool} from "@fhevm/solidity/lib/FHE.sol";
import {ZamaEthereumConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/**
 * @title GuessNumber
 * @notice A provably fair number guessing game powered by FHEVM
 * @dev Part of the CryptoLuck platform - demonstrating verifiable fairness through FHE
 */
contract GuessNumber is ZamaEthereumConfig {
    // The secret winning number (encrypted)
    euint32 private secretWinningNumber;
    
    // Store each user's encrypted result (1 = correct, 0 = incorrect)
    mapping(address => euint32) public userResults;
    
    // Track whether a user has submitted a guess
    mapping(address => bool) public hasSubmitted;
    
    // Track submission timestamp for each user
    mapping(address => uint256) public submissionTimestamp;
    
    // Events
    event GuessSubmitted(address indexed user, uint256 timestamp);
    event ResultRevealed(address indexed user, bool isWinner);
    
    /**
     * @notice Initialize the contract with a secret winning number
     * @dev The winning number is set as 888 and encrypted on-chain
     */
    constructor() {
        // Set the secret winning number to 888
        secretWinningNumber = FHE.asEuint32(uint32(888));
        
        // Grant contract access to the secret number
        FHE.allowThis(secretWinningNumber);
    }
    
    /**
     * @notice Submit an encrypted guess
     * @param encryptedGuess The user's encrypted guess
     * @param proof Zero-knowledge proof for the encrypted input
     * @dev The guess is compared with the secret number using FHE operations
     */
    function submitGuess(
        externalEuint32 encryptedGuess,
        bytes calldata proof
    ) external {
        // Convert external encrypted input to internal format
        euint32 guess = FHE.fromExternal(encryptedGuess, proof);
        
        // Perform FHE comparison: is the guess equal to the winning number?
        ebool isCorrect = FHE.eq(guess, secretWinningNumber);
        
        // Convert boolean to euint32: 1 if correct, 0 if incorrect
        euint32 one = FHE.asEuint32(uint32(1));
        euint32 zero = FHE.asEuint32(uint32(0));
        euint32 result = FHE.select(isCorrect, one, zero);
        
        // Store the encrypted result
        userResults[msg.sender] = result;
        hasSubmitted[msg.sender] = true;
        submissionTimestamp[msg.sender] = block.timestamp;
        
        // CRITICAL: Dual authorization for user decryption
        FHE.allowThis(result);           // Contract can access/return the handle
        FHE.allow(result, msg.sender);   // User can decrypt the result
        
        emit GuessSubmitted(msg.sender, block.timestamp);
    }
    
    /**
     * @notice Get the encrypted result handle for the caller
     * @return The encrypted result as a bytes32 handle
     * @dev User must have submitted a guess before calling this
     */
    function getMyResult() external view returns (bytes32) {
        require(hasSubmitted[msg.sender], "No guess submitted yet");
        return FHE.toBytes32(userResults[msg.sender]);
    }
    
    /**
     * @notice Check if a user has submitted a guess
     * @param user The address to check
     * @return True if the user has submitted a guess
     */
    function hasUserSubmitted(address user) external view returns (bool) {
        return hasSubmitted[user];
    }
    
    /**
     * @notice Get the timestamp of a user's submission
     * @param user The address to check
     * @return The timestamp of the submission (0 if not submitted)
     */
    function getSubmissionTimestamp(address user) external view returns (uint256) {
        return submissionTimestamp[user];
    }
}

