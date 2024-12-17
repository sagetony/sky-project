<?php

namespace App\Http\Controllers;

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

        return response()->json(['message' => 'NFT uploaded successfully!'], 201);
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
}
