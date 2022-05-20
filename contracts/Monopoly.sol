//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/utils/Multicall.sol';
import 'hardhat/console.sol';

contract Monopoly is ERC1155, Multicall {
  uint8 constant KICHI = 28;

  struct Property {
    uint8 level;
    bool mortgaged;
    string ipnft;
  }

  mapping(uint256 => address) private _owners;
  mapping(uint256 => mapping(uint256 => Property)) private _properties;

  constructor() ERC1155('ipfs://') {}

  function createGame(uint256 gameId, string[KICHI] memory ipnfts) public {
    for (uint256 i; i < KICHI; i++) {
      uint256 tokenId = gameId * 100 + i;
      _properties[gameId][i] = Property({ level: 0, mortgaged: false, ipnft: ipnfts[i] });
      _mint(msg.sender, tokenId, 1, '');
      _owners[tokenId] = msg.sender;
    }
    _mint(msg.sender, gameId * 100 + KICHI, 1e6, '');
  }

  function transferMoney(
    uint256 gameId,
    address from,
    address to,
    uint256 amount
  ) public {
    require(
      balanceOf(from, gameId * 100 + KICHI) >= amount,
      'Monopoly: insufficient balance for transfer'
    );
    return safeTransferFrom(from, to, gameId * 100 + KICHI, amount, '');
  }

  function transferProperty(
    uint256 gameId,
    address to,
    uint8 propertyType
  ) public {
    uint256 tokenId = gameId * 100 + propertyType;
    require(_owners[tokenId] != to, 'Monopoly: property transfers to its owner');
    require(
      _properties[gameId][propertyType].level == 0,
      'Monopoly: Only unimproved properties may be transfered.'
    );
    safeTransferFrom(_owners[tokenId], to, tokenId, 1, '');
    _owners[tokenId] = to;
  }

  function updateProperty(
    uint256 gameId,
    uint8 propertyType,
    uint8 level,
    bool mortgaged
  ) public {
    uint8 _level = _properties[gameId][propertyType].level;
    require(
      _level == level - 1 || _level == level + 1,
      'Monopoly: update illegal level of property.'
    );
    _properties[gameId][propertyType].level = level;
    require(
      _properties[gameId][propertyType].mortgaged != mortgaged,
      'Monopoly: update illegal mortgaged state of property.'
    );
    _properties[gameId][propertyType].mortgaged = mortgaged;
  }

  function uri(uint256 id) public view override returns (string memory) {
    return
      string(
        abi.encodePacked(super.uri(id), _properties[id / 100][id % 100].ipnft, '/metadata.json')
      );
  }

  function dataOf(uint256 gameId, uint8 propertyType) public view returns (Property memory) {
    return _properties[gameId][propertyType];
  }

  function ownerOf(uint256 gameId, uint8 propertyType) public view returns (address) {
    address owner = _owners[gameId * 100 + propertyType];
    require(owner != address(0), 'Monopoly: owner query for nonexistent token');
    return owner;
  }

  function balanceOf(uint256 gameId, address account) public view returns (uint256) {
    return balanceOf(account, gameId * 100 + KICHI);
  }
}
