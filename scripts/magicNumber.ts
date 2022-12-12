import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0xD2e813C297f3cf9985bAa5331CEC80778755BF2a"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {

    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("MagicNum", CONTRACT_ADDRESS, signer)



    const MagicNumAttack = await ethers.getContractFactory("MagicNumAttack")
    const magicNumAttack = await MagicNumAttack.connect(signer).deploy(contract.address)
    await magicNumAttack.deployed()
    await magicNumAttack.attack();

    
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });