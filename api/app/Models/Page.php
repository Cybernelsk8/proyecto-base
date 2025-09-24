<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'label',
        'icon',
        'route',
        'order',
        'state',
        'page_id',
        'type',
    ];

    public function menu() {
        return $this->belongsToMany(Menu::class,'pages_menu');
    }

}
