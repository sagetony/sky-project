// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {MockERC20Token} from "./Mock/ERC20.sol";
import {SkyMateCoin} from "../src/SkyMateCoin.sol";
import {SkyMatePurchaseToken} from "../src/SkyMatePurchaseToken.sol";
import {Staking} from "../src/Staking.sol";
import {Test, console} from "forge-std/Test.sol";
import {MockERC20} from "forge-std/mocks/MockERC20.sol";

contract StakingTest is Test {
    Staking staking;
    SkyMateCoin skymatecoin;
    SkyMatePurchaseToken skyMatepurchasetoken;
    MockERC20 usdt;

    address owner = makeAddr("owner");
    address user = makeAddr(("user"));
    address admin = makeAddr("admin");

    function setUp() external {
        // Deployment
        skymatecoin = new SkyMateCoin(owner);

        usdt = new MockERC20();
        usdt.initialize("USDT TOKEN", "USDT", 6);
        skyMatepurchasetoken = new SkyMatePurchaseToken(
            skymatecoin,
            address(usdt),
            owner
        );
        staking = new Staking(IERC20(skymatecoin), owner);

        // Transfer usdt to user
        usdt.transfer(user, 100 * 1e6);

        vm.startPrank(owner);
        // Purchase
        skymatecoin.changeAllocationAdmin(
            ("Public Offering"),
            address(skyMatepurchasetoken)
        );

        skymatecoin.mintForAllocation(("Public Offering"), 1000 ether);
        SkyMateCoin.VestingSchedule memory publicofferingschedule = skymatecoin
            .getVestingSchedule(("Public Offering"));
        assertEq(publicofferingschedule.totalMinted, 1000 ether);

        // Staking
        skymatecoin.changeAllocationAdmin(
            ("Staking Rewards"),
            address(staking)
        );

        skymatecoin.mintForAllocation(("Staking Rewards"), 1000 ether);
        SkyMateCoin.VestingSchedule memory stakingschedule = skymatecoin
            .getVestingSchedule(("Staking Rewards"));
        assertEq(stakingschedule.totalMinted, 1000 ether);
        vm.stopPrank();
    }

    modifier buytoken() {
        vm.startPrank(user);
        // user bought smc token
        uint256 amount = 10 * 10 ** 6;
        usdt.approve(address(skyMatepurchasetoken), amount);
        skyMatepurchasetoken.buy(address(usdt), amount);
        vm.stopPrank();
        _;
    }

    function test_deployment() external view {
        assertEq(staking.owner(), owner);
    }

    function test_staking() external buytoken {
        vm.startPrank(user);
        uint256 period = 30;

        // staking
        uint256 beforeBalance = skymatecoin.balanceOf(address(staking));
        skymatecoin.approve(address(staking), 100 ether);
        staking.stakeTokens(100 ether, period);
        uint256 afterBalance = skymatecoin.balanceOf(address(staking));

        uint256 recentIndex = staking.getRecentStakeIndex();
        Staking.Stake memory stake = staking.getStake(recentIndex);
        uint256 expectedRewards = staking.calculateEarnings(100 ether, 3);
        uint256 expectedRewardTimestamp = block.timestamp + (period * 86400);
        assertEq(stake.amount, 100 ether);
        assertEq(stake.startTimestamp, block.timestamp);
        assertEq(stake.annualYieldRate, 3);
        assertEq(stake.period, period);
        assertEq(stake.annualYieldRate, 3);
        assertEq(stake.lastClaimTimestamp, 0);
        assertEq(stake.expectedRewardTimestamp, expectedRewardTimestamp);
        assertEq(stake.accumulatedRewards, 0);
        assertEq(stake.expectedRewards, expectedRewards);
        assertEq(stake.expectedDailyRewards, expectedRewards / period);
        assertLt(beforeBalance, afterBalance);
        vm.stopPrank();
    }

    function test_invalidStakingPeriod() external buytoken {
        vm.startPrank(user);
        vm.expectRevert();
        staking.stakeTokens(100 ether, 10);
        vm.stopPrank();
    }

    function test_userCannotStakeOnAnActiveStake() external buytoken {
        vm.startPrank(user);
        skymatecoin.approve(address(staking), 100 ether);
        staking.stakeTokens(100 ether, 30);

        skymatecoin.approve(address(staking), 100 ether);
        vm.expectRevert();
        staking.stakeTokens(100 ether, 30);
        vm.stopPrank();
    }

    function test_claimToken() external buytoken {
        vm.startPrank(user);
        skymatecoin.approve(address(staking), 100 ether);
        staking.stakeTokens(100 ether, 90);
        uint256 beforeBalance = skymatecoin.balanceOf(address(user));
        console.log("beforeBalance", beforeBalance);

        vm.warp(block.timestamp + 30 days);
        uint256 recentIndex = staking.getRecentStakeIndex();
        staking.claimRewards(recentIndex);
        uint256 afterBalance = skymatecoin.balanceOf(address(user));
        console.log(afterBalance);
        assertLt(beforeBalance, afterBalance);

        vm.warp(block.timestamp + 30 days);
        staking.claimRewards(recentIndex);
        uint256 afterBalance2 = skymatecoin.balanceOf(address(user));
        assertLt(afterBalance, afterBalance2);
        console.log(afterBalance2);

        vm.warp(block.timestamp + 30 days);
        staking.claimRewards(recentIndex);
        uint256 afterBalance3 = skymatecoin.balanceOf(address(user));
        assertLt(afterBalance2, afterBalance3);
        console.log(afterBalance3);

        vm.stopPrank();
    }

    function test_unstakeToken() external buytoken {
        vm.startPrank(user);

        uint256 beforeBalance = skymatecoin.balanceOf(address(user));
        skymatecoin.approve(address(staking), 100 ether);
        staking.stakeTokens(100 ether, 90);

        vm.warp(block.timestamp + 30 days);
        uint256 recentIndex = staking.getRecentStakeIndex();
        Staking.Stake memory stake = staking.getStake(recentIndex);

        staking.claimRewards(recentIndex);

        vm.warp(block.timestamp + 30 days);
        staking.claimRewards(recentIndex);

        vm.warp(block.timestamp + 30 days);
        staking.claimRewards(recentIndex);

        // unstack
        staking.unstake(recentIndex);
        assertLt(beforeBalance, beforeBalance + stake.expectedRewards);
        vm.stopPrank();
    }
}
