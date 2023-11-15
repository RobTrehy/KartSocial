<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTrackLayoutRequest;
use App\Models\Track;
use App\Models\TrackLayout;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrackLayoutsController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * Requires: track.layouts.create
     */
    public function create(Track $track)
    {
        if (Auth::user()->cannot('track.layouts.create')) {
            abort(403);
        }

        return Inertia::render('Tracks/Layouts/New', [
            'track' => $track,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * Requires: track.layouts.create
     */
    public function store(CreateTrackLayoutRequest $request, Track $track)
    {
        if (Auth::user()->cannot('track.layouts.create')) {
            abort(403);
        }

        TrackLayout::create(
            array_merge(
                ['track_id' => $track->id],
                $request->safe()->toArray(),
            )
        );

        return redirect(route('tracks.show', [
            'track' => $track->id,
        ]));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * Requires: track.layouts.update
     */
    public function edit(Track $track, TrackLayout $layout)
    {
        if (Auth::user()->cannot('track.layouts.update')) {
            abort(403);
        }

        return Inertia::render('Tracks/Layouts/Edit', [
            'track' => $track,
            'layout' => $layout,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * Requires: track.layouts.update
     */
    public function update(UpdateTrackLayoutRequest $request, Track $track, TrackLayout $layout)
    {
        if (Auth::user()->cannot('track.layouts.update')) {
            abort(403);
        }

        $layout->update($request->safe()->toArray());

        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * Requires: track.layouts.destroy
     */
    public function destroy(Track $track, TrackLayout $layout)
    {
        if (Auth::user()->cannot('track.layouts.destroy')) {
            abort(403);
        }

        $layout->retired_at = Carbon::now();
        $layout->save();

        activity('Track Layout')
            ->performedOn($layout)
            ->event('retired')
            ->log('retired');

        return back();
    }

    /**
     * Reinstate the specified resource from storage.
     *
     * Requires: track.layouts.restore
     */
    public function reinstate(Track $track, TrackLayout $layout)
    {
        if (Auth::user()->cannot('track.layouts.restore')) {
            abort(403);
        }

        $layout->retired_at = null;
        $layout->save();

        activity('Track Layout')
            ->performedOn($layout)
            ->event('reinstated')
            ->log('reinstated');

        return back();
    }

    /**
     * Make the specified resource the default track layout.
     *
     * Requires: track.layouts.set_default
     */
    public function makeDefault(Track $track, TrackLayout $layout)
    {
        if (Auth::user()->cannot('track.layouts.set_default')) {
            abort(403);
        }

        TrackLayout::where('id', $track->defaultLayout->id)->update(['is_default' => false]);

        $layout->is_default = true;
        $layout->save();

        activity('Track Layout')
            ->performedOn($layout)
            ->event('set as default')
            ->log('set as default');

        return back();
    }
}
