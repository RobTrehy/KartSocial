<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTrackVisitRequest;
use App\Http\Requests\UpdateTrackVisitRequest;
use App\Models\Track;
use App\Models\TrackLayout;
use App\Models\TrackVisit;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrackVisitsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * Requires: visits.view
     */
    public function index()
    {
        if (Auth::user()->cannot('visits.view')) {
            abort(403);
        }

        return Inertia::render('Visits/Index', [
            'visits' => TrackVisit::where('user_id', Auth::id())
                ->with(['trackLayout', 'sessions', 'sessions.laps'])
                ->orderBy('visit_date', 'DESC')
                ->paginate(15),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * Requires: visits.create
     */
    public function create()
    {
        if (Auth::user()->cannot('visits.create')) {
            abort(403);
        }

        $tracks = Track::with('allLayouts')->orderBy('name', 'ASC')->get();
        $trackSelect = [];

        foreach ($tracks as $track) {
            $trackSelect[] = [
                'value' => $track->id,
                'label' => $track->name,
            ];
        }

        return Inertia::render('Visits/New', [
            'tracks' => $tracks,
            'trackSelect' => $trackSelect,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * Requires: visits.create
     */
    public function store(CreateTrackVisitRequest $request)
    {
        if (Auth::user()->cannot('visits.create')) {
            abort(403);
        }

        $visit = TrackVisit::create(
            array_merge(
                ['user_id' => Auth::id()],
                $request->safe()->toArray()
            )
        );

        return redirect(route('visits.show', ['visit' => $visit->id]));
    }

    /**
     * Display the specified resource.
     *
     * Requires: visits.view
     */
    public function show(TrackVisit $visit)
    {
        if (Auth::user()->cannot('visits.view')) {
            abort(403);
        }

        return Inertia::render('Visits/Show', [
            'visit' => $visit->load(['trackLayout', 'sessions', 'sessions.laps']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * Requires: visits.update
     */
    public function edit(TrackVisit $visit)
    {
        if (Auth::user()->cannot('visits.update')) {
            abort(403);
        }

        $layout = TrackLayout::find($visit->track_layout_id);
        $tracks = Track::with('allLayouts')->orderBy('name', 'ASC')->get();
        $trackSelect = [];

        foreach ($tracks as $track) {
            $trackSelect[] = [
                'value' => $track->id,
                'label' => $track->name,
            ];
            if ($track->id === $layout->track_id) {
                $selectedTrack = [
                    'value' => $track->id,
                    'label' => $track->name,
                ];
            }
        }

        return Inertia::render('Visits/Edit', [
            'visit' => $visit,
            'tracks' => $tracks,
            'trackSelect' => $trackSelect,
            'selectedTrack' => $selectedTrack,
            'selectedLayout' => [
                'value' => $layout->id,
                'label' => $layout->name,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * Requires: visits.update
     */
    public function update(UpdateTrackVisitRequest $request, TrackVisit $visit)
    {
        if (Auth::user()->cannot('visits.update')) {
            abort(403);
        }

        $visit->update(
            $request->only([
                'track_layout_id',
                'visit_date',
                'title',
                'notes',
            ])
        );

        return redirect(route('visits.show', ['visit' => $visit->id]));
    }

    /**
     * Remove the specified resource from storage.
     *
     * Requires: visits.destroy
     */
    public function destroy(TrackVisit $visit)
    {
        if (Auth::user()->cannot('visits.destroy')) {
            abort(403);
        }

        $visit->delete();

        return redirect(route('visits.index'));
    }
}
