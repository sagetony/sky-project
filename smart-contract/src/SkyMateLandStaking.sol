// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import {ISkyMateNFT} from "../src/interface/ISkyMateNFT.sol";
import {SkyMateNFT} from "./SkyMateNFT.sol";

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
    error SkyMateStaking_InsufficentEtherForRewards();
    error SkyMateStaking_RewardAlreadyClaimed();
    error SkyMateStaking_UserWithThisZoneCannotStake();

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          EVENTS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    event Staked(address indexed user, uint256 tokenId, uint256 duration);
    event Unstaked(address indexed user, uint256 tokenId);
    event ClaimRewards(address indexed user, uint256 tokenId, uint256 reward);

    /*´:°•.°+.*•´.*:˚.°*.˚•´.*:˚.°*.˚•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          STORAGE                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    ISkyMateNFT public immutable skyMateNFT;
    // SkyMateNFT public immutable nft;

    struct Stake {
        address owner;
        uint256 startTime;
        uint256 duration;
        uint256 lastClaimTimestamp;
        uint256 rewardRate;
        uint256 expectedRewards;
        uint256 accumulatedRewards;
        bool isRewardClaimed;
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
    uint256 public totalStakes; // Tracks the number of stakes including unstacked

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
        if (totalStakes > MAXIMUM_STAKES) {
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

        // Determine the eligibility of the staker
        ISkyMateNFT.Land memory land = skyMateNFT.getLand(tokenId);
        string memory zone = string(abi.encodePacked(bytes(land.zoneName)[0]));

        if (
            keccak256(bytes(zone)) != keccak256(bytes("H")) &&
            keccak256(bytes(zone)) != keccak256(bytes("K")) &&
            keccak256(bytes(zone)) != keccak256(bytes("E"))
        ) revert SkyMateStaking_UserWithThisZoneCannotStake();

        // Determine reward rate
        uint256 rewardRate;
        if (duration == DURATION_30_DAYS) rewardRate = RATE_30_DAYS;
        else if (duration == DURATION_90_DAYS) rewardRate = RATE_90_DAYS;
        else if (duration == DURATION_1_YEAR) rewardRate = RATE_1_YEAR;
        else if (duration == DURATION_2_YEARS) rewardRate = RATE_2_YEARS;

        uint256 _calculatedEarnings = calculateEarnings(tokenId, rewardRate);
        uint256 _expectedRewards = _calculatedEarnings * (duration / 30 days);
        // Record stake
        stakes[tokenId] = Stake({
            owner: msg.sender,
            startTime: block.timestamp,
            duration: duration,
            lastClaimTimestamp: 0,
            expectedRewards: _expectedRewards,
            rewardRate: rewardRate,
            accumulatedRewards: 0,
            isRewardClaimed: false
        });

        // Increment active stakes
        activeStakes++;

        // Increment total stakes
        totalStakes++;

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

        // Delete stake
        delete stakes[tokenId];

        // Decrement active stakes
        activeStakes--;

        // Transfer NFT back and send reward
        skyMateNFT.transferFrom(address(this), msg.sender, tokenId);

        emit Unstaked(msg.sender, tokenId);
    }

    /**
     * @dev Land owners can claim rewards
     * @param tokenId The tokenId for the land
     */
    function claimReward(uint256 tokenId) external {
        Stake storage stake = stakes[tokenId];

        if (stake.owner != msg.sender) revert SkyMateStaking_NotOwner();
        if (block.timestamp < stake.startTime + stake.duration) {
            revert SkyMateStaking_StakePeriodNotEnded();
        }

        uint256 rewardRate = stake.rewardRate;
        uint256 rewards = calculateEarnings(tokenId, rewardRate);
        stake.accumulatedRewards += rewards;

        if (stake.accumulatedRewards > stake.expectedRewards) {
            revert SkyMateStaking_RewardAlreadyClaimed();
        }

        if (address(this).balance < rewards)
            revert SkyMateStaking_InsufficentEtherForRewards();
        (bool success, ) = payable(stake.owner).call{value: rewards}("");
        if (!success) revert SkyMateStaking_TransactionFailed();

        emit ClaimRewards(stake.owner, tokenId, rewards);
    }

    /**
     * @dev Calculates earnings based on the staked amount, annual yield rate, and time elapsed.
     * @param tokenId LandNFT Id.
     * @param yieldRate yieldrate of the staked period
     * @return Earnings calculated based on the inputs.
     */
    function calculateEarnings(
        uint256 tokenId,
        uint256 yieldRate
    ) public view returns (uint256) {
        ISkyMateNFT.Land memory land = skyMateNFT.getLand(tokenId);
        uint256 price = land.price;
        return (price * yieldRate) / (10000 * 12);
    }

    /**
     * @dev Get the staked land.
     * @param _index Index of the land.
     * @return It returns the Staked Land.
     */
    function getStakedLand(
        uint256 _index
    ) external view returns (Stake memory) {
        return stakes[_index];
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
