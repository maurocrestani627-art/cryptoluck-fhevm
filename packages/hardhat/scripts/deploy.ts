import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying GuessNumber contract...");

  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy GuessNumber contract
  const GuessNumber = await ethers.getContractFactory("GuessNumber");
  const guessNumber = await GuessNumber.deploy();
  await guessNumber.waitForDeployment();

  const contractAddress = await guessNumber.getAddress();
  console.log("✅ GuessNumber deployed to:", contractAddress);
  console.log("🎯 Secret winning number: 888 (encrypted on-chain)");
  
  // Save deployment info
  const fs = require("fs");
  const deploymentInfo = {
    contractAddress: contractAddress,
    deployedAt: new Date().toISOString(),
    network: "sepolia",
    chainId: 11155111,
    secretNumber: 888,
  };
  
  fs.writeFileSync(
    "./deployment.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("📄 Deployment info saved to deployment.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

