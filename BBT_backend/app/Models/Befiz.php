<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Befiz extends Model
{
     protected $table = 'befiz';
    public $timestamps = false;

    public function ugyfel() {
        return $this->belongsTo(ugyfel::class, 'azon');
    }
}
