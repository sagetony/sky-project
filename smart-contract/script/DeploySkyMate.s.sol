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

contract DeploySkyMate is Script {
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
        vm.stopBroadcast();

        vm.startPrank(owner);
        // Purchase
        skymatecoin.changeAllocationAdmin(
            ("Public Offering"),
            address(skyMatepurchasetoken)
        );

        skymatecoin.mintForAllocation(("Public Offering"), 1_000_000 ether);
        SkyMateCoin.VestingSchedule memory publicofferingschedule = skymatecoin
            .getVestingSchedule(("Public Offering"));
        assert(publicofferingschedule.totalMinted == 1_000_000 ether);

        // Staking
        skymatecoin.changeAllocationAdmin(
            ("Staking Rewards"),
            address(staking)
        );

        skymatecoin.mintForAllocation(("Staking Rewards"), 1_000_000 ether);
        SkyMateCoin.VestingSchedule memory stakingschedule = skymatecoin
            .getVestingSchedule(("Staking Rewards"));
        assert(stakingschedule.totalMinted == 1_000_000 ether);

        vm.stopPrank();

        return (skymatecoin, skyMatepurchasetoken, staking, nft, config);
    }
}
// forge script script/DeploySkyMate.s.sol:DeploySkyMate --rpc-url https://eth-sepolia.g.alchemy.com/v2/jFt5UlUXHbrbOtldpgZ2-w36Hy-1BwmK --etherscan-api-key CC27HD26UZ64HK9DG7XN84XRSUBWE7B8KX --broadcast --verify
// forge script script/DeploySkyMate.s.sol:DeploySkyMate --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
// // forge script script/DeploySkyMate.s.sol:DeploySkyMate --rpc-url https://eth-sepolia.g.alchemy.com/v2/r66BFm3G4qd0zNba-yyqjMjFALrlAiqR --etherscan-api-key CC27HD26UZ64HK9DG7XN84XRSUBWE7B8KX --broadcast --verify
