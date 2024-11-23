// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

interface Errors {
    /// @notice Error for invalid asset address.
    error InvalidAssetAddress();

    /// @notice Error for mismatch between vault's asset and expected asset.
    error VaultAssetMismatch();

    /// @notice Error for invalid vault fees configuration.
    error InvalidVaultFees();

    /// @notice Error for invalid fee recipient address.
    error InvalidFeeRecipient();

    /// @notice Error for operations involving a zero amount.
    error ZeroAmount();

    /// @notice Error for operations involving a zero amount.
    error InvalidAmount();

    /// @notice Error for invalid recipient address.
    error InvalidRecipient();

    /// @notice Error for exceeding maximum allowed value or count.
    error MaxError();

    /// @notice Error for exceeding substraction.
    error InvalidSubstraction();

    error QueueNotSet();

    error InsufficientVaultFunds(
        address vault,
        uint256 amount,
        uint256 available
    );
    /// @notice Error for total allotment exceeding allowed maximum.
    error AllotmentTotalTooHigh();

    /// @notice Error for expired permit deadline.
    /// @param deadline The deadline timestamp that has been exceeded.
    error PermitDeadlineExpired(uint256 deadline);

    /// @notice Error for invalid signer address.
    /// @param signer The address of the invalid signer.
    error InvalidSigner(address signer);

    /// @notice Error for vault being in an idle state when an active state is required.
    error VaultIsIdle();

    /// @notice Error for invalid implementation identifier.
    /// @param id The bytes32 identifier of the implementation.
    error InvalidImplementation(bytes32 id);

    /// @notice Error for failed initialization of a vault deployment.
    error VaultDeployInitFailed();

    /// @notice Error for an implementation identifier that already exists.
    /// @param id The bytes32 identifier of the existing implementation.
    error ImplementationAlreadyExists(bytes32 id);

    /// @notice Error for a non-existent implementation identifier.
    /// @param id The bytes32 identifier of the non-existent implementation.
    error ImplementationDoesNotExist(bytes32 id);

    /// @notice Error for attempting to add a vault that already exists.
    error VaultAlreadyExists();

    error VaultZeroAddress();

    error VaultDoesNotExist(address vault);

    error TotalVaultsAllowedExceeded(uint256 total);

    error VaultByTokenLimitExceeded(address token, uint256 total);

    error InvalidWithdrawlQueue();

    error InvalidDepositLimit();

    error UnfinalizedWithdrawl(address queue);

    error NotImplemented();

    error ERC20ApproveFail();

    error AdditionFail();

    error RemoveFail();

    error InvalidRewardTokenAddress();

    error RewardTokenAlreadyApproved();

    error RewardTokenNotApproved();

    error AccumulatedFeeAccountedMustBeZero();

    error MultipleProtectStrat();

    error StrategyHasLockedAssets(address strategy);

    error InvalidIndex(uint256 index);

    error InvalidLength(uint256 argLength, uint256 expectedLength);
    // TokenRegistry errors /////////////////////////////////////////////////

    /// @notice Error for a token already being registered.
    /// @param tokenAddress The address of the token.
    error TokenAlreadyRegistered(address tokenAddress);

    /// @notice Error for a token not being registered.
    /// @param tokenAddress The address of the token.
    error TokenNotRegistered(address tokenAddress);

    /// @notice Error for a token not being a reward token.
    /// @param tokenAddress The address of the token.
    error NotValidRewardToken(address tokenAddress);

    /// @notice Treasury on the TokenRegistry is already set.
    error TreasuryAlreadySet(address attacker);

    /// @notice Unregistered tokens cannot be rewards.
    /// @param tokenAddress The address of the token.
    error UnregisteredTokensCannotBeRewards(address tokenAddress);

    /// @notice Error for a the treasury to be set to the zero address on constructor.
    error InvalidTreasuryAddress();

    // Swapper errors //////////////////////////////////////////////////////

    /// @notice The amount of a reward token is not available for withdrawal.
    /// @param token The address of the reward token.
    /// @param amount The amount required.
    error NotAvailableForWithdrawal(address token, uint256 amount);

    /// @notice The treasury change request cooldown has not elapsed.
    /// @param sender The address of the sender.
    error TreasuryChangeRequestCooldownNotElapsed(address sender);

    // RewardManager errors /////////////////////////////////////////////////

    /// @notice The base reward rate must be less than 100%.
    error SwapperBaseRewardrate();

    /// @notice The maximum progression factor must be less than 100%.
    error SwapperMaxProgressionFactor();

    /// @notice The bonus reward rate for the user must be less than 100%.
    error SwapperBonusRewardrateUser();

    /// @notice The bonus reward rate for the ctToken must be less than 100%.
    error SwapperBonusRewardrateCtToken();

    /// @notice The bonus reward rate for the swap token must be less than 100%.
    error SwapperBonusRewardrateSwapToken();

    /// @notice Invalid Address
    error InvalidUserAddress();

    //Oracle plug
    /// @notice Invalid Token Registry Address
    error InvalidTokenRegistry();

    //Claim Router errors //////////////////////////////////////////////////

    error InvalidVaultRegistry();

    error BlueprintUnauthorizedAccount(address account);

    error InvalidDefaultAdminAddress();

    error NoProtectionStrategiesFound();

    error OnlyVault(address caller);

    //Protect strategy errors ///////////////////////////////////////////////

    error ProtectUnauthorizedAccount(address account);

    error ClaimRouterUnauthorizedAccount(address account);

    error InvalidClaimRouterAddress();
}
