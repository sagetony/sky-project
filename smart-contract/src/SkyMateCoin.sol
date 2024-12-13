// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SkyMateCoin
 * @dev ERC20 token with vesting schedules for different allocations, pausability, and owner-controlled minting and burning.
 */
contract SkyMateCoin is ERC20, Ownable {
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

    bytes32 immutable CIRCULATION = keccak256("Circulation");
    bytes32 immutable PRIVATE_PLACEMENT = keccak256("Private Placement");
    bytes32 immutable PUBLIC_OFFERING = keccak256("Public Offering");
    bytes32 immutable MARKETING_EXPENSES = keccak256("Marketing Expenses");
    bytes32 immutable TEAM = keccak256("Team");
    bytes32 immutable COMMUNITY = keccak256("Community");
    bytes32 immutable METACITY_FUND = keccak256("MetaCity Fund");
    bytes32 immutable STAKING_REWARDS = keccak256("Staking Rewards");
    bytes32 immutable DONATE = keccak256("Donate");
    bytes32 immutable CONSULTANT = keccak256("Consultant");
    bytes32 immutable OFFICIAL_MARKETING = keccak256("Official Marketing");
    bytes32 immutable COMPANY_RESERVE = keccak256("Company Reserves");

    uint256 immutable ALLOCATION_TIMING = 180 days;
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
    ) ERC20("SKY MATE COIN", "SMC") Ownable(initialOwner) {
        // Initialize vesting schedules with predefined allocations
        vestingSchedules["Circulation"] = VestingSchedule({
            name: "Circulation",
            admin: initialOwner,
            maxAmount: 1_000_000 ether,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Private Placement"] = VestingSchedule({
            name: "Private Placement",
            admin: initialOwner,
            maxAmount: 5_000_000 ether,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Public Offering"] = VestingSchedule({
            name: "Public Offering",
            admin: initialOwner,
            maxAmount: 5_000_000 ether,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Marketing Expenses"] = VestingSchedule({
            name: "Marketing Expenses",
            admin: initialOwner,
            maxAmount: 4_000_000 ether,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Team"] = VestingSchedule({
            name: "Team",
            admin: initialOwner,
            maxAmount: 10_000_000 ether,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Community"] = VestingSchedule({
            name: "Community",
            admin: initialOwner,
            maxAmount: 20_000_000 ether,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["MetaCity Fund"] = VestingSchedule({
            name: "MetaCity Fund",
            admin: initialOwner,
            maxAmount: 20_000_000 ether,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Staking Rewards"] = VestingSchedule({
            name: "Staking Rewards",
            admin: initialOwner,
            maxAmount: 5_000_000 ether,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Donate"] = VestingSchedule({
            name: "Donate",
            admin: initialOwner,
            maxAmount: 2_000_000 ether,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Consultant"] = VestingSchedule({
            name: "Consultant",
            admin: initialOwner,
            maxAmount: 3_000_000 ether,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Official Marketing"] = VestingSchedule({
            name: "Official Marketing",
            admin: initialOwner,
            maxAmount: 5_000_000 ether,
            totalMinted: 0,
            lastAllocationTime: 0
        });

        vestingSchedules["Company Reserves"] = VestingSchedule({
            name: "Company Reserves",
            admin: initialOwner,
            maxAmount: 20_000_000 ether,
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
    function mint(address _account, uint256 _amount) external onlyOwner {
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
            bytes(schedule.name).length != 0,
            "Vesting schedule does not exist"
        );

        if (schedule.totalMinted + _amount > schedule.maxAmount)
            revert SkyMateCoin_AllocationFundCompleted();

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
    function burn(address _account, uint256 _amount) external onlyOwner {
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

    function getVestingSchedule(
        string memory _name
    ) public view returns (VestingSchedule memory) {
        return vestingSchedules[_name];
    }
}
