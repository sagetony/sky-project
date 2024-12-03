// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title ISkyMateNFT
 * @dev Interface for the SkyMateNFT contract.
 */
interface ISkyMateNFT is IERC721 {
    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          EVENTS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    event LandUploaded(
        uint256 tokenId,
        address indexed admin,
        string coordinates
    );
    event LandBought(uint256 tokenId, address indexed buyer, uint256 price);
    event OwnershipTransferred(
        uint256 tokenId,
        address indexed previousOwner,
        address indexed newOwner
    );
    event LandInfoUpdated(
        uint256 tokenId,
        uint256 price,
        string locationName,
        string description
    );
    event LandSaleStatusUpdated(uint256 tokenId, bool status);

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                        FUNCTION SIGNATURES                */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    function addAdmin(address admin) external;

    function removeAdmin(address admin) external;

    function uploadLand(
        string memory coordinates,
        string memory locationName,
        string memory description,
        uint256 price,
        string memory tokenURI
    ) external;

    function buyLand(uint256 tokenId) external payable;

    function transferLandOwnership(uint256 tokenId, address newOwner) external;

    function editLandInfo(
        uint256 tokenId,
        uint256 newPrice,
        string memory newLocationName,
        string memory newDescription
    ) external;

    function updateLandSaleStatus(uint256 tokenId, bool status) external;
}
