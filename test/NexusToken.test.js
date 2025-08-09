const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NexusToken", function () {
  it("Should return the correct name and symbol", async function () {
    const NexusToken = await ethers.getContractFactory("NexusToken");
    const nexusToken = await NexusToken.deploy();
    await nexusToken.waitForDeployment();

    expect(await nexusToken.name()).to.equal("Nexus Token");
    expect(await nexusToken.symbol()).to.equal("NEXUS");
  });
});