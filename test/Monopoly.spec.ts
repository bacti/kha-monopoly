import { expect } from 'chai';
import { ethers } from 'hardhat';
import { BigNumber } from 'bignumber.js';
import text from '../scripts/text.json';
import { NETWORK } from '../conf';

describe('Monopoly', function () {
  this.timeout(60000);
  const { BANKER, USER, ADDRESS } = NETWORK;
  const Contract: { [key: string]: string } = {
    BANKER,
    USER,
    ADDRESS,
  };

  before(async () => {
    await ethers
      .getContractFactory('Monopoly')
      .then((factory) => factory.deploy())
      .then((contract) => contract.deployed())
      .then(({ address }) => {
        Contract.ADDRESS = address;
        console.log({ address });
      });
  });

  it('createGame', async () => {
    const GAME_ID = String(Math.random()).slice(-6);

    // const contract = await ethers
    //   .getContractFactory('Monopoly')
    //   .then((factory) => factory.attach(CONTRACT_ADDRESS));
    const contract = await ethers.getContractAt('Monopoly', Contract.ADDRESS);

    await contract
      .createGame(
        GAME_ID,
        [...Array(28)].map((_, index) => String(index))
      )
      .then((tx) => tx.wait(1));

    await contract.balanceOf(Contract.BANKER, 28).then((balance) => {
      console.log({ type: 'BANKER', balance: balance.toString() });
      expect(balance.toString()).to.equal('100000000000000000000000000');
    });

    await contract
      .safeTransferFrom(Contract.BANKER, Contract.USER, 28, 500000, '0x00')
      .then((tx) => tx.wait(1));

    await contract.balanceOf(Contract.USER, 28).then((balance) => {
      console.log({ type: 'USER', balance: balance.toString() });
      expect(balance.toString()).to.equal('500000');
    });

    await contract.uri(GAME_ID + '12').then(console.log);

    // await contract
    //   .balanceOf('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', 3)
    //   .then((amount) => console.log(amount.toString()));

    // await contract.uri(123456).then(console.log);
    // .then((amount) => console.log(amount.toString()));

    // expect((await contract.loadProperties())[0].Name).to.equal('Ga Hà Nội');
  });
});
