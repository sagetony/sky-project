// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SkyMateCoin is ERC20, Ownable {
    struct VestingSchedule {
        string name;
        address admin;
        uint256 maxAmount;
        uint256 totalMinted;
    }

    VestingSchedule[] public vestingschedules;
    uint256 vestingSe

    constructor(
        address initialOwner
    ) ERC20("SKY MATE COIN", "SMC") Ownable(msg.sender) {
        transferOwnership(initialOwner);

        vestingschedules.push(
            VestingSchedule({
                name: "Circulation",
                admin: initialOwner,
                maxAmount: 1_000_000,
                totalMinted: 0
            })
        );
        vestingschedules.push(
            VestingSchedule({
                name: "Private Placement",
                admin: initialOwner,
                maxAmount: 5_000_000,
                totalMinted: 0
            })
        );
        vestingschedules.push(
            VestingSchedule({
                name: "Public Offering",
                admin: initialOwner,
                maxAmount: 5_000_000,
                totalMinted: 0
            })
        );
        vestingschedules.push(
            VestingSchedule({
                name: "Marketing Expenses",
                admin: initialOwner,
                maxAmount: 4_000_000,
                totalMinted: 0
            })
        );
        vestingschedules.push(
            VestingSchedule({
                name: "Team",
                admin: initialOwner,
                maxAmount: 10_000_000,
                totalMinted: 0
            })
        );
        vestingschedules.push(
            VestingSchedule({
                name: "Community",
                admin: initialOwner,
                maxAmount: 20_000_000,
                totalMinted: 0
            })
        );
        vestingschedules.push(
            VestingSchedule({
                name: "MetaCity Fund",
                admin: initialOwner,
                maxAmount: 20_000_000,
                totalMinted: 0
            })
        );
        vestingschedules.push(
            VestingSchedule({
                name: "Staking Rewards",
                admin: initialOwner,
                maxAmount: 5_000_000,
                totalMinted: 0
            })
        );
        vestingschedules.push(
            VestingSchedule({
                name: "Donate",
                admin: initialOwner,
                maxAmount: 2_000_000,
                totalMinted: 0
            })
        );

        vestingschedules.push(
            VestingSchedule({
                name: "Consultant",
                admin: initialOwner,
                maxAmount: 3_000_000,
                totalMinted: 0
            })
        );

        vestingschedules.push(
            VestingSchedule({
                name: "Consultant",
                admin: initialOwner,
                maxAmount: 3_000_000,
                totalMinted: 0
            })
        );
        vestingschedules.push(
            VestingSchedule({
                name: "Official Marketing",
                admin: initialOwner,
                maxAmount: 5ew_000_000,
                totalMinted: 0
            })
        );
    }
}
