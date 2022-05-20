import fetch from 'node-fetch';
import { ethers } from 'hardhat';
import { BigNumberish, Signer, Wallet as EtherWallet } from 'ethers';
import { IPFS } from './IPFS';
import { Contract } from './Game';
import { NETWORK } from '../conf';
import text from '../scripts/text.json';

export enum EPropertyTypes {
  BROWN_01,
  BROWN_02,
  CYAN_01,
  CYAN_02,
  CYAN_03,
  PINK_01,
  PINK_02,
  PINK_03,
  ORANGE_01,
  ORANGE_02,
  ORANGE_03,
  RED_01,
  RED_02,
  RED_03,
  YELLOW_01,
  YELLOW_02,
  YELLOW_03,
  GREEN_01,
  GREEN_02,
  GREEN_03,
  BLUE_01,
  BLUE_02,
  RAILROAD_01,
  RAILROAD_02,
  RAILROAD_03,
  RAILROAD_04,
  UTILITIES_01,
  UTILITIES_02,
  KICHI,
}

export namespace Property {
  export const info = (params: { game: string; property: EPropertyTypes }) => {
    const { game, property } = params;
    const id: string = game + String(property).padStart(2, '0');
    return Contract.then((contract) =>
      Promise.all([
        contract
          .uri(id)
          .then((ipnft) => fetch(IPFS.gateway(ipnft)).then((result) => result.json())),
        contract.dataOf(game, property),
        contract.ownerOf(game, property),
      ])
    ).then(([{ image, ...info }, { level, mortgaged, ipnft }, owner]) => ({
      ...info,
      level,
      mortgaged,
      ipnft,
      owner,
      image: IPFS.gateway(image),
    }));
  };

  export const ownerOf = (params: { game: string; property: EPropertyTypes }) => {
    const { game, property } = params;
    return Contract.then((contract) => contract.ownerOf(game, property));
  };

  /**
   * Whenever you land on an unowned property you may buy that property from the Bank at its printed price. You receive the Title Deed card showing ownership. Place the title deed card face up in front of you. If you do not wish to buy the property, the Bank sells it at through an auction to the highest bidder. The high bidder pays the Bank the amount of the bid in cash and receives the Title Deed card for that property.
   *
   * Any player, including the one who declined the option to buy it at the printed price, may bid. Bidding may start at any price.
   *
   * `game` - Game ID.
   *
   * `account` - Wallet address of player.
   *
   * `property` - Property type.
   *
   * `amount` - The price he should pay the owner, if omitted, player would pay the default value.
   *
   * @beta
   */
  export const acquire = (params: {
    game: string;
    account: string;
    property: EPropertyTypes;
    amount?: number;
  }) => {
    const { game, account, property, amount } = params;
    return Promise.all([ownerOf({ game, property }), info({ game, property })]).then(
      ([owner, { properties, level, mortgaged }]) =>
        Contract.then((contract) =>
          contract.multicall([
            contract.interface.encodeFunctionData('transferMoney', [
              game,
              account,
              owner,
              amount || properties.price,
            ]),
            contract.interface.encodeFunctionData('transferProperty', [game, account, property]),
          ])
        ).then((tx) => tx.wait())
    );
  };

  /**
   * When you land on a property that is owned by another player, the owner collects rent from you in accordance with the list printed on its Title Deed card. If the property is mortgaged, no rent can be collected. When a property is mortgaged, its Title Deed card is placed face down in front of the owner.
   *
   * It is an advantage to hold all the Title Deed cards in a color-group (i.e., Boardwalk and Park Place, or Connecticut, Vermont and Oriental Avenues) because the owner may then charge double rent for unimproved properties in that colour-group. This rule applies to unmortgaged properties even if another property in that colour-group is mortgaged.
   *
   * It is even more advantageous to have houses or hotels on properties because rents are much higher than for unimproved properties. The owner may not collect the rent if they fail to ask for it before the second player following throws the dice.
   *
   * `game` - Game ID.
   *
   * `account` - Wallet address of player.
   *
   * `property` - Property type.
   *
   * @beta
   */
  export const rent = (params: { game: string; account: string; property: EPropertyTypes }) => {
    const { game, account, property } = params;
    return Promise.all([ownerOf({ game, property }), info({ game, property })]).then(
      ([owner, { properties, level, mortgaged }]) =>
        Contract.then((contract) =>
          contract.multicall([
            contract.interface.encodeFunctionData('transferMoney', [
              game,
              account,
              owner,
              properties.price,
            ]),
            contract.interface.encodeFunctionData('transferProperty', [game, account, property]),
          ])
        ).then((tx) => tx.wait())
    );
  };
}
