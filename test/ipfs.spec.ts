import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { NFTStorage, File, Blob } from 'nft.storage';
import { expect } from 'chai';
import { IPFS } from '../src/IPFS';
import text from '../scripts/text.json';

describe('NFT.Storage', function () {
  const ipfsClient = new NFTStorage({
    token: process.env.NFT_STORAGE_KEY as string,
  });
  this.timeout(20000);

  // it('store ERC1155 NFT data', (done) => {
  //   const GAME_ID = 123456;
  //   ipfsClient
  //     .store({
  //       name: `Phố Cổ #${GAME_ID}`,
  //       description: '',
  //       image: new File(
  //         [fs.readFileSync(path.join(__dirname, '../monopoly/public/img/street.png'))],
  //         'street.png',
  //         { type: 'image/png' }
  //       ),
  //       properties: {
  //         game_id: GAME_ID,
  //         price: 60,
  //         build: 50,
  //         level_0: 2,
  //         level_1: 4,
  //         level_2: 10,
  //         level_3: 30,
  //         level_4: 90,
  //         level_5: 160,
  //         level_6: 250,
  //       },
  //     })
  //     .then((token) =>
  //       Promise.all([
  //         fetch(`https://ipfs.io/ipfs/${token.ipnft}/metadata.json`).then((result) =>
  //           result.json()
  //         ),
  //         ipfsClient.check(token.ipnft),
  //         console.log({ token }),
  //       ])
  //     )
  //     .then(console.log)
  //     .then(done);
  // });

  it('store ERC1155 NFT data', (done) => {
    IPFS.upload({
      id: String(Math.random()).slice(-6),
      item: text[10],
    })
      .then((token) =>
        Promise.all([
          fetch(`https://ipfs.io/ipfs/${token.ipnft}/metadata.json`).then((result) =>
            result.json()
          ),
          ipfsClient.check(token.ipnft),
          console.log({ token }),
        ])
      )
      .then(console.log)
      .then(done);
  });
});
