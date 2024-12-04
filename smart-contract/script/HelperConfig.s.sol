// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import {Script} from "forge-std/Script.sol";
import {MockERC20} from "../test/Mock/ERC20.sol";
import {Test, console} from "forge-std/Test.sol";

contract HelperConfig is Script {
    struct NetworkConfig {
        uint256 deployerKey;
        address owner;
        address usdt;
    }

    uint256 public DEFAULT_ANVIL_KEY =
        0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

    NetworkConfig public activeNetworkConfig;
    address public MAINNET_USDT = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
    address public TESTNET_USDC = 0x7169D38820dfd117C3FA1f22a697dBA58d90BA06;

    constructor() {
        if (block.chainid == 1) {
            activeNetworkConfig = getETHConfig();
        } else if (block.chainid == 11155111) {
            activeNetworkConfig = getSepoliaTestnetConfig();
        } else {
            activeNetworkConfig = getOrCreateAnvilETHConfig();
        }
    }

    function getETHConfig() public view returns (NetworkConfig memory) {
        return
            NetworkConfig({
                deployerKey: vm.envUint("PRIVATE_KEY"),
                owner: vm.envAddress("ADMIN_ADDRESS"),
                usdt: MAINNET_USDT
            });
    }

    function getSepoliaTestnetConfig() public returns (NetworkConfig memory) {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        MockERC20 usdt = new MockERC20("USDT Coin", "USDT", 6, 1_000_000);

        console.log("USDT CONTRACT ADDRESS", address(usdt));

        vm.stopBroadcast();

        return
            NetworkConfig({
                deployerKey: vm.envUint("PRIVATE_KEY"),
                owner: vm.envAddress("ADMIN_ADDRESS"),
                usdt: address(usdt)
            });
    }

    function getOrCreateAnvilETHConfig() public returns (NetworkConfig memory) {
        vm.startBroadcast();
        MockERC20 usdt = new MockERC20("USDT Coin", "USDT", 6, 1_000_000);

        vm.stopBroadcast();

        return
            NetworkConfig({
                deployerKey: DEFAULT_ANVIL_KEY,
                owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
                usdt: address(usdt)
            });
    }
}
// $ forge deploy script/DeploySeesea.s.sol:DeploySeeSeaAI --rpc-url https://bsc-dataseed.bnbchain.org --etherscan-api-key FJMHUPUN5FYV67YVZRD555JWQIUIRISQDS --broadcast --verify

// forge script script/DeploySeesea.s.sol:DeploySeeSeaAI --rpc-url https://bsc-dataseed.nariox.org --etherscan-api-key FJMHUPUN5FYV67YVZRD555JWQIUIRISQDS --broadcast --verify
// forge script script/DeploySeesea.s.sol:DeploySeeSeaAI --rpc-url https://bsc-testnet-dataseed.bnbchain.org --etherscan-api-key FJMHUPUN5FYV67YVZRD555JWQIUIRISQDS --broadcast --verify
