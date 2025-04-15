<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;


// just get all users

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
    public function welcome()
    {
        $userCount = User::count(); // hitung jumlah pengguna

        return inertia('welcome', [ // <== CASE SENSITIVE: harus sama kayak nama file React-nya
            'userCount' => $userCount,
        ]);
    }
    
}