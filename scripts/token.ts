import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x281Fb8B2252B16dF27d29d00B41d274AF89990f8"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {
    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Token", CONTRACT_ADDRESS, signer)

    let bal = await contract.balanceOf(PLAYER_ADDRESS)
    console.log("Previous balance: ", bal);
    console.log("bridging contract...");
    await contract.transfer(ethers.constants.AddressZero, 21)
    bal = await contract.balanceOf(PLAYER_ADDRESS)
    console.log("new balance: ", bal);
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});