<?php

namespace App\Http\Controllers;

use App\Models\Buynft;
use App\Models\Nft;
use Illuminate\Http\Request;

class NftController extends Controller
{
    //
    public function uploadNFT(Request $request)
    {

        // Validate the incoming data
        $request->validate([
            'tokenId' => 'required|numeric',
            'owner' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|string',
            'name' => 'required|string',
            'price' => 'required|string',
            'metadataURL' => 'required|string',
            'coordinates' => 'required|string',
        ]);

        // Save NFT details in the database
        Nft::create([
            'tokenId' => $request->tokenId,
            'owner' => $request->owner,
            'description' => $request->description,
            'image' => $request->image,
            'name' => $request->name,
            'price' => $request->price,
            'metadataURL' => $request->metadataURL,
            'coordinates' => $request->coordinates,
        ]);

        return response()->json(['message' => 'NFT uploaded successfully!'], 200);
    }

    public function loadNFT()
    {
        // Get paginated NFTs, 20 per page
        $nfts = NFT::latest()->paginate(20);

        // Get the total count of NFTs in the database
        $totalNfts = NFT::count();

        // Return paginated NFTs and total NFT count as JSON
        return response()->json([
            'nfts' => $nfts,
            'totalNfts' => $totalNfts,
            'pagination' => [
                'current_page' => $nfts->currentPage(),
                'last_page' => $nfts->lastPage(),
            ],
        ]);
    }
    public function buyNFT(Request $request)
    {

        // Validate the incoming data
        $request->validate([
            'tokenId' => 'required|numeric',
            'owner' => 'required|string',
        ]);
        $nft = NFT::where('tokenId', $request->tokenId)->first();
        $user =  $request->user();

        Buynft::create([
            'owner' => $request->owner,
            'nft_id' => $nft->id,
            'user_id' => $user->id,
        ]);
        $boughtNfts = Buynft::with(['nft', 'user'])->get();

        return response()->json(['status' => 'success', 'nft' => $boughtNfts], 200);
    }

    public function loadBoughtNFT()
    {
        $boughtNfts = Buynft::with(['nft', 'user'])->get();

        // Return paginated NFTs and total NFT count as JSON
        return response()->json([
            'nfts' => $boughtNfts,
        ]);
    }
}
