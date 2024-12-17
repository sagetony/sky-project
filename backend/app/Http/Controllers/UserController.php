<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Elliptic\EC;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use kornrunner\Keccak;

use Illuminate\Support\Facades\Cache;


class UserController extends Controller
{
    // view user
    public function viewUser(Request $request)
    {
        $user = User::where('id', $request->user())->first();
        return response()->json([
            'users' => $user
        ], 201);
    }
    // update user
    public function editUser(Request $request)
    {
        // Validate the incoming data
        $validatedData = $request->validate([
            'name' => 'nullable|string',
            'username' => 'nullable|string',
            'description' => 'nullable|string',
            'website' => 'nullable|string',
            'about' => 'nullable|string',
            'avatar' => 'file|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB, only images
            'discord'   => 'nullable|string|max:255',
            'twitter'   => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'telegram'  => 'nullable|string|max:255',
            'youtube'   => 'nullable|string|max:255',
            'facebook'  => 'nullable|string|max:255',
            'item1'  => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:51200', // 50MB limit
            'item2'  => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:51200',
            'item3'  => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:51200',
            'item4'  => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:51200',
            'item5'  => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:51200',
            'item6'  => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:51200',
            'item7'  => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:51200',
            'item8'  => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:51200',
            'item9'  => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:51200',
            'item10' => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:51200',
            'item11' => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:51200',
            'item12' => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4,mov,avi|max:51200',
        ]);

        // Handle file uploads
        foreach (range(1, 12) as $index) {
            $key = "item{$index}";

            if ($request->hasFile($key)) {
                // Store the file and get its path
                $filePath = $request->file($key)->store("items", 'public');
                $validatedData[$key] = $filePath; // Save the file path in validated data
            }
        }
        // Store the file and get its path
        if ($request->hasFile('avatar')) {
            $filePath = $request->file('avatar')->store('avatars', 'public'); // Store in 'storage/app/public/avatars'

            // Save the file path to the validated data
            $validatedData['avatar'] = $filePath;
        }
        User::where('id', $request->user()->id)->update($validatedData);
        // Return success response
        return response()->json([
            'message' => 'User updated successfully',
            'data'    => $validatedData
        ], 200);
    }

    public function userAuthGetNonce(Request $request)
    {
        $address = strtolower($request->query('address'));

        // Generate a unique nonce and store it temporarily (e.g., 5 minutes)
        $nonce = "Sign this message to authenticate. Nonce: " . uniqid();
        Cache::put("nonce_{$address}", $nonce, now()->addMinutes(5));

        return response()->json(['nonce' => $nonce]);
    }
    public function userAuth(Request $request)
    {
        $request->validate(rules: [
            'address' => 'required|string',
            'signature' => 'required|string',
            'nonce' => 'required|string',
        ]);

        $address = strtolower($request->input('address'));
        $signature = $request->input('signature');
        $message = $request->input('nonce');

        $result =  $this->verifySignature($address, $signature, $message);
        if ($result != true) {

            return response()->json([
                'signature' => 'Invalid signature.'
            ], 400);
        }

        $user = User::where('wallet', $address)->first();

        if ($user == null) {
            $newuser = User::create([
                'wallet' => $request->address,
            ]);
            Cache::forget("nonce_{$address}");
            return response()->json(
                [
                    'success' => 'Auth successfully',
                    'token' => $newuser->createToken($this->randomDigit())
                        ->plainTextToken,
                    'user' => $newuser,
                ],
                200
            );
        } else {
            Cache::forget("nonce_{$address}");
            return response()->json(
                [
                    'success' => 'Auth successfully',
                    'token' => $user->createToken($this->randomDigit())
                        ->plainTextToken,
                    'user' => $user,
                ],
                200
            );
        }
    }
    protected function verifySignature(
        $address,
        $signature,
        $message
    ) {

        // Retrieve the stored nonce from the cache
        $cachedNonce = Cache::get("nonce_{$address}");

        // Check if the nonce is valid
        if (!$cachedNonce || $cachedNonce !== $message) {
            // return response()->json(['error' => 'Invalid nonce'], 400);
            return false;
        }

        $messageLength = strlen($message);
        $hash = Keccak::hash("\x19Ethereum Signed Message:\n{$messageLength}{$message}", 256);
        $sign = [
            "r" => substr($signature, 2, 64),
            "s" => substr($signature, 66, 64)
        ];

        $recId  = ord(hex2bin(substr($signature, 130, 2))) - 27;

        if ($recId != ($recId & 1)) {
            return false;
        }

        $publicKey = (new EC('secp256k1'))->recoverPubKey($hash, $sign, $recId);

        return $this->pubKeyToAddress($publicKey) === Str::lower($address);
    }

    protected function pubKeyToAddress($publicKey): string
    {
        return "0x" . substr(Keccak::hash(substr(hex2bin($publicKey->encode("hex")), 1), 256), 24);
    }
    private function randomDigit(): string
    {
        $randomValue = substr(
            str_shuffle('ASGJWGVEFWVSBJDSBHKSHFKFGHD0123456789'),
            0,
            16
        );
        return $randomValue;
    }
}
