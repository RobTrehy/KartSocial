<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTrackRequest;
use App\Http\Requests\UpdateTrackRequest;
use App\Models\Track;
use App\Models\TrackLayout;
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
            'tracks' => Track::withCount('layouts', 'laps', 'myLaps')->orderBy('name', 'ASC')->get()
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
                    $query->latest()->limit(20);
                },
                'myLaps' => function ($query) {
                    $query->latest()->limit(20);
                },
            ])
            ->withCount(['laps', 'myLaps'])
            ->orderBy('is_default', 'DESC')
            ->orderBy('created_at', 'DESC')
            ->get();

        $feed = TrackVisit::whereIn('track_layout_id', $layouts->pluck('id'))
            ->with(['trackLayout', 'driver', 'sessions', 'sessions.laps'])
            ->where('visit_date', '<=', Carbon::now())
            ->orderBy('visit_date', 'DESC')
            ->limit(50)
            ->get();

        $layouts = $layouts->toArray();

        foreach ($layouts as $idx => $layout) {
            if ($layout['fastestLap']) {
                $layouts[$idx]['fastestLap'] = TrackVisitSessionLap::where('id', $layout['fastestLap']['id'])
                    ->with(['session', 'session.trackVisit'])
                    ->first()->toArray();
            }
            $layouts[$idx]['myFastest'] = Auth::check() ?
                User::find(Auth::id())->fastestLapsForTrackLayout(TrackLayout::find($layout['id']))->with(['session', 'session.trackVisit'])->first()
                : null;

            $layouts[$idx]['chartData'] = [
                'latest' => $this->sortChartData(array_key_exists('laps', $layout) ? $layout['laps'] : []),
                'myLatest' => $this->sortChartData(array_key_exists('my_laps', $layout) ? $layout['my_laps'] : []),
            ];
        }

        return Inertia::render('Tracks/Show', [
            'track' => $track,
            'track.myFastest' => Auth::check() ? User::find(Auth::id())->fastestLapsForTrack($track)->with(['session', 'session.trackVisit'])->first() : null,
            'track.fastestLap' => TrackVisitSessionLap::where('id', $track->fastestLap?->id)
                ->with(['session', 'session.trackVisit'])
                ->first(),
            'track.feed' => $feed,
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
