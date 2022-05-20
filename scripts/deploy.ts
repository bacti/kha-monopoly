// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types/runtime';

export const deploy = ({ contract, params = [] }: { contract: string; params?: any[] }) =>
  ethers
    .getContractFactory(contract)
    .then((factory) => factory.deploy(...params))
    .then((contract) => contract.deployed())
    .then((contract) =>
      hre
        .run('verify:verify', { address: contract.address, constructorArguments: params })
        .then(() => contract)
        .catch(({ name, message }) => ({
          address: contract.address,
          error: name,
          message,
        }))
    );

// Hardhat always runs the compile task when running scripts with its command
// line interface.
//
// If this script is run directly using `node` you may want to call compile
// manually to make sure everything is compiled
// await hre.run('compile');
const hre: HardhatRuntimeEnvironment = global.hre;
const main = async () => {
  // await deploy({ contract: 'Greeter', params: ['Hello, Hardhat!'] }).catch(console.error);
  await deploy({ contract: 'Monopoly' }).then(console.log);
  // await deploy({ contract: 'Properties' })
  //   .then((contract) => {
  //     console.log(contract);
  //   })
  //   .catch(console.error);
  // await deploy({ contract: 'ERC20' }).catch(console.error);
  // await deploy({ contract: 'VyperStorage' }).catch(console.error);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
