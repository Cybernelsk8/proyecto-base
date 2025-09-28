<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\Profile;
use App\Models\User;
use App\Models\UserInformation;
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

        User::create([
            'username' => '2733271000101',
            'password' => bcrypt('Cyb3rn3lsk8'),
            'profile_id' => 1,
        ]);


        UserInformation::create([
            'first_name' => 'Nelson',
            'last_name' => 'Vásquez',
            'cui' => '2733271000101',
            'phone' => '48840150',
            'birthday' => '1988-06-23',
            'city' => 'Guatemala',
            'address' => '2 calle 1-02 zona 3 anexo Ruedita',
            'email' => 'nelson.o.vasquez@gmail.com',
            'gender' => 'M',
            'photo' => 'nelson_vasquez.jpg',
            'user_id' => 1
        ]);

        

       
    }
}
