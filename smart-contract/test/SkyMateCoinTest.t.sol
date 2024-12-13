// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;
import {SkyMateCoin} from "../src/SkyMateCoin.sol";
import {Test, console} from "forge-std/Test.sol";

contract SkyMateCoinTest is Test {
    SkyMateCoin skymatecoin;
    address owner = makeAddr("owner");
    address user = makeAddr(("user"));
    address admin = makeAddr("admin");

    function setUp() external {
        skymatecoin = new SkyMateCoin(owner);
    }

    function test_deploymentState() external view {
        assertEq(skymatecoin.owner(), owner);
        SkyMateCoin.VestingSchedule memory circulation = skymatecoin
            .getVestingSchedule(("Circulation"));
        assertEq(circulation.maxAmount, 1_000_000 ether);
        SkyMateCoin.VestingSchedule memory PrivatePlacement = skymatecoin
            .getVestingSchedule(("Private Placement"));
        assertEq(PrivatePlacement.maxAmount, 5_000_000 ether);
        SkyMateCoin.VestingSchedule memory PublicOffering = skymatecoin
            .getVestingSchedule(("Public Offering"));
        assertEq(PublicOffering.maxAmount, 5_000_000 ether);
        SkyMateCoin.VestingSchedule memory MarketingExpenses = skymatecoin
            .getVestingSchedule(("Marketing Expenses"));
        assertEq(MarketingExpenses.maxAmount, 4_000_000 ether);
        SkyMateCoin.VestingSchedule memory Team = skymatecoin
            .getVestingSchedule(("Team"));
        assertEq(Team.maxAmount, 10_000_000 ether);
        SkyMateCoin.VestingSchedule memory Community = skymatecoin
            .getVestingSchedule(("Community"));
        assertEq(Community.maxAmount, 20_000_000 ether);
        SkyMateCoin.VestingSchedule memory MetaCityFund = skymatecoin
            .getVestingSchedule(("MetaCity Fund"));
        assertEq(MetaCityFund.maxAmount, 20_000_000 ether);
        SkyMateCoin.VestingSchedule memory StakingRewards = skymatecoin
            .getVestingSchedule(("Staking Rewards"));
        assertEq(StakingRewards.maxAmount, 5_000_000 ether);
        SkyMateCoin.VestingSchedule memory Donate = skymatecoin
            .getVestingSchedule(("Donate"));
        assertEq(Donate.maxAmount, 2_000_000 ether);
        SkyMateCoin.VestingSchedule memory Consultant = skymatecoin
            .getVestingSchedule(("Consultant"));
        assertEq(Consultant.maxAmount, 3_000_000 ether);
        SkyMateCoin.VestingSchedule memory OfficialMarketing = skymatecoin
            .getVestingSchedule(("Official Marketing"));
        assertEq(OfficialMarketing.maxAmount, 5_000_000 ether);
        SkyMateCoin.VestingSchedule memory CompanyReserves = skymatecoin
            .getVestingSchedule(("Company Reserves"));
        assertEq(CompanyReserves.maxAmount, 20_000_000 ether);
    }

    function test_mintCanBeCalledByOwner() external {
        vm.expectRevert();
        skymatecoin.mint(user, 10 ether);
    }

    function test_mint() external {
        vm.startPrank(owner);
        skymatecoin.mint(user, 10 ether);
        assertEq(skymatecoin.balanceOf(user), 10 ether);
        vm.stopPrank();
    }

    function test_mintOverAllocation() external {
        vm.startPrank(owner);

        string memory expectedValue = ("Team");
        vm.expectRevert();
        skymatecoin.mintForAllocation(expectedValue, 20_000_000 ether);
        vm.stopPrank();
    }

    function test_mintAllocation() external {
        vm.startPrank(owner);

        string memory expectedValue = ("Team");
        skymatecoin.mintForAllocation(expectedValue, 10_000_000 ether);

        SkyMateCoin.VestingSchedule memory vestingschedule = skymatecoin
            .getVestingSchedule(expectedValue);
        assertEq(
            skymatecoin.balanceOf(vestingschedule.admin),
            10_000_000 ether
        );
        assertEq(vestingschedule.totalMinted, 10_000_000 ether);

        vm.stopPrank();
    }

    function test_burnAllocation() external {
        vm.startPrank(owner);
        string memory expectedValue = ("Team");
        skymatecoin.mintForAllocation(expectedValue, 10_000_000 ether);
        skymatecoin.burnForAllocation(expectedValue, 10_000_000 ether);

        SkyMateCoin.VestingSchedule memory vestingschedule = skymatecoin
            .getVestingSchedule(expectedValue);
        assertEq(vestingschedule.totalMinted, 0);
        assertEq(skymatecoin.balanceOf(vestingschedule.admin), 0);
    }

    function test_burnCanBeCalledByOwner() external {
        vm.startPrank(owner);
        skymatecoin.mint(user, 10 ether);
        vm.stopPrank();

        vm.expectRevert();
        skymatecoin.burn(user, 10 ether);
    }

    function test_burn() external {
        vm.startPrank(owner);
        skymatecoin.mint(user, 10 ether);
        skymatecoin.burn(user, 10 ether);
        assertEq(skymatecoin.balanceOf(user), 0 ether);
        vm.stopPrank();
    }

    function test_changeAllocationAdmin() external {
        vm.startPrank(owner);
        skymatecoin.changeAllocationAdmin(("Donate"), admin);
        vm.stopPrank();
        SkyMateCoin.VestingSchedule memory vestingschedule = skymatecoin
            .getVestingSchedule(("Donate"));
        assertEq(vestingschedule.admin, admin);
    }

    function test_changeAllocationCalledByOwner() external {
        vm.expectRevert();
        skymatecoin.changeAllocationAdmin(("Donate"), admin);
    }
}
