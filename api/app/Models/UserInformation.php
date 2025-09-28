<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Storage;

class UserInformation extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'cui',
        'phone',
        'birthday',
        'city',
        'address',
        'email',
        'gender',
        'user_id',
    ];

    protected $appends = [
        'full_name',
        'small_name',
        'url_photo',
        'profile_name'
    ];


    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function getFullNameAttribute() {
        return $this->first_name.' '.$this->last_name;
    }

    public function getUrlPhotoAttribute() {
        return $this->photo ? Storage::url($this->photo) : null;
    }

    public function getSmallNameAttribute() {
        $full_name = trim($this->first_name . ' ' . $this->last_name);
        $name_parts = explode(" ", $full_name);
        
        if (count($name_parts) < 2) {
            return $full_name;
        }
        
        $first_name = $name_parts[0];
        $total_parts = count($name_parts);
        
        // Buscar preposiciones en los últimos apellidos
        $prepositions = ['de', 'del', 'la', 'los', 'las'];
        
        // Empezar desde el final para encontrar el apellido principal
        for ($i = $total_parts - 2; $i >= 1; $i--) {
            $current_part_lower = strtolower($name_parts[$i]);
            
            if (in_array($current_part_lower, $prepositions)) {
                // Si encontramos una preposición, tomar desde aquí
                $last_name = implode(' ', array_slice($name_parts, $i, $total_parts - $i));
                return $first_name . ' ' . $last_name;
            }
            
            // Si no es preposición y estamos en el penúltimo o anterior, tomar este apellido
            if ($i <= $total_parts - 2) {
                $last_name = $name_parts[$i];
                return $first_name . ' ' . $last_name;
            }
        }
        
        // Fallback: tomar el penúltimo elemento
        $last_name = $name_parts[$total_parts - 2] ?? $name_parts[$total_parts - 1];
        return $first_name . ' ' . $last_name;
    }
    
    public function getProfileNameAttribute() {
        return $this->user->profile_name;
    }
}
