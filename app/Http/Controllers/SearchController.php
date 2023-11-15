<?php

namespace App\Http\Controllers;

use App\Models\Track;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $tracks = Track::where('name', 'like', '%'.$request->input('term').'%')
            ->orWhere('town', 'like', '%'.$request->input('term').'%')
            ->orWhere('county', 'like', '%'.$request->input('term').'%')
            ->take(5)->get();

        $people = User::where('alias', 'like', '%'.$request->input('term').'%')
            ->orWhere('email', 'like', '%'.$request->input('term').'%')
            ->take(5)->get();

        $all = array_merge($people->toArray(), $tracks->toArray());
        array_multisort(array_column($all, 'name'), $all);

        return [
            'all' => array_slice($all, 0, 5),
            'tracks' => $tracks,
            'people' => $people,
        ];
    }
}
