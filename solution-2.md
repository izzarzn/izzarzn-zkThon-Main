'''sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.2/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.8.2/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts@4.8.2/access/Ownable.sol";

contract ZkThon is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("zkThon", "ZKT") {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
'''


Transaction Hash - 0x4fc025825012459951def5a3e92511989cb9f8966c11931c4a310e870e8bf3ee

Contract - 0x68c5b8CAa86B5E32645A33Fe41AE6d132A889FAc
