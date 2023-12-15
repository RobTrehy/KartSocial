<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Track;
use App\Models\TrackLayout;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;
use SplFileObject;

class AdminController extends Controller
{
    public function dashboard()
    {
        $track_file = new SplFileObject(base_path('database/data/tracks.csv'), 'r');
        $track_file->seek(PHP_INT_MAX);
        $track_layout_file = new SplFileObject(base_path('database/data/layouts.csv'), 'r');
        $track_layout_file->seek(PHP_INT_MAX);

        return Inertia::render('Admin/Index', [
            'track_count' => Track::all()->count(),
            'track_layouts_count' => TrackLayout::all()->count(),
            'csv_track_count' => $track_file->key() - 1,
            'csv_track_layouts_count' => $track_layout_file->key() - 1,
        ]);
    }

    public function reseedTracksAndLayouts()
    {
        Artisan::call('db:seed', ['--class' => 'TracksSeeder', '--force' => true]);
        Artisan::call('db:seed', ['--class' => 'TrackLayoutsSeeder', '--force' => true]);

        return redirect(route('admin:index'));
    }
}
