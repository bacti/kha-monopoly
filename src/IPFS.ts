import fs from 'fs';
import path from 'path';
import { NFTStorage, File } from 'nft.storage';
import { NFT_STORAGE_KEY as token } from '../conf';

export type IProperty = {
  property_type: string;
  property_group: string;
  name: string;
  price: number;
  build: number;
  level_0: number;
  level_1: number;
  level_2?: number;
  level_3?: number;
  level_4?: number;
  level_5?: number;
  level_6?: number;
  icon?: string;
};

export namespace IPFS {
  const ipfsClient = new NFTStorage({ token });

  export const gateway = (uri: string) => uri.replace(/^ipfs:\//, 'https://ipfs.io/ipfs');

  export const upload = (params: { id: string; item: IProperty }) => {
    const { id, item } = params;
    const { name, icon = 'street.png', ...info } = item;
    return ipfsClient.store({
      name: `${name} #${id}`,
      description: '',
      image: new File(
        [fs.readFileSync(path.join(__dirname, '../monopoly/public/img', icon))],
        icon,
        { type: 'image/png' }
      ),
      properties: {
        game_id: id,
        ...info,
      },
    });
  };
}
