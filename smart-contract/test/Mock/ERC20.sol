// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the OpenZeppelin ERC20 implementation
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    /**
     * @dev Constructor that gives msg.sender all initial tokens.
     * @param name_ The name of the token.
     * @param symbol_ The symbol of the token.
     * @param decimal_ The decimal of the token.
     * @param initialSupply The initial supply of tokens (in whole units, adjusted for decimals).
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 decimal_,
        uint256 initialSupply
    ) ERC20(name_, symbol_) {
        _mint(msg.sender, initialSupply * (10 ** decimal_));
    }
}
