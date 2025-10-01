<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\Page;
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

        Page::create([
            'label' => 'Admin',
            'icon' => 'building-shield',
            'type' => 'parent',
            'order' => 1,
        ]);

        Page::create([
            'label' => 'Users',
            'route' => 'Users',
            'icon' => 'users',
            'page_id' => 1,
            'type' => 'page',
            'order' => 1,
        ]);

        Page::create([
            'label' => 'Pages',
            'route' => 'Pages',
            'icon' => 'globe',
            'page_id' => 1,
            'type' => 'page',
            'order' => 2,
        ]);


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
            'user_id' => 1
        ]);

        $menu = Menu::find(1);
        $menu->pages()->sync([1,2,3]);

        

       
    }
}
