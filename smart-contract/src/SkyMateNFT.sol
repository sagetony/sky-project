// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title SkyMate NFT Contract
 * @dev This contract allows for the minting, managing, buying, and transferring of land NFTs.
 *      Each land NFT is associated with coordinates, a location name, a description, and a price.
 *      Only admins can upload new land NFTs, while anyone can buy or transfer ownership of lands.
 */
contract SkyMateNFT is ERC721URIStorage, Ownable {
    using Strings for uint256;

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          ERRORS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    error SkyMateNFT_NotAuthorized();
    error SkyMateNFT_LandDoesNotExist();
    error SkyMateNFT_InsufficientFunds();
    error SkyMateNFT_InvalidPrice();
    error SkyMateNFT_FailedTransaction();
    error SkyMateNFT_LandNotForSale();

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          STORAGE                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    uint256 public _tokenIdCounter; // @todo change to private

    /**
     * @dev Struct to represent Land metadata.
     * @param id The unique token ID for the land.
     * @param coordinates The geographical coordinates of the land (latitude, longitude).
     * @param locationName The name of the location.
     * @param description A description of the land.
     * @param price The price of the land (in wei).
     * @param onSale The sale status of land.
     */
    struct Land {
        uint256 id;
        string coordinates;
        string locationName;
        string description;
        uint256 price;
        bool onSale;
        string zoneName;
    }

    // Mapping from token ID to Land data
    mapping(uint256 => Land) public lands;
    // Admin addresses mapping
    mapping(address => bool) public admins;
    // Tracks the count for each zone (e.g., A, B)
    mapping(string => uint256) public zoneCounters;

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          EVENTS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    /**
     * @dev Event emitted when new land is uploaded.
     * @param tokenId The token ID of the uploaded land.
     * @param admin The address of the admin who uploaded the land.
     * @param coordinates The coordinates of the uploaded land.
     */
    event LandUploaded(
        uint256 tokenId,
        address indexed admin,
        string coordinates
    );

    /**
     * @dev Event emitted when land is bought.
     * @param tokenId The token ID of the bought land.
     * @param buyer The address of the buyer.
     * @param price The price at which the land was bought.
     */
    event LandBought(uint256 tokenId, address indexed buyer, uint256 price);

    /**
     * @dev Event emitted when land ownership is transferred.
     * @param tokenId The token ID of the land.
     * @param previousOwner The previous owner's address.
     * @param newOwner The new owner's address.
     */
    event OwnershipTransferred(
        uint256 tokenId,
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Event emitted when land info is updated.
     * @param tokenId The token ID of the land.
     * @param price The new price of the land.
     * @param locationName The new location name.
     * @param description The new description of the land.
     */
    event LandInfoUpdated(
        uint256 tokenId,
        uint256 price,
        string locationName,
        string description
    );

    /**
     * @dev Event emitted when land sale status is updated.
     * @param tokenId The token ID of the land.
     * @param status The new land sale status.
     */
    event LandSaleStatusUpdated(uint256 tokenId, bool status);
    /**
     * @dev Modifier to check if the sender is an admin.
     */
    modifier onlyAdmin() {
        if (!admins[msg.sender]) revert SkyMateNFT_NotAuthorized();
        _;
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                        CONSTRUCTOR                         */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    /**
     * @dev Constructor to initialize the SkyMateNFT contract.
     * @param initialOwner The address that will be the owner of the contract.
     */
    constructor(
        address initialOwner
    ) ERC721("SkyMateNFT", "SMNFT") Ownable(initialOwner) {
        admins[initialOwner] = true; // Initially, the contract owner is an admin
        _tokenIdCounter = 1; // Start counter from 1 (or 0, if preferred)
    }

    /**
     * @dev Add a new admin address.
     * @param admin The address to be added as an admin.
     * @notice Only the owner can add admins.
     */
    function addAdmin(address admin) external onlyOwner {
        admins[admin] = true;
    }

    /**
     * @dev Remove an admin address.
     * @param admin The address to be removed from admin status.
     * @notice Only the owner can remove admins.
     */
    function removeAdmin(address admin) external onlyOwner {
        admins[admin] = false;
    }

    /**
     * @dev Upload new land and mint a new NFT for it.
     * @param coordinates The geographical coordinates (latitude, longitude) of the land.
     * @param locationName The name of the land location.
     * @param description A short description of the land.
     * @param price The price of the land in wei.
     * @param tokenURI The URI for the metadata associated with the land token (e.g., IPFS URL).
     * @notice Only admins can upload land.
     */
    function uploadLand(
        string memory coordinates,
        string memory locationName,
        string memory description,
        string memory zone,
        uint256 price,
        string memory tokenURI
    ) external onlyAdmin returns (uint256) {
        if (price <= 0) revert SkyMateNFT_InvalidPrice();

        uint256 tokenId = _tokenIdCounter;
        // Increment zone counter and generate zone-based name
        zoneCounters[zone]++;
        _mint(owner(), tokenId);
        _setTokenURI(tokenId, tokenURI); // Set the metadata URI for the token

        string memory zoneNameToString = string(
            abi.encodePacked(zone, zoneCounters[zone].toString())
        );

        // Save land details in storage
        lands[tokenId] = Land({
            id: tokenId,
            coordinates: coordinates,
            locationName: locationName,
            description: description,
            price: price,
            onSale: true,
            zoneName: zoneNameToString
        });

        _tokenIdCounter++; // Increment the token ID counter for the next mint

        emit LandUploaded(tokenId, msg.sender, coordinates);

        return tokenId;
    }

    /**
     * @dev Buy land by paying the specified price.
     * @param tokenId The token ID of the land to be bought.
     * @notice The buyer must send enough Ether to cover the land's price.
     */
    function buyLand(uint256 tokenId) external payable {
        Land storage land = lands[tokenId];
        if (!land.onSale) revert SkyMateNFT_LandNotForSale();
        if (land.id == 0) revert SkyMateNFT_LandDoesNotExist(); // Land must exist
        if (msg.value < land.price) revert SkyMateNFT_InsufficientFunds();

        address seller = ownerOf(tokenId);
        address buyer = msg.sender;

        land.onSale = false;
        // Transfer the price to the seller
        (bool success, ) = payable(seller).call{value: land.price}("");
        if (!success) revert SkyMateNFT_FailedTransaction();

        // Transfer the land NFT to the buyer
        _transfer(seller, buyer, tokenId);

        emit LandBought(tokenId, buyer, land.price);
    }

    /**
     * @dev Transfer ownership of land to another address.
     * @param tokenId The token ID of the land.
     * @param newOwner The address to receive ownership of the land.
     */
    function transferLandOwnership(uint256 tokenId, address newOwner) external {
        address currentOwner = ownerOf(tokenId);
        if (msg.sender != currentOwner) revert SkyMateNFT_NotAuthorized();

        _transfer(currentOwner, newOwner, tokenId);
        emit OwnershipTransferred(tokenId, currentOwner, newOwner);
    }

    /**
     * @dev Edit information of the land (price, location name, description).
     * @param tokenId The token ID of the land to edit.
     * @param newPrice The new price of the land in wei.
     * @param newLocationName The new name of the location.
     * @param newDescription The new description of the land.
     * @notice Only the land's owner can edit the information.
     */
    function editLandInfo(
        uint256 tokenId,
        uint256 newPrice,
        string memory newLocationName,
        string memory newDescription
    ) external {
        address currentOwner = ownerOf(tokenId);
        if (msg.sender != currentOwner) revert SkyMateNFT_NotAuthorized();

        if (newPrice <= 0) revert SkyMateNFT_InvalidPrice();

        // Update land information
        lands[tokenId].price = newPrice;
        lands[tokenId].locationName = newLocationName;
        lands[tokenId].description = newDescription;

        emit LandInfoUpdated(
            tokenId,
            newPrice,
            newLocationName,
            newDescription
        );
    }

    /**
     * @dev Toggle the land sale status to either true or false.
     * @param tokenId The token ID of the land to edit.
     * @param status The sale status of the land.
     * @notice Only the land's owner can toggle.
     */
    function updateLandSaleStatus(uint256 tokenId, bool status) external {
        address currentOwner = ownerOf(tokenId);
        if (msg.sender != currentOwner) revert SkyMateNFT_NotAuthorized();

        // Update land information
        lands[tokenId].onSale = status;

        emit LandSaleStatusUpdated(tokenId, status);
    }

    /**
     * @dev Get the land.
     * @param _index Index of the land.
     * @return It returns the Land.
     */
    function getLand(uint256 _index) public view returns (Land memory) {
        return lands[_index];
    }
}
