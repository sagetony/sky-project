// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Script} from "forge-std/Script.sol";
import {SkyMateNFT} from "../src/SkyMateNFT.sol";
import {SkyMateCoin} from "../src/SkyMateCoin.sol";
import {SkyMatePurchaseToken} from "../src/SkyMatePurchaseToken.sol";
import {Staking} from "../src/Staking.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {console, Test} from "forge-std/Test.sol";

contract DeploySkyMate is Script, Test {
    function run()
        external
        returns (
            SkyMateCoin,
            SkyMatePurchaseToken,
            Staking,
            SkyMateNFT,
            HelperConfig
        )
    {
        HelperConfig config = new HelperConfig();
        (uint256 deployerKey, address owner, address usdt) = config
            .activeNetworkConfig();

        vm.startBroadcast(deployerKey);
        SkyMateCoin skymatecoin = new SkyMateCoin(owner);

        SkyMatePurchaseToken skyMatepurchasetoken = new SkyMatePurchaseToken(
            skymatecoin,
            address(usdt),
            owner
        );

        Staking staking = new Staking(IERC20(skymatecoin), owner);

        SkyMateNFT nft = new SkyMateNFT(owner);

        vm.startPrank(owner);
        // Purchase
        skymatecoin.changeAllocationAdmin(
            keccak256("Public Offering"),
            address(skyMatepurchasetoken)
        );

        skymatecoin.mintForAllocation(
            keccak256("Public Offering"),
            1_000_000 ether
        );
        SkyMateCoin.VestingSchedule memory publicofferingschedule = skymatecoin
            .getVestingSchedule(keccak256("Public Offering"));
        assertEq(publicofferingschedule.totalMinted, 1_000_000 ether);

        // Staking
        skymatecoin.changeAllocationAdmin(
            keccak256("Staking Rewards"),
            address(staking)
        );

        skymatecoin.mintForAllocation(
            keccak256("Staking Rewards"),
            1_000_000 ether
        );
        SkyMateCoin.VestingSchedule memory stakingschedule = skymatecoin
            .getVestingSchedule(keccak256("Staking Rewards"));
        assertEq(stakingschedule.totalMinted, 1_000_000 ether);
        vm.stopPrank();

        vm.stopBroadcast();
        return (skymatecoin, skyMatepurchasetoken, staking, nft, config);
    }
}
