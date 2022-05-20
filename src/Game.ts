import fetch from 'node-fetch';
import { ethers } from 'hardhat';
import { BigNumberish, Signer, Wallet as EtherWallet } from 'ethers';
import { IPFS } from './IPFS';
import { Wallet } from './Wallet';
import { NETWORK } from '../conf';
import text from '../scripts/text.json';

export const Contract = ethers.getContractAt('Monopoly', NETWORK.ADDRESS);

export namespace Game {
  /**
   * Grants permission to `banker` to transfer the player's tokens.
   *
   * @beta
   */
  export const approve = (params: { signer: EtherWallet; banker: string }) => {
    const { signer, banker } = params;
    return Contract.then((contract) =>
      contract
        .connect(signer)
        .setApprovalForAll(banker, true)
        .then((tx) => tx.wait(1))
    );
  };

  /**
   * Create new game.
   *
   * @param id - The game ID, may be generated randomly.
   *
   * @beta
   */
  export const create = (id: string = String(Math.random()).slice(-6)) =>
    Contract.then((contract) =>
      Promise.all(text.map((item) => IPFS.upload({ id, item }).then(({ ipnft }) => ipnft)))
        .then((ipnfts) => contract.createGame(id, ipnfts))
        .then((tx) => tx.wait(1))
        .then(() => id)
    );

  export const checkBalance = (params: { game: string; account: string }) => {
    const { game, account } = params;
    return Contract.then((contract) => contract['balanceOf(uint256,address)'](game, account)).then(
      (balance) => balance.toString()
    );
  };

  export const transferMoney = (params: {
    game: string;
    from: string;
    to: string;
    amount: BigNumberish;
  }) => {
    const { game, from, to, amount } = params;
    return Contract.then((contract) => contract.transferMoney(game, from, to, amount)).then((tx) =>
      tx.wait(1)
    );
  };
}
