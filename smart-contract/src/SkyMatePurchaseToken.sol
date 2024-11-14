// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/**
 * @title SkyMatePurchaseToken
 * @dev Users can purchase tokens with USDT or supported tokens.
 */

contract SkyMatePurchaseToken is Ownable {
    
    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          ERRORS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    error SkyMatePurchaseToken_TokenNotSupported();
    error SkyMatePurchaseToken_NotEnoughToken();
    error SkyMatePurchaseToken_InsufficientFund();
    error SkyMatePurchaseToken__StalePrice();
    error SkyMatePurchaseToken_InvalidPrice();
    error SkyMatePurchaseToken_PriceBelowMinPrice();
    error SkyMatePurchaseToken_PurchaseHasEnded();
    error SkyMatePurchaseToken_FailedTransaction();

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          STORAGE                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    IERC20 public immutable SkyMateCoin;
    uint256 private constant TIMEOUT = 1 hours;
    uint256 public constant USDT_PRICE = 0.01 * 1e6; // 0.01 USDT in smallest units (6 decimals)
    uint256 public constant SKY_MATE_PRECISION = 1e18; // SKY_MATE token precision (18 decimals)

    uint256 public totalPurchase;

    mapping(address => IERC20) public tokens;

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          EVENTS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    event PurchaseToken(address indexed user, uint256 amount);

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                        MODIFIER                         */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /**
     * @dev Modifier to check if the token is supported.
     * @param _token The address of the token to check.
     */
    modifier isSupported(address _token) {
        if (address(tokens[_token]) == address(0))
            revert SkyMatePurchaseToken_TokenNotSupported();
        _;
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                        CONSTRUCTOR                         */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /**
     * @dev Constructor that initializes the contract with the initial owner, price feed address, and supported tokens.
     * @param _usdt The address of the USDT token.
     */
    constructor(
        IERC20 _token,
        address _usdt,
        address initialOwner
    ) Ownable(msg.sender) {
        transferOwnership(initialOwner);
        SkyMateCoin = _token;

        // Store supported assets
        tokens[_usdt] = IERC20(_usdt);
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*              PUBLIC / EXTERNAL VIEW FUNCTIONS              */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    /**
     * @dev Allows users to purchase SkyMate tokens using supported tokens (e.g., USDT).
     * @param token The address of the supported token.
     * @param amount The amount of the supported token to spend.
     */
    function buy(address token, uint256 amount) external isSupported(token) {
        if (amount < USDT_PRICE)
            revert SkyMatePurchaseToken_PriceBelowMinPrice();

        uint256 tokensToMint = (amount * SKY_MATE_PRECISION) / (USDT_PRICE);

        if (tokensToMint > SkyMateCoin.balanceOf(address(this)))
            revert SkyMatePurchaseToken_InsufficientFund();

        totalPurchase += tokensToMint;

        bool success = tokens[token].transferFrom(
            msg.sender,
            address(this),
            amount
        );
        if (!success) revert SkyMatePurchaseToken_FailedTransaction();

        // Transfer tokens from owner to buyer
        bool positive = SkyMateCoin.transfer(msg.sender, tokensToMint);

        if (!positive) revert SkyMatePurchaseToken_FailedTransaction();

        emit PurchaseToken(msg.sender, tokensToMint);
    }

    /**
     * @dev Allows the owner to withdraw supported tokens from the contract.
     * @param amount The amount of the supported token to withdraw.
     * @param token The address of the supported token.
     */
    function withdrawTokens(
        uint256 amount,
        address token
    ) external onlyOwner isSupported(token) {
        if (amount > IERC20(token).balanceOf(address(this)))
            revert SkyMatePurchaseToken_NotEnoughToken();

        IERC20(token).transfer(owner(), amount);
    }
}
