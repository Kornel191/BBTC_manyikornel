<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ugyfel extends Model
{
   protected $table = 'ugyfel';
    public $timestamps = false;
    protected $primaryKey = 'azon';

    public function befiz() {
        return $this->hasMany(befiz::class, 'ugyfel_azon');
}


}


