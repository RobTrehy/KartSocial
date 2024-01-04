<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTrackRequest;
use App\Http\Requests\UpdateTrackRequest;
use App\Models\Track;
use App\Models\TrackEvent;
use App\Models\TrackLayout;
use App\Models\TrackSessionLap;
use App\Models\TrackVisit;
use App\Models\TrackVisitSessionLap;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TracksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * Requires: none
     */
    public function index()
    {
        return Inertia::render('Tracks/Index', [
            'tracks' => Track::withCount('layouts', 'laps', 'myLaps')->orderBy('name', 'ASC')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * Requires: tracks.create
     */
    public function create()
    {
        if (Auth::user()->cannot('tracks.create')) {
            abort(403);
        }

        return Inertia::render('Tracks/New');
    }

    /**
     * Store a newly created resource in storage.
     *
     * Requires: tracks.create
     */
    public function store(CreateTrackRequest $request)
    {
        if (Auth::user()->cannot('tracks.create')) {
            abort(403);
        }

        $track = Track::create(
            $request->safe()->toArray()
        );
        TrackLayout::create([
            'track_id' => $track->id,
            'is_default' => true,
        ]);

        return redirect(route('tracks.show', ['track' => $track->id]));
    }

    /**
     * Display the specified resource.
     *
     * Requires: none
     */
    public function show(Track $track)
    {
        $layouts = TrackLayout::where('track_id', $track->id)
            ->with([
                'laps' => function ($query) {
                    $query->orderBy('lap_time', 'ASC')->limit(15);
                },
                'myLaps' => function ($query) {
                    $query->orderBy('lap_time', 'ASC')->limit(15);
                },
            ])
            ->withCount(['laps', 'myLaps'])
            ->orderBy('is_default', 'DESC')
            ->orderBy('created_at', 'DESC')
            ->get();

        $layouts = $layouts->toArray();

        foreach ($layouts as $idx => $layout) {
            if ($layout['fastest_lap']) {
                $layouts[$idx]['fastest_lap'] = TrackSessionLap::where('id', $layout['fastest_lap']['id'])
                    ->with(['session', 'session.trackEvent', 'driver'])
                    ->first()?->toArray();
            }
            $layouts[$idx]['myFastest'] = Auth::check() ?
                User::find(Auth::id())->fastestLapsForTrackLayout(TrackLayout::find($layout['id']))->first() : null;

            $layouts[$idx]['chartData'] = [
                'fastest' => $this->sortChartData(array_key_exists('laps', $layout) ? $layout['laps'] : []),
                'myFastest' => $this->sortChartData(array_key_exists('my_laps', $layout) ? $layout['my_laps'] : []),
            ];
        }

        return Inertia::render('Tracks/Show', [
            'track' => $track,
            'track.myFastest' => Auth::check() ? User::find(Auth::id())->fastestLapsForTrack($track)->first() : null,
            'track.fastest_lap' => TrackSessionLap::where('id', $track->fastest_lap?->id)
                ->with(['session', 'session.trackEvent'])
                ->first(),
            'layouts' => $layouts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * Requires: tracks.update
     */
    public function edit(Track $track)
    {
        if (Auth::user()->cannot('tracks.update')) {
            abort(403);
        }

        return Inertia::render('Tracks/Edit', [
            'track' => $track,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * Requires: tracks.update
     */
    public function update(UpdateTrackRequest $request, Track $track)
    {
        if (Auth::user()->cannot('tracks.update')) {
            abort(403);
        }

        $track->update(
            $request->safe()->toArray()
        );

        session()->flash('flash.banner', 'Track Details Updated!');
        session()->flash('flash.bannerStyle', 'success');

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // TODO: ??
    }

    private function sortChartData($laps)
    {
        $labels = [];
        $data = [];
        foreach ($laps as $i => $lap) {
            $labels[] = $i + 1;
            $data[] = $lap['lap_time'];
        }

        return [
            'labels' => $labels,
            'data' => $data,
        ];
    }
}
