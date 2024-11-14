// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title StakingContract
 * @dev A contract for staking tokens and earning rewards based on staking duration and annual yield rates.
 */
contract Staking is Ownable {
    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          ERRORS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    error Staking_FailedTransaction();
    error Staking_AmountCannotBeZero();
    error Staking_StakingNotOver();
    error Staking_InvalidStakeIndex();
    error Staking_StakingNotWithdrawable();
    error Staking_RewardsCompleted();

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          STORAGE                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    IERC20 public token;
    uint32 constant SECONDS_IN_A_DAY = 86400;
    uint16 constant DAYS_IN_A_YEAR = 360;

    uint256 public totalStakedToken;
    uint256 public totalRewardDistributed;

    address private tokenowner;

    struct Stake {
        uint256 amount;
        uint32 startTimestamp;
        uint256 period;
        uint256 annualYieldRate;
        uint256 lastClaimTimestamp;
        uint256 expectedRewardTimestamp;
        uint256 expectedRewards;
        uint256 accumulatedRewards;
    }

    mapping(address => Stake[]) public stakes;
    mapping(uint256 => uint256) public stakingaprs;
    mapping(address => bool) public hasActiveStake;

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          EVENTS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    event TokensStaked(
        address indexed user,
        uint256 amount,
        uint256 period,
        uint256 annualYieldRate
    );
    event RewardsClaimed(address indexed user, uint256 amount);
    event StakeWithdrawn(address indexed user, uint256 amount);
    event EarlyWithdrawal(
        address indexed user,
        uint256 amount,
        uint256 penalty
    );
    event TokensBurned(address indexed user, uint256 amount);

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                        CONSTRUCTOR                         */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /**
     * @dev Constructor sets the token address and initializes staking limits and penalties.
     * @param _token Address of the ERC20 token used for staking.
     * @param _tokenowner Token owner.

     */
    constructor(IERC20 _token, address _tokenowner) Ownable(msg.sender) {
        transferOwnership(_tokenowner);

        token = _token;
        tokenowner = _tokenowner;

        stakingaprs[30] = 3; // 3%
        stakingaprs[90] = 7; // 7%
        stakingaprs[360] = 10; // 10%
        stakingaprs[720] = 20; // 20%
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*              PUBLIC / EXTERNAL VIEW FUNCTIONS              */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /**
     * @dev Stakes tokens for a specified period.
     * @param _amount Amount of tokens to stake.
     * @param _period Staking period in days.
     */
    function stakeTokens(uint256 _amount, uint256 _period) external {
        if (_amount == 0) revert Staking_AmountCannotBeZero();
        require(
            _period == 30 || _period == 90 || _period == 360 || _period == 720,
            "Invalid staking period"
        );

        require(
            !hasActiveStake[msg.sender],
            "You already have an active stake"
        );

        hasActiveStake[msg.sender] = true;
        totalStakedToken += _amount;

        uint256 _expectedRewards = calculateEarnings(
            _amount,
            stakingaprs[_period],
            _period
        );
        uint256 _expectedRewardTimestamp = block.timestamp +
            (_period * SECONDS_IN_A_DAY);
        stakes[msg.sender].push(
            Stake({
                amount: _amount,
                startTimestamp: uint32(block.timestamp),
                period: _period,
                annualYieldRate: stakingaprs[_period],
                lastClaimTimestamp: block.timestamp,
                expectedRewardTimestamp: _expectedRewardTimestamp,
                accumulatedRewards: 0,
                expectedRewards: _expectedRewards
            })
        );

        emit TokensStaked(msg.sender, _amount, _period, stakingaprs[_period]);

        bool success = token.transferFrom(msg.sender, address(this), _amount);
        if (!success) revert Staking_FailedTransaction();
    }

    /**
     * @dev Claims rewards for a specific stake after a period.
     * Rewards can be claimed immediately, and locked tokens can be withdrawn after the staking period.
     * @param stakeIndex Index of the stake in the stakes array.
     */
    function claimRewards(uint256 stakeIndex) external {
        if (stakeIndex >= stakes[msg.sender].length)
            revert Staking_InvalidStakeIndex();
        Stake storage stake = stakes[msg.sender][stakeIndex];
        uint256 currentTime = block.timestamp;

        if (currentTime < stake.lastClaimTimestamp + 30 days)
            revert Staking_StakingNotOver();

        uint256 earnings = calculateEarnings(
            stake.amount,
            stake.annualYieldRate,
            30
        );
        stake.accumulatedRewards += earnings;
        totalRewardDistributed += earnings;
        stake.lastClaimTimestamp = block.timestamp;

        if (stake.accumulatedRewards > stake.expectedRewards)
            revert Staking_RewardsCompleted();

        bool success = token.transfer(msg.sender, earnings);
        if (!success) revert Staking_FailedTransaction();
        emit RewardsClaimed(msg.sender, earnings);
    }

    function unstake(uint256 stakeIndex) internal {
        if (stakeIndex >= stakes[msg.sender].length)
            revert Staking_InvalidStakeIndex();
        Stake storage stake = stakes[msg.sender][stakeIndex];

        uint256 currentTime = block.timestamp;
        if (
            currentTime <
            stake.startTimestamp + (stake.period * SECONDS_IN_A_DAY)
        ) revert Staking_StakingNotOver();

        uint256 remainingearning = stake.expectedRewards -
            stake.accumulatedRewards;
        uint256 lockedAmount = stake.amount;
        uint256 totalAmount = lockedAmount + remainingearning;

        stake.accumulatedRewards += remainingearning;
        totalRewardDistributed += remainingearning;
        totalStakedToken -= lockedAmount;
        hasActiveStake[msg.sender] = false;
        stake.amount = 0;

        if (stake.accumulatedRewards > stake.expectedRewards)
            revert Staking_RewardsCompleted();

        bool success = token.transfer(msg.sender, totalAmount);
        if (!success) revert Staking_FailedTransaction();

        emit RewardsClaimed(msg.sender, totalAmount);
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                   INTERNAL/private FUNCTIONS               */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /**
     * @dev Calculates earnings based on the staked amount, annual yield rate, and time elapsed.
     * @param _amount Amount of staked tokens.
     * @param _timeElapsed Time elapsed since last calculation or stake.
     * @return Earnings calculated based on the inputs.
     */
    function calculateEarnings(
        uint256 _amount,
        uint256 _timeElapsed,
        uint256 annualYieldRate
    ) internal pure returns (uint256) {
        return
            (_amount * annualYieldRate * _timeElapsed) / (DAYS_IN_A_YEAR * 100);
    }

    /**
     * @dev Get the stake of a user.
     * @param _index Index of the stake.
     * @return It returns the stake.
     */
    function getStake(uint256 _index) public view returns (Stake memory) {
        return stakes[msg.sender][_index];
    }

    /**
     * @dev Get the stake count of a user.
     * @return Counts of the stake.
     */
    function getStakeCount() public view returns (uint256) {
        return stakes[msg.sender].length;
    }

    /**
     * @dev Get the recent stake index of a user.
     * @return Recent stake index.
     */
    function getRecentStakeIndex() public view returns (uint256) {
        require(stakes[msg.sender].length > 0, "No stakes found for the user");
        return stakes[msg.sender].length - 1;
    }
}
