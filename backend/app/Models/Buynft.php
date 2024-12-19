<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buynft extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function nft()
    {
        return $this->belongsTo(NFT::class, 'nft_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
