import * as dotenv from 'dotenv';
dotenv.config();

const {
  DEFAULT_NETWORK = 'kha_network',
  BSC_PRIVATE_KEY = '',
  KICHI_PRIVATE_KEY = '',
  USER_SECRET = '',
  NFT_STORAGE_KEY = '',
  ETHERSCAN_API_KEY,
} = process.env;
export { USER_SECRET, NFT_STORAGE_KEY, ETHERSCAN_API_KEY };

const Networks = {
  bsc_testnet: {
    RPC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    PRIVATE_KEY: BSC_PRIVATE_KEY,
    BANKER: '0x24BCB06E3BEd4c9D73005Bf07c037EA04bC1488F',
    USER: '0x4411c0cBd9e05E23b990A6ACfaD88D1AD9717462',
    ADDRESS: '0x32E1d1b7A1ddDB5f11f901Bc9f760FD54A0b4d9D',
  },
  kha_network: {
    RPC_URL: 'http://localhost:9545',
    PRIVATE_KEY: KICHI_PRIVATE_KEY,
    BANKER: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    USER: '0x4411c0cBd9e05E23b990A6ACfaD88D1AD9717462',
    ADDRESS: '0x172076E0166D1F9Cc711C77Adf8488051744980C',
  },
};

export const NETWORK = Networks[DEFAULT_NETWORK];
