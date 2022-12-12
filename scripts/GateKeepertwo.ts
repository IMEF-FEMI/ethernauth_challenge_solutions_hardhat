import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x8e80FFe6Dc044F4A766Afd6e5a8732Fe0977A493"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {

    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("GatekeeperTwo", CONTRACT_ADDRESS, signer)

    const GateKeeperTwoAttackContract = await ethers.getContractFactory("GateKeeperTwoAttack")
    const gateKeeperTwoAttackContract = await GateKeeperTwoAttackContract.connect(signer).deploy(contract.address)
    await gateKeeperTwoAttackContract.deployed()

    console.log(await contract.entrant());
    
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });