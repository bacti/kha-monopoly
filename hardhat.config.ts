import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-vyper';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import { NETWORK, ETHERSCAN_API_KEY } from './conf';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', (taskArgs, hre) =>
  hre.ethers
    .getSigners()
    .then((accounts) => accounts.forEach((account) => console.log(account.address)))
);

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const { RPC_URL, PRIVATE_KEY } = NETWORK;
const config: HardhatUserConfig = {
  solidity: '0.8.13',
  vyper: '0.3.1',
  defaultNetwork: 'default',
  networks: {
    default: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      gas: 25e6,
      gasPrice: 20e9,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
