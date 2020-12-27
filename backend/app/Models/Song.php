<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    
    protected $fillable = [
        'user_id',
        'name',
        'text',
        'language',
    ];

    public function user(){
        return $this->hasOne('App\Model\User');
    }
}
