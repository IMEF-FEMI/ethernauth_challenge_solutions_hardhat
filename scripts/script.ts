import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x304f769D386c0c787674588D52448EEe6d550b9f"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {

    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Fallout", CONTRACT_ADDRESS, signer)
    const _provider = contract.provider;

    // const AnotherContract = await ethers.getContractFactory("AnotherContract")
    // const anotherContract = await AnotherContract.connect(signer).deploy(contract.address)
    // await anotherContract.deployed()
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });