// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

import {SkyMateNFT} from "../src/SkyMateNFT.sol";
import {Test, console} from "forge-std/Test.sol";

contract SkyMateNFTTest is Test {
    SkyMateNFT nft;
    address owner = makeAddr("owner");
    address admin = makeAddr("admin");
    address buyer = makeAddr("buyer");
    address user = makeAddr("user");

    function setUp() external {
        nft = new SkyMateNFT(owner);

        vm.deal(buyer, 10 ether);
        vm.deal(user, 10 ether);
    }

    function test_deploymentStateForSkyMateNFT() external view {
        assertEq(nft.owner(), owner);
        assertEq(nft.admins(owner), true);
    }

    function test_addAdmin() external {
        vm.prank(owner);
        nft.addAdmin(admin);
        assertEq(nft.admins(admin), true);
    }

    function test_onlyAdminCanAddAdmin() external {
        vm.expectRevert();
        nft.addAdmin(admin);
    }

    function test_removeAdmin() external {
        vm.startPrank(owner);
        nft.addAdmin(admin);
        assertEq(nft.admins(admin), true);
        nft.removeAdmin(admin);
        assertEq(nft.admins(admin), false);
        vm.stopPrank();
    }

    function test_onlyAdminCanRemoveAdmin() external {
        vm.expectRevert();
        nft.removeAdmin(admin);
    }

    function test_uploadLand() external {
        vm.startPrank(owner);
        nft.addAdmin(admin);
        assertEq(nft.admins(admin), true);
        vm.stopPrank();

        vm.startPrank(admin);
        uint256 tokenId = nft.uploadLand(
            "20, 40",
            "Zone A",
            "A land in new york",
            "A",
            1 ether,
            ""
        );

        SkyMateNFT.Land memory land = nft.getLand(tokenId);
        assertEq(land.zoneName, "A1");
        assertEq(land.price, 1 ether);
        assertEq(land.onSale, true);
        assertEq(land.id, tokenId);
        assertEq(nft.ownerOf(tokenId), owner);
        vm.stopPrank();
    }

    function test_deleteLand() external {
        vm.startPrank(owner);
        uint256 tokenId = nft.uploadLand(
            "20, 40",
            "Zone A",
            "A land in new york",
            "A",
            1 ether,
            ""
        );

        SkyMateNFT.Land memory land = nft.getLand(tokenId);
        assertEq(land.onSale, true);
        assertEq(nft.ownerOf(tokenId), owner);

        // delete land
        nft.deleteLand(tokenId);
        vm.stopPrank();
    }

    function test_onlyAdminDeleteLand() external {
        vm.startPrank(owner);
        uint256 tokenId = nft.uploadLand(
            "20, 40",
            "Zone A",
            "A land in new york",
            "A",
            1 ether,
            ""
        );

        SkyMateNFT.Land memory land = nft.getLand(tokenId);
        assertEq(land.onSale, true);
        assertEq(nft.ownerOf(tokenId), owner);
        vm.stopPrank();

        // delete land
        vm.expectRevert();
        nft.deleteLand(tokenId);
    }

    function test_deleteSoldLand() external {
        vm.startPrank(owner);
        uint256 tokenId = nft.uploadLand(
            "20, 40",
            "Zone A",
            "A land in new york",
            "A",
            1 ether,
            ""
        );

        SkyMateNFT.Land memory land = nft.getLand(tokenId);
        assertEq(land.onSale, true);
        assertEq(nft.ownerOf(tokenId), owner);
        vm.stopPrank();

        //buy
        vm.startPrank(buyer);
        nft.buyLand{value: 1 ether}(tokenId);
        assertEq(nft.ownerOf(tokenId), buyer);
        assertEq(buyer.balance, 9 ether);
        assertEq(land.onSale, false);
        vm.stopPrank();

        // delete land
        vm.startPrank(owner);
        vm.expectRevert();
        nft.deleteLand(tokenId);
        vm.stopPrank();
    }

    function test_uploadLandByOnlyAdmin() external {
        vm.expectRevert();
        nft.uploadLand(
            "20, 40",
            "Zone A",
            "A land in new york",
            "A",
            1 ether,
            ""
        );
    }

    function test_buyLand() external {
        vm.startPrank(owner);
        nft.addAdmin(admin);
        assertEq(nft.admins(admin), true);
        vm.stopPrank();

        vm.startPrank(admin);
        uint256 tokenId = nft.uploadLand(
            "20, 40",
            "Zone A",
            "A land in new york",
            "A",
            1 ether,
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
    }

    function test_transferLand() external {
        vm.startPrank(owner);
        nft.addAdmin(admin);
        assertEq(nft.admins(admin), true);
        vm.stopPrank();

        vm.startPrank(admin);
        uint256 tokenId = nft.uploadLand(
            "20, 40",
            "Zone A",
            "A land in new york",
            "A",
            1 ether,
            ""
        );
        vm.stopPrank();

        //buy land
        vm.startPrank(buyer);
        nft.buyLand{value: 1 ether}(tokenId);

        //transfer land
        nft.transferLandOwnership(tokenId, user);
        assertEq(nft.ownerOf(tokenId), user);
        vm.stopPrank();
    }

    function test_editLandInfo() external {
        vm.startPrank(owner);
        nft.addAdmin(admin);
        assertEq(nft.admins(admin), true);
        vm.stopPrank();

        vm.startPrank(admin);
        uint256 tokenId = nft.uploadLand(
            "20, 40",
            "Zone A",
            "A land in new york",
            "A",
            1 ether,
            ""
        );
        vm.stopPrank();

        vm.startPrank(buyer);
        nft.buyLand{value: 1 ether}(tokenId);
        nft.editLandInfo(tokenId, 3 ether, "Zone A", "Land Nigeria");
        SkyMateNFT.Land memory land = nft.getLand(tokenId);
        assertEq(land.price, 3 ether);
        vm.stopPrank();
    }

    function test_updateLandStatus() external {
        vm.startPrank(owner);
        nft.addAdmin(admin);
        assertEq(nft.admins(admin), true);
        vm.stopPrank();

        vm.startPrank(admin);
        uint256 tokenId = nft.uploadLand(
            "20, 40",
            "Zone A",
            "A land in new york",
            "A",
            1 ether,
            ""
        );
        vm.stopPrank();

        vm.startPrank(buyer);
        nft.buyLand{value: 1 ether}(tokenId);
        nft.editLandInfo(tokenId, 3 ether, "Zone A", "Land Nigeria");
        nft.updateLandSaleStatus(tokenId, true);
        SkyMateNFT.Land memory land = nft.getLand(tokenId);
        assertEq(land.onSale, true);
        vm.stopPrank();

        vm.startPrank(user);
        nft.buyLand{value: 3 ether}(tokenId);
        vm.stopPrank();
    }
}
