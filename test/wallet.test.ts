import { ethers } from 'ethers';
import { NETWORK } from '../conf';
import { Game } from '../src/Game';
import { Wallet } from '../src/Wallet';

describe('Wallet', function () {
  const { BANKER, PRIVATE_KEY } = NETWORK;
  this.timeout(200000);

  it('wallet - loadcreate', () =>
    Wallet.load()
      .catch(() => Wallet.create())
      .then(console.log));

  it('wallet - init balance', () =>
    Wallet.load()
      .then(({ address }) =>
        Wallet.sign(PRIVATE_KEY).then((signer) =>
          signer.sendTransaction({
            to: address,
            value: ethers.utils.parseEther('100'),
          })
        )
      )
      .then((tx) => tx.wait(1))
      .then(console.log));

  it('wallet - signer', () =>
    Wallet.sign()
      .then((signer) => Game.approve({ signer, banker: BANKER }))
      .then(console.log));
});
