<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\Profile;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Menu::create([
            'name' => 'Sysadmin'
        ]);

        Role::create([
            'name' => 'Sysadmin'
        ]);

        Profile::create([
            'name' => 'Sysadmin',
            'description' => 'lorem ipsmun all for get status for greate',
            'role_id' => 1,
            'menu_id' => 1,
        ]);

        User::factory()->create([
            'name' => 'Nelson Vásquez',
            'cui' => '2733271000101',
            'email' => 'nvasquez@muniguate.com',
            'password' => bcrypt('Cyb3rn3lsk8'),
            'profile_id' => 1
        ]);


       
    }
}
