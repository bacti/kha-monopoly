import fetch from 'node-fetch';
import { ethers } from 'hardhat';
import { BigNumberish, Signer, Wallet as EtherWallet } from 'ethers';
import { IPFS } from './IPFS';
import { EPropertyTypes } from './Property';
import { Contract } from './Game';
import { NETWORK } from '../conf';
import text from '../scripts/text.json';

export namespace Lending {
  /**
   * Unimproved properties can be mortgaged through the Bank at any time. Before an improved property can be mortgaged, all the buildings on all the properties of its colour-group must be sold back to the Bank at half price. The mortgage value is printed on each Title Deed card.
   *
   * No rent can be collected on mortgaged properties or utilities, but rent can be collected on unmortgaged properties in the same group.
   *
   * `game` - Game ID.
   *
   * `property` - Property type.
   *
   * @beta
   */
  export const mortage = (params: { game: string; property: EPropertyTypes }) => {
    //
  };

  /**
   * In order to lift the mortgage, the owner must pay the Bank the amount of mortgage plus 10% interest. When all the properties of a colour-group are no longer mortgaged, the owner may begin to buy back houses at full price.
   *
   * The player who mortgages property retains possession of it and no other player may secure it by lifting the mortgage from the Bank. However, the owner may sell this mortgaged property to another player at any agreed price. If you are the new owner, you may lift the mortgage at once if you wish by paying off the mortgage plus 10% interest to the Bank. If the mortgage is not lifted at once, you must pay the Bank 10% interest when you buy the property and if you lift the mortgage later you must pay the Bank an additional 10% interest as well as the amount of the mortgage.
   *
   * `game` - Game ID.
   *
   * `property` - Property type.
   *
   * @beta
   */
  export const unmortage = (params: { game: string; property: EPropertyTypes }) => {
    //
  };
}
