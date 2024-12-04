// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import {ISkyMateNFT} from "../src/interface/ISkyMateNFT.sol";

contract SkyMateLandStaking is Ownable {
    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          ERRORS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    error SkyMateStaking_InvalidDuration();
    error SkyMateStaking_NotOwner();
    error SkyMateStaking_AlreadyStaked();
    error SkyMateStaking_NotStaked();
    error SkyMateStaking_StakePeriodNotEnded();
    error SkyMateStaking_TransactionFailed();
    error SkyMateStaking_MaximumStakesReached();

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          EVENTS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    event Staked(address indexed user, uint256 tokenId, uint256 duration);
    event Unstaked(address indexed user, uint256 tokenId, uint256 reward);

    /*´:°•.°+.*•´.*:˚.°*.˚•´.*:˚.°*.˚•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          STORAGE                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    ISkyMateNFT public immutable skyMateNFT;

    struct Stake {
        address owner;
        uint256 startTime;
        uint256 duration;
        uint256 rewardRate;
    }

    // Land price mapping (average price on the 1st of each month)
    mapping(uint256 => uint256) public monthlyAveragePrices;

    // Stake data for each NFT
    mapping(uint256 => Stake) public stakes;

    // Staking duration constants (in seconds)
    uint256 public constant DURATION_30_DAYS = 30 days;
    uint256 public constant DURATION_90_DAYS = 90 days;
    uint256 public constant DURATION_1_YEAR = 365 days;
    uint256 public constant DURATION_2_YEARS = 2 * 365 days;

    // Annualized rates (in basis points: 1% = 100)
    uint256 public constant RATE_30_DAYS = 300;
    uint256 public constant RATE_90_DAYS = 500;
    uint256 public constant RATE_1_YEAR = 800;
    uint256 public constant RATE_2_YEARS = 1200;

    // Maximum number of stakes
    uint256 public constant MAXIMUM_STAKES = 100;
    uint256 public activeStakes; // Tracks the current number of active stakes

    /*´:°•.°+.*•´.*:˚.°*.˚•´.*:˚.°*.˚•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                        CONSTRUCTOR                         */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    constructor(
        address skyMateNFTAddress,
        address initialOwner
    ) Ownable(initialOwner) {
        skyMateNFT = ISkyMateNFT(skyMateNFTAddress);
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.*:˚.°*.˚•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                         FUNCTIONS                          */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    /**
     * @dev Stake an NFT for a specific duration.
     * @param tokenId The token ID of the land to be staked.
     * @param duration The staking duration in seconds.
     */
    function stakeLand(uint256 tokenId, uint256 duration) external {
        if (
            duration != DURATION_30_DAYS &&
            duration != DURATION_90_DAYS &&
            duration != DURATION_1_YEAR &&
            duration != DURATION_2_YEARS
        ) {
            revert SkyMateStaking_InvalidDuration();
        }

        // Check maximum stake limit
        if (activeStakes >= MAXIMUM_STAKES) {
            revert SkyMateStaking_MaximumStakesReached();
        }

        // Check ownership
        if (skyMateNFT.ownerOf(tokenId) != msg.sender) {
            revert SkyMateStaking_NotOwner();
        }

        // Check if already staked
        if (stakes[tokenId].owner != address(0)) {
            revert SkyMateStaking_AlreadyStaked();
        }

        // Determine reward rate
        uint256 rewardRate;
        if (duration == DURATION_30_DAYS) rewardRate = RATE_30_DAYS;
        else if (duration == DURATION_90_DAYS) rewardRate = RATE_90_DAYS;
        else if (duration == DURATION_1_YEAR) rewardRate = RATE_1_YEAR;
        else if (duration == DURATION_2_YEARS) rewardRate = RATE_2_YEARS;

        // Record stake
        stakes[tokenId] = Stake({
            owner: msg.sender,
            startTime: block.timestamp,
            duration: duration,
            rewardRate: rewardRate
        });

        // Increment active stakes
        activeStakes++;

        // Transfer NFT to contract
        skyMateNFT.transferFrom(msg.sender, address(this), tokenId);

        emit Staked(msg.sender, tokenId, duration);
    }

    /**
     * @dev Unstake an NFT and claim rewards.
     * @param tokenId The token ID of the staked land.
     */
    function unstakeLand(uint256 tokenId) external {
        Stake memory stake = stakes[tokenId];
        if (stake.owner != msg.sender) revert SkyMateStaking_NotOwner();
        if (block.timestamp < stake.startTime + stake.duration) {
            revert SkyMateStaking_StakePeriodNotEnded();
        }

        // Calculate rewards
        uint256 averagePrice = getAveragePrice();
        uint256 reward = (averagePrice * stake.rewardRate * stake.duration) /
            (365 days * 10000);

        // Delete stake
        delete stakes[tokenId];

        // Decrement active stakes
        activeStakes--;

        // Transfer NFT back and send reward
        skyMateNFT.transferFrom(address(this), msg.sender, tokenId);
        (bool success, ) = payable(msg.sender).call{value: reward}("");
        if (!success) revert SkyMateStaking_TransactionFailed();

        emit Unstaked(msg.sender, tokenId, reward);
    }

    /**
     * @dev Admin function to set monthly average price.
     * @param month The month index (e.g., 202401 for Jan 2024).
     * @param price The average price of land in wei.
     */
    function setMonthlyAveragePrice(uint256 month, uint256 price) external {
        monthlyAveragePrices[month] = price;
    }

    /**
     * @dev Retrieve the average price of land for rewards calculation.
     * For simplicity, this returns a single hardcoded price or a dynamic average.
     */
    function getAveragePrice() public pure returns (uint256) {
        // Replace with real price calculation logic
        return 1 ether;
    }

    /**
     * @dev Allow owner to withdraw ETH from the contract.
     */
    function withdrawETH(address receipent) external onlyOwner {
        (bool success, ) = payable(receipent).call{
            value: address(this).balance
        }("");
        if (!success) revert SkyMateStaking_TransactionFailed();
    }

    receive() external payable {}
}
