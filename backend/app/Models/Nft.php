<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nft extends Model
{
    use HasFactory;
    protected $guarded = [];

    /**
     * Define the one-to-many relationship.
     */
    public function buynft()
    {
        return $this->hasMany(Buynft::class, 'nft_id');
    }
}
