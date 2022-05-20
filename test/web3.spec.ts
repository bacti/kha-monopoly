import fetch from 'node-fetch';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';
import { NETWORK } from '../conf';
import { Wallet } from '../src/Wallet';

describe('Test Contract', function () {
  const { RPC_URL, BANKER, USER } = NETWORK;
  const provider = new Web3.providers.HttpProvider(RPC_URL);
  const web3 = new Web3(provider);
  this.timeout(200000);

  // it('accounts', () =>
  //   web3.eth.getAccounts().then((accounts) =>
  //     console.log({
  //       // accounts,
  //       total: accounts.length,
  //     })
  //   ));

  // it('account - create', async () => {
  //   const { address, privateKey } = web3.eth.accounts.create();
  //   console.log({ address, privateKey });

  //   await web3.eth.sendTransaction({ from: ADDRESS, to: address, value: 1e20 });
  //   await web3.eth.accounts
  //     .signTransaction({ to: ADDRESS, value: 1e19, gas: 2000000 }, privateKey)
  //     .then((signedTransactionData) =>
  //       web3.eth.sendSignedTransaction(signedTransactionData.rawTransaction as string)
  //     )
  //     .then(console.log);
  //   await web3.eth.getBalance(address).then(console.log);
  // });

  // it('wallet - loadcreate', () =>
  //   Wallet.load()
  //     .catch(() => {
  //       const { address, privateKey } = Wallet.create();
  //       return new Promise((resolve) =>
  //         web3.eth.sendTransaction(
  //           { from: ADDRESS, to: address, value: 1e20 },
  //           (error: Error, hash: string) => resolve({ address, privateKey })
  //         )
  //       );
  //     })
  //     .then(console.log));

  it('wallet - balance', async () => {
    const { address } = await Wallet.load();
    return web3.eth.getBalance(address).then(console.log);
  });

  // it('wallet - sendTransaction', async () => {
  //   const { address, privateKey } = await Wallet.load();
  //   await web3.eth.accounts
  //     .signTransaction({ to: ADDRESS, value: 1e18, gas: 2000000 }, privateKey)
  //     .then(
  //       (signedTransactionData) =>
  //         web3.eth.sendSignedTransaction(signedTransactionData.rawTransaction as string)
  //       // .on('transactionHash', console.log)
  //       // .on('confirmation', console.log)
  //       // .on('error', console.error)
  //       // .on('receipt', (receipt) => console.log('receipt', receipt))
  //     )
  //     .then(console.log);
  // });

  // it('wallet - getTransactions', async () => {
  //   const { address, privateKey } = await Wallet.load();
  //   await web3.eth
  //     .getBlock('latest')
  //     .then(({ transactions }) =>
  //       Promise.all(transactions.map((transactionHash) => web3.eth.getTransaction(transactionHash)))
  //     )
  //     .then(console.log);
  // });
});
