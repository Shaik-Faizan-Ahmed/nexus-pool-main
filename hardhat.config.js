const { HardhatUserConfig } = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");

const config = {
  solidity: "0.8.20",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};

module.exports = config;
