import fetch from 'node-fetch';
import { ethers } from 'hardhat';
import { BigNumberish, Signer, Wallet as EtherWallet } from 'ethers';
import { IPFS } from './IPFS';
import { EPropertyTypes } from './Property';
import { NETWORK } from '../conf';
import text from '../scripts/text.json';

export namespace Building {
  /**
   * When a player owns all the properties in a colour-group they may buy houses from the Bank and erect them on those properties.
   *
   * If you buy one house, you may put it on any one of those properties. The next house you buy must be erected on one of the unimproved properties of this or any other complete colour-group you may own. The price you must pay the Bank for each house is shown on your Title Deed card for the property on which you erect the house. The owner still collects double rent from an opponent who lands on the unimproved properties of there complete colour-group.
   *
   * Following the above rules, you may buy and erect at any time as many houses as your judgement and financial standing will allow. But you must build evenly, i.e., you cannot erect more than one house on any one property of any colour-group until you have built one house on every property of that group. You may then begin on the second row of houses, and so on, up to a limit of four houses to a property. For example, you cannot build three Houses on one property if you have only one house on another property of that group.
   *
   * When a player has four houses on each property of a complete colour-group, they may buy a hotel from the Bank and erect it on any property of the colour-group. They return the four houses from that property to the Bank and pay the price for the hotel as shown on the Title Deed card. Only one hotel may be erected on any one property.
   *
   * `game` - Game ID.
   *
   * `property` - Property type.
   *
   * @beta
   */
  export const upgrade = (params: { game: string; property: EPropertyTypes }) => {
    //
  };

  /**
   * As you build evenly, you must also break down evenly if you sell houses back to the Bank.
   *
   * Unimproved properties, railroads and utilities (but not buildings) may be sold to any player as a private transaction for any amount the owner can get. However, no property can be sold to another player if buildings are standing on any properties of that colour-group. Any buildings so located must be sold back to the Bank before the owner can sell any property of that colour-group.
   *
   * Houses and Hotels may be sold back to the Bank at any time for one-half the price paid for them. All houses on one colour-group may be sold at once, or they may be sold one house at a time (one hotel equals five houses), evenly, in reverse of the manner in which they were erected.
   *
   * `game` - Game ID.
   *
   * `property` - Property type.
   *
   * @beta
   */
  export const downgrade = (params: { game: string; property: EPropertyTypes }) => {
    //
  };
}
