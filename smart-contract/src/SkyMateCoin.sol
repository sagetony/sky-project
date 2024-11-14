// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";

/**
 * @title SkyMateCoin
 * @dev ERC20 token with vesting schedules for different allocations, pausability, and owner-controlled minting and burning.
 */
contract SkyMateCoin is ERC20, Ownable, ERC20Pausable {
    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          ERRORS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    error SkyMateCoin_AllocationFundCompleted();
    error SkyMateCoin_AllocationPeriodNotYetReady();
    error SkyMateCoin_ZeroAddress();

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          STORAGE                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    struct VestingSchedule {
        string name;
        address admin;
        uint256 maxAmount;
        uint256 totalMinted;
        uint256 lastAllocationTime;
    }

    uint256 constant ALLOCATION_TIMING = 180 days;
    mapping(string => VestingSchedule) private vestingSchedules;

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          EVENTS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /**
     * @dev Emitted when tokens are minted for a vesting schedule allocation.
     * @param name The name of the vesting schedule.
     * @param amount The amount minted for allocation.
     */
    event AllocationMinted(string name, uint256 amount);

    /**
     * @dev Emitted when tokens are burned from a vesting schedule allocation.
     * @param name The name of the vesting schedule.
     * @param amount The amount burned from allocation.
     */
    event AllocationBurn(string name, uint256 amount);

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                        CONSTRUCTOR                         */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    /**
     * @dev Initializes the SkyMateCoin contract with an initial owner and predefined vesting schedules.
     * @param initialOwner The address to be set as the initial owner.
     */

    constructor(
        address initialOwner
    ) ERC20("SKY MATE COIN", "SMC") Ownable(msg.sender) {
        transferOwnership(initialOwner);

        // Initialize vesting schedules with predefined allocations
        vestingSchedules["Circulation"] = VestingSchedule({
            name: "Circulation",
            admin: initialOwner,
            maxAmount: 1_000_000,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Private Placement"] = VestingSchedule({
            name: "Private Placement",
            admin: initialOwner,
            maxAmount: 5_000_000,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Public Offering"] = VestingSchedule({
            name: "Public Offering",
            admin: initialOwner,
            maxAmount: 5_000_000,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Marketing Expenses"] = VestingSchedule({
            name: "Marketing Expenses",
            admin: initialOwner,
            maxAmount: 4_000_000,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Team"] = VestingSchedule({
            name: "Team",
            admin: initialOwner,
            maxAmount: 10_000_000,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Community"] = VestingSchedule({
            name: "Community",
            admin: initialOwner,
            maxAmount: 20_000_000,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["MetaCity Fund"] = VestingSchedule({
            name: "MetaCity Fund",
            admin: initialOwner,
            maxAmount: 20_000_000,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Staking Rewards"] = VestingSchedule({
            name: "Staking Rewards",
            admin: initialOwner,
            maxAmount: 5_000_000,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Donate"] = VestingSchedule({
            name: "Donate",
            admin: initialOwner,
            maxAmount: 2_000_000,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Consultant"] = VestingSchedule({
            name: "Consultant",
            admin: initialOwner,
            maxAmount: 3_000_000,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Official Marketing"] = VestingSchedule({
            name: "Official Marketing",
            admin: initialOwner,
            maxAmount: 5_000_000,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Company Reserves"] = VestingSchedule({
            name: "Company Reserves",
            admin: initialOwner,
            maxAmount: 20_000_000,
            totalMinted: 0,
            lastAllocationTime: 0
        });
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*              PUBLIC / EXTERNAL VIEW FUNCTIONS              */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    /**
     * @notice Mints tokens to a specified account.
     * @dev Only callable by the contract owner.
     * @param _amount The amount of tokens to mint.
     * @param _account The address that will receive the minted tokens.
     */
    function mint(uint256 _amount, address _account) external onlyOwner {
        _mint(_account, _amount);
    }

    /**
     * @notice Mints tokens for a specific allocation schedule.
     * @dev Only callable by the contract owner. Ensures that the allocation period is ready and amount does not exceed the maximum allowed.
     * @param _name The name of the vesting schedule.
     * @param _amount The amount of tokens to mint for allocation.
     */
    function mintForAllocation(
        string memory _name,
        uint256 _amount
    ) external onlyOwner {
        VestingSchedule storage schedule = vestingSchedules[_name];
        require(
            bytes(schedule.name).length > 0,
            "Vesting schedule does not exist"
        );

        if (schedule.totalMinted > schedule.maxAmount)
            revert SkyMateCoin_AllocationFundCompleted();

        if (schedule.lastAllocationTime == 0) {
            schedule.lastAllocationTime = block.timestamp;
        } else {
            if (
                schedule.lastAllocationTime + ALLOCATION_TIMING <
                block.timestamp
            ) revert SkyMateCoin_AllocationPeriodNotYetReady();
        }

        schedule.lastAllocationTime = block.timestamp;
        schedule.totalMinted += _amount;
        _mint(schedule.admin, _amount);

        emit AllocationMinted(_name, _amount);
    }

    /**
     * @notice Burns tokens from a specific allocation schedule.
     * @dev Only callable by the contract owner. Ensures that the allocation exists and updates the total minted accordingly.
     * @param _name The name of the vesting schedule.
     * @param _amount The amount of tokens to burn from allocation.
     */
    function burnForAllocation(
        string memory _name,
        uint256 _amount
    ) external onlyOwner {
        VestingSchedule storage schedule = vestingSchedules[_name];
        require(
            bytes(schedule.name).length > 0,
            "Vesting schedule does not exist"
        );

        if (schedule.totalMinted > schedule.maxAmount)
            revert SkyMateCoin_AllocationFundCompleted();

        schedule.totalMinted -= _amount;
        _burn(schedule.admin, _amount);

        emit AllocationBurn(_name, _amount);
    }

    /**
     * @notice Burns tokens from a specified account.
     * @dev Only callable by the contract owner.
     * @param _amount The amount of tokens to burn.
     * @param _account The address from which to burn the tokens.
     */
    function burn(uint256 _amount, address _account) external onlyOwner {
        _burn(_account, _amount);
    }

    /**
     * @notice Changes the admin of a specific vesting schedule.
     * @dev Only callable by the contract owner. Reverts if `_admin` is the zero address.
     * @param _name The name of the vesting schedule.
     * @param _admin The address of the new admin.
     */
    function changeAllocationAdmin(
        string memory _name,
        address _admin
    ) external onlyOwner {
        VestingSchedule storage schedules = vestingSchedules[_name];
        if (_admin == address(0)) revert SkyMateCoin_ZeroAddress();
        schedules.admin = _admin;
    }

    /**
     * @notice Pauses all token transfers.
     * @dev Only callable by the contract owner.
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @notice Unpauses all token transfers.
     * @dev Only callable by the contract owner.
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Overrides the ERC20 _transfer function to support pausing.
     * @param from The address from which tokens are transferred.
     * @param to The address to which tokens are transferred.
     * @param value The amount of tokens transferred.
     */
    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override(ERC20, ERC20Pausable) whenNotPaused {
        super._update(from, to, value);
    }
}
