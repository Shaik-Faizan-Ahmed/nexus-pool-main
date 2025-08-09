import { ethers } from "hardhat";

async function main() {
  const NexusToken = await ethers.getContractFactory("NexusToken");
  const nexusToken = await NexusToken.deploy();

  await nexusToken.waitForDeployment();

  console.log(`NexusToken deployed to: ${await nexusToken.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
