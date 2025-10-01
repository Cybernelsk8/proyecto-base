<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        try {
            $users = User::with(['profile','information'])
                ->advancedFilter($request)
                ->paginate($request->perPage ?? 10);

            return response($users);
        } catch (\Throwable $th) {
            return response([
                'error' => $th->getMessage(),
                'message' => 'Message example.'
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        try {
            return response();
        } catch (\Throwable $th) {
            return response([
                'error' => $th->getMessage(),
                'message' => 'Message example.'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user) {
        try {
            return response();
        } catch (\Throwable $th) {
            return response([
                'error' => $th->getMessage(),
                'message' => 'Message example.'
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user) {
        try {
            return response();
        } catch (\Throwable $th) {
            return response([
                'error' => $th->getMessage(),
                'message' => 'Message example.'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user) {
        try {
            return response();
        } catch (\Throwable $th) {
            return response([
                'error' => $th->getMessage(),
                'message' => 'Message example.'
            ]);
        }
    }
}
