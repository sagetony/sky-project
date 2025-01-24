// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

import {SkyMateLandStaking} from "../src/SkyMateLandStaking.sol";
import {SkyMateNFT} from "../src/SkyMateNFT.sol";
import {Test, console} from "forge-std/Test.sol";

contract SkyMateLandStakingTest is Test {
    SkyMateNFT nft;
    SkyMateLandStaking staking;

    address owner = makeAddr("owner");
    address buyer = makeAddr("buyer");

    function setUp() external {
        nft = new SkyMateNFT(owner);
        staking = new SkyMateLandStaking(address(nft), owner);

        vm.deal(buyer, 10 ether);
        vm.deal(address(staking), 10 ether);
    }

    function test_deploymentStateForSkyMateNFTStaking() external view {
        assertEq(nft.owner(), owner);
    }

    modifier buyLand() {
        vm.startPrank(owner);
        uint256 tokenId = nft.uploadLand(
            "20, 40",
            "Zone A",
            "A land in new york",
            "A",
            1 ether,
            "10m^2",
            ""
        );
        vm.stopPrank();

        //buy land
        vm.startPrank(buyer);
        nft.buyLand{value: 1 ether}(tokenId);
        SkyMateNFT.Land memory land = nft.getLand(1);
        assertEq(nft.ownerOf(tokenId), buyer);
        assertEq(buyer.balance, 9 ether);
        assertEq(land.onSale, false);
        vm.stopPrank();
        _;
    }

    function test_stakeLand() external buyLand {
        vm.startPrank(buyer);
        nft.approve(address(staking), 1);
        staking.stakeLand(1, 30 days);
        SkyMateLandStaking.Stake memory stake = staking.getStakedLand(1);
        assertEq(nft.ownerOf(1), address(staking));
        assertEq(stake.owner, buyer);
        assertEq(stake.isRewardClaimed, false);
        assertEq(stake.duration, 30 days);
        assertEq(stake.rewardRate, 300);
        vm.stopPrank();
    }

    function test_onlyLandOwnerCanStake() external buyLand {
        vm.startPrank(buyer);
        nft.approve(address(staking), 1);
        vm.stopPrank();

        vm.expectRevert();
        staking.stakeLand(1, 30 days);
        vm.stopPrank();
    }

    function test_unstakeLand() external buyLand {
        vm.startPrank(buyer);
        nft.approve(address(staking), 1);
        staking.stakeLand(1, 30 days);
        assertEq(nft.ownerOf(1), address(staking));

        vm.warp(block.timestamp + 30 days);
        staking.unstakeLand(1);
        assertEq(nft.ownerOf(1), address(buyer));
        vm.stopPrank();
    }

    function test_claimRewards() external buyLand {
        vm.startPrank(buyer);
        nft.approve(address(staking), 1);
        staking.stakeLand(1, 30 days);
        assertEq(nft.ownerOf(1), address(staking));

        vm.warp(block.timestamp + 30 days);
        uint256 beforeBalance = buyer.balance;
        staking.claimReward(1);
        uint256 afterBalance = buyer.balance;

        assertLe(beforeBalance, afterBalance);
        console.log(beforeBalance, afterBalance);
        vm.stopPrank();
    }

    function test_withdraw() external {
        vm.startPrank(owner);
        uint256 beforeBalance = owner.balance;
        staking.withdrawETH(owner);
        uint256 afterBalance = owner.balance;

        assertLe(beforeBalance, afterBalance);
        console.log(beforeBalance, afterBalance);
        vm.stopPrank();
    }
}
//
