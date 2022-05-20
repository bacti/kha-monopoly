import json
import os
import pytest
from web3 import EthereumTesterProvider, Web3
from web3.middleware import geth_poa_middleware

RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545'
OWNER = '0x24BCB06E3BEd4c9D73005Bf07c037EA04bC1488F'
ADDRESS_PROPERTIES = Web3.toChecksumAddress(
    '0x4e7b17Ec3F450B2d186663403269C1092846E626')

# RPC_URL = 'http://kichi-network:9545'
# OWNER = Web3.toChecksumAddress('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')
# ADDRESS_PROPERTIES = Web3.toChecksumAddress(
#     '0x5fbdb2315678afecb367f032d93f642f64180aa3')


@pytest.fixture
def tester_provider():
  return EthereumTesterProvider()


@pytest.fixture
def eth_tester(tester_provider):
  return tester_provider.ethereum_tester


@pytest.fixture
def w3(tester_provider):
  w3 = Web3(Web3.HTTPProvider(RPC_URL))
  w3.middleware_onion.inject(geth_poa_middleware, layer=0)
  return w3


@pytest.fixture
def contract(eth_tester, w3):
  with open("artifacts/contracts/Properties.sol/Properties.json", "r") as f:
    data = json.load(f)

  # instantiate and return an instance of our contract.
  return w3.eth.contract(address=ADDRESS_PROPERTIES, abi=data['abi'])


def test_property(contract, w3):
  transaction = contract.functions \
      .initializeProperty(('BROWN_01', "brown", "Phố Cổ", 60, 50, 2, 4, 10, 30, 90, 160, 250)) \
      .buildTransaction({
          'from': OWNER,
          'gas': 2000000,
          'gasPrice': w3.eth.gas_price,
          'nonce':  w3.eth.get_transaction_count(OWNER)
      })
  signed_txn = w3.eth.account.sign_transaction(
      transaction, private_key=os.environ['BSC_PRIVATE_KEY'])
  w3.eth.send_raw_transaction(signed_txn.rawTransaction)

  properties = contract.caller({'from': OWNER}).loadProperties()
  assert properties[0][2] == 'Phố Cổ'


# def test_latest_block(w3):
#   block = w3.eth.get_block('latest')
#   assert block.difficulty == 2
