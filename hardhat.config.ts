import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.5.3"
      },
      {
        version: "0.6.12"
      }, 
       {
        version: "0.8.9"
      }
    ]
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};

export default config;
