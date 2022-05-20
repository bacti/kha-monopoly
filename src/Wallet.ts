import { ethers } from 'ethers';
import { LocalStorage } from 'node-localstorage';
import { USER_SECRET, NETWORK } from '../conf';
import { Util } from './utils';

export type IWallet = {
  address: string;
  privateKey: string;
};

export namespace Wallet {
  const { RPC_URL } = NETWORK;
  const localStorage = new LocalStorage('cache');
  export const provider = ethers.getDefaultProvider(RPC_URL);

  export const load = (secret = USER_SECRET): Promise<IWallet> => {
    return new Promise((resolve) => {
      const account = Util.decrypt(localStorage.getItem('wallet'), secret);
      if (account.length == 0) {
        throw {
          message: 'Invalid wallet data!',
        };
      }
      const [address, privateKey] = account.split('|');
      return resolve({ address, privateKey });
    });
  };

  export const create = (secret = USER_SECRET): IWallet => {
    const { address, privateKey }: ethers.Wallet = ethers.Wallet.createRandom();
    localStorage.setItem('wallet', Util.encrypt(`${address}|${privateKey}`, secret));
    return { address, privateKey };
  };

  export const sign = (privateKey?: string) =>
    (privateKey ? Promise.resolve({ privateKey }) : load()).then(
      ({ privateKey }) => new ethers.Wallet(privateKey, provider)
    );
}
