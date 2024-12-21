0: contract SkyMateCoin 0x4860e2c26a4A06265d387125C370F61Ff2Dd62c4
1: contract SkyMatePurchaseToken 0xBaEa0c16b28BeccEBf88b04875d6bCfd44B855C8
2: contract Staking 0x46Fd4d1f7c8e9f0685620cA757b51C75565B657b
3: contract SkyMateNFT 0x77A9D48ea6dFF35B5D9b62Fd6375F6bD6e8F214D
4: contract HelperConfig 0xC7f2Cf4845C6db0e1a1e91ED41Bcd0FcC1b0E141

== Logs ==
USDT CONTRACT ADDRESS 0x0169c266dF8461c072deA7a5e8fA11C57A3ceae9 6

BDC
== Return ==
0: contract SkyMateCoin 0x5f548a29269537B00dC9d61cEac35887734369D4
1: contract SkyMatePurchaseToken 0xdda41a29E1e78549b182c51883a529Af854bc3b7
2: contract Staking 0x9854720B9B64498785A4E484b0fBC8cC7642ed98
3: contract SkyMateNFT 0x2119b78F6db9091d11A5326352d725c1255a974B
4: contract HelperConfig 0xC7f2Cf4845C6db0e1a1e91ED41Bcd0FcC1b0E141

== Logs ==
USDT CONTRACT ADDRESS 0x6E840943e6b5f61C2f835C7A0569Aca76794a21e

https://api.etherscan.io/api?module=contract&action=checkverifystatus&guid=6gxu1iblmvkdduqmfuzazuqbrhghmylrcskxwczud1xuv5btbv&apikey=CC27HD26UZ64HK9DG7XN84XRSUBWE7B8KX

forge verify-contract \
--chain sepolia \
--compiler-version 0.8.20 \
--num-of-optimizations 200 \
--etherscan-api-key CC27HD26UZ64HK9DG7XN84XRSUBWE7B8KX \
0x27B08811e1e03493980223E9bF89252265E19aE6 \
src/SkyMateCoin.sol:SkyMateCoin

CONTRACT EXPLAINATION
SKYMATECOIN
Features

1. Mint
   Admin can mint any amount of token to any account
2. Mint to Allocation
   Admin can mint any amount of token to any allocation(Staking, Community, Circulation etc)
3. Burn
   Admin can burn any amount of token to any account
   4 Burn from Allocation
   Admin can burn any amount of token to any allocation(Staking, Community, Circulation etc)
4. transfer
   Users can transfer tokens
5. Admin can change the address to receive the allocation token

SKYMATEPURCHASE
Features

1. Buy
   Users can buy skymatecoin
2. Withdraw
   Admin can withdraw ether

STAKING
Features

1. Stake tokens
   User can stake token with a period(30, 90 etc)
2. Unstake tokens
   User can unstake only when the period(30, 90 etc) is over
3. Claim tokens
   User can claim rewards every 30 days but will not exceed the period reward rate (3%, 7%, etc);

SKYMATE LAND NFT
Features

1. Add admin
   Contract Owner can add admin to help upload land
2. Remove Admin
   Contract Owner can remove admin
3. Upload land
   Admin can upload and mint NFT
4. Buy Land
   User can only buy land that are with sale status
5. Transfer land ownership
   Land owner can transfer land
6. Edit land info
   User can edit Land info
7. Delete Land
   Contract Owner can delete land not Admin
8. Update land sales status
   Land owner can update sale status
