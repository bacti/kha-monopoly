import { expect } from 'chai';
import { NETWORK } from '../conf';
import { EPropertyTypes, Property } from '../src/Property';
import { Game } from '../src/Game';

describe('Game', function () {
  const { BANKER, USER } = NETWORK;
  const ID = String(Math.random()).slice(-6);
  this.timeout(200000);

  it('Create Game', () => {
    return Game.create(ID).then(console.log);
  });

  it('Info', () => {
    return Property.info({ game: ID, property: EPropertyTypes.CYAN_01 }).then(console.log);
  });

  it('Check BANKER balance', () => {
    return Game.checkBalance({ game: ID, account: BANKER }).then((balance) => {
      console.log({ type: 'BANKER', balance });
      expect(balance).to.equal('1000000');
    });
  });

  it('Transfer 1500 from BANKER to USER', () => {
    return Game.transferMoney({ game: ID, from: BANKER, to: USER, amount: 1500 }).then(() =>
      Promise.all([
        Game.checkBalance({ game: ID, account: BANKER }).then((balance) => {
          console.log({ type: 'BANKER', balance });
          expect(balance).to.equal('998500');
        }),
        Game.checkBalance({ game: ID, account: USER }).then((balance) => {
          console.log({ type: 'USER', balance });
          expect(balance).to.equal('1500');
        }),
      ])
    );
  });

  it('Transfer another 1500 from BANKER to USER', () => {
    return Game.transferMoney({ game: ID, from: BANKER, to: USER, amount: 1500 }).then(() =>
      Promise.all([
        Game.checkBalance({ game: ID, account: BANKER }).then((balance) => {
          console.log({ type: 'BANKER', balance });
          expect(balance).to.equal('997000');
        }),
        Game.checkBalance({ game: ID, account: USER }).then((balance) => {
          console.log({ type: 'USER', balance });
          expect(balance).to.equal('3000');
        }),
      ])
    );
  });

  it('Purchase property - cost 100', () =>
    Property.info({ game: ID, property: EPropertyTypes.CYAN_01 }).then(
      ({ name, properties, owner }) => {
        expect(name).to.contain('Bưu Điện Hà Nội');
        expect(owner).to.match(new RegExp(BANKER, 'i'));
        expect(properties.price).to.equal(100);
        return Property.acquire({ game: ID, account: USER, property: EPropertyTypes.CYAN_01 }).then(
          () =>
            Promise.all([
              Game.checkBalance({ game: ID, account: BANKER }).then((balance) => {
                console.log({ type: 'BANKER', balance });
                expect(balance).to.equal('997100');
              }),
              Game.checkBalance({ game: ID, account: USER }).then((balance) => {
                console.log({ type: 'USER', balance });
                expect(balance).to.equal('2900');
              }),
              Property.ownerOf({ game: ID, property: EPropertyTypes.CYAN_01 }).then((owner) => {
                expect(owner).to.match(new RegExp(USER, 'i'));
              }),
            ])
        );
      }
    ));

  it('Auction property - cost 10', () =>
    Property.info({ game: ID, property: EPropertyTypes.CYAN_02 }).then(
      ({ name, properties, owner }) => {
        expect(name).to.contain('Nhà Hát Lớn');
        expect(owner).to.match(new RegExp(BANKER, 'i'));
        expect(properties.price).to.equal(100);
        return Property.acquire({
          game: ID,
          account: USER,
          property: EPropertyTypes.CYAN_02,
          amount: 10,
        }).then(() =>
          Promise.all([
            Game.checkBalance({ game: ID, account: BANKER }).then((balance) => {
              console.log({ type: 'BANKER', balance });
              expect(balance).to.equal('997110');
            }),
            Game.checkBalance({ game: ID, account: USER }).then((balance) => {
              console.log({ type: 'USER', balance });
              expect(balance).to.equal('2890');
            }),
            Property.ownerOf({ game: ID, property: EPropertyTypes.CYAN_02 }).then((owner) => {
              expect(owner).to.match(new RegExp(USER, 'i'));
            }),
          ])
        );
      }
    ));
});
