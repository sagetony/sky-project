// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;
import {SkyMateCoin} from "../src/SkyMateCoin.sol";
import {SkyMatePurchaseToken} from "../src/SkyMatePurchaseToken.sol";
import {Test, console} from "forge-std/Test.sol";
import {MockERC20} from "forge-std/mocks/MockERC20.sol";

contract SkyMatePurchaseTokenTest is Test {
    SkyMatePurchaseToken skyMatepurchasetoken;
    SkyMateCoin skymatecoin;
    MockERC20 usdt;

    address owner = makeAddr("owner");
    address user = makeAddr(("user"));
    address admin = makeAddr("admin");

    function setUp() external {
        skymatecoin = new SkyMateCoin(owner);

        usdt = new MockERC20();
        usdt.initialize("USDT TOKEN", "USDT", 6);

        skyMatepurchasetoken = new SkyMatePurchaseToken(
            skymatecoin,
            address(usdt),
            owner
        );

        usdt.transfer(user, 100 * 1e6);

        vm.startPrank(owner);
        skymatecoin.changeAllocationAdmin(
            ("Public Offering"),
            address(skyMatepurchasetoken)
        );

        skymatecoin.mintForAllocation(("Public Offering"), 1000 ether);
        SkyMateCoin.VestingSchedule memory vestingschedule = skymatecoin
            .getVestingSchedule(("Public Offering"));
        assertEq(vestingschedule.totalMinted, 1000 ether);
        vm.stopPrank();
    }

    function test_deploymentState() external view {
        assertEq(skymatecoin.owner(), owner);
    }

    function test_buy() external {
        vm.startPrank(user);
        uint256 amount = 0.01 * 10 ** 6;

        usdt.approve(address(skyMatepurchasetoken), amount);
        assertEq(skymatecoin.balanceOf(user), 0);
        skyMatepurchasetoken.buy(address(usdt), amount);
        assertEq(skymatecoin.balanceOf(user), 1 ether);
        vm.stopPrank();
    }

    function test_withdrawToken() external {
        vm.startPrank(user);
        uint256 amount = 10 * 10 ** 6;

        usdt.approve(address(skyMatepurchasetoken), amount);
        skyMatepurchasetoken.buy(address(usdt), amount);
        vm.stopPrank();

        vm.startPrank(owner);
        skyMatepurchasetoken.withdrawTokens(10 * 10 ** 6, address(usdt));
        assertEq(usdt.balanceOf(owner), 10 * 10 ** 6);
        vm.stopPrank();
    }

    function test_onlyAdminCanWithdraw() external {
        vm.startPrank(user);
        uint256 amount = 10 * 10 ** 6;

        usdt.approve(address(skyMatepurchasetoken), amount);
        skyMatepurchasetoken.buy(address(usdt), amount);
        vm.stopPrank();

        vm.expectRevert();
        skyMatepurchasetoken.withdrawTokens(10 * 10 ** 6, address(usdt));
    }
}
